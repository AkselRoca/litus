import { z } from 'zod'

/**
 * Schema Zod pour validation formulaire contact
 */
export const contactFormSchema = z.object({
    nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    telephone: z
        .string()
        .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Téléphone invalide')
        .optional()
        .or(z.literal('')),
    entreprise: z.string().optional(),
    service: z.enum([
        'sites-vitrine',
        'seo-local',
        'google-ads',
        'e-commerce',
        'audit',
        'autre',
    ]),
    budget: z.enum(['moins-1000', '1000-3000', '3000-5000', 'plus-5000', 'ne-sais-pas']),
    message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
    rgpd: z.boolean().refine((val) => val === true, {
        message: 'Vous devez accepter la politique de confidentialité',
    }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
