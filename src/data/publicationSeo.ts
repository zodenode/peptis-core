/** Accepted SEO and AEO overlays. Body copy stays in blog.ts. QA --accept writes here. */
export type ArticleSeoOverlay = {
  seoTitle: string
  seoDescription: string
}

export const publicationSeo: Record<string, ArticleSeoOverlay> = {
  'does-ozempic-cause-muscle-loss': {
    seoTitle: 'Does Ozempic cause muscle loss?',
    seoDescription:
      'GLP-1 weight loss can include lean tissue. Lean mass is not muscle. SURMOUNT 1 found about 25% of lost weight was lean mass. Education only.',
  },
  'lean-mass-vs-muscle-mass': {
    seoTitle: 'What is lean mass vs muscle mass?',
    seoDescription:
      'DEXA lean mass includes water, organs, connective tissue and bone mineral, not just skeletal muscle. Track function with the scan. Education only.',
  },
  'protein-on-glp1': {
    seoTitle: 'How much protein do you need on a GLP-1?',
    seoDescription:
      'Reviews support about 1.2 to 1.6 g/kg/day for many active weight-loss contexts. The weight denominator needs individual guidance. Education only.',
  },
  'two-day-strength-plan': {
    seoTitle: 'What is a two-day strength plan during weight loss?',
    seoDescription:
      'Resistance training has the strongest evidence for retaining lean tissue in general weight loss. Two full-body sessions are a start. Education only.',
  },
  'after-stopping-semaglutide': {
    seoTitle: 'What happens after stopping semaglutide?',
    seoDescription:
      'STEP 1 extension participants regained about two thirds of prior weight loss a year after stopping. That is chronic biology, not failure. Education only.',
  },
  'collagen-loose-skin': {
    seoTitle: 'Does collagen prevent loose skin after weight loss?',
    seoDescription:
      'High-quality collagen trials do not show a clear skin benefit. No supplement is shown to prevent loose skin during GLP-1 weight loss. Education only.',
  },
}
