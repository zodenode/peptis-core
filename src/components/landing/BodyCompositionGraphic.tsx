import { useSectionView } from '../../hooks/useSectionView'

export function BodyCompositionGraphic() {
  const sectionRef = useSectionView<HTMLElement>('body_composition_evidence')

  return (
    <section
      className="section evidence-composition"
      id="evidence"
      ref={sectionRef}
      aria-labelledby="composition-heading"
    >
      <div className="section-inner composition-layout">
        <div className="section-head">
          <p className="eyebrow">What the scans measured</p>
          <h2 id="composition-heading">Weight loss contains more than one kind of tissue</h2>
          <p>
            In a SURMOUNT 1 body composition substudy, roughly three quarters of the weight lost
            was fat mass and one quarter was lean mass. That lean portion was not all muscle.
          </p>
          <div className="composition-legend" aria-hidden="true">
            <span><i className="legend-fat" />75% fat mass</span>
            <span><i className="legend-lean" />25% lean mass</span>
          </div>
        </div>

        <figure className="composition-figure">
          <svg
            className="composition-donut"
            viewBox="0 0 220 220"
            role="img"
            aria-labelledby="composition-chart-title composition-chart-description"
          >
            <title id="composition-chart-title">Composition of weight lost in the SURMOUNT 1 DXA substudy</title>
            <desc id="composition-chart-description">
              About 75 percent of weight lost was fat mass and 25 percent was lean mass.
            </desc>
            <circle className="donut-track" cx="110" cy="110" r="78" pathLength="100" />
            <circle className="donut-fat" cx="110" cy="110" r="78" pathLength="100" />
            <circle className="donut-lean" cx="110" cy="110" r="78" pathLength="100" />
            <text className="donut-value" x="110" y="105" textAnchor="middle">75 / 25</text>
            <text className="donut-label" x="110" y="128" textAnchor="middle">fat and lean mass</text>
          </svg>
          <figcaption>
            <strong>Lean mass is broader than muscle.</strong>
            A DEXA lean mass estimate includes body water, organs, connective tissue, bone mineral
            and skeletal muscle. It cannot show muscle loss, strength or function on its own.
          </figcaption>
        </figure>

        <p className="evidence-source">
          Source: Look et al., SURMOUNT 1 DXA substudy, <cite>Diabetes, Obesity and Metabolism</cite>,
          2025, dossier reference [12]. Substudy with 160 paired scans.
        </p>
      </div>
    </section>
  )
}
