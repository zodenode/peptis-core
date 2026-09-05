import { useEffect, useRef, useState, type CSSProperties } from 'react'
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

const AMPLITUDE = 9 // px, shared by cards and line
const WAVELENGTHS = 1 // full sine cycles across the row
const CARD_X = framework.map((_, i) => (i + 0.5) / framework.length)

function waveY(fraction: number, phase: number) {
  return AMPLITUDE * Math.sin(2 * Math.PI * WAVELENGTHS * fraction - phase)
}

/* One SVG sine path sampled from the same equation the cards use. */
function linePath(phase: number) {
  const points: string[] = []
  for (let x = 0; x <= 1000; x += 20) {
    const y = 30 + waveY(x / 1000, phase)
    points.push(`${points.length === 0 ? 'M' : 'L'}${x} ${y.toFixed(2)}`)
  }
  return points.join(' ')
}

export function ContinuityFramework() {
  const sectionRef = useSectionView<HTMLElement>('continuity_framework')
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState(0)
  const ticking = useRef(false)

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

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const update = () => {
      ticking.current = false
      const rect = element.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the section top enters the viewport bottom, 1 when its bottom leaves the top.
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh)))
      setPhase(progress * Math.PI * 3)
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
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
        <div className="framework-row">
          <svg
            className="framework-line"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d={linePath(phase)} vectorEffect="non-scaling-stroke" />
          </svg>
          <ol className="framework-grid">
            {framework.map((item, index) => (
              <li
                className="framework-card"
                key={item.title}
                style={
                  {
                    '--entrance-index': index,
                    '--wave-y': `${waveY(CARD_X[index], phase).toFixed(2)}px`,
                  } as CSSProperties
                }
              >
                <span className="framework-number" aria-hidden="true">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
