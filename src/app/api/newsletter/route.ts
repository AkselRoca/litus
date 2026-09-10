import { createHash } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database_final'
import { NEWSLETTER_CONSENT_TEXT, NEWSLETTER_CONSENT_VERSION, newsletterSchema } from '@/lib/validations/newsletter'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'La demande est invalide.' }, { status: 400 })
  }

  const validation = newsletterSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json({
      success: false,
      message: 'Vérifiez votre adresse email et votre accord pour vous abonner.',
      errors: validation.error.flatten().fieldErrors,
    }, { status: 400 })
  }

  try {
    const { email } = validation.data
    // The existing CRM is the subscriber register. A deterministic primary key
    // makes repeated/concurrent requests idempotent without a schema migration.
    const id = `newsletter_${createHash('sha256').update(email).digest('hex')}`
    const consentedAt = new Date().toISOString()

    try {
      await prisma.lead.upsert({
        where: { id },
        create: {
          id,
          type: 'newsletter',
          email,
          source: 'Blog — newsletter',
          data: JSON.stringify({
            subscriptionStatus: 'subscribed',
            consent: true,
            consentedAt,
            consentText: NEWSLETTER_CONSENT_TEXT,
            consentVersion: NEWSLETTER_CONSENT_VERSION,
            privacyPolicy: '/politique-confidentialite',
            message: `Abonnement aux conseils Litus. Accord donné le ${consentedAt}.`,
          }),
        },
        // Preserve the original consent date and any existing CRM notes.
        update: {},
      })
    } catch (error) {
      // Some Prisma adapters emulate upsert. If concurrent creates race, only
      // acknowledge success after confirming that the subscription was saved.
      if (!(error && typeof error === 'object' && 'code' in error && error.code === 'P2002')) throw error
      const saved = await prisma.lead.findUnique({ where: { id }, select: { type: true, email: true } })
      if (saved?.type !== 'newsletter' || saved.email !== email) throw error
    }

    // Registration does not trigger an email or claim a mailing campaign ran.
    return NextResponse.json({ success: true, message: 'Votre inscription est bien enregistrée.' })
  } catch {
    console.error('[Newsletter] Subscription could not be saved.')
    return NextResponse.json({
      success: false,
      message: 'Votre inscription n’a pas pu être enregistrée. Réessayez dans un instant.',
    }, { status: 503 })
  }
}
