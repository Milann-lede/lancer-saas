'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClientAction, updateClientAction } from '@/actions/clients'
import { Loader2 } from 'lucide-react'
import type { Client } from '@/types'

interface ClientFormProps {
  client?: Client
}

export function ClientForm({ client }: ClientFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = client
        ? await updateClientAction(client.id, formData)
        : await createClientAction(formData)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(client ? 'Client mis à jour' : 'Client créé')
        router.push('/clients')
        router.refresh()
      }
    })
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{client ? 'Modifier le client' : 'Nouveau client'}</CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Nom / Prénom *</Label>
              <Input id="name" name="name" defaultValue={client?.name} required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise</Label>
              <Input id="company" name="company" defaultValue={client?.company ?? ''} disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={client?.email ?? ''} disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" name="phone" defaultValue={client?.phone ?? ''} disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vat_number">Numéro TVA</Label>
              <Input id="vat_number" name="vat_number" defaultValue={client?.vat_number ?? ''} disabled={isPending} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Adresse</Label>
              <Input id="address" name="address" defaultValue={client?.address ?? ''} disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input id="city" name="city" defaultValue={client?.city ?? ''} disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal_code">Code postal</Label>
              <Input id="postal_code" name="postal_code" defaultValue={client?.postal_code ?? ''} disabled={isPending} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
              Annuler
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enregistrement...</> : 'Enregistrer'}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}
