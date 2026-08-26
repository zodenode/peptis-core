import type { ReactNode } from 'react'
import type { ContinuityTerms } from '../../data/continuityConfig'
import type { StopBlockStep } from '../../data/quiz'

type Props = {
  step: StopBlockStep
  terms: ContinuityTerms | null
  onContinue: () => void
  onBack: () => void
  canGoBack: boolean
  children?: ReactNode
}

export function StopBlock({ step, terms, onContinue, onBack, canGoBack, children }: Props) {
  return (
    <div className="stop-block">
      {children}
      <div className="stop-media" aria-hidden="true">
        <img src={step.image} alt="" />
      </div>
      <div className="stop-panel">
        <p className="eyebrow eyebrow-light">{step.eyebrow}</p>
        <h1>{step.title}</h1>
        {step.paragraphs(terms).map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
        <div className="quiz-actions">
          <button type="button" className="btn-text btn-text-light" onClick={onBack} disabled={!canGoBack}>
            ← Back
          </button>
          <button type="button" className="btn btn-primary" onClick={onContinue}>
            {step.cta}
          </button>
        </div>
      </div>
    </div>
  )
}
