import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PublicationChrome } from '../components/publication/PublicationChrome'
import { PublicationFaq } from '../components/publication/PublicationFaq'
import { SeoHead } from '../components/SeoHead'
import {
  articlePath,
  categoryForArticle,
  findCategory,
  findPublicationArticle,
  PUBLICATION_IMAGE_HEIGHT,
  PUBLICATION_IMAGE_WIDTH,
  PUBLICATION_NAME,
  PUBLICATION_REVIEW_DATE,
  relatedArticles,
} from '../data/publication'
import { setQuizSource, track } from '../lib/analytics'
import {
  articleFaqs,
  articleJsonLd,
  articleSeoDescription,
  articleSeoTitle,
  PAGE_UPDATED_ISO,
} from '../lib/publicationDiscoverability'
import { absoluteUrl } from '../lib/site'

export function PublicationArticlePage() {
  const { category: categorySlug, slug } = useParams()
  const article = findPublicationArticle(slug)
  const expected = article ? categoryForArticle(article) : undefined
  const category = findCategory(categorySlug)

  useEffect(() => {
    if (!article || !expected) return
    document.title = `${article.title}: ${PUBLICATION_NAME}`
    window.scrollTo(0, 0)
    track('publication_article_viewed', {
      slug: article.slug,
      category: expected.slug,
    })
  }, [article, expected])

  if (!article || !expected) {
    return <Navigate to="/publication" replace />
  }
  if (!category || category.slug !== expected.slug) {
    return <Navigate to={articlePath(article)} replace />
  }

  const related = relatedArticles(article)

  return (
    <PublicationChrome active={expected.slug}>
      <SeoHead
        title={`${articleSeoTitle(article)} | ${PUBLICATION_NAME}`}
        description={articleSeoDescription(article)}
        path={articlePath(article)}
        type="article"
        image={absoluteUrl(expected.image)}
        imageAlt={expected.imageAlt}
        imageWidth={PUBLICATION_IMAGE_WIDTH}
        imageHeight={PUBLICATION_IMAGE_HEIGHT}
        jsonLd={articleJsonLd(article)}
        publishedTime="2026-08-21"
        modifiedTime={PAGE_UPDATED_ISO}
      />
      <main id="main" className="pub-main">
        <article className="pub-essay" aria-labelledby="essay-heading">
          <header className="pub-essay-head">
            <nav className="pub-crumb" aria-label="Breadcrumb">
              <Link to="/publication">Publication</Link>
              <span aria-hidden="true">/</span>
              <Link to={`/publication/${expected.slug}`}>{expected.label}</Link>
            </nav>
            <p className="pub-kicker">{expected.label}</p>
            <h1 id="essay-heading">{article.title}</h1>
            <p className="pub-dek">{article.description}</p>
            <p className="pub-meta">
              {article.readingMinutes} minute read
              <span aria-hidden="true"> · </span>
              Evidence reviewed through {PUBLICATION_REVIEW_DATE}
              <span aria-hidden="true"> · </span>
              Education only
            </p>
          </header>

          <aside className="pub-takeaway">
            <p className="pub-kicker">Takeaway</p>
            <p className="pub-answer">{article.takeaway}</p>
          </aside>

          <div className="pub-essay-body">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="pub-limits">
            <h2>What this evidence cannot tell us</h2>
            <ul>
              {article.cannotTellUs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>

          <PublicationFaq items={articleFaqs(article)} />

          <section className="pub-sources">
            <h2>Sources</h2>
            <ul>
              {article.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
            <p>
              Bracketed numbers refer to the Peptis GLP-1 body recomposition evidence dossier. This
              essay does not describe results of any Peptis product or service. Talk with your
              current clinician before changing medication, diet, supplements or exercise.
            </p>
          </section>

          <aside className="pub-next">
            <p className="pub-kicker">Use the record</p>
            <h2>Turn the essay into your own priorities</h2>
            <p>
              The free continuity check writes strength, protein and maintenance notes from eight
              questions, then opens the starter training plan. Not medical care today.
            </p>
            <Link
              className="btn btn-primary"
              to="/quiz"
              onClick={() => {
                setQuizSource(`publication_${article.slug}`)
                track('quiz_cta_clicked', { location: `publication_${article.slug}` })
              }}
            >
              Get my free summary
            </Link>
          </aside>

          <section className="pub-related" aria-label="Keep reading">
            <h2>Keep reading</h2>
            <div className="pub-folio-grid">
              {related.map((item) => {
                const itemCategory = categoryForArticle(item)
                return (
                  <article className="pub-card" key={item.slug}>
                    <p className="pub-kicker">{itemCategory.label}</p>
                    <h3>
                      <Link to={articlePath(item)}>{item.title}</Link>
                    </h3>
                    <p className="pub-meta">{item.readingMinutes} minute read</p>
                  </article>
                )
              })}
            </div>
          </section>
        </article>
      </main>
    </PublicationChrome>
  )
}
