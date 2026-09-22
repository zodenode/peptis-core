import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { COMPANY, companyPostalBlock } from '../data/company'

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
            <p className="notice-updated">Effective and last updated: September 22, 2026</p>
            <p>
              Peptis is operated by Information Edge Insights LLC, a Wyoming limited liability
              company, trading as Peptis. This Privacy Policy explains how we collect, use,
              disclose and protect personal information when you visit peptis.com, use our quiz or
              planning tools, join a programme or waitlist, purchase products, communicate with us,
              or otherwise interact with Peptis services.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li><strong>Contact and account information:</strong> name, email address, state and information you provide when joining a programme, reservation or waitlist.</li>
              <li><strong>Programme and quiz information:</strong> information you choose to provide about goals, treatment timeline, current provider or medication, nutrition, strength, exercise, energy, digestive comfort, routine and programme progress.</li>
              <li><strong>Order and fulfilment information:</strong> products selected, transaction status, shipping address and related fulfilment information. Payment-card information may be collected directly by our payment processor rather than stored by Peptis.</li>
              <li><strong>Communications:</strong> messages, support requests, survey responses and other communications with Peptis.</li>
              <li><strong>Device and usage information:</strong> pages viewed, interactions, referral information, anonymous analytics events. Security controls may temporarily process connection information to prevent abuse.</li>
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

            <h2>Clinical services</h2>
            <p>Clinical services are not offered today. We do not collect information in order to prescribe or fulfill medication.</p>

            <h2>How we disclose information</h2>
            <p>
              We may disclose information as reasonably necessary to service providers that help us
              operate Peptis, including hosting, analytics, communications, payment processing,
              programme operations, product fulfilment and professional advisers. We will update this notice before introducing new services that change how data is used.
            </p>
            <p>
              We do not sell personal information for money. We do not disclose quiz or programme
              responses to third parties for their independent use in targeted advertising.
            </p>

            <h2>Analytics, cookies and advertising technologies</h2>
            <p>
              We count a limited set of anonymous events on our own server, such as a quiz start,
              a completed signup or a plan opened. These events contain no email, quiz answer,
              medication, provider, derived health priority, advertising identifier or full URL.
              We do not load advertising pixels, PostHog, session replay or third-party analytics.
              Quiz answers and your custom training programme are saved in your browser so you
              can return on the same device.
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
              <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>. We may need to verify your
              identity before completing a request.
            </p>

            <h2>Children</h2>
            <p>Peptis is intended for adults and is not directed to children under 18.</p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this Privacy Policy as our services develop or legal requirements
              change. The effective date above identifies the latest revision.
            </p>

            <h2>SMS</h2>
            <p>
              We do not send marketing SMS today. If we later collect a mobile number for product
              updates, we will ask for separate TCPA consent before sending those messages. We currently collect no mobile numbers in the signup flow.
            </p>
            <h2>Contact</h2>
            <pre className="legal-address">{companyPostalBlock()}</pre>
            <p>
              {COMPANY.legalName}, trading as {COMPANY.tradeName}. Privacy questions:{' '}
              <a href={`mailto:${COMPANY.privacyEmail}`}>{COMPANY.privacyEmail}</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
