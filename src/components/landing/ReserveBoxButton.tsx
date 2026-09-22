import { Link } from 'react-router-dom'
import { setQuizSource, track } from '../../lib/analytics'

type Props = {
  source: string
  className?: string
}

export function ReserveBoxButton({ source, className }: Props) {
  return (
    <Link
      className={className ?? 'btn btn-secondary'}
      to="/box-updates"
      onClick={() => {
        setQuizSource(source)
        track('box_reserve_clicked', { source })
      }}
    >
      Get box launch updates
    </Link>
  )
}
