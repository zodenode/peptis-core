// The same allowlist and plan inputs are used by the browser and the server.
export const PROFILE_VERSION = 2
export const CONSENT_VERSION = '2026-09-29'
const options = {
  q1: ['q1_a','q1_e','q1_b','q1_f','q1_g','q1_c','q1_d','q1_not_started'],
  q3: ['q3_a','q3_b','q3_c','q3_d'], q4: ['q4_a','q4_b','q4_c','q4_d'],
  q5: ['q5_a','q5_b','q5_c','q5_d'], q6: ['q6_a','q6_b','q6_c','q6_d'],
  q7: ['q7_a','q7_b','q7_c','q7_d'], q8: ['q8_a','q8_b','q8_c','q8_d','q8_none'],
  care_provider: ['ro','hims','hers','ivim','medvi','mochi','noom_med','ww_clinic','found','lifemd','other','none','prefer_not'],
  current_medication: ['wegovy','ozempic','zepbound','mounjaro','wegovy_oral','foundayo','saxenda','compounded_semaglutide','compounded_tirzepatide','another_or_unsure','none','prefer_not'],
  training_setting: ['home','gym','both','undecided'],
  training_experience: ['new','returning','regular'], equipment: ['none','dumbbells','gym'],
  training_days: ['2','3'], training_habit: ['0','1','2','3_plus'],
  protein_habit: ['rarely','some_meals','most_meals','unsure'],
  weight_change: ['stable','under_5','5_to_10','over_10','gained','unsure','prefer_not'],
  appetite: ['normal','reduced','very_low'],
}
export function cleanAnswers(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {}
  const clean = {}
  for (const [key, values] of Object.entries(options)) if (values.includes(input[key])) clean[key] = input[key]
  if (Array.isArray(input.q2)) clean.q2 = [...new Set(input.q2.filter(x => ['a','b','c','d'].includes(x)))]
  if (Array.isArray(input.sensitivities)) clean.sensitivities = [...new Set(input.sensitivities.filter(x => ['knees','back','shoulders'].includes(x)))]
  if (typeof input.medication_dose === 'string') clean.medication_dose = input.medication_dose.replace(/[\r\n\x00-\x1f]/g,' ').trim().slice(0,80)
  if (clean.q1 === 'q1_not_started' || clean.current_medication === 'none') {
    clean.current_medication = 'none'
    delete clean.medication_dose
  }
  if (clean.current_medication === 'prefer_not') delete clean.medication_dose
  return clean
}
export function derivePathways(input) {
  const a = cleanAnswers(input), p = new Set(), goals = a.q2 || []
  if (goals.includes('a') || a.q3 === 'q3_d' || a.q6 === 'q6_b') p.add('muscle_protection')
  if (goals.includes('b') || a.q4 === 'q4_a' || ['q7_c','q7_d'].includes(a.q7)) p.add('cellular_energy')
  if (goals.includes('c') || a.q5 === 'q5_c') p.add('gi_repair')
  if (goals.includes('d')) p.add('rebound_protection')
  return [...p]
}
export function planIntakeFromAnswers(input) {
  const a = cleanAnswers(input)
  if (!a.training_experience || !a.equipment || !a.training_days) return null
  return { experience: a.training_experience, equipment: a.equipment, days: Number(a.training_days), sensitivities: a.sensitivities || [], context: a }
}
export function cleanPlanIntake(input) {
  if (!input || typeof input !== 'object') return null
  return planIntakeFromAnswers({ ...cleanAnswers(input.context), training_experience: input.experience, equipment: input.equipment, training_days: String(input.days), sensitivities: input.sensitivities })
}
export function programText(program) {
  return ['Your personalised Peptis programme', ...program.personalisationNotes, '',
    ...program.days.flatMap(day => [day.title, ...day.slots.map(s => `${s.exercise.name}: ${s.sets} ${s.sets === 1 ? 'set' : 'sets'} of ${s.reps}. ${s.exercise.cue}`), '']),
    'Nutrition and routine', ...program.nutritionNotes, '', 'Weekly rhythm', ...program.weeklyNotes,
    '', 'Progression', ...program.progression, '', ...program.stopRules].join('\n')
}
