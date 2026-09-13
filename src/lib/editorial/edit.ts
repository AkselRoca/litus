import { z } from 'zod'
import { INTERVAL, services } from './core'
import { parseParis } from './dates'
import { draftSchema, seoSchema, type Item, type State } from './types'
import { acquire, commitCalendar, getState, listItems, release } from './store'

const text = (form: FormData, key: string) => String(form.get(key) ?? '').trim()
export function editedItem(item: Item, form: FormData, peers: Item[], state: State, now = new Date()): Item {
  if (item.status === 'PUBLISHED') throw new Error('Créez une actualisation pour modifier un article publié sans toucher à la version en ligne.')
  if (text(form, 'version') !== item.modifiedAt) throw new Error('Cet article a changé depuis l’ouverture. Rechargez la page avant de modifier à nouveau.')
  const next = { ...item, modifiedAt: now.toISOString() }
  const requestedDate = text(form, 'scheduledAt')
  const scheduledAt = parseParis(requestedDate)
  if (scheduledAt.slice(0, 16) !== item.scheduledAt.slice(0, 16)) {
    if (Date.parse(scheduledAt) <= now.getTime()) throw new Error('Choisissez une date future.')
    if (state.lastPublishedAt && Date.parse(scheduledAt) < Date.parse(state.lastPublishedAt) + INTERVAL) throw new Error('Gardez trois jours après la dernière publication.')
    if (peers.some(p => p.id !== item.id && !p.refreshOf && !p.held && p.status !== 'FAILED' && Math.abs(Date.parse(p.scheduledAt) - Date.parse(scheduledAt)) < INTERVAL)) throw new Error('Ce créneau est trop proche d’un autre article. Gardez trois jours entre deux publications.')
    next.scheduledAt = scheduledAt
  }
  if (text(form, 'action') === 'date') return next
  const service = services.find(s => s.path === text(form, 'targetServicePage'))
  if (!service) throw new Error('Sélectionnez une page métier, service ou outil existante.')
  const meta = z.object({ workingTitle: z.string().min(15).max(180), primaryKeyword: z.string().min(5).max(150), angle: z.string().min(25).max(2000), secondaryKeywords: z.array(z.string().min(2).max(120)).max(8) }).parse({ workingTitle: text(form, 'workingTitle'), primaryKeyword: text(form, 'primaryKeyword'), angle: text(form, 'angle'), secondaryKeywords: text(form, 'secondaryKeywords').split('\n').map(s => s.trim()).filter(Boolean) })
  Object.assign(next, meta, { topic: meta.workingTitle, cluster: service.title, targetServicePage: service.path, held: text(form, 'mode') === 'draft', error: null, nextAttemptAt: null, attempts: 0, corrections: 0 })
  if (item.draft) {
    const blocks = item.draft.blocks.map((block, index) => {
      const type = text(form, `blockType${index}`)
      const value = text(form, `block${index}`)
      return { ...block, type, text: type === 'list' || type === 'table' ? block.text : value, items: type === 'list' ? value.split('\n').filter(Boolean) : [], rows: type === 'table' ? value.split('\n').filter(Boolean).map(row => row.split('\t')) : [] }
    })
    next.draft = draftSchema.parse({ ...item.draft, title: meta.workingTitle, excerpt: text(form, 'excerpt'), blocks })
    next.manualEdits = true
  }
  if (item.seo) {
    next.seo = seoSchema.parse({ ...item.seo, title: text(form, 'seoTitle'), description: text(form, 'seoDescription'), slug: text(form, 'slug') })
    if (item.refreshSlug && next.seo.slug !== item.refreshSlug) throw new Error('Le slug d’un article déjà publié reste inchangé.')
    if (peers.some(p => p.id !== item.id && p.id !== item.refreshOf && !p.refreshOf && (p.slug === next.seo!.slug || p.seo?.slug === next.seo!.slug))) throw new Error('Ce slug est déjà utilisé.')
    next.manualSeo = true
    next.slug = item.refreshOf ? `${next.seo.slug}-revision-${item.id.slice(0, 8)}` : next.seo.slug
  }
  // A human edit never inherits an old approval, and is never silently rewritten.
  next.gate = undefined; next.review = undefined; next.qualityScore = undefined; next.links = undefined; next.content = undefined
  next.stage = 'RESEARCH'; next.status = next.draft ? 'REVIEW' : 'IDEA'
  return next
}
export async function saveEditorial(namespace: string, id: string, form: FormData) {
  if (!['production', 'test'].includes(namespace) || !id) throw new Error('Article introuvable.')
  const owner = await acquire(namespace)
  if (!owner) throw new Error('Une préparation est en cours. Réessayez dans quelques minutes.')
  try {
    const state = await getState(namespace), items = await listItems(namespace)
    const item = items.find(i => i.id === id)
    if (!state || !item) throw new Error('Article introuvable.')
    const next = editedItem(item, form, items, state)
    await commitCalendar(state, [next], owner, 'ADMIN_EDIT_SNAPSHOT')
    return next
  } finally { await release(namespace, owner) }
}
