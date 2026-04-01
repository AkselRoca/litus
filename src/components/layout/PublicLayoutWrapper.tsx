'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { LeadMagnetSlideIn } from '@/components/lead-magnets'
import { LeadCapturePopup } from '@/components/ui/LeadCapturePopup'

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
    const getMagnetId = (): 'guide-prix' | 'audit-productivite' | null => {
        if (pathname?.includes('tarifs') || pathname?.includes('creation-site') || pathname?.includes('sites-vitrine') || pathname?.includes('e-commerce')) {
            return 'guide-prix'
        }
        if (pathname?.includes('application') || pathname?.includes('automatisation')) {
            return 'audit-productivite'
        }
        return null // Pas de slide-in par défaut
    }

    const magnetId = getMagnetId()

    return (
        <>
            <Header />
            <main id="main" className="flex-1">
                {children}
            </main>
            <Footer />
            <CookieBanner />
            {magnetId ? (
                <LeadMagnetSlideIn magnetId={magnetId} scrollTriggerPercent={65} delayMs={45000} />
            ) : (
                <LeadCapturePopup delayMs={45000} scrollTriggerPercent={65} />
            )}
        </>
    )
}
