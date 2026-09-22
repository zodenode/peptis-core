export type ReservationPayload = {
  quizId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  smsOptIn?: boolean
  state: string
  resident: boolean
  attest: boolean
  upsell: boolean
  source?: string
  healthConsent: boolean
  marketingConsent: boolean
  priorities: string[]
}

export type ReservationResult =
  | { ok: true; id: string; emailSent: boolean }
  | { ok: false; error: string }

export async function submitReservation(payload: ReservationPayload): Promise<ReservationResult> {
  try {
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(25000),
    })
    const data = (await res.json().catch(() => null)) as { ok?: boolean; id?: string; emailSent?: boolean; error?: string } | null
    if (!res.ok || !data?.ok || !data.id) {
      return { ok: false, error: data?.error ?? `status_${res.status}` }
    }
    return { ok: true, id: data.id, emailSent: data.emailSent === true }
  } catch {
    return { ok: false, error: 'network' }
  }
}

export type ProgressPayload = {
  quizId: string
  step: string
  email?: string
  firstName?: string
  pathways: string[]
  entryPrompt?: string
  sendGuide?: boolean
  source?: string
  responses?: { id: string; prompt: string; labels: string[] }[]
  healthConsent?: boolean
  marketingConsent?: boolean
  reserveBox?: boolean
}

export async function postQuizProgress(payload: ProgressPayload): Promise<{ ok: boolean; guideSent?: boolean }> {
  try {
    const res = await fetch('/api/quiz-progress', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(25000),
    })
    const data = await res.json()
    return { ok: res.ok && data?.ok === true, guideSent: data?.guideSent === true }
  } catch { return { ok: false } }
}

export async function cancelReservation(token: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/reservations/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      signal: AbortSignal.timeout(25000),
    })
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
    if (!res.ok || !data?.ok) return { ok: false, error: data?.error ?? `status_${res.status}` }
    return { ok: true }
  } catch {
    return { ok: false, error: 'network' }
  }
}
