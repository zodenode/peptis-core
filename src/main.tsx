import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PostHogProvider } from 'posthog-js/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { getPostHog, initPostHog, posthog } from './lib/posthog.ts'
import './index.css'

initPostHog()

const root = createRoot(document.getElementById('root')!)
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

root.render(
  getPostHog() ? <PostHogProvider client={posthog}>{app}</PostHogProvider> : app,
)
