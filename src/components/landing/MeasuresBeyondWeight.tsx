import { useSectionView } from '../../hooks/useSectionView'

const measures = [
  {
    label: 'The scale',
    value: 'Limited',
    body: 'Body weight can fall while strength, protein intake and daily function stay hidden.',
  },
  {
    label: 'Strength',
    value: 'Track this',
    body: 'Load, repetitions, grip or a timed chair rise show whether capability is holding.',
  },
  {
    label: 'Protein days',
    value: 'Track this',
    body: 'Count meals that actually deliver a workable amount of protein when appetite is low.',
  },
  {
    label: 'Daily function',
    value: 'Track this',
    body: 'Stairs, carrying, walking tolerance and recovery tell a clearer story than a single scan.',
  },
] as const

export function MeasuresBeyondWeight() {
  const sectionRef = useSectionView<HTMLElement>('measures_beyond_weight')

  return (
    <section
      className="section measures-section"
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
          {measures.map((item) => (
            <article className={`measure-card${item.label === 'The scale' ? ' is-limited' : ''}`} key={item.label}>
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
