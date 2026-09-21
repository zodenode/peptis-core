import { useSectionView } from '../../hooks/useSectionView'

export function RegainGraph() {
  const ref = useSectionView<HTMLElement>('regain_graph')

  return (
    <section className="section visual-regain" ref={ref} aria-labelledby="regain-heading">
      <div className="section-inner regain-layout">
        <div className="section-head">
          <p className="eyebrow">Maintenance starts early</p>
          <h2 id="regain-heading">About two thirds of the loss returned after withdrawal</h2>
          <p>
            In the STEP 1 extension, participants regained about two thirds of prior weight loss one
            year after semaglutide and lifestyle support ended. That is chronic biology, not
            personal failure. This is trial evidence, not a Peptis outcome.
          </p>
        </div>
        <figure className="regain-figure">
          <svg viewBox="0 0 360 180" role="img" aria-labelledby="regain-title regain-desc">
            <title id="regain-title">STEP 1 extension regain after withdrawal</title>
            <desc id="regain-desc">
              A line falling during treatment then rising about two thirds of the way back one year
              after stopping.
            </desc>
            <polyline
              className="regain-line"
              fill="none"
              points="20,40 140,120 340,68"
            />
            <circle cx="20" cy="40" r="4" />
            <circle cx="140" cy="120" r="4" />
            <circle cx="340" cy="68" r="4" />
            <text x="20" y="28">Start</text>
            <text x="110" y="168">End of treatment</text>
            <text x="250" y="56">One year later</text>
          </svg>
          <figcaption>
            Source: Wilding et al., STEP 1 extension, Diabetes, Obesity and Metabolism, 2022,
            dossier [9]. Evidence reviewed through August 21, 2026.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
