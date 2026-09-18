import { Link } from 'react-router-dom'
import { offer } from '../../data/offer'
import { setQuizSource, track } from '../../lib/analytics'

export function PricingStrip() {
  return (
    <section className="pricing-strip" aria-label="Planned pricing at a glance">
      <div className="pricing-strip-inner">
        <div className="pricing-strip-items">
          <div>
            <strong>$0</strong>
            <span>today for summary and plan</span>
          </div>
          <div>
            <strong>{offer.leanMassBoxPriceLabel}</strong>
            <span>intended Lean Mass box</span>
          </div>
          <div>
            <strong>Not for sale</strong>
            <span>nothing ships today</span>
          </div>
        </div>
        <Link
          className="btn btn-primary"
          to="/quiz"
          onClick={() => {
            setQuizSource('pricing_strip')
            track('quiz_cta_clicked', { location: 'pricing_strip' })
          }}
        >
          Get my free summary
        </Link>
      </div>
      <p className="pricing-strip-note">
        $59 a month is the intended price for the Lean Mass nutrition box. It is not an offer until
        we can charge and ship. There is no paid clinical programme for sale. Not medical care today.
      </p>
    </section>
  )
}
