/** Operator-only borrowed-ranking playbook. Not routed on the public site. */

export const PARTNER_UTM = 'utm_source=partner&utm_medium=syndication&utm_campaign=publication'

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
    when: 'Use when the partner wants a handout and does not need that URL to rank.',
  },
  {
    title: 'Partner explainer with a quoted record',
    body: 'The partner writes an original introduction for their audience, then quotes the Peptis key answer and links out. Their URL can stay indexed. Peptis still earns the citation. The partner must not rewrite the statistic or drop the limitation.',
    when: 'Use when the partner has real local or specialty authority and should keep the ranking URL.',
  },
  {
    title: 'Answer-engine citation',
    body: 'Each essay already publishes a question title, a one-sentence key answer, visible FAQ, speakable markup, JSON-LD and llms.txt. Partners who repeat that package with a link make it easier for assistants to cite the same sentence.',
    when: 'Use with newsletters, clinic FAQs and any page an assistant might quote.',
  },
] as const

export const PARTNER_ARCHETYPES = [
  {
    id: 'clinic',
    title: 'Obesity and metabolic clinics',
    authority: 'Local medical domains already rank for city plus GLP-1 and patient-intent questions.',
    firstEssay: 'does-ozempic-cause-muscle-loss',
    theyGet: 'A pre-visit page that answers the muscle-loss question without inventing a clinic result.',
    peptisGets: 'A citation from a trusted domain and a path into the free continuity check.',
    firstMove: 'Send the Ozempic lean-mass essay as a patient education page they can host this week.',
  },
  {
    id: 'dietitian',
    title: 'Registered dietitians',
    authority: 'Nutrition sites rank for protein targets and low-appetite eating.',
    firstEssay: 'protein-on-glp1',
    theyGet: 'A sourced range, the denominator problem, and a limit they can stand behind.',
    peptisGets: 'Links from people who already advise on food volume.',
    firstMove: 'Offer the protein essay. Do not send a single g/kg number as if it fits every patient.',
  },
  {
    id: 'trainer',
    title: 'Strength coaches and gyms',
    authority: 'Training businesses rank for lifting during weight loss in their city.',
    firstEssay: 'two-day-strength-plan',
    theyGet: 'A beginner structure plus the Bellicha caveat that the evidence is mostly general weight loss.',
    peptisGets: 'Referrals from people who can actually supervise the work.',
    firstMove: 'Offer the two-day plan essay and the free starter plan link, not a supplement pitch.',
  },
  {
    id: 'press',
    title: 'Journalists and newsletters',
    authority: 'National and specialty desks outrank a new brand on every viral muscle-loss headline.',
    firstEssay: 'lean-mass-vs-muscle-mass',
    theyGet: 'A canonical URL instead of the 40% muscle line.',
    peptisGets: 'High-authority citations that answer engines reuse.',
    firstMove: 'Send the DEXA explainer and the SURMOUNT 25% lean-share figure with the substudy limit attached.',
  },
  {
    id: 'employer',
    title: 'Employer and payer education desks',
    authority: 'Benefits pages rank for employees searching from work networks.',
    firstEssay: 'after-stopping-semaglutide',
    theyGet: 'A regain explainer framed as chronic biology, not personal failure.',
    peptisGets: 'A non-clinical education slot that does not pretend Peptis is the plan sponsor.',
    firstMove: 'Offer the STEP 1 extension essay. Do not sell a 50-state programme that is not live.',
  },
] as const

export const PARTNER_SEQUENCE = [
  {
    title: 'Pick owners who already publish',
    body: 'Start with clinics, dietitians, trainers and newsletters that have a real site and an audience asking these questions. Do not buy expired domains or a blog network.',
  },
  {
    title: 'Send one essay, not the whole library',
    body: 'Match the first essay to their patients. A clinic gets muscle loss. A dietitian gets protein. A trainer gets the two-day plan. A reporter gets lean mass versus muscle.',
  },
  {
    title: 'They write the opening. They quote the record.',
    body: 'The partner keeps an original introduction for their audience. The takeaway, the 25% lean share, and the cannot-tell-us limits stay verbatim. Their URL can rank. Peptis stays the source.',
  },
  {
    title: 'Check the live page before sending the next desk',
    body: 'Confirm the statistic was not rewritten, the education notice is present, and the canonical essay is linked. Then offer the next matching desk.',
  },
] as const

export const PARTNER_MEASURES = [
  'Referring domains that link the canonical essay',
  'Clicks on essay links tagged utm_source=partner',
  'Free-check starts from publication_partner',
  'Answer engines repeating the same takeaway sentence',
] as const

export const PARTNER_REFUSALS = [
  'Expired domains, private blog networks, or paid fake guest posts',
  'Invented clinic partnerships, testimonials or Peptis outcomes',
  'Rewriting about 25% lean mass as 40% muscle',
  'Claiming a supplement treats GLP-1 medication side effects',
  'Presenting a reservation, waitlist or $59 box as live care',
] as const
