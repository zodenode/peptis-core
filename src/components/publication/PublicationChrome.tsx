import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  PUBLICATION_ISSUE,
  PUBLICATION_NAME,
  PUBLICATION_REVIEW_DATE,
  publicationCategories,
  type PublicationCategorySlug,
} from '../../data/publication'
import { setQuizSource, track } from '../../lib/analytics'

type Props = {
  children: ReactNode
  active?: PublicationCategorySlug
}

export function PublicationChrome({ children, active }: Props) {
  return (
    <div className="site pub-site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="pub-masthead">
        <div className="pub-masthead-top">
          <Link className="pub-wordmark" to="/publication">
            <span>Peptis</span>
            <strong>Publication</strong>
          </Link>
          <p className="pub-issue">
            {PUBLICATION_ISSUE}
            <span aria-hidden="true"> · </span>
            Evidence through {PUBLICATION_REVIEW_DATE}
          </p>
          <div className="pub-masthead-actions">
            <Link className="pub-quiet" to="/">
              Peptis home
            </Link>
            <Link
              className="btn btn-primary pub-cta"
              to="/quiz"
              onClick={() => {
                setQuizSource('publication_masthead')
                track('quiz_cta_clicked', { location: 'publication_masthead' })
              }}
            >
              Free check
            </Link>
          </div>
        </div>
        <nav className="pub-rail" aria-label={`${PUBLICATION_NAME} sections`}>
          <Link className={!active ? 'is-active' : undefined} to="/publication">
            Issue
          </Link>
          {publicationCategories.map((category) => (
            <Link
              key={category.slug}
              className={active === category.slug ? 'is-active' : undefined}
              to={`/publication/${category.slug}`}
            >
              {category.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
      <footer className="pub-colophon">
        <div className="pub-colophon-inner">
          <p>
            {PUBLICATION_NAME} is an education desk from Information Edge Insights LLC. Essays are
            written from original trials, official labels and public datasets cited in the Peptis
            evidence dossier. They are not medical advice and do not describe results of any Peptis
            product or service.
          </p>
          <div className="pub-colophon-links">
            <Link to="/">Home</Link>
            <Link to="/quiz">Free continuity check</Link>
            <Link to="/plan">Training plans</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/health-data">Health data notice</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
