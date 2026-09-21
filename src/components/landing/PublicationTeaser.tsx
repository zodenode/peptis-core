import { Link } from 'react-router-dom'
import { articles } from '../../data/blog'
import { articlePath, categoryForArticle } from '../../data/publication'
import { articleSeoTitle } from '../../lib/publicationDiscoverability'

export function PublicationTeaser() {
  const featured = articles.slice(0, 4)

  return (
    <section className="section pub-teaser" aria-labelledby="pub-teaser-heading">
      <div className="section-inner">
        <div className="section-head">
          <p className="eyebrow">Peptis Publication</p>
          <h2 id="pub-teaser-heading">What the trials measured</h2>
          <p>
            Short essays from original papers on lean mass, protein, training and maintenance.
            Education only. Lean mass is not skeletal muscle.
          </p>
        </div>
        <ul className="pub-teaser-list">
          {featured.map((article) => (
            <li key={article.slug}>
              <p className="pub-kicker">{categoryForArticle(article).label}</p>
              <Link to={articlePath(article)}>{articleSeoTitle(article)}</Link>
            </li>
          ))}
        </ul>
        <Link className="editorial-link" to="/publication">
          Read the issue <b>→</b>
        </Link>
      </div>
    </section>
  )
}
