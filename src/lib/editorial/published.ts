import type { BlogArticle } from '@/lib/blog/articles'
import { hash, escape } from './core'
import { editorialDb } from './store'
import type { Item } from './types'

export function toBlogArticle(item: Item): BlogArticle {
  const hero = item.images![0]
  const categories: Record<string, BlogArticle['category']> = { '/google-ads': 'Google Ads', '/referencement-naturel': 'SEO', '/seo-local': 'SEO', '/google-business-profile': 'SEO', '/automatisation': 'Automatisation', '/creation-outils-ia': 'IA', '/integrations-api': 'Développement', '/creation-application-web': 'Développement', '/developpement-web-sur-mesure': 'Développement', '/creation-site-ecommerce': 'E-commerce' }
  return { slug: item.slug!, title: item.draft!.title, excerpt: item.draft!.excerpt, metaTitle: item.seo!.title, metaDescription: item.seo!.description,
    category: categories[item.targetServicePage] ?? 'Site Web', city: null, content: item.content!, publishedAt: item.publishedAt || item.scheduledAt,
    updatedAt: item.modifiedAt, readTimeMinutes: Math.max(1, Math.ceil(item.draft!.blocks.map(b => [b.text, ...b.items, ...b.rows.flat()].join(' ')).join(' ').split(/\s+/).length / 220)),
    coverImage: hero.src, coverImageAlt: hero.alt, coverImageCredit: { label: `${hero.credit} · ${hero.license}`, href: hero.sourceUrl },
    images: item.images!.slice(1), authorName: 'L’équipe Litus', cluster: item.cluster, targetServicePage: item.targetServicePage,
    cta: { label: item.seo!.ctaLabel, text: item.seo!.ctaText, href: item.targetServicePage },
  }
}
export async function publishedEditorial(): Promise<BlogArticle[]> {
  if (!process.env.TURSO_DATABASE_URL && !process.env.EDITORIAL_DATABASE_URL) return []
  try {
    const result = await editorialDb().execute({ sql: "SELECT json_remove(data, '$.research', '$.review', '$.brief') AS data FROM EditorialItem WHERE namespace='production' AND status='PUBLISHED' AND json_extract(data, '$.refreshOf') IS NULL", args: [] })
    return result.rows.map(row => JSON.parse(String(row.data)) as Item)
      .filter(item => item.publishedAt && Date.parse(item.publishedAt) <= Date.now() && item.gate?.passed && item.images?.length === 3 && item.content && item.seo && item.draft)
      .map(toBlogArticle)
  } catch { console.warn('[Editorial] Published archive unavailable'); return [] }
}
export async function addBacklinkOverlays(articles: BlogArticle[]): Promise<BlogArticle[]> {
  if (!process.env.TURSO_DATABASE_URL && !process.env.EDITORIAL_DATABASE_URL) return articles
  try {
    const result = await editorialDb().execute({ sql: "SELECT * FROM EditorialBacklink WHERE namespace='production' ORDER BY createdAt", args: [] })
    const slugs = new Set(articles.map(a => a.slug))
    return articles.map(article => {
      const originalHash = hash(article.content)
      let content = article.content, modified = article.updatedAt
      for (const row of result.rows.filter(r => r.sourceSlug === article.slug && r.originalHash === originalHash && slugs.has(String(r.targetSlug)))) {
        let inserted = false
        const anchor = escape(String(row.anchor))
        content = content.replace(/<p\b[^>]*>[\s\S]*?<\/p>/gi, paragraph => {
          if (inserted || /<a\b/i.test(paragraph) || !paragraph.includes(anchor)) return paragraph
          inserted = true
          return paragraph.replace(anchor, `<a href="/blog/${escape(String(row.targetSlug))}">${anchor}</a>`)
        })
        if (inserted) modified = [modified || article.publishedAt, String(row.createdAt)].sort().at(-1)
      }
      return content === article.content ? article : { ...article, content, updatedAt: modified }
    })
  } catch { return articles }
}
