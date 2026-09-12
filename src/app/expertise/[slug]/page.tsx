import { notFound } from 'next/navigation'
import { ExpertiseArticle } from '@/components/expertise/ExpertiseArticle'
import { expertisePages, getExpertisePage } from '@/lib/expertise/content'
import { expertiseMetadata } from '@/lib/expertise/seo'
import { expertisePath } from '@/lib/expertise/catalog'

export const dynamicParams = false
export function generateStaticParams() {
  return expertisePages.map(page => ({ slug: page.slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const page = getExpertisePage((await params).slug)
  if (!page) notFound()
  return expertiseMetadata(page.title, page.description, expertisePath(page.slug))
}
export default async function ExpertisePage({ params }: { params: Promise<{ slug: string }> }) {
  const page = getExpertisePage((await params).slug)
  if (!page) notFound()
  return <ExpertiseArticle page={page} />
}
