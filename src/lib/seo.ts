import type { Metadata } from 'next'

const siteConfig = {
    name: 'Litus',
    description: 'Agence web à Lorient & Le Mans. Sites web performants, SEO local et Google Ads pour les PME et artisans qui veulent dominer leur zone de chalandise.',
    url: 'https://litus.fr',
    ogImage: '/og-image.jpg',
    author: 'Litus',
    phone: '+33 2 97 00 00 00',
    email: 'contact@litus.fr',
    address: {
        lorient: {
            street: 'Lorient, Morbihan',
            city: 'Lorient',
            region: 'Bretagne',
            postalCode: '56100',
            country: 'France',
        },
        leMans: {
            street: 'Le Mans, Sarthe',
            city: 'Le Mans',
            region: 'Pays de la Loire',
            postalCode: '72000',
            country: 'France',
        },
    },
}

export function createMetadata({
    title,
    description,
    path = '',
    image,
    noIndex = false,
}: {
    title: string
    description: string
    path?: string
    image?: string
    noIndex?: boolean
}): Metadata {
    const url = `${siteConfig.url}${path}`
    const ogImage = image || siteConfig.ogImage

    return {
        title: title.includes('Litus') ? title : `${title} | Litus`,
        description,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'fr_FR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
    }
}

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: siteConfig.phone,
            contactType: 'customer service',
            availableLanguage: 'French',
        },
        sameAs: [
            'https://www.linkedin.com/company/litus-agence',
            'https://www.facebook.com/litusagence',
        ],
    }
}

export function generateLocalBusinessSchema(location: 'lorient' | 'leMans') {
    const address = siteConfig.address[location]

    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${siteConfig.url}/#${location}`,
        name: `${siteConfig.name} - ${address.city}`,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: address.street,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.country,
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: location === 'lorient' ? 47.7486 : 47.9941,
            longitude: location === 'lorient' ? -3.3669 : 0.1963,
        },
        areaServed: [
            {
                '@type': 'City',
                name: address.city,
            },
            {
                '@type': 'AdministrativeArea',
                name: address.region,
            },
        ],
        priceRange: '€€',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '87',
        },
    }
}

export function generateServiceSchema(service: {
    name: string
    description: string
    url: string
    price?: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: `${siteConfig.url}${service.url}`,
        provider: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
        },
        areaServed: ['Lorient', 'Le Mans', 'Bretagne', 'Pays de la Loire'],
        ...(service.price && {
            offers: {
                '@type': 'Offer',
                price: service.price,
                priceCurrency: 'EUR',
            },
        }),
    }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${siteConfig.url}${item.url}`,
        })),
    }
}

export function generateArticleSchema(article: {
    title: string
    description: string
    url: string
    image?: string
    datePublished: string
    dateModified?: string
    author?: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        url: `${siteConfig.url}${article.url}`,
        image: article.image || siteConfig.ogImage,
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        author: {
            '@type': 'Person',
            name: article.author || 'Équipe Litus',
        },
        publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
            logo: `${siteConfig.url}/logo.png`,
        },
    }
}

export { siteConfig }
