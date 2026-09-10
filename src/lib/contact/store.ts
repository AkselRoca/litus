import 'server-only'
import { createHmac, randomUUID } from 'node:crypto'
import { isIP } from 'node:net'
import { createClient, type Client } from '@libsql/client'
import type { ContactConfig } from './config'

let sharedTurso: { signature: string; client: Client; ready: Promise<void> } | undefined

export async function resetContactStoreForTests() {
  if (process.env.NODE_ENV !== 'test') throw new Error('Test-only contact store reset')
  await sharedTurso?.client.close()
  sharedTurso = undefined
}

function redisReady(config: ContactConfig): config is ContactConfig & Required<Pick<ContactConfig, 'UPSTASH_REDIS_REST_URL' | 'UPSTASH_REDIS_REST_TOKEN'>> {
  return Boolean(config.UPSTASH_REDIS_REST_URL && config.UPSTASH_REDIS_REST_TOKEN)
}

function tursoStore(config: ContactConfig) {
  if (!config.TURSO_DATABASE_URL || !config.TURSO_AUTH_TOKEN) throw new Error('Contact store unavailable')
  const signature = `${config.TURSO_DATABASE_URL}:${config.TURSO_AUTH_TOKEN.slice(-8)}`
  if (!sharedTurso || sharedTurso.signature !== signature) {
    const client = createClient({ url: config.TURSO_DATABASE_URL, authToken: config.TURSO_AUTH_TOKEN })
    const ready = client.batch([
      `CREATE TABLE IF NOT EXISTS ContactRateEvent (bucket TEXT NOT NULL, eventId TEXT NOT NULL, createdAt INTEGER NOT NULL, PRIMARY KEY (bucket, eventId))`,
      `CREATE INDEX IF NOT EXISTS ContactRateEvent_bucket_createdAt ON ContactRateEvent (bucket, createdAt)`,
      `CREATE TABLE IF NOT EXISTS ContactSubmissionState (storageKey TEXT PRIMARY KEY, fingerprint TEXT NOT NULL, owner TEXT NOT NULL, status TEXT NOT NULL, createdAt INTEGER NOT NULL, lockedUntil INTEGER NOT NULL)`,
    ], 'write').then(() => undefined)
    sharedTurso = { signature, client, ready }
  }
  return sharedTurso
}

async function withWriteTransaction<T>(config: ContactConfig, action: (transaction: Awaited<ReturnType<Client['transaction']>>) => Promise<T>) {
  const store = tursoStore(config)
  await store.ready
  const transaction = await store.client.transaction('write')
  try {
    const result = await action(transaction)
    await transaction.commit()
    return result
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export function digest(config: ContactConfig, value: string) {
  return createHmac('sha256', config.CONTACT_HASH_SECRET).update(value).digest('hex')
}
export function clientAddress(headers: Headers): string {
  const header = process.env.VERCEL === '1' ? 'x-vercel-forwarded-for' : process.env.CONTACT_TRUSTED_IP_HEADER
  if (!header) {
    if (process.env.NODE_ENV !== 'production') return '127.0.0.1'
    throw new Error('IP configuration unavailable')
  }
  const address = headers.get(header)?.trim() || ''
  if (!isIP(address)) throw new Error('Trusted IP unavailable')
  if (isIP(address) === 4) return address
  const canonical = new URL(`http://[${address}]`).hostname.slice(1, -1)
  const [left, right] = canonical.split('::')
  const start = left ? left.split(':') : []
  const end = right ? right.split(':') : []
  const full = canonical.includes('::') ? [...start, ...Array(8 - start.length - end.length).fill('0'), ...end] : start
  if (full.slice(0, 5).every(part => parseInt(part, 16) === 0) && full[5] === 'ffff') {
    const a = parseInt(full[6], 16), b = parseInt(full[7], 16)
    return `${a >> 8}.${a & 255}.${b >> 8}.${b & 255}`
  }
  return `${full.slice(0, 4).map(part => parseInt(part, 16).toString(16)).join(':')}::/64`
}
export async function redisCommand<T>(config: ContactConfig, command: (string | number)[]): Promise<T> {
  if (!redisReady(config)) throw new Error('Redis contact store unavailable')
  const response = await fetch(config.UPSTASH_REDIS_REST_URL, {
    method: 'POST', headers: { Authorization: `Bearer ${config.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command), cache: 'no-store', signal: AbortSignal.timeout(4000),
  })
  if (!response.ok) throw new Error('Contact store unavailable')
  const body = await response.json()
  if (body.error || body.result === undefined) throw new Error('Contact store rejected operation')
  return body.result as T
}
// Atomic sliding windows across all serverless instances, with Redis server time.
export const RATE_SCRIPT = `
local t = redis.call('TIME')
local now = tonumber(t[1]) * 1000 + math.floor(tonumber(t[2]) / 1000)
local retry = 0
for i = 1, 2 do
  local window = tonumber(ARGV[(i-1)*2+2]) * 1000
  redis.call('ZREMRANGEBYSCORE', KEYS[i], '-inf', now-window)
  if redis.call('ZCARD', KEYS[i]) >= tonumber(ARGV[(i-1)*2+1]) then
    local oldest = redis.call('ZRANGE', KEYS[i], 0, 0, 'WITHSCORES')
    retry = math.max(retry, math.ceil((tonumber(oldest[2])+window-now)/1000))
  end
end
if retry > 0 then return retry end
for i = 1, 2 do
  redis.call('ZADD', KEYS[i], now, ARGV[5])
  redis.call('EXPIRE', KEYS[i], tonumber(ARGV[(i-1)*2+2]))
end
return 0`
export async function checkRate(config: ContactConfig, ip: string) {
  if (!redisReady(config)) return checkTursoRate(config, ip)
  const prefix = `{${config.CONTACT_REDIS_PREFIX}}`
  const retry = await redisCommand<number>(config, ['EVAL', RATE_SCRIPT, 2, `${prefix}:global`, `${prefix}:ip:${digest(config, ip)}`,
    config.CONTACT_RATE_GLOBAL_LIMIT, config.CONTACT_RATE_GLOBAL_WINDOW_SECONDS,
    config.CONTACT_RATE_IP_LIMIT, config.CONTACT_RATE_IP_WINDOW_SECONDS, randomUUID()])
  if (!Number.isFinite(retry) || retry < 0) throw new Error('Invalid rate response')
  return retry
}

async function checkTursoRate(config: ContactConfig, ip: string) {
  const now = Date.now()
  const buckets = [
    { key: `${config.CONTACT_REDIS_PREFIX}:global`, limit: config.CONTACT_RATE_GLOBAL_LIMIT, window: config.CONTACT_RATE_GLOBAL_WINDOW_SECONDS * 1000 },
    { key: `${config.CONTACT_REDIS_PREFIX}:ip:${digest(config, ip)}`, limit: config.CONTACT_RATE_IP_LIMIT, window: config.CONTACT_RATE_IP_WINDOW_SECONDS * 1000 },
  ]
  return withWriteTransaction(config, async transaction => {
    let retry = 0
    for (const bucket of buckets) {
      await transaction.execute({ sql: 'DELETE FROM ContactRateEvent WHERE bucket = ? AND createdAt <= ?', args: [bucket.key, now - bucket.window] })
      const result = await transaction.execute({ sql: 'SELECT COUNT(*) AS total, MIN(createdAt) AS oldest FROM ContactRateEvent WHERE bucket = ?', args: [bucket.key] })
      const total = Number(result.rows[0]?.total ?? 0)
      const oldest = Number(result.rows[0]?.oldest ?? now)
      if (total >= bucket.limit) retry = Math.max(retry, Math.max(1, Math.ceil((oldest + bucket.window - now) / 1000)))
    }
    if (retry > 0) return retry
    const eventId = randomUUID()
    for (const bucket of buckets) await transaction.execute({ sql: 'INSERT INTO ContactRateEvent (bucket, eventId, createdAt) VALUES (?, ?, ?)', args: [bucket.key, eventId, now] })
    return 0
  })
}
// Uncertain deliveries keep their binding. Never retry after the provider's
// 24h deduplication window; completed requests remain cached for 25h.
export const CLAIM_SCRIPT = `
local now = tonumber(redis.call('TIME')[1])
local hash = redis.call('HGET', KEYS[1], 'fingerprint')
if hash then
  if hash ~= ARGV[1] then return 'conflict' end
  if redis.call('HGET', KEYS[1], 'status') == 'sent' then return 'sent' end
  if now-tonumber(redis.call('HGET', KEYS[1], 'created')) >= 82800 then return 'expired' end
  if tonumber(redis.call('HGET', KEYS[1], 'lockedUntil') or '0') > now then return 'pending' end
else
  redis.call('HSET', KEYS[1], 'fingerprint', ARGV[1], 'created', now)
  redis.call('EXPIRE', KEYS[1], 90000)
end
redis.call('HSET', KEYS[1], 'status', 'pending', 'owner', ARGV[2], 'lockedUntil', now+60)
return 'claimed'`
export function submissionKey(config: ContactConfig, id: string) { return `{${config.CONTACT_REDIS_PREFIX}}:submission:${digest(config, id)}` }
export async function claimSubmission(config: ContactConfig, key: string, fingerprint: string, owner: string) {
  if (!redisReady(config)) return claimTursoSubmission(config, key, fingerprint, owner)
  const result = await redisCommand<string>(config, ['EVAL', CLAIM_SCRIPT, 1, key, fingerprint, owner])
  if (!['claimed', 'sent', 'conflict', 'expired', 'pending'].includes(result)) throw new Error('Invalid claim response')
  return result
}

async function claimTursoSubmission(config: ContactConfig, key: string, fingerprint: string, owner: string) {
  const now = Math.floor(Date.now() / 1000)
  return withWriteTransaction(config, async transaction => {
    await transaction.execute({ sql: 'DELETE FROM ContactSubmissionState WHERE createdAt < ?', args: [now - 90000] })
    const result = await transaction.execute({ sql: 'SELECT fingerprint, status, createdAt, lockedUntil FROM ContactSubmissionState WHERE storageKey = ?', args: [key] })
    const current = result.rows[0]
    if (current) {
      if (String(current.fingerprint) !== fingerprint) return 'conflict'
      if (String(current.status) === 'sent') return 'sent'
      if (now - Number(current.createdAt) >= 82800) return 'expired'
      if (Number(current.lockedUntil) > now) return 'pending'
      await transaction.execute({ sql: 'UPDATE ContactSubmissionState SET owner = ?, status = ?, lockedUntil = ? WHERE storageKey = ?', args: [owner, 'pending', now + 60, key] })
      return 'claimed'
    }
    await transaction.execute({ sql: 'INSERT INTO ContactSubmissionState (storageKey, fingerprint, owner, status, createdAt, lockedUntil) VALUES (?, ?, ?, ?, ?, ?)', args: [key, fingerprint, owner, 'pending', now, now + 60] })
    return 'claimed'
  })
}
export const FINISH_SCRIPT = `
if redis.call('HGET', KEYS[1], 'owner') ~= ARGV[1] then return 0 end
redis.call('HSET', KEYS[1], 'status', ARGV[2], 'lockedUntil', 0)
return 1`
export async function finishSubmission(config: ContactConfig, key: string, owner: string, sent: boolean) {
  if (!redisReady(config)) return finishTursoSubmission(config, key, owner, sent)
  const result = await redisCommand<number>(config, ['EVAL', FINISH_SCRIPT, 1, key, owner, sent ? 'sent' : 'retry'])
  if (result !== 1) throw new Error('Submission lease lost')
}

async function finishTursoSubmission(config: ContactConfig, key: string, owner: string, sent: boolean) {
  const store = tursoStore(config)
  await store.ready
  const result = await store.client.execute({ sql: 'UPDATE ContactSubmissionState SET status = ?, lockedUntil = 0 WHERE storageKey = ? AND owner = ?', args: [sent ? 'sent' : 'retry', key, owner] })
  if (result.rowsAffected !== 1) throw new Error('Submission lease lost')
}
