import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useSignupReady } from '../../hooks/useSignupReady'
import { isValidEmail } from '../../lib/validate'

type Props = { source: string; buttonLabel: string; purpose?: 'starter_guide' | 'box_updates' }
export function LeadCapture({ source, buttonLabel, purpose = 'starter_guide' }: Props) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [state, setState] = useState<'idle' | 'submitting' | 'done' | 'saved' | 'error'>('idle')
  const signupReady = useSignupReady()
  const box = purpose === 'box_updates'
  const ready = firstName.trim().length > 1 && isValidEmail(email) && (!box || marketingConsent)
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!ready || state === 'submitting') return
    setState('submitting')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim(), source, purpose, marketingConsent }),
        signal: AbortSignal.timeout(25000),
      })
      const data = await res.json()
      if (!res.ok || !data?.ok) throw new Error('save_failed')
      setState(data.guideSent ? 'done' : 'saved')
    } catch { setState('error') }
  }
  if (signupReady === false) return <p role="status">Email signup is temporarily unavailable. You can still <Link to="/publication/training/two-day-strength-plan">read the free starter guide</Link>.</p>
  if (state === 'done' || state === 'saved') return (
    <div role="status">
      <p>{box ? 'Your interest is saved.' : 'Your request is saved.'} {state === 'done' ? `We sent a confirmation to ${email}.` : 'We could not send the email just now.'}</p>
      {!box && <Link to="/publication/training/two-day-strength-plan">Open your free starter guide</Link>}
      {state === 'saved' && <p>Contact <a href="mailto:support@peptis.co">support@peptis.co</a> if you need help.</p>}
    </div>
  )
  return (
    <form className="hero-lead-form" onSubmit={onSubmit}>
      <label><span>First name</span><input autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /></label>
      <label><span>Email</span><input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
      <label className="consent-line lead-consent">
        <input type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)} />
        <span>{box ? 'Email me when the Lean Mass box is ready and its price and contents are confirmed.' : 'Also email me Peptis product updates (optional).'} Unsubscribe any time.</span>
      </label>
      <p className="lead-consent">We use your details to send the resource or updates you request. <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link>.</p>
      <button type="submit" className="btn btn-primary" disabled={!signupReady || !ready || state === 'submitting'}>{state === 'submitting' ? 'Saving…' : buttonLabel}</button>
      {state === 'error' && <p className="field-error" role="alert">Signup is unavailable just now. Please try again later. You can still <Link to="/publication/training/two-day-strength-plan">read the free starter guide</Link>.</p>}
    </form>
  )
}
