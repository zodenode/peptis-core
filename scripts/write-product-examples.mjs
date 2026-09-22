import { mkdirSync, writeFileSync } from 'node:fs'
import { register } from 'node:module'
import path from 'node:path'

register('./resolve-ts.mjs', import.meta.url)

const { liveOffers, pathwayCopy, resultExamples } = await import('../src/data/productExamples.ts')

const outDir = path.join(process.cwd(), 'product-examples')
mkdirSync(outDir, { recursive: true })

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function card(example) {
  const priorities = example.pathways
    .map(
      (id) =>
        `<li><strong>${escapeHtml(pathwayCopy[id].label)}</strong><span>${escapeHtml(pathwayCopy[id].priority)}</span></li>`,
    )
    .join('')
  return `<article class="card">
  <p class="kicker">Example record. Not a patient result.</p>
  <h1>${escapeHtml(example.title)}</h1>
  <p>${escapeHtml(example.situation)}</p>
  <ul>${priorities}</ul>
  <p><strong>Starter plan:</strong> ${escapeHtml(example.plan)}</p>
  <p><strong>Essay:</strong> ${escapeHtml(example.essay.title)}</p>
  <p><strong>Box:</strong> ${escapeHtml(example.box)}</p>
  <p class="note">Education only. Individual results vary. Lean mass is not skeletal muscle. Evidence reviewed through August 21, 2026.</p>
</article>`
}

function page(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <title>${escapeHtml(title)}</title>
  <style>
    :root { --forest:#1e3a2f; --ink:#142620; --body:#44403c; --beige:#f6f1e8; --paper:#fffdf8; --bronze:#a08260; }
    body { margin: 0; background: var(--beige); color: var(--ink); font-family: Georgia, serif; line-height: 1.5; }
    main { width: min(760px, calc(100% - 2rem)); margin: 1.5rem auto 2.5rem; }
    .card, .offer { background: var(--paper); border: 1px solid rgba(30,58,47,.12); border-radius: 1rem; padding: 1.4rem 1.5rem; margin: 0 0 1rem; }
    .kicker { margin: 0 0 .4rem; letter-spacing: .14em; text-transform: uppercase; font-size: .72rem; color: var(--bronze); font-family: system-ui, sans-serif; font-weight: 700; }
    h1 { font-weight: 520; letter-spacing: -.03em; margin: .2rem 0 .6rem; }
    ul { padding-left: 1.1rem; }
    li { margin: .4rem 0; }
    .note { color: var(--body); font-size: .92rem; }
    .grid { display: grid; gap: .8rem; }
  </style>
</head>
<body><main>${body}</main></body>
</html>`
}

const indexRows = resultExamples
  .map((example) => `<li><a href="${example.id}.html">${escapeHtml(example.title)}</a></li>`)
  .join('')

const offerRows = liveOffers
  .map(
    (offer) =>
      `<article class="offer"><p class="kicker">${escapeHtml(offer.status)}</p><h1>${escapeHtml(offer.title)}</h1><p>${escapeHtml(offer.body)}</p></article>`,
  )
  .join('')

writeFileSync(
  path.join(outDir, 'index.html'),
  page(
    'Peptis product examples',
    `<p class="kicker">Drive upload pack</p><h1>Live offers and written-summary permutations</h1><p class="note">Examples only. Not testimonials. Not Peptis patient results.</p><div class="grid">${offerRows}</div><h2>Result permutations</h2><ul>${indexRows}</ul>`,
  ),
)

writeFileSync(
  path.join(outDir, '00-live-offers.html'),
  page('Peptis live offers', `<p class="kicker">What is live</p><h1>Four things you can use today</h1><div class="grid">${offerRows}</div>`),
)

for (const example of resultExamples) {
  writeFileSync(path.join(outDir, `${example.id}.html`), page(example.title, card(example)))
}

writeFileSync(
  path.join(outDir, 'README.md'),
  `# Product examples

Standalone HTML for ad and Drive review. These are labeled example records, not testimonials.

- \`index.html\` and \`00-live-offers.html\`: the four live offers.
- One file per written-summary permutation from the four quiz pathways.
- Site preview: \`/go/examples\` (robots Disallow \`/go/\`).
- Ad landing: \`/go/ad\` and \`/go/start\`.

Evidence reviewed through August 21, 2026. Education only. Individual results vary.
`,
)

console.log(`wrote ${resultExamples.length + 2} product example files to product-examples/`)
