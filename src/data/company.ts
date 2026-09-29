import company from '../../shared/company.json'
/** Business correspondence address verified against the shared company record on 22 September 2026. */

export const COMPANY = {
  legalName: 'Information Edge Insights LLC',
  tradeName: 'Peptis',
  jurisdiction: 'Wyoming, United States',
  supportEmail: 'support@peptis.co',
  privacyEmail: 'support@peptis.co',
  responseTime: 'We aim to reply within two business days.',
  postalLines: (
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_COMPANY_POSTAL_ADDRESS
      ? String(import.meta.env.VITE_COMPANY_POSTAL_ADDRESS).split('|')
      : [
          ...company.postalLines,
        ]
  ),
} as const

export function companyPostalBlock(): string {
  return [...COMPANY.postalLines, COMPANY.supportEmail].join('\n')
}
