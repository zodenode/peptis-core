import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PublicationChrome } from '../components/publication/PublicationChrome'
import { PublicationImage } from '../components/publication/PublicationImage'
import { SeoHead } from '../components/SeoHead'
import {
  articlePath,
  categoryForArticle,
  categoryPath,
  coverArticle,
  issueArticles,
  PUBLICATION_ISSUE,
  PUBLICATION_NAME,
  PUBLICATION_REVIEW_DATE,
  publicationCategories,
} from '../data/publication'
import { useLiveArticles } from '../hooks/useLiveArticles'
import { track } from '../lib/analytics'
import { publicationHomeJsonLd, publicationCatalog } from '../lib/publicationDiscoverability'

export function PublicationHomePage() {
  const { articles: liveArticles } = useLiveArticles()
  const cover = coverArticle(liveArticles)
  const coverCategory = categoryForArticle(cover)
  const rest = issueArticles(liveArticles)

  useEffect(() => {
    document.title = `${PUBLICATION_NAME}: ${PUBLICATION_ISSUE}`
    window.scrollTo(0, 0)
    track('publication_viewed', { page: '/publication' })
  }, [])

  const homeSeo = publicationCatalog()[0]

  return (
    <PublicationChrome>
      <SeoHead
        title={homeSeo.title}
        description={homeSeo.description}
        path={homeSeo.path}
        image={homeSeo.image}
        imageAlt={homeSeo.imageAlt}
        imageWidth={homeSeo.imageWidth}
        imageHeight={homeSeo.imageHeight}
        modifiedTime={homeSeo.dateModified}
        jsonLd={publicationHomeJsonLd()}
      />
      <main id="main" className="pub-main">
        <section className="pub-cover" aria-labelledby="cover-heading">
          <div className="pub-cover-copy">
            <p className="pub-kicker">Cover essay · {coverCategory.label}</p>
            <h1 id="cover-heading">
              <Link to={articlePath(cover)}>{cover.title}</Link>
            </h1>
            <p className="pub-dek">{cover.description}</p>
            <p className="pub-meta">
              {cover.readingMinutes} minute read
              <span aria-hidden="true"> · </span>
              {liveArticles.length} essays in this issue
            </p>
            <Link className="editorial-link" to={articlePath(cover)}>
              Read the cover essay <b>→</b>
            </Link>
          </div>
          <Link className="pub-cover-media" to={articlePath(cover)}>
            <PublicationImage src={coverCategory.image} alt={coverCategory.imageAlt} priority />
          </Link>
        </section>

        <section className="pub-issue-bar" aria-label="Issue contents">
          <p>
            {PUBLICATION_ISSUE} is a short evidence library for people on or after GLP-1 therapy.
            Evidence reviewed through {PUBLICATION_REVIEW_DATE}. Education only. Individual results
            vary.
          </p>
        </section>

        <section className="pub-folio" aria-labelledby="folio-heading">
          <div className="pub-folio-head">
            <h2 id="folio-heading">In this issue</h2>
            <p>Five desks. Same rule: the statistic stays next to the study that produced it.</p>
          </div>
          <div className="pub-folio-grid">
            {rest.map((article) => {
              const category = categoryForArticle(article)
              return (
                <article className="pub-card" key={article.slug}>
                  <Link className="pub-card-media" to={articlePath(article)}>
                    <PublicationImage src={category.image} alt="" />
                  </Link>
                  <p className="pub-kicker">
                    <Link to={categoryPath(category.slug)}>{category.label}</Link>
                  </p>
                  <h3>
                    <Link to={articlePath(article)}>{article.title}</Link>
                  </h3>
                  <p>{article.description}</p>
                  <p className="pub-meta">{article.readingMinutes} minute read</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="pub-desks" aria-labelledby="desks-heading">
          <h2 id="desks-heading">Browse by desk</h2>
          <div className="pub-desk-grid">
            {publicationCategories.map((category) => (
              <Link className="pub-desk" key={category.slug} to={categoryPath(category.slug)}>
                <span>{category.label}</span>
                <strong>{category.dek}</strong>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </PublicationChrome>
  )
}
