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
