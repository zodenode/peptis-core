import { useState } from 'react'
import type { Article } from '../../data/blog'
import { articleCite } from '../../lib/publicationDiscoverability'

type Props = {
  article: Article
}

export function PublicationCite({ article }: Props) {
  const cite = articleCite(article)
  const [copied, setCopied] = useState<'link' | 'embed' | null>(null)

  async function copy(label: 'link' | 'embed', value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
    } catch {
      setCopied(null)
    }
  }

  return (
    <aside className="pub-cite" aria-labelledby="cite-heading">
      <p className="pub-kicker">Cite this essay</p>
      <h2 id="cite-heading">Use the record on another site</h2>
      <p>
        Partners can quote the takeaway with attribution and a link to this URL. Keep the
        limitations. Do not present these figures as Peptis product results.
      </p>
      {cite.partnerQueries.length > 0 ? (
        <div className="pub-cite-queries">
          <p className="pub-kicker">Questions a partner page can rank</p>
          <ul>
            {cite.partnerQueries.map((query) => (
              <li key={query}>{query}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="pub-cite-url">
        <a href={cite.url}>{cite.url}</a>
      </p>
      <div className="pub-cite-actions">
        <button type="button" className="pub-quiet" onClick={() => void copy('link', cite.url)}>
          {copied === 'link' ? 'Link copied' : 'Copy canonical link'}
        </button>
        <button type="button" className="pub-quiet" onClick={() => void copy('embed', cite.embed)}>
          {copied === 'embed' ? 'Embed copied' : 'Copy attribution embed'}
        </button>
      </div>
    </aside>
  )
}
