import { register } from 'node:module'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

register('./resolve-ts.mjs', import.meta.url)

const { publicationPartnerKit } = await import('../src/lib/publicationDiscoverability.ts')

const opsDir = path.join(process.cwd(), 'ops')
mkdirSync(opsDir, { recursive: true })
const file = path.join(opsDir, 'publication-partner-kit.json')
writeFileSync(file, `${JSON.stringify(publicationPartnerKit(), null, 2)}\n`)
console.log(`wrote ${file} (not served on the public site)`)
