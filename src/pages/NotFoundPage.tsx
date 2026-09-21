import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

export function NotFoundPage() {
  return (
    <div className="site">
      <Header />
      <main className="notice-page">
        <section className="section">
          <div className="notice-inner">
            <p className="eyebrow">404</p>
            <h1>This page is not on Peptis</h1>
            <p>The address may be mistyped, or the page was moved.</p>
            <p>
              <Link className="btn btn-primary" to="/">
                Back to the home page
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
