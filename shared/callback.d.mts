export const CALLBACK_CONSENT_VERSION: string
export const CALLBACK_CONSENT_TEXT: string
export function normalizePhone(value: unknown): string | null
export function validateCallback(input?: { phone?: unknown; callbackConsent?: unknown; callbackConsentVersion?: unknown }): { ok: false; error: string } | { ok: true; phone: string; callbackConsent: boolean }
