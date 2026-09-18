export const PARTNER_REUSE_RULES = [
  'Quote the takeaway or FAQ answer verbatim, or write your own introduction and then quote.',
  'Link the quote to the canonical Peptis Publication URL. Do not strip the education-only notice.',
  'Keep the cannot-tell-us limits next to any statistic you reuse.',
  'Never equate lean mass with skeletal muscle. Use about 25% for the SURMOUNT 1 lean share, not 40% muscle.',
  'Do not present trial figures as Peptis outcomes, testimonials or clinic results.',
  'Do not claim that a supplement treats GLP-1 medication side effects.',
] as const

export const PARTNER_PLAYS = [
  {
    title: 'Cited excerpt on a partner domain',
    body: 'A clinic, trainer or educator hosts a short page that quotes the takeaway and sources, then points readers to the full essay. Set rel=canonical to the Peptis URL, or noindex the excerpt. This gives the partner useful patient education and gives search and answer engines one source of truth.',
  },
  {
    title: 'Partner explainer with a quoted record',
    body: 'The partner writes an original introduction for their audience, then quotes the Peptis key answer and links out. Their URL can stay indexed. Peptis still earns the citation. The partner must not rewrite the statistic or drop the limitation.',
  },
  {
    title: 'Answer-engine citation',
    body: 'Each essay already publishes a question title, a one-sentence key answer, visible FAQ, speakable markup, JSON-LD and llms.txt. Partners who repeat that package with a link make it easier for assistants to cite the same sentence.',
  },
] as const

export const PARTNER_AUDIENCES = [
  'Obesity and metabolic clinics that need a page their patients can read before a visit',
  'Registered dietitians and strength coaches who want a sourced lean-mass explainer',
  'Employer or payer education desks that cannot invent GLP-1 claims',
  'Journalists and newsletters that need a canonical URL instead of a viral 40% muscle line',
] as const
