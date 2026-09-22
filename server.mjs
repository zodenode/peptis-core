import { randomUUID, randomBytes } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import { funnelEvent } from './shared/funnel.mjs'
import { cleanPriorities, postalLines, resourceEmail } from './emailTemplates.mjs'
import { adminEnabled, createAdminRouter } from './adminDashboard.mjs'
import { createContentStore } from './contentStore.mjs'

const app = express()
const PORT = Number(process.env.PORT || 8787)
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data')
const EVENTS_FILE = path.join(DATA_DIR, 'reservations.jsonl')
const PROGRESS_FILE = path.join(DATA_DIR, 'quiz-progress.jsonl')
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.jsonl')
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || 'https://www.peptis.com'

fs.mkdirSync(DATA_DIR, { recursive: true })

app.use(express.json({ limit: '256kb' }))
app.use(express.urlencoded({ extended: false, limit: '256kb' }))
// Bound abuse without persisting IP addresses. Railway proxy headers are not trusted.
const requestWindows = new Map()
app.use('/api', (req, res, next) => {
  if (req.method !== 'POST') return next()
  const now = Date.now()
  for (const [key, window] of requestWindows) if (window.until < now) requestWindows.delete(key)
  const key = req.socket.remoteAddress || 'unknown'
  const window = requestWindows.get(key) || { count: 0, until: now + 60_000 }
  window.count += 1
  requestWindows.set(key, window)
  if (window.count > 300) return res.status(429).json({ ok: false, error: 'try_later' })
  next()
})

// Never claim a production signup is saved when email or durable storage is absent.
const productionRuntime = Boolean(process.env.RAILWAY_ENVIRONMENT_ID) || process.env.NODE_ENV === 'production'
const signupReady = !productionRuntime || Boolean(process.env.RESEND_API_KEY && process.env.DATA_DIR && process.env.RAILWAY_VOLUME_MOUNT_PATH && (DATA_DIR === process.env.RAILWAY_VOLUME_MOUNT_PATH || DATA_DIR.startsWith(`${process.env.RAILWAY_VOLUME_MOUNT_PATH}/`)))
app.get('/api/readiness', (_req, res) => res.json({ signupReady }))
app.use(['/api/leads', '/api/quiz-progress', '/api/reservations'], (req, res, next) => {
  if (req.method === 'POST' && req.path !== '/cancel' && !signupReady) return res.status(503).json({ ok: false, error: 'signup_unavailable' })
  next()
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const STATE_RE = /^[A-Z]{2}$/
const SOURCE_RE = /^[a-z0-9_-]{1,40}$/i
const DEFAULT_OPS_EMAILS = ['Josephedwardbrady@gmail.com', 'edozieizegbu@gmail.com']
const KNOWN_APP_PATHS = new Set([
  '/',
  '/quiz',
  '/plan',
  '/offerings',
  '/publication',
  '/blog',
  '/terms',
  '/privacy',
  '/privacy-policy',
  '/health-data',
  '/contact',
  '/box-updates',
  '/cancel',
])
const KNOWN_GO_SLUGS = new Set(['strength', 'box', 'care', 'plan', 'start', 'visual', 'compare', 'ad', 'examples'])

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

async function sendResend({ to, subject, text, idempotencyKey }) {
  const key = process.env.RESEND_API_KEY
  if (!key) return { sent: false, reason: 'no_api_key' }
  const from = process.env.RESERVATION_EMAIL_FROM || 'Peptis <reservations@peptis.com>'
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
      },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({ from, to, subject, text, reply_to: 'support@peptis.com' }),
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

function recordFunnel(event) {
  appendEvent({ type: 'analytics', ...funnelEvent(event, {}, true), at: new Date().toISOString() }, ANALYTICS_FILE)
}

function unsubscribeToken(email) {
  const existing = readProgressEvents().find((e) => e.type === 'update_token' && e.email === email)
  if (existing) return existing.token
  const token = randomBytes(24).toString('hex')
  appendEvent({ type: 'update_token', email, token, at: new Date().toISOString() }, PROGRESS_FILE)
  return token
}

async function sendResource({ email, firstName, priorities, box = false, id }) {
  const token = unsubscribeToken(email)
  const result = await sendResend({
    to: [email],
    subject: box ? 'Your Peptis box launch updates' : priorities ? 'Your Peptis priorities and starter plan' : 'Your two-day strength starter guide',
    text: resourceEmail({ firstName, priorities, box, baseUrl: PUBLIC_BASE_URL, unsubscribeUrl: `${PUBLIC_BASE_URL}/unsubscribe?token=${token}` }),
    idempotencyKey: id,
  })
  recordFunnel(result.sent ? (priorities ? 'summary_sent' : 'guide_sent') : 'email_failed')
  return result
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
  const sendGuide = body.sendGuide === true
  const source = cleanSource(body.source)
  const healthConsent = body.healthConsent === true
  const marketingConsent = body.marketingConsent === true
  const reserveBox = body.reserveBox === true && marketingConsent
  if (email && !healthConsent) return res.status(400).json({ ok: false, error: 'health_consent_required' })
  // No prescription answers or derived health categories are accepted by this endpoint.
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
          healthConsent,
          marketingConsent,
          reserveBox,
          consentVersion: '2026-09-22',
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
    if (alreadySent) guideSent = true
    if (!alreadySent) {
      const result = await sendResource({ email, firstName, id: `guide-${quizId}` })
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

  if (email) recordFunnel('email_submitted')
  res.json({ ok: true, guideSent, opsNotified })
})

app.post('/api/leads', async (req, res) => {
  const body = req.body ?? {}
  const firstName = String(body.firstName ?? '').trim().slice(0, 80)
  const email = String(body.email ?? '').trim().toLowerCase()
  const source = cleanSource(body.source)
  const marketingConsent = body.marketingConsent === true
  const box = body.purpose === 'box_updates'
  if (box && !marketingConsent) return res.status(400).json({ ok: false, error: 'marketing_consent_required' })
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
        marketingConsent,
        reserveBox: box,
        marketingScope: box ? 'box_updates' : 'all_product_updates',
        consentVersion: '2026-09-22',
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
  const kind = box ? 'box_email' : 'guide_email'
  const alreadySent = readProgressEvents().some((e) => e.type === kind && e.email === email)
  if (alreadySent) guideSent = true
  if (!alreadySent) {
    const result = await sendResource({ email, firstName, box, id: `${kind}-${unsubscribeToken(email)}` })
    guideSent = result.sent
    if (result.sent) {
      try {
        appendEvent({ type: kind, email, at: new Date().toISOString() }, PROGRESS_FILE)
      } catch (error) {
        console.error('guide email log failed', error)
      }
    }
  }

  recordFunnel(box ? 'box_interest_saved' : 'email_submitted')
  res.json({ ok: true, guideSent, opsNotified })
})

app.post('/api/reservations', async (req, res) => {
  const body = req.body ?? {}
  const quizId = String(body.quizId || '')
  if (!UUID_RE.test(quizId)) return res.status(400).json({ ok: false, error: 'invalid_quiz' })
  const firstName = String(body.firstName ?? '').trim()
  const lastName = String(body.lastName ?? '').trim()
  const email = String(body.email ?? '').trim().toLowerCase()
  const phone = '' // SMS collection is off until a separate SMS programme is ready.
  const state = String(body.state ?? '').trim().toUpperCase()
  const upsell = body.upsell === true
  if (body.healthConsent !== true) return res.status(400).json({ ok: false, error: 'health_consent_required' })
  const priorities = cleanPriorities(body.priorities)
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

  const existing = readEvents().find((e) => e.type === 'reservation' && e.quizId === quizId && e.email === email)
  const reservation = existing || {
    type: 'reservation',
    quizId,
    id: randomUUID(),
    cancelToken: randomBytes(24).toString('hex'),
    createdAt: new Date().toISOString(),
    firstName,
    lastName,
    email,
    phone,
    smsOptIn: false,
    healthConsent: true,
    marketingConsent: body.marketingConsent === true,
    boxUpdatesConsent: upsell,
    consentVersion: '2026-09-22',
    priorities,
    state,
    upsell,
    source,
  }

  try {
    if (!existing) appendEvent(reservation)
  } catch (error) {
    console.error('reservation write failed', error)
    return res.status(500).json({ ok: false, error: 'write_failed' })
  }

  const alreadySent = readEvents().some((e) => e.type === 'summary_email' && e.reservationId === reservation.id)
  const emailResult = alreadySent ? { sent: true } : await sendResource({ email, firstName: reservation.firstName, priorities: reservation.priorities, id: `summary-${reservation.id}` })
  if (emailResult.sent && !alreadySent) appendEvent({ type: 'summary_email', reservationId: reservation.id, at: new Date().toISOString() })
  if (!existing) recordFunnel('quiz_completed')
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
    appendEvent({ type: 'unsubscribe', email: reservation.email, at: new Date().toISOString() }, PROGRESS_FILE)
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
    page.imageWidth ? `<meta property="og:image:width" content="${escapeAttr(String(page.imageWidth))}" />` : '',
    page.imageHeight ? `<meta property="og:image:height" content="${escapeAttr(String(page.imageHeight))}" />` : '',
    page.imageAlt ? `<meta property="og:image:alt" content="${escapeAttr(page.imageAlt)}" />` : '',
    page.type === 'article' && page.dateModified
      ? `<meta property="article:modified_time" content="${escapeAttr(page.dateModified)}" />`
      : '',
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...jsonLd.map(
      (block) =>
        `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`,
    ),
  ].filter(Boolean)
  return next.replace('</head>', `${extra.join('\n    ')}\n  </head>`)
}

const contentStore = createContentStore({
  dataDir: DATA_DIR,
  publicDir: path.join(process.cwd(), 'public'),
  distDir,
})

app.get('/api/publication/articles', (_req, res) => {
  res.set('Cache-Control', 'public, max-age=30')
  res.json({ ok: true, articles: contentStore.listArticles() })
})

app.post('/api/events', (req, res) => {
  const safe = funnelEvent(req.body?.event, req.body?.properties)
  if (!safe) return res.status(400).json({ ok: false, error: 'unsupported_event' })
  try {
    appendEvent({ type: 'analytics', ...safe, at: new Date().toISOString() }, ANALYTICS_FILE)
    res.json({ ok: true })
  } catch {
    res.status(500).json({ ok: false, error: 'write_failed' })
  }
})

app.get('/go/care', (_req, res) => res.redirect(301, '/quiz'))
app.get('/go/box', (_req, res) => res.redirect(301, '/box-updates'))

app.get('/unsubscribe', (req, res) => {
  const token = String(req.query.token || '')
  if (!/^[a-f0-9]{48}$/.test(token)) return res.status(400).send('Invalid unsubscribe link.')
  res.set('Cache-Control', 'no-store').set('Referrer-Policy', 'no-referrer').type('html').send(`<!doctype html><html lang="en"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Email preferences | Peptis</title><main><h1>Stop Peptis product updates</h1><form method="post" action="/unsubscribe"><input type="hidden" name="token" value="${token}"><button>Unsubscribe from all product updates</button></form></main></html>`)
})
app.post('/unsubscribe', (req, res) => {
  const token = String(req.body?.token || '')
  const person = /^[a-f0-9]{48}$/.test(token) && readProgressEvents().find((e) => e.type === 'update_token' && e.token === token)
  if (!person) return res.status(404).send('Unsubscribe link not found. Contact support@peptis.com.')
  appendEvent({ type: 'unsubscribe', email: person.email, at: new Date().toISOString() }, PROGRESS_FILE)
  res.set('Cache-Control', 'no-store').type('html').send('<!doctype html><html lang="en"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Unsubscribed | Peptis</title><main><h1>You are unsubscribed</h1><p>Peptis product-update emails are turned off.</p><a href="/">Back to Peptis</a></main></html>')
})

app.get(['/publication/partners', '/publication/partners/'], (_req, res) => {
  res.redirect(301, '/publication')
})
app.get('/publication-partner-kit.json', (_req, res) => {
  res.status(404).end()
})

app.use(
  createAdminRouter({
    eventsFile: EVENTS_FILE,
    progressFile: PROGRESS_FILE,
    distDir,
    publicDir: path.join(process.cwd(), 'public'),
    dataDir: DATA_DIR,
    sendMail: async (mail) => {
      const email = mail.to?.[0]
      if (readProgressEvents().some((e) => e.type === 'unsubscribe' && e.email === email)) return { sent: false, reason: 'unsubscribed' }
      const token = unsubscribeToken(email)
      return sendResend({ ...mail, text: `${mail.text}\n\nUnsubscribe: ${PUBLIC_BASE_URL}/unsubscribe?token=${token}\n${postalLines().join('\n')}` })
    },
    logEvent: appendEvent,
  }),
)

function isKnownAppPath(pagePath) {
  if (KNOWN_APP_PATHS.has(pagePath)) return true
  if (pagePath.startsWith('/go/')) return KNOWN_GO_SLUGS.has(pagePath.slice(4))
  if (pagePath.startsWith('/blog/')) return Boolean(contentStore.getArticle(pagePath.slice(6)))
  if (pagePath.startsWith('/publication/')) {
    if (loadPublicationSeo()[pagePath]) return true
    const parts = pagePath.split('/').filter(Boolean)
    if (parts.length === 2) return false
    if (parts.length === 3) {
      const article = contentStore.getArticle(parts[2])
      return article && String(article.category).toLowerCase() === parts[1]
    }
  }
  return false
}

app.use(express.static(distDir))
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/')) return next()
  const pagePath = req.path.replace(/\/$/, '') || '/'
  if (pagePath === '/publication/partners') {
    return res.redirect(301, '/publication')
  }
  const page = loadPublicationSeo()[pagePath] || (pagePath === '/privacy-policy' ? loadPublicationSeo()['/privacy'] : null)
  const known = Boolean(page) || isKnownAppPath(pagePath)
  if (!known) {
    res.status(404)
  }
  if (!page) {
    return res.sendFile(path.join(distDir, 'index.html'))
  }
  const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')
  res.type('html').send(injectPublicationHead(html, page, pagePath))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`peptis server listening on ${PORT}, data dir ${DATA_DIR}`)
  console.log(adminEnabled() ? 'admin desk enabled at /admin' : 'admin desk off (set ADMIN_TOKEN, 16+ characters)')
})
