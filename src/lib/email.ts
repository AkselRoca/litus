import { Resend } from 'resend'
import { prisma } from './database_final'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

interface ContactEmailData {
    nom: string
    email: string
    telephone?: string
    entreprise?: string
    service: string
    budget: string
    message: string
}

// Envoyer notification à l'équipe
export async function sendContactNotification(data: ContactEmailData) {
    if (!resend) {
        console.log('Resend not configured, skipping email')
        return { success: false, error: 'Resend not configured' }
    }

    const serviceLabels: Record<string, string> = {
        'sites-vitrine': 'Site Vitrine',
        'seo-local': 'SEO Local',
        'google-ads': 'Google Ads',
        'e-commerce': 'E-commerce',
        'autre': 'Autre demande',
    }

    const budgetLabels: Record<string, string> = {
        'moins-1000': 'Moins de 1 000€',
        '1000-3000': '1 000€ - 3 000€',
        '3000-5000': '3 000€ - 5 000€',
        'plus-5000': 'Plus de 5 000€',
        'ne-sais-pas': 'Je ne sais pas encore',
    }

    try {
        const notifiableUsers = await prisma.user.findMany({
            where: { emailNotifications: true },
            select: { email: true }
        })
        
        const toList = notifiableUsers.map(user => user.email)
        
        if (toList.length === 0) {
            console.log('No admin users configured for notifications, skipping email')
            return { success: true, message: 'No recipients configured' }
        }

        const result = await resend.emails.send({
            from: 'Litus <onboarding@resend.dev>',
            to: toList,
            subject: `🔔 Nouveau lead : ${data.nom} - ${serviceLabels[data.service] || data.service}`,
            html: `
                <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 24px; border-radius: 12px 12px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Nouveau lead !</h1>
                    </div>
                    
                    <div style="background: #1f2937; padding: 24px; color: white;">
                        <h2 style="margin: 0 0 16px; color: #f97316;">${data.nom}</h2>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #9ca3af;">Email</td>
                                <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #60a5fa;">${data.email}</a></td>
                            </tr>
                            ${data.telephone ? `
                            <tr>
                                <td style="padding: 8px 0; color: #9ca3af;">Téléphone</td>
                                <td style="padding: 8px 0;"><a href="tel:${data.telephone}" style="color: #60a5fa;">${data.telephone}</a></td>
                            </tr>
                            ` : ''}
                            ${data.entreprise ? `
                            <tr>
                                <td style="padding: 8px 0; color: #9ca3af;">Entreprise</td>
                                <td style="padding: 8px 0;">${data.entreprise}</td>
                            </tr>
                            ` : ''}
                            <tr>
                                <td style="padding: 8px 0; color: #9ca3af;">Service</td>
                                <td style="padding: 8px 0;"><span style="background: #f97316; padding: 4px 12px; border-radius: 20px; font-size: 12px;">${serviceLabels[data.service] || data.service}</span></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #9ca3af;">Budget</td>
                                <td style="padding: 8px 0;">${budgetLabels[data.budget] || data.budget}</td>
                            </tr>
                        </table>
                        
                        <div style="margin-top: 24px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                            <div style="color: #9ca3af; font-size: 12px; margin-bottom: 8px;">Message</div>
                            <div style="white-space: pre-wrap;">${data.message}</div>
                        </div>
                        
                        <div style="margin-top: 24px;">
                            <a href="https://litus-five.vercel.app/admin/leads" style="display: inline-block; background: #f97316; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                                Voir dans le CRM →
                            </a>
                        </div>
                    </div>
                    
                    <div style="background: #111827; padding: 16px; border-radius: 0 0 12px 12px; text-align: center; color: #6b7280; font-size: 12px;">
                        Litus - Agence Web
                    </div>
                </div>
            `,
        })

        console.log('Email sent:', result)
        return { success: true, data: result }

    } catch (error) {
        console.error('Email error:', error)
        return { success: false, error: String(error) }
    }
}

// Envoyer confirmation au prospect
export async function sendContactConfirmation(data: ContactEmailData) {
    if (!resend) return { success: false, error: 'Resend not configured' }

    try {
        const result = await resend.emails.send({
            from: 'Litus <onboarding@resend.dev>',
            to: [data.email],
            subject: `Merci pour votre demande, ${data.nom.split(' ')[0]} !`,
            html: `
                <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">Merci ${data.nom.split(' ')[0]} ! 🙏</h1>
                    </div>
                    
                    <div style="background: #1f2937; padding: 32px; color: white;">
                        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
                            Nous avons bien reçu votre demande et nous vous recontactons <strong>sous 2 heures ouvrées</strong>.
                        </p>
                        
                        <p style="font-size: 14px; color: #9ca3af; line-height: 1.6; margin: 0;">
                            En attendant, vous pouvez nous joindre directement au <a href="tel:+33789603321" style="color: #f97316;">07 89 60 33 21</a>.
                        </p>
                    </div>
                    
                    <div style="background: #111827; padding: 16px; border-radius: 0 0 12px 12px; text-align: center; color: #6b7280; font-size: 12px;">
                        Litus - Agence Web | <a href="https://litus.fr" style="color: #f97316;">litus.fr</a>
                    </div>
                </div>
            `,
        })

        return { success: true, data: result }

    } catch (error) {
        console.error('Confirmation email error:', error)
        return { success: false, error: String(error) }
    }
}
