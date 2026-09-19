import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BodyCompositionGraphic } from '../components/landing/BodyCompositionGraphic'
import { ContinuityFramework } from '../components/landing/ContinuityFramework'
import { EvidenceCards } from '../components/landing/EvidenceCards'
import { PublicationTeaser } from '../components/landing/PublicationTeaser'
import { FoundingOfferVisual } from '../components/landing/FoundingOfferVisual'
import { LeanMassPreview } from '../components/landing/LeanMassPreview'
import { MeasuresBeyondWeight } from '../components/landing/MeasuresBeyondWeight'
import { OfferingsGrid } from '../components/landing/OfferingsGrid'
import { PricingStrip } from '../components/landing/PricingStrip'
import { ProteinTargetGraphic } from '../components/landing/ProteinTargetGraphic'
import { StickyQuizCta } from '../components/landing/StickyQuizCta'
import { QuizEmbed } from '../components/quiz/QuizEmbed'
import { LeadCapture } from '../components/landing/LeadCapture'
import { faqs, howSteps, problemItems, protocolRows, trustBadges } from '../data/landing'
import { images } from '../data/images'
import type { LandingVariant } from '../data/landingVariants'
import { useSectionView } from '../hooks/useSectionView'
import { setQuizPrompt, setQuizSource, track } from '../lib/analytics'

const heroPrompts = [
  { id: 'strength', label: 'I want to keep my strength' },
  { id: 'energy', label: 'My energy is lower than before' },
  { id: 'digestive', label: 'My stomach is uncomfortable' },
  { id: 'maintenance', label: 'I want to keep the weight off' },
] as const

type Props = {
  variant?: LandingVariant
}

export function LandingPage({ variant }: Props) {
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
    if (variant) {
      document.title = variant.documentTitle
      setQuizSource(variant.source)
    }
  }, [variant])

  useEffect(() => {
    if (viewed.current) return
    viewed.current = true
    track('landing_viewed', {
      page: variant?.path ?? '/',
      brand: variant?.id ?? 'continuity_care',
      source: variant?.source ?? 'home',
    })
  }, [variant])

  const sourceFor = (place: string) => (variant ? `${variant.source}_${place}` : place)

  const heroCta = () => {
    setQuizSource(sourceFor('hero'))
    track('hero_cta_clicked', { source: sourceFor('hero') })
    track('quiz_cta_clicked', { location: sourceFor('hero') })
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
              <p className="eyebrow eyebrow-light">{variant?.eyebrow ?? 'Free GLP-1 continuity check'}</p>
              <h1 id="hero-heading">
                {variant?.headline ?? 'See what the scale missed about your strength'}
              </h1>
              <p className="hero-lead">
                {variant?.lead ??
                  'Eight questions. You leave with written priorities on strength, protein and keeping the weight off, plus the free two-day strength starter plan. About 3 minutes. No card.'}
              </p>
              <div className="hero-quiz-start">
                {variant?.showHeroPrompts !== false ? (
                  <>
                    <p className="hero-quiz-q">Which of these sounds most like you?</p>
                    <div className="hero-quiz-options">
                      {heroPrompts.map((prompt) => (
                        <Link
                          key={prompt.id}
                          className="hero-quiz-chip"
                          to="/quiz"
                          onClick={() => {
                            setQuizSource(sourceFor('hero_prompt'))
                            setQuizPrompt(prompt.id)
                            track('hero_prompt_clicked', { prompt: prompt.id, source: sourceFor('hero_prompt') })
                            track('quiz_cta_clicked', { location: sourceFor('hero_prompt') })
                          }}
                        >
                          {prompt.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : null}
                {variant?.showLeadCapture ? (
                  <LeadCapture
                    source={variant.source}
                    buttonLabel={variant.leadButtonLabel ?? variant.ctaLabel}
                  />
                ) : null}
                {variant?.evidenceLine ? <p className="hero-micro">{variant.evidenceLine}</p> : null}
                <div className="hero-actions">
                  <Link className="btn btn-primary" to={variant?.ctaTo ?? '/quiz'} onClick={heroCta}>
                    {variant?.ctaLabel ?? 'Get my free summary'}
                  </Link>
                  {variant?.secondaryCtaLabel && variant.secondaryCtaTo ? (
                    <Link
                      className="btn btn-ghost"
                      to={variant.secondaryCtaTo}
                      onClick={() => {
                        setQuizSource(sourceFor('hero_secondary'))
                        track('quiz_cta_clicked', { location: sourceFor('hero_secondary') })
                      }}
                    >
                      {variant.secondaryCtaLabel}
                    </Link>
                  ) : null}
                </div>
                <p className="hero-micro">
                  {variant?.micro ?? 'Education only, not care today.'}{' '}
                  <a
                    href="#preview"
                    onClick={() => track('lean_preview_link_clicked', { location: sourceFor('hero') })}
                  >
                    See the lean-mass preview
                  </a>
                </p>
              </div>
              <ul className="trust-row" ref={trustRef}>
                {trustBadges.map((badge) => (
                  <li key={badge}>{badge}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <LeanMassPreview />

        <section className="section section-forest" id="how" ref={howRef} aria-labelledby="how-heading">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">How the continuity check works</p>
              <h2 id="how-heading">Three minutes now. A clear choice later.</h2>
            </div>
            <ol className="how-timeline">
              {howSteps.map((step) => (
                <li className="how-step" key={step.n}>
                  <span className="how-node" aria-hidden="true">
                    {step.n}
                  </span>
                  <div className="how-step-copy">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                  <img src={step.image} alt={step.alt} />
                </li>
              ))}
            </ol>
            <div className="how-cta">
              <Link
                className="btn btn-primary"
                to="/quiz"
                onClick={() => {
                  setQuizSource(sourceFor('how'))
                  track('quiz_cta_clicked', { location: sourceFor('how') })
                }}
              >
                Get my free summary
              </Link>
            </div>
          </div>
        </section>

        <section className="section" id="proof" ref={proofRef} aria-labelledby="proof-heading">
          <div className="section-inner proof-layout">
            <figure className="proof-figure">
              <span className="proof-sticker" aria-hidden="true">
                Free summary
              </span>
              <img
                src={images.testimonial}
                alt="Adult reflecting against a vivid berry-red studio background"
              />
            </figure>
            <div>
              <p className="eyebrow">What you walk away with</p>
              <h2 id="proof-heading">Named priorities the scale cannot show, plus a starter plan</h2>
              <p>
                After eight questions you receive a personal record of strength, protein and
                maintenance notes, plus the free two-day strength starter plan. It is a planning
                document, not a diagnosis or a promise of treatment results.
              </p>
              <ul className="walkaway-list">
                <li>
                  <strong>Your priorities, named</strong>
                  <span>Strength, energy, digestive comfort and maintenance, based on your answers.</span>
                </li>
                <li>
                  <strong>A free starter plan</strong>
                  <span>Two training days on this site. No payment details. No subscription.</span>
                </li>
              </ul>
              <Link
                className="btn btn-primary"
                to="/quiz"
                onClick={() => {
                  setQuizSource(sourceFor('walkaway'))
                  track('quiz_cta_clicked', { location: sourceFor('walkaway') })
                }}
              >
                Get my free summary
              </Link>
            </div>
          </div>
        </section>

        <PricingStrip variant={variant} />

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
            <div className="problem-mosaic">
              {problemItems.map((item, index) => (
                <article
                  className={`mosaic-card${index === 0 ? ' is-feature' : ''}`}
                  key={item.id}
                >
                  <img src={item.image} alt={item.alt} />
                  <div className="mosaic-copy">
                    <span className="mosaic-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <OfferingsGrid />

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
                  <p className="eyebrow">What you get now</p>
                  <h2 id="protocol-heading">A useful start now, with a clear choice later</h2>
                  <p>
                    The check and starter plan are free. The Lean Mass nutrition box is the first
                    paid product we intend to sell. Medical care, prescribing and pharmacy
                    fulfillment are not available today.
                  </p>
                </div>
                <div className="matrix" role="table" aria-label="Continuity system features">
                  <div className="matrix-row matrix-head" role="row">
                    <span role="columnheader">What is included</span>
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

        <MeasuresBeyondWeight />

        <ProteinTargetGraphic />

        <EvidenceCards />

        <PublicationTeaser />

        <section className="section trust-band" ref={trustBandRef} aria-labelledby="trust-heading">
          <div className="section-inner trust-band-inner">
            <figure>
              <img src={images.trust} alt="Sterile compounding still life without branded labels" />
            </figure>
            <div>
              <p className="eyebrow">Built for an honest launch</p>
              <h2 id="trust-heading">We will not claim care is ready before it is</h2>
              <p>
                The nutrition box ships only after we can charge and fulfill. Clinical services
                depend on state, provider, pharmacy and operational readiness. People who ask for
                updates will hear first. A prescription is never guaranteed.
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

        <FoundingOfferVisual variant={variant} />

        <section className="closer" id="assessment" ref={closerRef} aria-labelledby="closer-heading">
          <div className="closer-media" aria-hidden="true">
            <img src={images.closer} alt="" />
          </div>
          <div className="section-inner closer-inner">
            <div className="closer-copy">
              <p className="eyebrow eyebrow-light">
                {variant?.closerEyebrow ?? 'Free GLP-1 continuity check'}
              </p>
              <h2 id="closer-heading">
                {variant?.closerHeadline ?? 'See what the scale missed, in about 3 minutes'}
              </h2>
              <p>
                {variant?.closerBody ??
                  'Answer eight questions. You will receive written priorities and the free starter plan. No payment details.'}
              </p>
              <Link
                className="btn btn-primary"
                to={variant?.ctaTo ?? '/quiz'}
                onClick={() => {
                  setQuizSource(sourceFor('closer'))
                  track('quiz_cta_clicked', { location: sourceFor('closer') })
                }}
              >
                {variant?.ctaLabel ?? 'Get my free summary'}
              </Link>
            </div>
            <QuizEmbed />
          </div>
        </section>
      </main>
      <StickyQuizCta variant={variant} />
      <Footer />
    </div>
  )
}
