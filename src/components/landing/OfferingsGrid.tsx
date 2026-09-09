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
          <h2 id="offerings-heading">
            Coaching, nutrition, GLP supplements, movement, training tips and adjunct medication
            pathways
          </h2>
          <p>
            Peptis is organised around solutions for adults on or after GLP-1 therapy: coaching and
            nutrition support, Supliful-sourced supplements, exercise programmes, training tips,
            and clinician-directed medications for problems that can arise while taking GLPs when
            services are available.
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
            Full offerings scope and Supliful stock lists <b>→</b>
          </Link>
        </p>
      </div>
    </section>
  )
}
