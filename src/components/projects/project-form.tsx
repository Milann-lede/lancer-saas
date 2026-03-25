'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createProjectAction, updateProjectAction } from '@/actions/projects'
import { Loader2 } from 'lucide-react'
import type { Project, Client } from '@/types'

interface ProjectFormProps {
  project?: Project
  clients: Client[]
}

export function ProjectForm({ project, clients }: ProjectFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = project
        ? await updateProjectAction(project.id, formData)
        : await createProjectAction(formData)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(project ? 'Projet mis à jour' : 'Projet créé')
        router.push('/projects')
        router.refresh()
      }
    })
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{project ? 'Modifier le projet' : 'Nouveau projet'}</CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre du projet *</Label>
            <Input id="title" name="title" defaultValue={project?.title} required disabled={isPending} placeholder="Refonte site web" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_id">Client</Label>
            <Select name="client_id" defaultValue={project?.client_id ?? ''}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}{c.company ? ` (${c.company})` : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              defaultValue={project?.description ?? ''}
              disabled={isPending}
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Description du projet..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select name="status" defaultValue={project?.status ?? 'active'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget (€)</Label>
              <Input id="budget" name="budget" type="number" step="0.01" defaultValue={project?.budget ?? ''} disabled={isPending} placeholder="5000" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_date">Date de début</Label>
              <Input id="start_date" name="start_date" type="date" defaultValue={project?.start_date ?? ''} disabled={isPending} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">Date de fin</Label>
              <Input id="end_date" name="end_date" type="date" defaultValue={project?.end_date ?? ''} disabled={isPending} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>Annuler</Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Enregistrement...</> : 'Enregistrer'}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}
