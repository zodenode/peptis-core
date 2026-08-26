# Peptis Core Continuity — Founding Reservation

Premium medical-wellness storefront for **Peptis Continuation & Optimization** (operated by Information Edge Insights LLC). Single-page landing plus an interactive qualification quiz. Vite + React + TypeScript.

## Run locally

```bash
npm install
cp .env.example .env
# add VITE_PUBLIC_POSTHOG_KEY (optional for local UI work)
npm run dev
```

- Landing: `/`
- Quiz: `/quiz`
- Brand kit (static): `/brand-kit/`

## Production

- **GitHub:** https://github.com/zodenode/peptis-core (`main`)
- **Railway:** project `peptis-core` / service `peptis-web`
- **Live URL:** https://peptis-web-production.up.railway.app

Custom domain notes live in `GODADDY-DNS.md`.

## Positioning

Peptis is building a future state-by-state continuity service. The current offer is a **$0 founding reservation** with a planned **$299/month** founding rate if services launch, the member is eligible, and they affirmatively enroll. The planned standard rate after founding enrollment is $399/month. Pricing and availability may change before activation. Optional Lean Mass Bundle interest is planned at +$59/month at launch.

The reservation includes no medical care, clinician review, prescription, pharmacy fulfillment, or payment. Stripe wallet UI is a future-activation preview; see [`docs/STRIPE-ACTIVATION.md`](./docs/STRIPE-ACTIVATION.md).

## Evidence led homepage

The homepage includes data driven body composition, continuity framework, evidence and founding
offer visuals. Public statistics come from
[`brand-kit/Peptis_GLP1_Body_Recomposition_Evidence_Dossier_Final.docx`](./brand-kit/Peptis_GLP1_Body_Recomposition_Evidence_Dossier_Final.docx)
and carry nearby source and interpretation notes.

Project copy guidance lives in
[`.cursor/skills/peptis-evidence-copy/SKILL.md`](./.cursor/skills/peptis-evidence-copy/SKILL.md).
Use it for Peptis claims, infographics, quiz copy, supplement messaging and continuity content.

## Quiz

Eight screening questions, branching educational stop-blocks and qualitative social-proof intersplices (muscle / energy / GI), a universal founding-trust page, then identity + state verification and a $0 reservation. Answers persist in `localStorage` (`peptis.continuity.quiz`) for abandonment resume.

The legacy client-decoded restricted compound configuration remains isolated in `src/data/continuityConfig.ts`, but compound names are not shown in current patient-facing funnel copy.

There is **no Meta Pixel** on the landing page or quiz.

## PostHog

Installed via `posthog-js`. Init: `src/lib/posthog.ts`. Components call `src/lib/analytics.ts` only.

| Variable | Required | Default |
|---|---|---|
| `VITE_PUBLIC_POSTHOG_KEY` | Yes, to send events | — |
| `VITE_PUBLIC_POSTHOG_HOST` | No | `https://us.i.posthog.com` |

Copy `.env.example` → `.env`. Do not commit `.env`.

### Events

Landing: `landing_viewed`, `hero_cta_clicked`, `section_viewed` `{ section }`, `trust_badge_viewed`, `quiz_cta_clicked` `{ location }`.

Quiz: `quiz_started`, `quiz_step_viewed`, `quiz_option_selected`, `quiz_stop_block_viewed`, `quiz_stop_block_continued`, `quiz_explainer_viewed`, `quiz_explainer_auto_advanced`, `quiz_social_proof_viewed`, `quiz_social_proof_auto_advanced`, `quiz_back_clicked`, `quiz_completed`, `checkout_viewed`, `stripe_activation_block_viewed`, `wallet_preview_clicked`, `upsell_toggled`, `lean_mass_interest_toggled`, `checkout_submit_clicked`, `founding_reservation_submitted`, `quiz_abandoned`.

Identify: `posthog.identify(email, { first_name, state, plan })` when a valid checkout email is entered.

Email abandonment copy and event → flow mapping: [`docs/EMAIL-ABANDONMENT.md`](./docs/EMAIL-ABANDONMENT.md).

## Images

37 generated editorial stills live in [`public/images/continuity/`](./public/images/continuity/) (including 12 new 3:4 funnel images). Prompts: [`public/images/continuity/PROMPTS.md`](./public/images/continuity/PROMPTS.md).

## Brand

- Light lockup: `/peptis-logo-green.png` (sage `#3F5B3A`)
- Dark lockup: `/peptis-logo-bronze.png` (bronze `#C4A882`)
- Type: Fraunces (display) + Manrope (body)
- Full kit: [`brand-kit/`](./brand-kit/)

## Note

Front-end only. Live prescribing requires licensed providers, pharmacy partners, state coverage, and compliance (HIPAA, LegitScript, compounding disclosures). Compounded medications are not individually FDA-approved.
