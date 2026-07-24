import { useEffect, useState } from 'react'
import {
  faqs,
  heroLanes,
  steps,
  trustPoints,
} from './data/products'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="site">
      <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="Peptis home">
          <img src="/peptis-logo-green.png" alt="Peptis" />
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#care">Care</a>
          <a href="#how">How it works</a>
          <a href="#why">Why Peptis</a>
          <a href="#faq">FAQ</a>
          <a className="nav-cta" href="#start">
            Start visit
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-label="Peptis hero">
          <div className="hero-media" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-inner">
            <img
              className="hero-brand"
              src="/peptis-logo-green.png"
              alt="Peptis"
            />
            <h1>Peptide care, guided by clinicians.</h1>
            <p className="hero-lead">
              Doctor-reviewed protocols for metabolism, recovery, longevity, and
              skin — shipped from U.S. pharmacies.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#start">
                Begin your assessment
              </a>
              <a className="btn btn-ghost" href="#care">
                Explore care lanes
              </a>
            </div>
          </div>
        </section>

        <section className="section lanes" id="care">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Hero care lanes</p>
              <h2>Built around what Peptis does best</h2>
              <p>
                GLP-1 metabolic care meets the demand of Ro, Hims, and Trim.
                Recovery, longevity, and skin lanes carry Peptis’ peptide
                forte — the edge generalist telehealth can’t copy overnight.
              </p>
            </div>

            <div className="lane-grid">
              {heroLanes.map((lane) => (
                <article className="lane" key={lane.id}>
                  <div className="lane-meta">
                    <span>{lane.eyebrow}</span>
                    <span className="lane-price">From {lane.startingAt}</span>
                  </div>
                  <h3>{lane.name}</h3>
                  <p>{lane.summary}</p>
                  <div className="compounds">
                    {lane.compounds.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                  <a className="lane-link" href="#start">
                    Start this visit
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section steps" id="how">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Simple path</p>
              <h2>From intake to doorstep in three steps</h2>
              <p>
                The same frictionless funnel top merchants use — without
                turning care into a vending machine.
              </p>
            </div>
            <div className="step-grid">
              {steps.map((step) => (
                <article className="step" key={step.n}>
                  <span className="step-n">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="why">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Trust architecture</p>
              <h2>Why patients choose Peptis</h2>
              <p>
                Compete with Ro, Hims, Musely, Nurx, and Lemonaid on convenience —
                win on peptide depth and clinical seriousness.
              </p>
            </div>
            <div className="trust-grid">
              {trustPoints.map((item) => (
                <article className="trust-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section strategy" id="strategy">
          <div className="section-inner strategy-panel">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <p className="eyebrow">Product strategy</p>
              <h2>Recommended hero products</h2>
              <p>
                Partner sites like GetTrim, FMmeds, and MensRX prove GLP-1 and
                men’s vitality convert. Peptis should enter that arena — then
                pull patients into peptide-native protocols competitors treat as
                side aisles.
              </p>
            </div>
            <ol className="strategy-list">
              <li>
                <strong>1. Metabolic Reset — Semaglutide / Tirzepatide</strong>
                <span>
                  Highest-intent telehealth category. Required to compete on the
                  same shelf as Trim, FMmeds, Ro, and Hims.
                </span>
              </li>
              <li>
                <strong>2. Recovery Protocol — BPC-157 + TB-500 (+ KPV)</strong>
                <span>
                  Peptis’ strongest historical catalog forte and clearest brand
                  differentiator.
                </span>
              </li>
              <li>
                <strong>3. Longevity Stack — Sermorelin / Ipamorelin / MOTS-c</strong>
                <span>
                  Owns healthspan positioning; aligns with existing longevity
                  SKUs and premium willingness to pay.
                </span>
              </li>
              <li>
                <strong>4. Skin Renewal — GHK-Cu</strong>
                <span>
                  Beauty/derm front door against Musely — converts peptide
                  expertise into a high-trust aesthetic lane.
                </span>
              </li>
            </ol>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Questions</p>
              <h2>Clear answers before you begin</h2>
            </div>
            <div className="faq-list">
              {faqs.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section cta-band" id="start">
          <div className="section-inner">
            <h2>Your protocol starts with a conversation</h2>
            <p>
              Example storefront only — wire this CTA to your intake, EMR, and
              pharmacy partners when you go live.
            </p>
            <a className="btn btn-primary" href="#care">
              Choose a care lane
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <img src="/peptis-logo-green.png" alt="Peptis" />
            <div className="footer-links">
              <a href="#care">Care</a>
              <a href="#how">How it works</a>
              <a href="#faq">FAQ</a>
              <a href="#strategy">Product strategy</a>
            </div>
          </div>
          <p className="footer-note">
            Peptis example site for demonstration. Not medical advice. Treatment
            requires evaluation by a licensed clinician; a prescription is not
            guaranteed. Compounded medications may not be FDA-approved. ©{' '}
            {new Date().getFullYear()} Peptis.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
