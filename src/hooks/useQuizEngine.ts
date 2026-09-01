import { useCallback, useEffect, useRef, useState } from 'react'
import {
  derivePathways,
  isQuestionId,
  isStepId,
  isStopStepId,
  nextAfter,
  questions,
  stepMeta,
  type Answers,
  type StepId,
  type StopBlockId,
} from '../data/quiz'
import { getQuizSource, identifyPerson, track } from '../lib/analytics'
import { pixelTrack } from '../lib/pixel'
import { postQuizProgress, submitReservation } from '../lib/reservations'
import { isValidEmail } from '../lib/validate'

export const QUIZ_STORAGE_KEY = 'peptis.continuity.quiz'

export type CheckoutForm = {
  firstName: string
  lastName: string
  email: string
  phone: string
  state: string
  resident: boolean
  attest: boolean
  upsell: boolean
}

export type QuizSnapshot = {
  quizId?: string
  current: StepId
  history: StepId[]
  answers: Answers
  shown: StopBlockId[]
  checkout: CheckoutForm
  startedAt: number
  completed: boolean
  identifiedEmail?: string
}

function newQuizId() {
  try {
    return crypto.randomUUID()
  } catch {
    return `${Date.now().toString(16)}-0000-4000-8000-000000000000`
  }
}

const emptyCheckout: CheckoutForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  state: '',
  resident: false,
  attest: false,
  upsell: false,
}

function loadSnapshot(): QuizSnapshot | null {
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as QuizSnapshot
  } catch {
    return null
  }
}

function persist(snapshot: QuizSnapshot) {
  try {
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    // ignore quota / private mode
  }
}

export function useQuizEngine() {
  const restored = useRef(false)
  const startedEvent = useRef(false)
  const abandonedSent = useRef(false)
  const lastViewed = useRef<StepId | null>(null)
  const completedEvent = useRef(false)

  const [quizId, setQuizId] = useState<string>(() => newQuizId())
  const [current, setCurrent] = useState<StepId>('q1')
  const [history, setHistory] = useState<StepId[]>([])
  const [answers, setAnswers] = useState<Answers>({})
  const [shown, setShown] = useState<StopBlockId[]>([])
  const [checkout, setCheckout] = useState<CheckoutForm>(emptyCheckout)
  const [startedAt, setStartedAt] = useState(() => Date.now())
  const [completed, setCompleted] = useState(false)
  const [identifiedEmail, setIdentifiedEmail] = useState<string | undefined>()
  const [hydrated, setHydrated] = useState(false)
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [reservationId, setReservationId] = useState<string | null>(null)

  useEffect(() => {
    const saved = loadSnapshot()
    if (saved && !saved.completed && isStepId(saved.current)) {
      if (saved.quizId) setQuizId(saved.quizId)
      setCurrent(saved.current)
      setHistory(saved.history)
      setAnswers(saved.answers)
      setShown(saved.shown)
      setCheckout(saved.checkout)
      setStartedAt(saved.startedAt)
      setCompleted(saved.completed)
      setIdentifiedEmail(saved.identifiedEmail)
    }
    restored.current = true
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    persist({
      quizId,
      current,
      history,
      answers,
      shown,
      checkout,
      startedAt,
      completed,
      identifiedEmail,
    })
  }, [answers, checkout, completed, current, history, hydrated, identifiedEmail, quizId, shown, startedAt])

  useEffect(() => {
    if (!hydrated) return
    if (!startedEvent.current) {
      startedEvent.current = true
      track('quiz_started', { source: getQuizSource() })
    }
    if (lastViewed.current === current) return
    lastViewed.current = current
    const meta = stepMeta(current)
    const stepType = meta.type === 'success' ? 'checkout' : meta.type
    track('quiz_step_viewed', {
      step_id: meta.step_id,
      step_index: meta.step_index,
      step_type: stepType,
    })
    if (isStopStepId(current)) {
      track('quiz_stop_block_viewed', { block: meta.block ?? '' })
    }
    if (current === 'checkout') {
      track('checkout_viewed', { plan: 'core_founding_reservation', upsell_shown: true, due_today: 0 })
      if (!completedEvent.current) {
        completedEvent.current = true
        track('quiz_reached_checkout', { pathways: derivePathways(answers) })
      }
    }
  }, [answers, current, hydrated])

  // Durable per-step capture so drop-offs can be retargeted, not only completions.
  useEffect(() => {
    if (!hydrated || current === 'success') return
    postQuizProgress({
      quizId,
      step: current,
      email: isValidEmail(checkout.email) ? checkout.email.trim() : undefined,
      firstName: checkout.firstName || undefined,
      pathways: derivePathways(answers),
      answers,
    })
    // Only re-post when the step changes; answers ride along with the latest step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, hydrated, quizId])

  useEffect(() => {
    if (!hydrated) return

    const abandon = () => {
      if (completed || abandonedSent.current) return
      abandonedSent.current = true
      const minutes = Math.round(((Date.now() - startedAt) / 60000) * 10) / 10
      track('quiz_abandoned', { last_step: current, minutes_on_quiz: minutes })
    }

    const onVis = () => {
      if (document.visibilityState === 'hidden') abandon()
    }

    window.addEventListener('pagehide', abandon)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      window.removeEventListener('pagehide', abandon)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [completed, current, hydrated, startedAt])

  const selectOption = useCallback(
    (optionId: string) => {
      if (!isQuestionId(current)) return
      const q = questions[current]
      if (q.multi) {
        const prev = answers.q2 ?? []
        const next = prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
        setAnswers((a) => ({ ...a, q2: next }))
        track('quiz_option_selected', { step_id: current, option_id: optionId })
        return
      }
      setAnswers((a) => ({ ...a, [current]: optionId }))
      track('quiz_option_selected', {
        step_id: current,
        option_id: optionId,
      })
    },
    [answers.q2, current],
  )

  const goNext = useCallback(() => {
    const upcoming = nextAfter(current, answers, shown)
    if (isStopStepId(upcoming)) {
      const block: StopBlockId = upcoming === 'stop_a' ? 'A' : upcoming === 'stop_b' ? 'B' : 'C'
      setShown((s) => (s.includes(block) ? s : [...s, block]))
    }
    if (isStopStepId(current)) {
      const block = current === 'stop_a' ? 'A' : current === 'stop_b' ? 'B' : 'C'
      track('quiz_stop_block_continued', { block })
    }
    setHistory((h) => [...h, current])
    setCurrent(upcoming)
  }, [answers, current, shown])

  const goBack = useCallback(() => {
    if (!history.length) return
    track('quiz_back_clicked', { from_step: current })
    const prev = history[history.length - 1]
    setHistory((h) => h.slice(0, -1))
    setCurrent(prev)
  }, [current, history])

  const patchCheckout = useCallback((patch: Partial<CheckoutForm>) => {
    setCheckout((c) => {
      const next = { ...c, ...patch }
      if (patch.upsell !== undefined && patch.upsell !== c.upsell) {
        track('upsell_toggled', { enabled: patch.upsell })
        track('lean_mass_interest_toggled', { enabled: patch.upsell })
      }
      return next
    })
  }, [])

  const identifyIfReady = useCallback(
    (email = checkout.email) => {
      if (!isValidEmail(email) || identifiedEmail === email.trim()) return
      identifyPerson(email.trim(), {
        first_name: checkout.firstName,
        state: checkout.state,
        plan: checkout.upsell ? 'core_founding_plus_lean_mass_interest' : 'core_founding_reservation',
      })
      setIdentifiedEmail(email.trim())
    },
    [checkout.email, checkout.firstName, checkout.state, checkout.upsell, identifiedEmail],
  )

  const captureEmail = useCallback(
    (email: string, skipped: boolean) => {
      if (skipped) {
        track('quiz_email_skipped', { step_id: current })
        return
      }
      const clean = email.trim()
      if (!isValidEmail(clean)) return
      setCheckout((c) => ({ ...c, email: clean }))
      track('quiz_email_captured', { step_id: current })
      pixelTrack('Lead')
      identifyPerson(clean, { quiz_source: getQuizSource() })
      setIdentifiedEmail(clean)
      postQuizProgress({
        quizId,
        step: current,
        email: clean,
        pathways: derivePathways(answers),
        answers,
        sendGuide: true,
      })
    },
    [answers, current, quizId],
  )

  const submitCheckout = useCallback(async () => {
    if (submitState === 'submitting') return
    setSubmitState('submitting')
    track('checkout_submit_clicked', {
      plan: checkout.upsell ? 'core_founding_plus_lean_mass_interest' : 'core_founding_reservation',
      upsell: checkout.upsell,
      state: checkout.state,
      due_today: 0,
    })

    const result = await submitReservation({
      firstName: checkout.firstName,
      lastName: checkout.lastName,
      email: checkout.email,
      phone: checkout.phone,
      state: checkout.state,
      resident: checkout.resident,
      attest: checkout.attest,
      upsell: checkout.upsell,
      pathways: derivePathways(answers),
    })

    if (!result.ok) {
      setSubmitState('error')
      track('reservation_submit_failed', { error: result.error })
      return
    }

    setSubmitState('idle')
    setReservationId(result.id)
    identifyIfReady()
    track('quiz_completed', { pathways: derivePathways(answers) })
    track('founding_reservation_submitted', {
      state: checkout.state,
      lean_mass_interest: checkout.upsell,
      pathways: derivePathways(answers),
      due_today: 0,
      reservation_id: result.id,
    })
    pixelTrack('CompleteRegistration')
    setCompleted(true)
    abandonedSent.current = true
    setHistory((h) => [...h, current])
    setCurrent('success')
  }, [answers, checkout, current, identifyIfReady, submitState])

  const reset = useCallback(() => {
    localStorage.removeItem(QUIZ_STORAGE_KEY)
    setQuizId(newQuizId())
    setCurrent('q1')
    setHistory([])
    setAnswers({})
    setShown([])
    setCheckout(emptyCheckout)
    setStartedAt(Date.now())
    setCompleted(false)
    setIdentifiedEmail(undefined)
    setSubmitState('idle')
    setReservationId(null)
    lastViewed.current = null
    abandonedSent.current = false
    completedEvent.current = false
  }, [])

  return {
    hydrated,
    current,
    historyLength: history.length,
    answers,
    checkout,
    completed,
    submitState,
    reservationId,
    canGoBack: history.length > 0 && current !== 'success',
    pathways: derivePathways(answers),
    selectOption,
    goNext,
    goBack,
    patchCheckout,
    identifyIfReady,
    captureEmail,
    submitCheckout,
    reset,
  }
}
