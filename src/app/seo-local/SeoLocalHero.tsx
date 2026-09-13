import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Search, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { ServiceHero } from '@/components/sections/services/ServiceHero'
export function SeoLocalHero() {
  return <ServiceHero id="seo-hero" eyebrow="Référencement local · Lorient & Le Mans" title="SEO local : vos prochains clients sont près de vous." accent="près de vous."
    description="Artisans, commerces et entreprises de services : faites le lien entre votre savoir-faire et les recherches de vos clients à Lorient, au Mans et dans votre zone d’intervention. Sur Google, sur Maps, et jusqu’à la demande de devis."
    primaryAction={{ label: 'Demander mon audit local', href: '/contact?objet=Audit%20SEO%20local' }} secondaryAction={{ label: 'Voir les projets clients', href: '#realisations-locales' }}
    proof={<div className="service-hero-assurances"><span><MapPin aria-hidden="true" />Lorient & Le Mans</span><span><ShieldCheck aria-hidden="true" />Des actions et un suivi concrets</span></div>}
    visual={<div className="local-hero-collage"><figure className="local-hero-photo"><Image src="/realisations/clients/west-clotures-paysage/paysage.webp" width={1440} height={805} sizes="(max-width: 850px) 90vw, 46vw" priority alt="Terrasse en bois éclairée et jardin paysager présentés sur le site West Clôtures & Paysage" /><figcaption><span>Du savoir-faire sur le terrain.</span><Link href="/realisations/west-clotures-paysage">West Clôtures & Paysage <ArrowUpRight size={15} aria-hidden="true" /></Link></figcaption></figure><div className="local-search-note"><Search size={21} aria-hidden="true" /><div><strong>« paysagiste autour de moi »</strong><span>Une recherche. Un besoin. Un futur projet.</span></div></div><figure className="local-hero-inset"><Image src="/blog/photos/le-mans-cathedrale.webp" width={1400} height={928} sizes="(max-width: 850px) 30vw, 16vw" alt="Chevet de la cathédrale Saint-Julien du Mans depuis la place des Jacobins" /><figcaption>Le Mans · Sarthe <Link href="/territories/credits.html" aria-label="Crédits de la photographie du Mans">©</Link></figcaption></figure></div>} />
}
