import { Link } from 'react-router-dom'
import { useCallback, useState } from 'react'
import {
  checkoutCopy,
  isQuestionId,
  questions,
  resolveExplainer,
} from '../../data/quiz'
import { useContinuityTerms } from '../../hooks/useContinuityTerms'
import { useQuizEngine } from '../../hooks/useQuizEngine'
import { Checkout } from './Checkout'
import { EmailGate } from './EmailGate'
import { ExplainerPage } from './ExplainerPage'
import { PlanBuild, TreatmentContext } from './PlanBuild'
import { providerLogoSrcs } from '../../data/planBuild'
import { QuizQuestion } from './QuizQuestion'
import { Success } from './Success'
import { SummaryReveal } from './SummaryReveal'
import { TrajectoryReveal } from './TrajectoryReveal'
import { ChapterProgress } from './ChapterProgress'

type Props = {
  embedded?: boolean
}

export function QuizFlow({ embedded = false }: Props) {
  const terms = useContinuityTerms()
  const quiz = useQuizEngine()
  const question = isQuestionId(quiz.current) ? questions[quiz.current] : undefined
  const explainer = resolveExplainer(quiz.current, quiz.answers, terms)
  const [micro, setMicro] = useState({ step: '', progress: 0 })
  const currentStep = quiz.current
  const onMicroProgress = useCallback((progress: number) => setMicro({ step: currentStep, progress }), [currentStep])

  if (!quiz.hydrated) {
    return (
      <div className={`quiz-shell${embedded ? ' is-embedded' : ''}`}>
        <div className="quiz-card quiz-skeleton" aria-busy="true">
          <p>Loading your assessment…</p>
        </div>
      </div>
    )
  }

  if (!quiz.checkout.healthConsent) return (
    <div className="quiz-shell"><article className="quiz-card"><div className="quiz-body">
      <p className="quiz-kicker">Before your free check</p><h1>Your answers, your choice</h1>
      <p>This check asks about treatment, strength, energy and eating. Peptis uses your answers to build an educational summary on this device. If you request an email, we save your contact details, consent and summary priorities and send them through our email provider. When you choose to save or email your plan, we also save your treatment details and routine answers to personalise it.</p>
      <p>Read the <Link to="/health-data">Consumer Health Data Notice</Link>. You can withdraw consent or request deletion at support@peptis.co.</p>
      <label className="consent-line"><input type="checkbox" onChange={(event) => { if (event.target.checked) quiz.patchCheckout({ healthConsent: true }) }} /><span>I am 18 or older and agree to Peptis collecting and using my health-related answers for this check and any summary I request.</span></label>
      <p>You can also <Link to="/publication/training/two-day-strength-plan">read the free starter guide</Link> without taking the check.</p>
    </div></article></div>
  )

  return (
    <div className={`quiz-shell${embedded ? ' is-embedded' : ''}`}>
      <div className="visually-hidden" aria-hidden="true">
        {providerLogoSrcs.map((src) => (
          <img key={src} src={src} alt="" width="72" height="28" decoding="async" />
        ))}
      </div>
      <ChapterProgress key={quiz.quizId} step={quiz.current} answers={quiz.answers} microProgress={micro.step === quiz.current ? micro.progress : 0} />

      <div className="quiz-stage">
        {question ? (
          <QuizQuestion
            key={question.id}
            step={question}
            answers={quiz.answers}
            onSelect={quiz.selectOption}
            onNext={quiz.goNext}
            onBack={quiz.goBack}
            canGoBack={quiz.canGoBack}
          />
        ) : null}

        {explainer ? (
          <ExplainerPage
            key={explainer.stepId}
            content={explainer}
            terms={terms}
            onContinue={quiz.goNext}
            onBack={quiz.goBack}
            canGoBack={quiz.canGoBack}
          />
        ) : null}

        {quiz.current === 'treatment_context' ? <TreatmentContext answers={quiz.answers} onAnswer={quiz.setPlanAnswer} onContinue={quiz.goNext} onBack={quiz.goBack} canGoBack={quiz.canGoBack} onProgress={onMicroProgress} /> : null}

        {quiz.current === 'email_gate' ? (
          <EmailGate
            initialFirstName={quiz.checkout.firstName}
            initialEmail={quiz.checkout.email}
            onCapture={quiz.captureEmail}
            onContinue={quiz.goNext}
            onBack={quiz.goBack}
            canGoBack={quiz.canGoBack}
          />
        ) : null}

        {quiz.current === 'summary_mid' ? (
          <SummaryReveal
            pathways={quiz.pathways}
            onContinue={quiz.goNext}
            onBack={quiz.goBack}
            canGoBack={quiz.canGoBack}
          />
        ) : null}

        {quiz.current === 'plan_build' ? (
          <PlanBuild
            answers={quiz.answers}
            onAnswer={quiz.setPlanAnswer}
            onContinue={quiz.goNext}
            onBack={quiz.goBack}
            canGoBack={quiz.canGoBack}
            onSensitivitiesChange={quiz.setSensitivities}
            onProgress={onMicroProgress}
          />
        ) : null}

        {quiz.current === 'trajectory' ? (
          <TrajectoryReveal
            firstName={quiz.checkout.firstName}
            answers={quiz.answers}
            pathways={quiz.pathways}
            onContinue={quiz.goNext}
            onBack={quiz.goBack}
            canGoBack={quiz.canGoBack}
          />
        ) : null}

        {quiz.current === 'checkout' ? (
          <Checkout
            form={quiz.checkout}
            onChange={quiz.patchCheckout}
            onSubmit={quiz.submitCheckout}
            onBack={quiz.goBack}
            canGoBack={quiz.canGoBack}
            pathways={quiz.pathways}
            submitState={quiz.submitState}
          />
        ) : null}

        {quiz.current === 'success' ? (
          <Success
            answers={quiz.answers}
            form={quiz.checkout}
            pathways={quiz.pathways}
            reservationId={quiz.reservationId}
            emailSent={quiz.emailSent}
            onReset={quiz.reset}
          />
        ) : null}
      </div>

      <p className="quiz-trust">
        Free check. Eight core questions, then a few planning details. Email is requested after question two.
        {embedded ? ` ${checkoutCopy.eyebrow}.` : null}
      </p>
    </div>
  )
}
