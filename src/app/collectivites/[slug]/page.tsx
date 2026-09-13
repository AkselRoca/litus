import { pageMetadata } from '@/lib/seo/metadata'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { civicPages } from '@/lib/collectivites/content'
import { civicMetadata, civicSchema } from '@/lib/collectivites/seo'
import photos from '@/lib/collectivites/photos.json'
import { CivicButton, CivicCards, CivicFaqs, CivicFinal, CivicHeading, CivicPhoto, CivicSections, CivicTextLink } from '../_components/CivicShared'

export const dynamicParams = false
export function generateStaticParams() { return civicPages.map(page => ({ slug: page.slug })) }
type Props = { params: Promise<{ slug: string }> }
async function resolvePageMetadata({ params }: Props) {
  const { slug } = await params
  const page = civicPages.find(item => item.slug === slug)
  if (!page) notFound()
  return civicMetadata(page.title, page.description, `/collectivites/${slug}`, photos[page.photo].src, photos[page.photo].alt)
}
export default async function CivicDetailPage({ params }: Props) {
  const { slug } = await params
  const page = civicPages.find(item => item.slug === slug)
  if (!page) notFound()
  const split = page.heading.indexOf(page.accent)
  return <div className="civic-page civic-detail">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(civicSchema(page.title, page.description, `/collectivites/${slug}`, page.faq, photos[page.photo].src)).replace(/</g, '\\u003c') }} />
    <div className="civic-container">
      <nav aria-label="Fil d’Ariane" className="civic-breadcrumb"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><Link href="/collectivites">Collectivités</Link><span aria-hidden="true">/</span><span aria-current="page">{page.short}</span></nav>
      <header className="civic-detail-hero"><div><p className="civic-eyebrow">Collectivités & acteurs publics · {page.short}</p><h1>{page.heading.slice(0, split)}<em>{page.accent}</em></h1><p className="civic-lead">{page.intro}</p><div className="civic-hero-actions"><CivicButton>Parlons de votre projet</CivicButton><a href="#reperes" className="civic-text-link">Découvrir notre approche</a></div><p className="civic-promise"><Check size={18} aria-hidden="true" />{page.promise}</p></div><CivicPhoto name={page.photo} priority /></header>
      <nav id="reperes" aria-label="Dans cette page" className="civic-jumpnav">{page.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.label}</a>)}<a href="#questions">Questions fréquentes</a></nav>
      <CivicSections sections={page.sections} />
      <section className="civic-section civic-deliverables"><CivicHeading label="Un périmètre lisible" title="Ce que nous cadrons ensemble." /><ul>{page.deliverables.map(item => <li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}</ul><p>Livrables, responsabilités et options sont précisés dans votre proposition. Aucun raccordement, audit ou engagement de maintenance n’est implicite.</p></section>
      <CivicFaqs items={page.faq} />
      <section className="civic-section"><CivicHeading label="Des sujets qui se répondent" title="Un projet cohérent, de bout en bout." /><div className="civic-related-links">{page.links.map(link => <CivicTextLink key={link.href} link={link} />)}</div><CivicCards exclude={slug} /></section>
      <CivicFinal />
    </div>
  </div>
}

export async function generateMetadata(props: Parameters<typeof resolvePageMetadata>[0]) {
  const params = await props.params
  return pageMetadata("/collectivites/" + params.slug, await resolvePageMetadata(props))
}
