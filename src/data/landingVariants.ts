export type LandingVariantId = 'strength' | 'box' | 'care' | 'plan'

export type LandingVariant = {
  id: LandingVariantId
  path: string
  source: string
  documentTitle: string
  eyebrow: string
  headline: string
  lead: string
  ctaLabel: string
  ctaTo: string
  secondaryCtaLabel?: string
  secondaryCtaTo?: string
  micro: string
  stickyTitle: string
  stickyNote: string
  closerEyebrow: string
  closerHeadline: string
  closerBody: string
  showHeroPrompts: boolean
  showLeadCapture: boolean
  leadButtonLabel?: string
  offerEyebrow: string
  offerHeadline: string
  offerBody: string
  pricingLeft: string
  pricingMid: string
  pricingRight: string
  pricingNote: string
  evidenceLine?: string
}

export const landingVariants: Record<LandingVariantId, LandingVariant> = {
  strength: {
    id: 'strength',
    path: '/go/strength',
    source: 'go_strength',
    documentTitle: 'Peptis: see what the scale missed',
    eyebrow: 'Free GLP-1 continuity check',
    headline: 'See what the scale missed about your strength',
    lead: 'Eight questions. You leave with written priorities on strength, protein and keeping the weight off, plus the free two-day strength starter plan. About 3 minutes. No card.',
    ctaLabel: 'Get my free summary',
    ctaTo: '/quiz',
    micro: 'Education only, not care today.',
    stickyTitle: 'Free GLP-1 continuity check',
    stickyNote: '3 minutes. $0. No card.',
    closerEyebrow: 'Free GLP-1 continuity check',
    closerHeadline: 'See what the scale missed, in about 3 minutes',
    closerBody: 'Answer eight questions. You will receive written priorities and the free starter plan. No payment details.',
    showHeroPrompts: true,
    showLeadCapture: false,
    offerEyebrow: 'Free check, then a box you can buy later',
    offerHeadline: 'Get the summary and starter plan now. The $59 box is not for sale yet.',
    offerBody:
      'The continuity check and two-day strength plan are free. The first paid product we intend to sell is the Lean Mass nutrition box at $59 a month. It is not for sale today because we cannot charge or ship. There is no paid clinical programme to join.',
    pricingLeft: 'today for summary and plan',
    pricingMid: 'intended Lean Mass box',
    pricingRight: 'nothing ships today',
    pricingNote:
      '$59 a month is the intended price for the Lean Mass nutrition box. It is not an offer until we can charge and ship. There is no paid clinical programme for sale. Not medical care today.',
  },
  box: {
    id: 'box',
    path: '/go/box',
    source: 'go_box',
    documentTitle: 'Peptis Lean Mass nutrition box',
    eyebrow: 'Intended first paid product',
    headline: 'A $59 nutrition box for low-appetite weeks',
    lead: 'Protein, creatine, hydration and micronutrients from private-label stock. Leave your email and we will tell you when we can charge and ship. The two-day strength plan is free today. The box is not for sale yet.',
    ctaLabel: 'Ask about the $59 box',
    ctaTo: '/quiz',
    micro: 'Supplements are not medicines and do not treat medication side effects.',
    stickyTitle: 'Lean Mass nutrition box',
    stickyNote: 'Intended $59/mo. Not for sale yet.',
    closerEyebrow: 'Lean Mass nutrition box',
    closerHeadline: 'Ask to hear when the $59 box can ship',
    closerBody:
      'The check and starter plan are free. Asking about the box does not place an order. Nothing is charged until we can take payment, ship, and you choose to buy.',
    showHeroPrompts: false,
    showLeadCapture: true,
    leadButtonLabel: 'Email me when it can ship',
    offerEyebrow: 'Wellness nutrition, not a clinical SKU',
    offerHeadline: 'This is a test assortment you can ship later, not a custom whey.',
    offerBody:
      'The intended box uses private-label protein, creatine, hydration and micronutrients. It is not a 20 to 25 g identity-tested clear whey. It exists so we can learn whether anyone pays $59 a month before commissioning a long-term SKU. Clinical care is a separate question.',
    pricingLeft: 'today for plan and updates',
    pricingMid: 'intended Lean Mass box',
    pricingRight: 'nothing ships today',
    pricingNote:
      'This page is for a nutrition-box test, not a clinician-staffed programme. $59 is the intended monthly price, not a live charge.',
  },
  care: {
    id: 'care',
    path: '/go/care',
    source: 'go_care',
    documentTitle: 'Peptis continuity list',
    eyebrow: 'Continuity list, not live care',
    headline: 'Keep your prescriber. Add a strength and maintenance record.',
    lead: 'If a clinician-staffed programme later opens in your state, you would still review the terms and choose whether to enroll. There is no live prescribing, pharmacy fulfillment or $299 subscription today. Start with a free written summary.',
    ctaLabel: 'Join the continuity list',
    ctaTo: '/quiz',
    micro: 'A list signup is not medical care, not a reservation of medication, and not enrollment.',
    stickyTitle: 'Continuity list',
    stickyNote: 'Free summary. No care today.',
    closerEyebrow: 'Continuity list',
    closerHeadline: 'Save the record now. Decide on care later.',
    closerBody:
      'Licensed consultations are not submitted and not for sale. People who leave an email will hear first if screening later opens in their state.',
    showHeroPrompts: true,
    showLeadCapture: true,
    leadButtonLabel: 'Email me the summary',
    offerEyebrow: 'Clinical path is separate from the box',
    offerHeadline: 'There is no paid continuity programme to join today.',
    offerBody:
      'A $299 monthly rate has been discussed only as a possible future founding rate if clinical services launch, reach your state, you are eligible and you choose to enroll. That is not an offer today. The free check still gives you a useful record.',
    pricingLeft: 'today for the summary',
    pricingMid: 'clinical programme',
    pricingRight: 'no subscription today',
    pricingNote:
      'Clinical onboarding is not live. This page collects a continuity list only. Not medical care today.',
  },
  plan: {
    id: 'plan',
    path: '/go/plan',
    source: 'go_plan',
    documentTitle: 'Peptis two-day strength plan',
    eyebrow: 'Free two-day strength plan',
    headline: 'Start the training that actually supports lean tissue',
    lead: 'Resistance training has the strongest behavioral evidence for retaining lean tissue during weight loss. That finding comes from general weight-loss research, not a GLP-1 trial. Build a starter programme in one minute. No card.',
    ctaLabel: 'Build my strength plan',
    ctaTo: '/plan',
    secondaryCtaLabel: 'Get my free summary',
    secondaryCtaTo: '/quiz',
    micro:
      'About 0.8 kg less lean-mass loss with resistance training in an overview of 12 reviews and 149 studies. Not GLP-1 specific. Bellicha et al., Obesity Reviews, 2021. Individual results vary.',
    stickyTitle: 'Free strength starter plan',
    stickyNote: 'One minute. No subscription.',
    closerEyebrow: 'Free strength starter plan',
    closerHeadline: 'Build the plan, then keep the written notes',
    closerBody:
      'The training template is available now. The 8-question check adds protein, comfort and maintenance notes. Neither one is medical care.',
    showHeroPrompts: false,
    showLeadCapture: false,
    offerEyebrow: 'Training first, products later',
    offerHeadline: 'The plan is free. The box and the clinical programme are not for sale.',
    offerBody:
      'Protein can support training. It does not replace it. If you later want the Lean Mass nutrition box, you can ask when it can ship. Intended price $59 a month. Not an offer today.',
    pricingLeft: 'today for the starter plan',
    pricingMid: 'intended Lean Mass box',
    pricingRight: 'nothing ships today',
    pricingNote:
      'The training plan is the live tool. $59 is the intended box price if we can later charge and ship. Not medical care today.',
    evidenceLine:
      'Resistance training attenuated lean mass loss during general weight loss by about 0.8 kg in an overview of 12 systematic reviews and 149 studies. This was not GLP-1 specific. Bellicha et al., Obesity Reviews, 2021. Evidence reviewed through August 21, 2026. Education only.',
  },
}

export function getLandingVariant(slug: string | undefined): LandingVariant | null {
  if (!slug) return null
  return landingVariants[slug as LandingVariantId] ?? null
}

export const hiddenLandingPaths = Object.values(landingVariants).map((variant) => variant.path)
