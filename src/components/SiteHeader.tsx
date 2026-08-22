import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
      <Link className="brand" to="/" aria-label="Peptis home">
        <img src="/peptis-logo-green.png" alt="Peptis" />
      </Link>
      <nav className="nav" aria-label="Primary">
        <a href="/#care">Care</a>
        <a href="/#how">How it works</a>
        <NavLink to="/guides">Guides</NavLink>
        <a href="/#faq">FAQ</a>
        <a className="nav-cta" href="/#start">
          Start visit
        </a>
      </nav>
    </header>
  )
}
