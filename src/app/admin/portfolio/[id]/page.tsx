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
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Modifier le projet</h1>
                <p className="text-gray-400">Éditez les informations de "{data.title}".</p>
            </div>

            <ProjectForm project={data} />
        </div>
    )
}
