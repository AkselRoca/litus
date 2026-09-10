import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './editorial.css'
import { PublicLayoutWrapper } from '@/components/layout/PublicLayoutWrapper'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// Inter est utilisée pour le corps de texte et tous les titres publics.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

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
    images: [
      {
        url: '/litus-og-social.png',
        width: 1200,
        height: 630,
        alt: 'Litus — Votre agence web pour développer votre activité.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Litus - Agence Web Lorient & Le Mans',
    description:
      'Agence web locale spécialisée en création de sites, SEO et applications sur-mesure.',
    images: ['/litus-og-social.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
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
    <html lang="fr" className={`${inter.variable} light`} suppressHydrationWarning>
      <body className="min-h-screen-dynamic flex flex-col">
        <ThemeProvider>
          <LenisProvider>
            <AnalyticsProvider>
              <PublicLayoutWrapper>
                {children}
              </PublicLayoutWrapper>
            </AnalyticsProvider>
          </LenisProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
