export const QUIZ_CHAPTERS = [
  { id: 'context', label: 'Context', reward: 'Context chapter complete', next: 'Choose what matters to you.' },
  { id: 'goals', label: 'Goals', reward: 'Goals chapter complete', next: 'Build your everyday baseline.' },
  { id: 'baseline', label: 'Baseline', reward: 'Baseline chapter complete', next: 'Make the plan fit your routine.' },
  { id: 'routine', label: 'Routine', reward: 'Routine chapter complete', next: 'Your personalised plan is ready to explore.' },
  { id: 'plan', label: 'Your plan', reward: 'All five chapters complete', next: 'Your plan is saved. You can start when you are ready.' },
]

export function quizChapterState(step, answers = {}, microProgress = 0) {
  const micro = Math.max(0, Math.min(1, Number.isFinite(microProgress) ? microProgress : 0))
  let index = 0, progress = 0
  if (step === 'treatment_context') progress = (1 + micro) / 3
  else if (step === 'explain_q1') progress = 2 / 3
  else if (['q2','email_gate','explain_q2'].includes(step)) {
    index = 1
    progress = step === 'q2' ? 0 : step === 'email_gate' ? 1 / 2 : 1
  } else if (['q3','q4','q5','explain_q3','explain_q4','explain_q5','stop_a','stop_b','stop_c','proof_muscle','proof_energy','proof_gi','summary_mid'].includes(step)) {
    index = 2
    progress = ['q3','q4','q5'].filter(key => answers[key]).length / 4
    if (step === 'summary_mid') progress = 3 / 4
  } else if (['q6','q7','q8','explain_q6','explain_q7','explain_q8','plan_build'].includes(step)) {
    index = 3
    progress = ['q6','q7','q8'].filter(key => answers[key]).length / 4
    if (step === 'plan_build') progress = (3 + micro) / 4
  } else if (['trajectory','reassure','checkout','success'].includes(step)) {
    index = 4
    progress = step === 'success' ? 1 : step === 'checkout' ? 1 / 2 : 0
  }
  const complete = step === 'success'
  return { index, progress: Math.round(progress * 100), complete, position: complete ? 5 : index }
}

export const ROUTINE_FIELDS = ['training_experience','training_habit','equipment','training_days','protein_habit','appetite']
export function routineReady(answers = {}) { return ROUTINE_FIELDS.every(key => Boolean(answers[key])) }
