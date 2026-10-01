import type { Answers } from '../../data/quiz'
import { planIntakeFromAnswers } from '../../../shared/profile.mjs'
import { generateProgram } from '../../../shared/program.mjs'

export function PersonalisedPlanPreview({ answers }: { answers: Answers }) {
  const intake = planIntakeFromAnswers(answers)
  if (!intake) return null
  const program = generateProgram(intake)
  const equipment = { none: 'No equipment', dumbbells: 'Dumbbells', gym: 'Full gym' }[intake.equipment]
  const experience = { new: 'New to strength training', returning: 'Returning after a break', regular: 'Training regularly' }[intake.experience]
  return <section className="personal-plan-preview" aria-label="How your answers shaped your starter plan">
    <div className="personal-plan-fit">
      <h2>Your answers, put into practice</h2>
      <dl className="personal-plan-facts">
        <div><dt>Your week</dt><dd>{intake.days} planned strength days</dd></div>
        <div><dt>Your equipment</dt><dd>{equipment}</dd></div>
        <div><dt>Your starting point</dt><dd>{experience}</dd></div>
        <div><dt>Your starting volume</dt><dd>{program.days[0].slots[0].sets} {program.days[0].slots[0].sets === 1 ? 'set' : 'sets'} per movement</dd></div>
      </dl>
    </div>
    <div className="personal-plan-reasons"><h2>Why this version fits your answers</h2><ul>{program.personalisationNotes.map(note => <li key={note}>{note}</li>)}</ul></div>
    <div className="personal-plan-sessions"><h2>Your starter sessions</h2><p className="quiz-hint">Open a day to see the actual movements. The full plan includes instructions and illustrations.</p>{program.days.map(day => <details key={day.title}><summary>{day.title} · {day.slots.length} movements</summary><ul>{day.slots.map(slot => <li key={slot.pattern}><strong>{slot.exercise.name}</strong><span>{slot.sets} {slot.sets === 1 ? 'set' : 'sets'} · {slot.reps}{slot.note ? ` · ${slot.note}` : ''}</span></li>)}</ul></details>)}</div>
    <div className="personal-plan-nutrition"><h2>Your nutrition and routine actions</h2><ul>{program.nutritionNotes.map(note => <li key={note}>{note}</li>)}</ul></div>
  </section>
}
