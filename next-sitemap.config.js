/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://litus.fr',
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    exclude: [
        '/admin',
        '/admin/*',
        '/login-admin',
        '/api/*',
        '/blog/*',
        '/blog-sitemap.xml',
        '/ressources/confirmation',
        '/creation-outils-ia/opengraph-image',
        '/creation-application-web/opengraph-image',
        '/creation-landing-page/opengraph-image',
        '/refonte-site-internet/opengraph-image',
    ],
    robotsTxtOptions: {
        additionalSitemaps: ['https://litus.fr/blog-sitemap.xml'],
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/login-admin', '/api'],
            },
        ],
    },
    additionalPaths: async (config) => Promise.all(
        ['/blog', '/expertise', ...['nextjs', 'react', 'typescript', 'tailwind', 'framer', 'vercel', 'stripe', 'shopify', 'wordpress', 'python', 'csharp', 'dotnet', 'labview'].map(slug => `/expertise/${slug}`), '/realisations/fg-chronodep', '/realisations/loumor-debarras'].map(path => config.transform(config, path))
    ),
    transform: async (config, path) => {
        let priority = 0.7
        let changefreq = 'weekly'

        if (path === '/') {
            priority = 1.0
            changefreq = 'daily'
        } else if (path.startsWith('/agence-web-')) {
            priority = 0.95
            changefreq = 'weekly'
        } else if (path.startsWith('/services') || ['/creation-site-internet', '/creation-site-ecommerce', '/creation-landing-page', '/refonte-site-internet', '/referencement-naturel', '/seo-local', '/google-business-profile', '/google-ads', '/developpement-web-sur-mesure', '/integrations-api', '/creation-outils-ia', '/creation-application-web', '/automatisation'].includes(path)) {
            priority = 0.9
            changefreq = 'weekly'
        } else if (path === '/expertise' || path.startsWith('/expertise/')) {
            priority = 0.85
            changefreq = 'monthly'
        } else if (path.startsWith('/tarifs')) {
            priority = 0.9
            changefreq = 'weekly'
        } else if (path.startsWith('/blog')) {
            priority = 0.8
            changefreq = 'weekly'
        } else if (path.startsWith('/etudes-de-cas')) {
            priority = 0.8
            changefreq = 'monthly'
        } else if (path.startsWith('/metiers') || path.startsWith('/villes')) {
            priority = 0.7
            changefreq = 'monthly'
        }

        return {
            loc: path,
            changefreq,
            priority,
            lastmod: new Date().toISOString(),
        }
    },
}
