import type { Metadata } from 'next'
import { GoogleAdsHero } from './_components/GoogleAdsHero'
import { GoogleAdsContent } from './_components/GoogleAdsContent'
import './google-ads.css'

export const metadata: Metadata = {
  title: { absolute: 'Agence Google Ads à Lorient et au Mans | Litus Agency' },
  description: 'Confiez vos campagnes Google Ads à Litus Agency, à Lorient et au Mans. Ciblage local, suivi des contacts et optimisation. Parlons de vos objectifs.',
  alternates: { canonical: '/google-ads' },
  openGraph: {
    title: 'Agence Google Ads à Lorient et au Mans | Litus Agency',
    description: 'Ciblage local, suivi des contacts et optimisation : parlons des objectifs de vos campagnes Google Ads.',
    url: '/google-ads',
  },
}

export default function GoogleAdsPage() {
  return <div className="gad-page">
    <GoogleAdsHero />
    <GoogleAdsContent />
  </div>
}
