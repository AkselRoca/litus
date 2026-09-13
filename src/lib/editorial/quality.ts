import { articleSchema, fingerprint, isMetaIntroduction, normalize, services, validInternal } from './core'
import { fetchPublic } from './network'
import type { Gate, Item } from './types'

const forbidden = /dans un monde de plus en plus|présence en ligne est indispensable|levier incontournable|que vous soyez une petite ou une grande|lorem ipsum|\bTODO\b|\bTBD\b|\{\{.+?\}\}/i
export function evidenceMatches(source: string, evidence: string) {
  const parts = evidence.split(/\s*(?:\[\s*(?:\.{3}|…)\s*\]|\.{3}|…)\s*/).filter(Boolean)
  return parts.length > 0 && parts.every(part => normalize(part).length >= 20 && normalize(source).includes(normalize(part)))
}
export function validateQuality(item: Item, archiveSlugs: Set<string>, now = new Date()): Gate {
  const errors: string[] = []
  const require = (condition: unknown, message: string) => { if (!condition) errors.push(message) }
  require(item.research && item.research.results.length >= 3 && item.research.queries.length >= 2, 'Real Google research missing')
  require(item.research && item.research.sources.length >= 3 && item.research.sources.some(s => s.official), 'Readable authoritative sources missing')
  require(item.research && now.getTime() - Date.parse(item.research.searchedAt) < 7 * 86400000, 'Research is stale')
  require(item.brief && item.brief.gaps.length >= 2 && !item.brief.cannibalization.duplicate, 'Gap analysis or distinct intent missing')
  require(item.draft && item.seo && item.content, 'Article incomplete')
  require(services.some(s => s.path === item.targetServicePage && s.title === item.cluster), 'Unknown business page or cluster')
  require(item.seo && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.seo.slug) && !archiveSlugs.has(item.seo.slug), 'Invalid or duplicate slug')
  require(item.seo && item.seo.title.length >= 20 && item.seo.title.length <= 65 && item.seo.description.length >= 80 && item.seo.description.length <= 165, 'Invalid SEO metadata')
  const draft = item.draft
  if (draft) {
    const paragraphs = draft.blocks.filter(b => b.type === 'paragraph').map(b => b.text)
    require(!isMetaIntroduction(paragraphs[0] ?? '') && !isMetaIntroduction(draft.excerpt), 'Introduction announces the article instead of answering the question')
    const allText = draft.blocks.map(b => [b.text, ...b.items, ...b.rows.flat()].join(' ')).join(' ')
    require(!forbidden.test(allText), 'Generic language or placeholder')
    require(!/<\/?[a-z][^>]*>|\[[^\]]+\]\(https?:/i.test(allText), 'Raw HTML or unprocessed markdown')
    require(paragraphs.every(p => p.trim().length > 15), 'Empty or broken paragraphs')
    require(new Set(paragraphs.map(normalize)).size === paragraphs.length, 'Duplicate paragraphs')
    const headings = draft.blocks.filter(b => b.type === 'h2' || b.type === 'h3')
    require(draft.blocks.filter(b => b.type === 'h2').length >= 3, 'Unreadable section structure')
    require(new Set(headings.map(b => normalize(b.text))).size === headings.length, 'Repeated headings')
    require(!/<h1\b/i.test(item.content ?? ''), 'Body must not contain a second H1')
    require(draft.blocks.filter(b => b.type === 'list').length < draft.blocks.length / 2, 'Excessive lists')
    require(!/\.\.\.|…/.test(item.content?.slice(-10) ?? ''), 'Potentially truncated content')
  }
  const links = item.links ?? []
  require(links.some(l => l.href === item.targetServicePage), 'No contextual business link')
  require(links.filter(l => l.href.startsWith('/blog/')).length >= Math.min(2, archiveSlugs.size), 'Not enough contextual article links')
  for (const link of links) {
    const block = draft?.blocks[link.blockIndex]
    require(block?.type === 'paragraph' && block.text.includes(link.anchor), 'Link anchor absent from paragraph')
    require(link.href.startsWith('/') ? validInternal(link.href, archiveSlugs) : !!item.research?.sources.some(s => s.url === link.href), 'Unverified link target')
  }
  require(new Set(links.map(l => l.href)).size === links.length, 'Repeated link targets')
  require(new Set(links.map(l => l.blockIndex)).size === links.length, 'Overlapping links in one paragraph')
  require(links.filter(l => l.href.startsWith('/blog/')).length <= 5 && links.filter(l => services.some(s => s.path === l.href)).length <= 3, 'Excessive internal links')
  require(item.images?.length === 3 && new Set(item.images?.map(i => i.sha256)).size === 3, 'Exactly three distinct illustrations required')
  for (const image of item.images ?? []) require(image.alt.length >= 20 && image.width > 0 && image.height > 0 && image.credit && image.licenseUrl.startsWith('https://') && /^https:\/\/res\.cloudinary\.com\//.test(image.src), 'Missing image rights, alt or dimensions')
  const review = item.review
  require(review?.passed && review.score >= 85 && review.coverageComplete && review.imagesRelevant && review.unsupportedClaims.length === 0 && review.genericPassages.length === 0 && review.issues.length === 0, 'Editorial or factual review failed')
  for (const claim of review?.claims ?? []) {
    const source = item.research?.sources.find(s => s.url === claim.sourceUrl)
    require(claim.supported && source?.official && claim.evidence.length >= 25 && evidenceMatches(source.text, claim.evidence), 'Claim evidence does not occur in an authoritative fetched source')
  }
  const schema = articleSchema(item)
  require(schema.headline && schema.description && schema.image?.length === 3 && !Number.isNaN(Date.parse(schema.datePublished)) && schema.mainEntityOfPage['@id'] === `https://www.litus.fr/blog/${item.seo?.slug}`, 'Invalid structured data/canonical')
  return { passed: errors.length === 0, score: errors.length ? Math.min(review?.score ?? 0, 84) : review!.score, errors, checkedAt: now.toISOString(), fingerprint: fingerprint(item) }
}
export async function checkUrls(item: Item, origin: string) {
  const urls = [...new Set([item.targetServicePage, ...(item.links ?? []).map(l => l.href)])]
  const results = await Promise.allSettled(urls.map(async href => {
    const response = await fetchPublic(href.startsWith('/') ? new URL(href, origin).href : href)
    if (href.startsWith('/')) {
      const text = response.body.toString('utf8')
      if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(text)) throw new Error('Internal target is noindex')
    }
  }))
  if (results.some(r => r.status === 'rejected')) throw new Error('A contextual link is inaccessible or non-indexable')
}
