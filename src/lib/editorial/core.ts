import { createHash, timingSafeEqual } from 'node:crypto'
import inventory from './site-inventory.json'
import type { Draft, InternalLink, Item } from './types'

export const ORIGIN = 'https://www.litus.fr'
export const INTERVAL = 4 * 24 * 60 * 60 * 1000
export const services = inventory.services
export const publicRoutes = new Set(inventory.routes)
export const hash = (value: unknown) => createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex')
export const escape = (value: string) => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
export function authorizeCron(header: string | null) {
  const secret = process.env.CRON_SECRET
  if (!secret || secret.length < 32 || !header) return false
  const actual = Buffer.from(header), expected = Buffer.from(`Bearer ${secret}`)
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}
export function nextSlot(anchor: string, now: Date, inclusive = false) {
  const base = Date.parse(anchor), difference = now.getTime() - base
  const step = difference < 0 ? 0 : inclusive ? Math.ceil(difference / INTERVAL) : Math.floor(difference / INTERVAL) + 1
  return new Date(base + step * INTERVAL).toISOString()
}
export function normalize(text: string) { return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() }
export function isMetaIntroduction(text: string) { return /\b(?:cet article|ce guide|cette comparaison|nous allons)\s+(?:vous\s+)?(?:compare|comparaison|explique|explore|présente|aborde|découvrir|examiner|voir|aider)/i.test(text) }
export function similarity(a: string, b: string) {
  const stop = new Set(['pour', 'dans', 'avec', 'comment', 'votre', 'les', 'des', 'une', 'sur', 'qui', 'que', 'est', 'faut', 'litus'])
  const tokens = (s: string) => new Set(normalize(s).split(' ').filter(w => w.length > 2 && !stop.has(w)))
  const left = tokens(a), right = tokens(b)
  if (!left.size || !right.size) return 0
  return [...left].filter(t => right.has(t)).length / Math.min(left.size, right.size)
}
export function validInternal(href: string, slugs: Set<string>) {
  if (!href.startsWith('/') || href.startsWith('//') || /[\\\x00-\x20]/.test(href)) return false
  const url = new URL(href, ORIGIN)
  return publicRoutes.has(url.pathname) || (url.pathname.startsWith('/blog/') && slugs.has(url.pathname.slice(6)))
}
export function renderDraft(draft: Draft, links: InternalLink[] = []) {
  return draft.blocks.map((block, index) => {
    let text = escape(block.text)
    const used = new Set<string>()
    for (const link of links.filter(l => l.blockIndex === index).slice(0, 1)) {
      if (!/^(?:\/(?!\/)|https:\/\/)/.test(link.href) || /[\\\x00-\x20]/.test(link.href)) continue
      if (block.type !== 'paragraph' || used.has(link.anchor)) continue
      used.add(link.anchor)
      text = text.replace(escape(link.anchor), `<a href="${escape(link.href)}">${escape(link.anchor)}</a>`)
    }
    if (block.type === 'h2' || block.type === 'h3') return `<${block.type}>${text}</${block.type}>`
    if (block.type === 'list') return `<ul>${block.items.map(t => `<li>${escape(t)}</li>`).join('')}</ul>`
    if (block.type === 'table') return `<div class="editorial-table-scroll" role="region" aria-label="${escape(block.text || 'Tableau comparatif')}" tabindex="0"><table><caption>${text}</caption><thead><tr>${(block.rows[0] ?? []).map(t => `<th scope="col">${escape(t)}</th>`).join('')}</tr></thead><tbody>${block.rows.slice(1).map(row => `<tr>${row.map(t => `<td>${escape(t)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
    if (block.type === 'quote') return `<blockquote><p>${text}</p></blockquote>`
    return `<p>${text}</p>`
  }).join('\n')
}
export function resolveLinks(draft: Draft, candidates: InternalLink[]) {
  const usedBlocks = new Set<number>(), usedUrls = new Set<string>()
  return candidates.flatMap(link => {
    if (usedUrls.has(link.href)) return []
    const matches = draft.blocks.flatMap((b, index) => b.type === 'paragraph' && b.text.includes(link.anchor) && !usedBlocks.has(index) ? [index] : [])
    const blockIndex = matches.includes(link.blockIndex) ? link.blockIndex : matches[0]
    if (blockIndex === undefined) return []
    usedBlocks.add(blockIndex); usedUrls.add(link.href)
    return [{ ...link, blockIndex }]
  })
}
export function fingerprint(item: Item) { return hash({ draft: item.draft, seo: item.seo, links: item.links, images: item.images, content: item.content, research: item.research, review: item.review, brief: item.brief, target: item.targetServicePage }) }
export function articleSchema(item: Item, date = item.publishedAt ?? item.scheduledAt) {
  return { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: item.draft?.title, description: item.seo?.description,
    image: item.images?.map(i => i.src), datePublished: date, dateModified: date,
    author: { '@type': 'Organization', name: 'L’équipe Litus' }, publisher: { '@type': 'Organization', name: 'Litus', url: ORIGIN },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${ORIGIN}/blog/${item.seo?.slug}` } }
}
