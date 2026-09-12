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
mkdirSync(join(root, 'src/lib/editorial'), { recursive: true })
writeFileSync(join(root, 'src/lib/editorial/site-inventory.json'), JSON.stringify({ services, routes: staticRoutes.map(r => r.path), localAreas: ['Lorient', 'Le Mans'], }, null, 2) + '\n')
mkdirSync(join(root, 'docs/editorial'), { recursive: true })
writeFileSync(join(root, 'docs/editorial/site-audit.json'), JSON.stringify({ routes, files: records, sitemap: readFileSync('next-sitemap.config.js', 'utf8'), cron: existsSync('vercel.json') ? JSON.parse(readFileSync('vercel.json', 'utf8')).crons ?? [] : [], technologies: JSON.parse(readFileSync('package.json', 'utf8')).dependencies }, null, 2) + '\n')
console.log(`Editorial inventory: ${files.length} files, ${routes.length} public page templates, ${services.length} verified service routes.`)
