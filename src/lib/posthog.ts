import posthog from 'posthog-js'

let initialized = false

export function initPostHog() {
  if (initialized || typeof window === 'undefined') return

  const key = import.meta.env.VITE_PUBLIC_POSTHOG_KEY
  if (!key) return

  posthog.init(key, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false,
    capture_pageleave: true,
    persistence: 'localStorage+cookie',
  })
  initialized = true
}

export function getPostHog() {
  return initialized ? posthog : null
}

export { posthog }
