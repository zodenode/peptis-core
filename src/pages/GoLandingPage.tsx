import { Navigate, useParams } from 'react-router-dom'
import { getLandingVariant } from '../data/landingVariants'
import { LandingPage } from './LandingPage'
import { ShortLandingPage } from './ShortLandingPage'

export function GoLandingPage() {
  const { slug } = useParams()
  const variant = getLandingVariant(slug)
  if (!variant) return <Navigate to="/" replace />
  if (variant.id === 'start') return <ShortLandingPage variant={variant} />
  if (variant.id === 'visual' || variant.id === 'compare') {
    return <ShortLandingPage variant={variant} visual />
  }
  return <LandingPage variant={variant} />
}
