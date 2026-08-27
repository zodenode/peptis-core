import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setQuizSource, track } from '../../lib/analytics'

export function StickyQuizCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`sticky-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <div>
        <strong>Free continuity check</strong>
        <span>$0 reservation, about three minutes</span>
      </div>
      <Link
        className="btn btn-primary"
        to="/quiz"
        tabIndex={visible ? 0 : -1}
        onClick={() => {
          setQuizSource('sticky_mobile')
          track('quiz_cta_clicked', { location: 'sticky_mobile' })
        }}
      >
        Start
      </Link>
    </div>
  )
}
