export type ProviderOption = {
  id: string
  label: string
  mark: string
  tone: string
  logoSrc?: string
  logoFit?: 'wordmark' | 'icon'
}

export type RefinementOption = {
  id: string
  label: string
  detail?: string
}

export const providerOptions: ProviderOption[] = [
  {
    id: 'ro',
    label: 'Ro',
    mark: 'Ro',
    tone: 'ro',
    logoSrc:
      'https://lh3.googleusercontent.com/u/0/d/1zdEsVhYL01_5ocs1cfQd8acl1rDjE7Ic=w1363-h936-iv2?auditContext=prefetch',
    logoFit: 'wordmark',
  },
  { id: 'hims', label: 'Hims', mark: 'hims', tone: 'hims', logoSrc: '/images/providers/hims.svg', logoFit: 'wordmark' },
  { id: 'hers', label: 'Hers', mark: 'hers', tone: 'hers', logoSrc: '/images/providers/hers.svg', logoFit: 'wordmark' },
  {
    id: 'ivim',
    label: 'Ivím Health',
    mark: 'IVÍM',
    tone: 'ivim',
    logoSrc: 'https://media-s3-cdn.ivimhealth.com/assets/images/logos/ivim-black.svg',
    logoFit: 'wordmark',
  },
  {
    id: 'medvi',
    label: 'MEDVi',
    mark: 'MEDVi',
    tone: 'medvi',
    logoSrc: 'https://framerusercontent.com/images/xWKyg85eDVm8FJeXNodQY3RoGpE.png',
    logoFit: 'icon',
  },
  {
    id: 'mochi',
    label: 'Mochi Health',
    mark: 'mochi',
    tone: 'mochi',
    logoSrc: 'https://framerusercontent.com/images/C2tmkah1duhfKnKuj8ZzbxMag4A.png',
    logoFit: 'icon',
  },
  { id: 'noom_med', label: 'Noom Med', mark: 'noom', tone: 'noom', logoSrc: '/images/providers/noom.svg', logoFit: 'wordmark' },
  {
    id: 'ww_clinic',
    label: 'WeightWatchers Clinic',
    mark: 'WW',
    tone: 'ww',
    logoSrc: 'https://a.storyblok.com/f/286334833788875/1190x219/14b9ec3456/ww.svg',
    logoFit: 'wordmark',
  },
  { id: 'found', label: 'Found', mark: 'found', tone: 'found', logoSrc: '/images/providers/found.svg', logoFit: 'wordmark' },
  {
    id: 'lifemd',
    label: 'LifeMD',
    mark: 'LifeMD',
    tone: 'lifemd',
    logoSrc: 'https://lifemd.com/favicon/apple-touch-icon.png',
    logoFit: 'icon',
  },
  { id: 'other', label: 'Another provider', mark: '+', tone: 'other' },
  { id: 'none', label: 'No current provider', mark: 'None', tone: 'none' },
]

export const medicationOptions: RefinementOption[] = [
  { id: 'wegovy', label: 'Wegovy', detail: 'semaglutide' },
  { id: 'ozempic', label: 'Ozempic', detail: 'semaglutide' },
  { id: 'zepbound', label: 'Zepbound', detail: 'tirzepatide' },
  { id: 'mounjaro', label: 'Mounjaro', detail: 'tirzepatide' },
  { id: 'wegovy_oral', label: 'Wegovy pill', detail: 'oral semaglutide' },
  { id: 'foundayo', label: 'Foundayo', detail: 'orforglipron' },
  { id: 'saxenda', label: 'Saxenda', detail: 'liraglutide' },
  { id: 'compounded_semaglutide', label: 'Compounded semaglutide' },
  { id: 'compounded_tirzepatide', label: 'Compounded tirzepatide' },
  { id: 'another_or_unsure', label: 'Another medicine or not sure' },
  { id: 'none', label: 'Not currently taking one' },
  { id: 'prefer_not', label: 'Prefer not to say' },
]

export const trainingSettingOptions: RefinementOption[] = [
  { id: 'home', label: 'Mostly at home', detail: 'Bodyweight, bands or a few weights' },
  { id: 'gym', label: 'Mostly at a gym', detail: 'Machines, cables and free weights' },
  { id: 'both', label: 'A mix of both', detail: 'A flexible plan for either setting' },
  { id: 'undecided', label: 'I am still deciding', detail: 'Start with the simplest available option' },
]

function labelFor(options: RefinementOption[], id?: string) {
  return options.find((option) => option.id === id)?.label
}

export function providerLabel(id?: string) {
  return providerOptions.find((option) => option.id === id)?.label
}

export function medicationLabel(id?: string) {
  return labelFor(medicationOptions, id)
}

export function trainingSettingLabel(id?: string) {
  return labelFor(trainingSettingOptions, id)
}
