import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSectionView } from '../../hooks/useSectionView'
import { setQuizSource, track } from '../../lib/analytics'

const MIN_LB = 8
const MAX_LB = 80
const DEFAULT_LB = 20
const LEAN_SHARE = 0.25

export function LeanMassPreview() {
  const sectionRef = useSectionView<HTMLElement>('lean_mass_preview')
  const [pounds, setPounds] = useState(DEFAULT_LB)
  const leanPounds = Math.round(pounds * LEAN_SHARE)

  return (
    <section
      className="section lean-preview"
      id="preview"
      ref={sectionRef}
      aria-labelledby="preview-heading"
    >
      <div className="section-inner lean-preview-inner">
        <div className="section-head">
          <p className="eyebrow">A study pattern, not a prediction</p>
          <h2 id="preview-heading">If the scale already moved, some of that loss was lean mass</h2>
          <p>
            In the SURMOUNT 1 DXA substudy, about 25% of weight lost was lean mass. Lean mass is
            not all muscle. Use the slider to see that group average on a number you recognize.
          </p>
        </div>

        <div className="lean-preview-card">
          <label className="lean-preview-label" htmlFor="weight-lost">
            Weight you have already lost
          </label>
          <div className="lean-preview-value">
            <strong>{pounds}</strong>
            <span>lb</span>
          </div>
          <input
            id="weight-lost"
            className="lean-preview-slider"
            type="range"
            min={MIN_LB}
            max={MAX_LB}
            step={1}
            value={pounds}
            aria-valuemin={MIN_LB}
            aria-valuemax={MAX_LB}
            aria-valuenow={pounds}
            aria-valuetext={`${pounds} pounds lost`}
            onChange={(event) => setPounds(Number(event.target.value))}
            onPointerUp={(event) => {
              track('lean_preview_adjusted', { pounds_lost: Number(event.currentTarget.value) })
            }}
          />
          <div className="lean-preview-result">
            <p className="lean-preview-kicker">About this much may have been lean mass</p>
            <p className="lean-preview-output">
              <strong>{leanPounds} lb</strong>
              <span>at the 25% study share</span>
            </p>
            <p className="lean-preview-note">
              That figure is a group average from 160 paired scans. It is not your result, and it
              cannot tell you how much was skeletal muscle, water or other lean tissue.
            </p>
          </div>
          <Link
            className="btn btn-primary"
            to="/quiz"
            onClick={() => {
              setQuizSource('lean_preview')
              track('quiz_cta_clicked', { location: 'lean_preview' })
            }}
          >
            Get my free summary
          </Link>
        </div>

        <p className="evidence-source">
          Source: Look et al., SURMOUNT 1 DXA substudy, <cite>Diabetes, Obesity and Metabolism</cite>,
          2025, dossier reference [12]. A broader network analysis of 22 trials also estimated about
          25% lean mass. Karakasis et al., 2025, dossier [13].
        </p>
      </div>
    </section>
  )
}
