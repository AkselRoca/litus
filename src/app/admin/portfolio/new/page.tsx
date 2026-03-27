import { ProjectForm } from '@/components/admin/ProjectForm'

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-white/10 pb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Nouveau Projet</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ajoutez une réalisation à votre portfolio.</p>
            </div>

            <ProjectForm />
        </div>
    )
}
