import fs from 'node:fs'
import { createHash } from 'node:crypto'
// Durable, idempotent queue. Provider acceptance is not proof of inbox delivery.
export function createOutbox({ file, deliver, enabled, accepted = () => {}, shouldSend = () => true }) {
  const active = new Map()
  const append = row => { const fd = fs.openSync(file, 'a', 0o600); try { fs.writeSync(fd, JSON.stringify({ ...row, at: Date.now() }) + '\n'); fs.fsyncSync(fd) } finally { fs.closeSync(fd) } }
  const state = () => {
    const map = new Map()
    if (!fs.existsSync(file)) return map
    for (const line of fs.readFileSync(file,'utf8').split('\n').filter(Boolean)) {
      try { const row = JSON.parse(line); map.set(row.id, { ...map.get(row.id), ...row }) } catch { /* interrupted last line */ }
    }
    return map
  }
  const attempt = (id) => {
    if (active.has(id)) return active.get(id)
    const promise = (async () => {
      const row = state().get(id)
      if (row.status === 'accepted') return { sent: true }
      if (row.status === 'suppressed' || !shouldSend(row.mail)) {
        if (row.status !== 'suppressed') append({ id, status: 'suppressed' })
        return { sent: false, queued: false, reason: 'unsubscribed' }
      }
      if (!enabled()) return { sent: false, queued: true }
      const result = await deliver({ ...row.mail, idempotencyKey: id })
      append({ id, status: result.sent ? 'accepted' : 'pending', attempts: (row.attempts || 0) + 1 })
      if (result.sent && row.metric) accepted(row.metric)
      return { ...result, queued: !result.sent }
    })().finally(() => active.delete(id))
    active.set(id, promise)
    return promise
  }
  return {
    async send(mail) {
      const id = mail.idempotencyKey || createHash('sha256').update(JSON.stringify(mail)).digest('hex')
      if (!state().has(id)) append({ id, status:'pending', mail, metric: mail.metric, attempts:0, createdAt:Date.now() })
      return attempt(id)
    },
    async retry() {
      if (!enabled()) return
      for (const row of state().values()) {
        const delay = Math.min(3600000, 60000 * 2 ** Math.min(row.attempts || 0, 6))
        if (row.status === 'pending' && Date.now() - row.at >= delay) await attempt(row.id)
      }
    },
  }
}
