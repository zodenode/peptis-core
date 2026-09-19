import { PUBLICATION_IMAGE_HEIGHT, PUBLICATION_IMAGE_WIDTH } from '../../data/publication'

type Props = {
  src: string
  alt: string
  priority?: boolean
}

export function PublicationImage({ src, alt, priority = false }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      width={PUBLICATION_IMAGE_WIDTH}
      height={PUBLICATION_IMAGE_HEIGHT}
      sizes={priority ? '(max-width: 900px) min(100vw, 36rem), 18rem' : '(max-width: 900px) 100vw, 22rem'}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'low'}
    />
  )
}
