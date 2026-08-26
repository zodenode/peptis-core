import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { track } from '../../lib/analytics'

type HeaderProps = {
  variant?: 'landing' | 'quiz'
}

export function Header({ variant = 'landing' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const quizClick = (place: string) => {
    track('quiz_cta_clicked', { location: place })
  }

  return (
    <header className={`topbar${scrolled ? ' is-scrolled' : ''}${variant === 'quiz' ? ' topbar-quiz' : ''}`}>
      <Link className="brand" to="/" aria-label="Peptis home">
        <img src="/peptis-logo-green.png" alt="Peptis" />
      </Link>

      {variant === 'landing' ? (
        <>
          <nav className="nav" aria-label="Primary">
            <Link to="/quiz" onClick={() => quizClick('nav')}>
              Continuity quiz
            </Link>
            <a href="/#evidence">Evidence</a>
            <a href="/#framework">Framework</a>
            <a href="/#measures">Measures</a>
            <a href="/#offer">Offer</a>
            <a href="/#faq">FAQ</a>
            <Link to="/blog">Blog</Link>
            <Link className="nav-cta" to="/quiz" onClick={() => quizClick('nav_cta')}>
              Reserve for $0
            </Link>
          </nav>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
          {open ? (
            <nav id="mobile-nav" className="nav-mobile" aria-label="Mobile">
              <Link to="/quiz" onClick={() => quizClick('nav_mobile')}>
                Continuity quiz
              </Link>
              <a href="/#evidence">Evidence</a>
              <a href="/#framework">Framework</a>
              <a href="/#measures">Measures</a>
              <a href="/#offer">Offer</a>
              <a href="/#faq">FAQ</a>
              <Link to="/blog">Blog</Link>
              <Link className="nav-cta" to="/quiz" onClick={() => quizClick('nav_mobile_cta')}>
                Reserve for $0
              </Link>
            </nav>
          ) : null}
        </>
      ) : (
        <Link className="nav-text" to="/">
          Back to founding reservations
        </Link>
      )}
    </header>
  )
}
