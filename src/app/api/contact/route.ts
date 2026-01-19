import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactNotification, sendContactConfirmation } from '@/lib/email'

// Schéma aligné sur le formulaire front
const contactSchema = z.object({
    nom: z.string().min(2, 'Nom trop court'),
    email: z.string().email('Email invalide'),
    telephone: z.string().optional().or(z.literal('')),
    entreprise: z.string().optional(),
    service: z.enum(['sites-vitrine', 'seo-local', 'google-ads', 'e-commerce', 'autre']),
    budget: z.enum(['moins-1000', '1000-3000', '3000-5000', 'plus-5000', 'ne-sais-pas']),
    message: z.string().min(10, 'Message trop court'),
    rgpd: z.boolean().refine(val => val === true, 'Acceptation requise'),
})

export async function POST(request: NextRequest) {
    try {
        console.log('[API Contact] Starting request processing')
        
        const body = await request.json()
        console.log('[API Contact] Body parsed:', JSON.stringify(body, null, 2))
        
        const data = contactSchema.parse(body)
        console.log('[API Contact] Data validated successfully')

        // Sauvegarde en DB
        console.log('[API Contact] Importing Prisma...')
        const { prisma } = await import('@/lib/database_final')
        console.log('[API Contact] Prisma imported, creating lead...')

        await prisma.lead.create({
            data: {
                type: 'contact',
                email: data.email,
                phone: data.telephone || null,
                data: JSON.stringify({
                    nom: data.nom,
                    entreprise: data.entreprise,
                    service: data.service,
                    budget: data.budget,
                    message: data.message,
                }),
                source: 'Page Contact',
                treated: false,
            },
        })

        console.log('[API Contact] Lead saved successfully:', data.email)

        // Envoyer les emails (en async, ne bloque pas la réponse)
        sendContactNotification({
            nom: data.nom,
            email: data.email,
            telephone: data.telephone,
            entreprise: data.entreprise,
            service: data.service,
            budget: data.budget,
            message: data.message,
        }).catch(console.error)

        sendContactConfirmation({
            nom: data.nom,
            email: data.email,
            telephone: data.telephone,
            entreprise: data.entreprise,
            service: data.service,
            budget: data.budget,
            message: data.message,
        }).catch(console.error)

        return NextResponse.json(
            { success: true, message: 'Demande reçue. Nous vous recontactons sous 2h.' },
            { status: 201 }
        )
    } catch (error) {
        console.error('API contact error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.issues },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, error: 'Erreur serveur' },
            { status: 500 }
        )
    }
}
