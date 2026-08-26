/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_POSTHOG_KEY: string
  readonly VITE_PUBLIC_POSTHOG_HOST: string
  readonly VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
