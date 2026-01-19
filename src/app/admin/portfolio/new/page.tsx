import { ProjectForm } from '@/components/admin/ProjectForm'

export default function NewProjectPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Nouveau Projet</h1>
                <p className="text-gray-400">Ajoutez une réalisation à votre portfolio.</p>
            </div>

            <ProjectForm />
        </div>
    )
}
