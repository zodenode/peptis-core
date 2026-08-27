/* Meta Pixel scaffold. Inactive unless VITE_META_PIXEL_ID is set at build time. */

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean }

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

let initialized = false

export function initMetaPixel() {
  const id = import.meta.env.VITE_META_PIXEL_ID
  if (!id || initialized || typeof window === 'undefined') return

  const fbq: Fbq = (...args: unknown[]) => {
    fbq.queue?.push(args)
  }
  fbq.queue = []
  fbq.loaded = true
  window.fbq = window.fbq ?? fbq
  window._fbq = window._fbq ?? fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  window.fbq('init', id)
  window.fbq('track', 'PageView')
  initialized = true
}

export function pixelTrack(event: string, data?: Record<string, unknown>) {
  if (!initialized || !window.fbq) return
  window.fbq('track', event, data)
}
