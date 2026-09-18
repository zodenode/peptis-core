import { useState, type FormEvent } from 'react'
import { checkoutCopy } from '../../data/quiz'
import { US_STATES } from '../../data/usStates'
import type { CheckoutForm } from '../../hooks/useQuizEngine'
import { isValidEmail } from '../../lib/validate'

type Props = {
  form: CheckoutForm
  onChange: (patch: Partial<CheckoutForm>) => void
  onSubmit: () => void
  onBack: () => void
  canGoBack: boolean
  pathways: string[]
  submitState: 'idle' | 'submitting' | 'error'
}

const pathwayLabels: Record<string, string> = {
  muscle_protection: 'Strength and function',
  cellular_energy: 'Energy and recovery',
  gi_repair: 'Digestive comfort',
  rebound_protection: 'Maintenance planning',
}

export function Checkout({ form, onChange, onSubmit, onBack, canGoBack, pathways, submitState }: Props) {
  const [attempted, setAttempted] = useState(false)
  const errors = {
    firstName: form.firstName.trim().length > 1 ? '' : 'Enter your first name.',
    lastName: '',
    email: isValidEmail(form.email) ? '' : 'Enter a valid email address, like name@example.com.',
    phone:
      form.phone.trim().length === 0 || form.phone.trim().length >= 7
        ? ''
        : 'Enter a valid phone number or leave this blank.',
    state: form.state.length === 2 ? '' : 'Select your state of residence.',
  }
  const ready =
    !errors.firstName &&
    !errors.email &&
    !errors.phone &&
    !errors.state &&
    form.resident &&
    form.attest

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setAttempted(true)
    if (!ready || submitState === 'submitting') return
    onSubmit()
  }

  const fieldError = (key: keyof typeof errors) => (attempted && errors[key] ? errors[key] : null)

  return (
    <div className="quiz-card checkout-card">
      <form className="quiz-body" onSubmit={handleSubmit} noValidate>
        <p className="quiz-kicker">{checkoutCopy.eyebrow}</p>
        <h1 className="quiz-title">Save your summary</h1>
        <p className="quiz-hint">
          The check and starter plan are free. The first paid product we intend to sell is the
          Lean Mass nutrition box at $59 a month. It is not for sale today because we cannot
          charge or ship.
        </p>

        <fieldset className="plan-box">
          <legend>What you are joining</legend>
          <div className="plan-price-row">
            <div>
              <p className="plan-name">Due today</p>
              <p className="plan-price">$0</p>
            </div>
            <div>
              <p className="plan-name">Lean Mass box</p>
              <p className="plan-price">Not for sale</p>
            </div>
          </div>
          <p className="plan-savings">
            The intended box price is $59 a month. That figure appears as a live charge only
            after we can take payment and ship, and only if you choose to buy.
          </p>

          <div className="plan-section">
            <h2>Included now</h2>
            <ul>
              <li>Your written summary: {pathways.map((p) => pathwayLabels[p]).filter(Boolean).join(', ') || 'continuity readiness'}</li>
              <li>The training starter plan on this site</li>
              <li>Updates if you ask about the Lean Mass nutrition box</li>
              <li>Cancel updates any time from the confirmation email</li>
              <li>No charge and no payment details</li>
            </ul>
          </div>
          <div className="plan-section">
            <h2>What may happen later</h2>
            <ul>
              <li>A chance to buy the Lean Mass nutrition box if we can charge and ship</li>
              <li>Separate notice if a clinical programme later launches in your state</li>
            </ul>
          </div>
          <div className="plan-section plan-not-promised">
            <h2>Not included today</h2>
            <p>
              No clinician review, prescription, medical service, medication, pharmacy fulfillment,
              or guaranteed eligibility is included today.
            </p>
          </div>

          <label className={`check-card optional-card${form.upsell ? ' is-selected' : ''}`}>
            <input
              type="checkbox"
              checked={form.upsell}
              onChange={(e) => onChange({ upsell: e.target.checked })}
            />
            <span className="check-mark" aria-hidden="true">✓</span>
            <span className="check-copy">
              <strong>Tell me when the Lean Mass nutrition box can ship</strong>
              <span>Intended $59 a month. Asking does not place an order. Nothing ships today.</span>
            </span>
          </label>
        </fieldset>

        <div className="form-grid">
          <label>
            First name
            <input
              autoComplete="given-name"
              value={form.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              aria-invalid={Boolean(fieldError('firstName'))}
              aria-describedby={fieldError('firstName') ? 'error-first-name' : undefined}
              required
            />
            {fieldError('firstName') ? (
              <span className="field-error" id="error-first-name">{errors.firstName}</span>
            ) : null}
          </label>
          <label>
            Last name (optional)
            <input
              autoComplete="family-name"
              value={form.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
            />
          </label>
          <label className="span-2">
            Email
            <input
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => onChange({ email: e.target.value })}
              aria-invalid={Boolean(fieldError('email'))}
              aria-describedby={fieldError('email') ? 'error-email' : undefined}
              required
            />
            {fieldError('email') ? (
              <span className="field-error" id="error-email">{errors.email}</span>
            ) : null}
          </label>
          <label>
            Mobile phone (optional)
            <input
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              aria-invalid={Boolean(fieldError('phone'))}
              aria-describedby={fieldError('phone') ? 'error-phone' : undefined}
            />
            {fieldError('phone') ? (
              <span className="field-error" id="error-phone">{errors.phone}</span>
            ) : null}
          </label>
          {form.phone.trim().length >= 7 ? (
            <label className={`check-card optional-card span-2${form.smsOptIn ? ' is-selected' : ''}`}>
              <input
                type="checkbox"
                checked={form.smsOptIn}
                onChange={(e) => onChange({ smsOptIn: e.target.checked })}
              />
              <span className="check-mark" aria-hidden="true">✓</span>
              <span className="check-copy">
                <strong>Text me when the nutrition box can ship</strong>
                <span>Optional. Product updates only. You can stop any time.</span>
              </span>
            </label>
          ) : null}
          <label className="span-2">
            State of residence
            <select
              value={form.state}
              onChange={(e) => onChange({ state: e.target.value })}
              aria-invalid={Boolean(fieldError('state'))}
              aria-describedby={fieldError('state') ? 'error-state' : undefined}
              required
            >
              <option value="">Select state</option>
              {US_STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
            {fieldError('state') ? (
              <span className="field-error" id="error-state">{errors.state}</span>
            ) : null}
          </label>
        </div>

        <fieldset className="attestations" aria-describedby={attempted && (!form.resident || !form.attest) ? 'attestation-error' : undefined}>
          <legend>Required confirmations</legend>
        <label className={`check-card${form.resident ? ' is-selected' : ''}`}>
          <input
            type="checkbox"
            checked={form.resident}
            onChange={(e) => onChange({ resident: e.target.checked })}
            aria-invalid={attempted && !form.resident}
            required
          />
          <span className="check-mark" aria-hidden="true">✓</span>
          <span className="check-copy">
            <strong>State information is accurate</strong>
            <span>I confirm I currently reside in the selected U.S. state for shipping and update purposes.</span>
          </span>
        </label>
        <label className={`check-card${form.attest ? ' is-selected' : ''}`}>
          <input
            type="checkbox"
            checked={form.attest}
            onChange={(e) => onChange({ attest: e.target.checked })}
            aria-invalid={attempted && !form.attest}
            required
          />
          <span className="check-mark" aria-hidden="true">✓</span>
          <span className="check-copy">
            <strong>I am asking for updates, not buying a product or receiving care</strong>
            <span>
              I understand there is no charge, shipment, clinical review, prescription, medical
              service, or guarantee of future eligibility today.
            </span>
          </span>
        </label>
        {attempted && (!form.resident || !form.attest) ? (
          <p className="form-error" id="attestation-error" role="alert">
            Confirm both required statements to continue.
          </p>
        ) : null}
        </fieldset>

        <p className="pricing-disclaimer">
          The $59 figure is the intended box price and may change before a real sale. Nothing is
          charged until we can take payment, ship, and you choose to buy.
        </p>
        {submitState === 'error' ? (
          <p className="form-error" role="alert">
            We could not save your details just now. Your answers are still here. Please check
            your connection and try again.
          </p>
        ) : null}
        <div className="quiz-actions">
          <button type="button" className="btn-text" onClick={onBack} disabled={!canGoBack}>
            ← Back
          </button>
          <button type="submit" className="btn btn-solid" disabled={submitState === 'submitting'}>
            {submitState === 'submitting' ? 'Saving your summary…' : 'Save my summary'}
          </button>
        </div>
      </form>
    </div>
  )
}
