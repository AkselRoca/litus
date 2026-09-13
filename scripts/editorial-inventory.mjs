import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])
}
const files = walk(join(root, 'src')).filter(p => /\.(tsx?|css)$/.test(p) && !p.includes('generated')).sort()
const records = files.map(file => {
  const text = readFileSync(file, 'utf8')
  return { file: relative(root, file).replaceAll('\\', '/'),
    headings: [...text.matchAll(/<h([123])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map(m => ({ level: Number(m[1]), text: m[2].replace(/<[^>]+>/g, '').slice(0, 300) })),
    links: [...new Set([...text.matchAll(/(?:href|url)\s*[:=]\s*["'](\/[^"']*)["']/g)].map(m => m[1]))],
    titles: [...text.matchAll(/(?:title|description):\s*["']([^"']+)/g)].map(m => m[1]).slice(0, 8),
  }
})
const routes = records.filter(r => r.file.startsWith('src/app/') && r.file.endsWith('/page.tsx') && !/\/admin(?:\/|$)|\/login-admin\//.test(r.file))
  .map(r => ({ ...r, path: r.file.replace(/^src\/app/, '').replace(/\/page.tsx$/, '') || '/' }))
const staticRoutes = routes.filter(r => !r.path.includes('['))
const expertiseSource = readFileSync(join(root, 'src/lib/expertises.ts'), 'utf8')
const services = [...expertiseSource.matchAll(/label: '([^']+)', description: '([^']+)', href: '([^']+)'/g)]
  .map(m => ({ title: m[1], description: m[2], path: m[3] }))
for (const s of services) if (!staticRoutes.some(r => r.path === s.path)) throw new Error(`Missing service route: ${s.path}`)
// Include actual dynamic landing pages, not the /[slug] template itself.
const toolsSource = readFileSync(join(root, 'src/lib/expertise/catalog.ts'), 'utf8')
const tools = [...toolsSource.matchAll(/slug: '([^']+)', name: '([^']+)'/g)].map(m => ({ slug: m[1], name: m[2] }))
tools.push(...JSON.parse(readFileSync(join(root, 'src/lib/expertise/connected-tools.json'), 'utf8')))
const tradeSource = readFileSync(join(root, 'src/lib/artisan/catalog.ts'), 'utf8')
const trades = [...tradeSource.matchAll(/slug: '([^']+)', name: '([^']+)'/g)].map(m => ({ slug: m[1], name: m[2] }))
for (const tool of tools) services.push({ title: tool.name, description: `Usages métier, intégration et accompagnement ${tool.name}.`, path: `/expertise/${tool.slug}` })
for (const trade of trades) services.push({ title: `Artisan ${trade.name}`, description: `Visibilité locale et demandes de devis pour ${trade.name.toLowerCase()}.`, path: `/artisan/${trade.slug}` })
for (const [path, title] of [['/artisan', 'Artisans'], ['/association', 'Associations'], ['/pme', 'PME'], ['/collectivites', 'Collectivités']]) {
  if (staticRoutes.some(r => r.path === path)) services.push({ path, title, description: `Solutions numériques pour ${title.toLowerCase()}.` })
}
const publicPaths = [...new Set([...staticRoutes.map(r => r.path), ...services.map(s => s.path)])]
mkdirSync(join(root, 'src/lib/editorial'), { recursive: true })
writeFileSync(join(root, 'src/lib/editorial/site-inventory.json'), JSON.stringify({ services, routes: publicPaths, localAreas: ['Lorient', 'Le Mans'], }, null, 2) + '\n')
mkdirSync(join(root, 'docs/editorial'), { recursive: true })
writeFileSync(join(root, 'docs/editorial/site-audit.json'), JSON.stringify({ routes, files: records, sitemap: readFileSync('next-sitemap.config.js', 'utf8'), cron: existsSync('vercel.json') ? JSON.parse(readFileSync('vercel.json', 'utf8')).crons ?? [] : [], technologies: JSON.parse(readFileSync('package.json', 'utf8')).dependencies }, null, 2) + '\n')
console.log(`Editorial inventory: ${files.length} files, ${routes.length} public page templates, ${services.length} verified service routes.`)
