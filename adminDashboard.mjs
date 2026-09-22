import { timingSafeEqual } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { Router } from 'express'
import { attachAdminOps } from './adminPages.mjs'

const COOKIE = 'peptis_admin'
const HIDDEN_LANDINGS = [
  { path: '/go/strength', source: 'go_strength', label: 'Strength ad path' },
  { path: '/go/box', source: 'go_box', label: 'Box ad path' },
  { path: '/go/care', source: 'go_care', label: 'Care list path' },
  { path: '/go/plan', source: 'go_plan', label: 'Plan ad path' },
  { path: '/go/start', source: 'go_start', label: 'Short ad path' },
  { path: '/go/ad', source: 'go_ad', label: 'Paid-ad landing' },
  { path: '/go/examples', source: 'go_examples', label: 'Result permutation examples' },
  { path: '/go/visual', source: 'go_visual', label: 'Visual evidence path' },
  { path: '/go/compare', source: 'go_compare', label: 'Before-after education path' },
]
const CRAWLER_FILES = [
  'sitemap.xml',
  'robots.txt',
  'llms.txt',
  'llms-full.txt',
  'publication-feed.xml',
  'publication-catalog.json',
  'publication-seo.json',
]

function adminToken() {
  return String(process.env.ADMIN_TOKEN || '')
}

export function adminEnabled() {
  return adminToken().length >= 16
}

function tokensEqual(got, expected) {
  if (!got || !expected) return false
  const a = Buffer.from(String(got))
  const b = Buffer.from(String(expected))
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

function readCookie(req, name) {
  const raw = req.get('cookie') || ''
  for (const part of raw.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return decodeURIComponent(rest.join('=') || '')
  }
  return ''
}

function tokenFromRequest(req) {
  const header = req.get('authorization') || ''
  if (header.toLowerCase().startsWith('bearer ')) return header.slice(7).trim()
  const query = req.query?.token
  if (query) return String(query)
  return readCookie(req, COOKIE)
}

function isAuthorized(req) {
  return tokensEqual(tokenFromRequest(req), adminToken())
}

function cookieHeader(token) {
  const secure = String(process.env.PUBLIC_BASE_URL || '').startsWith('https')
  const parts = [
    `${COOKIE}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${60 * 60 * 24 * 14}`,
  ]
  if (secure) parts.push('Secure')
  return parts.join('; ')
}

function clearCookieHeader() {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
}

function noStore(res) {
  res.set('Cache-Control', 'no-store')
  res.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
}

function readJsonl(file) {
  if (!fs.existsSync(file)) return []
  return fs
    .readFileSync(file, 'utf8')
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

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}

function fileStat(file) {
  try {
    const stat = fs.statSync(file)
    return { present: true, bytes: stat.size, updated: stat.mtime.toISOString() }
  } catch {
    return { present: false, bytes: 0, updated: null }
  }
}

function countBy(rows, keyFn) {
  const counts = {}
  for (const row of rows) {
    const key = keyFn(row) || 'unknown'
    counts[key] = (counts[key] || 0) + 1
  }
  return Object.entries(counts)
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
}

function laterDate(a, b) {
  return String(a || '') > String(b || '') ? a : b
}

export function buildAdminSnapshot({ eventsFile, progressFile, distDir, publicDir }) {
  const reservationsAll = readJsonl(eventsFile).filter((event) => event.type === 'reservation')
  const cancellations = new Set(
    readJsonl(eventsFile)
      .filter((event) => event.type === 'cancellation')
      .map((event) => event.reservationId),
  )
  const progress = readJsonl(progressFile)
  const leads = progress.filter((event) => event.type === 'lead')
  const uniqueLeadEmails = new Set(leads.map((event) => event.email).filter(Boolean))
  const guideEmails = progress.filter((event) => event.type === 'guide_email')
  const opsNotices = progress.filter((event) => event.type === 'ops_notify')
  const quizProgress = progress.filter((event) => event.type === 'progress')
  const catalog = readJson(path.join(publicDir, 'publication-catalog.json'), [])
  const seoBundle = readJson(path.join(distDir, 'publication-seo.json'), readJson(path.join(publicDir, 'publication-seo.json'), {}))
  const essays = catalog.filter((page) => page.type === 'article')
  const desks = catalog.filter((page) => page.path.startsWith('/publication/') && page.path.split('/').length === 3)
  const sources = countBy(
    [...reservationsAll.map((row) => ({ source: row.source })), ...leads],
    (row) => row.source,
  )

  return {
    generatedAt: new Date().toISOString(),
    offer: {
      liveToday: 'Free continuity check, written summary, and two-day strength starter plan.',
      leanMassBox: 'Intended $59/mo Lean Mass nutrition box. Not for sale until charge and ship work.',
      clinical: 'No paid clinical programme, prescribing, or pharmacy fulfillment today.',
      boxForSale: false,
      clinicalProgrammeForSale: false,
    },
    readiness: {
      resendConfigured: Boolean(process.env.RESEND_API_KEY),
      reservationFromSet: Boolean(process.env.RESERVATION_EMAIL_FROM),
      opsEmailOverride: Boolean(process.env.OPS_NOTIFY_EMAILS),
      publicBaseUrl: process.env.PUBLIC_BASE_URL || 'https://www.peptis.com',
      dataPath: eventsFile,
      posthogKeyAtRuntime: Boolean(process.env.VITE_PUBLIC_POSTHOG_KEY),
      metaPixelAtRuntime: Boolean(process.env.VITE_META_PIXEL_ID),
      stripePublishableAtRuntime: Boolean(process.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    },
    demand: {
      reservations: {
        total: reservationsAll.length,
        active: reservationsAll.filter((row) => !cancellations.has(row.id)).length,
        cancelled: cancellations.size,
        upsellYes: reservationsAll.filter((row) => row.upsell).length,
      },
      leads: {
        events: leads.length,
        uniqueEmails: uniqueLeadEmails.size,
        guideEmails: guideEmails.length,
        opsNotices: opsNotices.length,
      },
      quiz: {
        progressEvents: quizProgress.length,
        byStep: countBy(quizProgress, (row) => row.step),
      },
      sources,
      recentReservations: reservationsAll
        .slice()
        .reverse()
        .slice(0, 25)
        .map((row) => ({
          createdAt: row.createdAt,
          name: [row.firstName, row.lastName].filter(Boolean).join(' '),
          email: row.email,
          phone: row.phone || '',
          state: row.state,
          source: row.source || 'direct',
          upsell: Boolean(row.upsell),
          cancelled: cancellations.has(row.id),
          id: row.id,
        })),
      recentLeads: leads
        .slice()
        .reverse()
        .slice(0, 25)
        .map((row) => ({
          at: row.at,
          firstName: row.firstName || '',
          email: row.email,
          source: row.source || 'direct',
        })),
    },
    publication: {
      home: catalog.find((page) => page.path === '/publication') || null,
      desks,
      essays: essays.map((page) => ({
        ...page,
        seoInjected: Boolean(seoBundle[page.path]),
      })),
      lastmod: essays.reduce((max, page) => laterDate(max, page.dateModified), catalog[0]?.dateModified || null),
      partnersPublic: false,
      partnerKit: 'npm run publication:partner-kit writes /ops. It is not a public page.',
      crawlerFiles: Object.fromEntries(
        CRAWLER_FILES.map((name) => [name, fileStat(path.join(publicDir, name))]),
      ),
    },
    surfaces: [
      { path: '/', purpose: 'Continuity landing and quiz entry', indexable: true },
      { path: '/quiz', purpose: 'Free continuity check', indexable: true },
      { path: '/plan', purpose: 'Two-day strength starter plan', indexable: true },
      { path: '/offerings', purpose: 'What is live vs intended', indexable: true },
      { path: '/terms', purpose: 'Terms of service', indexable: true },
      { path: '/contact', purpose: 'Postal address and support email', indexable: true },
      { path: '/publication', purpose: 'Issue home', indexable: true },
      ...HIDDEN_LANDINGS.map((item) => ({
        path: item.path,
        purpose: `${item.label}. robots Disallow.`,
        indexable: false,
      })),
      { path: '/publication/partners', purpose: '301 to /publication. Playbook stays off the public site.', indexable: false },
      { path: '/admin', purpose: 'This operator desk', indexable: false },
    ],
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function pill(label, kind = 'ok') {
  return `<span class="pill ${kind}">${escapeHtml(label)}</span>`
}

function table(headers, rows) {
  if (!rows.length) return '<p class="empty">Nothing here yet.</p>'
  return `<div class="table-wrap"><table><thead><tr>${headers
    .map((header) => `<th>${escapeHtml(header)}</th>`)
    .join('')}</tr></thead><tbody>${rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
    .join('')}</tbody></table></div>`
}

function shell(title, body) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow,noarchive" />
    <title>${escapeHtml(title)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,520&family=Manrope:wght@400;600;700&display=swap" rel="stylesheet" />
    <style>
      :root { --forest:#1e3a2f; --ink:#142620; --body:#44403c; --muted:#78716c; --beige:#f6f1e8; --paper:#fffdf8; --line:rgba(30,58,47,.12); --sage:#3f5b3a; --bronze:#a08260; }
      * { box-sizing: border-box; }
      body { margin: 0; background: var(--beige); color: var(--ink); font-family: Manrope, system-ui, sans-serif; line-height: 1.5; }
      a { color: var(--sage); }
      header, main { width: min(1120px, calc(100% - 2rem)); margin: 0 auto; }
      header { display: flex; justify-content: space-between; gap: 1rem; align-items: end; padding: 1.6rem 0 1rem; border-bottom: 1px solid var(--line); }
      header h1, h2 { font-family: Fraunces, Georgia, serif; font-weight: 520; letter-spacing: -.03em; }
      header h1 { margin: .2rem 0 0; font-size: 2rem; }
      .kicker { margin: 0; font-size: .72rem; letter-spacing: .16em; text-transform: uppercase; color: var(--bronze); font-weight: 700; }
      .muted { color: var(--muted); }
      .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: .8rem; margin: 1.2rem 0; }
      .card, section { background: var(--paper); border: 1px solid var(--line); border-radius: 1rem; }
      .card { padding: 1rem 1.1rem; }
      .card strong { display: block; font-size: 1.8rem; font-family: Fraunces, Georgia, serif; }
      .card span { color: var(--muted); font-size: .85rem; }
      section { padding: 1.2rem 1.3rem 1.4rem; margin: 1rem 0; }
      section h2 { margin: 0 0 .6rem; font-size: 1.45rem; }
      .pills { display: flex; flex-wrap: wrap; gap: .4rem; margin: .6rem 0 0; }
      .pill { display: inline-block; padding: .2rem .55rem; border-radius: 999px; font-size: .75rem; font-weight: 700; }
      .pill.ok { background: rgba(63,91,58,.12); color: var(--forest); }
      .pill.warn { background: rgba(160,130,96,.16); color: #6b5338; }
      .pill.bad { background: rgba(216,90,67,.12); color: #9f2743; }
      .table-wrap { overflow: auto; }
      table { width: 100%; border-collapse: collapse; font-size: .92rem; }
      th, td { text-align: left; padding: .45rem .4rem; border-bottom: 1px solid var(--line); vertical-align: top; }
      th { color: var(--muted); font-size: .75rem; letter-spacing: .04em; text-transform: uppercase; }
      .empty, .note { color: var(--body); }
      .actions { display: flex; gap: .6rem; align-items: center; }
      button, .btn { min-height: 2.4rem; padding: .5rem 1rem; border: 0; border-radius: .7rem; background: var(--forest); color: #fff; font: inherit; font-weight: 700; cursor: pointer; text-decoration: none; }
      input, select, textarea { width: 100%; min-height: 2.8rem; padding: .6rem .8rem; border: 1px solid var(--line); border-radius: .7rem; font: inherit; background: #fff; }
      textarea { min-height: 8rem; }
      form { display: grid; gap: .8rem; max-width: 24rem; }
      .article-form, .filter-form { max-width: 52rem; }
      .filter-form { grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr)); align-items: end; margin-bottom: 1rem; }
      .filter-form button, .filter-form .btn { width: auto; justify-self: start; display: inline-flex; align-items: center; justify-content: center; }
      .admin-nav { margin: .4rem 0 0; }
      .login { max-width: 28rem; margin: 4rem auto; padding: 1.6rem; background: var(--paper); border: 1px solid var(--line); border-radius: 1rem; }
      @media (max-width: 900px) { .grid { grid-template-columns: 1fr 1fr; } }
    </style>
  </head>
  <body>${body}</body>
</html>`
}

export function renderLoginPage(error) {
  return shell(
    'Peptis operator desk',
    `<main class="login">
      <p class="kicker">Operator desk</p>
      <h1>Sign in</h1>
      <p class="muted">This page is not public. Use the ADMIN_TOKEN from the server environment.</p>
      ${error ? `<p class="pill bad">${escapeHtml(error)}</p>` : ''}
      <form method="post" action="/admin/session">
        <label>Access token<input type="password" name="token" autocomplete="current-password" required /></label>
        <button type="submit">Open the desk</button>
      </form>
    </main>`,
  )
}

export function renderAdminPage(snapshot) {
  const ready = snapshot.readiness
  const demand = snapshot.demand
  const pub = snapshot.publication
  return shell(
    'Peptis operator desk',
    `<header>
      <div>
        <p class="kicker">Operator desk</p>
        <h1>What is live right now</h1>
        <p class="muted">Generated ${escapeHtml(snapshot.generatedAt)}. Emails stay on this desk. The public site does not link here.</p>
        <p class="admin-nav"><a href="/admin">Overview</a> · <a href="/admin/articles">Articles</a> · <a href="/admin/people">Quiz users</a></p>
      </div>
      <div class="actions">
        <a class="btn" href="/admin/people">Quiz users</a>
        <a class="btn" href="/admin">Refresh</a>
        <form method="post" action="/admin/logout"><button type="submit">Sign out</button></form>
      </div>
    </header>
    <main>
      <div class="grid">
        <div class="card"><strong>${demand.reservations.active}</strong><span>Active summaries</span></div>
        <div class="card"><strong>${demand.leads.uniqueEmails}</strong><span>Unique lead emails</span></div>
        <div class="card"><strong>${demand.quiz.progressEvents}</strong><span>Quiz progress events</span></div>
        <div class="card"><strong>${pub.essays.length}</strong><span>Publication essays</span></div>
      </div>
      <section>
        <h2>Offer and readiness</h2>
        <p>${escapeHtml(snapshot.offer.liveToday)}</p>
        <p>${escapeHtml(snapshot.offer.leanMassBox)}</p>
        <p>${escapeHtml(snapshot.offer.clinical)}</p>
        <div class="pills">
          ${pill(snapshot.offer.boxForSale ? 'Box for sale' : 'Box not for sale', snapshot.offer.boxForSale ? 'bad' : 'ok')}
          ${pill(snapshot.offer.clinicalProgrammeForSale ? 'Clinical live' : 'No clinical programme', snapshot.offer.clinicalProgrammeForSale ? 'bad' : 'ok')}
          ${pill(ready.resendConfigured ? 'Resend key present' : 'Resend key missing', ready.resendConfigured ? 'ok' : 'warn')}
          ${pill(ready.reservationFromSet ? 'From-address set' : 'Default from-address', ready.reservationFromSet ? 'ok' : 'warn')}
          ${pill(ready.opsEmailOverride ? 'Ops email override set' : 'Default ops inboxes', 'ok')}
          ${pill(ready.stripePublishableAtRuntime ? 'Stripe key in server env' : 'No Stripe key in server env', ready.stripePublishableAtRuntime ? 'warn' : 'ok')}
        </div>
        <p class="note">Public base: ${escapeHtml(ready.publicBaseUrl)}. Data file: ${escapeHtml(ready.dataPath)}.</p>
      </section>
      <section>
        <h2>Demand</h2>
        <p class="muted">${demand.reservations.total} summaries saved, ${demand.reservations.cancelled} cancelled, ${demand.reservations.upsellYes} asked about the box. ${demand.leads.guideEmails} starter-plan emails logged. ${demand.leads.opsNotices} ops notices logged.</p>
        <h3>Sources</h3>
        ${table(['Source', 'Count'], demand.sources.map((row) => [escapeHtml(row.key), String(row.count)]))}
        <h3>Quiz steps</h3>
        ${table(['Step', 'Events'], demand.quiz.byStep.map((row) => [escapeHtml(row.key), String(row.count)]))}
        <h3>Recent summaries</h3>
        ${table(
          ['When', 'Name', 'Email', 'State', 'Source', 'Box', 'Status'],
          demand.recentReservations.map((row) => [
            escapeHtml(row.createdAt || ''),
            escapeHtml(row.name),
            escapeHtml(row.email),
            escapeHtml(row.state || ''),
            escapeHtml(row.source),
            row.upsell ? 'asked' : 'no',
            row.cancelled ? pill('cancelled', 'warn') : pill('active', 'ok'),
          ]),
        )}
        <h3>Recent leads</h3>
        ${table(
          ['When', 'Name', 'Email', 'Source'],
          demand.recentLeads.map((row) => [
            escapeHtml(row.at || ''),
            escapeHtml(row.firstName),
            escapeHtml(row.email),
            escapeHtml(row.source),
          ]),
        )}
      </section>
      <section>
        <h2>Publication</h2>
        <p>${escapeHtml(pub.home?.title || 'Peptis Publication')}. Lastmod ${escapeHtml(pub.lastmod || 'unknown')}.</p>
        <p class="muted">${escapeHtml(pub.partnerKit)} /publication/partners stays 301.</p>
        <div class="pills">
          ${Object.entries(pub.crawlerFiles)
            .map(([name, info]) => pill(info.present ? name : `${name} missing`, info.present ? 'ok' : 'bad'))
            .join('')}
          ${pill(pub.partnersPublic ? 'Partners page public' : 'Partners page hidden', pub.partnersPublic ? 'bad' : 'ok')}
        </div>
        ${table(
          ['Path', 'Title', 'Modified', 'SEO head'],
          [...(pub.home ? [pub.home] : []), ...pub.desks, ...pub.essays].map((page) => [
            `<a href="${escapeHtml(page.path)}" target="_blank" rel="noreferrer">${escapeHtml(page.path)}</a>`,
            escapeHtml(page.title),
            escapeHtml(page.dateModified || ''),
            page.seoInjected === false ? pill('missing', 'warn') : pill('ready', 'ok'),
          ]),
        )}
      </section>
      <section>
        <h2>Public surfaces</h2>
        ${table(
          ['Path', 'Purpose', 'Index'],
          snapshot.surfaces.map((row) => [
            escapeHtml(row.path),
            escapeHtml(row.purpose),
            row.indexable ? pill('index', 'ok') : pill('noindex / hidden', 'warn'),
          ]),
        )}
      </section>
    </main>`,
  )
}

export function createAdminRouter(ctx) {
  const router = Router()
  const failures = new Map()

  function locked(ip) {
    const row = failures.get(ip)
    if (!row) return false
    if (Date.now() - row.at > 15 * 60 * 1000) {
      failures.delete(ip)
      return false
    }
    return row.count >= 10
  }

  function rememberFailure(ip) {
    const row = failures.get(ip) || { count: 0, at: Date.now() }
    row.count += 1
    row.at = Date.now()
    failures.set(ip, row)
  }

  router.use('/admin', (req, res, next) => {
    noStore(res)
    if (!adminEnabled()) return res.status(404).end()
    next()
  })
  router.use('/api/admin', (req, res, next) => {
    noStore(res)
    if (!adminEnabled()) return res.status(404).end()
    next()
  })

  router.get('/admin', (req, res) => {
    if (req.query.token && tokensEqual(String(req.query.token), adminToken())) {
      res.set('Set-Cookie', cookieHeader(adminToken()))
      return res.redirect(303, '/admin')
    }
    if (!isAuthorized(req)) {
      res.type('html').status(401).send(renderLoginPage())
      return
    }
    res.type('html').send(renderAdminPage(buildAdminSnapshot(ctx)))
  })

  router.post('/admin/session', (req, res) => {
    const ip = req.ip || 'unknown'
    if (locked(ip)) {
      res.type('html').status(429).send(renderLoginPage('Too many attempts. Wait and try again.'))
      return
    }
    const token = String(req.body?.token || '')
    if (!tokensEqual(token, adminToken())) {
      rememberFailure(ip)
      res.type('html').status(401).send(renderLoginPage('That token was not accepted.'))
      return
    }
    failures.delete(ip)
    res.set('Set-Cookie', cookieHeader(adminToken()))
    res.redirect(303, '/admin')
  })

  router.post('/admin/logout', (req, res) => {
    res.set('Set-Cookie', clearCookieHeader())
    res.redirect(303, '/admin')
  })

  router.get('/api/admin/snapshot', (req, res) => {
    if (!isAuthorized(req)) return res.status(401).json({ ok: false, error: 'unauthorized' })
    res.json({ ok: true, snapshot: buildAdminSnapshot(ctx) })
  })

  attachAdminOps(router, {
    ctx,
    isAuthorized,
    noStore,
    escapeHtml,
    shell,
    table,
    pill,
    sendMail: ctx.sendMail,
    logEvent: ctx.logEvent,
  })

  return router
}
