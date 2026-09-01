import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

export function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Notice: Peptis'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="site">
      <Header variant="quiz" />
      <main className="notice-page">
        <section className="section">
          <div className="notice-inner">
            <p className="eyebrow">Legal</p>
            <h1>Privacy Notice</h1>
            <p className="notice-updated">Last updated: August 27, 2026</p>
            <p>
              Peptis is operated by Information Edge Insights LLC. This notice explains what
              information we collect on this website, how we use it, and the choices you have. The
              website offers education and a free founding reservation. It does not provide medical
              care, and we are not acting as your health care provider.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li>
                <strong>Reservation details you provide:</strong> first and last name, email
                address, state of residence, optional phone number, and your interest in optional
                future products.
              </li>
              <li>
                <strong>Quiz responses:</strong> your answers about strength, energy, digestive
                comfort and maintenance priorities, and the summary categories derived from them.
                Quiz progress is stored in your browser so you can resume on the same device, and
                each step is also saved to our servers with a random quiz identifier, together
                with your email address if you choose to provide it during the quiz.
              </li>
              <li>
                <strong>Usage information:</strong> pages viewed, buttons clicked, quiz steps
                completed, approximate device and browser information, collected through our
                analytics provider PostHog.
              </li>
            </ul>

            <h2>How we use it</h2>
            <ul>
              <li>To create and manage your founding reservation and send launch updates.</li>
              <li>To build the personalized summary shown at the end of the quiz.</li>
              <li>
                To send the resources you request during the quiz, such as the strength starter
                plan, and to follow up if you start the quiz but do not finish.
              </li>
              <li>To understand how the website is used and improve the experience.</li>
              <li>To send a reservation confirmation email with a cancellation link.</li>
            </ul>

            <h2>What we do not do</h2>
            <ul>
              <li>We do not sell your personal information.</li>
              <li>We do not share your quiz answers with advertisers.</li>
              <li>We do not use your information to provide medical care or diagnosis.</li>
            </ul>

            <h2>Service providers</h2>
            <p>
              We use a small number of processors to run this website: hosting infrastructure,
              PostHog for product analytics, and an email delivery provider for confirmation
              messages. Each processes information on our behalf under contract.
            </p>

            <h2>Your choices and rights</h2>
            <ul>
              <li>You can cancel your reservation at any time using the link in your confirmation email.</li>
              <li>
                You can ask us to access, correct or delete the information we hold about you by
                emailing <a href="mailto:privacy@peptis.com">privacy@peptis.com</a>.
              </li>
              <li>You can clear quiz progress stored in your browser by clearing site data.</li>
              <li>
                Depending on your state, you may have additional rights under state privacy laws,
                including rights over consumer health data described in our{' '}
                <Link to="/health-data">Consumer Health Data Notice</Link>.
              </li>
            </ul>

            <h2>Retention</h2>
            <p>
              We keep reservation records while the launch list is active and for a reasonable
              period afterward for record keeping. Cancelled reservations are marked cancelled and
              excluded from launch communication.
            </p>

            <h2>Contact</h2>
            <p>
              Information Edge Insights LLC. Email{' '}
              <a href="mailto:privacy@peptis.com">privacy@peptis.com</a> with any privacy question
              or request.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
