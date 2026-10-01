export const CALLBACK_CONSENT_VERSION = '2026-09-30'
export const CALLBACK_CONSENT_TEXT = 'I agree that Information Edge Insights LLC, trading as Peptis, may call the number I provide to discuss my starter plan and Peptis programme options. This is optional and is not required to get my free plan or buy anything. This permission is for a manually dialled call, not automated calls or text messages. I can withdraw it at support@peptis.co.'

// Formatting validation only: this does not verify ownership or reachability.
export function normalizePhone(value) {
  if (typeof value !== 'string') return null
  const raw = value.trim()
  if (!raw) return ''
  if (raw.length > 40 || !/^\+?[\d\s().-]+$/.test(raw)) return null
  const digits = raw.replace(/\D/g, '')
  if (raw.startsWith('+')) return /^[1-9]\d{7,14}$/.test(digits) ? `+${digits}` : null
  if (/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return `+1${digits}`
  if (/^1[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return `+${digits}`
  return null
}

export function validateCallback({ phone = '', callbackConsent = false, callbackConsentVersion = '' } = {}) {
  const normalized = normalizePhone(phone)
  if (normalized === null) return { ok: false, error: 'invalid_phone' }
  if (!normalized && callbackConsent === true) return { ok: false, error: 'callback_phone_required' }
  if (normalized && callbackConsent !== true) return { ok: false, error: 'callback_consent_required' }
  if (normalized && callbackConsentVersion !== CALLBACK_CONSENT_VERSION) return { ok: false, error: 'renew_callback_consent' }
  return { ok: true, phone: normalized, callbackConsent: Boolean(normalized) }
}
