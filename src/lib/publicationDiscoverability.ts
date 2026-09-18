import type { Article } from '../data/blog'
import { articles } from '../data/blog'
import {
  articlePath,
  articlesInCategory,
  categoryForArticle,
  categoryPath,
  findCategory,
  findPublicationArticle,
  PUBLICATION_NAME,
  PUBLICATION_REVIEW_DATE,
  publicationCategories,
  type PublicationCategory,
} from '../data/publication'
import { publicationSeo } from '../data/publicationSeo'
import { absoluteUrl, SITE_LEGAL_NAME, SITE_LOGO, SITE_NAME, SITE_ORIGIN } from './site'

export type FaqItem = {
  q: string
  a: string
}

export type DiscoverabilityPage = {
  path: string
  title: string
  description: string
  type: 'website' | 'article'
  image: string
  imageAlt: string
  dateModified: string
}

const REVIEW_ISO = '2026-08-21'

export const PARTNERS_PATH = '/publication/partners'

export function articleFaqs(article: Article): FaqItem[] {
  const question = article.title.includes('?')
    ? `${article.title.split('?')[0]}?`
    : `What should a reader know about ${article.category.toLowerCase()}?`
  return [
    { q: question, a: article.takeaway },
    {
      q: 'What can this evidence not tell us?',
      a: article.cannotTellUs.join(' '),
    },
    {
      q: 'Is this medical advice?',
      a: 'No. Peptis Publication essays are education from original trials and official labels. They are not medical advice and do not describe Peptis product results. Talk with your current clinician before changing medication, diet, supplements or exercise.',
    },
  ]
}

export function articleSeoTitle(article: Article): string {
  return publicationSeo[article.slug]?.seoTitle ?? article.title
}

export function articleSeoDescription(article: Article): string {
  return publicationSeo[article.slug]?.seoDescription ?? clipDescription(article.description)
}

export function clipDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const sliced = clean.slice(0, max - 1)
  const lastSpace = sliced.lastIndexOf(' ')
  return `${sliced.slice(0, lastSpace > 80 ? lastSpace : max - 1).trimEnd()}.`
}

export function clipSeoDescription(text: string, max = 155): string {
  const notice = ' Education only.'
  const without = text.replace(/\s*Education only\.?$/i, '').replace(/\s+/g, ' ').trim()
  const budget = Math.max(80, max - notice.length)
  const clipped = without.length <= budget ? without : clipDescription(without, budget)
  const base = clipped.replace(/\.+$/, '')
  return `${base}.${notice}`
}

export function articleKeyAnswer(article: Article): string {
  return article.takeaway
}

export function articleJsonLd(article: Article) {
  const category = categoryForArticle(article)
  const path = articlePath(article)
  const url = absoluteUrl(path)
  const faqs = articleFaqs(article)
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: articleSeoDescription(article),
      image: [absoluteUrl(category.image)],
      datePublished: REVIEW_ISO,
      dateModified: REVIEW_ISO,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
        legalName: SITE_LEGAL_NAME,
        url: SITE_ORIGIN,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        legalName: SITE_LEGAL_NAME,
        url: SITE_ORIGIN,
        logo: { '@type': 'ImageObject', url: SITE_LOGO },
      },
      mainEntityOfPage: url,
      articleSection: category.label,
      about: article.category,
      abstract: article.takeaway,
      citation: article.sources,
      usageInfo: absoluteUrl(PARTNERS_PATH),
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.pub-answer', '.pub-takeaway'],
      },
      isAccessibleForFree: true,
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Publication', item: absoluteUrl('/publication') },
        { '@type': 'ListItem', position: 2, name: category.label, item: absoluteUrl(categoryPath(category.slug)) },
        { '@type': 'ListItem', position: 3, name: articleSeoTitle(article), item: url },
      ],
    },
  ]
}

export function categoryJsonLd(category: PublicationCategory, entries: Article[]) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${category.label} | ${PUBLICATION_NAME}`,
      description: category.dek,
      url: absoluteUrl(categoryPath(category.slug)),
      hasPart: entries.map((article) => ({
        '@type': 'Article',
        headline: article.title,
        url: absoluteUrl(articlePath(article)),
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Publication', item: absoluteUrl('/publication') },
        {
          '@type': 'ListItem',
          position: 2,
          name: category.label,
          item: absoluteUrl(categoryPath(category.slug)),
        },
      ],
    },
  ]
}

export function publicationHomeJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: PUBLICATION_NAME,
      url: absoluteUrl('/publication'),
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        legalName: SITE_LEGAL_NAME,
        url: SITE_ORIGIN,
        logo: { '@type': 'ImageObject', url: SITE_LOGO },
      },
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${PUBLICATION_NAME} essays`,
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(articlePath(article)),
        name: article.title,
      })),
    },
  ]
}

export function jsonLdForPath(pagePath: string): unknown[] {
  const normalized = pagePath.replace(/\/$/, '') || '/'
  if (normalized === '/publication') return publicationHomeJsonLd()
  if (normalized === PARTNERS_PATH) return partnersJsonLd()
  const parts = normalized.split('/').filter(Boolean)
  if (parts[0] !== 'publication') return []
  if (parts.length === 2) {
    const category = findCategory(parts[1])
    if (!category) return []
    return categoryJsonLd(category, articlesInCategory(category.slug))
  }
  if (parts.length === 3) {
    const article = findPublicationArticle(parts[2])
    if (!article) return []
    return articleJsonLd(article)
  }
  return []
}

export function partnersPageSeo(): DiscoverabilityPage {
  return {
    path: PARTNERS_PATH,
    title: `Cite or syndicate ${PUBLICATION_NAME}`,
    description:
      'Clinics, trainers and educators can quote Peptis Publication takeaways with attribution, limitations and a link to the canonical essay. Education only.',
    type: 'website',
    image: absoluteUrl(publicationCategories[0].image),
    imageAlt: publicationCategories[0].imageAlt,
    dateModified: REVIEW_ISO,
  }
}

export function partnersJsonLd() {
  const page = partnersPageSeo()
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      description: page.description,
      url: absoluteUrl(PARTNERS_PATH),
      isPartOf: { '@type': 'WebSite', name: PUBLICATION_NAME, url: absoluteUrl('/publication') },
      about: 'Citation and syndication of evidence essays',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Publication', item: absoluteUrl('/publication') },
        { '@type': 'ListItem', position: 2, name: 'Partners', item: absoluteUrl(PARTNERS_PATH) },
      ],
    },
  ]
}

export function articleCite(article: Article) {
  const url = absoluteUrl(articlePath(article))
  const title = articleSeoTitle(article)
  const takeaway = article.takeaway
  const attribution = `${title}. ${PUBLICATION_NAME}. Education only. ${url}`
  const embed = `<aside class="peptis-cite">
  <p><strong>${escapeHtml(title)}</strong></p>
  <p>${escapeHtml(takeaway)}</p>
  <p>Source: <a href="${url}">${PUBLICATION_NAME}</a>. Education only. Lean mass is not skeletal muscle. Individual results vary.</p>
</aside>`
  return { url, title, takeaway, attribution, embed }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function publicationCatalog(): DiscoverabilityPage[] {
  const home: DiscoverabilityPage = {
    path: '/publication',
    title: `${PUBLICATION_NAME}: evidence on GLP-1 body recomposition`,
    description:
      'Education from original trials on lean mass, protein, training, skin and maintenance during GLP-1 weight loss. Not medical advice.',
    type: 'website',
    image: absoluteUrl(publicationCategories[0].image),
    imageAlt: publicationCategories[0].imageAlt,
    dateModified: REVIEW_ISO,
  }
  const desks = publicationCategories.map((category) => ({
    path: categoryPath(category.slug),
    title: `${category.label} | ${PUBLICATION_NAME}`,
    description: clipDescription(category.dek),
    type: 'website' as const,
    image: absoluteUrl(category.image),
    imageAlt: category.imageAlt,
    dateModified: REVIEW_ISO,
  }))
  const essays = articles.map((article) => {
    const category = categoryForArticle(article)
    return {
      path: articlePath(article),
      title: `${articleSeoTitle(article)} | ${PUBLICATION_NAME}`,
      description: articleSeoDescription(article),
      type: 'article' as const,
      image: absoluteUrl(category.image),
      imageAlt: category.imageAlt,
      dateModified: REVIEW_ISO,
    }
  })
  return [home, partnersPageSeo(), ...desks, ...essays]
}

export function coreSitePages(): DiscoverabilityPage[] {
  const image = SITE_LOGO
  const imageAlt = 'Peptis wordmark'
  return [
    {
      path: '/',
      title: 'Peptis Core Continuity: free check and starter plan',
      description:
        'A free written summary of strength, protein and maintenance priorities, plus a starter training plan. No card. Not medical care today.',
      type: 'website',
      image,
      imageAlt,
      dateModified: REVIEW_ISO,
    },
    {
      path: '/quiz',
      title: 'Free GLP-1 continuity check | Peptis',
      description:
        'Eight questions. A written strength and maintenance summary. Not medical care today.',
      type: 'website',
      image,
      imageAlt,
      dateModified: REVIEW_ISO,
    },
    {
      path: '/offerings',
      title: 'What Peptis offers today | Peptis',
      description:
        'A free continuity check and starter plan. The Lean Mass nutrition box is the first paid product we intend to sell. It is not for sale yet.',
      type: 'website',
      image,
      imageAlt,
      dateModified: REVIEW_ISO,
    },
    {
      path: '/plan',
      title: 'Two-day strength starter plan | Peptis',
      description:
        'A beginner full-body structure for people losing weight. Education only. Not a medical exercise prescription.',
      type: 'website',
      image,
      imageAlt,
      dateModified: REVIEW_ISO,
    },
    {
      path: '/privacy',
      title: 'Privacy | Peptis',
      description: 'How Peptis handles personal information.',
      type: 'website',
      image,
      imageAlt,
      dateModified: REVIEW_ISO,
    },
    {
      path: '/health-data',
      title: 'Health data notice | Peptis',
      description: 'How Peptis treats health-related information collected in the continuity check.',
      type: 'website',
      image,
      imageAlt,
      dateModified: REVIEW_ISO,
    },
  ]
}

export function siteSitemapPages(): DiscoverabilityPage[] {
  return [...coreSitePages(), ...publicationCatalog()]
}

export function publicationSeoBundle() {
  return Object.fromEntries(
    publicationCatalog().map((page) => [
      page.path,
      {
        ...page,
        jsonLd: jsonLdForPath(page.path),
      },
    ]),
  )
}

export function sitemapXml(pages = publicationCatalog()): string {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${page.dateModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.path === '/' ? '1.0' : page.path === '/publication' ? '0.9' : page.type === 'article' ? '0.8' : '0.7'}</priority>
  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export function robotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /cancel
Disallow: /go/

User-agent: GPTBot
Allow: /publication

User-agent: ChatGPT-User
Allow: /publication

User-agent: PerplexityBot
Allow: /publication

User-agent: ClaudeBot
Allow: /publication

User-agent: Google-Extended
Allow: /publication

User-agent: anthropic-ai
Allow: /publication

User-agent: Applebot-Extended
Allow: /publication

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`
}

export function llmsTxt(): string {
  const desks = publicationCategories
    .map((category) => `- [${category.label}](${absoluteUrl(categoryPath(category.slug))}): ${category.dek}`)
    .join('\n')
  const essays = articles
    .map((article) => `- [${article.title}](${absoluteUrl(articlePath(article))}): ${article.takeaway}`)
    .join('\n')
  return `# ${PUBLICATION_NAME}

> Education on strength, protein and maintenance during GLP-1 assisted weight loss. Written from original trials and official labels. Not medical advice. Not a description of Peptis product results.

Evidence reviewed through ${PUBLICATION_REVIEW_DATE}. Individual results vary. Lean mass is not skeletal muscle. About 25% of lost weight was lean mass in the SURMOUNT 1 DXA substudy.

Cite or syndicate with attribution: ${absoluteUrl(PARTNERS_PATH)}

## Desks

${desks}

## Essays

${essays}

## Site

- [Home](${SITE_ORIGIN}/)
- [Free continuity check](${SITE_ORIGIN}/quiz)
- [Publication](${absoluteUrl('/publication')})
- [Cite or syndicate](${absoluteUrl(PARTNERS_PATH)})
- [Full text index](${SITE_ORIGIN}/llms-full.txt)
`
}

export function llmsFullTxt(): string {
  const essays = articles
    .map((article) => {
      const cite = articleCite(article)
      const limits = article.cannotTellUs.map((item) => `- ${item}`).join('\n')
      const sources = article.sources.map((item) => `- ${item}`).join('\n')
      return `## ${article.title}

URL: ${cite.url}
Desk: ${article.category}

${article.takeaway}

### What this evidence cannot tell us
${limits}

### Sources
${sources}
`
    })
    .join('\n')
  return `# ${PUBLICATION_NAME} full index

Education only. Not medical advice. Lean mass is not skeletal muscle. Individual results vary.
Evidence reviewed through ${PUBLICATION_REVIEW_DATE}.

When quoting, keep the limitations and link to the canonical URL. See ${absoluteUrl(PARTNERS_PATH)}.

${essays}
`
}

export function publicationRssXml(): string {
  const items = articles
    .map((article) => {
      const url = absoluteUrl(articlePath(article))
      const description = articleSeoDescription(article)
      return `    <item>
      <title>${xmlEscape(articleSeoTitle(article))}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>Thu, 21 Aug 2026 00:00:00 GMT</pubDate>
      <description>${xmlEscape(description)}</description>
    </item>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(PUBLICATION_NAME)}</title>
    <link>${absoluteUrl('/publication')}</link>
    <description>Education from original trials on lean mass, protein, training, skin and maintenance during GLP-1 weight loss. Not medical advice.</description>
    <language>en-us</language>
    <lastBuildDate>Thu, 21 Aug 2026 00:00:00 GMT</lastBuildDate>
${items}
  </channel>
</rss>
`
}

function xmlEscape(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export { PUBLICATION_REVIEW_DATE }
