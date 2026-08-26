import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { articles, EVIDENCE_REVIEW_DATE, findArticle } from '../data/blog'
import { track } from '../lib/analytics'

export function BlogArticlePage() {
  const { slug } = useParams()
  const article = findArticle(slug)

  useEffect(() => {
    if (!article) return
    document.title = `${article.title}: Peptis`
    window.scrollTo(0, 0)
    track('blog_article_viewed', { slug: article.slug, category: article.category })
  }, [article])

  if (!article) {
    return <Navigate to="/blog" replace />
  }

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" className="blog-page">
        <article className="section blog-article" aria-labelledby="article-heading">
          <div className="blog-article-inner">
            <nav className="blog-breadcrumb" aria-label="Breadcrumb">
              <Link to="/blog">Evidence library</Link>
              <span aria-hidden="true">/</span>
              <span>{article.category}</span>
            </nav>
            <h1 id="article-heading">{article.title}</h1>
            <p className="blog-meta">
              {article.readingMinutes} minute read. Evidence reviewed through {EVIDENCE_REVIEW_DATE}.
            </p>
            <aside className="blog-takeaway">
              <p className="eyebrow">Key takeaway</p>
              <p>{article.takeaway}</p>
            </aside>
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
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
            <aside className="blog-limits">
              <h2>What this evidence cannot tell us</h2>
              <ul>
                {article.cannotTellUs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
            <div className="blog-cta">
              <h2>Organize your own priorities</h2>
              <p>
                The free continuity check turns questions like these into a personal summary of
                your strength, protein and maintenance priorities, and reserves $0 founding access.
                Not medical care today.
              </p>
              <Link
                className="btn btn-primary"
                to="/quiz"
                onClick={() => track('quiz_cta_clicked', { location: `blog_${article.slug}` })}
              >
                Start the free check
              </Link>
            </div>
            <section className="blog-sources">
              <h2>Sources</h2>
              <ul>
                {article.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
              <p>
                Bracketed numbers refer to the Peptis GLP-1 body recomposition evidence dossier.
                This article is for education only and is not medical advice. It does not describe
                results of any Peptis product or service. Talk with your current clinician before
                changing medication, diet, supplements or exercise.
              </p>
            </section>
            <section className="blog-related" aria-label="Related articles">
              <h2>Keep reading</h2>
              <div className="blog-grid">
                {related.map((item) => (
                  <article className="blog-card" key={item.slug}>
                    <p className="blog-category">{item.category}</p>
                    <h3>
                      <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                    </h3>
                    <p className="blog-meta">{item.readingMinutes} minute read</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
