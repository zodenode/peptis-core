export type ProviderOption = {
  id: string
  label: string
  mark: string
  tone: string
}

export type RefinementOption = {
  id: string
  label: string
  detail?: string
}

export const providerOptions: ProviderOption[] = [
  { id: 'ro', label: 'Ro', mark: 'Ro', tone: 'ro' },
  { id: 'hims', label: 'Hims', mark: 'hims', tone: 'hims' },
  { id: 'hers', label: 'Hers', mark: 'hers', tone: 'hers' },
  { id: 'ivim', label: 'Ivím Health', mark: 'IVÍM', tone: 'ivim' },
  { id: 'medvi', label: 'MEDVi', mark: 'MEDVi', tone: 'medvi' },
  { id: 'mochi', label: 'Mochi Health', mark: 'mochi', tone: 'mochi' },
  { id: 'noom_med', label: 'Noom Med', mark: 'noom', tone: 'noom' },
  { id: 'ww_clinic', label: 'WeightWatchers Clinic', mark: 'WW', tone: 'ww' },
  { id: 'found', label: 'Found', mark: 'found', tone: 'found' },
  { id: 'lifemd', label: 'LifeMD', mark: 'LifeMD', tone: 'lifemd' },
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
