import { Metadata } from 'next'
import { getClients } from '@/actions/clients'
import { ProjectForm } from '@/components/projects/project-form'

export const metadata: Metadata = { title: 'Nouveau projet' }

export default async function NewProjectPage() {
  const clients = await getClients()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Nouveau projet</h1>
      <ProjectForm clients={clients} />
    </div>
  )
}
