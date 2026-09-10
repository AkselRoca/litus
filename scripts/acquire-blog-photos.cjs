/* Public, reproducible photo acquisition. No credentials or private input are sent. */
const fs = require('node:fs/promises')
const path = require('node:path')
const sharp = require('sharp')
const root = path.resolve(__dirname, '..')
const userAgent = 'LitusPhotoCatalog/1.0 (photographic attribution research)'

async function commons(params) {
  const url = new URL('https://commons.wikimedia.org/w/api.php')
  Object.entries({ action: 'query', format: 'json', ...params }).forEach(([k, v]) => url.searchParams.set(k, v))
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await fetch(url, { headers: { 'User-Agent': userAgent } })
    if (response.status === 429 || response.status === 503) {
      console.log(`Commons rate limit: retry ${attempt + 1}, preserving downloaded files.`)
      await new Promise(resolve => setTimeout(resolve, 20000))
      continue
    }
    if (!response.ok) throw new Error(`Commons ${response.status}`)
    return response.json()
  }
  throw new Error('Commons rate limit persisted; rerun later to resume.')
}

async function main() {
  if (process.argv[2] === 'search') {
    for (const query of process.argv.slice(3)) {
    console.log(`SEARCH ${query}`)
    const result = await commons({ generator: 'search', gsrsearch: query, gsrnamespace: '6', gsrlimit: '12', prop: 'imageinfo', iiprop: 'url|size|extmetadata', iiurlwidth: '1400' })
    for (const page of Object.values(result.query?.pages || {}).sort((a, b) => a.index - b.index)) {
      const info = page.imageinfo?.[0], meta = info?.extmetadata || {}
      console.log(JSON.stringify({ title: page.title, width: info?.width, height: info?.height, date: meta.DateTimeOriginal?.value, author: meta.Artist?.value, license: meta.LicenseShortName?.value, description: meta.ImageDescription?.value }))
    }
    }
    return
  }
  const selection = JSON.parse(await fs.readFile(path.join(__dirname, 'blog-photo-selection.json'), 'utf8'))
  const out = path.join(root, 'public', 'blog', 'photos')
  await fs.mkdir(out, { recursive: true })
  const cachePath = path.join(__dirname, 'blog-photo-metadata.json')
  let metadata = {}
  try { metadata = JSON.parse(await fs.readFile(cachePath, 'utf8')) } catch {}
  const catalog = []
  for (const item of selection) {
    if (!item.downloadUrl && !metadata[item.file]) {
      await new Promise(resolve => setTimeout(resolve, 1400))
      metadata[item.file] = await commons({ titles: item.file, prop: 'imageinfo', iiprop: 'url|size|extmetadata', iiurlwidth: '1400' })
      await fs.writeFile(cachePath, JSON.stringify(metadata, null, 2))
    }
    const response = metadata[item.file]
    const info = item.downloadUrl ? { url: item.downloadUrl, descriptionurl: item.sourceUrl, width: item.originalWidth, height: item.originalHeight, extmetadata: {} } : Object.values(response.query?.pages || {})[0]?.imageinfo?.[0]
    if (!info) throw new Error(`Missing file ${item.file}`)
    const meta = info.extmetadata
    const text = html => (html || '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim()
    const license = item.license || text(meta.LicenseShortName?.value)
    const licenseUrl = (item.licenseUrl || text(meta.LicenseUrl?.value)).replace(/^http:\/\/creativecommons\.org\//, 'https://creativecommons.org/')
    const validLicense = /^(CC BY|CC0|Public domain)/.test(license) || (license === 'Pexels License' && licenseUrl === 'https://www.pexels.com/license/')
    if (!validLicense || !licenseUrl) throw new Error(`Unverified reusable license: ${item.file || item.sourceUrl}: ${license}`)
    const fileName = item.fileName || `${item.id}.webp`
    if (!/^[a-z0-9-]+\.webp$/.test(fileName)) throw new Error(`Invalid output filename: ${fileName}`)
    const target = path.join(out, fileName)
    let dimensions
    try {
      if (process.argv.includes(`--refresh=${item.id}`)) throw new Error('Requested source replacement')
      dimensions = await sharp(target).metadata()
    } catch {
      const imageResponse = await fetch(info.thumburl || info.url, { headers: { 'User-Agent': userAgent } })
      if (!imageResponse.ok) throw new Error(`Download ${imageResponse.status}: ${item.file}`)
      const image = Buffer.from(await imageResponse.arrayBuffer())
      await sharp(image).rotate().resize({ width: 1400, height: 1100, fit: 'inside', withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toFile(target)
      dimensions = await sharp(target).metadata()
    }
    catalog.push({ id: item.id, src: `/blog/photos/${fileName}`, alt: item.alt, caption: item.caption, sourceUrl: info.descriptionurl, credit: item.credit || text(meta.Artist?.value), license, licenseUrl, width: dimensions.width, height: dimensions.height, tags: item.tags, capturedAt: item.capturedAt || text(meta.DateTimeOriginal?.value || meta.DateTime?.value), originalWidth: info.width, originalHeight: info.height })
    console.log(`OK ${item.id}: ${dimensions.width}x${dimensions.height}, ${license}`)
  }
  const type = 'export interface BlogPhoto { id: string; src: string; alt: string; caption: string; sourceUrl: string; credit: string; license: string; licenseUrl: string; width: number; height: number; tags: readonly string[]; capturedAt: string; originalWidth: number; originalHeight: number }\n\n'
  await fs.writeFile(path.join(root, 'src', 'lib', 'blog', 'photo-catalog.ts'), '// Photographs only. File sources and licences verified on Wikimedia Commons and Pexels.\n// Local copies resized and converted to WebP; CC BY-SA adaptations retain their licence.\n' + type + 'export const blogPhotos: readonly BlogPhoto[] = ' + JSON.stringify(catalog, null, 2) + '\n')
  await fs.writeFile(path.join(root, 'docs', 'blog-photo-sources.md'), '# Photographies du blog\n\nPhotographies réelles acquises le 9 septembre 2026 après recherche web et vérification des pages de fichiers Wikimedia Commons et Pexels. Aucune image générée, illustration SVG ou capture client. Les scènes métiers sont des photographies d’illustration et ne représentent pas l’équipe Litus ni un client local. Les vues communales sont datées, sans promesse de représenter les aménagements actuels.\n\nCopies WebP redimensionnées (1400 × 1100 px maximum), sans modification générative. Recadrage d’affichage possible ; les images sous CC BY-SA restent sous la même licence. Afficher le crédit auteur, la source et la licence avec chaque image. Les images Unsplash issues de Commons ont été publiées sous CC0 avant juin 2017 ; le catalogue ne se fonde pas sur une recherche « gratuite » ou une licence de site supposée. La photographie de préparation de commandes de Kampus Production vient de sa page officielle Pexels, dont la licence autorise cet usage éditorial sur le blog ; la date de prise de vue n’est pas publiée et n’est pas inventée. Son auteur et son contexte photographique sont explicitement attribués. La seconde photo Pexels, une personne au clavier devant son ordinateur de bureau, est diffusée par Christina Morillo (série WOCinTech, crédit EXIF Mike Ngo Photography) ; son objet est décrit sans attribuer de contenu analytique à l’écran.\n\n' + catalog.map(p => `## ${p.id}\n\n- Sujet : ${p.caption}\n- Auteur : ${p.credit}\n- Source : [page originale](${p.sourceUrl})\n- Licence choisie : [${p.license}](${p.licenseUrl})\n- Prise de vue / date source : ${p.capturedAt}\n- Dimensions source : ${p.originalWidth} × ${p.originalHeight} ; WebP : ${p.width} × ${p.height}\n- Fichier : \`${p.src}\`\n- Tags : ${p.tags.join(', ')}\n`).join('\n'))
}
main().catch(error => { console.error(error); process.exitCode = 1 })
