import { Link } from 'react-router-dom'
import type { LandingVariant } from '../../data/landingVariants'
import { offer } from '../../data/offer'
import { setQuizSource, track } from '../../lib/analytics'

type Props = {
  variant?: LandingVariant
}

export function PricingStrip({ variant }: Props) {
  const source = variant ? `${variant.source}_pricing` : 'pricing_strip'
  const midLabel = variant?.id === 'care' ? 'Not for sale' : offer.leanMassBoxPriceLabel

  return (
    <section className="pricing-strip" aria-label="Planned pricing at a glance">
      <div className="pricing-strip-inner">
        <div className="pricing-strip-items">
          <div>
            <strong>$0</strong>
            <span>{variant?.pricingLeft ?? 'today for summary and plan'}</span>
          </div>
          <div>
            <strong>{midLabel}</strong>
            <span>{variant?.pricingMid ?? 'intended Lean Mass box'}</span>
          </div>
          <div>
            <strong>No card</strong>
            <span>{variant?.pricingRight ?? 'reserve the box if you want it'}</span>
          </div>
        </div>
        <Link
          className="btn btn-primary"
          to={variant?.ctaTo ?? '/quiz'}
          onClick={() => {
            setQuizSource(source)
            track('quiz_cta_clicked', { location: source })
          }}
        >
          {variant?.ctaLabel ?? 'Get my free summary'}
        </Link>
      </div>
      <p className="pricing-strip-note">
        {variant?.pricingNote ??
          '$59 a month is the founding Lean Mass box rate when we can charge and ship. Reserve it with no card. Clinical services are not offered.'}
      </p>
    </section>
  )
}
