import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { offeringAudience, offeringPillars } from '../data/offerings'
import { suplifulCorePickSkus, suplifulStockLists } from '../data/suplifulStock'
import { track } from '../lib/analytics'
import { useEffect } from 'react'

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
            <p className="eyebrow">Peptis offerings · Insurance and programme scope</p>
            <h1>What Peptis is built to deliver</h1>
            <p className="offerings-lead">
              Peptis focuses on coaching, nutrition, supplements for people on GLP-1 therapies,
              exercise and movement programmes, training tips, and clinician-directed medications
              aimed at problems that can arise while taking GLPs. {offeringAudience}
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
              <p className="eyebrow">Six pillars</p>
              <h2 id="pillars-heading">Programme scope at a glance</h2>
            </div>
            <div className="offering-grid">
              {offeringPillars.map((pillar) => (
                <article className="offering-card" id={pillar.id} key={pillar.id}>
                  <div className="offering-card-meta">
                    <span>{pillar.eyebrow}</span>
                    <span
                      className={`offering-status is-${pillar.status === 'available-now' ? 'now' : 'planned'}`}
                    >
                      {pillar.status === 'available-now' ? 'Available now' : 'Programme planned'}
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

        <section className="section" id="supplements" aria-labelledby="stock-heading">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Supliful private-label stock</p>
              <h2 id="stock-heading">Curated stock lists you can pick from</h2>
              <p>
                These lists map Supliful catalog SKUs to GLP continuity problems. Use them to
                assemble the Lean Mass / GLP Support bundles. Full markdown tables also live in{' '}
                <code>docs/SUPFUL-STOCK-LISTS.md</code>.
              </p>
            </div>

            <div className="stock-core">
              <h3>Core first-wave SKUs</h3>
              <p>
                Start with these {suplifulCorePickSkus.length} core picks across digestive comfort,
                protein, training support and micronutrients.
              </p>
              <p className="stock-core-skus">{suplifulCorePickSkus.join(' · ')}</p>
            </div>

            <div className="stock-lists">
              {suplifulStockLists.map((list) => (
                <article className="stock-list" key={list.id} id={list.id}>
                  <header>
                    <h3>{list.title}</h3>
                    <p className="stock-problem">
                      <strong>GLP problem:</strong> {list.glpProblem}
                    </p>
                    <p>{list.intendedUse}</p>
                    <p className="stock-compliance">{list.complianceNote}</p>
                  </header>
                  <div className="stock-table-wrap" role="region" aria-label={`${list.title} SKUs`}>
                    <table className="stock-table">
                      <thead>
                        <tr>
                          <th scope="col">Priority</th>
                          <th scope="col">SKU</th>
                          <th scope="col">Product</th>
                          <th scope="col">Form</th>
                          <th scope="col">Why it is on the list</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.items.map((item) => (
                          <tr key={item.sku}>
                            <td>
                              <span className={`pick-pill is-${item.pickPriority}`}>
                                {item.pickPriority}
                              </span>
                            </td>
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

        <section className="section section-mist" id="medications" aria-labelledby="meds-heading">
          <div className="section-inner guide-narrow">
            <p className="eyebrow">Medications scope</p>
            <h2 id="meds-heading">Medications aimed at GLP-related problems</h2>
            <p>
              Peptis separates dietary supplements from prescription medications. Supliful stock
              covers wellness supplements only. Medications aimed at problems that can arise while
              taking GLP-1 therapies are evaluated only by licensed clinicians after services
              launch, state coverage and eligibility are confirmed.
            </p>
            <ul className="walkaway-list">
              <li>
                <strong>Not part of the $0 reservation</strong>
                <span>No clinician review, prescription or pharmacy fulfillment today.</span>
              </li>
              <li>
                <strong>Not a substitute for the prescribing GLP-1 clinician</strong>
                <span>Members should keep working with their current care team.</span>
              </li>
              <li>
                <strong>Distinct from supplements</strong>
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
