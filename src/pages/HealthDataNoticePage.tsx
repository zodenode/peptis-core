import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

export function HealthDataNoticePage() {
  useEffect(() => {
    document.title = 'Consumer Health Data Notice: Peptis'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="site">
      <Header variant="quiz" />
      <main className="notice-page">
        <section className="section">
          <div className="notice-inner">
            <p className="eyebrow">Legal</p>
            <h1>Consumer Health Data Notice</h1>
            <p className="notice-updated">Last updated: August 27, 2026</p>
            <p>
              Some information collected on this website may be considered consumer health data
              under state laws such as the Washington My Health My Data Act. This notice explains
              what health related information we collect, why, and the rights you may have. Peptis
              is operated by Information Edge Insights LLC and is not providing medical care
              through this website.
            </p>

            <h2>Consumer health data we collect</h2>
            <ul>
              <li>
                Quiz answers about your GLP-1 treatment timeline, strength and daily function,
                energy, digestive comfort and maintenance goals.
              </li>
              <li>
                The summary categories derived from those answers, such as strength and function or
                digestive comfort.
              </li>
              <li>Your interest in optional future wellness products.</li>
            </ul>
            <p>
              We collect this data directly from you when you choose to answer the quiz, and we
              save your answers to our servers at each step so your summary can be completed if
              you step away. We do not collect health data from third parties, and we do not use
              geofencing.
            </p>

            <h2>Why we collect it</h2>
            <ul>
              <li>To build the educational summary you request at the end of the quiz.</li>
              <li>To organize your founding reservation and future launch communication.</li>
              <li>To understand, in aggregate, how the quiz is used and improve it.</li>
            </ul>

            <h2>Sharing</h2>
            <p>
              We do not sell consumer health data. We share it only with service providers that
              process it on our behalf, such as our hosting provider and analytics processor, under
              contractual obligations. We do not share health data with advertisers or data
              brokers.
            </p>

            <h2>Your rights</h2>
            <ul>
              <li>The right to know what consumer health data we collect and how it is shared.</li>
              <li>The right to withdraw consent and ask us to delete your health data.</li>
              <li>The right not to be discriminated against for exercising these rights.</li>
            </ul>
            <p>
              To exercise any of these rights, email{' '}
              <a href="mailto:privacy@peptis.com">privacy@peptis.com</a>. If your request is
              denied, you may appeal by replying to our decision, and we will review the appeal.
            </p>

            <h2>Related notices</h2>
            <p>
              Our general <Link to="/privacy">Privacy Notice</Link> describes all categories of
              information we collect and your broader choices.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
