import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProject } from '@/actions/projects'
import { getClients } from '@/actions/clients'
import { ProjectForm } from '@/components/projects/project-form'
import { ButtonLink } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = { title: 'Modifier le projet' }

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [project, clients] = await Promise.all([getProject(id), getClients()])
  if (!project) notFound()

  return (
    <div className="space-y-6">
      <ButtonLink href="/projects" variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Projets</ButtonLink>
      <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
      <ProjectForm project={project} clients={clients} />
    </div>
  )
}
