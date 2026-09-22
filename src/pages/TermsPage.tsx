import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { COMPANY, companyPostalBlock } from '../data/company'

export function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service | Peptis'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="site">
      <Header variant="quiz" />
      <main className="notice-page">
        <section className="section">
          <div className="notice-inner">
            <p className="eyebrow">Legal</p>
            <h1>Terms of Service</h1>
            <p className="notice-updated">Effective and last updated: September 22, 2026</p>
            <p>
              These terms govern your use of peptis.com and related Peptis tools operated by{' '}
              {COMPANY.legalName}, trading as {COMPANY.tradeName}. By using the site you agree to
              these terms. If you do not agree, do not use the site.
            </p>

            <h2>What Peptis offers today</h2>
            <p>
              The live tools are a free continuity check, a written summary of your priorities, and
              a two-day strength starter plan. These tools are education. They are not medical care,
              a diagnosis, a prescription, clinician review or pharmacy fulfillment.
            </p>
            <p>
              The Lean Mass nutrition box is the first paid product we intend to sell, at an
              intended $59 a month. Reserving interest is not a purchase. Nothing is charged until
              we can take payment, ship, and you choose to buy.
            </p>
            <p>Clinical services are not offered today.</p>

            <h2>Accounts and email</h2>
            <p>
              If you leave an email, we may send the requested summary, the starter plan, and
              operational updates you asked for. Marketing email is sent only when you opt in. You
              can unsubscribe from the link in those messages.
            </p>

            <h2>Health information</h2>
            <p>
              Some quiz answers can be consumer health data. We ask for consent before you start. Individual answers stay in your browser; requested summary priorities are saved with your contact details. See the{' '}
              <Link to="/health-data">Consumer Health Data Notice</Link> and the{' '}
              <Link to="/privacy">Privacy Policy</Link>.
            </p>

            <h2>Acceptable use</h2>
            <p>
              Do not misuse the site, attempt unauthorized access, or use the tools to provide
              medical advice to others as if they were Peptis care.
            </p>

            <h2>No professional advice</h2>
            <p>
              Content on this site, including publication essays and training templates, is
              education from cited sources. It is not a substitute for advice from your own
              clinician. Study averages do not guarantee individual outcomes. Lean mass is not
              skeletal muscle.
            </p>

            <h2>Supplements</h2>
            <p>
              If we later sell the nutrition box, those products are dietary supplements. They are
              not medicines and do not treat medication side effects.
            </p>

            <h2>Disclaimer of warranties and limitation of liability</h2>
            <p>
              The site is provided as is. To the fullest extent permitted by law, {COMPANY.legalName}{' '}
              is not liable for indirect or consequential damages arising from use of the education
              tools. Some jurisdictions do not allow certain limitations.
            </p>

            <h2>Governing law</h2>
            <p>These terms are governed by the laws of the State of Wyoming, without regard to conflict of law rules.</p>

            <h2>Contact</h2>
            <pre className="legal-address">{companyPostalBlock()}</pre>
            <p>
              Questions: <a href={`mailto:${COMPANY.supportEmail}`}>{COMPANY.supportEmail}</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
