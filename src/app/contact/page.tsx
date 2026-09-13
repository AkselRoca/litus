import { pageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import { ContactHero } from './_components/ContactHero'
import { contactConfiguration } from '@/lib/contact/config'
import './contact.css'

export const metadata: Metadata = pageMetadata("/contact", {
    title: 'Contact - Litus',
    description: 'Parlons de votre projet web. Contactez Litus à Lorient et au Mans : sites web, e-commerce et visibilité locale. Réponse sous 24 h ouvrées.',
})

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ objet?: string | string[] }> }) {
    const query = await searchParams
    const rawSubject = Array.isArray(query.objet) ? query.objet[0] : query.objet
    const subject = rawSubject?.replace(/[\r\n]+/g, ' ').trim().slice(0, 200) || ''
    return <ContactHero subject={subject} available={Boolean(contactConfiguration().config)} />
}
