import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BlogArticleTemplate, generateBlogArticleMetadata, type BlogArticleData } from '@/components/templates/BlogArticleTemplate'
import { getBlogArticle, getBlogArticles } from '@/lib/blog/articles'
import { prepareArticle } from '@/lib/blog/prepare-article'

export const revalidate = 60

type PageProps = { params: Promise<{ slug: string }> }

async function articleData(slug: string): Promise<BlogArticleData | null> {
  const post = await getBlogArticle(slug)
  if (!post) return null
  const prepared = prepareArticle(post.content, post.images)
  const formatDate = (value: string) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }).format(new Date(value))
  return {
    slug: post.slug, title: post.title, excerpt: post.excerpt,
    metaTitle: post.metaTitle, metaDescription: post.metaDescription,
    content: <div dangerouslySetInnerHTML={{ __html: prepared.content }} className="custom-html-content" />,
    tableOfContents: prepared.headings,
    author: { name: post.authorName, role: 'Litus' },
    publishedAt: formatDate(post.publishedAt),
    publishedAtIso: post.publishedAt,
    updatedAt: post.updatedAt ? formatDate(post.updatedAt) : undefined, updatedAtIso: post.updatedAt || post.publishedAt,
    readTime: `${post.readTimeMinutes} min`, category: post.category, city: post.city,
    coverImage: post.coverImage, coverImageAlt: post.coverImageAlt, coverImageCredit: post.coverImageCredit,
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await articleData(slug)
  return data ? generateBlogArticleMetadata(data) : { title: 'Article introuvable | Litus', robots: { index: false, follow: false } }
}

export async function generateStaticParams() {
  const posts = await getBlogArticles()
  return posts.map(post => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const data = await articleData(slug)
  if (!data) notFound()
  const articles = await getBlogArticles()
  data.relatedArticles = articles.filter(post => post.slug !== slug).sort((a, b) => Number(b.category === data.category) - Number(a.category === data.category)).slice(0, 3).map(post => ({ slug: post.slug, title: post.title, coverImage: post.coverImage, excerpt: post.excerpt }))
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: data.title, description: data.metaDescription || data.excerpt, datePublished: data.publishedAtIso, dateModified: data.updatedAtIso,
    url: `https://litus.fr/blog/${data.slug}`, mainEntityOfPage: { '@type': 'WebPage', '@id': `https://litus.fr/blog/${data.slug}` },
    inLanguage: 'fr-FR', image: data.coverImage ? new URL(data.coverImage, 'https://litus.fr').href : undefined,
    author: { '@type': data.author.name.includes('Litus') ? 'Organization' : 'Person', name: data.author.name },
    publisher: { '@type': 'Organization', name: 'Litus', url: 'https://litus.fr' },
  }
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://litus.fr' },
    { '@type': 'ListItem', position: 2, name: 'Litus Inside', item: 'https://litus.fr/blog' },
    { '@type': 'ListItem', position: 3, name: data.title, item: `https://litus.fr/blog/${data.slug}` },
  ] }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb]).replace(/</g, '\\u003c') }} /><BlogArticleTemplate data={data} /></>
}
