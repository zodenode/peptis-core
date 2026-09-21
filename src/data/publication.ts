import { articles, EVIDENCE_REVIEW_DATE, type Article } from './blog'

export type PublicationCategorySlug =
  | 'composition'
  | 'protein'
  | 'training'
  | 'skin'
  | 'maintenance'

export type PublicationCategory = {
  slug: PublicationCategorySlug
  label: string
  full: Article['category']
  dek: string
  image: string
  imageAlt: string
}

export const PUBLICATION_NAME = 'Peptis Publication'
export const PUBLICATION_ISSUE = 'Issue 1'
export const PUBLICATION_REVIEW_DATE = EVIDENCE_REVIEW_DATE
export const PUBLICATION_IMAGE_WIDTH = 800
export const PUBLICATION_IMAGE_HEIGHT = 600

export const publicationCategories: PublicationCategory[] = [
  {
    slug: 'composition',
    label: 'Composition',
    full: 'Muscle and body composition',
    dek: 'Weight loss and fat loss are not the same. These essays explain what the trials measured, and why lean mass is not skeletal muscle.',
    image: '/images/publication/composition.jpg',
    imageAlt: 'Adult pausing during a strength session at home',
  },
  {
    slug: 'protein',
    label: 'Protein',
    full: 'Protein and nutrition',
    dek: 'Lower appetite can make protein, fluids and micronutrients harder to obtain. These pieces cover ranges, denominators and food-first structure.',
    image: '/images/publication/protein.jpg',
    imageAlt: 'Leafy greens, berries and milk above a bowl',
  },
  {
    slug: 'training',
    label: 'Training',
    full: 'Training',
    dek: 'Resistance training has the strongest behavioral evidence for retaining lean tissue during weight loss. That evidence is mostly from general weight-loss research.',
    image: '/images/publication/training.jpg',
    imageAlt: 'Everyday strength work in a studio',
  },
  {
    slug: 'skin',
    label: 'Skin',
    full: 'Skin and appearance',
    dek: 'Loose skin mainly reflects volume lost, pace of loss and baseline skin quality. Exercise can support contour. It cannot remove substantial excess skin.',
    image: '/images/publication/skin.jpg',
    imageAlt: 'Calm still life suggesting skin and tissue quality',
  },
  {
    slug: 'maintenance',
    label: 'Maintenance',
    full: 'Maintenance',
    dek: 'Withdrawal studies show that regain is common when treatment stops. That reflects chronic biology, not personal failure.',
    image: '/images/publication/maintenance.jpg',
    imageAlt: 'A calm sunlit path suggesting a later choice',
  },
]

const categoryByFull = Object.fromEntries(
  publicationCategories.map((category) => [category.full, category]),
) as Record<Article['category'], PublicationCategory>

export const featuredArticleSlug = 'does-ozempic-cause-muscle-loss'

export function categoryForArticle(article: Article): PublicationCategory {
  return categoryByFull[article.category] ?? publicationCategories[0]
}

export function findCategory(slug: string | undefined): PublicationCategory | undefined {
  return publicationCategories.find((category) => category.slug === slug)
}

export function articlesInCategory(slug: string, list: Article[] = articles): Article[] {
  const category = findCategory(slug)
  if (!category) return []
  return list.filter((article) => article.category === category.full)
}

export function articlePath(article: Article): string {
  return `/publication/${categoryForArticle(article).slug}/${article.slug}`
}

export function categoryPath(slug: PublicationCategorySlug): string {
  return `/publication/${slug}`
}

export function findPublicationArticle(slug: string | undefined, list: Article[] = articles): Article | undefined {
  return list.find((article) => article.slug === slug)
}

export function relatedArticles(article: Article, limit = 3, list: Article[] = articles): Article[] {
  const same = list.filter((item) => item.category === article.category && item.slug !== article.slug)
  const rest = list.filter((item) => item.category !== article.category && item.slug !== article.slug)
  return [...same, ...rest].slice(0, limit)
}

export function coverArticle(list: Article[] = articles): Article {
  return list.find((article) => article.slug === featuredArticleSlug) ?? list[0] ?? articles[0]
}

export function issueArticles(list: Article[] = articles): Article[] {
  const cover = coverArticle(list)
  return list.filter((article) => article.slug !== cover.slug)
}
