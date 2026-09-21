import { useState } from 'react'
import { useSectionView } from '../../hooks/useSectionView'

export function ProteinRangeControl() {
  const ref = useSectionView<HTMLElement>('protein_range')
  const [grams, setGrams] = useState(1.4)

  return (
    <section className="section visual-protein" ref={ref} aria-labelledby="protein-range-heading">
      <div className="section-inner">
        <div className="section-head">
          <p className="eyebrow">A range, not one number for everyone</p>
          <h2 id="protein-range-heading">Reviews support about 1.2 to 1.6 g/kg in context</h2>
          <p>
            Move the control to see the published range. The body-weight denominator and medical
            status need individual guidance. Protein supports training. It does not replace it.
          </p>
        </div>
        <label className="protein-range">
          <span>
            {grams.toFixed(1)} g/kg/day
            {grams < 1.2 || grams > 1.6 ? ' (outside the commonly cited band)' : ' (inside the cited band)'}
          </span>
          <input
            type="range"
            min={0.8}
            max={2.2}
            step={0.1}
            value={grams}
            onChange={(event) => setGrams(Number(event.target.value))}
          />
        </label>
        <p className="evidence-source">
          Nunes et al., 2022 and Leidy et al., 2015, dossier [24, 25]. Education only. Individual
          results vary.
        </p>
      </div>
    </section>
  )
}
