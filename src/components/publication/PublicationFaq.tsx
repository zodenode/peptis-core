import type { FaqItem } from '../../lib/publicationDiscoverability'

type Props = {
  items: FaqItem[]
}

export function PublicationFaq({ items }: Props) {
  return (
    <section className="pub-faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading">Questions this essay answers</h2>
      {items.map((item, index) => (
        <details key={item.q} open={index === 0}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </section>
  )
}
