import { pageMetadata } from '@/lib/seo/metadata'
import { HeroSection } from '@/components/sections/HeroSection'
import { LogoCloud } from '@/components/sections/LogoCloud'
import { ServicesSection } from '@/components/sections/home/ServicesSection'
import { BentoFeatures } from '@/components/sections/BentoFeatures'
import { EstimatorSection } from '@/components/sections/EstimatorSection'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { StatsSection } from '@/components/sections/StatsSection'
import { MassiveCTA } from '@/components/sections/MassiveCTA'
import './home-reference.css'

export const metadata = pageMetadata('/', {})

export default function HomePage() {
    return (
        <div className="litus-editorial">
            <HeroSection />
            <LogoCloud />
            <ServicesSection />
            <BentoFeatures />
            <EstimatorSection />
            <ProcessTimeline />
            <StatsSection />
            <MassiveCTA />
        </div>
    )
}
