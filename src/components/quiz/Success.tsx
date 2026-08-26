import { Link } from 'react-router-dom'
import type { CheckoutForm } from '../../hooks/useQuizEngine'

type Props = {
  form: CheckoutForm
  onReset: () => void
}

export function Success({ form, onReset }: Props) {
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
