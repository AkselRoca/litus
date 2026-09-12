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

// Mapping des IDs vers les URLs de téléchargement
const DOWNLOAD_URLS: Record<string, string> = {
    'checklist-gmb': '/lead-magnets/checklist-gmb-litus.pdf',
    'audit-productivite': '/lead-magnets/audit-productivite-litus.pdf',
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = leadMagnetSchema.parse(body)

        if (validatedData.magnetId === 'guide-prix' || validatedData.magnetId === 'cahier-des-charges') {
            return NextResponse.json({ error: 'Utilisez le générateur de cahier des charges.', url: '/ressources/cahier-des-charges' }, { status: 410 })
        }

        // Sauvegarder en DB
        try {
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
                    source: `lead-magnet/${validatedData.magnetId}`,
                    treated: false,
                },
            })

            // Tracker le téléchargement
            await prisma.leadMagnetDownload.create({
                data: {
                    type: validatedData.magnetId,
                    email: validatedData.email,
                    source: `lead-magnet/${validatedData.magnetId}`,
                },
            })

            console.log('Lead Magnet saved to DB:', validatedData.email, validatedData.magnetId)
        } catch (dbError) {
            console.warn('DB save skipped:', dbError instanceof Error ? dbError.message : 'Unknown error')
        }

        // Envoyer notification email à l'admin
        try {
            if (process.env.RESEND_API_KEY) {
                const { Resend } = await import('resend')
                const resend = new Resend(process.env.RESEND_API_KEY)
                await resend.emails.send({
                    from: 'Litus <onboarding@resend.dev>',
                    to: ['litusagency@gmail.com'],
                    subject: `📥 Nouveau téléchargement : ${validatedData.magnetTitle}`,
                    html: `
                        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 24px; border-radius: 12px 12px 0 0;">
                                <h1 style="color: white; margin: 0; font-size: 20px;">📥 Nouveau lead magnet</h1>
                            </div>
                            <div style="background: #1f2937; padding: 24px; color: white;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; color: #9ca3af;">Nom</td>
                                        <td style="padding: 8px 0;">${validatedData.fullName}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #9ca3af;">Email</td>
                                        <td style="padding: 8px 0;"><a href="mailto:${validatedData.email}" style="color: #60a5fa;">${validatedData.email}</a></td>
                                    </tr>
                                    ${validatedData.company ? `<tr><td style="padding: 8px 0; color: #9ca3af;">Entreprise</td><td style="padding: 8px 0;">${validatedData.company}</td></tr>` : ''}
                                    ${validatedData.phone ? `<tr><td style="padding: 8px 0; color: #9ca3af;">Téléphone</td><td style="padding: 8px 0;">${validatedData.phone}</td></tr>` : ''}
                                    <tr>
                                        <td style="padding: 8px 0; color: #9ca3af;">Document</td>
                                        <td style="padding: 8px 0;"><span style="background: #f97316; padding: 4px 12px; border-radius: 20px; font-size: 12px;">${validatedData.magnetTitle}</span></td>
                                    </tr>
                                </table>
                                <div style="margin-top: 24px;">
                                    <a href="https://litus-five.vercel.app/admin/leads" style="display: inline-block; background: #f97316; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                                        Voir dans le CRM →
                                    </a>
                                </div>
                            </div>
                            <div style="background: #111827; padding: 16px; border-radius: 0 0 12px 12px; text-align: center; color: #6b7280; font-size: 12px;">
                                Ce prospect a téléchargé un document. Contactez-le sous 24h.
                            </div>
                        </div>
                    `,
                })
            }
        } catch (emailError) {
            console.warn('Email notification failed:', emailError)
        }

        const downloadUrl = DOWNLOAD_URLS[validatedData.magnetId] || `/lead-magnets/${validatedData.magnetId}.pdf`

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
