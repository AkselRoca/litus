import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const leadMagnetSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    company: z.string().optional(),
    phone: z.string().optional(),
    magnetId: z.string(),
    magnetTitle: z.string(),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = leadMagnetSchema.parse(body)

        // Tenter de sauvegarder en DB si Prisma est configuré
        try {
            // Import dynamique pour éviter erreur de build si DB non configurée
            const { prisma } = await import('@/lib/database_final')

            await prisma.lead.create({
                data: {
                    type: 'lead-magnet',
                    email: validatedData.email,
                    phone: validatedData.phone || null,
                    data: JSON.stringify({
                        fullName: validatedData.fullName,
                        company: validatedData.company,
                        magnetId: validatedData.magnetId,
                        magnetTitle: validatedData.magnetTitle,
                    }),
                    source: `/ressources/${validatedData.magnetId}`,
                    treated: false,
                },
            })

            // Tracker le téléchargement
            await prisma.leadMagnetDownload.create({
                data: {
                    type: validatedData.magnetId,
                    email: validatedData.email,
                    source: `/ressources/${validatedData.magnetId}`,
                },
            })

            console.log('Lead Magnet saved to DB:', validatedData.email)
        } catch (dbError) {
            // Si la DB n'est pas configurée, on continue sans erreur
            console.warn('DB save skipped (not configured or error):', dbError instanceof Error ? dbError.message : 'Unknown error')
        }

        // TODO: Envoyer email avec Resend si RESEND_API_KEY est configurée
        // if (process.env.RESEND_API_KEY) {
        //     await sendConfirmationEmail(validatedData)
        //     await sendAdminNotification(validatedData)
        // }

        const downloadUrl = `/lead-magnets/${validatedData.magnetId}.pdf`

        return NextResponse.json({
            success: true,
            message: 'Lead magnet envoyé avec succès',
            downloadUrl,
            magnetId: validatedData.magnetId,
            magnetTitle: validatedData.magnetTitle,
        })
    } catch (error) {
        console.error('Erreur API lead-magnet:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.issues },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, message: 'Erreur serveur' },
            { status: 500 }
        )
    }
}
