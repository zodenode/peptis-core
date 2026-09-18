import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { LandingVariant } from '../../data/landingVariants'
import { setQuizSource, track } from '../../lib/analytics'

type Props = {
  variant?: LandingVariant
}

export function StickyQuizCta({ variant }: Props) {
  const [visible, setVisible] = useState(false)
  const source = variant ? `${variant.source}_sticky` : 'sticky_mobile'

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`sticky-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <div>
        <strong>{variant?.stickyTitle ?? 'Free GLP-1 continuity check'}</strong>
        <span>{variant?.stickyNote ?? '3 minutes. $0. No card.'}</span>
      </div>
      <Link
        className="btn btn-primary"
        to={variant?.ctaTo ?? '/quiz'}
        tabIndex={visible ? 0 : -1}
        onClick={() => {
          setQuizSource(source)
          track('quiz_cta_clicked', { location: source })
        }}
      >
        {variant ? variant.ctaLabel : 'Get mine'}
      </Link>
    </div>
  )
}
