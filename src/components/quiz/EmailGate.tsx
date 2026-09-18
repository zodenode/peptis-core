import { useState } from 'react'
import { isValidEmail } from '../../lib/validate'

type Props = {
  initialFirstName: string
  initialEmail: string
  onCapture: (payload: { firstName: string; email: string }) => void
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
  const [touched, setTouched] = useState(false)

  const nameReady = firstName.trim().length > 1
  const emailReady = isValidEmail(email)
  const valid = nameReady && emailReady
  const showNameError = touched && !nameReady
  const showEmailError = touched && email.trim().length > 0 && !emailReady

  const submit = () => {
    setTouched(true)
    if (!valid) return
    onCapture({ firstName: firstName.trim(), email: email.trim() })
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
          Two questions in. Leave your name and email and we will send your written priorities,
          plus the free two-day strength starter plan. No card. Education only, not care today.
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
          Education only, not medical advice. No spam. You can unsubscribe any time.
        </p>
      </div>
    </article>
  )
}
