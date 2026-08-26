import { useEffect, useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useSectionView } from '../../hooks/useSectionView'
import { track } from '../../lib/analytics'

const benefits = [
  'Priority state access',
  'Personalized summary',
  'Readiness checklist',
  'Cancel any time',
] as const

export function FoundingOfferVisual() {
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
          <p className="eyebrow eyebrow-light">Peptis Core Continuity Founding Reservation</p>
          <h2 id="offer-heading">Reserve today. Pay only if you choose to activate later.</h2>
          <p>
            Hold your place for $0 and keep the opportunity to join at the planned founding rate
            if services launch in your state, you are eligible and you decide to enroll.
          </p>
          <ul className="offer-benefits">
            {benefits.map((benefit) => (
              <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>
            ))}
          </ul>
          <Link
            className="btn btn-primary"
            to="/quiz"
            onClick={() => track('quiz_cta_clicked', { location: 'founding_offer' })}
          >
            Reserve for $0
          </Link>
          <p className="offer-caveat">
            No charge now. No payment details. Pricing is subject to final launch terms.
          </p>
        </div>

        <figure className="offer-visual" aria-labelledby="offer-chart-title">
          <figcaption id="offer-chart-title">Planned monthly pricing</figcaption>
          <p className="visually-hidden">
            Reserving today costs nothing. The planned founding rate is $299 per month and the
            planned standard rate is $399 per month. Both apply only if services launch, you are
            eligible and you choose to enroll under the final terms.
          </p>
          <div className="offer-today">
            <span>Today</span>
            <strong>$0</strong>
            <small>to reserve</small>
          </div>
          <div className="offer-bars">
            <div className="offer-bar-row founding">
              <div className="offer-bar-label">
                <span>Planned founding rate</span>
                <strong>$299 <small>per month</small></strong>
              </div>
              <div className="offer-bar-track" aria-hidden="true">
                <span style={{ '--bar-size': '75%' } as CSSProperties} />
              </div>
            </div>
            <div className="offer-bar-row standard">
              <div className="offer-bar-label">
                <span>Planned standard rate</span>
                <strong>$399 <small>per month</small></strong>
              </div>
              <div className="offer-bar-track" aria-hidden="true">
                <span style={{ '--bar-size': '100%' } as CSSProperties} />
              </div>
            </div>
          </div>
          <div className="offer-saving">
            <strong>Planned</strong>
            <span>rates apply only if services launch, you are eligible and you enroll</span>
          </div>
        </figure>
      </div>
    </section>
  )
}
