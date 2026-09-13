/**
 * Schema.org structured data generators for SEO
 */

interface LocalBusinessSchema {
    name: string
    description: string
    url: string
    telephone: string
    address: {
        streetAddress: string
        addressLocality: string
        postalCode: string
        addressCountry: string
    }
    geo?: {
        latitude: number
        longitude: number
    }
    areaServed?: string[]
    priceRange?: string
}

interface ServiceSchema {
    name: string
    description: string
    provider: string
    areaServed: string[]
    offers?: {
        price: string
        priceCurrency: string
    }
}

export function generateLocalBusinessSchema(data: LocalBusinessSchema) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': data.url,
        name: data.name,
        description: data.description,
        url: data.url,
        telephone: data.telephone,
        priceRange: data.priceRange || '€€',
        address: {
            '@type': 'PostalAddress',
            streetAddress: data.address.streetAddress,
            addressLocality: data.address.addressLocality,
            postalCode: data.address.postalCode,
            addressCountry: data.address.addressCountry,
        },
        ...(data.geo && {
            geo: {
                '@type': 'GeoCoordinates',
                latitude: data.geo.latitude,
                longitude: data.geo.longitude,
            },
        }),
        ...(data.areaServed && {
            areaServed: data.areaServed.map((area) => ({
                '@type': 'City',
                name: area,
            })),
        }),
    }
}

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Litus',
        url: 'https://www.litus.fr',
        logo: 'https://www.litus.fr/logo.png',
        description:
            'Agence web locale spécialisée en création de sites, SEO local et Google Ads pour PME et artisans à Lorient et Le Mans.',
        telephone: '+33744985521',
        email: 'litusagency@gmail.com',
        address: [
            {
                '@type': 'PostalAddress',
                addressLocality: 'Lorient',
                postalCode: '56100',
                addressCountry: 'FR',
            },
            {
                '@type': 'PostalAddress',
                addressLocality: 'Le Mans',
                postalCode: '72000',
                addressCountry: 'FR',
            },
        ],
        sameAs: [
            'https://www.linkedin.com/company/litus',
            'https://twitter.com/litus',
        ],
        areaServed: [
            {
                '@type': 'City',
                name: 'Lorient',
            },
            {
                '@type': 'City',
                name: 'Le Mans',
            },
        ],
    }
}

export function generateServiceSchema(data: ServiceSchema) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data.name,
        description: data.description,
        provider: {
            '@type': 'Organization',
            name: data.provider,
        },
        areaServed: data.areaServed.map((area) => ({
            '@type': 'City',
            name: area,
        })),
        ...(data.offers && {
            offers: {
                '@type': 'Offer',
                price: data.offers.price,
                priceCurrency: data.offers.priceCurrency,
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
            item: item.url,
        })),
    }
}

export function generateWebPageSchema(data: {
    title: string
    description: string
    url: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.title,
        description: data.description,
        url: data.url,
        publisher: {
            '@type': 'Organization',
            name: 'Litus',
        },
    }
}

/**
 * Component to inject JSON-LD structured data
 */
export function StructuredData({ data }: { data: Record<string, any> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}
