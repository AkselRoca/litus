import { createClient, type Client } from '@libsql/client'
import { randomUUID } from 'node:crypto'
import type { Item, State } from './types'
import { hash } from './core'

let db: Client | undefined
export function editorialDb() {
  if (!db) {
    const url = process.env.EDITORIAL_DATABASE_URL || process.env.TURSO_DATABASE_URL
    if (!url) throw new Error('Editorial storage not configured')
    db = createClient({ url, authToken: url.startsWith('file:') ? undefined : process.env.TURSO_AUTH_TOKEN })
  }
  return db
}
export async function migrate() {
  await editorialDb().batch([
    `CREATE TABLE IF NOT EXISTS EditorialState (namespace TEXT PRIMARY KEY, data TEXT NOT NULL, leaseOwner TEXT, leaseUntil INTEGER NOT NULL DEFAULT 0)`,
    `CREATE TABLE IF NOT EXISTS EditorialItem (id TEXT PRIMARY KEY, namespace TEXT NOT NULL, status TEXT NOT NULL, scheduledAt TEXT NOT NULL, slug TEXT, data TEXT NOT NULL)`,
    `CREATE UNIQUE INDEX IF NOT EXISTS EditorialSlug ON EditorialItem(namespace, slug) WHERE slug IS NOT NULL`,
    `CREATE INDEX IF NOT EXISTS EditorialSchedule ON EditorialItem(namespace, status, scheduledAt)`,
    `CREATE TABLE IF NOT EXISTS EditorialEvent (id TEXT PRIMARY KEY, namespace TEXT NOT NULL, itemId TEXT, at TEXT NOT NULL, event TEXT NOT NULL, detail TEXT NOT NULL)`,
    `CREATE INDEX IF NOT EXISTS EditorialEventTime ON EditorialEvent(namespace, at)`,
    `CREATE TABLE IF NOT EXISTS EditorialBacklink (namespace TEXT NOT NULL, sourceSlug TEXT NOT NULL, targetSlug TEXT NOT NULL, anchor TEXT NOT NULL, originalHash TEXT NOT NULL, createdAt TEXT NOT NULL, PRIMARY KEY(namespace, sourceSlug, targetSlug))`,
    `CREATE TABLE IF NOT EXISTS EditorialRevisionSnapshot (id TEXT PRIMARY KEY, itemId TEXT NOT NULL, createdAt TEXT NOT NULL, data TEXT NOT NULL)`,
  ], 'write')
}
export async function getState(namespace: string): Promise<State | null> {
  const result = await editorialDb().execute({ sql: 'SELECT data FROM EditorialState WHERE namespace=?', args: [namespace] })
  return result.rows[0] ? JSON.parse(String(result.rows[0].data)) : null
}
export async function initialize(state: State) {
  await editorialDb().execute({ sql: 'INSERT OR IGNORE INTO EditorialState(namespace,data) VALUES (?,?)', args: [state.namespace, JSON.stringify(state)] })
}
export async function acquire(namespace: string) {
  const owner = randomUUID()
  const result = await editorialDb().execute({ sql: 'UPDATE EditorialState SET leaseOwner=?,leaseUntil=? WHERE namespace=? AND leaseUntil<?', args: [owner, Date.now() + 600_000, namespace, Date.now()] })
  return result.rowsAffected ? owner : null
}
export async function release(namespace: string, owner: string) {
  await editorialDb().execute({ sql: 'UPDATE EditorialState SET leaseOwner=NULL,leaseUntil=0 WHERE namespace=? AND leaseOwner=?', args: [namespace, owner] })
}
export async function saveState(state: State, owner: string) {
  const result = await editorialDb().execute({ sql: 'UPDATE EditorialState SET data=? WHERE namespace=? AND leaseOwner=? AND leaseUntil>?', args: [JSON.stringify(state), state.namespace, owner, Date.now()] })
  if (!result.rowsAffected) throw new Error('Editorial lease lost')
}
export async function listItems(namespace: string): Promise<Item[]> {
  const result = await editorialDb().execute({ sql: 'SELECT data FROM EditorialItem WHERE namespace=? ORDER BY scheduledAt ASC', args: [namespace] })
  return result.rows.map(row => JSON.parse(String(row.data)))
}
export async function saveItem(item: Item, owner: string) {
  const result = await editorialDb().execute({ sql: `INSERT INTO EditorialItem(id,namespace,status,scheduledAt,slug,data)
    SELECT ?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM EditorialState WHERE namespace=? AND leaseOwner=? AND leaseUntil>?)
    ON CONFLICT(id) DO UPDATE SET status=excluded.status,scheduledAt=excluded.scheduledAt,slug=excluded.slug,data=excluded.data`,
    args: [item.id, item.namespace, item.status, item.scheduledAt, item.slug, JSON.stringify(item), item.namespace, owner, Date.now()] })
  if (!result.rowsAffected) throw new Error('Editorial lease lost')
}
export async function event(namespace: string, itemId: string | null, name: string, detail: unknown) {
  // No provider responses, credentials or full source pages in application logs.
  await editorialDb().execute({ sql: 'INSERT INTO EditorialEvent VALUES (?,?,?,?,?,?)', args: [randomUUID(), namespace, itemId, new Date().toISOString(), name, JSON.stringify(detail)] })
  console.info('[Editorial]', name, itemId ?? namespace)
}
export async function recentEvents(namespace: string) {
  return (await editorialDb().execute({ sql: 'SELECT * FROM EditorialEvent WHERE namespace=? ORDER BY at DESC LIMIT 100', args: [namespace] })).rows
}
export async function commitPublication(item: Item, state: State, owner: string) {
  const tx = await editorialDb().transaction('write')
  try {
    const stateUpdate = await tx.execute({ sql: 'UPDATE EditorialState SET data=? WHERE namespace=? AND leaseOwner=? AND leaseUntil>?', args: [JSON.stringify(state), state.namespace, owner, Date.now()] })
    if (!stateUpdate.rowsAffected) throw new Error('Editorial lease lost')
    const itemUpdate = await tx.execute({ sql: "UPDATE EditorialItem SET status='PUBLISHED',data=? WHERE id=? AND status='SCHEDULED'", args: [JSON.stringify(item), item.id] })
    if (!itemUpdate.rowsAffected) throw new Error('Article already published or not scheduled')
    await tx.execute({ sql: 'INSERT INTO EditorialEvent VALUES (?,?,?,?,?,?)', args: [randomUUID(), state.namespace, item.id, item.publishedAt!, 'PUBLISHED', JSON.stringify({ slug: item.slug, score: item.qualityScore, scheduledAt: item.scheduledAt })] })
    await tx.commit()
  } catch (error) { await tx.rollback(); throw error } finally { tx.close() }
}

export async function commitRefresh(revision: Item, owner: string) {
  const tx = await editorialDb().transaction('write')
  try {
    const lease = await tx.execute({ sql: 'SELECT namespace FROM EditorialState WHERE namespace=? AND leaseOwner=? AND leaseUntil>?', args: [revision.namespace, owner, Date.now()] })
    if (!lease.rows.length) throw new Error('Editorial lease lost')
    const row = await tx.execute({ sql: "SELECT data FROM EditorialItem WHERE id=? AND status='PUBLISHED'", args: [revision.refreshOf!] })
    if (!row.rows[0]) throw new Error('Original article unavailable')
    const original = JSON.parse(String(row.rows[0].data)) as Item
    if (hash(original.content ?? '') !== revision.refreshBaseHash) throw new Error('Original article changed during revision')
    const changed = hash({ content: original.content, images: original.images }) !== hash({ content: revision.content, images: revision.images })
    const updated: Item = { ...revision, id: original.id, slug: original.slug, status: 'PUBLISHED', refreshOf: undefined, refreshSlug: undefined, refreshBaseHash: undefined,
      scheduledAt: original.scheduledAt, publishedAt: original.publishedAt, createdAt: original.createdAt, articleId: original.articleId, modifiedAt: changed ? new Date().toISOString() : original.modifiedAt, backlinkDone: original.backlinkDone }
    await tx.execute({ sql: 'INSERT INTO EditorialRevisionSnapshot VALUES (?,?,?,?)', args: [randomUUID(), original.id, new Date().toISOString(), JSON.stringify(original)] })
    await tx.execute({ sql: 'UPDATE EditorialItem SET data=? WHERE id=?', args: [JSON.stringify(updated), original.id] })
    const result = await tx.execute({ sql: "UPDATE EditorialItem SET status='PUBLISHED',data=? WHERE id=? AND status='SCHEDULED'", args: [JSON.stringify({ ...revision, status: 'PUBLISHED', publishedAt: new Date().toISOString() }), revision.id] })
    if (!result.rowsAffected) throw new Error('Revision already applied')
    await tx.commit()
    return updated.slug!
  } catch (error) { await tx.rollback(); throw error } finally { tx.close() }
}
