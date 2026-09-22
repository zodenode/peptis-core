import { useEffect } from 'react'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { COMPANY, companyPostalBlock } from '../data/company'

export function ContactPage() {
  useEffect(() => {
    document.title = 'Contact | Peptis'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="site">
      <Header variant="quiz" />
      <main className="notice-page">
        <section className="section">
          <div className="notice-inner">
            <p className="eyebrow">Company</p>
            <h1>Contact Peptis</h1>
            <p>
              {COMPANY.legalName} is a {COMPANY.jurisdiction} limited liability company, trading as{' '}
              {COMPANY.tradeName}.
            </p>
            <h2>Postal address</h2>
            <pre className="legal-address">{companyPostalBlock()}</pre>
            <h2>Email</h2>
            <p>
              Support: <a href={`mailto:${COMPANY.supportEmail}`}>{COMPANY.supportEmail}</a>
              <br />
              Privacy: <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>
            </p>
            <p>{COMPANY.responseTime}</p>
            <h2>What we can help with</h2>
            <p>
              Questions about the free continuity check, the starter plan, nutrition-box updates, or
              a privacy request. We cannot provide medical advice, prescriptions or pharmacy
              fulfillment.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
