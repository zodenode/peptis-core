import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { offeringAudience, offeringPillars } from '../data/offerings'
import { suplifulStockLists } from '../data/suplifulStock'
import { track } from '../lib/analytics'

const publicBundleListIds = [
  'protein-lean-mass',
  'strength-training-support',
  'micronutrient-repletion',
  'glp-digestive-comfort',
] as const

export function OfferingsPage() {
  useEffect(() => {
    track('offerings_viewed', { page: '/offerings' })
  }, [])

  const publicLists = publicBundleListIds
    .map((id) => suplifulStockLists.find((list) => list.id === id))
    .filter((list): list is NonNullable<typeof list> => Boolean(list))
    .map((list) => ({
      ...list,
      items: list.items.filter((item) => item.pickPriority === 'core'),
    }))

  return (
    <div className="site">
      <Header />
      <main id="main" className="offerings-page">
        <section className="section offerings-hero">
          <div className="section-inner guide-narrow">
            <p className="eyebrow">Peptis offerings</p>
            <h1>Continuity care, not a catalog</h1>
            <p className="offerings-lead">
              Peptis focuses on coaching and nutrition planning, training programmes, one curated
              Lean Mass / GLP support supplement bundle, and a planned weight-management
              consultation pathway. {offeringAudience}
            </p>
            <p className="offerings-status-note">
              The $0 founding reservation is planning access today. Live prescribing and pharmacy
              fulfillment require state launch, eligibility and affirmative enrollment.
            </p>
          </div>
        </section>

        <section className="section section-mist" id="pillars" aria-labelledby="pillars-heading">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Product offer</p>
              <h2 id="pillars-heading">Four things Peptis is built to deliver</h2>
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
              <p className="eyebrow">Supliful private-label</p>
              <h2 id="bundle-heading">Core Lean Mass / GLP support bundle</h2>
              <p>
                Public assortment stays narrow: protein, creatine, hydration, foundational
                micronutrients and digestive-comfort support. Appearance and metabolic add-ons stay
                off the customer offer.
              </p>
            </div>

            <div className="stock-lists">
              {publicLists.map((list) => (
                <article className="stock-list" key={list.id} id={list.id}>
                  <header>
                    <h3>{list.title}</h3>
                    <p className="stock-problem">
                      <strong>For:</strong> {list.glpProblem}
                    </p>
                    <p className="stock-compliance">{list.complianceNote}</p>
                  </header>
                  <div className="stock-table-wrap" role="region" aria-label={`${list.title} core SKUs`}>
                    <table className="stock-table">
                      <thead>
                        <tr>
                          <th scope="col">SKU</th>
                          <th scope="col">Product</th>
                          <th scope="col">Form</th>
                          <th scope="col">Why</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.items.map((item) => (
                          <tr key={item.sku}>
                            <td>
                              <code>{item.sku}</code>
                            </td>
                            <td>
                              <a href={item.url} target="_blank" rel="noreferrer">
                                {item.name}
                              </a>
                            </td>
                            <td>{item.form}</td>
                            <td>{item.why}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-mist" id="clinical-care" aria-labelledby="clinical-care-heading">
          <div className="section-inner guide-narrow">
            <p className="eyebrow">Planned clinical pathway</p>
            <h2 id="clinical-care-heading">Weight-management consultations</h2>
            <p>
              If clinical services launch in a member’s state, licensed practitioners through the
              contracted telehealth platform may assess eligibility for weight-management care.
              Compounded semaglutide or tirzepatide may be considered only after clinician review
              when appropriate. A prescription is never guaranteed.
            </p>
            <ul className="walkaway-list">
              <li>
                <strong>Not part of the $0 reservation</strong>
                <span>No clinician review, prescription or pharmacy fulfillment today.</span>
              </li>
              <li>
                <strong>Distinct from the supplement bundle</strong>
                <span>
                  Protein, digestive comfort and creatine products are dietary supplements, not
                  treatments for medication side effects.
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
