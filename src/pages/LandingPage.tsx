import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BodyCompositionGraphic } from '../components/landing/BodyCompositionGraphic'
import { ContinuityFramework } from '../components/landing/ContinuityFramework'
import { EvidenceCards } from '../components/landing/EvidenceCards'
import { FoundingOfferVisual } from '../components/landing/FoundingOfferVisual'
import { MeasuresBeyondWeight } from '../components/landing/MeasuresBeyondWeight'
import { PricingStrip } from '../components/landing/PricingStrip'
import { ProteinTargetGraphic } from '../components/landing/ProteinTargetGraphic'
import { StickyQuizCta } from '../components/landing/StickyQuizCta'
import { QuizEmbed } from '../components/quiz/QuizEmbed'
import { faqs, howSteps, problemItems, protocolRows, trustBadges } from '../data/landing'
import { images } from '../data/images'
import { useSectionView } from '../hooks/useSectionView'
import { setQuizSource, track } from '../lib/analytics'

export function LandingPage() {
  const heroRef = useSectionView<HTMLElement>('hero')
  const problemRef = useSectionView<HTMLElement>('problem')
  const protocolRef = useSectionView<HTMLElement>('protocol')
  const howRef = useSectionView<HTMLElement>('how')
  const proofRef = useSectionView<HTMLElement>('social_proof')
  const trustBandRef = useSectionView<HTMLElement>('trust')
  const faqRef = useSectionView<HTMLElement>('faq')
  const closerRef = useSectionView<HTMLElement>('closer')
  const trustRef = useSectionView<HTMLUListElement>('hero_trust', 'trust_badge_viewed')
  const viewed = useRef(false)

  useEffect(() => {
    if (viewed.current) return
    viewed.current = true
    track('landing_viewed', { page: '/', brand: 'continuity_care' })
  }, [])

  const heroCta = () => {
    setQuizSource('hero')
    track('hero_cta_clicked')
    track('quiz_cta_clicked', { location: 'hero' })
  }

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className="hero" ref={heroRef} aria-labelledby="hero-heading">
          <div className="hero-media">
            <img
              src={images.heroDuo}
              alt="A woman and a man in knitwear standing together against a deep green studio wall with a warm coral circle of light, the man holding a kettlebell"
            />
          </div>
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-light">For adults on or after GLP-1 weight loss</p>
              <h1 id="hero-heading">You reached a healthier weight. Now protect the strength that carries it.</h1>
              <p className="hero-lead">
                Answer a short continuity check, get a personalized summary of your strength,
                protein and maintenance priorities, and reserve $0 founding access to
                state-by-state launch updates. Not medical care today.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" to="/quiz" onClick={heroCta}>
                  Start the free check
                </Link>
                <a
                  className="btn btn-ghost"
                  href="#evidence"
                  onClick={() => track('evidence_cta_clicked', { location: 'hero' })}
                >
                  See the evidence
                </a>
              </div>
              <ul className="trust-row" ref={trustRef}>
                {trustBadges.map((badge) => (
                  <li key={badge}>{badge}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <BodyCompositionGraphic />

        <section className="section" id="problem" ref={problemRef} aria-labelledby="problem-heading">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">What deserves attention</p>
              <h2 id="problem-heading">A lower number does not tell the whole story</h2>
              <p>
                Strength, energy, digestive comfort and maintenance all deserve a clear record.
                The quiz helps you gather that information without trying to diagnose the cause.
              </p>
            </div>
            <div className="problem-grid">
              {problemItems.map((item) => (
                <article className="problem-card" key={item.id}>
                  <img src={item.image} alt={item.alt} />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PricingStrip />

        <ContinuityFramework />

        <section
          className="section section-mist"
          id="protocol"
          ref={protocolRef}
          aria-labelledby="protocol-heading"
        >
          <div className="section-inner">
            <div className="protocol-layout">
              <div>
                <div className="section-head">
                  <p className="eyebrow">The founding reservation</p>
                  <h2 id="protocol-heading">A useful start now, with a clear choice later</h2>
                  <p>
                    Your $0 reservation includes planning tools and priority updates. Medical care,
                    prescribing and pharmacy fulfillment are not available today.
                  </p>
                </div>
                <div className="matrix" role="table" aria-label="Continuity system features">
                  <div className="matrix-row matrix-head" role="row">
                    <span role="columnheader">Reservation benefit</span>
                    <span role="columnheader">Purpose</span>
                    <span role="columnheader">Your benefit</span>
                  </div>
                  {protocolRows.map((row) => (
                    <div className="matrix-row" role="row" key={row.include}>
                      <span role="cell">
                        <strong>{row.include}</strong>
                      </span>
                      <span role="cell">{row.purpose}</span>
                      <span role="cell">{row.benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <figure className="protocol-visual">
                <img
                  src={images.protocolLifestyle}
                  alt="Adult holding a protein-forward meal in an emerald and coral studio"
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="section section-forest" id="how" ref={howRef} aria-labelledby="how-heading">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">How founding access works</p>
              <h2 id="how-heading">Reserve now and decide when the facts are clear</h2>
            </div>
            <div className="how-grid">
              {howSteps.map((step) => (
                <article className="how-card" key={step.n}>
                  <img src={step.image} alt={step.alt} />
                  <span className="step-n">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <MeasuresBeyondWeight />

        <ProteinTargetGraphic />

        <EvidenceCards />

        <section className="section" id="proof" ref={proofRef} aria-labelledby="proof-heading">
          <div className="section-inner proof-layout">
            <figure>
              <img
                src={images.testimonial}
                alt="Adult reflecting against a vivid berry-red studio background"
              />
            </figure>
            <div>
              <p className="eyebrow">What you walk away with</p>
              <h2 id="proof-heading">A written summary of the priorities the scale cannot show</h2>
              <p>
                After eight questions you receive a personal record of strength, protein and
                maintenance notes, plus a $0 place on the state launch list. It is a planning
                document, not a diagnosis or a promise of treatment results.
              </p>
              <ul className="walkaway-list">
                <li>
                  <strong>Your priorities, named</strong>
                  <span>Strength, energy, digestive comfort and maintenance, based on your answers.</span>
                </li>
                <li>
                  <strong>A $0 reservation</strong>
                  <span>No payment details. Cancel any time from the confirmation email.</span>
                </li>
              </ul>
              <Link
                className="btn btn-primary"
                to="/quiz"
                onClick={() => {
                  setQuizSource('walkaway')
                  track('quiz_cta_clicked', { location: 'walkaway' })
                }}
              >
                Start the free check
              </Link>
            </div>
          </div>
        </section>

        <section className="section trust-band" ref={trustBandRef} aria-labelledby="trust-heading">
          <div className="section-inner trust-band-inner">
            <figure>
              <img src={images.trust} alt="Sterile compounding still life without branded labels" />
            </figure>
            <div>
              <p className="eyebrow">Built for an honest launch</p>
              <h2 id="trust-heading">We will not claim care is ready before it is</h2>
              <p>
                Launch depends on state, provider, pharmacy, and operational readiness. Reservation
                holders will be notified when eligibility screening becomes available. A
                prescription is never guaranteed.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-mist" id="faq" ref={faqRef} aria-labelledby="faq-heading">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Questions</p>
              <h2 id="faq-heading">Clear answers before you begin</h2>
            </div>
            <div className="faq-list">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  onToggle={(e) => {
                    if ((e.target as HTMLDetailsElement).open) {
                      track('faq_opened', { question: item.q })
                    }
                  }}
                >
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <FoundingOfferVisual />

        <section className="closer" id="assessment" ref={closerRef} aria-labelledby="closer-heading">
          <div className="closer-media" aria-hidden="true">
            <img src={images.closer} alt="" />
          </div>
          <div className="section-inner closer-inner">
            <div className="closer-copy">
              <p className="eyebrow eyebrow-light">Peptis Core Continuity</p>
              <h2 id="closer-heading">Start with a short continuity check</h2>
              <p>
                Answer eight straightforward questions in about three minutes. You will receive a
                summary of your priorities and can reserve your place for $0.
              </p>
              <Link
                className="btn btn-ghost"
                to="/quiz"
                onClick={() => {
                  setQuizSource('closer')
                  track('quiz_cta_clicked', { location: 'closer' })
                }}
              >
                Open the full quiz
              </Link>
            </div>
            <QuizEmbed />
          </div>
        </section>
      </main>
      <StickyQuizCta />
      <Footer />
    </div>
  )
}
