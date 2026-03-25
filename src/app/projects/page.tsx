import { Metadata } from 'next'
import { getProjects } from '@/actions/projects'
import { ButtonLink } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency, formatDateShort, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils/format'
import { Plus, FolderOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Projets' }

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projets</h1>
          <p className="text-gray-500 mt-1">{projects.length} projet{projects.length > 1 ? 's' : ''}</p>
        </div>
        <ButtonLink href="/projects/new"><Plus className="w-4 h-4 mr-2" />Nouveau projet</ButtonLink>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun projet</h3>
            <p className="text-gray-500 mb-6">Crée ton premier projet pour commencer à tracker ton travail</p>
            <ButtonLink href="/projects/new"><Plus className="w-4 h-4 mr-2" />Créer un projet</ButtonLink>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FolderOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-500">
                        {(project.client as { name?: string } | null)?.name ?? 'Sans client'} ·{' '}
                        {project.start_date && `Début ${formatDateShort(project.start_date)}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {project.budget && (
                      <span className="text-sm font-medium text-gray-700">
                        {formatCurrency(Number(project.budget))}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[project.status]}`}>
                      {STATUS_LABELS[project.status] ?? project.status}
                    </span>
                    <ButtonLink href={`/projects/${project.id}`} variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </ButtonLink>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
