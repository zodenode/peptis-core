import { randomUUID, randomBytes } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import express from 'express'

const app = express()
const PORT = Number(process.env.PORT || 8787)
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data')
const EVENTS_FILE = path.join(DATA_DIR, 'reservations.jsonl')
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || 'https://www.peptis.com'

fs.mkdirSync(DATA_DIR, { recursive: true })

app.use(express.json({ limit: '64kb' }))

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const STATE_RE = /^[A-Z]{2}$/

function appendEvent(event) {
  const line = JSON.stringify(event) + '\n'
  const fd = fs.openSync(EVENTS_FILE, 'a')
  try {
    fs.writeSync(fd, line)
    fs.fsyncSync(fd)
  } finally {
    fs.closeSync(fd)
  }
}

function readEvents() {
  if (!fs.existsSync(EVENTS_FILE)) return []
  return fs
    .readFileSync(EVENTS_FILE, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line)
      } catch {
        return null
      }
    })
    .filter(Boolean)
}

async function sendConfirmationEmail(reservation) {
  const key = process.env.RESEND_API_KEY
  if (!key) return { sent: false, reason: 'no_api_key' }

  const from = process.env.RESERVATION_EMAIL_FROM || 'Peptis <reservations@peptis.com>'
  const cancelUrl = `${PUBLIC_BASE_URL}/cancel?token=${reservation.cancelToken}`
  const firstName = reservation.firstName || 'there'

  const text = [
    `Hi ${firstName},`,
    '',
    'Your Peptis Core Continuity founding reservation is confirmed.',
    `Reservation reference: ${reservation.id}`,
    '',
    'What this reservation is:',
    '- A $0 place on the state-by-state launch list. No payment details were collected.',
    '- A saved summary of your strength, protein and maintenance priorities.',
    '- Not medical care. No clinician review, prescription, medication or pharmacy fulfillment is included today.',
    '',
    'If services launch in your state and you are eligible, you will be able to review the final terms and decide whether to enroll. The planned founding rate is $299 per month and the planned standard rate is $399 per month. Planned pricing may change before activation.',
    '',
    `You can cancel this reservation at any time: ${cancelUrl}`,
    '',
    'Peptis is operated by Information Edge Insights LLC.',
  ].join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [reservation.email],
        subject: 'Your Peptis founding reservation is confirmed',
        text,
      }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('confirmation email failed', res.status, detail.slice(0, 300))
      return { sent: false, reason: `status_${res.status}` }
    }
    return { sent: true }
  } catch (error) {
    console.error('confirmation email failed', error)
    return { sent: false, reason: 'network' }
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/reservations', async (req, res) => {
  const body = req.body ?? {}
  const firstName = String(body.firstName ?? '').trim()
  const lastName = String(body.lastName ?? '').trim()
  const email = String(body.email ?? '').trim().toLowerCase()
  const phone = String(body.phone ?? '').trim()
  const state = String(body.state ?? '').trim().toUpperCase()
  const upsell = Boolean(body.upsell)
  const pathways = Array.isArray(body.pathways)
    ? body.pathways.filter((p) => typeof p === 'string').slice(0, 8)
    : []

  if (firstName.length < 2 || lastName.length < 2) {
    return res.status(400).json({ ok: false, error: 'invalid_name' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' })
  }
  if (!STATE_RE.test(state)) {
    return res.status(400).json({ ok: false, error: 'invalid_state' })
  }
  if (body.resident !== true || body.attest !== true) {
    return res.status(400).json({ ok: false, error: 'missing_attestations' })
  }

  const reservation = {
    type: 'reservation',
    id: randomUUID(),
    cancelToken: randomBytes(24).toString('hex'),
    createdAt: new Date().toISOString(),
    firstName,
    lastName,
    email,
    phone,
    state,
    upsell,
    pathways,
  }

  try {
    appendEvent(reservation)
  } catch (error) {
    console.error('reservation write failed', error)
    return res.status(500).json({ ok: false, error: 'write_failed' })
  }

  const emailResult = await sendConfirmationEmail(reservation)

  res.json({ ok: true, id: reservation.id, emailSent: emailResult.sent })
})

app.post('/api/reservations/cancel', (req, res) => {
  const token = String(req.body?.token ?? '').trim()
  if (!/^[a-f0-9]{48}$/.test(token)) {
    return res.status(400).json({ ok: false, error: 'invalid_token' })
  }

  const events = readEvents()
  const reservation = events.find((e) => e.type === 'reservation' && e.cancelToken === token)
  if (!reservation) {
    return res.status(404).json({ ok: false, error: 'not_found' })
  }
  const alreadyCancelled = events.some(
    (e) => e.type === 'cancellation' && e.reservationId === reservation.id,
  )
  if (alreadyCancelled) {
    return res.json({ ok: true, alreadyCancelled: true })
  }

  try {
    appendEvent({
      type: 'cancellation',
      reservationId: reservation.id,
      cancelledAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('cancellation write failed', error)
    return res.status(500).json({ ok: false, error: 'write_failed' })
  }

  res.json({ ok: true })
})

const distDir = path.join(process.cwd(), 'dist')
app.use(express.static(distDir))
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/')) return next()
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`peptis server listening on ${PORT}, data dir ${DATA_DIR}`)
})
