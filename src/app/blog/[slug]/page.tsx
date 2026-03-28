import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { BlogArticleTemplate, generateBlogArticleMetadata } from '@/components/templates/BlogArticleTemplate'
import { prisma } from '@/lib/database_final'

export const revalidate = 60

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    // @ts-ignore
    const postResult = await prisma.blogPost.findUnique({
        where: { slug },
        include: { author: true }
    })
    const post = postResult as any

    if (!post) {
        return { title: 'Article introuvable | Litus' }
    }

    return generateBlogArticleMetadata({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        content: <></>, // Not used for meta
        author: {
            name: post.author?.name || "L'équipe Litus",
            role: post.author?.role || 'Expert Digital',
            avatar: post.author?.avatar,
        },
        publishedAt: post.publishedAt ? post.publishedAt.toLocaleDateString('fr-FR') : post.createdAt.toLocaleDateString('fr-FR'),
        readTime: '5 min',
        category: post.category || 'Général',
        coverImage: post.coverImage,
    })
}

export async function generateStaticParams() {
    try {
        const postsResult = await prisma.blogPost.findMany({
            where: { published: true },
            select: { slug: true }
        })
        const posts = postsResult as { slug: string }[]
        return posts.map((post) => ({
            slug: post.slug,
        }))
    } catch (e) {
        return []
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params
    // @ts-ignore
    const postResult = await prisma.blogPost.findUnique({
        where: { slug },
        include: { author: true }
    })
    const post = postResult as any

    if (!post || !post.published) {
        notFound()
    }

    // Récupérer des articles similaires
    // @ts-ignore
    const relatedResult = await prisma.blogPost.findMany({
        where: { 
            category: post.category || 'SEO',
            published: true,
            slug: { not: slug }
        },
        take: 3,
        orderBy: { publishedAt: 'desc' }
    })
    const related = relatedResult as any[]

    const wordCount = post.content.split(/\s+/).length
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))

    const articleData = {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        content: <div dangerouslySetInnerHTML={{ __html: post.content }} className="custom-html-content" />,
        author: {
            name: post.author?.name || "L'équipe Litus",
            role: post.author?.role || 'Expert Digital',
            avatar: post.author?.avatar,
        },
        publishedAt: post.publishedAt ? post.publishedAt.toLocaleDateString('fr-FR', {
            year: 'numeric', month: 'long', day: 'numeric'
        }) : post.createdAt.toLocaleDateString('fr-FR', {
            year: 'numeric', month: 'long', day: 'numeric'
        }),
        readTime: `${readTimeMinutes} min`,
        category: post.category || 'Actualités',
        coverImage: post.coverImage,
        tableOfContents: post.tableOfContents,
        relatedArticles: related.map(rel => ({
            slug: rel.slug,
            title: rel.title,
            coverImage: rel.coverImage,
            excerpt: rel.excerpt
        }))
    }

    return <BlogArticleTemplate data={articleData} />
}
