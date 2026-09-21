import { useState } from 'react'
import { useSectionView } from '../../hooks/useSectionView'

export function CompositionCompareSlider() {
  const ref = useSectionView<HTMLElement>('composition_compare')
  const [split, setSplit] = useState(58)

  return (
    <section className="section visual-compare" ref={ref} aria-labelledby="compare-heading">
      <div className="section-inner">
        <div className="section-head">
          <p className="eyebrow">Move the slider</p>
          <h2 id="compare-heading">The scale is one number. The scan is two tissues.</h2>
          <p>
            This is an education graphic from the SURMOUNT 1 DXA substudy, not a Peptis before and
            after. About 75% of lost weight was fat mass and about 25% was lean mass. Lean mass is
            not skeletal muscle. Individual results vary.
          </p>
        </div>
        <figure className="compare-frame">
          <div className="compare-stage" style={{ ['--split' as string]: `${split}%` }}>
            <div className="compare-panel is-before">
              <strong>Scale only</strong>
              <p>One total. No fat. No lean. No strength.</p>
            </div>
            <div className="compare-panel is-after">
              <strong>What the substudy measured</strong>
              <p>About 75% fat mass lost, 25% lean mass lost.</p>
              <div className="compare-bars" aria-hidden="true">
                <span className="is-fat" style={{ width: '75%' }}>
                  Fat
                </span>
                <span className="is-lean" style={{ width: '25%' }}>
                  Lean
                </span>
              </div>
            </div>
            <div className="compare-divider" aria-hidden="true" />
          </div>
          <label className="compare-control">
            <span className="visually-hidden">Reveal the scan composition</span>
            <input
              type="range"
              min={8}
              max={92}
              value={split}
              onChange={(event) => setSplit(Number(event.target.value))}
            />
          </label>
          <figcaption>
            Source: Look et al., SURMOUNT 1 DXA substudy, 160 paired scans, 2025, dossier [12].
            Education only.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
