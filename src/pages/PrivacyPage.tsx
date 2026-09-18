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
            <p className="notice-updated">Effective and last updated: September 16, 2026</p>
            <p>
              Peptis is operated by Information Edge Insights LLC, a Wyoming limited liability
              company, trading as Peptis. This Privacy Policy explains how we collect, use,
              disclose and protect personal information when you visit peptis.com, use our quiz or
              planning tools, join a programme or waitlist, purchase products, communicate with us,
              or otherwise interact with Peptis services.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li><strong>Contact and account information:</strong> name, email address, phone number, state and information you provide when joining a programme, reservation or waitlist.</li>
              <li><strong>Programme and quiz information:</strong> information you choose to provide about goals, treatment timeline, current provider or medication, nutrition, strength, exercise, energy, digestive comfort, routine and programme progress.</li>
              <li><strong>Order and fulfilment information:</strong> products selected, transaction status, shipping address and related fulfilment information. Payment-card information may be collected directly by our payment processor rather than stored by Peptis.</li>
              <li><strong>Communications:</strong> messages, support requests, survey responses and other communications with Peptis.</li>
              <li><strong>Device and usage information:</strong> pages viewed, interactions, referral information, approximate location derived from IP address, browser/device information and analytics events.</li>
            </ul>

            <h2>How we use information</h2>
            <ul>
              <li>Provide, personalise and administer Peptis coaching, nutrition, training and continuity programmes.</li>
              <li>Process reservations, purchases, supplement orders and fulfilment and provide customer support.</li>
              <li>Generate programme summaries and track progress where you choose to provide relevant information.</li>
              <li>Send service messages, requested resources, confirmations and, where permitted, marketing communications.</li>
              <li>Notify the Peptis operators when you complete a form, using your name, email, state and the page you came from. Quiz answers are not included in that notice.</li>
              <li>Operate, secure, troubleshoot, analyse and improve our website, programmes and products.</li>
              <li>Comply with applicable law, enforce our terms and protect users, Peptis and others.</li>
            </ul>

            <h2>Supplements</h2>
            <p>
              Dietary supplements are a sustained part of the planned Peptis offering as optional
              nutrition and wellness products alongside coaching and training. Information relating
              to supplement preferences, purchases and fulfilment may be processed by Peptis and
              contracted commerce, payment and fulfilment providers. Dietary supplements are not
              medications and are not intended to diagnose, treat, cure or prevent disease or GLP-1
              medication side effects.
            </p>

            <h2>Clinical and telehealth services</h2>
            <p>
              Peptis may introduce clinical services in eligible states through contracted
              telehealth providers. Clinical services are separate from Peptis coaching and
              supplement products and are subject to availability, eligibility and licensed
              clinician review. Where a clinical provider collects information for medical care,
              that provider may provide its own privacy notice and may be subject to additional
              health-information privacy requirements. Participation in Peptis does not guarantee a
              consultation, prescription or other clinical service.
            </p>

            <h2>How we disclose information</h2>
            <p>
              We may disclose information as reasonably necessary to service providers that help us
              operate Peptis, including hosting, analytics, communications, payment processing,
              programme operations, product fulfilment and professional advisers. If clinical
              services are activated, information may also be exchanged with contracted clinical or
              telehealth providers when necessary to facilitate services you request and as
              permitted by law.
            </p>
            <p>
              We do not sell personal information for money. We do not disclose quiz or programme
              responses to third parties for their independent use in targeted advertising.
            </p>

            <h2>Analytics, cookies and advertising technologies</h2>
            <p>
              We use analytics technologies, including PostHog, to understand product usage. We may
              use cookies and advertising measurement technologies on appropriate public marketing
              pages. We do not intentionally send sensitive quiz or programme responses to
              advertising platforms. Browser settings and applicable consent controls may allow you
              to limit cookies or similar technologies.
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
              provided by applicable privacy law. You may unsubscribe from marketing email using
              the link provided in those messages. To submit a privacy request, email{' '}
              <a href="mailto:privacy@peptis.com">privacy@peptis.com</a>. We may need to verify your
              identity before completing a request.
            </p>

            <h2>Children</h2>
            <p>Peptis is intended for adults and is not directed to children under 18.</p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this Privacy Policy as our services develop or legal requirements
              change. The effective date above identifies the latest revision.
            </p>

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
