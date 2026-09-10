import type { BlogImage } from './articles'

export type ArticleHeading = { id: string; text: string; level: 2 | 3 }

const entities: Record<string, string> = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' }
export function headingText(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (entity, name: string) => {
    if (name.startsWith('#')) {
      const code = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10)
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity
    }
    return entities[name] ?? entity
  }).replace(/\s+/g, ' ').trim()
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!))

function figure(image: BlogImage): string {
  const src = escapeHtml(image.src)
  return `<figure class="blog-editorial-figure"><img src="${src}" alt="${escapeHtml(image.alt)}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async" /><figcaption><span>${escapeHtml(image.caption)}</span><small><a href="${escapeHtml(image.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(image.credit)}</a> · <a href="${escapeHtml(image.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(image.license)}</a></small></figcaption></figure>`
}

/** One server-side pass keeps the visible headings, anchors and contents in sync. */
export function prepareArticle(html: string, images: BlogImage[] = []) {
  const headings: ArticleHeading[] = []
  const usedIds = new Set<string>()
  let content = html.replace(/<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi, (_match, level: string, attributes: string, inner: string) => {
    const text = headingText(inner)
    const suppliedId = /(?:^|\s)id\s*=\s*["']([^"']+)["']/i.exec(attributes)?.[1]
    const base = suppliedId || text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
    let id = base
    let suffix = 2
    while (usedIds.has(id)) id = `${base}-${suffix++}`
    usedIds.add(id)
    headings.push({ id, text, level: Number(level) as 2 | 3 })
    const remainingAttributes = attributes.replace(/(?:^|\s)id\s*=\s*["'][^"']*["']/i, '')
    return `<h${level}${remainingAttributes} id="${escapeHtml(id)}">${inner}</h${level}>`
  })

  // Insert photographs between complete sections, never between a heading and its text.
  const sectionCount = headings.filter(heading => heading.level === 2).length
  const placements = new Map<number, BlogImage[]>()
  images.forEach((image, index) => {
    const after = image.afterSection ?? Math.max(1, Math.floor((index + 1) * Math.max(1, sectionCount - 1) / (images.length + 1)))
    const section = Math.min(Math.max(1, after), Math.max(1, sectionCount - 1))
    placements.set(section, [...(placements.get(section) ?? []), image])
  })
  let sectionIndex = 0
  content = content.replace(/<h2\b/g, match => {
    const photos = placements.get(sectionIndex) ?? []
    placements.delete(sectionIndex)
    sectionIndex++
    return photos.map(figure).join('') + match
  })
  content += [...placements.values()].flat().map(figure).join('')
  return { content, headings }
}
