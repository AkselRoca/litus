import { getProjects, deleteProject } from '@/actions/portfolio'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { SortableProjectList } from './SortableProjectList'

export default async function AdminPortfolioPage() {
    const { success, data: projects } = await getProjects()

    if (!success || !projects) {
        return <div className="text-red-500">Erreur lors du chargement des projets.</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Portfolio</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Gérez vos réalisations clients.</p>
                </div>
                <Link 
                    href="/admin/portfolio/new"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors w-full sm:w-auto"
                >
                    <Plus className="w-4 h-4" />
                    Ajouter un projet
                </Link>
            </div>

            <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden p-6">
                <SortableProjectList projects={projects as any} />
            </div>
        </div>
    )
}
