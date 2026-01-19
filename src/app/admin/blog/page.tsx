'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Calendar, Clock } from 'lucide-react'

// Mock data - will be replaced with DB calls
const mockArticles = [
    {
        id: '1',
        title: 'Guide Complet du SEO Local en 2024',
        slug: 'seo-local-guide-2024',
        excerpt: 'Tout ce que vous devez savoir pour apparaître en première page Google.',
        category: 'SEO',
        published: true,
        createdAt: '10 janvier 2024',
        readTime: '8 min',
    },
    {
        id: '2',
        title: 'Google Ads vs SEO : Que Choisir ?',
        slug: 'google-ads-vs-seo',
        excerpt: 'Comparatif détaillé pour vous aider à choisir la meilleure stratégie.',
        category: 'Stratégie',
        published: true,
        createdAt: '5 janvier 2024',
        readTime: '6 min',
    },
    {
        id: '3',
        title: 'Pourquoi un Site Vitrine est Indispensable',
        slug: 'site-vitrine-artisan',
        excerpt: 'Les 5 raisons pour lesquelles chaque artisan devrait avoir un site web.',
        category: 'Site Web',
        published: true,
        createdAt: '2 janvier 2024',
        readTime: '5 min',
    },
]

export default function AdminBlogPage() {
    const [articles] = useState(mockArticles)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Gestion du Blog</h1>
                    <p className="text-gray-400">Créer et gérer vos articles</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-orange-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                    <Plus className="w-5 h-5" />
                    Nouvel article
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="bg-gray-900 rounded-2xl border border-white/10 p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un article..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-transparent border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Articles Table */}
            <div className="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left px-6 py-4 text-gray-400 font-medium">Article</th>
                                <th className="text-left px-6 py-4 text-gray-400 font-medium">Catégorie</th>
                                <th className="text-left px-6 py-4 text-gray-400 font-medium">Statut</th>
                                <th className="text-left px-6 py-4 text-gray-400 font-medium">Date</th>
                                <th className="text-right px-6 py-4 text-gray-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {filteredArticles.map((article) => (
                                <tr key={article.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-white font-medium mb-1">{article.title}</div>
                                            <div className="text-gray-500 text-sm line-clamp-1">{article.excerpt}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                                            {article.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {article.published ? (
                                            <span className="flex items-center gap-2 text-green-400 text-sm">
                                                <Eye className="w-4 h-4" />
                                                Publié
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2 text-gray-400 text-sm">
                                                <EyeOff className="w-4 h-4" />
                                                Brouillon
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Calendar className="w-4 h-4" />
                                            {article.createdAt}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/blog/${article.id}`}
                                                className="p-2 text-gray-400 hover:text-primary hover:bg-white/10 rounded-lg transition-colors"
                                                title="Éditer"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            <Link
                                                href={`/blog/${article.slug}`}
                                                target="_blank"
                                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-white/10 rounded-lg transition-colors"
                                                title="Voir"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </Link>
                                            <button
                                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredArticles.length === 0 && (
                    <div className="p-12 text-center text-gray-400">
                        Aucun article trouvé
                    </div>
                )}
            </div>
        </div>
    )
}
