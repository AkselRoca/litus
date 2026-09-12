import { auth } from '@/auth'
import { acquire, event, getState, listItems, release, saveItem, saveState } from './store'
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
    } else if (action === 'refresh') {
      const items = await listItems(namespace)
      const original = items.find(i => i.id === id && i.status === 'PUBLISHED' && !i.refreshOf)
      if (!original || !original.slug) throw new Error('Article publié introuvable')
      if (items.some(i => i.refreshOf === original.id && i.status !== 'PUBLISHED')) throw new Error('Une actualisation existe déjà')
      const draft = makeItems([topicSchema.parse(original)], state, new Date().toISOString())[0]
      await saveItem({ ...draft, refreshOf: original.id, refreshSlug: original.slug, refreshBaseHash: hash(original.content ?? '') }, owner)
    } else if (action === 'retry') {
      const items = await listItems(namespace)
      const item = items.find(i => i.id === id)
      if (!item || item.status === 'PUBLISHED') throw new Error('Brouillon introuvable')
      const last = items.reduce((value, i) => i.scheduledAt > value ? i.scheduledAt : value, state.anchor)
      const scheduledAt = namespace === 'production' && Date.parse(item.scheduledAt) <= Date.now() ? nextSlot(state.anchor, new Date(last)) : item.scheduledAt
      await saveItem({ ...item, status: 'IDEA', stage: 'RESEARCH', attempts: 0, corrections: 0, research: undefined, draft: undefined, review: undefined, gate: undefined, images: undefined, seo: undefined, links: undefined, content: undefined, slug: null, error: null, nextAttemptAt: null, scheduledAt }, owner)
    } else throw new Error('Action inconnue')
    await event(namespace, id || null, `ADMIN_${action.toUpperCase()}`, {})
  } finally { await release(namespace, owner) }
}
