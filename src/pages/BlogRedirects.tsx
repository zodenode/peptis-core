import { NotFoundPage } from './NotFoundPage'
import { Navigate, useParams } from 'react-router-dom'
import { articlePath, findPublicationArticle } from '../data/publication'

export function BlogIndexRedirect() {
  return <Navigate to="/publication" replace />
}

export function BlogArticleRedirect() {
  const { slug } = useParams()
  const article = findPublicationArticle(slug)
  return article ? <Navigate to={articlePath(article)} replace /> : <NotFoundPage />
}
