import { withAdmin } from '@/lib/admin/guard'
import { prisma } from '@/lib/database_final'
import { uploadFromUrl, getOptimizedUrl, generateSrcset } from '@/lib/cloudinary'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// POST /api/admin/media/migrate-portfolio - Migre toutes les images portfolio vers Cloudinary
export const POST = withAdmin(async function POST(request: NextRequest) {
    try {
        const baseUrl = process.env.SITE_URL || 'https://litus-five.vercel.app'

        // Récupérer tous les projets
        const projects = await prisma.project.findMany()

        const results: Array<{
            projectId: string
            title: string
            oldUrl: string
            newUrl: string | null
            success: boolean
            error?: string
        }> = []

        for (const project of projects) {
            // Skip si déjà une URL Cloudinary
            if (project.imageUrl.includes('cloudinary.com')) {
                results.push({
                    projectId: project.id,
                    title: project.title,
                    oldUrl: project.imageUrl,
                    newUrl: project.imageUrl,
                    success: true,
                })
                continue
            }

            try {
                // Construire l'URL complète de l'image
                const imageUrl = project.imageUrl.startsWith('http')
                    ? project.imageUrl
                    : `${baseUrl}${project.imageUrl}`

                // Générer un publicId propre à partir du titre
                const publicId = project.title
                    .toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Enlever accents
                    .replace(/[^a-z0-9]+/g, '-') // Remplacer caractères spéciaux par -
                    .replace(/-+/g, '-') // Éviter doubles tirets
                    .replace(/^-|-$/g, '') // Enlever tirets début/fin

                // Upload vers Cloudinary
                const uploadResult = await uploadFromUrl(imageUrl, {
                    folder: 'litus/portfolio',
                    publicId,
                })

                if (uploadResult.success && uploadResult.data) {
                    // Mettre à jour le projet avec la nouvelle URL
                    await prisma.project.update({
                        where: { id: project.id },
                        data: { imageUrl: uploadResult.data.optimizedUrl }
                    })

                    // Sauvegarder dans la table Media
                    await prisma.media.create({
                        data: {
                            publicId: uploadResult.data.publicId,
                            url: uploadResult.data.url,
                            filename: `${project.title}.${uploadResult.data.format}`,
                            alt: project.title,
                            width: uploadResult.data.width,
                            height: uploadResult.data.height,
                            format: uploadResult.data.format,
                            bytes: uploadResult.data.bytes,
                            folder: 'litus/portfolio',
                        }
                    })

                    results.push({
                        projectId: project.id,
                        title: project.title,
                        oldUrl: project.imageUrl,
                        newUrl: uploadResult.data.optimizedUrl,
                        success: true,
                    })
                } else {
                    results.push({
                        projectId: project.id,
                        title: project.title,
                        oldUrl: project.imageUrl,
                        newUrl: null,
                        success: false,
                        error: uploadResult.error,
                    })
                }
            } catch (error) {
                results.push({
                    projectId: project.id,
                    title: project.title,
                    oldUrl: project.imageUrl,
                    newUrl: null,
                    success: false,
                    error: String(error),
                })
            }
        }

        const successful = results.filter(r => r.success).length
        const failed = results.filter(r => !r.success).length

        return NextResponse.json({
            success: true,
            message: `Migration terminée: ${successful} succès, ${failed} échecs`,
            results,
        })

    } catch (error) {
        console.error('Migration error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
})

// GET - Prévisualiser ce qui sera migré
export const GET = withAdmin(async function GET() {
    try {
        const projects = await prisma.project.findMany({
            select: {
                id: true,
                title: true,
                imageUrl: true,
            }
        })

        const toMigrate = projects.filter(p => !p.imageUrl.includes('cloudinary.com'))
        const alreadyMigrated = projects.filter(p => p.imageUrl.includes('cloudinary.com'))

        return NextResponse.json({
            success: true,
            total: projects.length,
            toMigrate: toMigrate.length,
            alreadyMigrated: alreadyMigrated.length,
            projects: toMigrate,
        })

    } catch (error) {
        console.error('Preview migration error:', error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
})
