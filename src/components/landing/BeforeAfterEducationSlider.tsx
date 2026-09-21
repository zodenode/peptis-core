import { useState } from 'react'
import { useSectionView } from '../../hooks/useSectionView'

export function BeforeAfterEducationSlider() {
  const ref = useSectionView<HTMLElement>('before_after_education')
  const [split, setSplit] = useState(50)

  return (
    <section className="section visual-compare" ref={ref} aria-labelledby="ba-heading">
      <div className="section-inner">
        <div className="section-head">
          <p className="eyebrow">Educational before and after</p>
          <h2 id="ba-heading">Treatment on. Treatment off. The same person is not a Peptis patient.</h2>
          <p>
            Drag to compare two trial time points from the STEP 1 extension. This is a teaching
            graphic, not a customer photo and not a Peptis result. After withdrawal, participants
            regained about two thirds of the prior weight loss.
          </p>
        </div>
        <figure className="compare-frame ba-frame">
          <div className="compare-stage" style={{ ['--split' as string]: `${split}%` }}>
            <div className="compare-panel is-before ba-on">
              <strong>End of treatment</strong>
              <p>Lowest recorded mean weight in the extension cohort.</p>
              <span className="ba-stat">−15.2%</span>
            </div>
            <div className="compare-panel is-after ba-off">
              <strong>One year after stopping</strong>
              <p>About two thirds of that loss had returned.</p>
              <span className="ba-stat">−5.6%</span>
            </div>
            <div className="compare-divider" aria-hidden="true" />
          </div>
          <label className="compare-control">
            <span className="visually-hidden">Compare treatment-on and treatment-off trial averages</span>
            <input
              type="range"
              min={8}
              max={92}
              value={split}
              onChange={(event) => setSplit(Number(event.target.value))}
            />
          </label>
          <figcaption>
            Source: Wilding et al., STEP 1 extension, Diabetes, Obesity and Metabolism, 2022,
            dossier [9]. Percentages are trial means, not a promise. Education only.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
