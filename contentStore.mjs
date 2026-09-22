import fs from 'node:fs'
import path from 'node:path'

const CATEGORIES = [
  'Muscle and body composition',
  'Protein and nutrition',
  'Training',
  'Skin and appearance',
  'Maintenance',
]

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`)
}

function emptyStore() {
  return { extras: [], overrides: {}, deleted: [] }
}

export function createContentStore({ dataDir, publicDir, distDir }) {
  const storeFile = path.join(dataDir, 'articles.json')
  const seedFile = [
    path.join(publicDir, 'publication-articles.json'),
    path.join(distDir, 'publication-articles.json'),
  ].find((file) => fs.existsSync(file))

  function loadStore() {
    const raw = readJson(storeFile, emptyStore())
    return {
      extras: Array.isArray(raw.extras) ? raw.extras : [],
      overrides: raw.overrides && typeof raw.overrides === 'object' ? raw.overrides : {},
      deleted: Array.isArray(raw.deleted) ? raw.deleted : [],
    }
  }

  function seedArticles() {
    return Array.isArray(readJson(seedFile, [])) ? readJson(seedFile, []) : []
  }

  function listArticles() {
    const store = loadStore()
    const bySlug = new Map()
    for (const article of seedArticles()) {
      if (!article?.slug || store.deleted.includes(article.slug)) continue
      bySlug.set(article.slug, { ...article, ...(store.overrides[article.slug] || {}) })
    }
    for (const article of store.extras) {
      if (!article?.slug || store.deleted.includes(article.slug)) continue
      bySlug.set(article.slug, article)
    }
    return [...bySlug.values()]
  }

  function getArticle(slug) {
    return listArticles().find((article) => article.slug === slug) || null
  }

  function normalize(input) {
    const slug = String(input.slug || '')
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-|-$/g, '')
    const category = CATEGORIES.includes(input.category) ? input.category : CATEGORIES[0]
    const sections = Array.isArray(input.sections)
      ? input.sections
          .map((section) => ({
            heading: String(section.heading || '').trim(),
            paragraphs: String(section.body || section.paragraphs?.join('\n\n') || '')
              .split(/\n\n+/)
              .map((p) => p.trim())
              .filter(Boolean),
          }))
          .filter((section) => section.heading && section.paragraphs.length)
      : []
    const cannotTellUs = String(input.cannotTellUs || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    const sources = String(input.sources || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    if (!slug || !input.title || !input.takeaway || sections.length < 1 || cannotTellUs.length < 1 || sources.length < 2) {
      return { error: 'Need a slug, title, takeaway, one section, limits and two sources.' }
    }
    return {
      article: {
        slug,
        category,
        title: String(input.title).trim(),
        description: String(input.description || input.takeaway).trim(),
        takeaway: String(input.takeaway).trim(),
        readingMinutes: Math.max(2, Number(input.readingMinutes) || 5),
        sections,
        cannotTellUs,
        sources,
      },
    }
  }

  function saveArticle(input, isNew) {
    const parsed = normalize(input)
    if (parsed.error) return parsed
    const store = loadStore()
    store.deleted = store.deleted.filter((slug) => slug !== parsed.article.slug)
    const seedHas = seedArticles().some((article) => article.slug === parsed.article.slug)
    if (isNew && (seedHas || store.extras.some((article) => article.slug === parsed.article.slug))) {
      return { error: 'That slug already exists.' }
    }
    if (seedHas) store.overrides[parsed.article.slug] = parsed.article
    else {
      store.extras = store.extras.filter((article) => article.slug !== parsed.article.slug)
      store.extras.push(parsed.article)
    }
    writeJson(storeFile, store)
    return { article: parsed.article }
  }

  function deleteArticle(slug) {
    const store = loadStore()
    store.extras = store.extras.filter((article) => article.slug !== slug)
    delete store.overrides[slug]
    if (!store.deleted.includes(slug)) store.deleted.push(slug)
    writeJson(storeFile, store)
    return { ok: true }
  }

  return { listArticles, getArticle, saveArticle, deleteArticle, CATEGORIES }
}

export function buildPeople({ progress, reservations }) {
  const byEmail = new Map()
  for (const event of progress) {
    if (!event.email) continue
    const current = byEmail.get(event.email) || {
      email: event.email,
      firstName: '',
      source: event.source || 'direct',
      healthConsent: false,
      marketingConsent: false,
      reserveBox: false,
      responses: [],
      steps: [],
      lastAt: event.at,
    }
    if (event.firstName) current.firstName = event.firstName
    if (event.source) current.source = event.source
    if (event.healthConsent) current.healthConsent = true
    if (event.marketingConsent && event.marketingScope !== 'box_updates') current.marketingConsent = true
    if (event.marketingScope === 'box_updates' && event.marketingConsent) current.boxUpdatesConsent = true
    if (event.reserveBox) current.reserveBox = true
    if (Array.isArray(event.responses) && event.responses.length) current.responses = event.responses
    if (event.step) current.steps.push(event.step)
    current.lastAt = event.at || current.lastAt
    if (event.type === 'guide_email') current.guideEmail = true
    byEmail.set(event.email, current)
  }
  for (const row of reservations) {
    if (!row.email) continue
    const current = byEmail.get(row.email) || {
      email: row.email,
      firstName: row.firstName || '',
      source: row.source || 'direct',
      healthConsent: false,
      marketingConsent: false,
      reserveBox: Boolean(row.upsell),
      responses: [],
      steps: [],
      lastAt: row.createdAt,
    }
    current.firstName = row.firstName || current.firstName
    current.state = row.state
    if (row.marketingConsent) current.marketingConsent = true
    if (row.healthConsent) current.healthConsent = true
    if (row.boxUpdatesConsent) current.boxUpdatesConsent = true
    current.reserveBox = current.reserveBox || Boolean(row.upsell)
    current.reservationId = row.id
    byEmail.set(row.email, current)
  }
  // A previous unsubscribe wins until a separate verified re-subscription flow exists.
  for (const event of progress) {
    if (event.type === 'unsubscribe' && byEmail.has(event.email)) {
      byEmail.get(event.email).marketingConsent = false
      byEmail.get(event.email).reserveBox = false
      byEmail.get(event.email).boxUpdatesConsent = false
    }
  }
  return [...byEmail.values()].sort((a, b) => String(b.lastAt || '').localeCompare(String(a.lastAt || '')))
}
