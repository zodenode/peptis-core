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
            The quiz, written summary and starter training plan are available now. Reserve the
            founding $59 Lean Mass box with no card if you want updates when it can ship.
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
            See the check, plan and founding box <b>→</b>
          </Link>
        </p>
      </div>
    </section>
  )
}
