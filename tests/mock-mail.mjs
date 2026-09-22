// Test process only: never contacts a real email service.
import fs from 'node:fs'
globalThis.fetch = async (url, options) => {
  if (url !== 'https://api.resend.com/emails') throw new Error(`Unexpected external request: ${url}`)
  const payload = JSON.parse(options.body)
  fs.appendFileSync(process.env.MOCK_MAIL_FILE, JSON.stringify(payload) + '\n')
  return new Response('{}', { status: payload.to.includes('failure@example.com') ? 503 : 200 })
}
