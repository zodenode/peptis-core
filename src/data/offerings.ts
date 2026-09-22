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
    eyebrow: 'Available now',
    summary:
      'The live offer today is a short quiz and a written record of strength, protein, digestive comfort and maintenance priorities. Use it to see what the scale misses.',
    includes: [
      'Continuity quiz with strength, protein and maintenance priorities',
      'Written summary you can keep',
      'Practical nutrition notes for low-appetite weeks',
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
      'Build a training routine with starter programmes, illustrated movements, weight-selection tips, low-appetite session rules and app exports. Available now without a subscription.',
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
    eyebrow: 'Planned box · target $59/mo',
    summary:
      `A monthly nutrition box at an intended $${offer.leanMassBoxIntendedMonthly}: protein, creatine, hydration and foundational micronutrients. Get an email when the final price and launch date are confirmed. Supplements are not medicines and do not treat medication side effects.`,
    includes: [
      'Protein to support daily targets when appetite is low',
      'Creatine for training weeks',
      'Electrolytes and hydration support',
      'Foundational micronutrients',
    ],
    status: 'programme-planned',
    statusLabel: 'Launch updates available',
    href: '/offerings#lean-mass-bundle',
    cta: 'See the intended box',
  },
]

export const offeringAudience =
  'Adults who want a written strength and maintenance record, a starter training plan, and later a nutrition box they can actually buy. '
