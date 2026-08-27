# Peptis Core Continuity — Founding Reservation

Premium medical-wellness storefront for **Peptis Continuation & Optimization** (operated by Information Edge Insights LLC). Landing page, interactive qualification quiz, evidence blog and a small reservation API. Vite + React + TypeScript + Express.

## Run locally

```bash
npm install
cp .env.example .env
# add VITE_PUBLIC_POSTHOG_KEY (optional for local UI work)
npm run build          # the API server serves dist/
npm start              # API + static on http://localhost:8787
npm run dev            # or Vite dev server (proxies /api to :8787)
```

- Landing: `/`
- Quiz: `/quiz`
- Blog: `/blog`
- Privacy: `/privacy`, health data notice: `/health-data`, cancellation: `/cancel?token=…`
- Brand kit (static): `/brand-kit/`

## Reservation API

`server.mjs` (Express) serves the built SPA and a durable reservation store:

- `POST /api/reservations` validates and appends to `DATA_DIR/reservations.jsonl` with fsync, then sends a confirmation email with a cancellation link. The quiz shows success only after this write is confirmed.
- `POST /api/reservations/cancel` appends a cancellation event (idempotent).
- `GET /api/health` for monitoring.

| Server variable | Required | Purpose |
|---|---|---|
| `DATA_DIR` | Yes in production | Point at a mounted Railway volume so reservations survive deploys |
| `RESEND_API_KEY` | For email | Resend API key for confirmation emails |
| `RESERVATION_EMAIL_FROM` | No | Defaults to `Peptis <reservations@peptis.com>` |
| `PUBLIC_BASE_URL` | No | Cancellation link base, defaults to `https://www.peptis.com` |

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

A Meta Pixel scaffold exists in `src/lib/pixel.ts` but stays inactive unless `VITE_META_PIXEL_ID` is set at build time. It fires `PageView` and a `Lead` event on confirmed reservation.

## PostHog

Installed via `posthog-js`. Init: `src/lib/posthog.ts`. Components call `src/lib/analytics.ts` only.

| Variable | Required | Default |
|---|---|---|
| `VITE_PUBLIC_POSTHOG_KEY` | Yes, to send events | — |
| `VITE_PUBLIC_POSTHOG_HOST` | No | `https://us.i.posthog.com` |

Copy `.env.example` → `.env`. Do not commit `.env`.

### Events

Landing: `landing_viewed`, `hero_cta_clicked`, `evidence_cta_clicked`, `section_viewed` `{ section }`, `trust_badge_viewed`, `faq_opened` `{ question }`, `quiz_cta_clicked` `{ location }` (hero, nav, embed, closer, pricing_strip, sticky_mobile).

Quiz: `quiz_started` `{ source }`, `quiz_embed_started`, `quiz_step_viewed`, `quiz_option_selected`, `quiz_stop_block_viewed`, `quiz_stop_block_continued`, `quiz_explainer_viewed`, `quiz_social_proof_viewed`, `quiz_summary_viewed`, `quiz_back_clicked`, `quiz_reached_checkout`, `quiz_completed`, `checkout_viewed`, `stripe_activation_block_viewed`, `upsell_toggled`, `lean_mass_interest_toggled`, `checkout_submit_clicked`, `founding_reservation_submitted` `{ reservation_id }`, `reservation_submit_failed`, `reservation_cancelled`, `quiz_abandoned`.

Blog: `blog_viewed`, `blog_article_viewed` `{ slug, category }`.

Identify: `posthog.identify(email, { first_name, state, plan })` at reservation submit only. Raw quiz answers are not sent to analytics; only derived pathways are.

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
