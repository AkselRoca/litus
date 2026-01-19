/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://litus.fr',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: [
        '/admin',
        '/admin/*',
        '/login-admin',
        '/api/*',
        '/ressources/confirmation',
    ],
    robotsTxtOptions: {
        additionalSitemaps: [],
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/login-admin', '/api'],
            },
        ],
    },
    transform: async (config, path) => {
        let priority = 0.7
        let changefreq = 'weekly'

        if (path === '/') {
            priority = 1.0
            changefreq = 'daily'
        } else if (path.startsWith('/services')) {
            priority = 0.9
            changefreq = 'weekly'
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
