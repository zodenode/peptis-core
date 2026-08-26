import type { Answers, QuestionStep } from '../../data/quiz'

type Props = {
  step: QuestionStep
  answers: Answers
  onSelect: (optionId: string) => void
  onNext: () => void
  onBack: () => void
  canGoBack: boolean
}

function selectedIds(step: QuestionStep, answers: Answers): string[] {
  if (step.multi) return answers.q2 ?? []
  const value = answers[step.id]
  return typeof value === 'string' ? [value] : []
}

export function QuizQuestion({ step, answers, onSelect, onNext, onBack, canGoBack }: Props) {
  const selected = selectedIds(step, answers)
  const canContinue = selected.length > 0

  return (
    <div className="quiz-card">
      <div className="quiz-visual">
        <img src={step.image} alt={step.imageAlt} />
      </div>
      <div className="quiz-body">
        <p className="quiz-kicker">{step.topic}</p>
        <h1 className="quiz-title">{step.prompt}</h1>
        {step.multi ? <p className="quiz-note">Select all that apply.</p> : null}

        <div className="quiz-options" role={step.multi ? 'group' : 'radiogroup'} aria-label={step.topic}>
          {step.options.map((option) => {
            const active = selected.includes(option.id)
            return (
              <button
                key={option.id}
                type="button"
                className={`quiz-option${active ? ' is-selected' : ''}`}
                aria-pressed={step.multi ? active : undefined}
                aria-checked={step.multi ? undefined : active}
                role={step.multi ? undefined : 'radio'}
                onClick={() => onSelect(option.id)}
              >
                <span className="quiz-letter">{option.letter}</span>
                <span>{option.label}</span>
              </button>
            )
          })}
        </div>

        <p className="quiz-hint">{step.hint}</p>

        <div className="quiz-actions">
          <button type="button" className="btn-text" onClick={onBack} disabled={!canGoBack}>
            ← Back
          </button>
          <button type="button" className="btn btn-solid" onClick={onNext} disabled={!canContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
