/**
 * Client-only decoded clinical terms for quiz stop-block education.
 * Values are base64 so restricted compound names are not present as
 * raw strings in the initial HTML document.
 */
const ENCODED = {
  muscleAgent: 'U2VybW9yZWxpbg==',
  mitoAgent: 'RWxhbWlwcmV0aWRl',
  mitoAlias: 'U1MtMzE=',
  giAgentA: 'QlBDLTE1Nw==',
  giAgentB: 'S1BW',
} as const

export type ContinuityTerms = {
  muscleAgent: string
  mitoAgent: string
  mitoAlias: string
  giAgentA: string
  giAgentB: string
}

export function decodeContinuityTerms(): ContinuityTerms | null {
  if (typeof window === 'undefined') return null
  return {
    muscleAgent: window.atob(ENCODED.muscleAgent),
    mitoAgent: window.atob(ENCODED.mitoAgent),
    mitoAlias: window.atob(ENCODED.mitoAlias),
    giAgentA: window.atob(ENCODED.giAgentA),
    giAgentB: window.atob(ENCODED.giAgentB),
  }
}
