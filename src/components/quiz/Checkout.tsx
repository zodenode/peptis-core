import { useState, type FormEvent } from 'react'
import { StripeActivationBlock } from '../checkout/StripeActivationBlock'
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
}

const pathwayLabels: Record<string, string> = {
  muscle_protection: 'Strength and function',
  cellular_energy: 'Energy and recovery',
  gi_repair: 'Digestive comfort',
  rebound_protection: 'Maintenance planning',
}

export function Checkout({ form, onChange, onSubmit, onBack, canGoBack, pathways }: Props) {
  const [attempted, setAttempted] = useState(false)
  const errors = {
    firstName: form.firstName.trim().length > 1 ? '' : 'Enter your first name.',
    lastName: form.lastName.trim().length > 1 ? '' : 'Enter your last name.',
    email: isValidEmail(form.email) ? '' : 'Enter a valid email address, like name@example.com.',
    phone:
      form.phone.trim().length === 0 || form.phone.trim().length >= 7
        ? ''
        : 'Enter a valid phone number or leave this blank.',
    state: form.state.length === 2 ? '' : 'Select your state of residence.',
  }
  const ready =
    !errors.firstName &&
    !errors.lastName &&
    !errors.email &&
    !errors.phone &&
    !errors.state &&
    form.resident &&
    form.attest

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setAttempted(true)
    if (!ready) return
    onSubmit()
  }

  const fieldError = (key: keyof typeof errors) => (attempted && errors[key] ? errors[key] : null)

  return (
    <div className="quiz-card checkout-card">
      <form className="quiz-body" onSubmit={handleSubmit} noValidate>
        <p className="quiz-kicker">{checkoutCopy.eyebrow}</p>
        <h1 className="quiz-title">Peptis Core Continuity Founding Reservation</h1>
        <p className="quiz-hint">
          Reserve priority access for a future state-by-state launch. You are joining a waitlist,
          not requesting medical care or a prescription.
        </p>

        <fieldset className="plan-box">
          <legend>Your founding reservation</legend>
          <div className="plan-price-row">
            <div>
              <p className="plan-name">Due today</p>
              <p className="plan-price">$0</p>
            </div>
            <div>
              <p className="plan-name">Planned founding rate</p>
              <p className="plan-price">$299/month</p>
            </div>
          </div>
          <p className="plan-savings">
            The planned standard rate is $399 per month. Planned rates apply only if services
            launch, you are eligible and you choose to enroll under the final terms.
          </p>

          <div className="plan-section">
            <h2>Included with your reservation now</h2>
            <ul>
              <li>Priority launch updates for your state</li>
              <li>The opportunity to enroll at the planned $299 per month founding rate</li>
              <li>Your personalized summary: {pathways.map((p) => pathwayLabels[p]).filter(Boolean).join(', ') || 'continuity readiness'}</li>
              <li>A current therapy and readiness checklist</li>
              <li>Early education and portal access when available</li>
              <li>Cancel your reservation at any time</li>
              <li>No charge today and no payment details required</li>
            </ul>
          </div>
          <div className="plan-section">
            <h2>What may happen at launch</h2>
            <ul>
              <li>Eligibility screening after services become available in your state</li>
              <li>Opportunity to affirmatively enroll at the then-applicable founding terms</li>
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
              <strong>Notify me about the Lean Mass Supplement Bundle</strong>
              <span>Ask for updates about a possible $59 per month add on. Nothing ships today.</span>
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
            Last name
            <input
              autoComplete="family-name"
              value={form.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              aria-invalid={Boolean(fieldError('lastName'))}
              aria-describedby={fieldError('lastName') ? 'error-last-name' : undefined}
              required
            />
            {fieldError('lastName') ? (
              <span className="field-error" id="error-last-name">{errors.lastName}</span>
            ) : null}
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
          <legend>Required reservation attestations</legend>
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
            <span>I confirm I currently reside in the selected U.S. state for launch notifications and future screening.</span>
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
            <strong>I am requesting a reservation, not medical care</strong>
            <span>
              I understand there is no clinical review, prescription, medical service, charge, or
              guarantee of future eligibility today.
            </span>
          </span>
        </label>
        {attempted && (!form.resident || !form.attest) ? (
          <p className="form-error" id="attestation-error" role="alert">
            Confirm both required reservation attestations to continue.
          </p>
        ) : null}
        </fieldset>

        <StripeActivationBlock />

        <p className="pricing-disclaimer">
          Planned pricing and availability may change before activation. Activation begins only
          after services launch, eligibility and state availability are confirmed, and you
          affirmatively enroll.
        </p>
        <div className="quiz-actions">
          <button type="button" className="btn-text" onClick={onBack} disabled={!canGoBack}>
            ← Back
          </button>
          <button type="submit" className="btn btn-solid">
            Reserve for $0 today
          </button>
        </div>
      </form>
    </div>
  )
}
