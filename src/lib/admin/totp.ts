import { createCipheriv, createDecipheriv, createHmac, randomBytes } from 'node:crypto'
import { Secret, TOTP } from 'otpauth'

function encryptionKey() {
  const value = process.env.ADMIN_2FA_ENCRYPTION_KEY
  if (!value) throw new Error('ADMIN_2FA_ENCRYPTION_KEY is required')
  const key = Buffer.from(value, 'base64')
  if (key.length !== 32) throw new Error('ADMIN_2FA_ENCRYPTION_KEY must contain 32 bytes')
  return key
}
export function encryptSecret(secret: string) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv)
  cipher.setAAD(Buffer.from('litus:admin-2fa:v1'))
  const encrypted = Buffer.concat([cipher.update(secret, 'utf8'), cipher.final()])
  return ['v1', iv.toString('base64url'), cipher.getAuthTag().toString('base64url'), encrypted.toString('base64url')].join('.')
}
export function decryptSecret(value: string) {
  const [version, iv, tag, encrypted] = value.split('.')
  if (version !== 'v1' || !iv || !tag || !encrypted) throw new Error('Invalid encrypted secret')
  const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), Buffer.from(iv, 'base64url'))
  decipher.setAAD(Buffer.from('litus:admin-2fa:v1'))
  decipher.setAuthTag(Buffer.from(tag, 'base64url'))
  return Buffer.concat([decipher.update(Buffer.from(encrypted, 'base64url')), decipher.final()]).toString('utf8')
}
export function authenticator(secret: string) {
  return new TOTP({ issuer: 'Litus', label: 'Administration', algorithm: 'SHA1', digits: 6, period: 30, secret })
}
export function newAuthenticator() {
  const secret = new Secret({ size: 20 }).base32
  return { secret, uri: authenticator(secret).toString() }
}
export function validStep(secret: string, code: string, now = Date.now()) {
  if (!/^\d{6}$/.test(code)) return null
  const delta = authenticator(secret).validate({ token: code, timestamp: now, window: 1 })
  return delta === null ? null : Math.floor(now / 30_000) + delta
}
export function normalizeRecovery(code: string) {
  return code.replace(/[\s-]/g, '').toLowerCase()
}
export function recoveryHash(code: string) {
  return createHmac('sha256', encryptionKey()).update('litus:recovery:' + normalizeRecovery(code)).digest('hex')
}
export function newRecoveryCodes() {
  const codes = Array.from({ length: 10 }, () => randomBytes(10).toString('hex').match(/.{1,5}/g)!.join('-'))
  return { codes, hashes: JSON.stringify(codes.map(recoveryHash)) }
}
export function attemptKey(value: string) {
  // Short-lived pseudonymous counters; no raw IPs or passwords.
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is required')
  return createHmac('sha256', secret).update('litus:attempt:' + value).digest('hex')
}
