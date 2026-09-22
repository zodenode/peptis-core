import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignupReady } from '../../hooks/useSignupReady'
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
  onCapture: (payload: EmailGatePayload) => Promise<boolean>
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
  const signupReady = useSignupReady()
  const [firstName, setFirstName] = useState(initialFirstName)
  const [email, setEmail] = useState(initialEmail)
  const [healthConsent, setHealthConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)
  const [touched, setTouched] = useState(false)

  const nameReady = firstName.trim().length > 1
  const emailReady = isValidEmail(email)
  const valid = nameReady && emailReady && healthConsent
  const showNameError = touched && !nameReady
  const showEmailError = touched && email.trim().length > 0 && !emailReady
  const showConsentError = touched && !healthConsent

  const submit = async () => {
    setTouched(true)
    if (!valid || saving) return
    setSaving(true)
    setError(false)
    const saved = await onCapture({
      firstName: firstName.trim(),
      email: email.trim(),
      healthConsent,
      marketingConsent,
    })
    setSaving(false)
    if (saved) onContinue()
    else setError(true)
  }

  if (signupReady === false) return <article className="quiz-card"><div className="quiz-body"><h1>Continue with your free check</h1><p>Email delivery is temporarily unavailable. You can see your priorities on screen and build your starter plan.</p><button className="btn btn-primary" type="button" onClick={onContinue}>Continue without email</button></div></article>
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
        <h1>Where should we send your starter guide?</h1>
        <p>
          Two of eight questions are in. We’ll send your free starter guide now. Finish the check to receive your written priorities. No card.
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
        {error && <p role="alert">We could not save your details. Your answers are still here. You can <Link to="/plan">open the free training plan</Link> now.</p>}
        <div className="quiz-actions">
          {canGoBack ? (
            <button type="button" className="btn btn-ghost" onClick={onBack}>
              Back
            </button>
          ) : null}
          <button type="button" className="btn btn-primary" onClick={submit} disabled={!signupReady || !valid || saving}>
            {saving ? 'Saving…' : 'Send my starter guide and continue'}
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
