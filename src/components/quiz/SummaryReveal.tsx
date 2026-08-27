import { useEffect, useRef } from 'react'
import { track } from '../../lib/analytics'

type Props = {
  pathways: string[]
  onContinue: () => void
  onBack: () => void
  canGoBack: boolean
}

const pathwayDetails: Record<string, { label: string; body: string }> = {
  muscle_protection: {
    label: 'Strength and function',
    body: 'Tracking strength, protein intake and resistance activity alongside weight.',
  },
  cellular_energy: {
    label: 'Energy and recovery',
    body: 'Organizing energy timing, sleep, nutrition and recovery patterns.',
  },
  gi_repair: {
    label: 'Digestive comfort',
    body: 'Recording meals, symptoms and current therapy details clearly.',
  },
  rebound_protection: {
    label: 'Maintenance planning',
    body: 'Building habits and monitoring that support progress over time.',
  },
}

export function SummaryReveal({ pathways, onContinue, onBack, canGoBack }: Props) {
  const viewed = useRef(false)

  useEffect(() => {
    if (viewed.current) return
    viewed.current = true
    track('quiz_summary_viewed', { pathways })
  }, [pathways])

  const items = pathways.map((p) => pathwayDetails[p]).filter(Boolean)

  return (
    <div className="quiz-card summary-card">
      <div className="quiz-body">
        <p className="quiz-kicker">Your summary so far</p>
        <h1 className="quiz-title">Here is what your answers are building</h1>
        <p>
          Based on your answers so far, your personalized summary will organize these priorities.
          The remaining questions refine it further.
        </p>
        {items.length > 0 ? (
          <ul className="summary-pathways">
            {items.map((item) => (
              <li key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.body}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="summary-pathways">
            <li>
              <strong>Continuity readiness</strong>
              <span>A baseline record of your routine, strength, energy and comfort.</span>
            </li>
          </ul>
        )}
        <p className="quiz-hint">
          This summary is educational and is not a diagnosis or treatment plan.
        </p>
        <div className="quiz-actions">
          <button type="button" className="btn-text" onClick={onBack} disabled={!canGoBack}>
            ← Back
          </button>
          <button type="button" className="btn btn-solid" onClick={onContinue}>
            Keep refining my summary
          </button>
        </div>
      </div>
    </div>
  )
}
