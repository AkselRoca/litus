import { z } from 'zod'
import { hash, similarity } from './core'
import { model } from './providers'
import { editorialDb, event } from './store'
import type { Item } from './types'
import type { ArchiveEntry } from './workflow'

/** Conservative overlay: at most two old articles, existing text only, original hash required. */
export async function proposeBacklinks(item: Item, archive: ArchiveEntry[]) {
  const candidates = archive.filter(a => a.slug !== item.slug).sort((a, b) => similarity(b.title, item.topic) - similarity(a.title, item.topic)).slice(0, 6)
  const choice = await model('Repère au maximum deux anciens articles où une expression EXISTANTE dans un paragraphe sans lien pourrait naturellement renvoyer vers le nouvel article. Ne réécris rien. Pas d’ancre générique. Ne propose rien si le lien n’ajoute pas de valeur. Retourne l’ancre EXACTE visible, pas de HTML.',
    { newArticle: { title: item.draft?.title, excerpt: item.draft?.excerpt }, candidates }, z.object({ links: z.array(z.object({ sourceSlug: z.string(), anchor: z.string().min(8).max(120) })).max(2) }))
  for (const link of choice.links) {
    const source = candidates.find(a => a.slug === link.sourceSlug)
    if (!source || source.content.includes(`/blog/${item.slug}`)) continue
    const paragraph = [...source.content.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].find(m => !/<a\b/.test(m[1]) && m[1].includes(link.anchor))
    if (!paragraph || /[<>]/.test(link.anchor)) continue
    await editorialDb().execute({ sql: 'INSERT OR IGNORE INTO EditorialBacklink VALUES (?,?,?,?,?,?)', args: [item.namespace, source.slug, item.slug!, link.anchor, hash(source.content), new Date().toISOString()] })
    await event(item.namespace, item.id, 'BACKLINK_ADDED', { sourceSlug: source.slug, anchor: link.anchor })
  }
}
