import { pageMetadata } from '@/lib/seo/metadata'
import { notFound } from 'next/navigation'
import { ExpertiseArticle } from '@/components/expertise/ExpertiseArticle'
import { expertisePages, getExpertisePage } from '@/lib/expertise/content'
import { expertiseMetadata } from '@/lib/expertise/seo'
import { expertisePath } from '@/lib/expertise/catalog'

export const dynamicParams = false
export function generateStaticParams() {
  return expertisePages.map(page => ({ slug: page.slug }))
}
async function resolvePageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const page = getExpertisePage((await params).slug)
  if (!page) notFound()
  const metadata = expertiseMetadata(page.title, page.description, expertisePath(page.slug))
  const image = { url: `https://www.litus.fr/expertise/images/${page.slug}-litus-og.png`, width: 1200, height: 630, alt: `${page.slug === 'nextjs' ? 'Next.js' : page.slug} : expertise technologique Litus` }
  return { ...metadata, openGraph: { ...metadata.openGraph, images: [image] }, twitter: { ...metadata.twitter, images: [image.url] } }
}
export default async function ExpertisePage({ params }: { params: Promise<{ slug: string }> }) {
  const page = getExpertisePage((await params).slug)
  if (!page) notFound()
  return <ExpertiseArticle page={page} />
}

export async function generateMetadata(props: Parameters<typeof resolvePageMetadata>[0]) {
  const params = await props.params
  return pageMetadata("/expertise/" + params.slug, await resolvePageMetadata(props))
}
