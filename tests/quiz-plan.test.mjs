import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { cleanAnswers, planIntakeFromAnswers, derivePathways } from '../shared/profile.mjs'
import { generateProgram } from '../shared/program.mjs'
import { createOutbox } from '../mailOutbox.mjs'

test('digestive wishes never invent a digestive priority without symptoms or an explicit goal', () => {
  for (const q8 of ['q8_a','q8_b','q8_c','q8_d','q8_none']) assert.equal(derivePathways({ q5:'q5_a',q2:['a'],q8 }).includes('gi_repair'),false)
  assert.equal(derivePathways({q5:'q5_c'}).includes('gi_repair'),true)
  assert.equal(derivePathways({q5:'q5_a',q2:['c']}).includes('gi_repair'),true)
})
test('every no-equipment programme excludes bands and weights', () => {
  for (const experience of ['new','returning','regular']) for (const days of [2,3]) for (const sensitivities of [[],['back'],['knees'],['shoulders']]) {
    const plan=generateProgram({experience,equipment:'none',days,sensitivities})
    for (const day of plan.days) for (const slot of day.slots) assert.equal(['banded-row','one-arm-dumbbell-row','farmer-carry','goblet-squat','romanian-deadlift'].includes(slot.exercise.slug),false)
  }
})
test('quiz context changes both training volume and nutrition actions', () => {
  const base={training_experience:'regular',equipment:'dumbbells',training_days:'3',q1:'q1_a',protein_habit:'most_meals',q4:'q4_b',appetite:'normal'}
  const normal=generateProgram(planIntakeFromAnswers(base))
  const adapted=generateProgram(planIntakeFromAnswers({...base,protein_habit:'rarely',q4:'q4_a',appetite:'very_low'}))
  assert.equal(normal.days[0].slots[0].sets,3)
  assert.equal(adapted.days[0].slots[0].sets,1)
  assert.notDeepEqual(normal.nutritionNotes,adapted.nutritionNotes)
  assert.match(adapted.personalisationNotes.join(' '),/Early treatment/)
  assert.equal(cleanAnswers({current_medication:'none',medication_dose:'old'}).medication_dose,undefined)
})
test('recovery and digestive goals change actions without inventing symptoms', () => {
  const base={training_experience:'new',equipment:'none',training_days:'2',training_habit:'0',q1:'q1_d',q4:'q4_b',q5:'q5_a',protein_habit:'most_meals',appetite:'normal'}
  const plan=answers=>generateProgram(planIntakeFromAnswers({...base,...answers}))
  assert.match(plan({q7:'q7_b'}).nutritionNotes.join(' '),/bedtime, wake time/)
  assert.match(plan({q7:'q7_c'}).nutritionNotes.join(' '),/when they occur/)
  assert.notDeepEqual(plan({q7:'q7_b'}).nutritionNotes,plan({q7:'q7_c'}).nutritionNotes)
  assert.match(plan({q5:'q5_b',q8:'q8_d'}).nutritionNotes.join(' '),/eating away from home/)
  assert.doesNotMatch(plan({q8:'q8_d'}).nutritionNotes.join(' '),/digestive goal|symptom timing/)
  assert.match(plan({}).personalisationNotes.join(' '),/timeline is uncertain/)
  assert.doesNotMatch(plan({}).personalisationNotes.join(' '),/Established treatment/)
  assert.equal(cleanAnswers({current_medication:'prefer_not',medication_dose:'old dose'}).medication_dose,undefined)
})
test('exercise preferences survive quiz intake and change the actual session choices', () => {
  const base={training_experience:'returning',equipment:'dumbbells',training_days:'3'}
  const normal=generateProgram(planIntakeFromAnswers(base))
  const adjusted=generateProgram(planIntakeFromAnswers({...base,sensitivities:['back','shoulders','unknown']}))
  assert.equal(normal.days[0].slots.find(slot=>slot.pattern==='hinge').exercise.slug,'romanian-deadlift')
  assert.equal(adjusted.days[0].slots.find(slot=>slot.pattern==='hinge').exercise.slug,'glute-bridge')
  assert.notEqual(normal.days[0].slots.find(slot=>slot.pattern==='push').exercise.slug,adjusted.days[0].slots.find(slot=>slot.pattern==='push').exercise.slug)
  assert.match(adjusted.personalisationNotes.join(' '),/back, shoulders/)
  assert.doesNotMatch(adjusted.personalisationNotes.join(' '),/unknown/)
})
test('outbox survives provider downtime and process recreation without resending accepted mail', async () => {
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'peptis-outbox-')), file=path.join(dir,'outbox.jsonl')
  let calls=0
  const deliver=async () => { calls++; return {sent:true} }
  try {
    const first=createOutbox({file,deliver,enabled:()=>false})
    assert.equal((await first.send({to:['test@example.com'],subject:'test',text:'test',idempotencyKey:'stable'})).queued,true)
    assert.equal(calls,0)
    const second=createOutbox({file,deliver,enabled:()=>true})
    const mail={to:['test@example.com'],subject:'test',text:'test',idempotencyKey:'stable'}
    await Promise.all([second.send(mail),second.send(mail)])
    await createOutbox({file,deliver,enabled:()=>true}).send(mail)
    assert.equal(calls,1)
  } finally { fs.rmSync(dir,{recursive:true,force:true}) }
})

test('queued marketing respects a later unsubscribe', async () => {
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'peptis-suppression-'))
  let enabled=false, subscribed=true, calls=0
  const queue=createOutbox({file:path.join(dir,'mail.jsonl'),enabled:()=>enabled,shouldSend:mail=>!mail.marketing||subscribed,deliver:async()=>{calls++;return {sent:true}}})
  try {
    const mail={idempotencyKey:'marketing',marketing:true,to:['test@example.com'],text:'update'}
    await queue.send(mail); enabled=true; subscribed=false
    assert.equal((await queue.send(mail)).reason,'unsubscribed')
    assert.equal(calls,0)
  } finally {fs.rmSync(dir,{recursive:true,force:true})}
})
