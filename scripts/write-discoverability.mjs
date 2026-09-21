import { register } from 'node:module'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

register('./resolve-ts.mjs', import.meta.url)

const {
  llmsFullTxt,
  llmsTxt,
  publicationCatalog,
  publicationRssXml,
  publicationSeoBundle,
  robotsTxt,
  sitemapXml,
  siteSitemapPages,
} = await import('../src/lib/publicationDiscoverability.ts')
const { articles } = await import('../src/data/blog.ts')

const publicDir = path.join(process.cwd(), 'public')
mkdirSync(publicDir, { recursive: true })

const files = {
  'sitemap.xml': sitemapXml(siteSitemapPages()),
  'robots.txt': robotsTxt(),
  'llms.txt': llmsTxt(),
  'llms-full.txt': llmsFullTxt(),
  'publication-feed.xml': publicationRssXml(),
  'publication-catalog.json': `${JSON.stringify(publicationCatalog(), null, 2)}\n`,
  'publication-seo.json': `${JSON.stringify(publicationSeoBundle(), null, 2)}\n`,
  'publication-articles.json': `${JSON.stringify(articles, null, 2)}\n`,
}

for (const [name, contents] of Object.entries(files)) {
  writeFileSync(path.join(publicDir, name), contents)
  console.log(`wrote public/${name}`)
}
