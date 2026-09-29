// Test process only: no Microsoft request leaves this process.
import fs from 'node:fs'

globalThis.fetch = async (url, options) => {
  if (String(url).startsWith('https://login.microsoftonline.com/')) {
    const body = new URLSearchParams(options.body)
    if (body.get('grant_type') !== 'client_credentials' || body.get('scope') !== 'https://graph.microsoft.com/.default') throw new Error('Unexpected token request')
    return Response.json({ access_token: 'mock-token' })
  }
  if (url === 'https://graph.microsoft.com/v1.0/users/support%40peptis.co/sendMail') {
    if (options.headers.Authorization !== 'Bearer mock-token') throw new Error('Unexpected Graph token')
    fs.appendFileSync(process.env.MOCK_MAIL_FILE, options.body + '\n')
    return new Response(null, { status: 202 })
  }
  throw new Error(`Unexpected external request: ${url}`)
}
