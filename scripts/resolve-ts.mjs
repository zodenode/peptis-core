import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && !path.extname(specifier)) {
    const parentDir = path.dirname(fileURLToPath(context.parentURL))
    const tsPath = path.resolve(parentDir, `${specifier}.ts`)
    if (existsSync(tsPath)) {
      return { url: pathToFileURL(tsPath).href, shortCircuit: true }
    }
  }
  return nextResolve(specifier, context)
}
