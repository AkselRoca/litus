import type { Metadata } from 'next'
import BriefWizard from '@/components/brief/BriefWizard'
import './brief.css'

export const metadata: Metadata = {
  title: 'Générateur de cahier des charges gratuit | Site web & e-commerce | Litus',
  description: 'Préparez votre cahier des charges de site vitrine, boutique e-commerce, application ou automatisation. Un parcours personnalisé et un document complet par email.',
  alternates: { canonical: 'https://www.litus.fr/ressources/cahier-des-charges' },
  openGraph: { title: 'Votre cahier des charges, préparé avec Litus', description: 'Les bonnes questions pour cadrer votre projet digital. Gratuit et sans engagement.', url: 'https://www.litus.fr/ressources/cahier-des-charges', type: 'website' },
}
export default function BriefPage() {
  return <div className="brief-page"><BriefWizard /></div>
}
