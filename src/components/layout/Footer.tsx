import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <img src="/peptis-logo-bronze.png" alt="Peptis" />
          <div className="footer-links">
            <Link to="/quiz">Free continuity check</Link>
            <Link to="/offerings">Offerings</Link>
            <Link to="/plan">Training plans</Link>
            <a href="/#how">How it works</a>
            <a href="/#evidence">Evidence</a>
            <a href="/#offer">Offer</a>
            <a href="/#faq">FAQ</a>
            <Link to="/blog">Blog</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/health-data">Health data notice</Link>
            <a href="/brand-kit/">Brand kit</a>
          </div>
        </div>
        <p className="footer-secure">Free check and starter plan. No payment details today.</p>
        <p className="footer-note">
          Peptis is operated by Information Edge Insights LLC. The continuity check is education,
          not medical care, and does not include clinician review, prescribing, medication, or
          pharmacy fulfillment. The Lean Mass nutrition box is not for sale until we can charge
          and ship. © {new Date().getFullYear()} Information Edge Insights LLC.
        </p>
      </div>
    </footer>
  )
}
