import type { Metadata } from 'next'
import { getBlogArticles } from '@/lib/blog/articles'
import { BlogHero } from './_components/BlogHero'
import { BlogArticles } from './_components/BlogArticles'
import { BlogNewsletter } from './_components/BlogNewsletter'
import './blog.css'

const title = 'Blog Litus : SEO, sites web & Google Ads à Lorient et au Mans'
const description = 'Des conseils concrets pour les entreprises de Lorient et du Mans : référencement local, création et refonte de sites, Google Ads et stratégie digitale.'

export const metadata: Metadata = {
  title: { absolute: title }, description, keywords: null,
  alternates: { canonical: '/blog' },
  openGraph: { title, description, url: 'https://litus.fr/blog', type: 'website', locale: 'fr_FR', siteName: 'Litus', images: [{ url: '/litus-og-social.png', width: 1200, height: 630, alt: 'Litus — Votre agence web pour développer votre activité.' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/litus-og-social.png'] },
}

export const revalidate = 60

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string | string[]; city?: string | string[] }> }) {
  const filters = await searchParams
  const category = Array.isArray(filters.category) ? filters.category[0] : filters.category
  const city = Array.isArray(filters.city) ? filters.city[0] : filters.city
  const articles = await getBlogArticles()
  const cards = articles.map(({ slug, title: articleTitle, excerpt, category: articleCategory, city: articleCity, publishedAt, readTimeMinutes, coverImage, coverImageAlt, authorName }) => ({ slug, title: articleTitle, excerpt, category: articleCategory, city: articleCity, publishedAt, readTimeMinutes, coverImage, coverImageAlt, authorName }))
  const featured = cards.find(article => article.slug === 'referencement-local-lorient-fiche-google') ?? cards[0]
  const schema = {
    '@context': 'https://schema.org', '@type': 'Blog',
    name: 'Litus Inside', description, url: 'https://litus.fr/blog', inLanguage: 'fr-FR',
    publisher: { '@type': 'Organization', name: 'Litus', url: 'https://litus.fr' },
    blogPost: articles.map(article => ({ '@type': 'BlogPosting', headline: article.title, description: article.metaDescription || article.excerpt, image: new URL(article.coverImage, 'https://litus.fr').href, url: `https://litus.fr/blog/${article.slug}`, datePublished: article.publishedAt, dateModified: article.updatedAt || article.publishedAt, author: { '@type': article.authorName.includes('Litus') ? 'Organization' : 'Person', name: article.authorName } })),
  }
  return <div className="blog-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <BlogHero article={featured} />
    <BlogArticles articles={cards} category={category} city={city} />
    <BlogNewsletter />
  </div>
}
