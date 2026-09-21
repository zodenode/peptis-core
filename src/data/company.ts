/** Public company identity. Set COMPANY_POSTAL_ADDRESS to the registered office if it is not yet in this file. */

export const COMPANY = {
  legalName: 'Information Edge Insights LLC',
  tradeName: 'Peptis',
  jurisdiction: 'Wyoming, United States',
  supportEmail: 'support@peptis.com',
  privacyEmail: 'privacy@peptis.com',
  responseTime: 'We answer support email within two business days.',
  postalLines: (
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_COMPANY_POSTAL_ADDRESS
      ? String(import.meta.env.VITE_COMPANY_POSTAL_ADDRESS).split('|')
      : [
          'Information Edge Insights LLC',
          'Registered in Wyoming, United States',
          'Registered office on file with the Wyoming Secretary of State',
        ]
  ),
} as const

export function companyPostalBlock(): string {
  return [...COMPANY.postalLines, COMPANY.supportEmail].join('\n')
}
