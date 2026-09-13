'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Calendar, Clock, ChevronDown, Loader2 } from 'lucide-react'

export default function AdminBlogPage() {
    const [articles, setArticles] = useState<any[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadArticles()
    }, [])

    const loadArticles = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/admin/blog')
            const data = await res.json()
            if (data.success) {
                setArticles(data.data)
            }
        } catch (error) {
            console.error('Failed to fetch articles', error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteArticle = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return
        try {
            const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                loadArticles()
            }
        } catch (error) {
            console.error('Failed to delete article', error)
        }
    }

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Gestion du Blog</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Créer et gérer vos articles</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors w-full sm:w-auto"
                >
                    <Plus className="w-4 h-4" />
                    Nouvel article
                </Link>
            </div>

            <Link href="/admin/editorial" className="inline-flex items-center gap-2 text-primary font-medium"><Calendar className="w-4 h-4" /> Calendrier, articles planifiés et prévisualisations privées</Link>
            {/* Search & Filters */}
            <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un article..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden min-h-[400px]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                        <span className="text-sm">Chargement des articles...</span>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1a1a]">
                                        <th className="text-left px-6 py-4 text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wider">Article</th>
                                        <th className="text-left px-6 py-4 text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wider">Catégorie</th>
                                        <th className="text-left px-6 py-4 text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wider">Statut</th>
                                        <th className="text-left px-6 py-4 text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wider">Date</th>
                                        <th className="text-right px-6 py-4 text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                                    {filteredArticles.map((article) => (
                                        <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-gray-900 dark:text-white font-medium text-sm mb-1">{article.title}</div>
                                                    <div className="text-gray-500 dark:text-gray-400 text-xs line-clamp-1">{article.excerpt}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md">
                                                    {article.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {article.published && (!article.publishedAt || Date.parse(article.publishedAt) <= Date.now()) ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-medium rounded-md">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                        Publié
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-md">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                                        {article.published ? 'Planifié' : 'Brouillon'}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {article.createdAt}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        href={`/admin/blog/${article.id}`}
                                                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                        title="Éditer"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/blog/${article.id}/preview`}
                                                        target="_blank"
                                                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                                        title="Voir"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteArticle(article.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredArticles.length === 0 && (
                            <div className="p-12 text-center text-gray-500 text-sm">
                                Aucun article trouvé
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
