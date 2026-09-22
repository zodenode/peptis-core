// Only anonymous funnel milestones cross the analytics boundary. Never answers,
// identity, derived health categories, arbitrary URLs, or free-form properties.
const EVENTS = new Set([
  'landing_viewed', 'offerings_viewed', 'publication_viewed', 'publication_article_viewed',
  'publication_category_viewed', 'quiz_cta_clicked', 'hero_cta_clicked', 'quiz_started',
  'quiz_step_viewed', 'quiz_option_selected', 'quiz_email_captured', 'quiz_completed',
  'email_submitted', 'plan_opened', 'plan_generated', 'plan_exported', 'box_reserve_clicked',
  'box_interest_saved', 'summary_sent', 'guide_sent', 'email_failed', 'quiz_abandoned',
])
const SERVER_EVENTS = new Set(['email_submitted', 'box_interest_saved', 'summary_sent', 'guide_sent', 'email_failed', 'quiz_completed'])
export function funnelEvent(event, properties = {}, server = false) {
  if (!EVENTS.has(event) || (!server && SERVER_EVENTS.has(event))) return null
  const safe = {}
  if (event === 'quiz_step_viewed' && Number.isInteger(properties?.step_index) && properties.step_index >= 0 && properties.step_index <= 30) safe.step_index = properties.step_index
  return { event, properties: safe }
}
