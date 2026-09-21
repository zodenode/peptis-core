import { Link } from 'react-router-dom'
import type { CheckoutForm } from '../../hooks/useQuizEngine'

type Props = {
  form: CheckoutForm
  pathways: string[]
  reservationId: string | null
  onReset: () => void
}

const pathwayRecap: Record<string, { label: string; body: string }> = {
  muscle_protection: {
    label: 'Strength and function',
    body: 'Track load, repetitions and everyday tasks alongside weight.',
  },
  cellular_energy: {
    label: 'Energy and recovery',
    body: 'Note energy timing, sleep, meals and what helps.',
  },
  gi_repair: {
    label: 'Digestive comfort',
    body: 'Record meals, symptoms and current therapy details.',
  },
  rebound_protection: {
    label: 'Maintenance planning',
    body: 'Build habits and simple monitoring that outlast any single phase.',
  },
}

export function Success({ form, pathways, reservationId, onReset }: Props) {
  const recap = pathways.map((p) => pathwayRecap[p]).filter(Boolean)

  return (
    <div className="quiz-card success-card">
      <div className="success-mark" aria-hidden="true">
        <span>✓</span>
      </div>
      <div className="quiz-body">
        <p className="quiz-kicker">Your summary is saved</p>
        <h1 className="quiz-title">Your summary is saved, {form.firstName || 'there'}.</h1>
        <p>
          We will email {form.email || 'your email'} with your written priorities and the starter
          plan. This is not a purchase and not medical care.
        </p>
        {reservationId ? (
          <p className="quiz-hint">List reference: {reservationId}</p>
        ) : null}
        <div className="success-recap">
          <h2>Your continuity summary</h2>
          <ul className="summary-pathways">
            {(recap.length > 0
              ? recap
              : [
                  {
                    label: 'Continuity readiness',
                    body: 'A baseline record of your routine, strength, energy and comfort.',
                  },
                ]
            ).map((item) => (
              <li key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.body}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="quiz-hint">
          No charge was made. The founding box can be reserved with no card. Clinical services
          are not offered. No clinician review, prescription or pharmacy fulfillment has started.
        </p>
        {form.upsell ? (
          <p className="quiz-hint">
            You asked to hear when the Lean Mass nutrition box can ship at the intended $59 a
            month. Asking does not place an order.
          </p>
        ) : null}
        <div className="success-next">
          <h2>Start this week</h2>
          <p>
            Build your personalized starter program in one minute. It shows every movement with
            illustrations and exports to PDF, your calendar or the Hevy app.
          </p>
          <Link className="btn btn-primary" to="/plan">
            Build my strength program
          </Link>
        </div>
        <div className="quiz-actions">
          <Link className="btn-text" to="/">
            Return home
          </Link>
          <button type="button" className="btn btn-solid" onClick={onReset}>
            Start a new assessment
          </button>
        </div>
      </div>
    </div>
  )
}
