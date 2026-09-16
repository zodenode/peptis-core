import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <img src="/peptis-logo-bronze.png" alt="Peptis" />
          <div className="footer-links">
            <Link to="/quiz">Founding reservation</Link>
            <Link to="/offerings">Offerings</Link>
            <Link to="/plan">Training plans</Link>
            <a href="/#how">How it works</a>
            <a href="/#evidence">Evidence</a>
            <a href="/#offer">Founding offer</a>
            <a href="/#faq">FAQ</a>
            <Link to="/blog">Blog</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/health-data">Consumer Health Data Notice</Link>
            <a href="/brand-kit/">Brand kit</a>
          </div>
        </div>
        <p className="footer-secure">$0 reservation. No payment details required today.</p>
        <p className="footer-note">
          Peptis is operated by Information Edge Insights LLC. The founding reservation is a
          waitlist, not medical care, and does not include clinician review, prescribing,
          medication, or pharmacy fulfillment. Future clinical availability depends on state,
          provider and operational readiness. Supplements are non-medical wellness products.
          Pricing and availability may change before activation. © {new Date().getFullYear()} Information Edge Insights LLC.
        </p>
      </div>
    </footer>
  )
}
