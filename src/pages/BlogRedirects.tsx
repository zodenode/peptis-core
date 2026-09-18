import { Navigate, useParams } from 'react-router-dom'
import { articlePath, findPublicationArticle } from '../data/publication'

export function BlogIndexRedirect() {
  return <Navigate to="/publication" replace />
}

export function BlogArticleRedirect() {
  const { slug } = useParams()
  const article = findPublicationArticle(slug)
  return <Navigate to={article ? articlePath(article) : '/publication'} replace />
}
