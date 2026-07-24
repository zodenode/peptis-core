export type CareLane = {
  id: string
  name: string
  eyebrow: string
  summary: string
  startingAt: string
  compounds: string[]
  why: string
  priority: 'hero' | 'supporting'
}

/**
 * Hero product strategy for Peptis telehealth.
 *
 * Competitive set (Ro, Hims, Musely, Nurx, Lemonaid, Trim, MensRX, FMmeds)
 * wins on GLP-1 weight loss and broad men's/women's Rx. Peptis differentiates
 * by leading with peptide-native care while still fielding metabolic GLP-1s
 * as the demand gateway.
 *
 * Fortes from existing Peptis catalog / brand:
 * Recovery (BPC-157, TB-500), Longevity (MOTS-c, Epitalon, GH secretagogues),
 * Skin (GHK-Cu), Cognitive (Semax/Selank), COA / quality trust.
 */
export const careLanes: CareLane[] = [
  {
    id: 'metabolic',
    name: 'Metabolic Reset',
    eyebrow: 'Weight & appetite',
    summary:
      'Clinician-guided GLP-1 care for sustainable weight change — the same demand lane as Trim and Ro, with Peptis protocol discipline.',
    startingAt: '$249/mo',
    compounds: ['Semaglutide', 'Tirzepatide'],
    why: 'Table-stakes category to compete with top telemedicine merchants; highest conversion entry point.',
    priority: 'hero',
  },
  {
    id: 'recovery',
    name: 'Recovery Protocol',
    eyebrow: 'Repair & resilience',
    summary:
      'Physician-reviewed recovery peptides for tissue support after training, travel, or wear — Peptis’ deepest catalog forte.',
    startingAt: '$189/mo',
    compounds: ['BPC-157', 'TB-500', 'KPV'],
    why: 'Signature differentiator vs Hims/Ro; strongest historical Peptis SKU strength.',
    priority: 'hero',
  },
  {
    id: 'longevity',
    name: 'Longevity Stack',
    eyebrow: 'Cellular vitality',
    summary:
      'Growth-hormone support and mitochondrial peptides for energy, sleep quality, and long-horizon healthspan goals.',
    startingAt: '$199/mo',
    compounds: ['Sermorelin', 'Ipamorelin', 'MOTS-c'],
    why: 'Owns the longevity niche competitors treat as an afterthought.',
    priority: 'hero',
  },
  {
    id: 'skin',
    name: 'Skin Renewal',
    eyebrow: 'Glow & collagen',
    summary:
      'Copper-peptide protocols for skin quality and collagen support — a clinical answer to Musely-style derm telehealth.',
    startingAt: '$149/mo',
    compounds: ['GHK-Cu', 'KPV'],
    why: 'Converts peptide expertise into a beauty/derm front door.',
    priority: 'hero',
  },
  {
    id: 'cognitive',
    name: 'Cognitive Clarity',
    eyebrow: 'Focus & calm',
    summary:
      'Provider-guided nootropic peptides for mental clarity and stress resilience when clinically appropriate.',
    startingAt: '$129/mo',
    compounds: ['Semax', 'Selank'],
    why: 'Supporting lane from existing cognitive catalog; secondary hero after core four.',
    priority: 'supporting',
  },
]

export const heroLanes = careLanes.filter((l) => l.priority === 'hero')

export const trustPoints = [
  {
    title: 'Licensed providers',
    body: 'U.S.-based clinicians review every intake and prescribe only when appropriate.',
  },
  {
    title: 'Pharmacy fulfilled',
    body: 'Medications ship from accredited U.S. compounding pharmacies with discreet packaging.',
  },
  {
    title: 'Peptide-first expertise',
    body: 'Built by a team steeped in peptide science — not a general Rx marketplace bolt-on.',
  },
  {
    title: 'Transparent membership',
    body: 'Consults, messaging, and medication in one clear price. No insurance maze.',
  },
]

export const steps = [
  {
    n: '01',
    title: 'Share your goals',
    body: 'A short health intake covers history, medications, and what you want to change.',
  },
  {
    n: '02',
    title: 'Clinician review',
    body: 'A licensed provider evaluates eligibility and designs a personalized protocol.',
  },
  {
    n: '03',
    title: 'Care at your door',
    body: 'If prescribed, your medication ships discreetly — with ongoing portal support.',
  },
]

export const faqs = [
  {
    q: 'Is Peptis a research chemical store?',
    a: 'No. This example site models doctor-guided telehealth: licensed providers evaluate you, and when appropriate prescribe therapies fulfilled by U.S. pharmacies.',
  },
  {
    q: 'Do I need insurance?',
    a: 'No. Membership pricing is cash-pay and inclusive of clinical review and, when prescribed, medication fulfillment.',
  },
  {
    q: 'Which states are available?',
    a: 'Availability depends on provider licensing and pharmacy partners. The live product would gate by state during intake.',
  },
  {
    q: 'Are compounded peptides FDA-approved?',
    a: 'Many peptide therapies are compounded and are not FDA-approved as finished drug products. Your provider will explain risks, alternatives, and whether treatment is appropriate for you.',
  },
  {
    q: 'How is Peptis different from Ro or Hims?',
    a: 'Those platforms lead with broad men’s/women’s Rx. Peptis leads with peptide-native protocols — recovery, longevity, and skin — while still offering metabolic GLP-1 care as a primary lane.',
  },
]
