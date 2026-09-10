import { z } from 'zod'

export const NEWSLETTER_CONSENT_TEXT = 'J’accepte de recevoir les conseils de Litus par email.'
export const NEWSLETTER_CONSENT_VERSION = 'blog-newsletter-v1'

export const newsletterSchema = z.object({
  email: z.string().trim().max(254, 'Indiquez une adresse email valide.').email('Indiquez une adresse email valide.').toLowerCase(),
  consent: z.boolean().refine(Boolean, 'Votre accord est nécessaire pour vous abonner.'),
}).strict()

export type NewsletterSubscription = z.infer<typeof newsletterSchema>
