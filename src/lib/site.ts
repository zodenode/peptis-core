export const SITE_ORIGIN = 'https://www.peptis.com'
export const SITE_NAME = 'Peptis'
export const SITE_LEGAL_NAME = 'Information Edge Insights LLC'
export const SITE_LOGO = `${SITE_ORIGIN}/peptis-logo-green.png`

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}
