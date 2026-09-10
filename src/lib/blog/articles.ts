import { cache } from 'react'
import { prisma } from '@/lib/database_final'
import { calculateReadTime, localArticles } from './local-articles'
import { articles2026A } from './articles-2026-a'
import { articles2026B } from './articles-2026-b'
import { withArticlePhotos } from './article-photos'

export type BlogCategory = 'SEO' | 'Stratégie' | 'Site Web' | 'Google Ads'
export type BlogCity = 'Lorient' | 'Le Mans' | 'Lanester' | 'Ploemeur' | 'Hennebont' | 'Larmor-Plage' | 'Auray' | 'Vannes' | 'Morbihan' | 'Allonnes' | 'Coulaines' | 'Arnage' | 'La Chapelle-Saint-Aubin' | 'Yvré-l’Évêque' | 'Sarthe' | null

export type BlogImage = {
  src: string
  alt: string
  caption: string
  sourceUrl: string
  credit: string
  license: string
  licenseUrl: string
  width: number
  height: number
  afterSection?: number
}

export type BlogArticle = {
  slug: string
  title: string
  excerpt: string
  metaTitle?: string
  metaDescription?: string
  category: BlogCategory
  city: BlogCity
  content: string
  publishedAt: string
  updatedAt?: string
  readTimeMinutes: number
  coverImage: string
  coverImageAlt: string
  coverImageCredit?: { label: string; href: string }
  imageSource?: string
  imageCredit?: string
  imageLicense?: string
  images?: BlogImage[]
  authorName: string
}

const editorialArticles: BlogArticle[] = [
  ...localArticles,
  ...[...articles2026A, ...articles2026B].map(article => ({ ...article, readTimeMinutes: calculateReadTime(article.content) })),
].map(withArticlePhotos).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

function categoryFor(value: string | null): BlogCategory {
  const category = (value ?? '').toLowerCase()
  if (/google ads|sea|publicit/.test(category)) return 'Google Ads'
  if (/site|web|développement|design/.test(category)) return 'Site Web'
  if (/seo|référencement/.test(category)) return 'SEO'
  return 'Stratégie'
}

function cityFor(title: string, excerpt: string): BlogCity {
  const text = `${title} ${excerpt}`
  const lorient = /\blorient\b/i.test(text)
  const leMans = /\b(?:le|au) mans\b/i.test(text)
  return lorient === leMans ? null : lorient ? 'Lorient' : 'Le Mans'
}

/** Read-only: existing published slugs, content and publication dates take precedence. */
export const getBlogArticles = cache(async (): Promise<BlogArticle[]> => {
  let existing: BlogArticle[] = []
  let unpublishedSlugs = new Set<string>()
  try {
    const [posts, unpublishedLocalPosts] = await Promise.all([prisma.blogPost.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      select: {
        slug: true, title: true, excerpt: true, content: true, category: true,
        publishedAt: true, createdAt: true, updatedAt: true, coverImage: true, metaTitle: true, metaDesc: true,
        author: { select: { name: true } },
      },
    }), prisma.blogPost.findMany({
      where: { published: false, slug: { in: editorialArticles.map(article => article.slug) } },
      select: { slug: true },
    })])
    unpublishedSlugs = new Set(unpublishedLocalPosts.map(post => post.slug))
    existing = posts.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      metaTitle: post.metaTitle || undefined, metaDescription: post.metaDesc || undefined,
      category: categoryFor(post.category),
      city: cityFor(post.title, post.excerpt),
      content: post.content,
      publishedAt: (post.publishedAt ?? post.createdAt).toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      readTimeMinutes: calculateReadTime(post.content),
      coverImage: post.coverImage || '/territories/lorient-port.webp',
      coverImageAlt: post.coverImage ? post.title : 'Le quai de Rohan à Lorient',
      ...(!post.coverImage ? { coverImageCredit: { label: 'Taratata · CC BY 3.0', href: '/territories/credits.html' } } : {}),
      authorName: post.author?.name || 'L’équipe Litus',
    }))
  } catch {
    // Fail closed: an unavailable database cannot confirm that a local slug was not unpublished.
    console.warn('[Blog] Published archive temporarily unavailable.')
    return []
  }
  const bySlug = new Map(existing.map(article => [article.slug, article]))
  const prioritized = editorialArticles.filter(article => !unpublishedSlugs.has(article.slug))
    .map(article => bySlug.get(article.slug) ?? article)
  const localSlugs = new Set(prioritized.map(article => article.slug))
  return [...prioritized, ...existing.filter(article => !localSlugs.has(article.slug))]
})

export async function getBlogArticle(slug: string): Promise<BlogArticle | null> {
  return (await getBlogArticles()).find(article => article.slug === slug) ?? null
}
