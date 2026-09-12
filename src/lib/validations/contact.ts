import { z } from 'zod'

/**
 * Schema Zod pour validation formulaire contact
 */
export const contactFormSchema = z.object({
    nom: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères').max(100, '100 caractères maximum').regex(/^[^\r\n\x00-\x1f\x7f]+$/, 'Nom invalide'),
    email: z.string().trim().max(254, 'Email trop long').email('Email invalide'),
    telephone: z
        .string()
        .trim().min(1, 'Le téléphone est obligatoire').max(30, 'Téléphone trop long')
        .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Téléphone invalide'),
    entreprise: z.string().trim().max(200, '200 caractères maximum').regex(/^[^\r\n\x00-\x1f\x7f]*$/, 'Entreprise invalide').optional(),
    service: z.enum([
        'sites-vitrine',
        'seo-local',
        'google-ads',
        'e-commerce',
        'audit',
        'refonte',
        'maintenance',
        'outils-ia',
        'applications-web',
        'automatisation',
        'landing-page',
        'seo',
        'google-business-profile',
        'developpement-web',
        'integrations-api',
        'autre',
    ], { error: 'Choisissez le service qui vous intéresse' }),
    budget: z.enum(['moins-1000', '1000-3000', '3000-10000', '10000-30000', 'plus-30000', 'ne-sais-pas'], { error: 'Choisissez une fourchette de budget' }),
    message: z.string().trim().min(10, 'Le message doit contenir au moins 10 caractères').max(5000, '5 000 caractères maximum').regex(/^[^\x00-\x08\x0b\x0c\x0e-\x1f\x7f]*$/, 'Message invalide'),
    rgpd: z.boolean().refine((val) => val === true, {
        message: 'Vous devez accepter la politique de confidentialité',
    }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Keep the detailed forms' required fields unchanged. The contact page only
// collects name, email, phone and project, plus explicit privacy acceptance.
export const compactContactFormSchema = contactFormSchema.omit({
    entreprise: true,
    service: true,
    budget: true,
})
export type CompactContactFormData = z.infer<typeof compactContactFormSchema>

// The shared endpoint accepts both forms without fabricating missing answers.
// Optional values still receive their original validation when supplied.
export const contactSubmissionSchema = contactFormSchema.partial({
    telephone: true,
    entreprise: true,
    service: true,
    budget: true,
})
export type ContactSubmissionData = z.infer<typeof contactSubmissionSchema>
