import { prisma } from '@/lib/database_final'
import { deleteImage } from '@/lib/cloudinary'
import { NextRequest, NextResponse } from 'next/server'

// DELETE /api/admin/media/[id] - Supprimer un média
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Récupérer le média
        const media = await prisma.media.findUnique({ where: { id } })
        if (!media) {
            return NextResponse.json({ success: false, error: 'Media not found' }, { status: 404 })
        }

        // Supprimer de Cloudinary
        const cloudinaryResult = await deleteImage(media.publicId)
        if (!cloudinaryResult.success) {
            console.warn('Cloudinary delete warning:', cloudinaryResult.error)
            // On continue quand même pour supprimer de la DB
        }

        // Supprimer de la base de données
        await prisma.media.delete({ where: { id } })

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error('Delete media error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

// PATCH /api/admin/media/[id] - Modifier un média (alt, filename)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const media = await prisma.media.update({
            where: { id },
            data: {
                alt: body.alt !== undefined ? body.alt : undefined,
                filename: body.filename !== undefined ? body.filename : undefined,
            }
        })

        return NextResponse.json({ success: true, data: media })

    } catch (error) {
        console.error('Update media error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}

// GET /api/admin/media/[id] - Récupérer un média
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const media = await prisma.media.findUnique({ where: { id } })
        if (!media) {
            return NextResponse.json({ success: false, error: 'Media not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: media })

    } catch (error) {
        console.error('Get media error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
