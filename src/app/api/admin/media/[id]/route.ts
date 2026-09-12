import { withAdmin } from '@/lib/admin/guard'
import { prisma } from '@/lib/database_final'
import { deleteImage, renameImage } from '@/lib/cloudinary'
import { NextRequest, NextResponse } from 'next/server'

// DELETE /api/admin/media/[id] - Supprimer un média
export const DELETE = withAdmin(async function DELETE(
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
})

// PATCH /api/admin/media/[id] - Modifier un média (alt, filename avec renommage Cloudinary)
export const PATCH = withAdmin(async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        // Si on renomme le fichier, on renomme aussi sur Cloudinary
        if (body.filename !== undefined) {
            const currentMedia = await prisma.media.findUnique({ where: { id } })
            if (!currentMedia) {
                return NextResponse.json({ success: false, error: 'Media not found' }, { status: 404 })
            }

            // Nettoyer le nouveau nom pour en faire un publicId valide
            const ext = body.filename.split('.').pop() || ''
            const nameWithoutExt = body.filename.replace(/\.[^.]+$/, '')
            const cleanPublicId = nameWithoutExt
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Supprimer accents
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Garder que alphanum, espaces, tirets
                .replace(/\s+/g, '-') // Espaces → tirets
                .replace(/-+/g, '-') // Pas de double tirets
                .replace(/^-|-$/g, '') // Pas de tiret début/fin

            const folder = currentMedia.folder || 'litus'
            const newPublicId = `${folder}/${cleanPublicId}`

            // Renommer sur Cloudinary
            const renameResult = await renameImage(currentMedia.publicId, newPublicId)

            if (renameResult.success && renameResult.data) {
                // Mise à jour DB avec le nouveau publicId + URL
                const media = await prisma.media.update({
                    where: { id },
                    data: {
                        filename: body.filename,
                        publicId: renameResult.data.publicId,
                        url: renameResult.data.url,
                        alt: body.alt !== undefined ? body.alt : undefined,
                    }
                })
                return NextResponse.json({ success: true, data: media })
            } else {
                // Cloudinary rename a échoué, on met à jour juste le nom en DB
                console.warn('Cloudinary rename failed, updating DB only:', renameResult.error)
                const media = await prisma.media.update({
                    where: { id },
                    data: {
                        filename: body.filename,
                        alt: body.alt !== undefined ? body.alt : undefined,
                    }
                })
                return NextResponse.json({ success: true, data: media })
            }
        }

        // Mise à jour simple (alt text seulement)
        const media = await prisma.media.update({
            where: { id },
            data: {
                alt: body.alt !== undefined ? body.alt : undefined,
            }
        })

        return NextResponse.json({ success: true, data: media })

    } catch (error) {
        console.error('Update media error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
})

// GET /api/admin/media/[id] - Récupérer un média
export const GET = withAdmin(async function GET(
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
})
