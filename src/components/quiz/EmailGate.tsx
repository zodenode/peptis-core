import { useState } from 'react'
import { isValidEmail } from '../../lib/validate'

type Props = {
  initialEmail: string
  onCapture: (email: string, skipped: boolean) => void
  onContinue: () => void
  onBack: () => void
  canGoBack: boolean
}

export function EmailGate({ initialEmail, onCapture, onContinue, onBack, canGoBack }: Props) {
  const [email, setEmail] = useState(initialEmail)
  const [touched, setTouched] = useState(false)

  const valid = isValidEmail(email)
  const showError = touched && email.trim().length > 0 && !valid

  const submit = () => {
    setTouched(true)
    if (!valid) return
    onCapture(email, false)
    onContinue()
  }

  const skip = () => {
    onCapture('', true)
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
        <p className="quiz-kicker">Save your progress</p>
        <h1>Where should we send your summary?</h1>
        <p>
          Finish the check and we email your personalized summary of strength, protein and
          maintenance priorities. You also get our free two day strength starter plan right away,
          and your answers are saved if you need to step out.
        </p>
        <div className="email-gate-field">
          <label htmlFor="email-gate-input" className="visually-hidden">
            Email address
          </label>
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
            aria-invalid={showError || undefined}
          />
          {showError ? (
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
            Email my summary and plan
          </button>
        </div>
        <button type="button" className="email-gate-skip" onClick={skip}>
          Continue without email
        </button>
        <p className="email-gate-note">
          Education only, not medical advice. No spam and you can unsubscribe any time.
        </p>
      </div>
    </article>
  )
}
