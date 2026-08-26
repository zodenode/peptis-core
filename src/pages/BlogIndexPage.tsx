import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { articles, EVIDENCE_REVIEW_DATE } from '../data/blog'
import { track } from '../lib/analytics'

export function BlogIndexPage() {
  useEffect(() => {
    document.title = 'Evidence Library: Peptis'
    window.scrollTo(0, 0)
    track('blog_viewed')
  }, [])

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" className="blog-page">
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Evidence library</p>
              <h1 className="blog-index-title">Clear answers about GLP-1 body recomposition</h1>
              <p>
                Education written from original trials, official labels and public datasets. These
                articles are for education only. They are not medical advice, and they do not
                describe results of any Peptis product or service.
              </p>
            </div>
            <div className="blog-grid">
              {articles.map((article) => (
                <article className="blog-card" key={article.slug}>
                  <p className="blog-category">{article.category}</p>
                  <h2>
                    <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <p>{article.description}</p>
                  <p className="blog-meta">{article.readingMinutes} minute read</p>
                </article>
              ))}
            </div>
            <p className="evidence-review">
              Evidence reviewed through {EVIDENCE_REVIEW_DATE}. For education only. Individual
              results vary.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
