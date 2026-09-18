import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getLandingVariant } from '../../data/landingVariants'
import { getQuizSource, setQuizSource, track } from '../../lib/analytics'

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
    setQuizSource(place)
    track('quiz_cta_clicked', { location: place })
  }

  const quizBackPath = () => {
    const source = getQuizSource()
    const match = source.match(/^go_([a-z]+)/)
    const variant = match ? getLandingVariant(match[1]) : null
    return variant?.path ?? '/'
  }

  return (
    <header className={`topbar${scrolled ? ' is-scrolled' : ''}${variant === 'quiz' ? ' topbar-quiz' : ''}`}>
      <Link className="brand" to="/" aria-label="Peptis home">
        <img src="/peptis-logo-green.png" alt="Peptis" />
      </Link>

      {variant === 'landing' ? (
        <>
          <nav className="nav" aria-label="Primary">
            <Link to="/offerings">Offerings</Link>
            <a href="/#evidence">Evidence</a>
            <a href="/#faq">FAQ</a>
            <Link className="nav-cta" to="/quiz" onClick={() => quizClick('nav_cta')}>
              Get my free summary
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
                Free summary
              </Link>
              <Link to="/offerings">Offerings</Link>
              <Link to="/plan">Training</Link>
              <a href="/#evidence">Evidence</a>
              <a href="/#faq">FAQ</a>
              <Link to="/blog">Blog</Link>
              <Link className="nav-cta" to="/quiz" onClick={() => quizClick('nav_mobile_cta')}>
                Get my free summary
              </Link>
            </nav>
          ) : null}
        </>
      ) : (
        <Link className="nav-text" to={quizBackPath()}>
          Back to the continuity check
        </Link>
      )}
    </header>
  )
}
