import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { funnelEvent } from '../shared/funnel.mjs'
import { buildPeople } from '../contentStore.mjs'

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'peptis-launch-'))
const mailFile = path.join(tmp, 'mail.jsonl')
const port = 18879
const server = spawn(process.execPath, ['--import', './tests/mock-mail.mjs', 'server.mjs'], {
  env: { ...process.env, PORT: String(port), NODE_ENV: 'test', RAILWAY_ENVIRONMENT_ID: '', DATA_DIR: tmp, RESEND_API_KEY: 'test-only', OPS_NOTIFY_EMAILS: 'disabled', ADMIN_TOKEN: 'test-admin-token-1234', MOCK_MAIL_FILE: mailFile, PUBLIC_BASE_URL: `http://127.0.0.1:${port}` },
  stdio: ['ignore', 'pipe', 'pipe'],
})
const ready = new Promise((resolve, reject) => {
  server.stdout.on('data', (chunk) => { if (String(chunk).includes('listening')) resolve() })
  server.once('exit', (code) => reject(new Error(`Server exited ${code}`)))
})
const base = `http://127.0.0.1:${port}`
const post = (url, data) => fetch(base + url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
const rows = (name) => fs.existsSync(path.join(tmp, name)) ? fs.readFileSync(path.join(tmp, name), 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse) : []
const quizId = '00000000-0000-4000-8000-000000000001'

test('soft launch integration', async (t) => {
  t.after(async () => { server.kill(); await once(server, 'exit'); fs.rmSync(tmp, { recursive: true, force: true }) })
  await ready
  await t.test('legal routes and real 404s, including nested routes', async () => {
    for (const url of ['/terms', '/contact', '/box-updates']) {
      const res = await fetch(base + url)
      assert.equal(res.status, 200)
      assert.match(await res.text(), /<title>(Terms|Contact|Nutrition box)/)
    }
    for (const url of ['/missing', '/go/missing', '/publication/missing', '/publication/missing/missing', '/blog/missing']) assert.equal((await fetch(base + url)).status, 404, url)
    assert.equal((await fetch(base + '/go/care', { redirect: 'manual' })).headers.get('location'), '/quiz')
  })
  await t.test('analytics drops personal, health and nested payloads on both sides', async () => {
    assert.deepEqual(funnelEvent('quiz_step_viewed', { step_index: 3, email: 'private', pathways: ['gi_repair'], option_id: 'q3_a' }), { event: 'quiz_step_viewed', properties: { step_index: 3 } })
    assert.equal(funnelEvent('summary_sent'), null)
    assert.equal((await post('/api/events', { event: 'quiz_step_viewed', properties: { step_index: 3, secret: { medication: 'private' } }, path: '/quiz?email=private' })).status, 200)
    const data = rows('analytics.jsonl')
    assert.equal(JSON.stringify(data).includes('private'), false)
    assert.equal(JSON.stringify(data).includes('medication'), false)
  })
  await t.test('health consent is enforced and raw answers are never persisted', async () => {
    const lead = { quizId, step: 'email_gate', email: 'quiz@example.com', firstName: 'Tester', responses: [{ prompt: 'medication', labels: ['private'] }] }
    assert.equal((await post('/api/quiz-progress', lead)).status, 400)
    const res = await post('/api/quiz-progress', { ...lead, healthConsent: true, marketingConsent: false, sendGuide: true })
    assert.equal((await res.json()).guideSent, true)
    assert.equal(JSON.stringify(rows('quiz-progress.jsonl')).includes('private'), false)
    assert.equal(rows('quiz-progress.jsonl').find((x) => x.type === 'lead').marketingConsent, false)
    assert.equal(rows('mail.jsonl')[0].text.includes('$59'), false)
  })
  await t.test('final signup emails real priorities, guide, address and unsubscribe; retry is idempotent', async () => {
    const body = { quizId, email: 'quiz@example.com', firstName: 'Tester', state: 'CA', resident: true, attest: true, healthConsent: true, marketingConsent: false, priorities: ['muscle_protection', 'gi_repair', 'private'] }
    const first = await (await post('/api/reservations', body)).json()
    assert.equal(first.emailSent, true)
    const mail = rows('mail.jsonl').at(-1)
    assert.match(mail.text, /Strength and function/)
    assert.match(mail.text, /Digestive comfort/)
    assert.match(mail.text, /10 Glenlake Parkway, Suite 130/)
    assert.match(mail.text, /\/publication\/training\/two-day-strength-plan/)
    assert.match(mail.text, /\/unsubscribe\?token=/)
    assert.equal(mail.text.includes('private'), false)
    const second = await (await post('/api/reservations', body)).json()
    assert.equal(first.id, second.id)
    assert.equal(rows('reservations.jsonl').filter((x) => x.type === 'reservation').length, 1)
    assert.equal(rows('mail.jsonl').filter((x) => x.subject.includes('priorities')).length, 1)
  })
  await t.test('box signup requires consent and unsubscribe suppresses outreach', async () => {
    const body = { firstName: 'Tester', email: 'box@example.com', purpose: 'box_updates' }
    assert.equal((await post('/api/leads', body)).status, 400)
    const res = await (await post('/api/leads', { ...body, marketingConsent: true })).json()
    assert.equal(res.guideSent, true)
    const before = buildPeople({ progress: rows('quiz-progress.jsonl'), reservations: [] }).find((x) => x.email === body.email)
    assert.equal(before.marketingConsent, false)
    assert.equal(before.boxUpdatesConsent, true)
    const token = rows('quiz-progress.jsonl').find((x) => x.type === 'update_token' && x.email === body.email).token
    assert.equal((await fetch(base + '/unsubscribe?token=' + token)).status, 200)
    assert.equal((await post('/unsubscribe', { token })).status, 200)
    const people = buildPeople({ progress: rows('quiz-progress.jsonl'), reservations: rows('reservations.jsonl') })
    assert.equal(people.find((x) => x.email === body.email).marketingConsent, false)
    assert.equal(people.find((x) => x.email === body.email).reserveBox, false)
  })
  await t.test('email failure is distinct from a successful durable save', async () => {
    const res = await post('/api/leads', { firstName: 'Tester', email: 'failure@example.com' })
    const body = await res.json()
    assert.equal(body.ok, true)
    assert.equal(body.guideSent, false)
    assert.ok(rows('analytics.jsonl').some((x) => x.event === 'email_failed'))
  })
  await t.test('funnel reporting requires admin authentication', async () => {
    assert.equal((await fetch(base + '/admin/funnel', { redirect: 'manual' })).status, 303)
    const res = await fetch(base + '/admin/funnel', { headers: { Authorization: 'Bearer test-admin-token-1234' } })
    assert.equal(res.status, 200)
    assert.match(await res.text(), /summary_sent/)
  })
  await t.test('production signup fails closed without a persistent volume', async () => {
    const child = spawn(process.execPath, ['server.mjs'], { env: { ...process.env, PORT: '18880', NODE_ENV: 'production', DATA_DIR: path.join(tmp, 'unmounted'), RAILWAY_VOLUME_MOUNT_PATH: '', RESEND_API_KEY: '', OPS_NOTIFY_EMAILS: 'disabled' }, stdio: ['ignore', 'pipe', 'pipe'] })
    try {
      await new Promise((resolve, reject) => { child.stdout.on('data', (chunk) => { if (String(chunk).includes('listening')) resolve() }); child.once('exit', reject) })
      const readiness = await (await fetch('http://127.0.0.1:18880/api/readiness')).json()
      assert.equal(readiness.signupReady, false)
      const res = await fetch('http://127.0.0.1:18880/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ firstName: 'Tester', email: 'test@example.com' }) })
      assert.equal(res.status, 503)
      assert.equal(fs.existsSync(path.join(tmp, 'unmounted', 'quiz-progress.jsonl')), false)
    } finally { child.kill(); await once(child, 'exit') }
  })

})
