import { getPostHog } from './posthog'

export type AnalyticsProps = Record<string, string | number | boolean | string[] | null | undefined>

export function track(event: string, properties?: AnalyticsProps) {
  getPostHog()?.capture(event, properties)
}

export function identifyPerson(
  email: string,
  traits: { first_name?: string; state?: string; plan?: string },
) {
  getPostHog()?.identify(email, traits)
}
