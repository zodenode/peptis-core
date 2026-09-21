export type LandingVariantId = 'strength' | 'box' | 'care' | 'plan' | 'start' | 'visual' | 'compare'

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
    offerHeadline: 'Get the summary and starter plan now. Reserve the $59 box if you want it.',
    offerBody:
      'The continuity check and two-day strength plan are free. Reserve the founding $59 Lean Mass box with no card. Clinical services are not offered.',
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
    lead: 'Protein, creatine, hydration and micronutrients from private-label stock. Reserve the founding $59 box with no card. The two-day strength plan is free today.',
    ctaLabel: 'Ask about the $59 box',
    ctaTo: '/quiz',
    micro: 'Supplements are not medicines and do not treat medication side effects.',
    stickyTitle: 'Lean Mass nutrition box',
    stickyNote: 'Founding $59/mo. No card to reserve.',
    closerEyebrow: 'Lean Mass nutrition box',
    closerHeadline: 'Ask to hear when the $59 box can ship',
    closerBody:
      'The check and starter plan are free. Asking about the box does not place an order. Nothing is charged until we can take payment, ship, and you choose to buy.',
    showHeroPrompts: false,
    showLeadCapture: true,
    leadButtonLabel: 'Email me when it can ship',
    offerEyebrow: 'Wellness nutrition, not a clinical product',
    offerHeadline: 'This is a test assortment you can ship later, not a custom whey.',
    offerBody:
      'The intended box uses private-label protein, creatine, hydration and micronutrients. It is not a 20 to 25 g identity-tested clear whey. Clinical services are not offered.',
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
      'Licensed consultations are not offered. People who leave an email will hear first if screening later opens in their state.',
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
    offerHeadline: 'The plan is free. Reserve the $59 box if you want it.',
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
  start: {
    id: 'start',
    path: '/go/start',
    source: 'go_start',
    documentTitle: 'Peptis: start the free continuity check',
    eyebrow: 'One screen. Then the quiz.',
    headline: 'See what the scale missed about your strength',
    lead: 'Eight questions. After the first two we save your summary email. About 3 minutes. No card.',
    ctaLabel: 'Get my free summary',
    ctaTo: '/quiz',
    micro: 'Education only. Clinical services are not offered.',
    stickyTitle: 'Free continuity check',
    stickyNote: '3 minutes. $0. No card.',
    closerEyebrow: 'Free continuity check',
    closerHeadline: 'Start the eight questions',
    closerBody: 'Written priorities and the two-day plan. Reserve the $59 box if you want updates.',
    showHeroPrompts: false,
    showLeadCapture: false,
    offerEyebrow: 'Free check first',
    offerHeadline: 'Start with the summary. Reserve the box if you want it.',
    offerBody: 'The check and plan are free. The founding $59 box can be reserved with no card.',
    pricingLeft: 'today for summary and plan',
    pricingMid: 'founding box $59/mo',
    pricingRight: 'no card to reserve',
    pricingNote: 'The $59 price is the founding box rate when we can charge and ship.',
  },
  visual: {
    id: 'visual',
    path: '/go/visual',
    source: 'go_visual',
    documentTitle: 'Peptis: what the trials measured',
    eyebrow: 'Interactive evidence',
    headline: 'Move the sliders. Then get your own written notes.',
    lead: 'Educational graphics from SURMOUNT 1, STEP 1 and protein reviews. Not Peptis results. Then an eight-question check.',
    ctaLabel: 'Get my free summary',
    ctaTo: '/quiz',
    micro: 'Lean mass is not skeletal muscle. Individual results vary.',
    stickyTitle: 'Free continuity check',
    stickyNote: '3 minutes. $0. No card.',
    closerEyebrow: 'Free continuity check',
    closerHeadline: 'Keep the notes the scale misses',
    closerBody: 'The graphics are trial evidence. Your summary is your own record.',
    showHeroPrompts: false,
    showLeadCapture: false,
    offerEyebrow: 'Evidence, then action',
    offerHeadline: 'See the split, then start the check',
    offerBody: 'About 75% fat and 25% lean in the SURMOUNT 1 substudy. Your function still has to be measured.',
    pricingLeft: 'today for summary and plan',
    pricingMid: 'founding box $59/mo',
    pricingRight: 'no card to reserve',
    pricingNote: 'Graphics are education from cited trials, not a Peptis before and after.',
  },
  compare: {
    id: 'compare',
    path: '/go/compare',
    source: 'go_compare',
    documentTitle: 'Peptis: move the trial sliders',
    eyebrow: 'Before and after, from the trials',
    headline: 'See the scan split. Then keep your own notes.',
    lead: 'Interactive trial graphics, not customer photos. Drag the sliders, then start the eight-question check.',
    ctaLabel: 'Get my free summary',
    ctaTo: '/quiz',
    micro: 'These are study averages. They are not Peptis results.',
    stickyTitle: 'Free continuity check',
    stickyNote: '3 minutes. $0. No card.',
    closerEyebrow: 'Free continuity check',
    closerHeadline: 'Turn the graphic into your own record',
    closerBody: 'Eight questions. Written priorities and the two-day plan.',
    showHeroPrompts: false,
    showLeadCapture: false,
    offerEyebrow: 'Evidence first',
    offerHeadline: 'Move the sliders, then start the check',
    offerBody: 'The graphics teach the cited trials. The quiz writes your own priorities.',
    pricingLeft: 'today for summary and plan',
    pricingMid: 'founding box $59/mo',
    pricingRight: 'no card to reserve',
    pricingNote: 'Before and after panels are trial education, not patient photos.',
  },
}

export function getLandingVariant(slug: string | undefined): LandingVariant | null {
  if (!slug) return null
  return landingVariants[slug as LandingVariantId] ?? null
}

export const hiddenLandingPaths = Object.values(landingVariants).map((variant) => variant.path)
