import { Navigate, useParams } from 'react-router-dom'
import { getLandingVariant } from '../data/landingVariants'
import { LandingPage } from './LandingPage'

export function GoLandingPage() {
  const { slug } = useParams()
  const variant = getLandingVariant(slug)
  if (!variant) return <Navigate to="/" replace />
  return <LandingPage variant={variant} />
}
