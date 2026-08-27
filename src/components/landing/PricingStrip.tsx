import { Link } from 'react-router-dom'
import { setQuizSource, track } from '../../lib/analytics'

export function PricingStrip() {
  return (
    <section className="pricing-strip" aria-label="Planned pricing at a glance">
      <div className="pricing-strip-inner">
        <div className="pricing-strip-items">
          <div>
            <strong>$0</strong>
            <span>due today</span>
          </div>
          <div>
            <strong>$299/mo</strong>
            <span>planned founding rate</span>
          </div>
          <div>
            <strong>$399/mo</strong>
            <span>planned standard rate</span>
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
          Reserve for $0
        </Link>
      </div>
      <p className="pricing-strip-note">
        Planned rates apply only if services launch in your state, you are eligible and you choose
        to enroll under the final terms. Not medical care today.
      </p>
    </section>
  )
}
