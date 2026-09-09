/**
 * Peptis commercial offering pillars for public site + insurance application review.
 * Keep capability language honest: coaching / nutrition / movement / training tips /
 * dietary supplements available or planned as programme support; adjunct medications
 * only via licensed clinicians when services launch and are eligible.
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
    title: 'Coaching',
    eyebrow: 'Continuity coaching',
    summary:
      'Structured coaching around strength, protein, digestive comfort and maintenance while on or after GLP-1 therapy. The free quiz and written summary start the coaching record today.',
    includes: [
      'Priority and pathway mapping from the continuity quiz',
      'Written strength, nutrition and maintenance summary',
      'Ongoing coaching workflows as state programmes launch',
    ],
    status: 'available-now',
    href: '/quiz',
    cta: 'Start the continuity check',
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    eyebrow: 'Low-appetite nutrition',
    summary:
      'Practical nutrition guidance for smaller eating occasions: protein-forward structure, fluids, fibre and micronutrient awareness when appetite falls.',
    includes: [
      'Protein target education and meal-structure coaching',
      'Low-appetite day planning',
      'Evidence library guides on protein and food tolerance',
    ],
    status: 'available-now',
    href: '/blog/protein-on-glp1',
    cta: 'Read the protein guide',
  },
  {
    id: 'supplements',
    title: 'Supplements for people on GLPs',
    eyebrow: 'Private-label support stack',
    summary:
      'Dietary supplements sourced from Supliful stock for digestive comfort, protein, hydration, micronutrients, creatine and appearance support. Supplements are not medicines and do not treat medication side effects.',
    includes: [
      'GLP-1 Support, gut and digestive enzyme formulas',
      'Whey, plant protein and collagen powders',
      'Creatine, electrolytes, multivitamin and magnesium picks',
    ],
    status: 'programme-planned',
    href: '/offerings#supplements',
    cta: 'See Supliful stock lists',
  },
  {
    id: 'exercise',
    title: 'Exercise and movement programmes',
    eyebrow: 'Progressive training',
    summary:
      'GLP-1-aware movement programmes focused on progressive resistance training, joint-sensitive substitutions and sustainable weekly structure.',
    includes: [
      'Personalised starter programmes on /plan',
      'Illustrated movement library',
      'Exports for calendar and training apps',
    ],
    status: 'available-now',
    href: '/plan',
    cta: 'Build a training plan',
  },
  {
    id: 'training-tips',
    title: 'Training tips',
    eyebrow: 'Coaching cues',
    summary:
      'Practical training tips for adults losing weight on GLP-1s: starting weights, reps in reserve, low-appetite session rules and progression without ego loading.',
    includes: [
      'Weight-selection and calibration guidance',
      'Low-appetite and recovery session rules',
      'Evidence explainers on lean mass and strength',
    ],
    status: 'available-now',
    href: '/plan',
    cta: 'Open training tips',
  },
  {
    id: 'medications',
    title: 'Medications for GLP-related problems',
    eyebrow: 'Clinician-directed adjunct care',
    summary:
      'When clinical services launch in a member’s state, licensed clinicians may evaluate medications aimed at problems that can arise while taking GLP-1 therapies (for example nausea or constipation pathways), only when appropriate. This is separate from dietary supplements and is not available through the $0 founding reservation today.',
    includes: [
      'Future eligibility screening by licensed clinicians',
      'Adjunct medication evaluation for GLP-related problems when indicated',
      'Clear separation from over-the-counter supplement bundles',
    ],
    status: 'programme-planned',
    href: '/offerings#medications',
    cta: 'Read medication scope',
  },
]

export const offeringAudience =
  'Adults on or after GLP-1 weight-loss therapy who need coaching, nutrition, training, supplements and—when clinically available—medication support for problems that can arise during treatment.'
