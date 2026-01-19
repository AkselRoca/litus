import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { PublicLayoutWrapper } from '@/components/layout/PublicLayoutWrapper'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

// Fonts (Inter + Cal Sans + Borel locaux à ajouter)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// TODO: Ajouter Cal Sans et Borel depuis /public/fonts
// const calSans = localFont({
//   src: '../../public/fonts/CalSans-SemiBold.woff2',
//   variable: '--font-heading',
//   display: 'swap',
// })

export const metadata: Metadata = {
  title: {
    default: 'Litus - Agence Web Lorient & Le Mans | Sites, SEO, Google Ads',
    template: '%s | Litus',
  },
  description:
    'Agence web locale spécialisée en création de sites, SEO et applications sur-mesure. Proximité, transparence et résultats pour artisans, PME et collectivités.',
  keywords: [
    'agence web',
    'Lorient',
    'Le Mans',
    'création site internet',
    'SEO',
    'Google Ads',
    'référencement',
  ],
  authors: [{ name: 'Litus' }],
  creator: 'Litus',
  metadataBase: new URL('https://litus.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://litus.fr',
    title: 'Litus - Agence Web Lorient & Le Mans',
    description:
      'Agence web locale spécialisée en création de sites, SEO et applications sur-mesure.',
    siteName: 'Litus',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Litus - Agence Web Lorient & Le Mans',
    description:
      'Agence web locale spécialisée en création de sites, SEO et applications sur-mesure.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen-dynamic flex flex-col">
        <ThemeProvider>
          <LenisProvider>
            <PublicLayoutWrapper>
              {children}
            </PublicLayoutWrapper>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

