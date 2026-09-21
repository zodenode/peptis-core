import { useEffect, useState } from 'react'
import { articles, type Article } from '../data/blog'

const CATEGORIES = new Set(articles.map((article) => article.category))

function asArticle(value: unknown): Article | null {
  if (!value || typeof value !== 'object') return null
  const row = value as Partial<Article>
  if (!row.slug || !row.title || !row.takeaway || !Array.isArray(row.sections)) return null
  const category = CATEGORIES.has(row.category as Article['category'])
    ? (row.category as Article['category'])
    : articles[0].category
  return {
    slug: String(row.slug),
    category,
    title: String(row.title),
    description: String(row.description || row.takeaway),
    takeaway: String(row.takeaway),
    readingMinutes: Math.max(2, Number(row.readingMinutes) || 5),
    sections: row.sections,
    cannotTellUs: Array.isArray(row.cannotTellUs) ? row.cannotTellUs.map(String) : [],
    sources: Array.isArray(row.sources) ? row.sources.map(String) : [],
  }
}

export function useLiveArticles(): { articles: Article[]; ready: boolean } {
  const [list, setList] = useState<Article[]>(articles)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/publication/articles')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !Array.isArray(data?.articles)) return
        const next = data.articles.map(asArticle).filter(Boolean) as Article[]
        if (next.length) setList(next)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { articles: list, ready }
}
