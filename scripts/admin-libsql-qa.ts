import assert from 'node:assert/strict'
import { randomBytes, randomUUID } from 'node:crypto'
import { mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { createClient } from '@libsql/client'
import { TOTP, Secret } from 'otpauth'

async function main() {
  const directory = path.resolve('.tmp')
  const filename = path.join(directory, `admin-libsql-qa-${randomUUID()}.db`)
  await mkdir(directory, { recursive: true })
  const url = pathToFileURL(filename).href
  // Override every database target before loading application modules.
  process.env.DATABASE_URL = url
  process.env.TURSO_DATABASE_URL = url
  process.env.TURSO_AUTH_TOKEN = 'isolated-local-test'
  process.env.AUTH_SECRET = randomBytes(32).toString('base64')
  process.env.ADMIN_2FA_ENCRYPTION_KEY = randomBytes(32).toString('base64')
  const db = createClient({ url })
  let disconnect: (() => Promise<void>) | undefined
  try {
    // Match the production INTEGER declaration, not db push's BIGINT.
    await db.executeMultiple(`
      CREATE TABLE User (id TEXT PRIMARY KEY, email TEXT, role TEXT);
      CREATE TABLE AdminSecurity (
        id TEXT PRIMARY KEY, userId TEXT, secret TEXT, pendingSecret TEXT,
        pendingExpiresAt INTEGER, lastUsedStep INTEGER DEFAULT -1,
        version INTEGER DEFAULT 0, recoveryHashes TEXT DEFAULT '[]'
      );
      CREATE TABLE AdminAuthAttempt (key TEXT PRIMARY KEY, windowStart INTEGER, attempts INTEGER);
    `)
    const { ADMIN_EMAIL } = await import('../src/lib/admin/identity')
    await db.execute({ sql: 'INSERT INTO User VALUES (?, ?, ?)', args: ['local-test', ADMIN_EMAIL, 'admin'] })
    await db.execute("INSERT INTO AdminSecurity (id, userId) VALUES ('litus', 'local-test')")
    const { prisma } = await import('../src/lib/database_final')
    disconnect = () => prisma.$disconnect()
    const { getSecurity, beginEnrollment, confirmEnrollment, consumeFactor, disableFactor, takeAttempt } = await import('../src/lib/admin/security')
    const initial = await getSecurity()
    assert.ok(initial)
    assert.equal(initial.pendingExpiresAt, null)
    assert.equal(await takeAttempt('isolated-login'), true)
    const setup = await beginEnrollment(initial)
    const pending = await getSecurity()
    assert.ok(pending)
    assert.equal(Number(pending.pendingExpiresAt), setup.expiresAt)
    assert.ok(Number(pending.pendingExpiresAt) > 2 ** 31)
    assert.notEqual(pending.pendingSecret, setup.secret)
    // This is the query used before the fix: it must reproduce the incident.
    await assert.rejects(() => prisma.$queryRawUnsafe("SELECT s.* FROM AdminSecurity s WHERE id = 'litus'"))
    console.log('PASS: production timestamp failure reproduced; corrected session read succeeds')
    const totp = new TOTP({ secret: Secret.fromBase32(setup.secret), digits: 6, period: 30, algorithm: 'SHA1' })
    const setupCode = totp.generate()
    const recovery = await confirmEnrollment(pending, setupCode)
    assert.equal(recovery.length, 10)
    const enabled = await getSecurity()
    assert.ok(enabled?.secret)
    assert.equal(enabled.version, 1)
    assert.equal(enabled.pendingExpiresAt, null)
    assert.equal(await consumeFactor(enabled, setupCode), false)
    assert.equal(await consumeFactor(enabled, totp.generate({ timestamp: Date.now() + 30_000 })), true)
    const current = await getSecurity()
    assert.ok(current)
    assert.equal(await consumeFactor(current, recovery[0]), true)
    assert.equal(await consumeFactor(current, recovery[0]), false)
    const beforeDisable = await getSecurity()
    assert.ok(beforeDisable)
    await disableFactor(beforeDisable, recovery[1])
    const disabled = await getSecurity()
    assert.ok(disabled)
    assert.equal(disabled.secret, null)
    assert.equal(disabled.version, 2)
    await beginEnrollment(disabled)
    await db.execute("UPDATE AdminSecurity SET pendingExpiresAt = 1700000000000 WHERE id = 'litus'")
    const expired = await getSecurity()
    assert.ok(expired)
    await assert.rejects(() => confirmEnrollment(expired, '000000'))
    for (let i = 1; i < 12; i++) assert.equal(await takeAttempt('isolated-login'), true)
    assert.equal(await takeAttempt('isolated-login'), false)
    console.log('PASS: enrollment, fresh code, replay prevention, recovery, revocation, expiry and rate limit with LibSQL')
  } finally {
    if (disconnect) await disconnect()
    db.close()
    // Only remove this uniquely named test database inside the workspace.
    if (path.dirname(filename) !== directory) throw new Error('Unsafe test cleanup path')
    for (const suffix of ['', '-shm', '-wal']) await rm(filename + suffix, { force: true })
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : 'LibSQL security test failed')
  process.exitCode = 1
})
