import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PublicationChrome } from '../components/publication/PublicationChrome'
import { SeoHead } from '../components/SeoHead'
import { articles } from '../data/blog'
import {
  PARTNER_AUDIENCES,
  PARTNER_PLAYS,
  PARTNER_REUSE_RULES,
} from '../data/publicationPartners'
import { articlePath, categoryForArticle, PUBLICATION_NAME } from '../data/publication'
import {
  articleCite,
  articleSeoTitle,
  PARTNERS_PATH,
  partnersJsonLd,
  partnersPageSeo,
} from '../lib/publicationDiscoverability'

export function PublicationPartnersPage() {
  const seo = partnersPageSeo()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <PublicationChrome>
      <SeoHead
        title={`${seo.title} | ${PUBLICATION_NAME}`}
        description={seo.description}
        path={PARTNERS_PATH}
        image={seo.image}
        imageAlt={seo.imageAlt}
        jsonLd={partnersJsonLd()}
      />
      <main id="main" className="pub-main">
        <header className="pub-essay-head">
          <nav className="pub-crumb" aria-label="Breadcrumb">
            <Link to="/publication">Publication</Link>
            <span aria-hidden="true">/</span>
            <span>Partners</span>
          </nav>
          <p className="pub-kicker">Citation and syndication</p>
          <h1>Let other sites rank the question. Keep Peptis as the source.</h1>
          <p className="pub-dek">{seo.description}</p>
        </header>

        <section className="pub-essay-body">
          <h2>How borrowed ranking works here</h2>
          <p>
            Clinics, trainers and education desks already have stronger local or specialty
            authority than a new publication. They also get the same patient questions these
            essays answer. The useful move is not a fake guest post network. It is a cited
            excerpt on a real partner site, with the statistic unchanged and the canonical essay
            one click away.
          </p>
          <p>
            Search and answer engines then see the same key sentence in more than one place,
            always pointing back to {PUBLICATION_NAME}. That is how a small evidence library
            earns citations it could not earn from its own domain alone.
          </p>
          <p>
            Each essay lists the questions a partner can host. Write an original opening for
            your patients, quote the takeaway, keep the limits, and link the canonical URL.
            Do not buy expired domains, fake bylines or a private blog network.
          </p>
        </section>

        <section className="pub-folio" aria-labelledby="plays-heading">
          <h2 id="plays-heading">Three allowed plays</h2>
          <div className="pub-folio-grid">
            {PARTNER_PLAYS.map((play) => (
              <article className="pub-card" key={play.title}>
                <h3>{play.title}</h3>
                <p>{play.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pub-limits">
          <h2>Reuse rules</h2>
          <ul>
            {PARTNER_REUSE_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>

        <section className="pub-essay-body">
          <h2>Who this is for</h2>
          <ul>
            {PARTNER_AUDIENCES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            There is no paid partner directory and no implied clinical network. A link from a
            partner site is education, not a referral, prescription or endorsement of Peptis
            care.
          </p>
        </section>

        <section className="pub-related" aria-labelledby="cite-list-heading">
          <h2 id="cite-list-heading">Canonical essays</h2>
          <div className="pub-folio-grid">
            {articles.map((article) => {
              const cite = articleCite(article)
              const category = categoryForArticle(article)
              return (
                <article className="pub-card" key={article.slug}>
                  <p className="pub-kicker">{category.label}</p>
                  <h3>
                    <Link to={articlePath(article)}>{articleSeoTitle(article)}</Link>
                  </h3>
                  <p>{article.takeaway}</p>
                  {cite.partnerQueries.length > 0 ? (
                    <p className="pub-meta">{cite.partnerQueries.join(' · ')}</p>
                  ) : null}
                  <p className="pub-meta">{cite.url}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="pub-next">
          <p className="pub-kicker">Machine readable</p>
          <h2>Feeds answer engines and partners can pull</h2>
          <p>
            Use the sitemap, RSS feed and llms.txt files when you want the same titles and
            takeaways without scraping rendered pages.
          </p>
          <div className="pub-cite-actions">
            <a className="pub-quiet" href="/sitemap.xml">
              sitemap.xml
            </a>
            <a className="pub-quiet" href="/publication-feed.xml">
              publication-feed.xml
            </a>
            <a className="pub-quiet" href="/llms.txt">
              llms.txt
            </a>
            <a className="pub-quiet" href="/llms-full.txt">
              llms-full.txt
            </a>
          </div>
        </section>
      </main>
    </PublicationChrome>
  )
}
