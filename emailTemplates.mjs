import fs from 'node:fs'
const company = JSON.parse(fs.readFileSync(new URL('./shared/company.json', import.meta.url), 'utf8'))
export const PRIORITIES = {
  muscle_protection: ['Strength and function', 'Record the weights and repetitions you can manage comfortably, plus an everyday task such as getting up from a chair. Use your starter plan to build a consistent routine.'],
  cellular_energy: ['Energy and recovery', 'Keep a short record of sleep, meals and energy across the day. Discuss persistent or worsening fatigue with your clinician.'],
  gi_repair: ['Digestive comfort', 'Note how meals, fluids and symptoms vary through the week. Ask your clinician about persistent symptoms or difficulty eating or drinking.'],
  rebound_protection: ['Maintenance planning', 'Choose a regular time to review training, meals and progress. Talk to your prescriber before changing medication.'],
}
export function cleanPriorities(value) {
  return Array.isArray(value) ? [...new Set(value.filter((key) => Object.hasOwn(PRIORITIES, key)))].slice(0, 4) : []
}
export function postalLines() {
  const override = process.env.COMPANY_POSTAL_ADDRESS || process.env.VITE_COMPANY_POSTAL_ADDRESS
  return override ? override.split('|').map((s) => s.trim()).filter(Boolean) : company.postalLines
}
export function resourceEmail({ firstName, baseUrl, priorities, unsubscribeUrl, box = false }) {
  const lines = [`Hi ${firstName || 'there'},`, '']
  if (box) {
    lines.push('You asked for Lean Mass nutrition box launch updates.', 'We will email you when the contents, price and shipping date are confirmed.', 'The current target is $59/month. This is an interest list: no order, price guarantee, payment or subscription has been created.')
  } else if (priorities) {
    lines.push('Your Peptis priorities', '')
    const keys = cleanPriorities(priorities)
    for (const key of keys) lines.push(...PRIORITIES[key], '')
    if (!keys.length) lines.push('Start with a simple baseline: your weekly training, protein routine and everyday strength.', '')
  } else {
    lines.push('Here is your free two-day strength starter guide.', '')
  }
  if (!box) lines.push(`Starter guide: ${baseUrl}/publication/training/two-day-strength-plan`, `Build or reopen a programme on this device: ${baseUrl}/plan`, '', 'Your custom programme is saved in your browser. Use the print/PDF or calendar export to keep a copy.', 'Education only. Ask your clinician before making changes to exercise, diet or medication.')
  lines.push('', `Stop product-update emails: ${unsubscribeUrl}`, 'For help or a privacy request: support@peptis.co', '', ...postalLines())
  return lines.join('\n')
}
