import { Navigate, useParams } from 'react-router-dom'
import { getLandingVariant } from '../data/landingVariants'
import { LandingPage } from './LandingPage'
import { ProductExamplesPage } from './ProductExamplesPage'
import { ShortLandingPage } from './ShortLandingPage'

export function GoLandingPage() {
  const { slug } = useParams()
  if (slug === 'examples') return <ProductExamplesPage />
  const variant = getLandingVariant(slug)
  if (!variant) return <Navigate to="/" replace />
  if (variant.id === 'start' || variant.id === 'ad') {
    return <ShortLandingPage variant={variant} compact />
  }
  if (variant.id === 'visual' || variant.id === 'compare') {
    return <ShortLandingPage variant={variant} visual />
  }
  return <LandingPage variant={variant} />
}
