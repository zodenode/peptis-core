import { useState } from 'react'
import { decodeContinuityTerms, type ContinuityTerms } from '../data/continuityConfig'

export function useContinuityTerms() {
  const [terms] = useState<ContinuityTerms | null>(() => decodeContinuityTerms())
  return terms
}
