import { pageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import { AboutContent } from './_components/AboutContent'
import './about.css'

export const metadata: Metadata = pageMetadata("/a-propos", {
  title: 'À Propos de Litus | Agence Web Lorient & Le Mans',
  description: 'Arthur et Aksel : deux expertises complémentaires pour des sites web sur mesure, votre référencement naturel et votre e-commerce. Découvrez l’agence Litus.',
})

export default function AboutPage() {
  return <AboutContent />
}
