'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { LeadMagnetSlideIn } from '@/components/lead-magnets'

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

    // Choisir le lead magnet en fonction de la page
    const getMagnetId = () => {
        if (pathname?.includes('tarifs') || pathname?.includes('creation-site') || pathname?.includes('sites-vitrine') || pathname?.includes('e-commerce')) {
            return 'guide-prix' as const
        }
        if (pathname?.includes('application') || pathname?.includes('automatisation')) {
            return 'audit-productivite' as const
        }
        return 'checklist-gmb' as const
    }

    return (
        <>
            <Header />
            <main id="main" className="flex-1">
                {children}
            </main>
            <Footer />
            <CookieBanner />
            <LeadMagnetSlideIn magnetId={getMagnetId()} scrollTriggerPercent={65} delayMs={45000} />
        </>
    )
}

