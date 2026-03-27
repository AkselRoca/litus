'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
// We might need a real Input component or just use standard HTML for admin to verify
import { Loader2, Plus, X, Upload, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createProject, updateProject } from '@/actions/portfolio'
import Link from 'next/link'

interface ProjectFormProps {
    project?: any // Type Project properly if possible, but any is fine for MVP admin
}

const AVAILABLE_CATEGORIES = [
    'Site Vitrine',
    'Site E-commerce',
    'Google Ads',
    'Référencement Naturel (SEO)',
    'Outil Métier / Application Web',
    'Identité Visuelle',
]

export function ProjectForm({ project }: ProjectFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // Parsing initial JSON data
    const initialStats = project?.stats ? JSON.parse(project.stats) : []
    const initialTags = project?.tags ? JSON.parse(project.tags) : []
    const initialCategories = project?.categories ? JSON.parse(project.categories) : []

    const [stats, setStats] = useState<{ label: string, value: string }[]>(initialStats)
    const [tags, setTags] = useState<string[]>(initialTags)
    const [categories, setCategories] = useState<string[]>(initialCategories)
    const [tagInput, setTagInput] = useState('')
    const [previewImage, setPreviewImage] = useState(project?.imageUrl || '')

    const handleCategoryToggle = (category: string) => {
        if (categories.includes(category)) {
            setCategories(categories.filter(c => c !== category))
        } else {
            setCategories([...categories, category])
        }
    }

    const handleAddStat = () => {
        setStats([...stats, { label: '', value: '' }])
    }

    const handleRemoveStat = (index: number) => {
        setStats(stats.filter((_, i) => i !== index))
    }

    const handleStatChange = (index: number, field: 'label' | 'value', value: string) => {
        const newStats = [...stats]
        newStats[index][field] = value
        setStats(newStats)
    }

    const handleAddTag = () => {
        if (tagInput.trim()) {
            setTags([...tags, tagInput.trim()])
            setTagInput('')
        }
    }

    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        if (categories.length === 0) {
            setError('Veuillez sélectionner au moins une catégorie')
            setIsLoading(false)
            return
        }

        const formData = new FormData(e.currentTarget)
        formData.set('stats', JSON.stringify(stats))
        formData.set('tags', JSON.stringify(tags))
        formData.set('categories', JSON.stringify(categories))

        // Handle creating vs updating
        let result
        if (project) {
            result = await updateProject(project.id, null, formData)
        } else {
            result = await createProject(null, formData)
        }

        if (result.success) {
            router.push('/admin/portfolio')
            router.refresh()
        } else {
            setError(result.error || 'Une erreur est survenue')
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Info */}
                <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-6 rounded-2xl shadow-sm dark:shadow-none space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/5 pb-3">Informations générales</h3>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Titre du projet *</label>
                        <input
                            name="title"
                            defaultValue={project?.title}
                            required
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                            placeholder="Ex: Refonte site vitrine Artisan"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Catégories (multi-sélection) *</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {AVAILABLE_CATEGORIES.map((cat) => (
                                <label
                                    key={cat}
                                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${categories.includes(cat)
                                        ? 'bg-primary/5 dark:bg-primary/5 border-primary shadow-sm'
                                        : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5'
                                        }`}
                                >
                                    <div className="h-5 flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={categories.includes(cat)}
                                            onChange={() => handleCategoryToggle(cat)}
                                            className="sr-only"
                                        />
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${categories.includes(cat) ? 'bg-primary border-primary text-white' : 'border-gray-300 dark:border-white/20'
                                            }`}>
                                            {categories.includes(cat) && <Check className="w-3 h-3" />}
                                        </div>
                                    </div>
                                    <span className={`text-sm leading-tight ${categories.includes(cat) ? 'text-primary font-medium dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description courte *</label>
                        <textarea
                            name="description"
                            defaultValue={project?.description}
                            required
                            rows={4}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none text-sm"
                            placeholder="Une brève description du projet, des objectifs et des résultats..."
                        />
                    </div>

                    <div className="pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    defaultChecked={project?.featured}
                                    className="w-5 h-5 rounded border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 transition-colors"
                                />
                            </div>
                            <div>
                                <div className="text-gray-900 dark:text-white text-sm font-medium group-hover:text-primary transition-colors">Mettre en avant sur l'accueil</div>
                                <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Le projet apparaîtra dans les sections portfolio de la page d'accueil et services.</div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Media & Link */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-6 rounded-2xl shadow-sm dark:shadow-none space-y-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/5 pb-3">Média & Liens</h3>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">URL de l'image (Cloudinary via Médias) *</label>
                            <input
                                name="imageUrl"
                                value={previewImage}
                                onChange={(e) => setPreviewImage(e.target.value)}
                                required
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm font-mono"
                                placeholder="https://res.cloudinary.com/..."
                            />
                            {previewImage && (
                                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 mt-3 bg-gray-100 dark:bg-black/50">
                                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Lien du site en direct (Optionnel)</label>
                            <input
                                name="link"
                                defaultValue={project?.link || ''}
                                type="url"
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                                placeholder="https://votre-client.fr"
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-6 rounded-2xl shadow-sm dark:shadow-none space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Résultats & Statistiques</h3>
                            <button
                                type="button"
                                onClick={handleAddStat}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Ajouter
                            </button>
                        </div>

                        <div className="space-y-3">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex gap-2 items-start bg-gray-50 dark:bg-white/5 p-2 rounded-xl border border-gray-100 dark:border-white/5">
                                    <input
                                        className="w-1/3 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-2 text-sm text-gray-900 dark:text-white focus:border-primary outline-none"
                                        placeholder="Label (ex: Trafic)"
                                        value={stat.label}
                                        onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                                    />
                                    <input
                                        className="flex-1 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-2 text-sm text-gray-900 dark:text-white focus:border-primary outline-none"
                                        placeholder="Valeur (ex: +150% en 6 mois)"
                                        value={stat.value}
                                        onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                                    />
                                    <button type="button" onClick={() => handleRemoveStat(idx)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {stats.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">Aucune statistique ajoutée. Utile pour prouver le ROI.</p>}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 p-6 rounded-2xl shadow-sm dark:shadow-none space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/5 pb-3 mb-2">Technologies & Tags</h3>
                        <div className="flex gap-2">
                            <input
                                className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                placeholder="Ex: Next.js, Tailwind CSS, Stripe..."
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleAddTag()
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 font-medium px-4 rounded-xl text-sm transition-colors"
                            >
                                Ajouter
                            </button>
                        </div>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {tags.map((tag, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-medium border border-gray-200 dark:border-white/10 group">
                                        {tag}
                                        <button type="button" onClick={() => handleRemoveTag(idx)} className="text-gray-400 group-hover:text-red-500 transition-colors">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 pt-6 border-t border-gray-200 dark:border-white/10 pb-10">
                <Link
                    href="/admin/portfolio"
                    className="flex items-center justify-center py-3 px-6 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-medium text-sm rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                    Annuler
                </Link>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-8 bg-primary text-white font-medium text-sm rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 min-w-[200px] shadow-sm shadow-primary/20"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                    {project ? 'Enregistrer les modifications' : 'Créer et publier le projet'}
                </button>
            </div>
        </form>
    )
}

function Check({ className }: { className?: string }) {
    return (
        <svg fill="currentColor" viewBox="0 0 20 20" className={className}>
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
        </svg>
    )
}
