import { Link } from 'react-router-dom'
import { pathwayCopy, type ProductExample } from '../../data/productExamples'

type Props = {
  example: ProductExample
  compact?: boolean
}

export function ResultExampleCard({ example, compact = false }: Props) {
  return (
    <article className={`result-example${compact ? ' is-compact' : ''}`}>
      <p className="result-example-kicker">Example record. Not a patient result.</p>
      <h3>{example.title}</h3>
      <p>{example.situation}</p>
      <ul>
        {example.pathways.map((id) => (
          <li key={id}>
            <strong>{pathwayCopy[id].label}</strong>
            <span>{pathwayCopy[id].priority}</span>
          </li>
        ))}
      </ul>
      {compact ? null : (
        <>
          <p className="result-example-plan">
            <strong>Starter plan: </strong>
            {example.plan}
          </p>
          <p>
            <Link className="editorial-link" to={example.essay.href}>
              {example.essay.title} <b>→</b>
            </Link>
          </p>
        </>
      )}
    </article>
  )
}
