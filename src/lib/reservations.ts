export type ReservationPayload = {
  firstName: string
  lastName: string
  email: string
  phone: string
  state: string
  resident: boolean
  attest: boolean
  upsell: boolean
  pathways: string[]
}

export type ReservationResult =
  | { ok: true; id: string }
  | { ok: false; error: string }

export async function submitReservation(payload: ReservationPayload): Promise<ReservationResult> {
  try {
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12000),
    })
    const data = (await res.json().catch(() => null)) as { ok?: boolean; id?: string; error?: string } | null
    if (!res.ok || !data?.ok || !data.id) {
      return { ok: false, error: data?.error ?? `status_${res.status}` }
    }
    return { ok: true, id: data.id }
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
  answers: Record<string, unknown>
  entryPrompt?: string
  sendGuide?: boolean
}

/* Fire-and-forget: progress capture must never block or break the quiz. */
export function postQuizProgress(payload: ProgressPayload) {
  try {
    void fetch('/api/quiz-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  } catch {
    // ignore
  }
}

export async function cancelReservation(token: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/reservations/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      signal: AbortSignal.timeout(12000),
    })
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
    if (!res.ok || !data?.ok) return { ok: false, error: data?.error ?? `status_${res.status}` }
    return { ok: true }
  } catch {
    return { ok: false, error: 'network' }
  }
}
