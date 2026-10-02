import { useEffect, useRef, useState } from 'react'
import type { Answers, PlanAnswerKey } from '../../data/quiz'
import { medicationOptions, providerOptions } from '../../data/planBuild'
import type { ProviderOption } from '../../data/planBuild'
import { routineReady } from '../../../shared/quizChapters.mjs'

type Props = { answers: Answers; onAnswer: (key: PlanAnswerKey, value: string) => void; onContinue: () => void; onBack: () => void; canGoBack: boolean; onProgress: (progress: number) => void }
type Choice = [string, string]
type RoutineStep = { field: PlanAnswerKey; label: string; short: string; choices: Choice[] }
const routineSteps: RoutineStep[] = [
  { field:'training_experience', short:'Experience', label:'Your resistance-training experience', choices:[['new','New to strength training'],['returning','Returning after a break'],['regular','Training regularly']] },
  { field:'training_habit', short:'Current habit', label:'How many strength sessions do you currently do each week?', choices:[['0','None'],['1','One'],['2','Two'],['3_plus','Three or more']] },
  { field:'equipment', short:'Equipment', label:'What equipment can you use?', choices:[['none','No exercise equipment'],['dumbbells','Dumbbells'],['gym','Full gym']] },
  { field:'training_days', short:'Your week', label:'How many days can you plan for?', choices:[['2','Two days a week'],['3','Three days a week']] },
  { field:'protein_habit', short:'Meals', label:'How often do your meals include a protein source?', choices:[['rarely','Rarely'],['some_meals','Some meals'],['most_meals','Most meals'],['unsure','Not sure']] },
  { field:'appetite', short:'Appetite', label:'How is your appetite most days?', choices:[['normal','Comfortable and manageable'],['reduced','Reduced, but I can eat regular meals'],['very_low','Very low; eating enough is difficult']] },
]
const providerChoices: ProviderOption[] = [...providerOptions,{id:'prefer_not',label:'Prefer not to say',mark:'—',tone:'none'}]
function Choices({ label, field, choices, answers, onAnswer }: { label: string; field: PlanAnswerKey; choices: Choice[]; answers: Answers; onAnswer: Props['onAnswer'] }) {
  return <fieldset className="plan-field"><legend>{label}</legend><div className="refinement-options" role="radiogroup" aria-label={label}>{choices.map(([id,text]) => <button type="button" key={id} role="radio" aria-checked={answers[field] === id} className={`refinement-option${answers[field] === id ? ' is-selected' : ''}`} onClick={() => onAnswer(field,id)}><span>{text}</span>{answers[field] === id && <span className="micro-choice-check" aria-hidden="true">✓</span>}</button>)}</div></fieldset>
}
function MicroProgress({ index, labels, selected }: { index: number; labels: string[]; selected: boolean }) {
  return <div className="micro-progress"><p>Step {index + 1} of {labels.length} <strong>{labels[index]}</strong></p><div className="micro-track" aria-hidden="true">{labels.map((label, i) => <span key={label} className={i < index ? 'is-done' : i === index ? 'is-active' : ''}><i style={{ width: i < index || (i === index && selected) ? '100%' : '0%' }} /></span>)}</div></div>
}
function useMicroStage(index: number, count: number, onProgress: Props['onProgress']) {
  const heading = useRef<HTMLHeadingElement>(null)
  const initial = useRef(true)
  useEffect(() => { onProgress(index / count) }, [index,count,onProgress])
  useEffect(() => { if (initial.current) initial.current = false; else heading.current?.focus() }, [index])
  return heading
}

export function TreatmentContext({ answers, onAnswer, onContinue, onBack, canGoBack, onProgress }: Props) {
  const notStarted = answers.q1 === 'q1_not_started'
  const labels = notStarted ? ['Your provider','Weight context'] : ['Your provider','Medication context','Weight context']
  const [index,setIndex] = useState(0)
  const heading = useMicroStage(index,labels.length,onProgress)
  const providerStep = index === 0
  const medicationStep = !notStarted && index === 1
  const weightStep = index === labels.length - 1
  const selected = providerStep ? Boolean(answers.care_provider) : medicationStep ? Boolean(answers.current_medication) : Boolean(answers.weight_change)
  const ready = providerStep || (medicationStep ? Boolean(answers.current_medication) : Boolean(answers.weight_change))
  const next = () => {
    if (!ready) return
    if (providerStep && !answers.care_provider) onAnswer('care_provider','prefer_not')
    if (weightStep) onContinue(); else setIndex(value => value + 1)
  }
  return <article className="quiz-card"><div className="quiz-body">
    <p className="quiz-kicker">A little context for your plan</p><h1 ref={heading} tabIndex={-1}>Your treatment context</h1>
    <MicroProgress index={index} labels={labels} selected={selected} />
    <div className="micro-stage" key={index}>
      {providerStep && <fieldset className="plan-field"><legend>Who currently manages your GLP-1 prescription?</legend><p className="quiz-hint">Choose your current service or provider. This is optional.</p><div className="provider-grid" role="radiogroup" aria-label="Current prescription provider">{providerChoices.map(provider => <button key={provider.id} type="button" role="radio" aria-checked={answers.care_provider === provider.id} className={`provider-option${answers.care_provider === provider.id ? ' is-selected' : ''}`} onClick={() => onAnswer('care_provider',provider.id)}><span className={`provider-mark is-${provider.tone}`} aria-hidden="true">{provider.logoSrc && <img src={provider.logoSrc} className={`provider-logo is-${provider.logoFit ?? 'wordmark'}`} alt="" width={72} height={28} onError={event => event.currentTarget.classList.add('is-broken')} />}<span className={`provider-logo-fallback${provider.logoSrc ? '' : ' is-visible'}`}>{provider.mark}</span></span><span className="provider-option-label">{provider.label}</span>{answers.care_provider === provider.id && <span className="micro-choice-check" aria-hidden="true">✓</span>}</button>)}</div><p className="quiz-hint">Names and marks identify providers. Peptis is independent; no affiliation or endorsement is implied.</p></fieldset>}
      {medicationStep && <><p>Prescription details are context only. Peptis does not recommend or change medication doses.</p><label className="email-gate-field">Current medication<select aria-label="Current medication" value={answers.current_medication ?? ''} onChange={event => onAnswer('current_medication',event.target.value)}><option value="">Choose one</option>{medicationOptions.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label>{answers.current_medication && !['none','prefer_not'].includes(answers.current_medication) && <label className="email-gate-field">Dose and frequency (optional)<input aria-label="Dose and frequency" maxLength={80} value={answers.medication_dose ?? ''} onChange={event => onAnswer('medication_dose',event.target.value)} placeholder="Copy from your prescription label, or leave blank" /></label>}</>}
      {weightStep && <Choices {...{answers,onAnswer}} field="weight_change" label="How has your weight changed since starting treatment, or over the last three months if you have not started?" choices={[[ 'stable','Mostly stable'],['under_5','Lost less than 5% of starting weight'],['5_to_10','Lost 5–10%'],['over_10','Lost more than 10%'],['gained','Gained weight'],['unsure','Not sure'],['prefer_not','Prefer not to say']]} />}
    </div>
    <div className="quiz-actions"><button type="button" className="btn btn-ghost" disabled={index === 0 && !canGoBack} onClick={() => index > 0 ? setIndex(value => value - 1) : onBack()}>Back</button><button type="button" className="btn btn-primary" disabled={!ready} onClick={next}>{providerStep && !selected ? 'Skip this detail' : weightStep ? 'Finish context details' : 'Continue'}</button></div>
  </div></article>
}

export function PlanBuild({ answers, onAnswer, onContinue, onBack, canGoBack, onProgress, onSensitivitiesChange }: Props & { onSensitivitiesChange: (values: string[]) => void }) {
  const [index,setIndex] = useState(0)
  const labels = [...routineSteps.map(step => step.short),'Extra care']
  const heading = useMicroStage(index,labels.length,onProgress)
  const step = routineSteps[index]
  const selected = step ? Boolean(answers[step.field]) : Boolean(answers.sensitivities?.length)
  const ready = step ? selected : routineReady(answers)
  const answer: Props['onAnswer'] = (key,value) => { onAnswer(key,value); if (key === 'equipment') onAnswer('training_setting',value === 'gym' ? 'gym' : 'home') }
  return <article className="quiz-card"><div className="quiz-body">
    <p className="quiz-kicker">Make the plan fit your week</p><h1 ref={heading} tabIndex={-1}>Your routine, one detail at a time</h1>
    <MicroProgress index={index} labels={labels} selected={selected} />
    <div className="micro-stage" key={index}>{step ? <Choices label={step.label} field={step.field} choices={step.choices} answers={answers} onAnswer={answer} /> : <fieldset className="plan-field"><legend>Any areas you want the exercise options to take into account? (optional)</legend><p className="quiz-hint">Choose any that apply, or leave blank. This is not an injury assessment.</p><div className="refinement-options">{[['knees','Knees'],['back','Back'],['shoulders','Shoulders']].map(([id,label]) => <label className="refinement-option" key={id}><input type="checkbox" checked={answers.sensitivities?.includes(id) ?? false} onChange={event => onSensitivitiesChange(event.target.checked ? [...(answers.sensitivities || []),id] : (answers.sensitivities || []).filter(value => value !== id))} /> {label}</label>)}</div></fieldset>}</div>
    <p className="quiz-hint">These details shape your sessions and nutrition actions. You will not need to answer them again on the plan page.</p>
    <div className="quiz-actions"><button type="button" className="btn btn-ghost" disabled={index === 0 && !canGoBack} onClick={() => index > 0 ? setIndex(value => value - 1) : onBack()}>Back</button><button type="button" className="btn btn-primary" disabled={!ready} onClick={() => { if (!ready) return; if (step) setIndex(value => value + 1); else onContinue() }}>{step ? 'Continue' : 'Complete routine · View my plan'}</button></div>
  </div></article>
}
