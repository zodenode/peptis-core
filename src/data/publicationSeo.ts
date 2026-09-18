/** Accepted SEO and AEO overlays. Body copy stays in blog.ts. QA --accept writes here. */
export type ArticleSeoOverlay = {
  seoTitle: string
  seoDescription: string
  partnerQueries?: string[]
}

export const publicationSeo: Record<string, ArticleSeoOverlay> = {
  'does-ozempic-cause-muscle-loss': {
    seoTitle: 'Does Ozempic cause muscle loss?',
    seoDescription:
      'GLP-1 weight loss can include lean tissue. Lean mass is not muscle. SURMOUNT 1 found about 25% of lost weight was lean mass. Education only.',
    partnerQueries: [
      'Does Ozempic cause muscle loss?',
      'How much lean mass do you lose on a GLP-1?',
      'Is GLP-1 weight loss all fat?',
    ],
  },
  'lean-mass-vs-muscle-mass': {
    seoTitle: 'What is lean mass vs muscle mass?',
    seoDescription:
      'DEXA lean mass includes water, organs, connective tissue and bone mineral, not just skeletal muscle. Track function with the scan. Education only.',
    partnerQueries: [
      'What is the difference between lean mass and muscle mass?',
      'Does a DEXA scan measure muscle?',
      'Why did lean mass drop on a GLP-1?',
    ],
  },
  'protein-on-glp1': {
    seoTitle: 'How much protein do you need on a GLP-1?',
    seoDescription:
      'Reviews support about 1.2 to 1.6 g/kg/day for many active weight-loss contexts. The weight denominator needs individual guidance. Education only.',
    partnerQueries: [
      'How much protein do you need on a GLP-1?',
      'Why is protein harder to eat on semaglutide?',
      'Is 1.6 g/kg of protein right for everyone on a GLP-1?',
    ],
  },
  'two-day-strength-plan': {
    seoTitle: 'What is a two-day strength plan during weight loss?',
    seoDescription:
      'Resistance training has the strongest evidence for retaining lean tissue in general weight loss. Two full-body sessions are a start. Education only.',
    partnerQueries: [
      'What strength training helps during weight loss?',
      'Is two days of lifting enough on a GLP-1?',
      'Does cardio preserve lean mass during weight loss?',
    ],
  },
  'after-stopping-semaglutide': {
    seoTitle: 'What happens after stopping semaglutide?',
    seoDescription:
      'STEP 1 extension participants regained about two thirds of prior weight loss a year after stopping. That is chronic biology, not failure. Education only.',
    partnerQueries: [
      'What happens when you stop semaglutide?',
      'How much weight comes back after Ozempic?',
      'Is regain after a GLP-1 a personal failure?',
    ],
  },
  'collagen-loose-skin': {
    seoTitle: 'Does collagen prevent loose skin after weight loss?',
    seoDescription:
      'High-quality collagen trials do not show a clear skin benefit. No supplement is shown to prevent loose skin during GLP-1 weight loss. Education only.',
    partnerQueries: [
      'Does collagen prevent loose skin after weight loss?',
      'Do collagen supplements work after Ozempic?',
      'What causes loose skin after GLP-1 weight loss?',
    ],
  },
}
