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
            <Link to="/publication">Publication</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/health-data">Health data notice</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <p className="footer-secure">Free check and starter plan. No payment details today.</p>
        <p className="footer-note">
          Peptis is operated by Information Edge Insights LLC, registered in Wyoming, United
          States. Education tools only. The $59 Lean Mass box can be reserved with no card.
          Clinical services are not offered. © {new Date().getFullYear()} Information Edge
          Insights LLC.
        </p>
      </div>
    </footer>
  )
}
