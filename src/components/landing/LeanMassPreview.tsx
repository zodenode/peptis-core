import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useSectionView } from '../../hooks/useSectionView'
import { setQuizSource, track } from '../../lib/analytics'

const MIN_LB = 8
const MAX_LB = 80
const DEFAULT_LB = 20
const FAT_SHARE = 0.75
const LEAN_SHARE = 0.25
const DEMO_START_LB = 8

function barFillPercent(pounds: number) {
  return ((pounds - MIN_LB) / (MAX_LB - MIN_LB)) * 100
}

export function LeanMassPreview() {
  const sectionRef = useSectionView<HTMLElement>('lean_mass_preview')
  const [pounds, setPounds] = useState(DEMO_START_LB)
  const [visible, setVisible] = useState(false)
  const [demoDone, setDemoDone] = useState(false)
  const demoFrame = useRef(0)
  const leanPounds = Math.round(pounds * LEAN_SHARE)
  const fatPounds = Math.round(pounds * FAT_SHARE)
  const fillPct = barFillPercent(pounds)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.28 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [sectionRef])

  useEffect(() => {
    if (!visible || demoDone) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPounds(DEFAULT_LB)
      setDemoDone(true)
      return
    }

    const start = performance.now()
    const duration = 1400

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      const next = Math.round(DEMO_START_LB + (DEFAULT_LB - DEMO_START_LB) * eased)
      setPounds(next)
      if (t < 1) {
        demoFrame.current = requestAnimationFrame(tick)
      } else {
        setDemoDone(true)
        track('lean_preview_demo_played')
      }
    }

    demoFrame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(demoFrame.current)
  }, [visible, demoDone])

  return (
    <section
      className={`section lean-preview${visible ? ' is-visible' : ''}`}
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
            not all muscle. Drag the slider to see that group average on a number you recognize.
          </p>
        </div>

        <div className="lean-preview-card">
          <figure
            className="lean-preview-visual"
            aria-labelledby="lean-visual-title lean-visual-desc"
          >
            <figcaption id="lean-visual-title" className="lean-preview-label">
              Weight you have already lost
            </figcaption>
            <p id="lean-visual-desc" className="visually-hidden">
              A bar chart of {pounds} pounds lost, split into about {fatPounds} pounds from fat
              mass and {leanPounds} pounds from lean mass using the SURMOUNT 1 study shares.
            </p>
            <div className="lean-preview-total" aria-hidden="true">
              <strong key={pounds} className="lean-preview-total-value">
                {pounds}
              </strong>
              <span>lb total lost</span>
            </div>

            <div className="lean-preview-bar-track">
              <div
                className="lean-preview-bar-fill"
                style={{ '--bar-scale': `${fillPct}%` } as CSSProperties}
              >
                <span className="lean-preview-seg lean-preview-seg-fat">
                  <i />
                  <em>{fatPounds} lb</em>
                  <small>~75% fat mass</small>
                </span>
                <span className="lean-preview-seg lean-preview-seg-lean">
                  <i />
                  <em>{leanPounds} lb</em>
                  <small>~25% lean mass</small>
                </span>
              </div>
            </div>

            <div className="lean-preview-legend" aria-hidden="true">
              <span>
                <i className="legend-fat" />
                Fat mass share
              </span>
              <span>
                <i className="legend-lean" />
                Lean mass share
              </span>
            </div>
          </figure>

          <div className="lean-preview-slider-wrap">
            <label className="visually-hidden" htmlFor="weight-lost">
              Adjust weight lost in pounds
            </label>
            <input
              id="weight-lost"
              className="lean-preview-slider"
              type="range"
              min={MIN_LB}
              max={MAX_LB}
              step={1}
              value={pounds}
              style={{ '--bar-scale': `${fillPct}%` } as CSSProperties}
              aria-valuemin={MIN_LB}
              aria-valuemax={MAX_LB}
              aria-valuenow={pounds}
              aria-valuetext={`${pounds} pounds lost, about ${leanPounds} pounds lean mass at the study average`}
              onChange={(event) => {
                setDemoDone(true)
                setPounds(Number(event.target.value))
              }}
              onPointerUp={(event) => {
                track('lean_preview_adjusted', { pounds_lost: Number(event.currentTarget.value) })
              }}
            />
            <div className="lean-preview-slider-labels" aria-hidden="true">
              <span>{MIN_LB} lb</span>
              <span>{MAX_LB} lb</span>
            </div>
          </div>

          <div className="lean-preview-result">
            <p className="lean-preview-kicker">About this much may have been lean mass</p>
            <p className="lean-preview-output">
              <strong key={`lean-${leanPounds}`}>{leanPounds} lb</strong>
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
