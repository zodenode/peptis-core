import type { Answers, PlanAnswerKey } from '../../data/quiz'
import { medicationOptions, providerOptions } from '../../data/planBuild'

type Props = { answers: Answers; onAnswer: (key: PlanAnswerKey, value: string) => void; onContinue: () => void; onBack: () => void; canGoBack: boolean }
type Choice = [string, string]
function Choices({ label, field, choices, answers, onAnswer }: { label: string; field: PlanAnswerKey; choices: Choice[]; answers: Answers; onAnswer: Props['onAnswer'] }) {
  return <fieldset className="plan-field"><legend>{label}</legend><div className="refinement-options" role="radiogroup" aria-label={label}>{choices.map(([id, text]) => <button type="button" key={id} role="radio" aria-checked={answers[field] === id} className={`refinement-option${answers[field] === id ? ' is-selected' : ''}`} onClick={() => onAnswer(field, id)}>{text}</button>)}</div></fieldset>
}
export function TreatmentContext({ answers, onAnswer, onContinue, onBack }: Props) {
  const notStarted = answers.q1 === 'q1_not_started'
  return <article className="quiz-card"><div className="quiz-body">
    <p className="quiz-kicker">Your treatment context</p><h1>A little context for your plan</h1>
    <p>Optional prescription details help keep your record useful. Peptis does not recommend or change medication doses.</p>
    {!notStarted && <>
      <label className="email-gate-field">Current medication<select aria-label="Current medication" value={answers.current_medication ?? ''} onChange={e => onAnswer('current_medication', e.target.value)}><option value="">Choose one</option>{medicationOptions.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}</select></label>
      {answers.current_medication && !['none','prefer_not'].includes(answers.current_medication) && <label className="email-gate-field">Dose and frequency (optional)<input aria-label="Dose and frequency" maxLength={80} value={answers.medication_dose ?? ''} onChange={e => onAnswer('medication_dose', e.target.value)} placeholder="Copy from your prescription label, or leave blank" /></label>}
    </>}
    <label className="email-gate-field">Current provider (optional)<select aria-label="Current provider" value={answers.care_provider ?? 'prefer_not'} onChange={e => onAnswer('care_provider', e.target.value)}><option value="prefer_not">Prefer not to say</option>{providerOptions.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}</select></label>
    <Choices {...{ answers, onAnswer }} field="weight_change" label="How has your weight changed since starting treatment, or over the last three months if you have not started?" choices={[
      ['stable','Mostly stable'],['under_5','Lost less than 5% of starting weight'],['5_to_10','Lost 5–10%'],['over_10','Lost more than 10%'],['gained','Gained weight'],['unsure','Not sure'],['prefer_not','Prefer not to say'],
    ]} />
    <div className="quiz-actions"><button type="button" className="btn btn-ghost" onClick={onBack}>Back</button><button type="button" className="btn btn-primary" disabled={(!notStarted && !answers.current_medication) || !answers.weight_change} onClick={onContinue}>Continue</button></div>
  </div></article>
}
export function PlanBuild({ answers, onAnswer, onContinue, onBack, canGoBack }: Props) {
  const ready = ['training_experience','equipment','training_days','training_habit','protein_habit','appetite'].every(key => answers[key as PlanAnswerKey])
  return <article className="quiz-card"><div className="quiz-body">
    <p className="quiz-kicker">Make the plan fit your week</p><h1>Your routine, your starter plan</h1><p>These answers build your exercise sessions and nutrition actions. You will not need to answer them again on the plan page.</p>
    <Choices {...{ answers, onAnswer }} field="training_experience" label="Your resistance-training experience" choices={[[ 'new','New to strength training'],['returning','Returning after a break'],['regular','Training regularly']]} />
    <Choices {...{ answers, onAnswer }} field="training_habit" label="How many strength sessions do you currently do each week?" choices={[[ '0','None'],['1','One'],['2','Two'],['3_plus','Three or more']]} />
    <Choices answers={answers} onAnswer={(key,value) => { onAnswer(key,value); onAnswer('training_setting',value === 'gym' ? 'gym' : 'home') }} field="equipment" label="What equipment can you use?" choices={[[ 'none','No exercise equipment'],['dumbbells','Dumbbells'],['gym','Full gym']]} />
    <Choices {...{ answers, onAnswer }} field="training_days" label="How many days can you plan for?" choices={[[ '2','Two days a week'],['3','Three days a week']]} />
    <Choices {...{ answers, onAnswer }} field="protein_habit" label="How often do your meals include a protein source?" choices={[[ 'rarely','Rarely'],['some_meals','Some meals'],['most_meals','Most meals'],['unsure','Not sure']]} />
    <Choices {...{ answers, onAnswer }} field="appetite" label="How is your appetite most days?" choices={[[ 'normal','Comfortable and manageable'],['reduced','Reduced, but I can eat regular meals'],['very_low','Very low; eating enough is difficult']]} />
    <div className="quiz-actions"><button type="button" className="btn btn-ghost" onClick={onBack} disabled={!canGoBack}>Back</button><button type="button" className="btn btn-primary" disabled={!ready} onClick={onContinue}>Build my plan</button></div>
  </div></article>
}
