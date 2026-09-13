import { z } from 'zod'
import cloudinary from '@/lib/cloudinary'
import { fetchPublic, plainText } from './network'
import { model } from './providers'
import { hash, ORIGIN, similarity } from './core'
import { blogPhotos } from '@/lib/blog/photo-catalog'
import type { EditorialImage, Item } from './types'

type Candidate = { url: string; thumb: string; title: string; description: string; credit: string; license: string; licenseUrl: string; sourceUrl: string; width: number; height: number }
const reusableLicense = /^(?:CC0|Public domain|CC BY(?:-SA)? [1-4]\.0)$/i
export async function findImages(query: string): Promise<Candidate[]> {
  const params = new URLSearchParams({ action: 'query', format: 'json', generator: 'search', gsrsearch: query, gsrnamespace: '6', gsrlimit: '10', prop: 'imageinfo', iiprop: 'url|size|extmetadata|mime', iiurlwidth: '1200' })
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { 'User-Agent': 'LitusEditorial/1.0 (https://www.litus.fr/contact)' }, signal: AbortSignal.timeout(25000) })
  if (!response.ok) throw new Error(`Wikimedia HTTP ${response.status}`)
  const data = await response.json()
  const pages = Object.values(data.query?.pages ?? {}) as { title: string; imageinfo?: { url: string; thumburl?: string; descriptionurl: string; width: number; height: number; mime: string; extmetadata: Record<string, { value: string }> }[] }[]
  return pages.flatMap(page => {
    const info = page.imageinfo?.[0]
    if (!info || !/^image\/(jpeg|png|webp|svg\+xml)$/.test(info.mime) || info.mime === 'image/svg+xml' && !info.thumburl) return []
    const meta = info.extmetadata, license = plainText(meta.LicenseShortName?.value ?? '')
    const licenseUrl = meta.LicenseUrl?.value || (/CC0|Public domain/i.test(license) ? 'https://creativecommons.org/publicdomain/zero/1.0/' : '')
    if (!reusableLicense.test(license) || !licenseUrl || !info.url.startsWith('https://upload.wikimedia.org/') || info.width < 640 || info.height < 360) return []
    // Non-copyright restrictions can make otherwise free images unsuitable for commercial reuse.
    if (meta.Restrictions?.value || /non.?commercial|fair use|non.?libre/i.test(meta.Copyrighted?.value ?? '')) return []
    return [{ url: info.url, thumb: info.thumburl || info.url, title: page.title, description: plainText(meta.ImageDescription?.value ?? '').slice(0, 1500), credit: plainText(meta.Artist?.value ?? 'Wikimedia Commons').slice(0, 300), license, licenseUrl: licenseUrl.startsWith('//') ? `https:${licenseUrl}` : licenseUrl, sourceUrl: info.descriptionurl, width: info.width, height: info.height }]
  })
}
export async function acquireImages(item: Item): Promise<EditorialImage[]> {
  if (!item.draft || !item.seo) throw new Error('Draft and metadata required before images')
  const output: EditorialImage[] = [...(item.images ?? [])]
  const used = new Set<string>(output.map(i => i.sourceUrl))
  for (const [index, request] of item.draft.imageQueries.entries()) {
    if (index < output.length) continue
    let purpose = request.purpose
    let found = await findImages(request.query)
    if (!found.some(c => !used.has(c.sourceUrl)) || /position/.test(item.error ?? '')) {
      const refined = await model('La précédente recherche Wikimedia Commons ne donne pas d’image exploitable ou pertinente. Propose deux recherches alternatives très courtes (1 à 3 mots anglais). Interfaces, schémas et photographies sont possibles. Choisis un rôle pédagogique précis, complémentaire aux images déjà retenues. Tu peux changer le concept visuel : un schéma de CMS plutôt qu’une photo générique de bureau. Évite les symboles décoratifs et captures introuvables. Pour une interface WordPress, cherche simplement WordPress.', { title: item.draft.title, query: request.query, purpose, previousImages: output.map(i => i.alt), previousError: item.error }, z.object({ queries: z.array(z.string()).length(2), purpose: z.string() }))
      purpose = refined.purpose
      for (const query of refined.queries) {
        found = await findImages(query)
        if (found.some(c => !used.has(c.sourceUrl))) break
      }
    }
    // Previously acquired, licensed photographs remain a legitimate fallback.
    // They are downloaded from our public assets and visually re-evaluated for this article.
    const library: Candidate[] = [...blogPhotos].filter(photo => !photo.tags.includes('local'))
      .sort((a, b) => similarity(`${b.alt} ${b.tags.join(' ')}`, `${item.topic} ${purpose}`) - similarity(`${a.alt} ${a.tags.join(' ')}`, `${item.topic} ${purpose}`))
      .slice(0, 4).map(photo => ({ url: `${ORIGIN}${photo.src}`, thumb: `${ORIGIN}${photo.src}`, title: photo.alt, description: photo.caption, credit: photo.credit, license: photo.license, licenseUrl: photo.licenseUrl, sourceUrl: photo.sourceUrl, width: photo.width, height: photo.height }))
    const candidates = [...found.filter(c => !/logo|icon|badge|flag/i.test(c.title)).slice(0, 3), ...library].filter(c => !used.has(c.sourceUrl)).slice(0, 6)
    const downloaded = await Promise.allSettled(candidates.map(async c => ({ candidate: c, response: await fetchPublic(c.thumb, { image: true }) })))
    const available = downloaded.filter((r): r is PromiseFulfilledResult<{ candidate: Candidate; response: Awaited<ReturnType<typeof fetchPublic>> }> => r.status === 'fulfilled').map(r => r.value)
    if (!available.length) throw new Error(`No licensed, readable image for position ${index + 1}`)
    const selection = await model('Choisis UNE image réellement utile à cette partie de cet article. Inspecte les images jointes dans le même ordre que les candidats. Si aucune ne convient, suitable=false. Pas de capture inventée. ALT TRÈS COURT : 8 à 12 mots, environ 80 caractères ; décris seulement le sujet principal visible. CAPTION : une phrase de 100 à 150 caractères expliquant son utilité sans prétendre que la photo représente Litus ou un client. Ne décris pas tous les détails. Français, sans mots-clés ajoutés.',
      { title: item.draft.title, purpose, previousImages: output.map(i => i.alt), candidates: available.map(a => ({ title: a.candidate.title, description: a.candidate.description.slice(0, 350) })) },
      z.object({ index: z.number().int().min(0).max(available.length - 1), suitable: z.boolean(), alt: z.string().min(20).max(220), caption: z.string().min(25).max(350) }),
      available.map(a => ({ mimeType: a.response.contentType.split(';')[0], data: a.response.body.toString('base64') })))
    if (!selection.suitable) throw new Error(`Images not relevant for position ${index + 1}: ${selection.caption.slice(0, 180)}`)
    const chosen = available[selection.index], candidate = chosen.candidate
    const sha256 = hash(chosen.response.body.toString('base64'))
    if (output.some(i => i.sha256 === sha256)) throw new Error('Duplicate illustration')
    const upload = await cloudinary.uploader.upload(`data:${chosen.response.contentType.split(';')[0]};base64,${chosen.response.body.toString('base64')}`, {
      folder: `litus/editorial/${item.namespace}/${item.id}`, public_id: `${item.seo.slug}-${index + 1}-${sha256.slice(0, 8)}`, overwrite: false,
      format: 'webp', transformation: [{ width: 1400, height: 1000, crop: 'limit', quality: 'auto:good' }],
      context: { alt: selection.alt }, timeout: 45000,
    })
    const descriptiveAlt = selection.alt.replace(/,?\s+symbolis(?:ant|e)\b.*$/i, '').trim()
    output.push({ src: upload.secure_url, alt: descriptiveAlt, caption: selection.caption, sourceUrl: candidate.sourceUrl, credit: candidate.credit, license: candidate.license, licenseUrl: candidate.licenseUrl, width: upload.width, height: upload.height, sha256, publicId: upload.public_id })
    used.add(candidate.sourceUrl)
    break // Persist one image per tick, keeping each function comfortably bounded.
  }
  return output
}
