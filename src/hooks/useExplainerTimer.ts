import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useExplainerTimer(durationMs: number, onAutoAdvance: () => void) {
  const reducedMotion = usePrefersReducedMotion()
  const [progress, setProgress] = useState(0)
  const onAutoAdvanceRef = useRef(onAutoAdvance)
  onAutoAdvanceRef.current = onAutoAdvance

  useEffect(() => {
    setProgress(0)
    if (reducedMotion || durationMs <= 0) return

    const started = performance.now()
    let frame = 0
    let advanced = false

    const tick = (now: number) => {
      const next = Math.min(1, (now - started) / durationMs)
      setProgress(next)
      if (next >= 1) {
        if (!advanced) {
          advanced = true
          onAutoAdvanceRef.current()
        }
        return
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [durationMs, reducedMotion])

  const remainingMs = reducedMotion ? durationMs : Math.max(0, Math.round((1 - progress) * durationMs))

  return {
    progress,
    reducedMotion,
    secondsLeft: Math.max(1, Math.ceil(remainingMs / 1000)),
  }
}
