import { getVisibleProjects } from '@/actions/portfolio'
import { portfolioSlug } from '@/lib/portfolio-slugs'
import { SITE_ORIGIN } from '@/lib/seo/metadata'

export const dynamic = 'force-dynamic'
const escape = (value: string) => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[char]!))
export async function GET() {
  const result = await getVisibleProjects()
  if (!result.success || !result.data) return new Response('Portfolio temporarily unavailable', { status: 503, headers: { 'Retry-After': '60' } })
  const slugs = new Set(['fg-chronodep', ...result.data.map(project => project.editorial?.slug || portfolioSlug(project.title))])
  const urls = [...slugs].map(slug => `<url><loc>${escape(`${SITE_ORIGIN}/realisations/${slug}`)}</loc></url>`).join('')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'no-cache' } })
}
