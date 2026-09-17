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
        <strong>Free GLP-1 continuity check</strong>
        <span>3 minutes. $0. No card.</span>
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
        Get mine
      </Link>
    </div>
  )
}
