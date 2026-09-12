import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import sharp from 'sharp'

const story = JSON.parse(readFileSync(new URL('../src/lib/case-studies/sarl-pean-j.json', import.meta.url), 'utf8'))
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const metrics = story.performance.metrics.map((metric, index) => {
  const x = 64 + index * 588
  return `<rect x="${x}" y="270" width="564" height="240" rx="20" fill="#ffffff" fill-opacity=".04" stroke="#ffffff" stroke-opacity=".13"/><text x="${x + 32}" y="318" font-size="23" fill="#c9d6dd">${escape(metric.label)}</text><text x="${x + 27}" y="446" font-size="116" font-weight="700" letter-spacing="-7" fill="${index ? '#f4f5f1' : '#ff925a'}">${escape(metric.value)}</text>`
}).join('')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800"><defs><radialGradient id="glow"><stop stop-color="#376371" stop-opacity=".6"/><stop offset="1" stop-color="#132a38" stop-opacity="0"/></radialGradient></defs><rect width="1280" height="800" fill="#132a38"/><ellipse cx="1120" cy="40" rx="680" ry="530" fill="url(#glow)"/><circle cx="1250" cy="35" r="230" fill="none" stroke="#ffffff" stroke-opacity=".06"/><circle cx="1250" cy="35" r="290" fill="none" stroke="#ffffff" stroke-opacity=".03"/><g font-family="sans-serif"><text x="66" y="78" fill="#ffad80" font-size="19" letter-spacing="2">GOOGLE ADS / ACQUISITION LOCALE</text><text x="60" y="176" fill="#ffffff" font-size="68" font-weight="700" letter-spacing="-2">${escape(story.title)}</text><text x="65" y="220" fill="#bbccd3" font-size="25">Des clics aux demandes commerciales.</text>${metrics}<path d="M65 557H1215" stroke="#ffffff" stroke-opacity=".15"/><rect x="65" y="590" width="58" height="58" rx="15" fill="#a6d6c2" fill-opacity=".09"/><path d="m80 625 10-10 8 8 12-19m-11 0h11v11" fill="none" stroke="#a6d6c2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><text x="145" y="610" fill="#f3f5f4" font-size="26" font-weight="600">Des campagnes rentables.</text><text x="145" y="649" fill="#bbccd3" font-size="23">Un client qui augmente progressivement son budget.</text><text x="65" y="744" fill="#99b4c0" font-size="18">Campagnes optimisées et pilotées par Litus</text></g></svg>`
const directory = new URL('../public/realisations/clients/sarl-pean-j/', import.meta.url)
mkdirSync(directory, { recursive: true })
writeFileSync(new URL('resultats-google-ads-acquisition.svg', directory), svg)
await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(new URL('resultats-google-ads-acquisition.webp', directory).pathname.replace(/^\/(\w:)/, '$1'))
