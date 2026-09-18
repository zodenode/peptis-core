import { register } from 'node:module'
import { writeFileSync } from 'node:fs'
import path from 'node:path'

register('./resolve-ts.mjs', import.meta.url)

const accept = process.argv.includes('--accept')
const {
  acceptedOverlays,
  auditPublication,
  renderOverlayFile,
} = await import('../src/lib/publicationQa.ts')

const report = auditPublication()

function printFinding(finding) {
  const prefix = finding.severity.toUpperCase().padEnd(5)
  console.log(`${prefix} [${finding.slug}] ${finding.rule}: ${finding.message}`)
  if (finding.current) console.log(`       current:  ${finding.current}`)
  if (finding.proposed) console.log(`       proposed: ${finding.proposed}`)
}

console.log(`Publication QA: ${report.findings.length} finding(s) across ${new Set(report.findings.map((item) => item.slug)).size} article(s)`)
console.log(`${report.errors.length} error(s), ${report.fixes.length} safe fix(es), ${report.warnings.length} warning(s)`)
console.log('')

for (const finding of report.findings) printFinding(finding)

if (accept) {
  const next = acceptedOverlays(report.fixes)
  const file = path.join(process.cwd(), 'src/data/publicationSeo.ts')
  writeFileSync(file, renderOverlayFile(next))
  console.log('')
  console.log(`Wrote accepted overlays to ${file}`)
  console.log('Body copy in blog.ts was not changed.')
  const after = (await import(`../src/data/publicationSeo.ts?accepted=${Date.now()}`)).publicationSeo
  console.log(`Accepted overlays now cover ${Object.keys(after).length} slug(s).`)
}

if (report.errors.length && !accept) {
  console.error('')
  console.error('Hard SEO/AEO errors block publish. Fix the essay or add an accepted overlay.')
  process.exit(1)
}

if (!report.errors.length && report.fixes.length && !accept) {
  console.log('')
  console.log('Safe metadata fixes are available. Re-run with --accept to write src/data/publicationSeo.ts.')
}
