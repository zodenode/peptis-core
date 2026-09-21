import { getPostHog } from './posthog'

export type AnalyticsProps = Record<string, string | number | boolean | string[] | null | undefined>

export function track(event: string, properties?: AnalyticsProps) {
  getPostHog()?.capture(event, properties)
  if (typeof window === 'undefined') return
  try {
    const body = JSON.stringify({
      event,
      properties: properties ?? {},
      path: window.location.pathname,
      at: new Date().toISOString(),
    })
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/events', new Blob([body], { type: 'application/json' }))
    } else {
      void fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {})
    }
  } catch {
    // analytics must never break the page
  }
}

export function identifyPerson(
  email: string,
  traits: { first_name?: string; state?: string; plan?: string; quiz_source?: string },
) {
  getPostHog()?.identify(email, traits)
}

const QUIZ_SOURCE_KEY = 'peptis.quiz.source'

export function setQuizSource(source: string) {
  try {
    sessionStorage.setItem(QUIZ_SOURCE_KEY, source)
  } catch {
    // private mode
  }
}

export function getQuizSource(): string {
  try {
    return sessionStorage.getItem(QUIZ_SOURCE_KEY) ?? 'direct'
  } catch {
    return 'direct'
  }
}

const QUIZ_PROMPT_KEY = 'peptis.quiz.prompt'

/* Which hero prompt chip (strength, energy, digestive, maintenance) started the quiz. */
export function setQuizPrompt(prompt: string) {
  try {
    sessionStorage.setItem(QUIZ_PROMPT_KEY, prompt)
  } catch {
    // private mode
  }
}

export function getQuizPrompt(): string | undefined {
  try {
    return sessionStorage.getItem(QUIZ_PROMPT_KEY) ?? undefined
  } catch {
    return undefined
  }
}
