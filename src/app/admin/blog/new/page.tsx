'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Loader2, Upload, X } from 'lucide-react'

const categories = ['SEO', 'Stratégie', 'Site Web', 'Google Ads', 'E-commerce']

export default function NewArticlePage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'SEO',
        metaTitle: '',
        metaDescription: '',
        published: false,
        authorId: '',
        coverImage: '',
        publishedAt: '',
    })

    const [uploadingImage, setUploadingImage] = useState(false)
    const [tableOfContents, setTableOfContents] = useState('')

    const [team, setTeam] = useState<{ id: string; name: string }[]>([])

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch('/api/admin/team')
                const data = await res.json()
                if (data.success && data.data) {
                    setTeam(data.data)
                    // Select first member by default if none selected
                    if (data.data.length > 0) {
                        setFormData(prev => ({ ...prev, authorId: data.data[0].id }))
                    }
                }
            } catch (err) {
                console.error('Failed to load team', err)
            }
        }
        fetchTeam()
    }, [])

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD') // Supprime les accents
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-') // Remplace les caractères spéciaux par des tirets
            .replace(/(^-|-$)/g, '') // Supprime les tirets au début et à la fin
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
            metaTitle: title,
        })
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploadingImage(true)
        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch('/api/admin/media', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()

            if (data.success) {
                setFormData(prev => ({ ...prev, coverImage: data.data.url }))
            } else {
                alert('Erreur lors de l\'upload')
            }
        } catch (error) {
            console.error('Upload Error:', error)
            alert('Échec de l\'upload de l\'image')
        } finally {
            setUploadingImage(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch('/api/admin/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, tableOfContents })
            })
            const data = await res.json()
            if (data.success) {
                router.push('/admin/blog')
            } else {
                alert(data.error || 'Erreur lors de la création')
            }
        } catch (error) {
            console.error('Submit Error:', error)
            alert('Erreur serveur')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/blog"
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Nouvel article</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Créer un nouvel article de blog</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-transparent text-gray-700 dark:text-gray-300 font-medium text-sm border border-gray-200 dark:border-white/20 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none"
                    >
                        <Eye className="w-4 h-4" />
                        Prévisualiser
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-medium text-sm rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-sm shadow-primary/20"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        Enregistrer
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title */}
                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Titre de l'article *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={handleTitleChange}
                                placeholder="Ex: Guide complet du SEO local en 2024"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                                required
                            />
                        </div>

                        {/* Excerpt */}
                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Extrait *
                            </label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                placeholder="Résumé court de l'article (affiché sur la page liste)"
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none text-sm"
                                required
                            />
                        </div>

                        {/* Content */}
                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Contenu (HTML/CSS personnalisé) *
                                </label>
                            </div>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder={`<div class="article-content">\n  <h2>Introduction</h2>\n  <p>Votre contenu ici...</p>\n</div>`}
                                rows={24}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-y font-mono text-sm leading-relaxed"
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Publish Settings */}
                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-white/5 pb-2">Publication</h2>

                            <div className="space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.published}
                                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                            className="w-5 h-5 rounded border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 transition-colors"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Article public</span>
                                </label>

                                {formData.published && (
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                                            Date de publication (optionnel)
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={formData.publishedAt}
                                            onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                                        />
                                        <p className="text-[10px] text-gray-500 mt-1">Laissez vide pour publier immédiatement.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Image de couverture */}
                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-white/5 pb-2">Image à la une</h2>

                            {formData.coverImage ? (
                                <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 dark:bg-white/5 group">
                                    <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, coverImage: '' })}
                                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-white/20 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors relative overflow-hidden">
                                    {uploadingImage ? (
                                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                    ) : (
                                        <>
                                            <Upload className="w-6 h-6 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Importer une image</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploadingImage}
                                    />
                                </label>
                            )}
                        </div>

                        {/* Category */}
                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-white/5 pb-2">Catégorie</h2>

                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat} className="bg-white dark:bg-gray-900">
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Author */}
                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-white/5 pb-2">Auteur</h2>

                            <select
                                value={formData.authorId}
                                onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer"
                            >
                                {team.map((member) => (
                                    <option key={member.id} value={member.id} className="bg-white dark:bg-gray-900">
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* SEO */}
                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-white/5 pb-2">Optimisation SEO</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-600 dark:text-gray-400 text-xs font-medium mb-1.5">Slug URL</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-colors font-mono"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-1.5">
                                        <label className="block text-gray-600 dark:text-gray-400 text-xs font-medium">Meta Title</label>
                                        <span className={`text-[10px] ${formData.metaTitle.length > 60 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>{formData.metaTitle.length}/60 caractères</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.metaTitle}
                                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                        className={`w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border ${formData.metaTitle.length > 60 ? 'border-red-300 dark:border-red-500/50' : 'border-gray-200 dark:border-white/10'} rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-colors`}
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-1.5">
                                        <label className="block text-gray-600 dark:text-gray-400 text-xs font-medium">Meta Description</label>
                                        <span className={`text-[10px] ${formData.metaDescription.length > 160 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>{formData.metaDescription.length}/160 caractères</span>
                                    </div>
                                    <textarea
                                        value={formData.metaDescription}
                                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                        rows={4}
                                        className={`w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border ${formData.metaDescription.length > 160 ? 'border-red-300 dark:border-red-500/50' : 'border-gray-200 dark:border-white/10'} rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-colors resize-none leading-snug`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
