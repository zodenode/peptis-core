import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PublicationChrome } from '../components/publication/PublicationChrome'
import { PublicationImage } from '../components/publication/PublicationImage'
import { SeoHead } from '../components/SeoHead'
import {
  articlePath,
  articlesInCategory,
  findCategory,
  PUBLICATION_NAME,
  PUBLICATION_REVIEW_DATE,
} from '../data/publication'
import { track } from '../lib/analytics'
import { categoryJsonLd, publicationCatalog } from '../lib/publicationDiscoverability'

export function PublicationCategoryPage() {
  const { category: slug } = useParams()
  const category = findCategory(slug)
  const entries = category ? articlesInCategory(category.slug) : []

  useEffect(() => {
    if (!category) return
    document.title = `${category.label}: ${PUBLICATION_NAME}`
    window.scrollTo(0, 0)
    track('publication_category_viewed', { category: category.slug })
  }, [category])

  if (!category) {
    return <Navigate to="/publication" replace />
  }

  const [lead, ...rest] = entries

  const seo = publicationCatalog().find((page) => page.path === `/publication/${category.slug}`)

  return (
    <PublicationChrome active={category.slug}>
      {seo ? (
        <SeoHead
          title={seo.title}
          description={seo.description}
          path={seo.path}
          image={seo.image}
          imageAlt={seo.imageAlt}
          imageWidth={seo.imageWidth}
          imageHeight={seo.imageHeight}
          modifiedTime={seo.dateModified}
          jsonLd={categoryJsonLd(category, entries)}
        />
      ) : null}
      <main id="main" className="pub-main">
        <section className="pub-desk-hero" aria-labelledby="desk-heading">
          <div className="pub-desk-hero-copy">
            <p className="pub-kicker">Desk</p>
            <h1 id="desk-heading">{category.label}</h1>
            <p className="pub-dek">{category.dek}</p>
            <p className="pub-meta">
              {entries.length} {entries.length === 1 ? 'essay' : 'essays'}
              <span aria-hidden="true"> · </span>
              Evidence through {PUBLICATION_REVIEW_DATE}
            </p>
          </div>
          <figure className="pub-desk-hero-media">
            <PublicationImage src={category.image} alt={category.imageAlt} priority />
          </figure>
        </section>

        {lead ? (
          <section className="pub-lead" aria-labelledby="lead-heading">
            <p className="pub-kicker">Lead essay</p>
            <h2 id="lead-heading">
              <Link to={articlePath(lead)}>{lead.title}</Link>
            </h2>
            <p>{lead.description}</p>
            <p className="pub-meta">{lead.readingMinutes} minute read</p>
            <Link className="editorial-link" to={articlePath(lead)}>
              Continue reading <b>→</b>
            </Link>
          </section>
        ) : (
          <p className="pub-empty">No essays in this desk yet.</p>
        )}

        {rest.length > 0 ? (
          <section className="pub-folio" aria-label={`More in ${category.label}`}>
            <div className="pub-folio-grid">
              {rest.map((article) => (
                <article className="pub-card" key={article.slug}>
                  <p className="pub-kicker">{category.label}</p>
                  <h3>
                    <Link to={articlePath(article)}>{article.title}</Link>
                  </h3>
                  <p>{article.description}</p>
                  <p className="pub-meta">{article.readingMinutes} minute read</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </PublicationChrome>
  )
}
