import { ProjectForm } from '@/components/admin/ProjectForm'
import { getProjectById } from '@/actions/portfolio'
import { notFound } from 'next/navigation'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { success, data } = await getProjectById(id)

    if (!success || !data) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-white/10 pb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Modifier le projet</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Éditez les informations de "{data.title}".</p>
            </div>

            <ProjectForm project={data} />
        </div>
    )
}
