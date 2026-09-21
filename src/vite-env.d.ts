/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_POSTHOG_KEY: string
  readonly VITE_PUBLIC_POSTHOG_HOST: string
  readonly VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string
  readonly VITE_COMPANY_POSTAL_ADDRESS?: string
  readonly VITE_META_PIXEL_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
