import { useEffect, useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { LandingVariant } from '../../data/landingVariants'
import { useSectionView } from '../../hooks/useSectionView'
import { setQuizSource, track } from '../../lib/analytics'

const benefits = [
  'Written continuity summary',
  'Free starter training plan',
  'Box updates if you ask',
  'No card today',
] as const

type Props = {
  variant?: LandingVariant
}

export function FoundingOfferVisual({ variant }: Props) {
  const sectionRef = useSectionView<HTMLElement>('founding_offer')
  const sent = useRef(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sent.current) {
          sent.current = true
          track('founding_offer_viewed')
        }
      },
      { threshold: 0.32 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [sectionRef])

  return (
    <section
      className="section offer-section"
      id="offer"
      ref={sectionRef}
      aria-labelledby="offer-heading"
    >
      <div className="section-inner offer-shell">
        <div className="offer-copy">
          <p className="eyebrow eyebrow-light">
            {variant?.offerEyebrow ?? 'Free check, then a box you can buy later'}
          </p>
          <h2 id="offer-heading">
            {variant?.offerHeadline ??
              'Get the summary and starter plan now. The $59 box is not for sale yet.'}
          </h2>
          <p>
            {variant?.offerBody ??
              'The continuity check and two-day strength plan are free. The first paid product we intend to sell is the Lean Mass nutrition box at $59 a month. It is not for sale today because we cannot charge or ship. There is no paid clinical programme to join.'}
          </p>
          <ul className="offer-benefits">
            {benefits.map((benefit) => (
              <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>
            ))}
          </ul>
          <Link
            className="btn btn-primary"
            to={variant?.ctaTo ?? '/quiz'}
            onClick={() => {
              setQuizSource(variant ? `${variant.source}_offer` : 'founding_offer')
              track('quiz_cta_clicked', { location: variant ? `${variant.source}_offer` : 'founding_offer' })
            }}
          >
            {variant?.ctaLabel ?? 'Get my free summary'}
          </Link>
          <p className="offer-caveat">
            No charge now. No payment details. $59 is the intended box price, not a live offer.
          </p>
        </div>

        <figure className="offer-visual" aria-labelledby="offer-chart-title">
          <figcaption id="offer-chart-title">What is for sale today</figcaption>
          <p className="visually-hidden">
            The check and starter plan cost nothing. The Lean Mass nutrition box and any clinical
            programme are not for sale today.
          </p>
          <div className="offer-today">
            <span>Today</span>
            <strong>$0</strong>
            <small>for the check and plan</small>
          </div>
          <div className="offer-bars">
            <div className="offer-bar-row founding">
              <div className="offer-bar-label">
                <span>Lean Mass nutrition box</span>
                <strong>Not for sale</strong>
              </div>
              <div className="offer-bar-track" aria-hidden="true">
                <span style={{ '--bar-size': '0%' } as CSSProperties} />
              </div>
            </div>
            <div className="offer-bar-row standard">
              <div className="offer-bar-label">
                <span>Clinical continuity programme</span>
                <strong>Not for sale</strong>
              </div>
              <div className="offer-bar-track" aria-hidden="true">
                <span style={{ '--bar-size': '0%' } as CSSProperties} />
              </div>
            </div>
          </div>
          <div className="offer-saving">
            <strong>Later</strong>
            <span>the box is intended at $59 a month only after we can charge and ship</span>
          </div>
        </figure>
      </div>
    </section>
  )
}
