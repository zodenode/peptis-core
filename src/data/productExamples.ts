/** Example written summaries. Labeled examples, not patient results or testimonials. */

export const PATHWAY_ORDER = [
  'muscle_protection',
  'cellular_energy',
  'gi_repair',
  'rebound_protection',
] as const

export type PathwayId = (typeof PATHWAY_ORDER)[number]

export const pathwayCopy: Record<
  PathwayId,
  { label: string; priority: string; action: string }
> = {
  muscle_protection: {
    label: 'Strength and function',
    priority: 'Track load, repetitions and everyday tasks alongside the scale. Lean mass is not skeletal muscle.',
    action: 'Start the two-day full-body plan this week. Sit-to-stand, hinge, push, pull.',
  },
  cellular_energy: {
    label: 'Energy and recovery',
    priority: 'Note energy timing, meals, fluids and sleep. Energy can change for many reasons.',
    action: 'Keep sessions short on low-energy days. Do not skip protein-forward meals.',
  },
  gi_repair: {
    label: 'Digestive comfort',
    priority: 'Record meals, symptoms and current therapy. Do not treat this as a diagnosis.',
    action: 'Use smaller, protein-forward meals. Talk with your clinician if symptoms persist.',
  },
  rebound_protection: {
    label: 'Maintenance planning',
    priority: 'Regain after withdrawal is common in trials. That is chronic biology, not personal failure.',
    action: 'Keep a weekly weight, waist and training log before any pause in treatment.',
  },
}

export type ProductExample = {
  id: string
  kind: 'result' | 'offer'
  featured?: boolean
  adSafe?: boolean
  pathways: PathwayId[]
  title: string
  situation: string
  priorities: string[]
  plan: string
  essay: { title: string; href: string }
  box: string
}

function combo(
  pathways: PathwayId[],
  extras: Pick<ProductExample, 'id' | 'title' | 'situation' | 'featured' | 'adSafe' | 'essay'>,
): ProductExample {
  return {
    kind: 'result',
    pathways,
    priorities: pathways.map((id) => pathwayCopy[id].priority),
    plan: pathways.map((id) => pathwayCopy[id].action).join(' '),
    box: 'Get updates about the planned protein, creatine, hydration and micronutrient box. Target price: $59/month.',
    ...extras,
  }
}

export const resultExamples: ProductExample[] = [
  combo(['muscle_protection'], {
    id: 'strength',
    featured: true,
    adSafe: true,
    title: 'Example: strength and function',
    situation: 'The scale is down. Stairs, bags and training feel harder.',
    essay: {
      title: 'Does Ozempic cause muscle loss?',
      href: '/publication/composition/does-ozempic-cause-muscle-loss',
    },
  }),
  combo(['cellular_energy'], {
    id: 'energy',
    featured: true,
    adSafe: true,
    title: 'Example: energy and recovery',
    situation: 'Weight is moving. Afternoon energy and sleep are uneven.',
    essay: {
      title: 'How much protein do you need on a GLP-1?',
      href: '/publication/protein/protein-on-glp1',
    },
  }),
  combo(['gi_repair'], {
    id: 'digestive',
    featured: true,
    adSafe: true,
    title: 'Example: digestive comfort',
    situation: 'Appetite is low. Meals sit poorly and volume is hard.',
    essay: {
      title: 'How much protein do you need on a GLP-1?',
      href: '/publication/protein/protein-on-glp1',
    },
  }),
  combo(['rebound_protection'], {
    id: 'maintenance',
    featured: true,
    adSafe: true,
    title: 'Example: maintenance planning',
    situation: 'A pause or dose change is coming. The worry is regain.',
    essay: {
      title: 'What happens after stopping semaglutide?',
      href: '/publication/maintenance/after-stopping-semaglutide',
    },
  }),
  combo(['muscle_protection', 'cellular_energy'], {
    id: 'strength-energy',
    adSafe: true,
    title: 'Example: strength plus energy',
    situation: 'Strength dropped and recovery between sessions is slower.',
    essay: {
      title: 'A two-day strength plan for beginners',
      href: '/publication/training/two-day-strength-plan',
    },
  }),
  combo(['muscle_protection', 'gi_repair'], {
    id: 'strength-digestive',
    title: 'Example: strength plus digestive comfort',
    situation: 'Training is the goal, but food volume is too low to fuel it.',
    essay: {
      title: 'A two-day strength plan for beginners',
      href: '/publication/training/two-day-strength-plan',
    },
  }),
  combo(['muscle_protection', 'rebound_protection'], {
    id: 'strength-maintenance',
    adSafe: true,
    title: 'Example: strength plus maintenance',
    situation: 'Keep function now so a later pause does not erase the work.',
    essay: {
      title: 'What happens after stopping semaglutide?',
      href: '/publication/maintenance/after-stopping-semaglutide',
    },
  }),
  combo(['cellular_energy', 'gi_repair'], {
    id: 'energy-digestive',
    title: 'Example: energy plus digestive comfort',
    situation: 'Nausea and low intake make energy crash after small meals.',
    essay: {
      title: 'How much protein do you need on a GLP-1?',
      href: '/publication/protein/protein-on-glp1',
    },
  }),
  combo(['cellular_energy', 'rebound_protection'], {
    id: 'energy-maintenance',
    title: 'Example: energy plus maintenance',
    situation: 'Energy is the daily problem. Regain is the later fear.',
    essay: {
      title: 'What happens after stopping semaglutide?',
      href: '/publication/maintenance/after-stopping-semaglutide',
    },
  }),
  combo(['gi_repair', 'rebound_protection'], {
    id: 'digestive-maintenance',
    title: 'Example: digestive comfort plus maintenance',
    situation: 'Eating is still hard, and a treatment pause is being discussed.',
    essay: {
      title: 'What happens after stopping semaglutide?',
      href: '/publication/maintenance/after-stopping-semaglutide',
    },
  }),
  combo(['muscle_protection', 'cellular_energy', 'gi_repair'], {
    id: 'strength-energy-digestive',
    title: 'Example: strength, energy and comfort',
    situation: 'Three daily constraints: weaker sessions, crashes, and low food volume.',
    essay: {
      title: 'Lean mass vs muscle mass',
      href: '/publication/composition/lean-mass-vs-muscle-mass',
    },
  }),
  combo(['muscle_protection', 'cellular_energy', 'rebound_protection'], {
    id: 'strength-energy-maintenance',
    title: 'Example: strength, energy and maintenance',
    situation: 'Keep training quality while planning for a later dose change.',
    essay: {
      title: 'A two-day strength plan for beginners',
      href: '/publication/training/two-day-strength-plan',
    },
  }),
  combo(['muscle_protection', 'gi_repair', 'rebound_protection'], {
    id: 'strength-digestive-maintenance',
    title: 'Example: strength, comfort and maintenance',
    situation: 'Protein is hard to get, and the long-term plan is unclear.',
    essay: {
      title: 'How much protein do you need on a GLP-1?',
      href: '/publication/protein/protein-on-glp1',
    },
  }),
  combo(['cellular_energy', 'gi_repair', 'rebound_protection'], {
    id: 'energy-digestive-maintenance',
    title: 'Example: energy, comfort and maintenance',
    situation: 'Low intake and poor sleep sit next to a possible treatment pause.',
    essay: {
      title: 'What happens after stopping semaglutide?',
      href: '/publication/maintenance/after-stopping-semaglutide',
    },
  }),
  combo(['muscle_protection', 'cellular_energy', 'gi_repair', 'rebound_protection'], {
    id: 'all-four',
    featured: true,
    adSafe: true,
    title: 'Example: all four priorities',
    situation: 'Strength, energy, comfort and keeping the weight off all need a written record.',
    essay: {
      title: 'Does Ozempic cause muscle loss?',
      href: '/publication/composition/does-ozempic-cause-muscle-loss',
    },
  }),
]

export const liveOffers = [
  {
    id: 'check',
    title: 'Continuity check',
    status: 'Live today',
    body: 'Eight questions. After the first two we save your summary email. You leave with written priorities. About 3 minutes. No card.',
    href: '/quiz',
    cta: 'Get my free summary',
  },
  {
    id: 'plan',
    title: 'Two-day strength plan',
    status: 'Live today',
    body: 'A starter programme with illustrated movements. Export to print, calendar or Hevy. Education only.',
    href: '/plan',
    cta: 'Build my plan',
  },
  {
    id: 'publication',
    title: 'Publication essays',
    status: 'Live today',
    body: 'Short evidence essays from original trials. Lean mass is not skeletal muscle. Education only.',
    href: '/publication',
    cta: 'Read the issue',
  },
  {
    id: 'box',
    title: 'Box launch updates',
    status: 'Email list only',
    body: 'Join the box launch list. Target price: $59/month. We will confirm contents, price and shipping before you decide.',
    href: '/box-updates',
    cta: 'Get launch updates',
  },
] as const

export const featuredResultExamples = resultExamples.filter((example) => example.featured)
export const adResultExamples = resultExamples.filter((example) => example.adSafe)
