import { useSectionView } from '../../hooks/useSectionView'

const evidence = [
  {
    value: 'About 0.8 kg',
    title: 'More lean mass retained',
    body: 'Resistance training reduced lean mass loss by about 0.8 kg during general weight loss in an overview of 12 systematic reviews covering 149 studies.',
    source: 'Bellicha et al., Obesity Reviews, 2021 [21]. General weight loss evidence, not GLP-1 specific.',
  },
  {
    value: '1.2 to 1.6 g/kg',
    title: 'A useful protein range in context',
    body: 'Reviews support this daily range, with 25 to 30 grams per meal as a practical target for many active weight loss settings.',
    source: 'Nunes et al., 2022 and Leidy et al., 2015 [24, 25]. The body weight denominator and medical status require individual guidance.',
  },
  {
    value: 'About two thirds',
    title: 'Regained after withdrawal',
    body: 'One year after semaglutide and lifestyle support ended in the STEP 1 extension, participants regained about two thirds of their prior weight loss.',
    source: 'Wilding et al., Diabetes, Obesity and Metabolism, 2022 [9]. This reflects chronic biology, not personal failure.',
  },
] as const

export function EvidenceCards() {
  const sectionRef = useSectionView<HTMLElement>('evidence_support')

  return (
    <section
      className="section section-mist evidence-support"
      id="research"
      ref={sectionRef}
      aria-labelledby="evidence-support-heading"
    >
      <div className="section-inner">
        <div className="section-head">
          <p className="eyebrow">What the evidence supports most strongly</p>
          <h2 id="evidence-support-heading">Build around strength, workable nutrition and maintenance</h2>
          <p>
            These findings inform the Peptis framework. They do not show that Peptis causes a
            specific outcome.
          </p>
        </div>
        <div className="evidence-card-grid">
          {evidence.map((item, index) => (
            <article className="evidence-card" key={item.title}>
              <span className="evidence-rank">0{index + 1}</span>
              <p className="evidence-value">{item.value}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <small>{item.source}</small>
            </article>
          ))}
        </div>
        <details className="evidence-note">
          <summary>How to read these numbers</summary>
          <p>
            Study averages describe groups, not what one person should expect. Body composition
            methods estimate different tissues, and evidence from general weight loss cannot be
            assumed to prove the same effect during GLP-1 treatment. Protein needs also change with
            age, health, body size and clinical context.
          </p>
        </details>
        <p className="evidence-review">
          Evidence reviewed through August 21, 2026. For education only. Individual results vary.
        </p>
      </div>
    </section>
  )
}
