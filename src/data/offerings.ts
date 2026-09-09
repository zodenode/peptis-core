/**
 * Peptis public offering pillars — tight continuity strategy.
 * Insurance/ops still keep fuller Supliful pick lists in docs/SUPFUL-STOCK-LISTS.md.
 */

export type OfferingPillar = {
  id: string
  title: string
  eyebrow: string
  summary: string
  includes: string[]
  status: 'available-now' | 'programme-planned'
  href: string
  cta: string
}

export const offeringPillars: OfferingPillar[] = [
  {
    id: 'coaching',
    title: 'Continuity coaching and nutrition',
    eyebrow: 'Core programme',
    summary:
      'One continuity offer: coaching around strength, protein, digestive comfort and maintenance, with practical nutrition for low-appetite days. The free quiz and written summary start that record today.',
    includes: [
      'Continuity quiz with strength, protein and maintenance priorities',
      'Low-appetite nutrition guidance',
      'Ongoing coaching workflows as state programmes launch',
    ],
    status: 'available-now',
    href: '/quiz',
    cta: 'Start the continuity check',
  },
  {
    id: 'training',
    title: 'Exercise programmes and training tips',
    eyebrow: 'Movement system',
    summary:
      'GLP-1-aware progressive training on /plan: starter programmes, illustrated movements, weight-selection tips, low-appetite session rules and app exports.',
    includes: [
      'Personalised starter programmes',
      'Starting-weight and progression tips',
      'Calendar and training-app exports',
    ],
    status: 'available-now',
    href: '/plan',
    cta: 'Build a training plan',
  },
  {
    id: 'supplements',
    title: 'Lean Mass / GLP support supplements',
    eyebrow: 'Curated add-on',
    summary:
      'One optional private-label bundle from Supliful stock: protein, creatine, hydration, foundational micronutrients and digestive-comfort support. Dietary supplements are not medicines and do not treat medication side effects.',
    includes: [
      'Protein powder and collagen options',
      'Creatine and electrolytes',
      'Multivitamin, magnesium and GLP-1 Support / gut formulas',
    ],
    status: 'programme-planned',
    href: '/offerings#lean-mass-bundle',
    cta: 'See the core bundle',
  },
  {
    id: 'medications',
    title: 'Clinician-directed adjunct medications',
    eyebrow: 'When services launch',
    summary:
      'When clinical services launch in a member’s state, licensed clinicians may evaluate medications aimed at problems that can arise while taking GLP-1 therapies, only when appropriate. Separate from supplements and not part of the $0 reservation today.',
    includes: [
      'Future eligibility screening by licensed clinicians',
      'Adjunct evaluation for GLP-related problems when indicated',
      'Clear separation from the supplement bundle',
    ],
    status: 'programme-planned',
    href: '/offerings#medications',
    cta: 'Read medication scope',
  },
]

/** Short insurance-facing capability list (not equal product pillars). */
export const insuranceCapabilityNotes = [
  'Coaching for adults on or after GLP-1 therapy',
  'Nutrition guidance for low appetite and protein intake',
  'Dietary supplements curated for GLP continuity support',
  'Exercise and movement programmes',
  'Training tips for strength and progression',
  'Clinician-directed medications for problems that can arise while taking GLPs, when services launch',
] as const

export const offeringAudience =
  'Adults on or after GLP-1 weight-loss therapy who need continuity coaching, training and lean-mass support—not a general supplement marketplace.'
