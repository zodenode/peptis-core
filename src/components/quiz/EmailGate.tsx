import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isValidEmail } from '../../lib/validate'

export type EmailGatePayload = {
  firstName: string
  email: string
  healthConsent: boolean
  marketingConsent: boolean
}

type Props = {
  initialFirstName: string
  initialEmail: string
  onCapture: (payload: EmailGatePayload) => void
  onContinue: () => void
  onBack: () => void
  canGoBack: boolean
}

export function EmailGate({
  initialFirstName,
  initialEmail,
  onCapture,
  onContinue,
  onBack,
  canGoBack,
}: Props) {
  const [firstName, setFirstName] = useState(initialFirstName)
  const [email, setEmail] = useState(initialEmail)
  const [healthConsent, setHealthConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [touched, setTouched] = useState(false)

  const nameReady = firstName.trim().length > 1
  const emailReady = isValidEmail(email)
  const valid = nameReady && emailReady && healthConsent
  const showNameError = touched && !nameReady
  const showEmailError = touched && email.trim().length > 0 && !emailReady
  const showConsentError = touched && !healthConsent

  const submit = () => {
    setTouched(true)
    if (!valid) return
    onCapture({
      firstName: firstName.trim(),
      email: email.trim(),
      healthConsent,
      marketingConsent,
    })
    onContinue()
  }

  return (
    <article className="quiz-card email-gate-card">
      <div className="email-gate-visual" aria-hidden="true">
        <span className="email-gate-orb" />
        <span className="email-gate-doc">
          <span className="email-gate-doc-line" />
          <span className="email-gate-doc-line" />
          <span className="email-gate-doc-line is-short" />
        </span>
      </div>
      <div className="quiz-body email-gate-body">
        <p className="quiz-kicker">Save your continuity check</p>
        <h1>Where should we send your summary?</h1>
        <p>
          Two of eight questions are in. Leave your name and email for written priorities and the
          free two-day strength starter plan. No card.
        </p>
        <div className="email-gate-field">
          <label htmlFor="email-gate-name">First name</label>
          <input
            id="email-gate-name"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={showNameError || undefined}
          />
          {showNameError ? (
            <p className="field-error" role="alert">
              Enter your first name.
            </p>
          ) : null}
        </div>
        <div className="email-gate-field">
          <label htmlFor="email-gate-input">Email</label>
          <input
            id="email-gate-input"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit()
            }}
            aria-invalid={showEmailError || undefined}
          />
          {showEmailError ? (
            <p className="field-error" role="alert">
              Enter a valid email address.
            </p>
          ) : null}
        </div>
        <label className="consent-line">
          <input
            type="checkbox"
            checked={healthConsent}
            onChange={(event) => setHealthConsent(event.target.checked)}
          />
          <span>
            I agree that Peptis may collect the health-related answers I give in this check, as
            described in the <Link to="/health-data">Consumer Health Data Notice</Link>.
          </span>
        </label>
        <label className="consent-line">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(event) => setMarketingConsent(event.target.checked)}
          />
          <span>Email me occasional product updates, including when the $59 box can ship.</span>
        </label>
        {showConsentError ? (
          <p className="field-error" role="alert">
            Health-data consent is required to save your summary.
          </p>
        ) : null}
        <div className="quiz-actions">
          {canGoBack ? (
            <button type="button" className="btn btn-ghost" onClick={onBack}>
              Back
            </button>
          ) : null}
          <button type="button" className="btn btn-primary" onClick={submit} disabled={!valid}>
            Email my summary
          </button>
        </div>
        <p className="email-gate-note">
          By continuing you also agree to the <Link to="/terms">Terms</Link> and{' '}
          <Link to="/privacy">Privacy Policy</Link>. You can unsubscribe any time.
        </p>
      </div>
    </article>
  )
}
