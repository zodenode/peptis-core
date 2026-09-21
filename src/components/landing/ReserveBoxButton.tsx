import { Link } from 'react-router-dom'
import { offer } from '../../data/offer'
import { setQuizSource, track } from '../../lib/analytics'

type Props = {
  source: string
  className?: string
}

export function ReserveBoxButton({ source, className }: Props) {
  return (
    <Link
      className={className ?? 'btn btn-secondary'}
      to={`/quiz?reserve=box&source=${encodeURIComponent(source)}`}
      onClick={() => {
        setQuizSource(source)
        try {
          sessionStorage.setItem('peptis.reserve.box', '1')
        } catch {
          // private mode
        }
        track('box_reserve_clicked', { source })
      }}
    >
      Reserve the founding {offer.leanMassBoxPriceLabel} box. No card.
    </Link>
  )
}
