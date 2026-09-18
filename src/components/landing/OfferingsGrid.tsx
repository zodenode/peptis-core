import { Link } from 'react-router-dom'
import { offeringPillars } from '../../data/offerings'
import { useSectionView } from '../../hooks/useSectionView'

export function OfferingsGrid() {
  const ref = useSectionView<HTMLElement>('offerings')

  return (
    <section className="section section-mist" id="offerings" ref={ref} aria-labelledby="offerings-heading">
      <div className="section-inner">
        <div className="section-head">
          <p className="eyebrow">What you can do today</p>
          <h2 id="offerings-heading">A free continuity check, then a box you can buy later</h2>
          <p>
            The quiz, written summary and starter training plan are available now. The Lean Mass
            nutrition box is the first paid product we intend to sell, at $59 a month. It is not
            for sale yet. There is no paid clinical programme to join today.
          </p>
        </div>
        <div className="offering-grid">
          {offeringPillars.map((pillar) => (
            <article className="offering-card" key={pillar.id}>
              <div className="offering-card-meta">
                <span>{pillar.eyebrow}</span>
                <span
                  className={`offering-status is-${pillar.status === 'programme-planned' ? 'planned' : 'now'}`}
                >
                  {pillar.statusLabel}
                </span>
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.summary}</p>
              <Link className="editorial-link" to={pillar.href}>
                {pillar.cta} <b>→</b>
              </Link>
            </article>
          ))}
        </div>
        <p className="offerings-more">
          <Link className="editorial-link" to="/offerings">
            Full programme scope, including what is still planned <b>→</b>
          </Link>
        </p>
      </div>
    </section>
  )
}
