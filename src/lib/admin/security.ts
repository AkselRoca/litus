import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/database_final'
import { ADMIN_EMAIL } from './identity'
import { attemptKey, decryptSecret, encryptSecret, newAuthenticator, newRecoveryCodes, normalizeRecovery, recoveryHash, validStep } from './totp'

export interface SecurityState {
  id: string
  userId: string
  secret: string | null
  pendingSecret: string | null
  pendingExpiresAt: number | bigint | null
  lastUsedStep: number
  version: number
  recoveryHashes: string
  email: string
  role: string
}
export class SecurityError extends Error {
  constructor(message: string, public status = 400) { super(message) }
}
export async function getSecurity() {
  const rows = await prisma.$queryRaw<SecurityState[]>`
    SELECT s.*, u.email, u.role FROM AdminSecurity s
    JOIN User u ON u.id = s.userId WHERE s.id = 'litus' LIMIT 1`
  const state = rows[0]
  return state?.email === ADMIN_EMAIL && state.role === 'admin' ? state : null
}
export async function takeAttempt(key: string, limit = 12, now = Date.now()) {
  const hash = attemptKey(key)
  const cutoff = now - 5 * 60_000
  const retention = now - 24 * 60 * 60_000
  await prisma.$executeRaw`DELETE FROM AdminAuthAttempt WHERE windowStart < ${retention}`
  const rows = await prisma.$queryRaw<{ attempts: number }[]>`
    INSERT INTO AdminAuthAttempt (key, windowStart, attempts) VALUES (${hash}, ${now}, 1)
    ON CONFLICT(key) DO UPDATE SET
      attempts = CASE WHEN windowStart <= ${cutoff} THEN 1 ELSE attempts + 1 END,
      windowStart = CASE WHEN windowStart <= ${cutoff} THEN ${now} ELSE windowStart END
    RETURNING attempts`
  return Number(rows[0]?.attempts) <= limit
}
export async function checkPassword(password: string) {
  if (!password || password.length > 256) return false
  const user = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } })
  return !!user && user.role === 'admin' && await bcrypt.compare(password, user.password)
}
export async function consumeFactor(state: SecurityState, input: string) {
  if (!state.secret || input.length > 64) return false
  const code = input.trim().replace(/\s/g, '')
  if (/^\d{6}$/.test(code)) {
    const step = validStep(decryptSecret(state.secret), code)
    if (step === null || step <= Number(state.lastUsedStep)) return false
    const changed = await prisma.$executeRaw`
      UPDATE AdminSecurity SET lastUsedStep = ${step}
      WHERE id = 'litus' AND version = ${state.version} AND secret = ${state.secret} AND lastUsedStep < ${step}`
    return changed === 1
  }
  if (!/^[a-f0-9]{20}$/.test(normalizeRecovery(code))) return false
  const hashes: string[] = JSON.parse(state.recoveryHashes)
  const hash = recoveryHash(code)
  if (!hashes.includes(hash)) return false
  const remaining = JSON.stringify(hashes.filter(item => item !== hash))
  const changed = await prisma.$executeRaw`
    UPDATE AdminSecurity SET recoveryHashes = ${remaining}
    WHERE id = 'litus' AND version = ${state.version} AND recoveryHashes = ${state.recoveryHashes} AND secret = ${state.secret}`
  return changed === 1
}
export async function beginEnrollment(state: SecurityState) {
  if (state.secret) throw new SecurityError('La double authentification est déjà activée.', 409)
  const setup = newAuthenticator()
  const encrypted = encryptSecret(setup.secret)
  const expiresAt = Date.now() + 10 * 60_000
  const changed = await prisma.$executeRaw`
    UPDATE AdminSecurity SET pendingSecret = ${encrypted}, pendingExpiresAt = ${expiresAt}
    WHERE id = 'litus' AND version = ${state.version} AND secret IS NULL`
  if (changed !== 1) throw new SecurityError('La configuration a changé. Rechargez la page.', 409)
  return { ...setup, expiresAt }
}
export async function confirmEnrollment(state: SecurityState, code: string) {
  const now = Date.now()
  if (state.secret || !state.pendingSecret || Number(state.pendingExpiresAt) < now) {
    throw new SecurityError('Le QR code a expiré. Recommencez la configuration.')
  }
  const step = validStep(decryptSecret(state.pendingSecret), code.trim())
  if (step === null) throw new SecurityError('Code incorrect ou expiré. Utilisez le code actuel de Google Authenticator.')
  const recovery = newRecoveryCodes()
  const changed = await prisma.$executeRaw`
    UPDATE AdminSecurity SET secret = pendingSecret, pendingSecret = NULL, pendingExpiresAt = NULL,
      lastUsedStep = ${step}, recoveryHashes = ${recovery.hashes}, version = version + 1
    WHERE id = 'litus' AND version = ${state.version} AND secret IS NULL
      AND pendingSecret = ${state.pendingSecret} AND pendingExpiresAt >= ${now}`
  if (changed !== 1) throw new SecurityError('La configuration a changé. Recommencez.', 409)
  return recovery.codes
}
export async function disableFactor(state: SecurityState, code: string) {
  if (!await consumeFactor(state, code)) throw new SecurityError('Code incorrect, expiré ou déjà utilisé.', 403)
  const changed = await prisma.$executeRaw`
    UPDATE AdminSecurity SET secret = NULL, pendingSecret = NULL, pendingExpiresAt = NULL,
      lastUsedStep = -1, recoveryHashes = '[]', version = version + 1
    WHERE id = 'litus' AND version = ${state.version} AND secret = ${state.secret}`
  if (changed !== 1) throw new SecurityError('La configuration a changé. Rechargez la page.', 409)
}
