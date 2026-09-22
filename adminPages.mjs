import fs from 'node:fs'
import { buildPeople, createContentStore } from './contentStore.mjs'

function csvEscape(value) {
  const text = String(value ?? '')
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
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

function loadPeople(ctx) {
  const progress = readJsonl(ctx.progressFile)
  const reservations = readJsonl(ctx.eventsFile).filter((event) => event.type === 'reservation')
  return buildPeople({ progress, reservations })
}

function filterPeople(ctx, query) {
  let people = loadPeople(ctx)
  const source = String(query.source || '').trim().toLowerCase()
  const q = String(query.q || '').trim().toLowerCase()
  const state = String(query.state || '').trim().toUpperCase()
  if (source) people = people.filter((person) => String(person.source || '').toLowerCase().includes(source))
  if (state) people = people.filter((person) => String(person.state || '').toUpperCase() === state)
  if (query.box === 'yes') people = people.filter((person) => person.reserveBox)
  if (query.box === 'no') people = people.filter((person) => !person.reserveBox)
  if (query.answers === 'yes') people = people.filter((person) => Array.isArray(person.responses) && person.responses.length)
  if (query.marketing === 'yes') people = people.filter((person) => person.marketingConsent)
  if (query.marketing === 'no') people = people.filter((person) => !person.marketingConsent)
  if (query.health === 'yes') people = people.filter((person) => person.healthConsent)
  if (q) {
    people = people.filter((person) => {
      const hay = [
        person.email,
        person.firstName,
        person.source,
        person.state,
        ...(person.responses || []).flatMap((row) => [row.id, row.prompt, ...(row.labels || [])]),
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }
  return people
}

function queryString(query) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query || {})) {
    if (value) params.set(key, String(value))
  }
  return params.toString()
}

export function attachAdminOps(router, { ctx, isAuthorized, noStore, escapeHtml, shell, table, pill, sendMail, logEvent }) {
  const store = createContentStore(ctx)

  function requireAdmin(req, res) {
    noStore(res)
    if (!isAuthorized(req)) {
      res.redirect(303, '/admin')
      return false
    }
    return true
  }

  function nav() {
    return `<p class="admin-nav"><a href="/admin">Overview</a> · <a href="/admin/articles">Articles</a> · <a href="/admin/people">Quiz users</a> · <a href="/admin/articles/new">New article</a></p>`
  }

  router.get('/admin/articles', (req, res) => {
    if (!requireAdmin(req, res)) return
    const rows = store.listArticles().map((article) => [
      escapeHtml(article.slug),
      escapeHtml(article.title),
      escapeHtml(article.category),
      `<a href="/admin/articles/${escapeHtml(article.slug)}">Edit</a>`,
    ])
    res.type('html').send(
      shell(
        'Articles | Operator desk',
        `<header><div><p class="kicker">Operator desk</p><h1>Publication articles</h1>${nav()}</div></header><main><section>${table(
          ['Slug', 'Title', 'Desk', ''],
          rows,
        )}</section></main>`,
      ),
    )
  })

  function articleForm(article, error) {
    const sectionText = (article?.sections || [])
      .map((section) => `${section.heading}\n${(section.paragraphs || []).join('\n\n')}`)
      .join('\n---\n')
    return `<main><section>
      ${nav()}
      <h1>${article ? 'Edit article' : 'New article'}</h1>
      ${error ? `<p class="pill bad">${escapeHtml(error)}</p>` : ''}
      <form method="post" class="article-form">
        <label>Slug<input name="slug" value="${escapeHtml(article?.slug || '')}" ${article ? 'readonly' : ''} required /></label>
        <label>Title<input name="title" value="${escapeHtml(article?.title || '')}" required /></label>
        <label>Desk
          <select name="category">${store.CATEGORIES.map(
            (category) =>
              `<option${article?.category === category ? ' selected' : ''}>${escapeHtml(category)}</option>`,
          ).join('')}</select>
        </label>
        <label>Description<textarea name="description">${escapeHtml(article?.description || '')}</textarea></label>
        <label>Takeaway<textarea name="takeaway" required>${escapeHtml(article?.takeaway || '')}</textarea></label>
        <label>Minutes<input name="readingMinutes" type="number" min="2" value="${escapeHtml(
          String(article?.readingMinutes || 5),
        )}" /></label>
        <label>Sections (heading, then paragraphs, --- between sections)<textarea name="sectionText" rows="12">${escapeHtml(
          sectionText,
        )}</textarea></label>
        <label>Cannot tell us (one per line)<textarea name="cannotTellUs">${escapeHtml(
          (article?.cannotTellUs || []).join('\n'),
        )}</textarea></label>
        <label>Sources (one per line)<textarea name="sources">${escapeHtml((article?.sources || []).join('\n'))}</textarea></label>
        <button type="submit">Save article</button>
      </form>
      ${
        article
          ? `<form method="post" action="/admin/articles/${escapeHtml(article.slug)}/delete" onsubmit="return confirm('Delete this essay?')"><button type="submit">Delete</button></form>`
          : ''
      }
    </section></main>`
  }

  function parseForm(body) {
    const sections = String(body.sectionText || '')
      .split(/\n---\n/)
      .map((block) => {
        const [heading, ...rest] = block.split('\n')
        return { heading: heading?.trim(), body: rest.join('\n').trim() }
      })
    return { ...body, sections }
  }

  router.get('/admin/articles/new', (req, res) => {
    if (!requireAdmin(req, res)) return
    res.type('html').send(shell('New article | Operator desk', articleForm(null)))
  })

  router.post('/admin/articles/new', (req, res) => {
    if (!requireAdmin(req, res)) return
    const result = store.saveArticle(parseForm(req.body), true)
    if (result.error) {
      res.type('html').status(400).send(shell('New article | Operator desk', articleForm(parseForm(req.body), result.error)))
      return
    }
    res.redirect(303, '/admin/articles')
  })

  router.get('/admin/articles/:slug', (req, res) => {
    if (!requireAdmin(req, res)) return
    const article = store.getArticle(req.params.slug)
    if (!article) return res.status(404).send(shell('Missing', `${nav()}<p>Article not found.</p>`))
    res.type('html').send(shell(`${article.title} | Operator desk`, articleForm(article)))
  })

  router.post('/admin/articles/:slug', (req, res) => {
    if (!requireAdmin(req, res)) return
    const result = store.saveArticle({ ...parseForm(req.body), slug: req.params.slug }, false)
    if (result.error) {
      res.type('html').status(400).send(shell('Edit article', articleForm({ ...parseForm(req.body), slug: req.params.slug }, result.error)))
      return
    }
    res.redirect(303, '/admin/articles')
  })

  router.post('/admin/articles/:slug/delete', (req, res) => {
    if (!requireAdmin(req, res)) return
    store.deleteArticle(req.params.slug)
    res.redirect(303, '/admin/articles')
  })

  function peopleFilters(query) {
    return `<form method="get" class="filter-form">
      <label>Source<input name="source" value="${escapeHtml(query.source || '')}" /></label>
      <label>State<input name="state" maxlength="2" value="${escapeHtml(query.state || '')}" /></label>
      <label>Box<select name="box">
        <option value="">Any</option>
        <option value="yes"${query.box === 'yes' ? ' selected' : ''}>Reserved</option>
        <option value="no"${query.box === 'no' ? ' selected' : ''}>No box</option>
      </select></label>
      <label>Answers<select name="answers">
        <option value="">Any</option>
        <option value="yes"${query.answers === 'yes' ? ' selected' : ''}>Has responses</option>
      </select></label>
      <label>Marketing<select name="marketing">
        <option value="">Any</option>
        <option value="yes"${query.marketing === 'yes' ? ' selected' : ''}>Opted in</option>
        <option value="no"${query.marketing === 'no' ? ' selected' : ''}>No marketing</option>
      </select></label>
      <label>Health<select name="health">
        <option value="">Any</option>
        <option value="yes"${query.health === 'yes' ? ' selected' : ''}>Consented</option>
      </select></label>
      <label>Contains<input name="q" value="${escapeHtml(query.q || '')}" /></label>
      <button type="submit">Filter</button>
      <a class="btn" href="/admin/people.csv?${queryString(query)}">Export CSV</a>
    </form>`
  }

  router.get('/admin/people', (req, res) => {
    if (!requireAdmin(req, res)) return
    const people = filterPeople(ctx, req.query)
    const rows = people.map((person) => [
      escapeHtml(person.lastAt || ''),
      escapeHtml(person.firstName),
      `<a href="/admin/people/${encodeURIComponent(person.email)}">${escapeHtml(person.email)}</a>`,
      escapeHtml(person.source),
      escapeHtml(person.state || ''),
      person.reserveBox ? pill('box', 'ok') : '',
      person.marketingConsent ? pill('email ok', 'ok') : pill('no marketing', 'warn'),
      escapeHtml(person.responses?.map((row) => row.labels.join('; ')).join(' / ') || ''),
    ])
    res.type('html').send(
      shell(
        'Quiz users | Operator desk',
        `<header><div><p class="kicker">Operator desk</p><h1>Quiz users</h1>${nav()}<p class="muted">${people.length} people in this filter.</p></div></header>
        <main>
          <section>
            ${peopleFilters(req.query)}
            ${table(['When', 'Name', 'Email', 'Source', 'State', 'Box', 'Email ok', 'Answers'], rows)}
          </section>
          <section>
            <h2>Outreach</h2>
            <p class="muted">Sends only to people in the current filter who opted into marketing email. Cap 50 per send.</p>
            <form method="post" action="/admin/outreach" class="article-form">
              <input type="hidden" name="source" value="${escapeHtml(req.query.source || '')}" />
              <input type="hidden" name="box" value="${escapeHtml(req.query.box || '')}" />
              <input type="hidden" name="answers" value="${escapeHtml(req.query.answers || '')}" />
              <input type="hidden" name="marketing" value="${escapeHtml(req.query.marketing || '')}" />
              <input type="hidden" name="health" value="${escapeHtml(req.query.health || '')}" />
              <input type="hidden" name="state" value="${escapeHtml(req.query.state || '')}" />
              <input type="hidden" name="q" value="${escapeHtml(req.query.q || '')}" />
              <label>Subject<input name="subject" required /></label>
              <label>Message<textarea name="text" rows="6" required></textarea></label>
              <button type="submit">Email this filter</button>
            </form>
          </section>
        </main>`,
      ),
    )
  })

  router.get('/admin/people.csv', (req, res) => {
    if (!requireAdmin(req, res)) return
    const people = filterPeople(ctx, req.query)
    const header = ['email', 'firstName', 'source', 'state', 'reserveBox', 'marketingConsent', 'healthConsent', 'lastAt', 'answers']
    const lines = [
      header.join(','),
      ...people.map((person) =>
        [
          person.email,
          person.firstName,
          person.source,
          person.state || '',
          person.reserveBox,
          person.marketingConsent,
          person.healthConsent,
          person.lastAt,
          (person.responses || []).map((row) => `${row.id}:${row.labels.join('|')}`).join(' '),
        ]
          .map(csvEscape)
          .join(','),
      ),
    ]
    res.set('Content-Type', 'text/csv')
    res.set('Content-Disposition', 'attachment; filename="peptis-quiz-users.csv"')
    res.send(lines.join('\n'))
  })

  router.get('/admin/people/:email', (req, res) => {
    if (!requireAdmin(req, res)) return
    const email = decodeURIComponent(req.params.email).toLowerCase()
    const person = loadPeople(ctx).find((row) => row.email === email)
    if (!person) return res.status(404).send(shell('Missing', `${nav()}<p>Person not found.</p>`))
    const answers = (person.responses || []).map((row) => [
      escapeHtml(row.id),
      escapeHtml(row.prompt || ''),
      escapeHtml((row.labels || []).join('; ')),
    ])
    res.type('html').send(
      shell(
        `${person.email} | Operator desk`,
        `<header><div><p class="kicker">Operator desk</p><h1>${escapeHtml(person.firstName || person.email)}</h1>${nav()}</div></header>
        <main>
          <section>
            <p>${escapeHtml(person.email)}</p>
            <p class="muted">Source ${escapeHtml(person.source || 'direct')}. State ${escapeHtml(person.state || 'n/a')}. Last ${escapeHtml(person.lastAt || '')}.</p>
            <div class="pills">
              ${person.reserveBox ? pill('box reserved', 'ok') : pill('no box', 'warn')}
              ${person.marketingConsent ? pill('marketing ok', 'ok') : pill('no marketing', 'warn')}
              ${person.healthConsent ? pill('health consent', 'ok') : pill('no health store', 'warn')}
            </div>
            <h2>Quiz responses</h2>
            ${
              person.healthConsent
                ? table(['Id', 'Prompt', 'Answers'], answers)
                : '<p class="muted">Answers were not stored because health-data consent was not given.</p>'
            }
          </section>
        </main>`,
      ),
    )
  })

  router.post('/admin/outreach', async (req, res) => {
    if (!requireAdmin(req, res)) return
    const people = filterPeople(ctx, req.body).filter((person) => person.email && (person.marketingConsent || (req.body.box === 'yes' && person.boxUpdatesConsent)))
    const subject = String(req.body.subject || '').slice(0, 140)
    const text = String(req.body.text || '').slice(0, 5000)
    let sent = 0
    for (const person of people.slice(0, 50)) {
      const result = await sendMail({
        to: [person.email],
        subject,
        text: `Hi ${person.firstName || 'there'},\n\n${text}\n`,
      })
      if (result.sent) sent += 1
    }
    logEvent?.(
      {
        type: 'outreach',
        subject,
        attempted: Math.min(people.length, 50),
        sent,
        at: new Date().toISOString(),
      },
      ctx.progressFile,
    )
    res.type('html').send(
      shell(
        'Outreach | Operator desk',
        `<main><section>${nav()}<h1>Outreach sent</h1><p>Attempted ${Math.min(
          people.length,
          50,
        )} marketing-opt-in addresses. ${sent} accepted by email.</p><p><a href="/admin/people">Back to users</a></p></section></main>`,
      ),
    )
  })
}
