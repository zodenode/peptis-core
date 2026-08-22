import { Link } from 'react-router-dom'
import { guides } from '../data/guides'
import { usePageTitle } from '../hooks/usePageTitle'

export function GuidesIndexPage() {
  usePageTitle('Guides · Peptis')

  return (
    <main className="guide-page">
      <div className="guide-hero">
        <div className="guide-hero-inner">
          <p className="eyebrow">Peptis editorial</p>
          <h1>Guides</h1>
          <p className="guide-dek">
            Original, compliance-reviewed explainers to help you understand
            cash-pay care and evaluate online providers before you begin.
          </p>
        </div>
      </div>

      <div className="guide-body section">
        <div className="section-inner guide-narrow">
          <ul className="guide-index-list">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link to={`/guides/${guide.slug}`}>
                  <span className="guide-index-title">{guide.title}</span>
                  <span className="guide-index-dek">{guide.dek}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
