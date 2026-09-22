import { Link } from 'react-router-dom'
import { liveOffers } from '../../data/productExamples'
import { setQuizSource, track } from '../../lib/analytics'

type Props = {
  source?: string
}

export function LiveOfferStrip({ source = 'live_offers' }: Props) {
  return (
    <section className="section live-offers" id="live-today" aria-labelledby="live-offers-heading">
      <div className="section-inner">
        <div className="section-head">
          <p className="eyebrow">Start here</p>
          <h2 id="live-offers-heading">Your next step with Peptis</h2>
          <p>No payment details. Clinical services are not offered. The nutrition box is coming later.</p>
        </div>
        <div className="live-offer-grid">
          {liveOffers.map((offer) => (
            <article className="live-offer-card" key={offer.id}>
              <p className="live-offer-status">{offer.status}</p>
              <h3>{offer.title}</h3>
              <p>{offer.body}</p>
              <Link
                className="editorial-link"
                to={offer.href}
                onClick={() => {
                  if (offer.id === 'check' || offer.id === 'box') {
                    setQuizSource(`${source}_${offer.id}`)
                    track('quiz_cta_clicked', { location: `${source}_${offer.id}` })
                  }
                  if (offer.id === 'box') track('box_reserve_clicked', { source: `${source}_${offer.id}` })
                }}
              >
                {offer.cta} <b>→</b>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
