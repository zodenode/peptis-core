import { useEffect, useState } from 'react'
import { useSectionView } from '../../hooks/useSectionView'

type MeasureId = 'scale' | 'strength' | 'protein' | 'function'

const measures: Array<{
  id: MeasureId
  label: string
  value: string
  body: string
  limited?: boolean
}> = [
  {
    id: 'scale',
    label: 'The scale',
    value: 'Limited on its own',
    body: 'Body weight can fall while strength, protein intake and daily function stay hidden.',
    limited: true,
  },
  {
    id: 'strength',
    label: 'Strength',
    value: 'Track load and reps',
    body: 'Load, repetitions, grip or a timed chair rise show whether capability is holding.',
  },
  {
    id: 'protein',
    label: 'Protein days',
    value: 'Track protein meals',
    body: 'Count meals that actually deliver a workable amount of protein when appetite is low.',
  },
  {
    id: 'function',
    label: 'Daily function',
    value: 'Track everyday tasks',
    body: 'Stairs, carrying, walking tolerance and recovery tell a clearer story than a single scan.',
  },
]

function MeasureSketch({ id }: { id: MeasureId }) {
  if (id === 'scale') {
    return (
      <svg viewBox="0 0 120 48" aria-hidden="true" className="measure-sketch">
        <path
          className="sketch-line sketch-line-muted"
          d="M6 12 C 30 14, 48 22, 66 30"
          fill="none"
        />
        <path
          className="sketch-line sketch-line-dashed"
          d="M66 30 C 84 38, 100 40, 114 41"
          fill="none"
        />
        <text className="sketch-question" x="98" y="26">
          ?
        </text>
      </svg>
    )
  }
  if (id === 'strength') {
    return (
      <svg viewBox="0 0 120 48" aria-hidden="true" className="measure-sketch">
        {[10, 32, 54, 76, 98].map((x, i) => (
          <rect
            className="sketch-bar"
            key={x}
            x={x}
            width="12"
            rx="3"
            y={40 - (i + 1) * 6.5}
            height={(i + 1) * 6.5 + 2}
            style={{ transitionDelay: `${0.15 + i * 0.12}s` }}
          />
        ))}
      </svg>
    )
  }
  if (id === 'protein') {
    return (
      <svg viewBox="0 0 120 48" aria-hidden="true" className="measure-sketch">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <circle
            className={`sketch-dot${i === 2 || i === 5 ? ' sketch-dot-open' : ''}`}
            key={i}
            cx={12 + i * 16}
            cy="24"
            r="6"
            style={{ transitionDelay: `${0.15 + i * 0.09}s` }}
          />
        ))}
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 120 48" aria-hidden="true" className="measure-sketch">
      <path
        className="sketch-line"
        d="M6 42 H 28 V 32 H 50 V 22 H 72 V 12 H 94 V 6 H 114"
        fill="none"
      />
    </svg>
  )
}

export function MeasuresBeyondWeight() {
  const sectionRef = useSectionView<HTMLElement>('measures_beyond_weight')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0.25 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [sectionRef])

  return (
    <section
      className={`section measures-section${visible ? ' is-visible' : ''}`}
      id="measures"
      ref={sectionRef}
      aria-labelledby="measures-heading"
    >
      <div className="section-inner">
        <div className="section-head">
          <p className="eyebrow">What a number cannot show</p>
          <h2 id="measures-heading">The scale cannot tell you if you are keeping strength</h2>
          <p>
            Body composition can improve even when absolute lean tissue falls. Strength can stay
            stable while a scan changes. Measure both.
          </p>
        </div>
        <div className="measure-grid">
          {measures.map((item, index) => (
            <article
              className={`measure-card${item.limited ? ' is-limited' : ''}`}
              key={item.id}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <MeasureSketch id={item.id} />
              <p className="measure-kicker">{item.value}</p>
              <h3>{item.label}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <p className="evidence-source">
          Source framing: Langer et al., <cite>Cell Metabolism</cite>, 2026, dossier [16], and
          Bellicha et al., <cite>Obesity Reviews</cite>, 2021, dossier [21]. Function is not the
          same as a lean mass estimate.
        </p>
      </div>
    </section>
  )
}
