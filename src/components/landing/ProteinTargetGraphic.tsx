import { useEffect, useState } from 'react'
import { useSectionView } from '../../hooks/useSectionView'

export function ProteinTargetGraphic() {
  const sectionRef = useSectionView<HTMLElement>('protein_appetite')
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
      { threshold: 0.28 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [sectionRef])

  return (
    <section
      className={`section section-mist protein-section${visible ? ' is-visible' : ''}`}
      id="protein"
      ref={sectionRef}
      aria-labelledby="protein-heading"
    >
      <div className="section-inner protein-layout">
        <div className="section-head">
          <p className="eyebrow">When appetite falls</p>
          <h2 id="protein-heading">Protein gets harder to hit, not less important</h2>
          <p>
            Lower food volume leaves less room for snacks that skip protein. Reviews often use
            1.2 to 1.6 grams per kilogram per day, with 25 to 30 grams in a meal as a practical
            target. The right number still depends on you.
          </p>
        </div>

        <figure className="protein-figure">
          <figcaption>A practical per meal target, not a prescription</figcaption>
          <div
            className="protein-meter"
            role="img"
            aria-label="An animated guide showing a practical target of 25 to 30 grams of protein in a meal"
          >
            <span className="protein-fill" />
            <span className="protein-sheen" aria-hidden="true" />
            <strong>25 to 30 g</strong>
            <span className="protein-target-pulse" aria-hidden="true" />
          </div>
          <p className="protein-meter-note">
            A useful range for many active weight loss settings. Your personal target may differ.
          </p>
          <ul className="protein-points">
            <li>Food first when you can tolerate it</li>
            <li>Smaller, protein forward eating occasions</li>
            <li>A complete protein serving of about 20 to 25 g can close a gap</li>
            <li>Kidney, liver and other conditions need personal clinical guidance</li>
          </ul>
        </figure>

        <p className="evidence-source">
          Sources: Nunes et al., 2022 and Leidy et al., 2015, dossier [24, 25]. Appetite
          mechanism studies: Blundell et al., 2017 and Friedrichsen et al., 2021, dossier [19, 20].
          This is education, not a personal protein prescription.
        </p>
      </div>
    </section>
  )
}
