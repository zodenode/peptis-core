# Peptis

Evidence-led body recomposition and GLP-1 continuity website for Peptis.

The project includes:

- a cinematic, responsive body-recomposition landing page;
- a six-step quiz that generates a detailed 12-week starting plan;
- a GLP-1 continuity landing page with a five-phase scroll story;
- an evidence library and eight long-form cornerstone articles;
- structured Article, FAQ and breadcrumb data;
- a lead-capture API backed by Cloudflare D1;
- reduced-motion, reduced-transparency, higher-contrast and dark-mode support.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Production validation:

```bash
npm run lint
npm run build
npm test
```

## Routes

- `/` — body recomposition landing page, quiz and generated plan
- `/glp-continuity` — GLP-1 continuity programme
- `/blog` — evidence library
- `/blog/[slug]` — evidence-based cornerstone guides

## Technology

Next.js-compatible React 19 source compiled with Vinext and Vite for Cloudflare Workers. Drizzle manages the D1 lead schema. The motion system uses native Pointer Events, `requestAnimationFrame`, CSS transforms and accessibility media queries.

## Medical boundary

Peptis provides general education and programme support. It does not diagnose, prescribe, guarantee eligibility or replace an individual clinician. All public medical claims require appropriate medical and legal review before a paid clinical launch.
