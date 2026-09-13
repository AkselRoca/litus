import { withAdmin } from '@/lib/admin/guard'
import { prisma } from '@/lib/database_final'
import { NextRequest, NextResponse } from 'next/server'
import { isEditor } from '@/lib/editorial/admin'

// GET /api/admin/blog - Liste tous les articles
export const GET = withAdmin(async function GET() {
    if (!await isEditor()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        name: true,
                        avatar: true,
                        role: true,
                    }
                }
            }
        })

        // Adapter le format pour le frontend admin
        const formattedPosts = posts.map(post => ({
            ...post,
            category: post.category || 'Blog',
            createdAt: post.createdAt.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        }))

        return NextResponse.json({ success: true, data: formattedPosts })
    } catch (error) {
        console.error('Fetch blog error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
})

// POST /api/admin/blog - Créer un article
export const POST = withAdmin(async function POST(request: NextRequest) {
    if (!await isEditor()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    try {
        const body = await request.json()
        const { title, slug, excerpt, content, metaTitle, metaDescription, published, authorId, coverImage, tableOfContents, publishedAt, category } = body

        if (!title || !slug || !content) {
            return NextResponse.json({ success: false, error: 'Titre, slug et contenu requis' }, { status: 400 })
        }

        const newPost = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt: excerpt || '',
                content,
                metaTitle,
                metaDesc: metaDescription,
                published: published || false,
                authorId: authorId || null,
                coverImage: coverImage || null,
                tableOfContents: tableOfContents || null,
                category: category || 'SEO',
                publishedAt: publishedAt ? new Date(publishedAt) : (published ? new Date() : null),
            }
        })

        return NextResponse.json({ success: true, data: newPost })
    } catch (error) {
        console.error('Create blog error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
})
