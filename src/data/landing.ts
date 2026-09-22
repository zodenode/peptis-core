import { images } from './images'

export const trustBadges = [
  '8 questions, email after 2',
  'Written priorities',
  'Free starter plan',
  'Reserve $59 box, no card',
] as const

export const problemItems = [
  {
    id: 'muscle',
    title: 'Strength and function',
    body: 'Weight loss can include lean tissue as well as fat. Track what you can do, how your strength feels and whether protein is practical day to day.',
    image: images.problemMuscle,
    alt: 'Adult pausing during a strength session at home',
  },
  {
    id: 'fatigue',
    title: 'Energy and recovery',
    body: 'Energy can change for many reasons. Notes on timing, food, fluids, sleep and your current routine can make a future screening more useful.',
    image: images.problemFatigue,
    alt: 'Adult pausing with a ceramic cup in a colorful studio',
  },
  {
    id: 'gi',
    title: 'Digestive comfort',
    body: 'A simple record of meals, symptoms and current therapy can make digestive concerns easier to explain without guessing at the cause.',
    image: images.problemGi,
    alt: 'Leafy greens, red berries and milk suspended above a bowl',
  },
] as const

export const protocolRows = [
  {
    include: 'Written summary',
    purpose: 'Strength, protein, comfort and maintenance notes',
    benefit: 'Keep the details the scale misses',
  },
  {
    include: 'Starter training plan',
    purpose: 'Two-day strength template on this site',
    benefit: 'Start this week without a subscription',
  },
  {
    include: 'Box updates if you ask',
    purpose: 'Lean Mass nutrition box at an intended $59 a month',
    benefit: 'Hear first when we can charge and ship',
  },
  {
    include: 'No payment today',
    purpose: 'No card, no charge, cancel any time',
    benefit: 'You decide later whether to buy',
  },
] as const

export const howSteps = [
  {
    n: '01',
    title: 'Today: 8 questions',
    body: 'Tell us what has changed with strength, energy, comfort and maintenance. About three minutes.',
    image: images.how1,
    alt: 'Adult completing the continuity quiz on a laptop in a colorful studio',
  },
  {
    n: '02',
    title: 'Right after: your written summary',
    body: 'Save a personal record of your priorities and open the free two-day strength starter plan. No payment details.',
    image: images.how2,
    alt: 'Adult organizing continuity notes in a colorful studio',
  },
  {
    n: '03',
    title: 'Later: you decide',
    body: 'If the Lean Mass nutrition box can ship, you choose whether to buy it. Clinical services are not offered.',
    image: images.how3,
    alt: 'A calm sunlit path suggesting a future choice',
  },
] as const

export const faqs = [
  {
    q: 'What do I get from the free continuity check?',
    a: 'A written record of your strength, protein, digestive comfort and maintenance priorities, plus the two-day strength starter plan on this site. This is a planning document, not a diagnosis or medical care. Nothing is charged.',
  },
  {
    q: 'Is this medical care or a replacement for my current therapy?',
    a: 'No. The check and starter plan are educational tools, not medical care. Keep working with your current clinician. No clinician review, prescription, or medication is provided today.',
  },
  {
    q: 'What is the Lean Mass nutrition box?',
    a: 'A monthly box of protein, creatine, hydration and micronutrients at an intended $59. Get an email when the final price and launch date are confirmed. Asking does not place an order. Supplements are not medicines and do not treat medication side effects.',
  },
  {
    q: 'Will I be charged if I leave my email?',
    a: 'No. The check, summary and starter plan cost $0 and do not collect payment details. You can cancel updates any time from the confirmation email.',
  },
  {
    q: 'Is there a $299 continuity subscription?',
    a: 'No. Clinical services are not offered.',
  },
  {
    q: 'When will the nutrition box or clinical services be available?',
    a: 'There is no promised date. The box ships only after we can charge and fulfill. Clinical services depend on state, provider, pharmacy and operational readiness. People who ask for updates will hear first and can still decline.',
  },
]
