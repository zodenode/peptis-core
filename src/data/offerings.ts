import { offer } from './offer'

/** Peptis public offering pillars — tight continuity strategy. */

export type OfferingPillar = {
  id: string
  title: string
  eyebrow: string
  summary: string
  includes: string[]
  status: 'available-now' | 'planning-tools-available' | 'programme-planned'
  statusLabel: string
  href: string
  cta: string
}

export const offeringPillars: OfferingPillar[] = [
  {
    id: 'coaching',
    title: 'Continuity check and nutrition notes',
    eyebrow: 'Free lead magnet',
    summary:
      'The live offer today is a short quiz and a written record of strength, protein, digestive comfort and maintenance priorities. Use it to see what the scale misses. It is not coaching staff and not medical care.',
    includes: [
      'Continuity quiz with strength, protein and maintenance priorities',
      'Written summary you can keep',
      'Low-appetite nutrition notes, not a prescribed diet',
    ],
    status: 'planning-tools-available',
    statusLabel: 'Available now: quiz and summary',
    href: '/quiz',
    cta: 'Start the continuity check',
  },
  {
    id: 'training',
    title: 'Exercise programmes and training tips',
    eyebrow: 'Free movement system',
    summary:
      'Progressive training on /plan: starter programmes, illustrated movements, weight-selection tips, low-appetite session rules and app exports. Available now without a subscription.',
    includes: [
      'Personalised starter programmes',
      'Starting-weight and progression tips',
      'Calendar and training-app exports',
    ],
    status: 'available-now',
    statusLabel: 'Available now',
    href: '/plan',
    cta: 'Build a training plan',
  },
  {
    id: 'supplements',
    title: 'Lean Mass nutrition box',
    eyebrow: 'First paid product, not for sale yet',
    summary:
      `The first product we intend to sell is a $${offer.leanMassBoxIntendedMonthly} monthly nutrition box: protein, creatine, hydration and foundational micronutrients from private-label stock. It is a test assortment, not a 20 to 25 g identity-tested clear whey. It is not for sale until we can charge and ship. Supplements are not medicines and do not treat medication side effects.`,
    includes: [
      'Complete-protein options to support daily protein targets',
      'Creatine and electrolyte/hydration support',
      'Selected micronutrient and digestive-comfort products',
      'Collagen may be offered separately for appropriate nutrition/wellness use, but is not presented as a complete protein or as proven to prevent loose skin',
    ],
    status: 'programme-planned',
    statusLabel: 'Intended $59/mo, not for sale yet',
    href: '/offerings#lean-mass-bundle',
    cta: 'See the intended box',
  },
  {
    id: 'clinical-care',
    title: 'Planned weight-management consultations',
    eyebrow: 'Planned clinical pathway',
    summary:
      'If clinical services launch in a member’s state, licensed practitioners through the contracted telehealth platform may assess eligibility for weight-management care. Compounded semaglutide or tirzepatide may be considered only after clinician review when appropriate; no prescription is guaranteed.',
    includes: [
      'Future eligibility screening for weight-management care',
      'Clinician review before any medication decision',
      'Prescribing and dispensing handled by licensed third parties',
    ],
    status: 'programme-planned',
    statusLabel: 'Programme planned',
    href: '/offerings#clinical-care',
    cta: 'Read the planned clinical scope',
  },
]

export const offeringAudience =
  'Adults who want a written strength and maintenance record, a starter training plan, and later a nutrition box they can actually buy. This is not a general supplement marketplace.'
