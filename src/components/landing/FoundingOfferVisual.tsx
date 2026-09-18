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
          <p className="eyebrow eyebrow-light">Free check, then a $0 launch list</p>
          <h2 id="offer-heading">Get the summary now. There is no paid programme to join today.</h2>
          <p>
            The continuity check is free. Joining the list costs $0. Coaching staff, the
            supplement bundle and a GLP subscription are not for sale yet. If they later launch in
            your state, you would still have to review the terms and choose to enroll.
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
            Get my free summary
          </Link>
          <p className="offer-caveat">
            No charge now. No payment details. Pricing is subject to final launch terms.
          </p>
        </div>

        <figure className="offer-visual" aria-labelledby="offer-chart-title">
          <figcaption id="offer-chart-title">What is for sale today</figcaption>
          <p className="visually-hidden">
            Joining the list costs nothing. There is no paid Peptis programme, supplement bundle
            or GLP subscription for sale today.
          </p>
          <div className="offer-today">
            <span>Today</span>
            <strong>$0</strong>
            <small>to join the list</small>
          </div>
          <div className="offer-bars">
            <div className="offer-bar-row founding">
              <div className="offer-bar-label">
                <span>Paid continuity programme</span>
                <strong>Not for sale</strong>
              </div>
              <div className="offer-bar-track" aria-hidden="true">
                <span style={{ '--bar-size': '0%' } as CSSProperties} />
              </div>
            </div>
            <div className="offer-bar-row standard">
              <div className="offer-bar-label">
                <span>Supplement bundle</span>
                <strong>Not for sale</strong>
              </div>
              <div className="offer-bar-track" aria-hidden="true">
                <span style={{ '--bar-size': '0%' } as CSSProperties} />
              </div>
            </div>
          </div>
          <div className="offer-saving">
            <strong>Later</strong>
            <span>any price would appear only if a service actually launches and you enroll</span>
          </div>
        </figure>
      </div>
    </section>
  )
}
