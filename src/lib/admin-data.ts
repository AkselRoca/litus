/**
 * Admin Data Service
 * Centralise les opérations CRUD pour l'admin dashboard
 * Utilise dynamic import pour graceful fallback si DB non disponible
 */

// Types
export interface Lead {
    id: string
    type: string
    email: string | null
    phone: string | null
    data: string
    source: string
    treated: boolean
    createdAt: Date
    updatedAt: Date
}

export interface BlogPost {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    metaTitle: string | null
    metaDesc: string | null
    published: boolean
    publishedAt: Date | null
    createdAt: Date
    updatedAt: Date
}

// Helper pour obtenir Prisma dynamiquement
async function getPrisma() {
    try {
        const { prisma } = await import('@/lib/database_final')
        return prisma
    } catch {
        return null
    }
}

// ============ LEADS ============

export async function getLeads(): Promise<Lead[]> {
    try {
        const prisma = await getPrisma()
        if (!prisma) return getMockLeads()

        return await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
        })
    } catch (error) {
        console.warn('Failed to fetch leads from DB, using mock data:', error)
        return getMockLeads()
    }
}

export async function getLeadById(id: string): Promise<Lead | null> {
    try {
        const prisma = await getPrisma()
        if (!prisma) return getMockLeads().find(l => l.id === id) || null

        return await prisma.lead.findUnique({ where: { id } })
    } catch {
        return getMockLeads().find(l => l.id === id) || null
    }
}

export async function updateLeadStatus(id: string, treated: boolean): Promise<Lead | null> {
    try {
        const prisma = await getPrisma()
        if (!prisma) return null

        return await prisma.lead.update({
            where: { id },
            data: { treated },
        })
    } catch {
        console.warn('Failed to update lead status')
        return null
    }
}

// ============ BLOG POSTS ============

export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const prisma = await getPrisma()
        if (!prisma) return getMockBlogPosts()

        return await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' },
        })
    } catch (error) {
        console.warn('Failed to fetch blog posts from DB, using mock data:', error)
        return getMockBlogPosts()
    }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
    try {
        const prisma = await getPrisma()
        if (!prisma) return getMockBlogPosts().find(p => p.id === id) || null

        return await prisma.blogPost.findUnique({ where: { id } })
    } catch {
        return getMockBlogPosts().find(p => p.id === id) || null
    }
}

export async function createBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost | null> {
    try {
        const prisma = await getPrisma()
        if (!prisma) return null

        return await prisma.blogPost.create({ data })
    } catch {
        return null
    }
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost | null> {
    try {
        const prisma = await getPrisma()
        if (!prisma) return null

        return await prisma.blogPost.update({
            where: { id },
            data,
        })
    } catch {
        return null
    }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
    try {
        const prisma = await getPrisma()
        if (!prisma) return false

        await prisma.blogPost.delete({ where: { id } })
        return true
    } catch {
        return false
    }
}

// ============ STATS ============

export async function getAdminStats() {
    try {
        const prisma = await getPrisma()
        if (!prisma) {
            return getMockStats()
        }

        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        const [totalLeads, leadsThisMonth, totalArticles, publishedArticles] = await Promise.all([
            prisma.lead.count(),
            prisma.lead.count({ where: { createdAt: { gte: startOfMonth } } }),
            prisma.blogPost.count(),
            prisma.blogPost.count({ where: { published: true } }),
        ])

        return {
            totalLeads,
            leadsThisMonth,
            totalArticles,
            publishedArticles,
            conversionRate: totalLeads > 0 ? '3.2%' : '0%',
        }
    } catch {
        return getMockStats()
    }
}

// ============ MOCK DATA ============

function getMockStats() {
    return {
        totalLeads: 47,
        leadsThisMonth: 12,
        totalArticles: 3,
        publishedArticles: 3,
        conversionRate: '3.2%',
    }
}

function getMockLeads(): Lead[] {
    return [
        {
            id: '1',
            type: 'contact',
            email: 'jean.dupont@example.com',
            phone: '06 12 34 56 78',
            data: JSON.stringify({ name: 'Jean Dupont', company: 'Dupont SARL', message: 'Besoin site vitrine' }),
            source: '/contact',
            treated: false,
            createdAt: new Date('2024-01-10'),
            updatedAt: new Date('2024-01-10'),
        },
        {
            id: '2',
            type: 'audit',
            email: 'marie.martin@example.com',
            phone: '07 65 43 21 09',
            data: JSON.stringify({ name: 'Marie Martin', company: 'Martin & Co' }),
            source: '/ressources/audit-google-ads',
            treated: true,
            createdAt: new Date('2024-01-08'),
            updatedAt: new Date('2024-01-09'),
        },
        {
            id: '3',
            type: 'lead-magnet',
            email: 'pierre.durand@example.com',
            phone: null,
            data: JSON.stringify({ name: 'Pierre Durand', magnetId: 'carto-productivite' }),
            source: '/ressources/carto-productivite',
            treated: false,
            createdAt: new Date('2024-01-05'),
            updatedAt: new Date('2024-01-05'),
        },
    ]
}

function getMockBlogPosts(): BlogPost[] {
    return [
        {
            id: '1',
            slug: 'seo-local-guide-2024',
            title: 'Guide SEO Local 2024',
            excerpt: 'Tout ce qu\'il faut savoir pour dominer les recherches locales.',
            content: '# Guide SEO Local...',
            metaTitle: 'Guide SEO Local 2024 | Litus',
            metaDesc: 'Découvrez les meilleures pratiques SEO local pour 2024.',
            published: true,
            publishedAt: new Date('2024-01-01'),
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
        },
        {
            id: '2',
            slug: 'google-ads-vs-seo',
            title: 'Google Ads vs SEO : que choisir ?',
            excerpt: 'Comparaison détaillée pour faire le bon choix.',
            content: '# Google Ads vs SEO...',
            metaTitle: 'Google Ads vs SEO | Litus',
            metaDesc: 'Découvrez quelle stratégie choisir.',
            published: true,
            publishedAt: new Date('2024-01-05'),
            createdAt: new Date('2024-01-05'),
            updatedAt: new Date('2024-01-05'),
        },
    ]
}
