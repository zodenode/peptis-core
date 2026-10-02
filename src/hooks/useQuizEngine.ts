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
  type PlanAnswerKey,
  type StepId,
  type StopBlockId,
} from '../data/quiz'
import { getQuizPrompt, getQuizSource, track } from '../lib/analytics'
import { postQuizProgress, submitReservation } from '../lib/reservations'
import { isValidEmail } from '../lib/validate'

import { QUIZ_STORAGE_KEY, INTAKE_KEY } from '../lib/quizPlan'
import { cleanAnswers, PROFILE_VERSION, planIntakeFromAnswers, CONSENT_VERSION } from '../../shared/profile.mjs'
import { CALLBACK_CONSENT_VERSION } from '../../shared/callback.mjs'
export { QUIZ_STORAGE_KEY } from '../lib/quizPlan'

export type CheckoutForm = {
  firstName: string
  lastName: string
  email: string
  phone: string
  state: string
  resident: boolean
  attest: boolean
  upsell: boolean
  smsOptIn: boolean
  callbackConsent: boolean
  callbackConsentVersion: string
  healthConsent: boolean
  marketingConsent: boolean
}

/* Hero prompt chip → matching q2 priority option. */
const PROMPT_TO_Q2: Record<string, string> = {
  strength: 'a',
  energy: 'b',
  digestive: 'c',
  maintenance: 'd',
}

export type QuizSnapshot = {
  version?: number
  startedTracked?: boolean
  quizId?: string
  entryPrompt?: string
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
  smsOptIn: false,
  callbackConsent: false,
  callbackConsentVersion: '',
  healthConsent: false,
  marketingConsent: false,
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
  const [entryPrompt, setEntryPrompt] = useState<string | undefined>()
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
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    const saved = loadSnapshot()
    if (saved && saved.version === PROFILE_VERSION && saved.checkout?.healthConsent && !saved.completed && isStepId(saved.current)) {
      if (saved.quizId) setQuizId(saved.quizId)
      setEntryPrompt(saved.entryPrompt ?? getQuizPrompt())
      setCurrent(saved.current)
      setHistory(saved.history)
      setAnswers(cleanAnswers(saved.answers))
      startedEvent.current = Boolean(saved.startedTracked)
      setShown(saved.shown)
      setCheckout({ ...emptyCheckout, ...saved.checkout, callbackConsent: saved.checkout.callbackConsent === true && saved.checkout.callbackConsentVersion === CALLBACK_CONSENT_VERSION })
      setStartedAt(saved.startedAt)
      setCompleted(saved.completed)
      setIdentifiedEmail(saved.identifiedEmail)
    } else {
      // Fresh quiz: carry the hero prompt chip in as a pre-selected q2 priority.
      const prompt = getQuizPrompt()
      if (prompt) {
        setEntryPrompt(prompt)
        const option = PROMPT_TO_Q2[prompt]
        if (option) setAnswers((a) => ({ ...a, q2: [option] }))
      }
    }
    restored.current = true
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated || !checkout.healthConsent) return
    persist({
      version: PROFILE_VERSION,
      startedTracked: startedEvent.current,
      quizId,
      entryPrompt,
      current,
      history,
      answers,
      shown,
      checkout,
      startedAt,
      completed,
      identifiedEmail,
    })
  }, [answers, checkout, completed, current, entryPrompt, history, hydrated, identifiedEmail, quizId, shown, startedAt])

  useEffect(() => {
    if (!hydrated || !checkout.healthConsent) return
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
  }, [answers, current, hydrated, checkout.healthConsent])

  useEffect(() => {
    if (!hydrated) return

    const abandon = () => {
      if (!startedEvent.current || completed || abandonedSent.current) return
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
      if (!checkout.healthConsent || !isQuestionId(current)) return
      if (!startedEvent.current) {
        startedEvent.current = true
        setStartedAt(Date.now())
        track('quiz_started', { source: getQuizSource() })
      }
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
    [answers.q2, current, checkout.healthConsent],
  )

  const setPlanAnswer = useCallback((key: PlanAnswerKey, value: string) => {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [key]: value }))
    // Health context stays out of analytics. Only the completion of a refinement is measured.
    track('plan_refinement_answered', { question_id: key })
  }, [])

  const setSensitivities = useCallback((values: string[]) => {
    setAnswers((currentAnswers) => cleanAnswers({ ...currentAnswers, sensitivities: values }))
    track('plan_refinement_answered', { question_id: 'sensitivities' })
  }, [])

  const goNext = useCallback(() => {
    if (current === 'plan_build') {
      const intake = planIntakeFromAnswers(answers)
      if (intake) { try { localStorage.setItem(INTAKE_KEY, JSON.stringify(intake)) } catch { /* private mode */ } }
    }
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
      setIdentifiedEmail(email.trim())
    },
    [checkout.email, identifiedEmail],
  )

  const captureEmail = useCallback(
    async ({
      firstName,
      email,
      healthConsent,
      marketingConsent,
    }: {
      firstName: string
      email: string
      healthConsent: boolean
      marketingConsent: boolean
    }) => {
      const clean = email.trim()
      const name = firstName.trim()
      if (!isValidEmail(clean) || name.length < 2 || !healthConsent) return false
      const reserveBox = false
      const saved = await postQuizProgress({ quizId, step: current, email: clean, firstName: name, pathways: [], sendGuide: true, source: getQuizSource(), healthConsent, marketingConsent, reserveBox, profile: cleanAnswers(answers), consentVersion: CONSENT_VERSION })
      if (!saved.ok) return false
      setCheckout((c) => ({
        ...c,
        firstName: name,
        email: clean,
        healthConsent,
        marketingConsent,
        upsell: c.upsell || reserveBox,
      }))
      track('quiz_email_captured', {
        step_id: current,
        health_consent: healthConsent,
        marketing_consent: marketingConsent,
        reserve_box: reserveBox,
      })
      track('email_submitted', { source: getQuizSource(), reserve_box: reserveBox })
      setIdentifiedEmail(clean)
      return true
    },
    [current, quizId, answers],
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
      quizId,
      firstName: checkout.firstName,
      lastName: checkout.lastName,
      email: checkout.email,
      phone: checkout.phone,
      smsOptIn: checkout.smsOptIn,
      callbackConsent: checkout.callbackConsent,
      callbackConsentVersion: checkout.callbackConsentVersion,
      state: checkout.state,
      resident: checkout.resident,
      attest: checkout.attest,
      upsell: checkout.upsell,
      source: getQuizSource(),
      healthConsent: checkout.healthConsent,
      marketingConsent: checkout.marketingConsent,
      priorities: derivePathways(answers),
      profile: cleanAnswers(answers), consentVersion: CONSENT_VERSION,
    })

    if (!result.ok) {
      setSubmitState('error')
      track('reservation_submit_failed', { error: result.error })
      return
    }

    setSubmitState('idle')
    setReservationId(result.id)
    setEmailSent(result.emailSent)
    setCheckout((form) => ({ ...form, callbackConsent: result.callbackRequested }))
    identifyIfReady()
    track('quiz_completed', { pathways: derivePathways(answers) })
    track('founding_reservation_submitted', {
      state: checkout.state,
      lean_mass_interest: checkout.upsell,
      pathways: derivePathways(answers),
      due_today: 0,
      reservation_id: result.id,
    })
    setCompleted(true)
    abandonedSent.current = true
    setHistory((h) => [...h, current])
    setCurrent('success')
  }, [answers, checkout, current, identifyIfReady, quizId, submitState])

  const reset = useCallback(() => {
    localStorage.removeItem(QUIZ_STORAGE_KEY)
    localStorage.removeItem(INTAKE_KEY)
    startedEvent.current = false
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
    setEmailSent(false)
    lastViewed.current = null
    abandonedSent.current = false
    completedEvent.current = false
  }, [])

  return {
    quizId,
    hydrated,
    current,
    historyLength: history.length,
    answers,
    checkout,
    completed,
    submitState,
    reservationId,
    emailSent,
    canGoBack: history.length > 0 && current !== 'success',
    pathways: derivePathways(answers),
    selectOption,
    setPlanAnswer,
    setSensitivities,
    goNext,
    goBack,
    patchCheckout,
    identifyIfReady,
    captureEmail,
    submitCheckout,
    reset,
  }
}
