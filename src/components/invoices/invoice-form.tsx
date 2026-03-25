'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineItemsEditor } from './line-items-editor'
import { createInvoiceAction } from '@/actions/invoices'
import { Loader2 } from 'lucide-react'
import type { Client, LineItem } from '@/types'

interface InvoiceFormProps {
  clients: Client[]
}

export function InvoiceForm({ clients }: InvoiceFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [selectedClientId, setSelectedClientId] = useState('')

  async function handleSubmit(formData: FormData) {
    if (lineItems.length === 0) {
      toast.error('Ajoute au moins une ligne')
      return
    }
    if (!selectedClientId) {
      toast.error('Sélectionne un client')
      return
    }

    startTransition(async () => {
      const result = await createInvoiceAction({
        client_id: selectedClientId,
        title: formData.get('title') as string,
        line_items: lineItems,
        due_date: formData.get('due_date') as string || undefined,
        notes: formData.get('notes') as string || undefined,
      })

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Facture créée')
        router.push(`/invoices/${result.data?.id}`)
        router.refresh()
      }
    })
  }

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Nouvelle facture</CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Client *</Label>
              <Select value={selectedClientId} onValueChange={(v) => setSelectedClientId(v ?? '')}>
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
              <Label htmlFor="due_date">Date d&apos;échéance</Label>
              <Input id="due_date" name="due_date" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input id="title" name="title" required placeholder="Développement application mobile" />
          </div>

          <div className="space-y-2">
            <Label>Prestations</Label>
            <LineItemsEditor onChange={setLineItems} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Conditions de paiement..."
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>Annuler</Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Création...</> : 'Créer la facture'}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}
