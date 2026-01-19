import { getProjects, deleteProject } from '@/actions/portfolio'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { SortableProjectList } from './SortableProjectList'

export default async function AdminPortfolioPage() {
    const { success, data: projects } = await getProjects()

    if (!success || !projects) {
        return <div className="text-white">Erreur lors du chargement des projets.</div>
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
                    <p className="text-gray-400">Gérez vos réalisations clients.</p>
                </div>
                <Link href="/admin/portfolio/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un projet
                    </Button>
                </Link>
            </div>

            <div className="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden p-6">
                <SortableProjectList projects={projects as any} />
            </div>
        </div>
    )
}
