import { images } from './images'
import type { ContinuityTerms } from './continuityConfig'

export type StepType = 'question' | 'explainer' | 'social_proof' | 'stop_block' | 'checkout' | 'success'

export type QuestionId = 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6' | 'q7' | 'q8'

export type ExplainerId =
  | 'explain_q1'
  | 'explain_q2'
  | 'explain_q3'
  | 'explain_q4'
  | 'explain_q5'
  | 'explain_q6'
  | 'explain_q7'
  | 'explain_q8'
  | 'proof_muscle'
  | 'proof_energy'
  | 'proof_gi'
  | 'reassure'

export type StopStepId = 'stop_a' | 'stop_b' | 'stop_c'

export type StepId = QuestionId | ExplainerId | StopStepId | 'checkout' | 'success'

export type StopBlockId = 'A' | 'B' | 'C'

export const READING_WPM = 200
export const EXPLAINER_MIN_MS = 4000
export const EXPLAINER_MAX_MS = 18000
export const STOP_BLOCK_MAX_MS = 22000

export type QuizOption = {
  id: string
  letter: string
  label: string
  insight: string
  isCorrect?: boolean
}

export type QuestionStep = {
  id: QuestionId
  type: 'question'
  topic: string
  prompt: string
  hint: string
  image: string
  imageAlt: string
  multi?: boolean
  options: QuizOption[]
}

export type StopBlockStep = {
  id: StopStepId
  type: 'stop_block'
  block: StopBlockId
  eyebrow: string
  title: string
  cta: string
  image: string
  imageAlt: string
  paragraphs: (terms: ContinuityTerms | null) => string[]
}

export const QUESTION_ORDER: QuestionId[] = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8']

export const questions: Record<QuestionId, QuestionStep> = {
  q1: {
    id: 'q1',
    type: 'question',
    topic: 'Therapy timeline',
    prompt: 'Where are you in your current GLP-1 treatment timeline?',
    hint: 'Choose the answer that comes closest. You can confirm exact details with your current clinician.',
    image: images.q1,
    imageAlt: 'An adult organizing a long-term therapy timeline',
    options: [
      {
        id: 'q1_a',
        letter: 'A',
        label: 'I started less than one month ago.',
        insight: 'You are still early in treatment. Keep your current clinician informed about any changes.',
      },
      {
        id: 'q1_b',
        letter: 'B',
        label: 'I have been in treatment for three months or longer.',
        insight: 'This is a useful time to notice changes in strength, food intake, comfort and routine.',
        isCorrect: true,
      },
      {
        id: 'q1_c',
        letter: 'C',
        label: 'I recently stopped treatment.',
        insight: 'A change in treatment deserves follow up with your current clinician. This summary can help organize your questions.',
      },
      {
        id: 'q1_d',
        letter: 'D',
        label: 'I am not sure of my timeline or dose schedule.',
        insight: 'That is fine for this quiz. Confirm the details with your current clinician when you can.',
      },
    ],
  },
  q2: {
    id: 'q2',
    type: 'question',
    topic: 'Current priorities',
    prompt: 'What would you most like to understand or support right now?',
    hint: 'Choose every answer that fits.',
    image: images.q2,
    imageAlt: 'An adult considering four continuity support pathways',
    multi: true,
    options: [
      {
        id: 'a',
        letter: 'A',
        label: 'Changes in strength, muscle tone or everyday function',
        insight: 'We will include strength and lean tissue in your summary.',
      },
      {
        id: 'b',
        letter: 'B',
        label: 'Low energy, trouble concentrating or slower recovery',
        insight: 'We will include energy and recovery in your summary.',
      },
      {
        id: 'c',
        letter: 'C',
        label: 'Nausea, bloating or digestive discomfort',
        insight: 'We will include digestive comfort in your summary.',
      },
      {
        id: 'd',
        letter: 'D',
        label: 'Keeping my progress and building a maintenance routine',
        insight: 'Maintenance is part of long term care, not a test of willpower.',
      },
    ],
  },
  q3: {
    id: 'q3',
    type: 'question',
    topic: 'Strength and function',
    prompt: 'Have everyday strength tasks felt different since your weight began to change?',
    hint: 'Think about stairs, groceries, getting up from a chair or your usual workout.',
    image: images.q3,
    imageAlt: 'An adult carrying groceries upstairs',
    options: [
      {
        id: 'q3_a',
        letter: 'A',
        label: 'No. My strength and daily function feel steady.',
        insight: 'That is useful to record. Function can add context that a scale or body scan cannot.',
      },
      {
        id: 'q3_b',
        letter: 'B',
        label: 'I feel stronger or have more endurance.',
        insight: 'That progress matters. Strength and function deserve to be tracked alongside weight.',
      },
      {
        id: 'q3_c',
        letter: 'C',
        label: 'I have not paid much attention to strength or function.',
        insight: 'A few repeatable tasks can give you a more useful baseline than appearance alone.',
      },
      {
        id: 'q3_d',
        letter: 'D',
        label: 'Yes. Some everyday tasks or workouts feel harder.',
        insight: 'A change in function is worth discussing with your current clinician, especially if it is new or getting worse.',
        isCorrect: true,
      },
    ],
  },
  q4: {
    id: 'q4',
    type: 'question',
    topic: 'Energy',
    prompt: 'How has your energy felt during a typical day?',
    hint: 'Consider timing, sleep, food, fluids and whether the pattern is new.',
    image: images.q4,
    imageAlt: 'An adult pausing during an afternoon energy slump',
    options: [
      {
        id: 'q4_a',
        letter: 'A',
        label: 'I often feel drained, and rest does not fully help.',
        insight: 'Persistent fatigue can have many causes. Record the pattern and discuss it with your current clinician.',
        isCorrect: true,
      },
      {
        id: 'q4_b',
        letter: 'B',
        label: 'My energy feels steady most days.',
        insight: 'That is a helpful baseline to keep in your continuity record.',
      },
      {
        id: 'q4_c',
        letter: 'C',
        label: 'I have mild dips that improve with food, fluids, rest or movement.',
        insight: 'Timing and what helps can make your notes more useful.',
      },
      {
        id: 'q4_d',
        letter: 'D',
        label: 'I have plenty of energy but have trouble winding down.',
        insight: 'Sleep and energy patterns can overlap. Bring new or disruptive changes to your current clinician.',
      },
    ],
  },
  q5: {
    id: 'q5',
    type: 'question',
    topic: 'Digestive comfort',
    prompt: 'How often do meals leave you uncomfortably full, bloated or nauseated?',
    hint: 'Think about frequency, meal size, timing and how long the feeling lasts.',
    image: images.q5,
    imageAlt: 'An adult reflecting on comfort after a meal',
    options: [
      {
        id: 'q5_a',
        letter: 'A',
        label: 'Rarely or never.',
        insight: 'We will record that digestive comfort is not a main concern right now.',
      },
      {
        id: 'q5_b',
        letter: 'B',
        label: 'Only after certain foods or unusually large meals.',
        insight: 'Specific triggers and portion size are useful details to note.',
      },
      {
        id: 'q5_c',
        letter: 'C',
        label: 'Regularly. Discomfort can last well after I eat.',
        insight: 'Ongoing symptoms deserve clinical guidance. Your summary can help you describe the pattern clearly.',
        isCorrect: true,
      },
      {
        id: 'q5_d',
        letter: 'D',
        label: 'Occasionally, and it resolves quickly.',
        insight: 'Record what happened before the symptom and what helped.',
      },
    ],
  },
  q6: {
    id: 'q6',
    type: 'question',
    topic: 'Strength priority',
    prompt: 'What would make your body composition progress feel more complete?',
    hint: 'Choose the result that matters most to you.',
    image: images.q6,
    imageAlt: 'An adult using resistance bands for functional strength',
    options: [
      {
        id: 'q6_a',
        letter: 'A',
        label: 'Seeing the scale move as quickly as possible.',
        insight: 'Speed alone does not show what tissue changed or how your function is doing.',
      },
      {
        id: 'q6_b',
        letter: 'B',
        label: 'Protecting strength and staying capable in daily life.',
        insight: 'Resistance training and adequate protein are the strongest practical priorities for that goal.',
        isCorrect: true,
      },
      {
        id: 'q6_c',
        letter: 'C',
        label: 'Making my appetite even smaller.',
        insight: 'Lower food intake can make protein, fluids and micronutrients harder to get.',
      },
      {
        id: 'q6_d',
        letter: 'D',
        label: 'Focusing mainly on appearance and skin changes.',
        insight: 'Appearance matters, but strength and function provide useful information that the mirror cannot.',
      },
    ],
  },
  q7: {
    id: 'q7',
    type: 'question',
    topic: 'Recovery needs',
    prompt: 'Which change would help your day feel more manageable?',
    hint: 'Choose the answer that best reflects your current priority.',
    image: images.q7,
    imageAlt: 'An adult reflecting on mental clarity in morning light',
    options: [
      {
        id: 'q7_a',
        letter: 'A',
        label: 'Sore joints and stiffness after waking up in the morning.',
        insight: 'Joint stiffness can have many causes. A clinician can help assess a persistent change.',
      },
      {
        id: 'q7_b',
        letter: 'B',
        label: 'Brittle fingernails and dry skin patches.',
        insight: 'Skin and nail changes can have several causes and may deserve clinical review.',
      },
      {
        id: 'q7_c',
        letter: 'C',
        label: 'Frequent muscle cramps during physical exercise.',
        insight: 'Exercise cramps have several possible causes. Note the timing and discuss persistent symptoms.',
      },
      {
        id: 'q7_d',
        letter: 'D',
        label: 'Clearer thinking and steadier energy through the day.',
        insight: 'We will add energy, nutrition, sleep and recovery patterns to your summary.',
        isCorrect: true,
      },
    ],
  },
  q8: {
    id: 'q8',
    type: 'question',
    topic: 'Digestive priority',
    prompt: 'What would better digestive comfort make easier for you?',
    hint: 'Choose the most practical benefit.',
    image: images.q8,
    imageAlt: 'An adult preparing a gentle meal for digestive comfort',
    options: [
      {
        id: 'q8_a',
        letter: 'A',
        label: 'Eating comfortable portions and meeting nutrition needs more consistently.',
        insight: 'Meal size, timing, fluids and symptom notes can support a better conversation with your clinician.',
        isCorrect: true,
      },
      {
        id: 'q8_b',
        letter: 'B',
        label: 'Boosting physical workout performance and cardiovascular endurance.',
        insight: 'Performance belongs in your strength and recovery summary.',
      },
      {
        id: 'q8_c',
        letter: 'C',
        label: 'Increasing overall systemic body temperature and caloric burn rate.',
        insight: 'Calorie burn is separate from understanding digestive comfort.',
      },
      {
        id: 'q8_d',
        letter: 'D',
        label: 'Using a quick fix without changing anything else.',
        insight: 'Persistent digestive symptoms need appropriate clinical guidance, not a one size fits all fix.',
      },
    ],
  },
}

export const stopBlocks: Record<StopBlockId, StopBlockStep> = {
  A: {
    id: 'stop_a',
    type: 'stop_block',
    block: 'A',
    eyebrow: 'Strength and lean tissue',
    title: 'Make strength visible in your plan',
    cta: 'Add strength to my summary',
    image: images.stopA,
    imageAlt: 'An adult using a resistance band in a sunlit loft',
    paragraphs: () => [
      'Weight loss can include lean tissue as well as body fat. Lean mass includes water, organs, connective tissue and skeletal muscle, so it should not be read as muscle alone.',
      'Tracking strength, protein intake and resistance activity can make this part of continuity planning more useful.',
      'Your quiz summary can help you organize the questions and records to bring to your current clinician. Peptis is not providing medical services through this reservation today.',
    ],
  },
  B: {
    id: 'stop_b',
    type: 'stop_block',
    block: 'B',
    eyebrow: 'Energy and recovery',
    title: 'Give fatigue the context it deserves',
    cta: 'Add energy to my summary',
    image: images.stopB,
    imageAlt: 'Dawn light over a still alpine lake',
    paragraphs: () => [
      'Persistent fatigue deserves careful context. Nutrition, fluids, sleep, current therapy, labs and other health factors can all matter.',
      'Your summary will organize energy observations for a future screening conversation. It is educational and does not diagnose a condition or promise treatment.',
    ],
  },
  C: {
    id: 'stop_c',
    type: 'stop_block',
    block: 'C',
    eyebrow: 'Digestive comfort',
    title: 'Clear notes make symptoms easier to explain',
    cta: 'Add comfort to my summary',
    image: images.stopC,
    imageAlt: 'An adult at a calm breakfast nook',
    paragraphs: () => [
      'Digestive changes can affect daily comfort and nutrition. Recording timing, meals, and current therapy details creates a clearer handoff for a future licensed provider.',
      'The reservation adds GI comfort to your pathway summary. It does not include diagnosis, prescribing, or pharmacy fulfillment today.',
    ],
  },
}

export const checkoutCopy = {
  eyebrow: 'Founding reservations are open',
  title: 'Your continuity summary is ready.',
  steps: [
    {
      title: 'Priority launch access',
      body: 'Join the state-by-state launch list and receive readiness updates. No medical services are provided today.',
    },
    {
      title: 'A useful pathway summary',
      body: 'Keep your strength, energy, digestive comfort and maintenance priorities together for a future screening.',
    },
    {
      title: 'You stay in control',
      body: 'There is no charge today. You decide whether to enroll if services launch and you are eligible.',
    },
  ],
}

export function isQuestionId(id: string): id is QuestionId {
  return Object.prototype.hasOwnProperty.call(questions, id)
}

export function isExplainerId(id: StepId): id is ExplainerId {
  return id.startsWith('explain_') || id.startsWith('proof_') || id === 'reassure'
}

export function isStopStepId(id: StepId): id is StopStepId {
  return id === 'stop_a' || id === 'stop_b' || id === 'stop_c'
}

export function stepMeta(id: StepId): { type: StepType; step_id: string; step_index: number; block?: StopBlockId } {
  const map: Record<StepId, { type: StepType; step_index: number; block?: StopBlockId }> = {
    q1: { type: 'question', step_index: 0 },
    explain_q1: { type: 'explainer', step_index: 1 },
    q2: { type: 'question', step_index: 2 },
    explain_q2: { type: 'explainer', step_index: 3 },
    q3: { type: 'question', step_index: 4 },
    explain_q3: { type: 'explainer', step_index: 5 },
    stop_a: { type: 'stop_block', step_index: 5, block: 'A' },
    proof_muscle: { type: 'social_proof', step_index: 6 },
    q4: { type: 'question', step_index: 6 },
    explain_q4: { type: 'explainer', step_index: 7 },
    stop_b: { type: 'stop_block', step_index: 7, block: 'B' },
    proof_energy: { type: 'social_proof', step_index: 8 },
    q5: { type: 'question', step_index: 8 },
    explain_q5: { type: 'explainer', step_index: 9 },
    stop_c: { type: 'stop_block', step_index: 9, block: 'C' },
    proof_gi: { type: 'social_proof', step_index: 10 },
    q6: { type: 'question', step_index: 10 },
    explain_q6: { type: 'explainer', step_index: 11 },
    q7: { type: 'question', step_index: 12 },
    explain_q7: { type: 'explainer', step_index: 13 },
    q8: { type: 'question', step_index: 14 },
    explain_q8: { type: 'explainer', step_index: 15 },
    reassure: { type: 'social_proof', step_index: 16 },
    checkout: { type: 'checkout', step_index: 17 },
    success: { type: 'success', step_index: 18 },
  }
  return { ...map[id], step_id: id }
}

export function isStepId(id: unknown): id is StepId {
  return typeof id === 'string' && stepMeta(id as StepId).type !== undefined
}

export type Answers = {
  q1?: string
  q2?: string[]
  q3?: string
  q4?: string
  q5?: string
  q6?: string
  q7?: string
  q8?: string
}

export function isCorrectOption(stepId: StepId, optionId: string) {
  if (!isQuestionId(stepId)) return false
  return Boolean(questions[stepId].options.find((o) => o.id === optionId)?.isCorrect)
}

export function derivePathways(answers: Answers): string[] {
  const pathways = new Set<string>()
  const q2 = answers.q2 ?? []
  if (q2.includes('a') || answers.q3 === 'q3_d' || answers.q6 === 'q6_b') pathways.add('muscle_protection')
  if (q2.includes('b') || answers.q4 === 'q4_a' || answers.q7 === 'q7_d') pathways.add('cellular_energy')
  if (q2.includes('c') || answers.q5 === 'q5_c' || answers.q8 === 'q8_a') pathways.add('gi_repair')
  if (q2.includes('d')) pathways.add('rebound_protection')
  return [...pathways]
}

function has(answers: Answers, key: 'a' | 'b' | 'c') {
  return Boolean(answers.q2?.includes(key))
}

export function q2PrimaryPathway(answers: Answers): 'a' | 'b' | 'c' | null {
  if (has(answers, 'a')) return 'a'
  if (has(answers, 'b')) return 'b'
  if (has(answers, 'c')) return 'c'
  return null
}

export function shouldShowStopA(answers: Answers) {
  return has(answers, 'a') || answers.q3 === 'q3_d'
}

export function shouldShowStopB(answers: Answers) {
  return has(answers, 'b') || answers.q4 === 'q4_a'
}

export function shouldShowStopC(answers: Answers) {
  return has(answers, 'c') || answers.q5 === 'q5_c'
}

function explainerAfterQuestion(questionId: QuestionId): ExplainerId {
  return `explain_${questionId}` as ExplainerId
}

function nextAfterQ2(answers: Answers, shown: Set<StopBlockId>): StepId {
  const primary = q2PrimaryPathway(answers)
  if (primary === 'a' && !shown.has('A')) return 'stop_a'
  if (primary === 'b' && !shown.has('B')) return 'stop_b'
  if (primary === 'c' && !shown.has('C')) return 'stop_c'
  return 'explain_q2'
}

function nextAfterStop(step: StopStepId, answers: Answers): StepId {
  if (!answers.q3) return 'q3'
  if (step === 'stop_a') return 'proof_muscle'
  if (step === 'stop_b') {
    return 'proof_energy'
  }
  return 'proof_gi'
}

function nextUnansweredFrom(start: QuestionId, answers: Answers): StepId {
  const order: QuestionId[] = ['q4', 'q5', 'q6', 'q7', 'q8']
  const from = order.indexOf(start)
  for (const id of order.slice(Math.max(0, from))) {
    if (!answers[id]) return id
  }
  return 'reassure'
}

export function nextAfter(step: StepId, answers: Answers, shown: StopBlockId[]): StepId {
  const shownSet = new Set(shown)

  switch (step) {
    case 'q1':
      return 'explain_q1'
    case 'explain_q1':
      return 'q2'
    case 'q2':
      return nextAfterQ2(answers, shownSet)
    case 'explain_q2':
      return 'q3'
    case 'q3':
      if (shouldShowStopA(answers) && !shownSet.has('A')) return 'stop_a'
      return 'explain_q3'
    case 'explain_q3':
      return shouldShowStopA(answers) ? 'proof_muscle' : 'q4'
    case 'proof_muscle':
      return answers.q4 ? nextUnansweredFrom('q4', answers) : 'q4'
    case 'q4':
      if (shouldShowStopB(answers) && !shownSet.has('B')) return 'stop_b'
      return 'explain_q4'
    case 'explain_q4':
      return shouldShowStopB(answers) ? 'proof_energy' : 'q5'
    case 'proof_energy':
      return 'q5'
    case 'q5':
      if (shouldShowStopC(answers) && !shownSet.has('C')) return 'stop_c'
      return 'explain_q5'
    case 'explain_q5':
      return shouldShowStopC(answers) ? 'proof_gi' : 'q6'
    case 'proof_gi':
      return 'q6'
    case 'q6':
      return 'explain_q6'
    case 'explain_q6':
      return 'q7'
    case 'q7':
      return 'explain_q7'
    case 'explain_q7':
      return 'q8'
    case 'q8':
      return 'explain_q8'
    case 'explain_q8':
      return 'reassure'
    case 'reassure':
      return 'checkout'
    case 'checkout':
      return 'success'
    case 'stop_a':
    case 'stop_b':
    case 'stop_c':
      return nextAfterStop(step, answers)
    default:
      return 'success'
  }
}

const PROGRESS_DENOMINATOR = 17

export function progressPercent(id: StepId, historyLength = 0) {
  if (id === 'success') return 100
  return Math.min(99, Math.round((historyLength / PROGRESS_DENOMINATOR) * 100))
}

export function countWords(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

export function readingDurationMs(wordCount: number, kind: ResolvedExplainer['kind']) {
  const raw = (wordCount / READING_WPM) * 60_000
  const max = kind === 'stop_block' ? STOP_BLOCK_MAX_MS : EXPLAINER_MAX_MS
  return Math.round(Math.min(max, Math.max(EXPLAINER_MIN_MS, raw)))
}

export type ResolvedExplainer = {
  stepId: StepId
  kind: 'insight' | 'stop_block' | 'reassure' | 'social_proof'
  eyebrow: string
  title: string
  body: string[]
  cta: string
  image: string
  imageAlt: string
  block?: StopBlockId
  proofId?: 'muscle' | 'energy' | 'gi' | 'founding_trust'
  pathway?: string
  wordCount: number
  durationMs: number
}

function withTiming(
  explainer: Omit<ResolvedExplainer, 'wordCount' | 'durationMs'>,
): ResolvedExplainer {
  const wordCount = countWords([explainer.title, ...explainer.body].join(' '))
  return {
    ...explainer,
    wordCount,
    durationMs: readingDurationMs(wordCount, explainer.kind),
  }
}

function selectedOptions(questionId: QuestionId, answers: Answers): QuizOption[] {
  const q = questions[questionId]
  if (questionId === 'q2') {
    const ids = answers.q2 ?? []
    return q.options.filter((o) => ids.includes(o.id))
  }
  const id = answers[questionId]
  return q.options.filter((o) => o.id === id)
}

function insightExplainer(questionId: QuestionId, answers: Answers): ResolvedExplainer {
  const q = questions[questionId]
  const selected = selectedOptions(questionId, answers)
  const insights = selected.map((o) => o.insight)
  const body = insights.length > 0 ? [...insights, q.hint] : [q.hint]

  return withTiming({
    stepId: explainerAfterQuestion(questionId),
    kind: 'insight',
    eyebrow: q.topic,
    title: 'What your answer tells us',
    body,
    cta: 'Continue',
    image: q.image,
    imageAlt: q.imageAlt,
  })
}

function stopExplainer(block: StopBlockId, terms: ContinuityTerms | null): ResolvedExplainer {
  const step = stopBlocks[block]
  return withTiming({
    stepId: step.id,
    kind: 'stop_block',
    eyebrow: step.eyebrow,
    title: step.title,
    body: step.paragraphs(terms),
    cta: step.cta,
    image: step.image,
    imageAlt: step.imageAlt,
    block,
  })
}

export function resolveExplainer(
  id: StepId,
  answers: Answers,
  terms: ContinuityTerms | null,
): ResolvedExplainer | null {
  if (id === 'stop_a') return stopExplainer('A', terms)
  if (id === 'stop_b') return stopExplainer('B', terms)
  if (id === 'stop_c') return stopExplainer('C', terms)
  if (id === 'proof_muscle') {
    return withTiming({
      stepId: id,
      kind: 'social_proof',
      proofId: 'muscle',
      pathway: 'muscle_protection',
      eyebrow: 'A common continuity priority',
      title: 'Strength changes are worth recording',
      body: [
        'A practical next step is to organize strength changes, protein habits and current therapy details so a future provider can see the whole picture.',
      ],
      cta: 'Continue',
      image: images.proofMuscle,
      imageAlt: 'Adults practicing functional strength in a small class',
    })
  }
  if (id === 'proof_energy') {
    return withTiming({
      stepId: id,
      kind: 'social_proof',
      proofId: 'energy',
      pathway: 'cellular_energy',
      eyebrow: 'A common continuity priority',
      title: 'Patterns can make fatigue easier to discuss',
      body: [
        'Tracking timing, sleep, nutrition, fluids, current therapy and lab readiness can make a future screening conversation more specific.',
      ],
      cta: 'Continue',
      image: images.proofEnergy,
      imageAlt: 'Adults organizing sustainable energy habits',
    })
  }
  if (id === 'proof_gi') {
    return withTiming({
      stepId: id,
      kind: 'social_proof',
      proofId: 'gi',
      pathway: 'gi_repair',
      eyebrow: 'A common continuity priority',
      title: 'Digestive details can guide a better conversation',
      body: [
        'A meal and symptom record, along with a current therapy list, can make a future eligibility conversation more specific without self diagnosing.',
      ],
      cta: 'Continue',
      image: images.proofGi,
      imageAlt: 'Adults organizing gentle meal and comfort notes',
    })
  }
  if (id === 'reassure') {
    return withTiming({
      stepId: 'reassure',
      kind: 'social_proof',
      proofId: 'founding_trust',
      pathway: 'general',
      eyebrow: 'Your reservation',
      title: 'Keep your place and decide later',
      body: checkoutCopy.steps.map((step) => `${step.title}. ${step.body}`),
      cta: 'Review founding reservation',
      image: images.reservation,
      imageAlt: 'A secure reservation still life',
    })
  }
  if (id.startsWith('explain_q')) {
    const questionId = id.replace('explain_', '') as QuestionId
    if (isQuestionId(questionId)) return insightExplainer(questionId, answers)
  }
  return null
}
