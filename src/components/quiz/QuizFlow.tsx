import {
  checkoutCopy,
  isQuestionId,
  progressPercent,
  questions,
  resolveExplainer,
  stepMeta,
} from '../../data/quiz'
import { useContinuityTerms } from '../../hooks/useContinuityTerms'
import { useQuizEngine } from '../../hooks/useQuizEngine'
import { Checkout } from './Checkout'
import { ExplainerPage } from './ExplainerPage'
import { QuizQuestion } from './QuizQuestion'
import { Success } from './Success'

type Props = {
  embedded?: boolean
}

export function QuizFlow({ embedded = false }: Props) {
  const terms = useContinuityTerms()
  const quiz = useQuizEngine()
  const meta = stepMeta(quiz.current)
  const question = isQuestionId(quiz.current) ? questions[quiz.current] : undefined
  const explainer = resolveExplainer(quiz.current, quiz.answers, terms)
  const percent = progressPercent(quiz.current, quiz.historyLength)

  if (!quiz.hydrated) {
    return (
      <div className={`quiz-shell${embedded ? ' is-embedded' : ''}`}>
        <div className="quiz-card quiz-skeleton" aria-busy="true">
          <p>Loading your assessment…</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`quiz-shell${embedded ? ' is-embedded' : ''}`}>
      <div className="quiz-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <div className="quiz-progress-bar" style={{ width: `${percent}%` }} />
      </div>

      <div className="quiz-stage">
        {question ? (
          <QuizQuestion
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

        {quiz.current === 'checkout' ? (
          <Checkout
            form={quiz.checkout}
            onChange={quiz.patchCheckout}
            onIdentify={() => quiz.identifyIfReady()}
            onSubmit={quiz.submitCheckout}
            onBack={quiz.goBack}
            canGoBack={quiz.canGoBack}
            pathways={quiz.pathways}
          />
        ) : null}

        {quiz.current === 'success' ? <Success form={quiz.checkout} onReset={quiz.reset} /> : null}
      </div>

      <p className="quiz-trust">
        $0 reservation. No payment today. State-by-state launch.
        {embedded ? ` ${checkoutCopy.eyebrow}.` : null}
      </p>
      <p className="visually-hidden">Step type: {meta.step_id}</p>
    </div>
  )
}
