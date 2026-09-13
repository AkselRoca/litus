import sharp from 'sharp'
import { z } from 'zod'
import cloudinary from '@/lib/cloudinary'
import { escape, hash, ORIGIN } from './core'
import { model } from './providers'
import type { EditorialImage, Item } from './types'

export async function workflowDiagram(item: Item): Promise<EditorialImage> {
  const data = await model('Prépare un schéma de principe ORIGINAL, pas une capture de logiciel. Utilise uniquement les étapes et précautions expliquées dans le brouillon. Quatre étapes courtes (20 caractères maximum chacune), trois contrôles métier (45 caractères maximum chacun), un titre court et un ALT descriptif. Aucun résultat client, logo, chiffre de performance ou interface officielle inventé.', { title: item.draft!.title, blocks: item.draft!.blocks, sources: item.research?.sources.filter(s => s.official).map(s => ({ title: s.title, text: s.text.slice(0, 2000) })) }, z.object({ title: z.string().min(10).max(55), steps: z.array(z.string().min(3).max(20)).length(4), controls: z.array(z.string().min(10).max(45)).length(3), alt: z.string().min(30).max(200) }))
  const boxes = data.steps.map((label, i) => `<rect x="${60 + i * 300}" y="255" width="250" height="130" rx="20" fill="white" stroke="#d5dfe5"/><text x="${80 + i * 300}" y="290" font-size="16" fill="#bf4821">0${i + 1}</text><text x="${80 + i * 300}" y="343" font-size="19" fill="#193044">${escape(label)}</text>${i < 3 ? `<path d="M${320 + i * 300} 320h25m-8-6 8 6-8 6" fill="none" stroke="#c94c21" stroke-width="2"/>` : ''}`).join('')
  const controls = data.controls.map((label, i) => `<circle cx="75" cy="${455 + i * 55}" r="5" fill="#c94c21"/><text x="95" y="${462 + i * 55}" font-size="22" fill="#425567">${escape(label)}</text>`).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1320" height="720"><rect width="1320" height="720" rx="24" fill="#f8f5ef"/><g font-family="sans-serif"><text x="60" y="70" font-size="18" fill="#b84922">LITUS / SCHÉMA DE PRINCIPE</text><text x="60" y="155" font-size="31" fill="#193044">${escape(data.title)}</text>${boxes}${controls}<text x="60" y="660" font-size="17" fill="#657586">Illustration originale. À adapter aux outils, accès et règles de votre entreprise.</text></g></svg>`
  const buffer = await sharp(Buffer.from(svg)).webp({ quality: 86 }).toBuffer(), sha256 = hash(buffer.toString('base64'))
  const upload = await cloudinary.uploader.upload(`data:image/webp;base64,${buffer.toString('base64')}`, { folder: `litus/editorial/${item.namespace}/${item.id}`, public_id: `${item.seo!.slug}-schema-${sha256.slice(0, 8)}`, overwrite: false, timeout: 45000 })
  return { src: upload.secure_url, width: 1320, height: 720, alt: data.alt, caption: 'Schéma de principe original du processus décrit dans cet article, à adapter à votre entreprise.', credit: 'Litus', license: 'Illustration originale Litus', licenseUrl: `${ORIGIN}/mentions-legales`, sourceUrl: `${ORIGIN}/blog/${item.seo!.slug}`, publicId: upload.public_id, sha256 }
}
