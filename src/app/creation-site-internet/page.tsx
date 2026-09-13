import { pageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import { SitesVitrineHero } from './_components/SitesVitrineHero'
import { VitrineContent } from './_components/VitrineContent'
import { ExpertiseServiceLinks } from '@/components/expertise/ExpertiseServiceLinks'

export const metadata: Metadata = pageMetadata("/creation-site-internet", {
  title: 'Création de Sites Internet à Lorient, Vannes & Le Mans',
  description:
    'Agence web locale. Création de sites vitrine performants et design pour artisans, PME et professions libérales. Devis gratuit sous 24h.',
})

export default function SitesVitrinePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] overflow-hidden selection:bg-orange-500/30">
      <SitesVitrineHero />
      <VitrineContent />
      <ExpertiseServiceLinks tools={['wordpress', 'framer']} title="Le bon environnement pour faire vivre votre site." description="WordPress ou Framer : nous comparons votre autonomie éditoriale, les formulaires et les intégrations avant de retenir une plateforme." />
    </div>
  )
}
