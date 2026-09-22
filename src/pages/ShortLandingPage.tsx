import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BeforeAfterEducationSlider } from '../components/landing/BeforeAfterEducationSlider'
import { CompositionCompareSlider } from '../components/landing/CompositionCompareSlider'
import { LiveOfferStrip } from '../components/landing/LiveOfferStrip'
import { ProteinRangeControl } from '../components/landing/ProteinRangeControl'
import { RegainGraph } from '../components/landing/RegainGraph'
import { ReserveBoxButton } from '../components/landing/ReserveBoxButton'
import { ResultExamples } from '../components/landing/ResultExamples'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { StickyQuizCta } from '../components/landing/StickyQuizCta'
import type { LandingVariant } from '../data/landingVariants'
import { setQuizSource, track } from '../lib/analytics'

type Props = {
  variant: LandingVariant
  visual?: boolean
  compact?: boolean
}

export function ShortLandingPage({ variant, visual = false, compact = false }: Props) {
  const viewed = useRef(false)

  useEffect(() => {
    document.title = variant.documentTitle
    setQuizSource(variant.source)
    if (viewed.current) return
    viewed.current = true
    track('landing_viewed', { page: variant.path, brand: variant.id, source: variant.source })
  }, [variant])

  return (
    <div className="site">
      <Header />
      <main id="main">
        <section className="hero short-hero" aria-labelledby="hero-heading">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-light">{variant.eyebrow}</p>
              <h1 id="hero-heading">{variant.headline}</h1>
              <p className="hero-lead">{variant.lead}</p>
              <div className="hero-actions">
                <Link
                  className="btn btn-primary"
                  to={variant.ctaTo}
                  onClick={() => {
                    setQuizSource(`${variant.source}_hero`)
                    track('hero_cta_clicked', { source: `${variant.source}_hero` })
                    track('quiz_cta_clicked', { location: `${variant.source}_hero` })
                  }}
                >
                  {variant.ctaLabel}
                </Link>
                <ReserveBoxButton source={`${variant.source}_hero_box`} />
              </div>
              <p className="hero-micro">{variant.micro}</p>
            </div>
          </div>
        </section>
        {compact ? (
          <>
            <LiveOfferStrip source={variant.source} />
            <ResultExamples limit={4} />
          </>
        ) : null}
        {visual ? (
          <>
            <CompositionCompareSlider />
            <BeforeAfterEducationSlider />
            <RegainGraph />
            <ProteinRangeControl />
          </>
        ) : null}
        <section className="section" aria-labelledby="short-faq-heading">
          <div className="section-inner">
            <h2 id="short-faq-heading">One clear limit</h2>
            <p>
              The check and plan are education, not medical care. The $59 box can be reserved
              without a card. Clinical services are not offered.
            </p>
          </div>
        </section>
      </main>
      <StickyQuizCta variant={variant} />
      <Footer />
    </div>
  )
}
