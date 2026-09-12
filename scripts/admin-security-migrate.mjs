import { createClient } from '@libsql/client'
const url = process.env.TURSO_DATABASE_URL
if (!url || !process.env.TURSO_AUTH_TOKEN) throw new Error('Turso credentials are required')
const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN })
const tx = await client.transaction('write')
try {
  const users = await tx.execute({ sql: 'SELECT id, role FROM User WHERE email = ?', args: ['litusagency@gmail.com'] })
  if (users.rows.length !== 1 || users.rows[0].role !== 'admin') throw new Error('The existing Litus administrator must be present')
  const id = String(users.rows[0].id)
  await tx.execute(`CREATE TABLE IF NOT EXISTS AdminSecurity (
    id TEXT PRIMARY KEY NOT NULL DEFAULT 'litus', userId TEXT UNIQUE NOT NULL,
    secret TEXT, pendingSecret TEXT, pendingExpiresAt INTEGER,
    lastUsedStep INTEGER NOT NULL DEFAULT -1, version INTEGER NOT NULL DEFAULT 0,
    recoveryHashes TEXT NOT NULL DEFAULT '[]')`)
  await tx.execute(`CREATE TABLE IF NOT EXISTS AdminAuthAttempt (
    key TEXT PRIMARY KEY NOT NULL, windowStart INTEGER NOT NULL, attempts INTEGER NOT NULL)`)
  await tx.execute({ sql: "INSERT INTO AdminSecurity (id, userId) VALUES ('litus', ?) ON CONFLICT(id) DO NOTHING", args: [id] })
  const state = await tx.execute("SELECT userId FROM AdminSecurity WHERE id = 'litus'")
  if (state.rows[0]?.userId !== id) throw new Error('Existing security owner mismatch; no changes applied')
  await tx.execute({ sql: 'UPDATE User SET name = ? WHERE id = ?', args: ['Litus', id] })
  await tx.commit()
  console.log('Litus security tables ready. Display name updated. Password, other identities and existing 2FA preserved.')
} catch (error) {
  await tx.rollback()
  throw error
} finally {
  tx.close()
  client.close()
}
