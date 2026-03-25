'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineItemsEditor } from '@/components/invoices/line-items-editor'
import { createQuoteAction } from '@/actions/quotes'
import { Loader2, Sparkles } from 'lucide-react'
import type { Client, LineItem } from '@/types'

interface QuoteFormProps {
  clients: Client[]
  userPlan?: string
  userName?: string
  userCompany?: string
}

export function QuoteForm({ clients, userPlan, userName = '', userCompany }: QuoteFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isGenerating, setIsGenerating] = useState(false)
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [selectedClientId, setSelectedClientId] = useState('')
  const [aiPrompt, setAiPrompt] = useState('')
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')

  const canUseAI = userPlan === 'starter' || userPlan === 'pro'

  async function generateWithAI() {
    if (!selectedClientId || !aiPrompt) {
      toast.error('Sélectionne un client et décris le projet')
      return
    }

    const client = clients.find((c) => c.id === selectedClientId)
    if (!client) return

    setIsGenerating(true)
    try {
      const res = await fetch('/api/ai/generate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDescription: aiPrompt,
          clientName: client.company ?? client.name,
          freelancerName: userName,
          freelancerCompany: userCompany,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? 'Erreur IA')
      }

      const generated = await res.json()
      setTitle(generated.title)
      setLineItems(generated.line_items)
      setNotes(generated.notes)
      toast.success('Devis généré par l\'IA !')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur lors de la génération')
    } finally {
      setIsGenerating(false)
    }
  }

  async function handleSubmit(formData: FormData) {
    if (lineItems.length === 0) {
      toast.error('Ajoute au moins une ligne')
      return
    }

    startTransition(async () => {
      const result = await createQuoteAction({
        client_id: selectedClientId,
        title: formData.get('title') as string,
        line_items: lineItems,
        valid_until: formData.get('valid_until') as string || undefined,
        notes: formData.get('notes') as string || undefined,
      })

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Devis créé')
        router.push('/quotes')
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* AI Section */}
      {canUseAI && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-blue-800">
              <Sparkles className="w-4 h-4" />
              Générer avec l&apos;IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-blue-700">Décris ton projet en quelques mots, l&apos;IA génère le devis complet.</p>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              placeholder="Ex: Refonte complète du site e-commerce de mon client, avec intégration Stripe et back-office..."
            />
            <Button
              type="button"
              onClick={generateWithAI}
              disabled={isGenerating || !selectedClientId}
              variant="default"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isGenerating
                ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Génération...</>
                : <><Sparkles className="w-4 h-4 mr-2" />Générer le devis</>
              }
            </Button>
          </CardContent>
        </Card>
      )}

      {!canUseAI && (
        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">La génération IA est disponible à partir du plan Starter</span>
            </div>
            <Button size="sm" variant="outline" onClick={() => router.push('/settings/billing')}>
              Passer au Starter
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Détails du devis</CardTitle>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Client *</Label>
                <Select value={selectedClientId} onValueChange={(v) => setSelectedClientId(v ?? '')} name="client_id">
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
                <Label htmlFor="valid_until">Valable jusqu&apos;au</Label>
                <Input id="valid_until" name="valid_until" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Titre du devis *</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Refonte site web — Acme Corp"
              />
            </div>

            <div className="space-y-2">
              <Label>Prestations</Label>
              <LineItemsEditor initialItems={lineItems} onChange={setLineItems} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes / Conditions</Label>
              <textarea
                id="notes"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Conditions de paiement, révisions incluses..."
              />
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>Annuler</Button>
              <Button type="submit" disabled={isPending || !selectedClientId}>
                {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Création...</> : 'Créer le devis'}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
