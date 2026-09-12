import assert from 'node:assert/strict'
import { randomBytes, randomUUID } from 'node:crypto'
import { mkdirSync } from 'node:fs'
import { spawn, spawnSync } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import bcrypt from 'bcryptjs'
import { TOTP } from 'otpauth'
import { PrismaClient } from '@prisma/client'

// Isolated disposable SQLite database: never inherit a production connection.
mkdirSync('.tmp', { recursive: true })
const database = `file:../.tmp/admin-qa-${randomUUID()}.db`
const base = 'http://localhost:3110'
const env = { ...process.env, DATABASE_URL: database, TURSO_DATABASE_URL: '', TURSO_AUTH_TOKEN: '', VERCEL: '', AUTH_URL: base, NEXTAUTH_URL: base, AUTH_SECRET: randomBytes(32).toString('base64'), ADMIN_2FA_ENCRYPTION_KEY: randomBytes(32).toString('base64'), AUTH_TRUST_HOST: 'true' }
const schema = spawnSync(process.execPath, ['node_modules/prisma/build/index.js', 'db', 'push', '--skip-generate'], { env: { ...process.env, DATABASE_URL: database, RUST_LOG: 'info' }, encoding: 'utf8' })
assert.equal(schema.status, 0, schema.stdout + schema.stderr)
const db = new PrismaClient({ datasources: { db: { url: env.DATABASE_URL } } })
const password = randomBytes(24).toString('base64url')
const email = 'litusagency@gmail.com'
const primary = await db.user.create({ data: { email, name: 'Former display name', role: 'admin', password: await bcrypt.hash(password, 12) } })
await db.user.create({ data: { email: 'secondary@example.invalid', name: 'Secondary test identity', role: 'admin', password: await bcrypt.hash(password, 12) } })
await db.adminSecurity.create({ data: { userId: primary.id } })
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3110'], { env, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true })
let diagnostic = ''
server.stdout.on('data', chunk => { diagnostic = (diagnostic + chunk).slice(-6000) })
server.stderr.on('data', chunk => { diagnostic = (diagnostic + chunk).slice(-6000) })
const passed = []
function ok(name) { passed.push(name); console.log('PASS ' + name) }
function jar() { return new Map() }
async function request(path, cookies = jar(), options = {}) {
  const headers = new Headers(options.headers)
  headers.set('cookie', [...cookies].map(([name, value]) => `${name}=${value}`).join('; '))
  const response = await fetch(base + path, { ...options, headers, redirect: 'manual' })
  for (const cookie of response.headers.getSetCookie()) {
    const item = cookie.split(';')[0]
    const index = item.indexOf('=')
    const name = item.slice(0, index), value = item.slice(index + 1)
    if (!value) cookies.delete(name)
    else cookies.set(name, value)
  }
  return response
}
async function login(cookies, code = '', account = email, candidate = password) {
  const { csrfToken } = await (await request('/api/auth/csrf', cookies)).json()
  const response = await request('/api/auth/callback/credentials', cookies, { method: 'POST', headers: { origin: base, 'Content-Type': 'application/x-www-form-urlencoded', 'X-Auth-Return-Redirect': '1' }, body: new URLSearchParams({ csrfToken, email: account, password: candidate, code, callbackUrl: base + '/admin' }) })
  const data = await response.json()
  return typeof data.url === 'string' && new URL(data.url, base).href === base + '/admin'
}
async function session(cookies) { return (await request('/api/auth/session', cookies)).json() }
async function security(cookies, action, code = '', candidate = password, origin = base) {
  const response = await request('/api/admin/security', cookies, { method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ action, password: candidate, code }) })
  return { status: response.status, body: await response.json() }
}
async function navigate(cookies) {
  for (const path of ['/admin', '/admin/settings', '/admin/leads', '/admin/media', '/admin/analytics', '/admin/blog', '/admin/portfolio', '/admin/market-analysis']) {
    for (const headers of [{}, { RSC: '1', 'Next-Router-Prefetch': '1' }]) {
      const response = await request(path, cookies, { headers })
      assert.equal(response.status, 200, `${path}: navigation status`)
      assert.equal(response.headers.get('location'), null, `${path}: unexpected redirect`)
      assert.match(response.headers.get('cache-control') || '', /no-store/)
      await response.text()
    }
  }
  assert.equal((await session(cookies)).user.name, 'Litus')
}

try {
  let ready = false
  for (let attempt = 0; attempt < 60; attempt++) {
    try { if ((await fetch(base + '/api/auth/csrf')).ok) { ready = true; break } } catch { /* startup */ }
    if (server.exitCode !== null) throw new Error('Test server exited: ' + diagnostic)
    await sleep(500)
  }
  assert(ready, 'Test server did not start: ' + diagnostic)
  const providers = await (await request('/api/auth/providers')).json()
  assert.equal(providers.credentials.callbackUrl, base + '/api/auth/callback/credentials')
  ok('auth URLs use the current host')
  for (const path of ['/admin', '/admin/settings', '/admin/leads']) {
    const response = await request(path)
    assert.equal(response.status, 307)
    assert.equal(new URL(response.headers.get('location'), base).href, base + '/login-admin')
  }
  for (const path of ['security', 'team', 'config', 'analytics', 'dashboard/stats', 'leads', 'leads/export', 'leads/example', 'blog', 'blog/example', 'media', 'media/example', 'portfolio/example', 'portfolio/reorder', 'editorial', 'market-analysis']) {
    assert.equal((await request('/api/admin/' + path)).status, 401, path)
  }
  ok('anonymous pages and administrative APIs are protected')
  for (const route of ['seed', 'rescue', 'setup-db', 'debug-db', 'debug-config', 'migrate-schema', 'migrate-analytics', 'migrate-lead-crm', 'export-data', 'test-analysis']) {
    assert.equal((await request('/api/' + route)).status, 410, route)
  }
  ok('historical bootstrap and debug bypasses are retired')
  assert.equal(await login(jar(), '', 'secondary@example.invalid'), false)
  assert.equal(await login(jar(), '', email, 'wrong-password'), false)
  ok('only the existing Litus account can authenticate')

  const admin = jar()
  assert.equal(await login(admin), true)
  const profile = await session(admin)
  assert.equal(profile.user.name, 'Litus')
  assert.equal(profile.user.role, 'admin')
  await navigate(admin)
  ok('eight admin destinations and RSC navigations retain the session')
  const team = await (await request('/api/admin/team', admin)).json()
  assert.equal(team.data.length, 1)
  assert.equal(team.data[0].name, 'Litus')
  const closedTeam = await request('/api/admin/team', admin, { method: 'POST', headers: { origin: base } })
  assert.equal(closedTeam.status, 410)
  ok('account management is read-only and single-account')
  assert.equal((await security(admin, 'begin', '', password, 'https://attacker.invalid')).status, 403)
  assert.equal((await security(admin, 'begin', '', 'wrong-password')).status, 403)
  ok('2FA changes require same-origin requests and password confirmation')

  const csrf = await (await request('/api/auth/csrf', admin)).json()
  await request('/api/auth/session', admin, { method: 'POST', headers: { origin: base, 'Content-Type': 'application/json' }, body: JSON.stringify({ csrfToken: csrf.csrfToken, data: { name: 'Injected', role: 'commercial', securityVersion: 999, twoFactorVerified: true } }) })
  const unchanged = await session(admin)
  assert.equal(unchanged.user.name, 'Litus')
  assert.equal(unchanged.user.role, 'admin')
  assert.equal(unchanged.user.securityVersion, 0)
  assert.equal(unchanged.user.twoFactorVerified, false)
  ok('client session updates cannot alter identity or security claims')

  const begin = await security(admin, 'begin')
  assert.equal(begin.status, 200)
  assert.match(begin.body.qr, /^data:image\/png;base64,/)
  const pending = await db.adminSecurity.findUniqueOrThrow({ where: { id: 'litus' } })
  assert.match(pending.pendingSecret, /^v1\./)
  assert.notEqual(pending.pendingSecret, begin.body.secret)
  assert.equal(pending.secret, null)
  const otp = new TOTP({ secret: begin.body.secret, algorithm: 'SHA1', digits: 6, period: 30 })
  assert.equal((await security(admin, 'confirm', 'abcdef')).status, 400)
  const firstCode = otp.generate()
  const confirm = await security(admin, 'confirm', firstCode)
  assert.equal(confirm.status, 200)
  assert.equal(confirm.body.enabled, true)
  assert.equal(confirm.body.recoveryCodes.length, 10)
  const recovery = confirm.body.recoveryCodes
  const active = await db.adminSecurity.findUniqueOrThrow({ where: { id: 'litus' } })
  assert.match(active.secret, /^v1\./)
  assert.equal(active.pendingSecret, null)
  assert(!active.recoveryHashes.includes(recovery[0].replaceAll('-', '')))
  assert.equal((await request('/api/admin/security', admin)).status, 401)
  ok('confirmed enrollment encrypts the seed, hashes recovery codes and revokes old sessions')

  assert.equal(await login(jar()), false)
  assert.equal(await login(jar(), firstCode), false)
  const secondCode = otp.generate({ timestamp: Date.now() + 30_000 })
  const withOtp = jar()
  assert.equal(await login(withOtp, secondCode), true)
  assert.equal(await login(jar(), secondCode), false)
  await navigate(withOtp)
  ok('2FA is mandatory; accepted TOTP codes are single-use; navigation remains authenticated')

  const withRecovery = jar()
  assert.equal(await login(withRecovery, recovery[0]), true)
  assert.equal(await login(jar(), recovery[0]), false)
  const [raceA, raceB] = await Promise.all([login(jar(), recovery[9]), login(jar(), recovery[9])])
  assert.equal(Number(raceA) + Number(raceB), 1)
  const status = await (await request('/api/admin/security', withRecovery)).json()
  assert.equal(status.recoveryCodesRemaining, 8)
  assert.deepEqual(Object.keys(status).sort(), ['enabled', 'recoveryCodesRemaining', 'success'])
  ok('recovery codes are single-use even concurrently; status exposes no secrets')

  const disable = await security(withRecovery, 'disable', recovery[1])
  assert.equal(disable.status, 200)
  assert.equal(disable.body.enabled, false)
  assert.equal((await request('/api/admin/security', withOtp)).status, 401)
  assert.equal((await request('/api/admin/security', withRecovery)).status, 401)
  ok('disabling requires both factors and invalidates every older session')

  await db.adminAuthAttempt.deleteMany()
  const fresh = jar()
  assert.equal(await login(fresh), true)
  const expiring = await security(fresh, 'begin')
  assert.equal(expiring.status, 200)
  await db.adminSecurity.update({ where: { id: 'litus' }, data: { pendingExpiresAt: BigInt(Date.now() - 1) } })
  const expiredOtp = new TOTP({ secret: expiring.body.secret }).generate()
  assert.equal((await security(fresh, 'confirm', expiredOtp)).status, 400)
  for (let attempt = 0; attempt < 12; attempt++) await login(jar(), '', email, 'wrong-password')
  assert.equal(await login(jar()), false)
  assert.equal((await session(fresh)).user.name, 'Litus')
  ok('expired enrollment is rejected and persistent throttling does not revoke established sessions')
  console.log(JSON.stringify({ passed: passed.length, database: 'isolated temporary SQLite', productionMutations: false }, null, 2))
} finally {
  await db.$disconnect()
  if (server.exitCode === null) await new Promise(resolve => { server.once('close', resolve); server.kill() })
}
