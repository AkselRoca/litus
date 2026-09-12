import { withAdmin } from '@/lib/admin/guard'
import { prisma } from '@/lib/database_final'
import { uploadImage } from '@/lib/cloudinary'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/admin/media/upload - Upload une image
export const POST = withAdmin(async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const alt = formData.get('alt') as string | null
        const folder = (formData.get('folder') as string) || 'litus'

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
        }

        // Convertir le fichier en buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

        // Upload vers Cloudinary (conversion WebP + nom SEO)
        const result = await uploadImage(base64, {
            folder,
            alt: alt || undefined,
            filename: file.name,
        })

        if (!result.success || !result.data) {
            return NextResponse.json({ success: false, error: result.error }, { status: 500 })
        }

        // Sauvegarder dans la base de données
        const media = await prisma.media.create({
            data: {
                publicId: result.data.publicId,
                url: result.data.url,
                filename: file.name,
                alt: alt || null,
                width: result.data.width,
                height: result.data.height,
                format: result.data.format,
                bytes: result.data.bytes,
                folder,
            }
        })

        return NextResponse.json({
            success: true,
            data: media,
        })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
})

// GET /api/admin/media/upload - Liste tous les médias
export const GET = withAdmin(async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const folder = searchParams.get('folder') || undefined

        const media = await prisma.media.findMany({
            where: folder ? { folder } : undefined,
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json({ success: true, data: media })

    } catch (error) {
        console.error('List media error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
})
