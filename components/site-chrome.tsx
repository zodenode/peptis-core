import Link from "next/link";

export function SiteHeader({ current }: { current?: "recomp" | "continuity" | "blog" }) {
  return (
    <header className="marketing-header apple-chrome">
      <div className="marketing-header-shell">
        <Link className="marketing-wordmark" href="/" aria-label="Peptis home">
          <span aria-hidden="true" />
        </Link>
        <nav className="marketing-nav" aria-label="Peptis navigation">
          <Link aria-current={current === "recomp" ? "page" : undefined} href="/">Recomposition</Link>
          <Link aria-current={current === "continuity" ? "page" : undefined} href="/glp-continuity">GLP-1 continuity</Link>
          <Link aria-current={current === "blog" ? "page" : undefined} href="/blog">Evidence</Link>
        </nav>
        <div className="marketing-header-actions">
          <span className="clinical-signal"><i />Evidence-led</span>
          <Link className="header-cta" data-pressable href="/?start=1">Build my plan <span>↗</span></Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="marketing-footer">
      <div className="footer-brand">
        <Link className="marketing-wordmark footer-wordmark" href="/" aria-label="Peptis home"><span aria-hidden="true" /></Link>
        <p>Keep the progress.<br />Protect the person.</p>
        <div className="footer-signal"><i /> Body recomposition, nutrition and continuity support.</div>
      </div>
      <div className="footer-links">
        <div><strong>Explore</strong><Link href="/">Body recomposition</Link><Link href="/glp-continuity">GLP-1 continuity</Link><Link href="/blog">Evidence library</Link><Link href="/editorial-policy">Editorial policy</Link></div>
        <div><strong>Start</strong><Link href="/?start=1">Body-composition quiz</Link><Link href="/blog/what-happens-after-stopping-semaglutide">Maintenance guide</Link><Link href="/blog/how-much-protein-on-glp-1">Protein guide</Link></div>
      </div>
      <div className="footer-disclaimer">
        <p>Peptis provides general education and programme support. It does not diagnose, prescribe, guarantee treatment eligibility or replace an individual clinician. Prescription decisions must be made by an appropriately licensed clinician. Compounded products are not FDA approved.</p>
        <p>© 2026 Peptis. Evidence reviewed through 24 August 2026. Public medical claims require final medical and legal review before paid clinical launch.</p>
      </div>
    </footer>
  );
}
