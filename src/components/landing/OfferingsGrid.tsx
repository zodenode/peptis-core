import { Link } from 'react-router-dom'
import { offeringPillars } from '../../data/offerings'
import { useSectionView } from '../../hooks/useSectionView'

export function OfferingsGrid() {
  const ref = useSectionView<HTMLElement>('offerings')

  return (
    <section className="section section-mist" id="offerings" ref={ref} aria-labelledby="offerings-heading">
      <div className="section-inner">
        <div className="section-head">
          <p className="eyebrow">What Peptis offers</p>
          <h2 id="offerings-heading">Continuity coaching, training, lean-mass support and clinical adjuncts</h2>
          <p>
            Built for adults on or after GLP-1 therapy: one coaching and nutrition programme, one
            training system, one curated supplement bundle, and clinician-directed adjunct
            medications when services launch.
          </p>
        </div>
        <div className="offering-grid">
          {offeringPillars.map((pillar) => (
            <article className="offering-card" key={pillar.id}>
              <div className="offering-card-meta">
                <span>{pillar.eyebrow}</span>
                <span
                  className={`offering-status is-${pillar.status === 'available-now' ? 'now' : 'planned'}`}
                >
                  {pillar.status === 'available-now' ? 'Available now' : 'Programme planned'}
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
            Full programme scope and core Supliful bundle <b>→</b>
          </Link>
        </p>
      </div>
    </section>
  )
}
