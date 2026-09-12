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
    title: 'Continuity coaching and nutrition',
    eyebrow: 'Core programme',
    summary:
      'One continuity offer: coaching around strength, protein, digestive comfort and maintenance, with practical nutrition for low-appetite days. The free quiz and written summary start that record today.',
    includes: [
      'Continuity quiz with strength, protein and maintenance priorities',
      'Low-appetite nutrition guidance',
      'Ongoing coaching workflows as state programmes launch',
    ],
    status: 'planning-tools-available',
    statusLabel: 'Planning tools available now',
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
    statusLabel: 'Available now',
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
    statusLabel: 'Programme planned',
    href: '/offerings#lean-mass-bundle',
    cta: 'See the core bundle',
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
  'Adults on or after GLP-1 weight-loss therapy who need continuity coaching, training and lean-mass support—not a general supplement marketplace.'
