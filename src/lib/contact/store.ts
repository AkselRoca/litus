import 'server-only'
import { createHmac, randomUUID } from 'node:crypto'
import { isIP } from 'node:net'
import type { ContactConfig } from './config'

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
  const prefix = `{${config.CONTACT_REDIS_PREFIX}}`
  const retry = await redisCommand<number>(config, ['EVAL', RATE_SCRIPT, 2, `${prefix}:global`, `${prefix}:ip:${digest(config, ip)}`,
    config.CONTACT_RATE_GLOBAL_LIMIT, config.CONTACT_RATE_GLOBAL_WINDOW_SECONDS,
    config.CONTACT_RATE_IP_LIMIT, config.CONTACT_RATE_IP_WINDOW_SECONDS, randomUUID()])
  if (!Number.isFinite(retry) || retry < 0) throw new Error('Invalid rate response')
  return retry
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
  const result = await redisCommand<string>(config, ['EVAL', CLAIM_SCRIPT, 1, key, fingerprint, owner])
  if (!['claimed', 'sent', 'conflict', 'expired', 'pending'].includes(result)) throw new Error('Invalid claim response')
  return result
}
export const FINISH_SCRIPT = `
if redis.call('HGET', KEYS[1], 'owner') ~= ARGV[1] then return 0 end
redis.call('HSET', KEYS[1], 'status', ARGV[2], 'lockedUntil', 0)
return 1`
export async function finishSubmission(config: ContactConfig, key: string, owner: string, sent: boolean) {
  const result = await redisCommand<number>(config, ['EVAL', FINISH_SCRIPT, 1, key, owner, sent ? 'sent' : 'retry'])
  if (result !== 1) throw new Error('Submission lease lost')
}
