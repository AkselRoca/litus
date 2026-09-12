import { getBlogArticles } from '@/lib/blog/articles'
import { escape, ORIGIN } from '@/lib/editorial/core'

export const dynamic = 'force-dynamic'
export async function GET() {
  const articles = await getBlogArticles()
  if (!articles.length) return new Response('Archive temporarily unavailable', { status: 503, headers: { 'Retry-After': '60' } })
  const urls = articles.map(a => `<url><loc>${escape(`${ORIGIN}/blog/${a.slug}`)}</loc><lastmod>${escape(a.updatedAt || a.publishedAt)}</lastmod></url>`).join('')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'no-cache' } })
}
