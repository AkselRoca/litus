import type { Metadata } from 'next'

type ServiceSeo = { path: string; title: string; description: string; name: string; image: string }
export type ServiceQuestion = { question: string; answer: string }

export function serviceMetadata({ path, title, description, name, image }: ServiceSeo): Metadata {
  return {
    title: { absolute: title }, description, alternates: { canonical: path },
    openGraph: { title, description, url: `https://litus.fr${path}`, type: 'website', siteName: 'Litus', locale: 'fr_FR', images: [{ url: image, width: 1400, height: 933, alt: name }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export function ServicePageSeo({ path, name, description, questions }: { path: string; name: string; description: string; questions: readonly ServiceQuestion[] }) {
  const url = `https://litus.fr${path}`
  const data = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', '@id': `${url}#service`, url, name, description, provider: { '@type': 'Organization', name: 'Litus', url: 'https://litus.fr' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://litus.fr' }, { '@type': 'ListItem', position: 2, name, item: url }] },
    { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: questions.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ] }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
