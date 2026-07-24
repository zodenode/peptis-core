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
              <p className="eyebrow">Care lanes</p>
              <h2>Personalized protocols for real goals</h2>
              <p>
                From metabolic reset to recovery, longevity, and skin renewal —
                every plan starts with a licensed clinician review.
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
                A clear path from your health goals to clinician-guided care —
                without the waiting room.
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
              <p className="eyebrow">Why Peptis</p>
              <h2>Care built on clinical rigor</h2>
              <p>
                Convenient telehealth with peptide depth — licensed providers,
                pharmacy fulfillment, and transparent membership pricing.
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
              Complete a short assessment and a licensed clinician will review
              whether treatment is right for you.
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
            </div>
          </div>
          <p className="footer-note">
            Peptis is operated by Information Edge Insights LLC. Not medical
            advice. Treatment requires evaluation by a licensed clinician; a
            prescription is not guaranteed. Compounded medications may not be
            FDA-approved. © {new Date().getFullYear()} Information Edge Insights
            LLC.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
