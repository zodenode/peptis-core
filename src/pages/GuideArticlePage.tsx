import { Link, Navigate, useParams } from 'react-router-dom'
import { GuideDisclaimer } from '../components/GuideDisclaimer'
import { getGuide, guides } from '../data/guides'
import { usePageTitle } from '../hooks/usePageTitle'

export function GuideArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const guide = slug ? getGuide(slug) : undefined

  usePageTitle(guide ? `${guide.title} · Peptis` : 'Guide · Peptis')

  if (!guide) {
    return <Navigate to="/guides" replace />
  }

  const related = guides.filter((g) => g.slug !== guide.slug)

  return (
    <main className="guide-page">
      <article>
        <header className="guide-hero">
          <div className="guide-hero-inner">
            <p className="eyebrow">{guide.eyebrow}</p>
            <h1>{guide.title}</h1>
            <p className="guide-dek">{guide.dek}</p>
            <p className="guide-meta">{guide.updatedLabel}</p>
          </div>
        </header>

        <div className="guide-body section">
          <div className="section-inner guide-narrow">
            <GuideDisclaimer />

            <p className="guide-compliance-note">{guide.complianceReviewed}</p>

            {guide.sections.map((section) => (
              <section className="guide-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={`${section.heading}-${i}`}>{p}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <p className="guide-closing">{guide.closing}</p>

            <div className="guide-cta">
              <h2>Ready for a clinician review?</h2>
              <p>
                If you choose Peptis, your next step is an assessment—not a
                guaranteed prescription.
              </p>
              <a className="btn btn-solid" href="/#start">
                Begin your assessment
              </a>
            </div>

            {related.length > 0 ? (
              <aside className="guide-related">
                <p className="eyebrow">Related guide</p>
                <ul className="guide-list">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link to={`/guides/${item.slug}`}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </div>
      </article>
    </main>
  )
}
