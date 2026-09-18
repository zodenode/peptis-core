/**
 * Article SEO/AEO QA.
 * `npm run publication:qa` fails the build on hard errors.
 * `npm run publication:qa:accept` writes safe title/description overlays only.
 * It never rewrites body copy, takeaways, sources or medical claims in blog.ts.
 */
import { articles, type Article } from '../data/blog'
import { publicationSeo, type ArticleSeoOverlay } from '../data/publicationSeo'
import { articleFaqs, articleSeoDescription, articleSeoTitle, clipDescription, clipSeoDescription } from './publicationDiscoverability'

export type QaSeverity = 'error' | 'warn' | 'fix'

export type QaFinding = {
  slug: string
  rule: string
  severity: QaSeverity
  message: string
  path?: string
  current?: string
  proposed?: string
  autoSafe: boolean
}

const BANNED = [
  { re: /40%\s*muscle/i, rule: 'no-40-percent-muscle', message: 'Never say that up to 40% of lost weight is muscle.' },
  { re: /\u2014/, rule: 'no-em-dash', message: 'Do not use decorative em dashes in customer copy.' },
  { re: /\bjourney\b/i, rule: 'no-journey', message: 'Avoid slogan language such as journey.' },
  { re: /\bunlock\b/i, rule: 'no-unlock', message: 'Avoid slogan language such as unlock.' },
  { re: /\brevolutionary\b/i, rule: 'no-revolutionary', message: 'Avoid slogan language such as revolutionary.' },
  { re: /treat(?:s|ment)? (?:GLP-1|medication) side effects/i, rule: 'no-side-effect-treatment', message: 'Supplements do not treat GLP-1 medication side effects.' },
]

function articleText(article: Article): string {
  return [
    article.title,
    article.description,
    article.takeaway,
    ...article.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]),
    ...article.cannotTellUs,
    ...article.sources,
  ].join('\n')
}

export function auditArticle(article: Article): QaFinding[] {
  const findings: QaFinding[] = []
  const seoTitle = articleSeoTitle(article)
  const seoDescription = articleSeoDescription(article)
  const overlay = publicationSeo[article.slug]
  const text = articleText(article)

  if (!article.takeaway.trim()) {
    findings.push({
      slug: article.slug,
      rule: 'takeaway-required',
      severity: 'error',
      message: 'AEO needs a one-sentence key answer. Add a takeaway.',
      autoSafe: false,
    })
  }
  if (article.sources.length < 2) {
    findings.push({
      slug: article.slug,
      rule: 'sources-required',
      severity: 'error',
      message: 'Cite at least two original sources.',
      autoSafe: false,
    })
  }
  if (article.cannotTellUs.length < 1) {
    findings.push({
      slug: article.slug,
      rule: 'limits-required',
      severity: 'error',
      message: 'AEO and evidence review need a cannot-tell-us block.',
      autoSafe: false,
    })
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) {
    findings.push({
      slug: article.slug,
      rule: 'slug-kebab',
      severity: 'error',
      message: 'Use a lowercase kebab-case slug.',
      autoSafe: false,
    })
  }

  if (seoTitle.length > 60) {
    findings.push({
      slug: article.slug,
      rule: 'seo-title-length',
      severity: overlay ? 'warn' : 'fix',
      message: `SEO title is ${seoTitle.length} characters. Keep it at 60 or under.`,
      path: 'seoTitle',
      current: seoTitle,
      proposed: clipDescription(seoTitle, 60).replace(/\.$/, ''),
      autoSafe: true,
    })
  }
  if (seoTitle.length < 20) {
    findings.push({
      slug: article.slug,
      rule: 'seo-title-short',
      severity: 'warn',
      message: 'SEO title is short. A clear question usually performs better in answer engines.',
      current: seoTitle,
      autoSafe: false,
    })
  }
  if (seoDescription.length > 160) {
    findings.push({
      slug: article.slug,
      rule: 'seo-description-length',
      severity: 'fix',
      message: `SEO description is ${seoDescription.length} characters. Keep it at 160 or under.`,
      path: 'seoDescription',
      current: seoDescription,
      proposed: clipSeoDescription(seoDescription, 155),
      autoSafe: true,
    })
  }
  if (seoDescription.length < 70) {
    findings.push({
      slug: article.slug,
      rule: 'seo-description-short',
      severity: 'warn',
      message: 'SEO description is short for search snippets.',
      current: seoDescription,
      autoSafe: false,
    })
  }
  if (!overlay) {
    findings.push({
      slug: article.slug,
      rule: 'seo-overlay-missing',
      severity: 'fix',
      message: 'No accepted SEO overlay yet. A safe title and description can be written from the essay.',
      path: 'overlay',
      proposed: JSON.stringify({
        seoTitle: clipDescription(article.title, 60).replace(/\.$/, ''),
        seoDescription: clipSeoDescription(`${article.description} Education only.`, 155),
      }),
      autoSafe: true,
    })
  }
  if (!article.title.includes('?') && !seoTitle.includes('?')) {
    findings.push({
      slug: article.slug,
      rule: 'aeo-question-title',
      severity: 'warn',
      message: 'Answer engines prefer a question in the title when the essay answers one.',
      autoSafe: false,
    })
  }
  if (articleFaqs(article).length < 2) {
    findings.push({
      slug: article.slug,
      rule: 'aeo-faq',
      severity: 'error',
      message: 'Need at least two FAQ pairs derived from takeaway and limits.',
      autoSafe: false,
    })
  }
  const overlayText = `${overlay?.seoTitle ?? ''} ${overlay?.seoDescription ?? ''}`
  if (!/education only|not medical advice/i.test(`${seoDescription} ${article.takeaway}`)) {
    findings.push({
      slug: article.slug,
      rule: 'education-notice',
      severity: 'fix',
      message: 'SEO description should say this is education only.',
      path: 'seoDescription',
      current: seoDescription,
      proposed: clipSeoDescription(`${seoDescription.replace(/\.$/, '')}. Education only.`, 155),
      autoSafe: true,
    })
  }

  for (const banned of BANNED) {
    if (banned.re.test(`${text}\n${overlayText}`)) {
      findings.push({
        slug: article.slug,
        rule: banned.rule,
        severity: 'error',
        message: banned.message,
        autoSafe: false,
      })
    }
  }

  if ((overlay?.partnerQueries?.length ?? 0) < 2) {
    findings.push({
      slug: article.slug,
      rule: 'partner-queries',
      severity: 'warn',
      message: 'Add at least two partner search questions so other sites can host the query and cite this essay.',
      autoSafe: false,
    })
  }

  if (article.takeaway.length > 400) {
    findings.push({
      slug: article.slug,
      rule: 'aeo-takeaway-length',
      severity: 'warn',
      message: 'Keep the speakable key answer under 400 characters.',
      current: article.takeaway,
      autoSafe: false,
    })
  }

  return findings
}

export function auditPublication() {
  const findings = articles.flatMap(auditArticle)
  const titles = new Map<string, string[]>()
  for (const article of articles) {
    const key = articleSeoTitle(article).toLowerCase()
    titles.set(key, [...(titles.get(key) ?? []), article.slug])
  }
  for (const [title, slugs] of titles) {
    if (slugs.length > 1) {
      for (const slug of slugs) {
        findings.push({
          slug,
          rule: 'unique-seo-title',
          severity: 'error',
          message: `SEO title "${title}" is used more than once.`,
          autoSafe: false,
        })
      }
    }
  }
  const descriptions = new Map<string, string[]>()
  for (const article of articles) {
    const key = articleSeoDescription(article).toLowerCase()
    descriptions.set(key, [...(descriptions.get(key) ?? []), article.slug])
  }
  for (const [description, slugs] of descriptions) {
    if (slugs.length > 1) {
      for (const slug of slugs) {
        findings.push({
          slug,
          rule: 'unique-seo-description',
          severity: 'error',
          message: `SEO description "${description.slice(0, 48)}" is used more than once.`,
          autoSafe: false,
        })
      }
    }
  }
  return {
    findings,
    errors: findings.filter((item) => item.severity === 'error'),
    fixes: findings.filter((item) => item.autoSafe),
    warnings: findings.filter((item) => item.severity === 'warn'),
  }
}

export function acceptedOverlays(findings: QaFinding[]): Record<string, ArticleSeoOverlay> {
  const next = { ...publicationSeo }
  for (const finding of findings) {
    if (!finding.autoSafe || !finding.proposed) continue
    const current = next[finding.slug] ?? {
      seoTitle: articleSeoTitle(articles.find((article) => article.slug === finding.slug)!),
      seoDescription: articleSeoDescription(articles.find((article) => article.slug === finding.slug)!),
    }
    if (finding.path === 'seoTitle') current.seoTitle = finding.proposed
    if (finding.path === 'seoDescription') current.seoDescription = finding.proposed
    if (finding.path === 'overlay') {
      next[finding.slug] = JSON.parse(finding.proposed) as ArticleSeoOverlay
      continue
    }
    next[finding.slug] = current
  }
  return next
}

export function renderOverlayFile(overlays: Record<string, ArticleSeoOverlay>): string {
  const entries = articles
    .filter((article) => overlays[article.slug])
    .map((article) => {
      const overlay = overlays[article.slug]
      const queries = overlay.partnerQueries?.length
        ? `\n    partnerQueries: ${JSON.stringify(overlay.partnerQueries, null, 6).replace(/\n/g, '\n    ')},`
        : ''
      return `  '${article.slug}': {
    seoTitle: ${JSON.stringify(overlay.seoTitle)},
    seoDescription:
      ${JSON.stringify(overlay.seoDescription)},${queries}
  },`
    })
    .join('\n')
  return `/** Accepted SEO and AEO overlays. Body copy stays in blog.ts. QA --accept writes here. */
export type ArticleSeoOverlay = {
  seoTitle: string
  seoDescription: string
  partnerQueries?: string[]
}

export const publicationSeo: Record<string, ArticleSeoOverlay> = {
${entries}
}
`
}
