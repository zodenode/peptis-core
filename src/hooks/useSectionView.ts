import { useEffect, useRef } from 'react'
import { track } from '../lib/analytics'

export function useSectionView<T extends HTMLElement>(section: string, event = 'section_viewed') {
  const ref = useRef<T>(null)
  const sent = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || sent.current) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sent.current) {
          sent.current = true
          track(event, { section })
        }
      },
      { threshold: 0.32 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [event, section])

  return ref
}
