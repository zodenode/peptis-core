import { useState, type FormEvent } from 'react'
import { isValidEmail } from '../../lib/validate'

type Props = {
  source: string
  buttonLabel: string
}

export function LeadCapture({ source, buttonLabel }: Props) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  const ready = firstName.trim().length > 1 && isValidEmail(email)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!ready || state === 'submitting') return
    setState('submitting')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          source,
        }),
        signal: AbortSignal.timeout(12000),
      })
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null
      setState(res.ok && data?.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <p className="hero-micro" role="status">
        Saved. Check {email} for the starter plan. You can still take the 8-question check below.
      </p>
    )
  }

  return (
    <form className="hero-lead-form" onSubmit={onSubmit} noValidate>
      <label>
        <span className="visually-hidden">First name</span>
        <input
          autoComplete="given-name"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        <span className="visually-hidden">Email</span>
        <input
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="btn btn-primary" disabled={!ready || state === 'submitting'}>
        {state === 'submitting' ? 'Saving…' : buttonLabel}
      </button>
      {state === 'error' ? (
        <p className="field-error" role="alert">
          We could not save that just now. Try again, or continue with the check.
        </p>
      ) : null}
    </form>
  )
}
