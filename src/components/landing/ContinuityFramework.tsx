import { useEffect, useState, type CSSProperties } from 'react'
import { useSectionView } from '../../hooks/useSectionView'

const framework = [
  {
    number: '01',
    title: 'Assess',
    body: 'Understand your baseline, current routine, nutrition, strength and function.',
  },
  {
    number: '02',
    title: 'Build',
    body: 'Make protein and meal structure workable when appetite or food volume changes.',
  },
  {
    number: '03',
    title: 'Train',
    body: 'Use progressive resistance work to support strength and daily capability.',
  },
  {
    number: '04',
    title: 'Recover',
    body: 'Support fluids, fiber, sleep and meals that fit your comfort and tolerance.',
  },
  {
    number: '05',
    title: 'Measure',
    body: 'Track strength, function, waist, habits and symptoms alongside body weight.',
  },
] as const

export function ContinuityFramework() {
  const sectionRef = useSectionView<HTMLElement>('continuity_framework')
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
      { threshold: 0.3 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [sectionRef])

  return (
    <section
      className={`section section-forest framework-section${visible ? ' is-visible' : ''}`}
      id="framework"
      ref={sectionRef}
      aria-labelledby="framework-heading"
    >
      <div className="section-inner">
        <div className="section-head">
          <p className="eyebrow">The Peptis continuity framework</p>
          <h2 id="framework-heading">Five parts that keep the whole picture in view</h2>
          <p>
            This is the evidence led framework planned for Peptis Core Continuity. It describes
            how the future program is being designed, not a promised clinical result.
          </p>
        </div>
        <ol className="framework-grid">
          {framework.map((item, index) => (
            <li
              className="framework-card"
              key={item.title}
              style={{ '--wave-index': index } as CSSProperties}
            >
              <span className="framework-number" aria-hidden="true">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
