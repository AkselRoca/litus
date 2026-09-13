import { ResourceGuide } from '@/components/lead-magnet/ResourceGuide'
import { pageMetadata } from '@/lib/seo/metadata'
import { HeroBackdrop } from '@/components/ui/HeroBackdrop'
import { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { LEAD_MAGNETS, LeadMagnetId, LeadMagnetInline } from '@/components/lead-magnets'

interface LeadMagnetPageProps {
    params: Promise<{
        magnet: string
    }>
}

async function resolvePageMetadata({ params }: LeadMagnetPageProps): Promise<Metadata> {
    const resolvedParams = await params
    const magnetId = resolvedParams.magnet as LeadMagnetId
    const magnet = LEAD_MAGNETS[magnetId]

    if (!magnet) {
        return { title: 'Ressource introuvable | Litus' }
    }

    return {
        title: `${magnet.title} - Ressource Gratuite | Litus`,
        description: magnet.description,
    }
}

// Générer les pages statiques pour tous nos lead magnets
export async function generateStaticParams() {
    return Object.keys(LEAD_MAGNETS).filter(id => id !== 'cahier-des-charges').map((magnetId) => ({
        magnet: magnetId,
    }))
}

export default async function LeadMagnetPage({ params }: LeadMagnetPageProps) {
    const resolvedParams = await params
    const magnetId = resolvedParams.magnet as LeadMagnetId
    const magnet = LEAD_MAGNETS[magnetId]

    if (!magnet) {
        notFound()
    }

    return (
        <div className="min-h-screen-dynamic pt-32 lg:pt-40 pb-20 bg-gray-50 dark:bg-[#050505]">
            <div className="container-fluid">
                <div className="litus-page-hero relative overflow-hidden max-w-4xl mx-auto text-center mb-8 p-8">
                    <HeroBackdrop />
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
                        Ressource Gratuite
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-balance leading-tight">
                        {magnet.title}
                    </h1>
                </div>

                <div className="max-w-xl mx-auto">
                    <LeadMagnetInline magnetId={magnetId} headingLevel={2} /><ResourceGuide magnetId={magnetId} />
                </div>
            </div>
        </div>
    )
}

export async function generateMetadata(props: Parameters<typeof resolvePageMetadata>[0]) {
  const params = await props.params
  return pageMetadata("/ressources/" + params.magnet, await resolvePageMetadata(props))
}
