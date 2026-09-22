import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LiveOfferStrip } from '../components/landing/LiveOfferStrip'
import { ResultExampleCard } from '../components/landing/ResultExampleCard'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { resultExamples } from '../data/productExamples'
import { setQuizSource, track } from '../lib/analytics'

export function ProductExamplesPage() {
  useEffect(() => {
    document.title = 'Peptis product examples'
    setQuizSource('go_examples')
    track('landing_viewed', { page: '/go/examples', brand: 'examples', source: 'go_examples' })
  }, [])

  return (
    <div className="site">
      <Header />
      <main id="main">
        <section className="section">
          <div className="section-inner">
            <p className="eyebrow">Operator and ad examples</p>
            <h1>Every written-summary permutation</h1>
            <p>
              Fifteen example records from the four continuity pathways. Labeled examples, not
              patient results. Use these for creative review. This path is not indexed.
            </p>
            <p>
              <Link className="btn btn-primary" to="/quiz">
                Get my free summary
              </Link>
            </p>
          </div>
        </section>
        <LiveOfferStrip source="go_examples" />
        <section className="section">
          <div className="section-inner">
            <div className="result-example-grid is-full">
              {resultExamples.map((example) => (
                <ResultExampleCard key={example.id} example={example} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
