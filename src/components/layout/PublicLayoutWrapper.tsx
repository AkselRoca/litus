'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { LeadCapturePopup } from '@/components/ui/LeadCapturePopup'

interface PublicLayoutWrapperProps {
    children: React.ReactNode
}

export function PublicLayoutWrapper({ children }: PublicLayoutWrapperProps) {
    const pathname = usePathname()
    const isAdminPage = pathname?.startsWith('/admin')

    if (isAdminPage) {
        // Pour les pages admin, on retourne juste le contenu sans header/footer/popup
        return <>{children}</>
    }

    // Pour les pages publiques, on affiche tout
    return (
        <>
            <Header />
            <main id="main" className="flex-1">
                {children}
            </main>
            <Footer />
            <CookieBanner />
            <LeadCapturePopup />
        </>
    )
}
