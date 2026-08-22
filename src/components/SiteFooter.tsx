import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <img src="/peptis-logo-bronze.png" alt="Peptis" />
          <div className="footer-links">
            <a href="/#care">Care</a>
            <a href="/#how">How it works</a>
            <Link to="/guides">Guides</Link>
            <a href="/#faq">FAQ</a>
          </div>
        </div>
        <p className="footer-note">
          Peptis is operated by Information Edge Insights LLC. Not medical
          advice. Treatment requires evaluation by a licensed clinician; a
          prescription is not guaranteed. Compounded medications may not be
          FDA-approved. © {new Date().getFullYear()} Information Edge Insights
          LLC.
        </p>
      </div>
    </footer>
  )
}
