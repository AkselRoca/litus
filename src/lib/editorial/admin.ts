import { auth } from '@/auth'
import { commitCalendar, acquire, event, getState, listItems, release, saveItem, saveState } from './store'
import { hash, nextSlot } from './core'
import { makeItems } from './calendar'
import { topicSchema } from './types'

export async function isEditor() {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role
  return !!session?.user && (role === 'admin' || role === 'dev')
}
export async function control(namespace: string, action: string, id?: string) {
  if (!['production', 'test'].includes(namespace)) throw new Error('Invalid namespace')
  const owner = await acquire(namespace)
  if (!owner) throw new Error('Une étape est en cours. Réessayez dans quelques minutes.')
  try {
    const state = await getState(namespace)
    if (!state) throw new Error('Calendrier non initialisé')
    if (action === 'pause' || action === 'resume') {
      await saveState({ ...state, enabled: action === 'resume' }, owner)
    } else if (action === 'prepare') {
      const item = (await listItems(namespace)).find(i => i.id === id && i.status !== 'PUBLISHED')
      if (!item || item.draft) throw new Error('Le brouillon existe déjà ou le sujet est introuvable.')
      await commitCalendar(state, [{ ...item, prepareRequested: true, held: false, status: 'IDEA', stage: 'RESEARCH', attempts: 0, corrections: 0, nextAttemptAt: null, error: null, modifiedAt: new Date().toISOString() }], owner, 'ADMIN_PREPARE_REQUESTED')
    } else if (action === 'refresh') {
      const items = await listItems(namespace)
      const original = items.find(i => i.id === id && i.status === 'PUBLISHED' && !i.refreshOf)
      if (!original || !original.slug) throw new Error('Article publié introuvable')
      if (items.some(i => i.refreshOf === original.id && i.status !== 'PUBLISHED')) throw new Error('Une actualisation existe déjà')
      const draft = makeItems([topicSchema.parse(original)], state, new Date().toISOString())[0]
      await saveItem({ ...original, id: draft.id, createdAt: draft.createdAt, modifiedAt: draft.modifiedAt, status: 'REVIEW', stage: 'RESEARCH', held: true, manualEdits: true, manualSeo: true, gate: undefined, slug: `${original.slug}-revision-${draft.id.slice(0, 8)}`, publishedAt: null, refreshOf: original.id, refreshSlug: original.slug, refreshBaseHash: hash(original.content ?? '') }, owner)
    } else if (action === 'retry') {
      const items = await listItems(namespace)
      const item = items.find(i => i.id === id)
      if (!item || item.status === 'PUBLISHED') throw new Error('Brouillon introuvable')
      const last = items.reduce((value, i) => i.scheduledAt > value ? i.scheduledAt : value, state.anchor)
      const scheduledAt = namespace === 'production' && Date.parse(item.scheduledAt) <= Date.now() ? nextSlot(state.anchor, new Date(last)) : item.scheduledAt
      await commitCalendar(state, [{ ...item, status: item.draft ? 'REVIEW' : 'IDEA', stage: 'RESEARCH', manualEdits: !!item.draft, attempts: 0, corrections: 0, review: undefined, gate: undefined, error: null, nextAttemptAt: null, scheduledAt, modifiedAt: new Date().toISOString() }], owner, 'ADMIN_RETRY_SNAPSHOT')
    } else throw new Error('Action inconnue')
    await event(namespace, id || null, `ADMIN_${action.toUpperCase()}`, {})
  } finally { await release(namespace, owner) }
}
