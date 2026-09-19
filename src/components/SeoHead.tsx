import { useEffect } from 'react'
import { SITE_NAME, SITE_ORIGIN, absoluteUrl } from '../lib/site'

type Props = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  jsonLd?: unknown[]
  publishedTime?: string
  modifiedTime?: string
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export function SeoHead({
  title,
  description,
  path,
  type = 'website',
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  jsonLd = [],
  publishedTime,
  modifiedTime,
}: Props) {
  const serialized = JSON.stringify(jsonLd)
  useEffect(() => {
    const url = absoluteUrl(path)
    const ogImage = image ?? `${SITE_ORIGIN}/peptis-logo-green.png`
    const blocks = JSON.parse(serialized) as unknown[]
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1')
    upsertMeta('name', 'author', SITE_NAME)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type === 'article' ? 'article' : 'website')
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:locale', 'en_US')
    if (imageAlt) upsertMeta('property', 'og:image:alt', imageAlt)
    if (imageWidth) upsertMeta('property', 'og:image:width', String(imageWidth))
    if (imageHeight) upsertMeta('property', 'og:image:height', String(imageHeight))
    if (publishedTime) upsertMeta('property', 'article:published_time', publishedTime)
    if (type === 'article' && (modifiedTime || publishedTime)) {
      upsertMeta('property', 'article:modified_time', modifiedTime ?? publishedTime ?? '')
    }
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)
    upsertLink('canonical', url)
    upsertLink('alternate', `${SITE_ORIGIN}/llms.txt`)

    const nodes: HTMLScriptElement[] = []
    for (const block of blocks) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.peptisSeo = 'true'
      script.text = JSON.stringify(block)
      document.head.appendChild(script)
      nodes.push(script)
    }

    return () => {
      for (const node of nodes) node.remove()
    }
  }, [
    description,
    image,
    imageAlt,
    imageHeight,
    imageWidth,
    modifiedTime,
    serialized,
    path,
    publishedTime,
    title,
    type,
  ])

  return null
}
