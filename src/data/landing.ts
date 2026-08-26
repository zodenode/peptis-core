import { images } from './images'

export const trustBadges = [
  '$0 reservation',
  'No payment details',
  'State-by-state launch',
  'Not medical care today',
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
    include: 'Priority access',
    purpose: 'State-by-state notifications',
    benefit: 'Know when screening opens',
  },
  {
    include: 'Personalized summary',
    purpose: 'Strength, energy, comfort and maintenance priorities',
    benefit: 'Keep the important details together',
  },
  {
    include: 'Readiness organizer',
    purpose: 'Current routine and lab readiness checklists',
    benefit: 'Prepare for future screening',
  },
  {
    include: 'Reservation control',
    purpose: 'No payment details and no automatic activation',
    benefit: 'Cancel or decline enrollment',
  },
] as const

export const howSteps = [
  {
    n: '01',
    title: 'Complete the continuity quiz',
    body: 'Tell us what has changed and what you want to protect.',
    image: images.how1,
    alt: 'Adult completing the continuity quiz on a laptop in a colorful studio',
  },
  {
    n: '02',
    title: 'Reserve for $0 today',
    body: 'Save your summary and join the state launch list. No payment details are needed.',
    image: images.how2,
    alt: 'Adult organizing continuity notes in a colorful studio',
  },
  {
    n: '03',
    title: 'Choose at launch',
    body: 'If services reach your state and you are eligible, review the final terms and choose whether to enroll.',
    image: images.how3,
    alt: 'A calm sunlit path suggesting a future choice',
  },
] as const

export const faqs = [
  {
    q: 'Is this medical care or a replacement for my current therapy?',
    a: 'No. The founding reservation is a waitlist and planning experience, not medical care. Keep working with your current clinician. No clinician review, prescription, or medication is provided today.',
  },
  {
    q: 'What does the planned $299 per month mean?',
    a: 'It is the planned founding rate if clinical services launch, reach your state, you are eligible and you choose to enroll under the final terms. The planned standard rate is $399 per month. Pricing may change before activation.',
  },
  {
    q: 'Will I be charged for the reservation?',
    a: 'No. The founding reservation costs $0, can be cancelled and does not collect payment details.',
  },
  {
    q: 'Is the Lean Mass Supplement Bundle available now?',
    a: 'No. You can ask for updates about an optional bundle that may cost an additional $59 per month at launch. This does not place an order and nothing ships today. Supplements are not a treatment for medication side effects.',
  },
  {
    q: 'When will clinical services be available?',
    a: 'There is no promised launch date. Availability depends on state, provider, pharmacy, and operational readiness. Reservation holders will receive updates and can decide whether to pursue eligibility screening at launch.',
  },
]
