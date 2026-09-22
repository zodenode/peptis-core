import { Link } from 'react-router-dom'
import { featuredResultExamples } from '../../data/productExamples'
import { ResultExampleCard } from './ResultExampleCard'

type Props = {
  limit?: number
  showAllLink?: boolean
}

export function ResultExamples({ limit = 4, showAllLink = true }: Props) {
  const items = featuredResultExamples.slice(0, limit)

  return (
    <section className="section result-examples" id="examples" aria-labelledby="examples-heading">
      <div className="section-inner">
        <div className="section-head">
          <p className="eyebrow">What the written summary looks like</p>
          <h2 id="examples-heading">Example priorities, not before and after photos</h2>
          <p>
            These are sample records from the four quiz pathways. They are teaching examples, not
            testimonials and not Peptis outcomes.
          </p>
        </div>
        <div className="result-example-grid">
          {items.map((example) => (
            <ResultExampleCard key={example.id} example={example} compact />
          ))}
        </div>
        {showAllLink ? (
          <p>
            <Link className="editorial-link" to="/go/examples">
              See every priority combination <b>→</b>
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  )
}
