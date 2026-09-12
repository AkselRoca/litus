import { prisma } from '@/lib/database_final'
import { NextRequest, NextResponse } from 'next/server'
import { isEditor } from '@/lib/editorial/admin'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!await isEditor()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    try {
        const { id } = await params
        const post = await prisma.blogPost.findUnique({
            where: { id },
            include: {
                author: {
                    select: { name: true, avatar: true }
                }
            }
        })

        if (!post) {
            return NextResponse.json({ success: false, error: 'Article introuvable' }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: post })
    } catch (error) {
        console.error('Fetch single blog error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!await isEditor()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    try {
        const { id } = await params
        const body = await request.json()
        const { title, slug, excerpt, content, metaTitle, metaDescription, published, authorId, coverImage, tableOfContents, publishedAt, category } = body

        const current = await prisma.blogPost.findUnique({ where: { id } })
        if (!current) return NextResponse.json({ error: 'Article introuvable' }, { status: 404 })
        const actualPublishedAt = publishedAt ? new Date(publishedAt) : published === true ? current.publishedAt || new Date() : published === false ? null : undefined

        const dataToUpdate: any = {
            title,
            slug,
            excerpt,
            content,
            metaTitle,
            metaDesc: metaDescription,
            published,
            authorId: authorId || null,
            coverImage: coverImage !== undefined ? coverImage : undefined,
            tableOfContents: tableOfContents !== undefined ? tableOfContents : undefined,
            category: category !== undefined ? category : undefined,
            updatedAt: [title !== undefined && title !== current.title, excerpt !== undefined && excerpt !== current.excerpt, content !== undefined && content !== current.content, coverImage !== undefined && coverImage !== current.coverImage].some(Boolean) ? new Date() : current.updatedAt,
        }

        if (actualPublishedAt !== undefined) {
            dataToUpdate.publishedAt = actualPublishedAt;
        }

        const updatedPost = await prisma.blogPost.update({
            where: { id },
            data: dataToUpdate
        })

        return NextResponse.json({ success: true, data: updatedPost })
    } catch (error) {
        console.error('Update blog error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!await isEditor()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    try {
        const { id } = await params
        await prisma.blogPost.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Delete blog error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
