import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { connectedDefinitions } from '../src/lib/expertise/connected-definitions'

const root = process.cwd()
const output = path.join(root, 'public/expertise/images')
const xml = (value: string) => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]!)
const text = (value: string, x: number, y: number, size = 22, fill = '#264358', weight = 400) => `<text x="${x}" y="${y}" font-family="Segoe UI, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${xml(value)}</text>`
const lines = (value: string, x: number, y: number, width = 35, size = 22, fill = '#264358') => {
  const result: string[] = []; let line = ''
  for (const word of value.split(' ')) { if ((line + ' ' + word).trim().length > width && line) { result.push(line); line = word } else line = (line + ' ' + word).trim() }
  if (line) result.push(line)
  return result.map((line, i) => text(line, x, y + i * (size + 10), size, fill)).join('')
}
const rect = (x: number, y: number, w: number, h: number, color = '#fff', stroke = '#dfe5e9', r = 18) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${color}" stroke="${stroke}"/>`
const arrow = (x1: number, y1: number, x2: number, y2: number, color: string) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#arrow)"/>`

async function main() {
  await fs.mkdir(output, { recursive: true })
  const metadata = connectedDefinitions.map(d => ({ slug: d.slug, name: d.name, logo: d.logo, color: d.color, category: d.category, summary: d.intro }))
  await fs.writeFile(path.join(root, 'src/lib/expertise/connected-tools.json'), JSON.stringify(metadata, null, 2) + '\n')
  for (const [position, d] of connectedDefinitions.entries()) {
    const tint = d.color + '0b'
    const logo = await fs.readFile(path.join(root, 'public', d.logo))
    const mime = d.logo.endsWith('.svg') ? 'image/svg+xml' : 'image/png'
    const logoImage = (x: number, y: number, size: number) => `<image x="${x}" y="${y}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" href="data:${mime};base64,${logo.toString('base64')}"/>`
    for (const variant of [0, 1]) {
      let drawing = ''
      if (variant === 0) {
        const ys = [247, 370, 493]
        drawing += text('LES ENTRÉES', 62, 210, 12, '#778c9b', 600) + text('LES SORTIES À EXPLOITER', 814, 210, 12, '#778c9b', 600)
        d.visual.input.forEach((value, i) => { drawing += rect(58, ys[i], 350, 94) + rect(74, ys[i] + 17, 36, 36, tint, d.color + '44', 10) + text(`0${i + 1}`, 83, ys[i] + 41, 13, d.color, 600) + lines(value, 125, ys[i] + 35, 25, 17); drawing += `<path d="M408 ${ys[i] + 47} C490 ${ys[i] + 47} 480 407 537 407" stroke="${d.color}55" stroke-width="2" fill="none"/>` })
        drawing += rect(534, 310, 212, 194, '#fff', d.color + '66', 26) + logoImage(607, 335, 65) + lines(d.name, 558, 435, 19, 20) + text('Règles & contrôles', 559, 477, 13, '#75889b')
        d.visual.output.forEach((value, i) => { drawing += `<path d="M746 407 C804 407 784 ${ys[i] + 47} 814 ${ys[i] + 47}" stroke="${d.color}55" stroke-width="2" fill="none"/>` + rect(814, ys[i], 405, 94, tint, d.color + '44') + lines(value, 840, ys[i] + 38, 33, 18) })
        drawing += rect(287, 640, 706, 72, '#fff', '#ead7c9', 16) + text('Une exception ? On la rend visible, on ne l’ignore pas.', 317, 684, 18, '#b5522b')
      } else if (d.visual.kind === 'documents') {
        d.visual.input.forEach((value, i) => { const x = 62 + i * 265; drawing += rect(x, 225 + i * 22, 225, 312, '#fff', '#e4dfd7') + rect(x + 22, 248 + i * 22, 40, 48, tint, d.color + '33', 6) + lines(value, x + 23, 341 + i * 22, 17, 18); for (let line = 0; line < 4; line++) drawing += rect(x + 23, 415 + i * 22 + line * 19, 160 - (line % 2) * 40, 5, '#e7e8e6', 'none', 2) })
        drawing += rect(899, 240, 307, 368, tint, d.color + '44') + text('Grille de lecture', 925, 279, 21, d.color, 600)
        d.visual.output.forEach((v, i) => { drawing += lines(v, 925, 335 + i * 88, 22, 17) })
        drawing += text('Conserver la référence. Signaler ce qui manque.', 67, 687, 24, '#273f52', 500)
      } else if (d.visual.kind === 'assistant') {
        drawing += rect(65, 225, 690, 140, '#fff', '#dfe5e9', 25) + text('CONTEXTE FOURNI', 93, 260, 12, '#7e8d98', 600) + lines(d.visual.input.join(' · '), 93, 304, 55, 19)
        drawing += rect(276, 399, 928, 250, tint, d.color + '44', 25) + logoImage(301, 423, 36) + text('Proposition à relire', 354, 450, 21, d.color, 600)
        d.visual.output.forEach((v, i) => { drawing += text(`0${i + 1}`, 311, 501 + i * 47, 12, d.color, 600) + text(v, 354, 501 + i * 47, 19) })
        drawing += text('Les sources restent des données, pas des instructions.', 66, 701, 19, '#708798')
      } else if (d.visual.kind === 'code') {
        drawing += rect(62, 219, 710, 412, '#152d40', '#152d40') + text('BRANCHE : correctif-cible', 91, 260, 13, '#b8cad8')
        const code = ['- if (request) envoyer()', '+ if (!schema.valide(request)) return erreur', '+ if (dejaTraite(request.id)) return precedent', '+ await enregistrer(request)', '+ return confirmerLaTransmission()']
        code.forEach((line, i) => { drawing += text(line, 91, 326 + i * 47, 18, i === 0 ? '#ffb19e' : '#a4dfc7') })
        drawing += rect(815, 219, 400, 412, '#fff') + text('AVANT LIVRAISON', 841, 260, 12, d.color, 600)
        d.visual.output.forEach((v, i) => { drawing += lines(v, 842, 326 + i * 89, 30, 21) })
        drawing += text('Exemple pédagogique de diff, pas du code prêt à déployer.', 68, 691, 19, '#708798')
      } else if (d.visual.kind === 'campaign') {
        drawing += rect(61, 222, 350, 400, '#fff') + rect(84, 247, 304, 148, tint, 'none') + text('VOTRE OFFRE', 106, 299, 14, d.color, 600) + lines(d.visual.input[0], 106, 347, 23, 21) + rect(87, 486, 284, 56, '#fa5b24', 'none', 28) + text('Découvrir le projet', 134, 521, 18, '#fff', 600)
        arrow(429, 415, 490, 415, d.color)
        drawing += rect(511, 222, 704, 400, '#fff') + text('SUIVI DU PARCOURS', 543, 262, 12, '#728594', 600)
        d.visual.output.forEach((v, i) => { drawing += rect(541, 295 + i * 94, 640, 76, tint, d.color + '33', 12) + text(String(i + 1), 563, 340 + i * 94, 20, d.color, 600) + text(v, 611, 340 + i * 94, 20) })
        drawing += text('Illustration de parcours : aucun résultat publicitaire annoncé.', 65, 692, 19, '#708798')
      } else if (d.visual.kind === 'editor') {
        drawing += rect(62, 219, 291, 425, tint, d.color + '33') + text('LES CONTENUS', 89, 260, 12, d.color, 600)
        d.visual.input.forEach((v, i) => { drawing += lines(v, 88, 311 + i * 100, 22, 17) })
        drawing += rect(400, 219, 813, 425, '#fff') + logoImage(438, 248, 48) + text('Une information claire.', 441, 351, 31, '#183247', 600) + text('Une prochaine étape visible.', 441, 397, 27, d.color, 500)
        d.visual.output.forEach((v, i) => { drawing += text(v, 442, 466 + i * 47, 20) })
        drawing += text('Maquette de contenu originale, indépendante de l’éditeur.', 64, 698, 19, '#708798')
      } else if (d.visual.kind === 'flow') {
        d.visual.output.forEach((v, i) => { const x = 65 + i * 405; drawing += rect(x, 276, 337, 240, tint, d.color + '44') + text(`ÉTAPE 0${i + 1}`, x + 26, 319, 12, d.color, 600) + lines(v, x + 26, 381, 24, 25); if (i < 2) drawing += arrow(x + 346, 400, x + 391, 400, d.color) })
        drawing += `<path d="M635 524 V605 H113" fill="none" stroke="#ed9a75" stroke-width="2" stroke-dasharray="6 7"/>` + rect(66, 584, 348, 89, '#fff8f1', '#efd0ba') + text('Reprise contrôlée', 91, 626, 22, '#b75b36', 600) + text('Sans répéter les actions terminées', 91, 650, 13, '#876d5e')
      } else {
        const columns = ['SOURCE', 'INFORMATION', 'ACTION À SUIVRE']
        drawing += rect(61, 220, 1157, 407, '#fff')
        columns.forEach((v, i) => { drawing += text(v, 90 + i * 375, 262, 12, '#758898', 600) })
        d.visual.input.forEach((v, i) => { const y = 286 + i * 104; drawing += rect(78, y, 1120, 88, i % 2 ? '#fff' : tint, 'none', 10) + text(`DOSSIER / 0${i + 1}`, 95, y + 38, 12, d.color, 600) + lines(v, 466, y + 31, 28, 17) + lines(d.visual.output[i], 840, y + 31, 26, 17) })
        drawing += text('Des statuts explicites, pas des données recopiées partout.', 65, 693, 21, '#708798')
      }
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1280" height="800"><defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10" fill="${d.color}"/></marker></defs><rect width="1280" height="800" fill="#faf9f5"/><circle cx="1220" cy="30" r="390" fill="${tint}"/>${rect(34, 28, 1212, 96, '#fff', '#e5e7e8', 17)}${logoImage(57, 46, 53)}${text(d.name, 132, 77, 25, '#193447', 600)}${text(variant ? 'ATELIER / EXPLOITATION' : 'PARCOURS / INTÉGRATION', 864, 74, 12, d.color, 600)}${text(d.visual.title, 61, 168, 29, '#193447', 600)}${drawing}${text('LITUS  /  ILLUSTRATION ORIGINALE  /  DONNÉES FICTIVES', 63, 758, 11, '#87949e')}</svg>`
      const name = `${d.slug}-${variant ? 'atelier-exploitation' : 'parcours-metier'}`
      await fs.writeFile(path.join(output, `${name}.webp`), await sharp(Buffer.from(svg)).webp({ quality: 82 }).toBuffer())
      await fs.writeFile(path.join(output, `${name}-thumb.webp`), await sharp(Buffer.from(svg)).resize(640, 400).webp({ quality: 76 }).toBuffer())
    }
    const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#fbf8f2"/><rect x="790" width="410" height="630" fill="${d.color}" fill-opacity=".08"/><circle cx="1030" cy="325" r="210" fill="none" stroke="${d.color}" stroke-opacity=".15"/>${logoImage(940, 225, 120)}${text('LITUS / EXPERTISES', 64, 82, 20, '#d84e22', 600)}${text(d.name, 64, 192, 41, '#173248', 600)}${lines(d.headline, 64, 295, 30, 39)}${lines(d.accent, 64, 416, 34, 32, '#d84e22')}${text('litus.fr/expertise/' + d.slug, 64, 568, 19, '#6c7c88')}</svg>`
    await fs.writeFile(path.join(output, `${d.slug}-litus-og.png`), await sharp(Buffer.from(social)).png({ compressionLevel: 9 }).toBuffer())
    console.log(`${position + 1}/${connectedDefinitions.length} ${d.slug}: illustrations, miniatures et Open Graph générés`)
  }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
