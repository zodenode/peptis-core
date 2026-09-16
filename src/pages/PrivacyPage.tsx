import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

export function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | Peptis'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="site">
      <Header variant="quiz" />
      <main className="notice-page">
        <section className="section">
          <div className="notice-inner">
            <p className="eyebrow">Legal</p>
            <h1>Privacy Policy</h1>
            <p className="notice-updated">Last updated: September 16, 2026</p>
            <p>
              Peptis is operated by Information Edge Insights LLC, a Wyoming limited liability
              company. This Privacy Policy explains how Peptis collects, uses, discloses and
              protects personal information when you use peptis.com, join a programme or waitlist,
              purchase products, communicate with us, or otherwise interact with our services.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li><strong>Account and contact information:</strong> name, email address, phone number, state, and information you provide when joining a programme, reservation or waitlist.</li>
              <li><strong>Programme and quiz information:</strong> information you choose to provide about your goals, treatment timeline, current provider or medication, nutrition, strength, exercise, energy, digestive comfort, routine and programme progress.</li>
              <li><strong>Order information:</strong> products selected, transaction status, shipping and related fulfilment information. Payment-card information may be collected directly by our payment processor rather than stored by Peptis.</li>
              <li><strong>Communications:</strong> messages, support requests, survey responses and other communications with Peptis.</li>
              <li><strong>Device and usage information:</strong> pages viewed, interactions, referral information, approximate location derived from IP address, browser/device information and analytics events.</li>
            </ul>

            <h2>How we use information</h2>
            <ul>
              <li>Provide, personalise and administer Peptis programmes, coaching, nutrition and training experiences.</li>
              <li>Process reservations, orders and product fulfilment and provide customer support.</li>
              <li>Generate programme summaries and track progress where you choose to provide relevant information.</li>
              <li>Send service messages, requested resources, confirmations and, where permitted, marketing communications.</li>
              <li>Operate, secure, troubleshoot and improve the website and services.</li>
              <li>Comply with applicable law, enforce our terms and protect users, Peptis and others.</li>
            </ul>

            <h2>Supplements and clinical services</h2>
            <p>
              Peptis may offer dietary supplements and related fulfilment services. Dietary
              supplements are separate from medical care and are not intended to diagnose, treat,
              cure or prevent disease. Peptis may also introduce clinical services in eligible
              states through contracted telehealth providers. Where a clinical provider collects
              information for medical care, that provider may have its own privacy practices and
              notices. Clinical services are subject to availability, eligibility and provider
              review and are not guaranteed by participation in a Peptis programme.
            </p>

            <h2>How we disclose information</h2>
            <p>We may disclose information as reasonably necessary to service providers that help us operate Peptis, including hosting, analytics, communications, payment processing, programme operations, product fulfilment and professional advisers. If clinical services are activated, information may also be exchanged with contracted clinical or telehealth providers when necessary to facilitate services you request and as permitted by law.</p>
            <p>We do not sell personal information for money. We do not disclose quiz or programme responses to third parties for their independent use in targeted advertising.</p>

            <h2>Analytics and advertising technologies</h2>
            <p>
              We use analytics technologies, including PostHog, to understand product usage. We may
              also use advertising measurement technologies on appropriate public marketing pages.
              We do not intentionally send sensitive quiz or programme responses to advertising
              platforms. Browser settings and applicable consent controls may allow you to limit
              cookies or similar technologies.
            </p>

            <h2>Consumer health data</h2>
            <p>
              Some information you choose to provide may be considered consumer health data under
              certain state laws. Additional information about our practices is available in the{' '}
              <Link to="/health-data">Consumer Health Data Notice</Link>.
            </p>

            <h2>Retention and security</h2>
            <p>
              We retain personal information for as long as reasonably necessary for the purposes
              described above, including providing services, maintaining business and transaction
              records, resolving disputes and meeting legal obligations. We use reasonable
              administrative, technical and organisational safeguards, but no method of storage or
              transmission can be guaranteed to be completely secure.
            </p>

            <h2>Your choices and privacy rights</h2>
            <p>
              Depending on where you live, you may have rights to request access to, correction of,
              deletion of, or a copy of certain personal information, and to exercise other rights
              provided by applicable privacy law. You may also unsubscribe from marketing email
              using the link provided in those messages. To submit a privacy request, email{' '}
              <a href="mailto:privacy@peptis.com">privacy@peptis.com</a>. We may need to verify your
              identity before completing a request.
            </p>

            <h2>Children</h2>
            <p>Peptis is intended for adults and is not directed to children under 18.</p>

            <h2>Changes to this policy</h2>
            <p>We may update this Privacy Policy as our services develop or legal requirements change. The date above identifies the latest revision.</p>

            <h2>Contact</h2>
            <p>
              Information Edge Insights LLC, trading as Peptis. Privacy questions and requests can
              be sent to <a href="mailto:privacy@peptis.com">privacy@peptis.com</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
