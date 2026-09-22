import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ReserveBoxButton } from '../components/landing/ReserveBoxButton'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { offeringAudience, offeringPillars } from '../data/offerings'
import { track } from '../lib/analytics'

const boxContents = [
  { title: 'Protein', body: 'A complete-protein option for low-appetite weeks.' },
  { title: 'Creatine', body: 'A training staple that supports strength work.' },
  { title: 'Hydration', body: 'Electrolytes for days when food and fluid volume fall.' },
  { title: 'Micronutrients', body: 'A foundational multivitamin and mineral layer.' },
]

export function OfferingsPage() {
  useEffect(() => {
    track('offerings_viewed', { page: '/offerings' })
  }, [])

  return (
    <div className="site">
      <Header />
      <main id="main" className="offerings-page">
        <section className="section offerings-hero">
          <div className="section-inner guide-narrow">
            <p className="eyebrow">Peptis offerings</p>
            <h1>A free check, a starter plan, and nutrition for what comes next</h1>
            <p className="offerings-lead">{offeringAudience}</p>
            <p>Clinical services are not offered.</p>
            <ReserveBoxButton source="offerings_hero" />
          </div>
        </section>

        <section className="section section-mist" id="pillars" aria-labelledby="pillars-heading">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Product offer</p>
              <h2 id="pillars-heading">What Peptis is built to deliver</h2>
            </div>
            <div className="offering-grid">
              {offeringPillars.map((pillar) => (
                <article className="offering-card" id={pillar.id} key={pillar.id}>
                  <div className="offering-card-meta">
                    <span>{pillar.eyebrow}</span>
                    <span
                      className={`offering-status is-${pillar.status === 'programme-planned' ? 'planned' : 'now'}`}
                    >
                      {pillar.statusLabel}
                    </span>
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.summary}</p>
                  <ul>
                    {pillar.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link className="editorial-link" to={pillar.href}>
                    {pillar.cta} <b>→</b>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="lean-mass-bundle" aria-labelledby="bundle-heading">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Founding box</p>
              <h2 id="bundle-heading">Lean Mass nutrition box</h2>
              <p>
                Four planned essentials. Target price: $59 a month. We will confirm the contents, price and shipping date before you decide to buy.
              </p>
            </div>
            <div className="offering-grid">
              {boxContents.map((item) => (
                <article className="offering-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <p>
              <ReserveBoxButton source="offerings_box" />
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
