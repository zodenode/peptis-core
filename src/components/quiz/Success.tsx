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
        <p className="quiz-kicker">Founding reservation confirmed</p>
        <h1 className="quiz-title">You are on the launch list, {form.firstName || 'there'}.</h1>
        <p>
          Your Peptis Core Continuity founding reservation and pathway summary are saved. We will
          contact {form.email || 'your email'} with state-by-state launch and eligibility screening
          updates.
        </p>
        {reservationId ? (
          <p className="quiz-hint">Reservation reference: {reservationId}</p>
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
          No charge was made and no medical service, clinical review, prescription, or pharmacy
          fulfillment has started. If services become available and you are eligible, you will
          choose whether to activate and enroll.
        </p>
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
