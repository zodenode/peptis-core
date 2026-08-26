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
import { identifyPerson, track } from '../lib/analytics'
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
  current: StepId
  history: StepId[]
  answers: Answers
  shown: StopBlockId[]
  checkout: CheckoutForm
  startedAt: number
  completed: boolean
  identifiedEmail?: string
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

  const [current, setCurrent] = useState<StepId>('q1')
  const [history, setHistory] = useState<StepId[]>([])
  const [answers, setAnswers] = useState<Answers>({})
  const [shown, setShown] = useState<StopBlockId[]>([])
  const [checkout, setCheckout] = useState<CheckoutForm>(emptyCheckout)
  const [startedAt, setStartedAt] = useState(() => Date.now())
  const [completed, setCompleted] = useState(false)
  const [identifiedEmail, setIdentifiedEmail] = useState<string | undefined>()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadSnapshot()
    if (saved && !saved.completed && isStepId(saved.current)) {
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
      current,
      history,
      answers,
      shown,
      checkout,
      startedAt,
      completed,
      identifiedEmail,
    })
  }, [answers, checkout, completed, current, history, hydrated, identifiedEmail, shown, startedAt])

  useEffect(() => {
    if (!hydrated) return
    if (!startedEvent.current) {
      startedEvent.current = true
      track('quiz_started')
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

  const submitCheckout = useCallback(() => {
    identifyIfReady()
    track('quiz_completed', { pathways: derivePathways(answers) })
    track('checkout_submit_clicked', {
      plan: checkout.upsell ? 'core_founding_plus_lean_mass_interest' : 'core_founding_reservation',
      upsell: checkout.upsell,
      state: checkout.state,
      due_today: 0,
    })
    track('founding_reservation_submitted', {
      state: checkout.state,
      lean_mass_interest: checkout.upsell,
      pathways: derivePathways(answers),
      due_today: 0,
    })
    setCompleted(true)
    abandonedSent.current = true
    setHistory((h) => [...h, current])
    setCurrent('success')
  }, [answers, checkout.state, checkout.upsell, current, identifyIfReady])

  const reset = useCallback(() => {
    localStorage.removeItem(QUIZ_STORAGE_KEY)
    setCurrent('q1')
    setHistory([])
    setAnswers({})
    setShown([])
    setCheckout(emptyCheckout)
    setStartedAt(Date.now())
    setCompleted(false)
    setIdentifiedEmail(undefined)
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
    canGoBack: history.length > 0 && current !== 'success',
    pathways: derivePathways(answers),
    selectOption,
    goNext,
    goBack,
    patchCheckout,
    identifyIfReady,
    submitCheckout,
    reset,
  }
}
