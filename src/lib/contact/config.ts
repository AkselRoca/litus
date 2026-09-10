import 'server-only'
import { z } from 'zod'

const settings = z.object({
  RESEND_API_KEY: z.string().min(8),
  RESEND_FROM_EMAIL: z.string().email().refine(value => !/@(?:resend\.dev|gmail\.com|outlook\.com|hotmail\.com)$/i.test(value)),
  CONTACT_ALLOWED_ORIGINS: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.string().url().startsWith('https://'),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(8),
  CONTACT_HASH_SECRET: z.string().min(32),
  CONTACT_RATE_IP_LIMIT: z.coerce.number().int().min(1).max(100).default(5),
  CONTACT_RATE_IP_WINDOW_SECONDS: z.coerce.number().int().min(60).max(86400).default(900),
  CONTACT_RATE_GLOBAL_LIMIT: z.coerce.number().int().min(1).max(1000).default(30),
  CONTACT_RATE_GLOBAL_WINDOW_SECONDS: z.coerce.number().int().min(10).max(3600).default(60),
  CONTACT_REDIS_PREFIX: z.string().regex(/^[a-zA-Z0-9:_-]{1,60}$/).default('litus:contact:v1'),
})

export function contactConfiguration() {
  const result = settings.safeParse(process.env)
  if (!result.success) return { config: null, missing: [...new Set(result.error.issues.map(issue => String(issue.path[0])))] }
  const origins = result.data.CONTACT_ALLOWED_ORIGINS.split(',').map(value => value.trim())
  if (origins.some(origin => {
    try { const url = new URL(origin); return url.origin !== origin || !['http:', 'https:'].includes(url.protocol) || (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') } catch { return true }
  })) return { config: null, missing: ['CONTACT_ALLOWED_ORIGINS'] }
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL !== '1' && !process.env.CONTACT_TRUSTED_IP_HEADER) return { config: null, missing: ['CONTACT_TRUSTED_IP_HEADER'] }
  return { config: { ...result.data, origins }, missing: [] }
}
export type ContactConfig = NonNullable<ReturnType<typeof contactConfiguration>['config']>
