import { randomUUID, randomBytes } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import express from 'express'

const app = express()
const PORT = Number(process.env.PORT || 8787)
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data')
const EVENTS_FILE = path.join(DATA_DIR, 'reservations.jsonl')
const PROGRESS_FILE = path.join(DATA_DIR, 'quiz-progress.jsonl')
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || 'https://www.peptis.com'

fs.mkdirSync(DATA_DIR, { recursive: true })

app.use(express.json({ limit: '64kb' }))

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const STATE_RE = /^[A-Z]{2}$/
const SOURCE_RE = /^[a-z0-9_-]{1,40}$/i
const DEFAULT_OPS_EMAILS = ['Josephedwardbrady@gmail.com', 'edozieizegbu@gmail.com']

function opsRecipients() {
  const raw = process.env.OPS_NOTIFY_EMAILS
  const list = raw
    ? raw.split(',').map((item) => item.trim()).filter((item) => EMAIL_RE.test(item))
    : DEFAULT_OPS_EMAILS
  return list
}

function cleanSource(value) {
  const source = String(value ?? '').trim()
  return SOURCE_RE.test(source) ? source : 'direct'
}

async function sendResend({ to, subject, text }) {
  const key = process.env.RESEND_API_KEY
  if (!key) return { sent: false, reason: 'no_api_key' }
  const from = process.env.RESERVATION_EMAIL_FROM || 'Peptis <reservations@peptis.com>'
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, text }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('resend failed', subject, res.status, detail.slice(0, 300))
      return { sent: false, reason: `status_${res.status}` }
    }
    return { sent: true }
  } catch (error) {
    console.error('resend failed', subject, error)
    return { sent: false, reason: 'network' }
  }
}

async function sendOpsNotification({ event, firstName, email, state, phone, upsell, source, reference }) {
  const to = opsRecipients()
  if (!to.length) return { sent: false, reason: 'no_recipients' }
  const text = [
    `Peptis form ${event}`,
    '',
    `Event: ${event}`,
    `Name: ${firstName || 'unknown'}`,
    `Email: ${email}`,
    state ? `State: ${state}` : null,
    phone ? `Phone: ${phone}` : null,
    `Path / source: ${source || 'direct'}`,
    upsell === undefined ? null : `Lean Mass box interest: ${upsell ? 'yes' : 'no'}`,
    reference ? `Reference: ${reference}` : null,
    `Time: ${new Date().toISOString()}`,
    '',
    'Quiz answers, provider and medication were not included.',
  ]
    .filter(Boolean)
    .join('\n')
  return sendResend({
    to,
    subject: `Peptis ${event}: ${firstName || email}`,
    text,
  })
}

function appendEvent(event, file = EVENTS_FILE) {
  const line = JSON.stringify(event) + '\n'
  const fd = fs.openSync(file, 'a')
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
  const cancelUrl = `${PUBLIC_BASE_URL}/cancel?token=${reservation.cancelToken}`
  const firstName = reservation.firstName || 'there'

  const text = [
    `Hi ${firstName},`,
    '',
    'Your Peptis continuity summary is saved.',
    `Reference: ${reservation.id}`,
    '',
    'What this is:',
    '- A free written summary and the two-day strength starter plan. No payment details were collected.',
    '- Not a purchase, subscription, or medical service.',
    '- No clinician review, prescription, medication or pharmacy fulfillment is included.',
    '',
    reservation.upsell
      ? 'You asked to hear when the Lean Mass nutrition box can ship. The intended price is $59 a month. Asking does not place an order. Nothing ships until we can charge and fulfill, and you choose to buy.'
      : 'The first paid product we intend to sell is the Lean Mass nutrition box at $59 a month. It is not for sale yet. Reply if you want to hear when it can ship.',
    '',
    'There is no paid clinical programme to join today.',
    '',
    `You can cancel these updates at any time: ${cancelUrl}`,
    '',
    'Peptis is operated by Information Edge Insights LLC.',
  ].join('\n')

  return sendResend({
    to: [reservation.email],
    subject: 'Your Peptis continuity summary is saved',
    text,
  })
}

async function sendStarterPlanEmail(email, firstName) {
  const text = [
    `Hi ${firstName || 'there'},`,
    '',
    'Here is the two day strength starter plan we promised, plus where to pick your continuity check back up.',
    '',
    `Two day strength starter plan: ${PUBLIC_BASE_URL}/publication/training/two-day-strength-plan`,
    `Continue your continuity check: ${PUBLIC_BASE_URL}/quiz`,
    '',
    'When you finish the check you will receive your personalized summary of strength, protein and maintenance priorities, plus the starter training plan. The Lean Mass nutrition box is not for sale yet.',
    '',
    'This content is education only and is not medical advice. Talk with your current clinician before changing exercise, diet or medication.',
    '',
    'Peptis is operated by Information Edge Insights LLC. Reply to this email to unsubscribe.',
  ].join('\n')

  return sendResend({
    to: [email],
    subject: 'Your two day strength starter plan',
    text,
  })
}

function readProgressEvents() {
  if (!fs.existsSync(PROGRESS_FILE)) return []
  return fs
    .readFileSync(PROGRESS_FILE, 'utf8')
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

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

app.post('/api/quiz-progress', async (req, res) => {
  const body = req.body ?? {}
  const quizId = String(body.quizId ?? '')
  const step = String(body.step ?? '').slice(0, 40)
  const email = String(body.email ?? '').trim().toLowerCase()
  const firstName = String(body.firstName ?? '').trim().slice(0, 80)
  const entryPrompt = String(body.entryPrompt ?? '').slice(0, 30)
  const sendGuide = body.sendGuide === true
  const source = cleanSource(body.source)
  const pathways = Array.isArray(body.pathways)
    ? body.pathways.filter((p) => typeof p === 'string').slice(0, 8)
    : []
  if (!UUID_RE.test(quizId) || !step) {
    return res.status(400).json({ ok: false, error: 'invalid_payload' })
  }
  if (email && !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' })
  }

  try {
    if (email) {
      appendEvent(
        {
          type: 'lead',
          email,
          firstName: firstName || undefined,
          source,
          at: new Date().toISOString(),
        },
        PROGRESS_FILE,
      )
    } else {
      appendEvent(
        {
          type: 'progress',
          quizId,
          step,
          entryPrompt: entryPrompt || undefined,
          pathways,
          at: new Date().toISOString(),
        },
        PROGRESS_FILE,
      )
    }
  } catch (error) {
    console.error('progress write failed', error)
    return res.status(500).json({ ok: false, error: 'write_failed' })
  }

  let guideSent = false
  let opsNotified = false
  if (email) {
    const alreadyNotified = readProgressEvents().some(
      (e) => e.type === 'ops_notify' && e.event === 'lead' && e.email === email,
    )
    if (!alreadyNotified) {
      const notify = await sendOpsNotification({
        event: 'lead',
        firstName,
        email,
        source,
      })
      opsNotified = notify.sent
      if (notify.sent) {
        try {
          appendEvent(
            { type: 'ops_notify', event: 'lead', email, source, at: new Date().toISOString() },
            PROGRESS_FILE,
          )
        } catch (error) {
          console.error('ops notify log failed', error)
        }
      }
    }
  }
  if (sendGuide && email) {
    const alreadySent = readProgressEvents().some(
      (e) => e.type === 'guide_email' && e.email === email,
    )
    if (!alreadySent) {
      const result = await sendStarterPlanEmail(email, firstName)
      guideSent = result.sent
      if (result.sent) {
        try {
          appendEvent({ type: 'guide_email', email, at: new Date().toISOString() }, PROGRESS_FILE)
        } catch (error) {
          console.error('guide email log failed', error)
        }
      }
    }
  }

  res.json({ ok: true, guideSent, opsNotified })
})

app.post('/api/leads', async (req, res) => {
  const body = req.body ?? {}
  const firstName = String(body.firstName ?? '').trim().slice(0, 80)
  const email = String(body.email ?? '').trim().toLowerCase()
  const source = cleanSource(body.source)
  if (firstName.length < 2) {
    return res.status(400).json({ ok: false, error: 'invalid_name' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' })
  }

  try {
    appendEvent(
      {
        type: 'lead',
        email,
        firstName,
        source,
        at: new Date().toISOString(),
      },
      PROGRESS_FILE,
    )
  } catch (error) {
    console.error('lead write failed', error)
    return res.status(500).json({ ok: false, error: 'write_failed' })
  }

  const alreadyNotified = readProgressEvents().some(
    (e) => e.type === 'ops_notify' && e.event === 'lead' && e.email === email,
  )
  let opsNotified = false
  if (!alreadyNotified) {
    const notify = await sendOpsNotification({ event: 'lead', firstName, email, source })
    opsNotified = notify.sent
    if (notify.sent) {
      try {
        appendEvent(
          { type: 'ops_notify', event: 'lead', email, source, at: new Date().toISOString() },
          PROGRESS_FILE,
        )
      } catch (error) {
        console.error('ops notify log failed', error)
      }
    }
  }

  let guideSent = false
  const alreadySent = readProgressEvents().some((e) => e.type === 'guide_email' && e.email === email)
  if (!alreadySent) {
    const result = await sendStarterPlanEmail(email, firstName)
    guideSent = result.sent
    if (result.sent) {
      try {
        appendEvent({ type: 'guide_email', email, at: new Date().toISOString() }, PROGRESS_FILE)
      } catch (error) {
        console.error('guide email log failed', error)
      }
    }
  }

  res.json({ ok: true, guideSent, opsNotified })
})

app.post('/api/reservations', async (req, res) => {
  const body = req.body ?? {}
  const firstName = String(body.firstName ?? '').trim()
  const lastName = String(body.lastName ?? '').trim()
  const email = String(body.email ?? '').trim().toLowerCase()
  const phone = String(body.phone ?? '').trim()
  const state = String(body.state ?? '').trim().toUpperCase()
  const upsell = Boolean(body.upsell)
  const source = cleanSource(body.source)

  if (firstName.length < 2) {
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
    smsOptIn: Boolean(body.smsOptIn),
    state,
    upsell,
    source,
  }

  try {
    appendEvent(reservation)
  } catch (error) {
    console.error('reservation write failed', error)
    return res.status(500).json({ ok: false, error: 'write_failed' })
  }

  const emailResult = await sendConfirmationEmail(reservation)
  const opsResult = await sendOpsNotification({
    event: 'reservation',
    firstName,
    email,
    state,
    phone,
    upsell,
    source,
    reference: reservation.id,
  })

  res.json({ ok: true, id: reservation.id, emailSent: emailResult.sent, opsNotified: opsResult.sent })
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
const PUBLICATION_SEO_FILE = path.join(distDir, 'publication-seo.json')

function loadPublicationSeo() {
  try {
    return JSON.parse(fs.readFileSync(PUBLICATION_SEO_FILE, 'utf8'))
  } catch {
    return {}
  }
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

function injectPublicationHead(html, page, pagePath) {
  const origin = PUBLIC_BASE_URL.replace(/\/$/, '')
  const url = `${origin}${pagePath}`
  const title = escapeAttr(page.title)
  const description = escapeAttr(page.description)
  const image = escapeAttr(page.image || `${origin}/peptis-logo-green.png`)
  let next = html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta\b[^>]*(?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)"[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, '')
  const jsonLd = Array.isArray(page.jsonLd) ? page.jsonLd : []
  const extra = [
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    `<link rel="alternate" type="text/plain" href="${origin}/llms.txt" />`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />`,
    `<meta property="og:site_name" content="Peptis" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:type" content="${page.type === 'article' ? 'article' : 'website'}" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...jsonLd.map(
      (block) =>
        `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`,
    ),
  ]
  return next.replace('</head>', `${extra.join('\n    ')}\n  </head>`)
}

app.get(['/publication/partners', '/publication/partners/'], (_req, res) => {
  res.redirect(301, '/publication')
})
app.get('/publication-partner-kit.json', (_req, res) => {
  res.status(404).end()
})

app.use(express.static(distDir))
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/')) return next()
  const pagePath = req.path.replace(/\/$/, '') || '/'
  if (pagePath === '/publication/partners') {
    return res.redirect(301, '/publication')
  }
  const page = pagePath.startsWith('/publication') ? loadPublicationSeo()[pagePath] : null
  if (!page) {
    return res.sendFile(path.join(distDir, 'index.html'))
  }
  const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')
  res.type('html').send(injectPublicationHead(html, page, pagePath))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`peptis server listening on ${PORT}, data dir ${DATA_DIR}`)
})
