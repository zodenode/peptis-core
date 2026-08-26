import { useEffect, useRef } from 'react'
import type { Answers, QuestionStep } from '../../data/quiz'

type Props = {
  step: QuestionStep
  answers: Answers
  onSelect: (optionId: string) => void
  onNext: () => void
  onBack: () => void
  canGoBack: boolean
}

const AUTO_ADVANCE_MS = 350

function selectedIds(step: QuestionStep, answers: Answers): string[] {
  if (step.multi) return answers.q2 ?? []
  const value = answers[step.id]
  return typeof value === 'string' ? [value] : []
}

export function QuizQuestion({ step, answers, onSelect, onNext, onBack, canGoBack }: Props) {
  const selected = selectedIds(step, answers)
  const canContinue = selected.length > 0
  const advanced = useRef(false)
  const timeout = useRef<number | null>(null)
  const onNextRef = useRef(onNext)
  onNextRef.current = onNext

  useEffect(() => {
    advanced.current = false
    return () => {
      if (timeout.current) window.clearTimeout(timeout.current)
    }
  }, [step.id])

  const advance = () => {
    if (advanced.current) return
    advanced.current = true
    onNextRef.current()
  }

  const handleSelect = (optionId: string) => {
    onSelect(optionId)
    if (step.multi) return
    if (timeout.current) window.clearTimeout(timeout.current)
    timeout.current = window.setTimeout(advance, AUTO_ADVANCE_MS)
  }

  return (
    <div className="quiz-card quiz-question-card">
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
                onClick={() => handleSelect(option.id)}
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
          <button type="button" className="btn btn-solid" onClick={advance} disabled={!canContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
