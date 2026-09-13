'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { GoogleReviews } from '@/components/sections/GoogleReviews'
import dynamic from 'next/dynamic'
const LeadMagnetSlideIn = dynamic(() => import('@/components/lead-magnets').then(module => module.LeadMagnetSlideIn), { ssr: false })

interface PublicLayoutWrapperProps {
    children: React.ReactNode
}

export function PublicLayoutWrapper({ children }: PublicLayoutWrapperProps) {
    const pathname = usePathname()
    const isAdminPage = pathname?.startsWith('/admin')
    const isLoginPage = pathname?.startsWith('/login')

    if (isAdminPage || isLoginPage) {
        return <>{children}</>
    }

    // Choisir le lead magnet en fonction de la page (seulement sur certaines pages)
    const getMagnetId = (): 'cahier-des-charges' | 'audit-productivite' | null => {
        if (pathname?.includes('tarifs') || pathname?.includes('creation-site') || pathname?.includes('sites-vitrine') || pathname?.includes('e-commerce')) {
            return 'cahier-des-charges'
        }
        if (pathname?.includes('application') || pathname?.includes('automatisation')) {
            return 'audit-productivite'
        }
        return null // Pas de slide-in par défaut
    }

    const magnetId = getMagnetId()
    const hasDedicatedContactJourney = ['/contact', '/creation-site-ecommerce', '/creation-landing-page', '/refonte-site-internet', '/referencement-naturel', '/google-business-profile', '/developpement-web-sur-mesure', '/integrations-api', '/automatisation', '/creation-application-web', '/creation-outils-ia', '/google-ads', '/artisan', '/agence-web-lorient', '/blog'].includes(pathname) || pathname?.startsWith('/blog/') || pathname?.startsWith('/artisan/')

    return (
        <>
            <Header />
            <main id="main" className="flex-1">
                {children}
            </main>
            <div data-public-page-extras><GoogleReviews /></div>
            <div data-public-page-extras><Footer /></div>
            <CookieBanner />
            {pathname !== '/' && !hasDedicatedContactJourney && magnetId && (
                <LeadMagnetSlideIn magnetId={magnetId} scrollTriggerPercent={65} delayMs={45000} />
            )}
        </>
    )
}
