'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button, ButtonLink } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Send, CheckCircle, XCircle, Receipt, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils/format'
import { updateQuoteStatusAction, convertQuoteToInvoiceAction, deleteQuoteAction } from '@/actions/quotes'
import type { Quote } from '@/types'

export function QuoteDetail({ quote }: { quote: Quote }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function run(fn: () => Promise<{ error?: string; data?: unknown; success?: boolean }>) {
    startTransition(async () => {
      const result = await fn()
      if (result?.error) toast.error(result.error)
    })
  }

  async function handleDelete() {
    if (!confirm('Supprimer ce devis ?')) return
    run(async () => {
      const r = await deleteQuoteAction(quote.id)
      if (!r?.error) { toast.success('Devis supprimé'); router.push('/quotes') }
      return r
    })
  }

  async function convertToInvoice() {
    startTransition(async () => {
      const result = await convertQuoteToInvoiceAction(quote.id)
      if (result?.error) toast.error(result.error)
      else {
        toast.success('Facture créée')
        router.push(`/invoices/${(result.data as { id: string })?.id}`)
      }
    })
  }

  const lineItems = quote.line_items as { description: string; quantity: number; unit_price: number; vat_rate: number }[]

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <ButtonLink href="/quotes" variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Devis</ButtonLink>
        <div className="flex gap-2">
          {quote.status === 'draft' && (
            <Button size="sm" onClick={() => run(() => updateQuoteStatusAction(quote.id, 'sent').then(r => { if (!r?.error) { toast.success('Devis marqué envoyé'); router.refresh() } return r }))} disabled={isPending}>
              <Send className="w-4 h-4 mr-2" />Marquer envoyé
            </Button>
          )}
          {quote.status === 'sent' && (
            <>
              <Button size="sm" variant="outline" onClick={() => run(() => updateQuoteStatusAction(quote.id, 'rejected').then(r => { if (!r?.error) { toast.success('Devis refusé'); router.refresh() } return r }))} disabled={isPending}>
                <XCircle className="w-4 h-4 mr-2" />Refusé
              </Button>
              <Button size="sm" onClick={() => run(() => updateQuoteStatusAction(quote.id, 'accepted').then(r => { if (!r?.error) { toast.success('Devis accepté'); router.refresh() } return r }))} disabled={isPending}>
                <CheckCircle className="w-4 h-4 mr-2" />Accepté
              </Button>
            </>
          )}
          {quote.status === 'accepted' && (
            <Button size="sm" onClick={convertToInvoice} disabled={isPending}>
              <Receipt className="w-4 h-4 mr-2" />Convertir en facture
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={handleDelete} disabled={isPending} className="text-red-500 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 font-mono">{quote.quote_number}</p>
            <CardTitle className="text-xl mt-1">{quote.title}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Client : {(quote.client as { name?: string } | null)?.name ?? '—'}</p>
          </div>
          <span className={`text-sm px-3 py-1 rounded-full font-medium ${STATUS_COLORS[quote.status]}`}>
            {STATUS_LABELS[quote.status]}
          </span>
        </CardHeader>
        <CardContent className="space-y-6">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left text-gray-500 text-xs uppercase">
                <th className="pb-2">Description</th>
                <th className="pb-2 text-right">Qté</th>
                <th className="pb-2 text-right">PU HT</th>
                <th className="pb-2 text-right">TVA</th>
                <th className="pb-2 text-right">Total HT</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {lineItems.map((item, i) => (
                <tr key={i}>
                  <td className="py-3">{item.description}</td>
                  <td className="py-3 text-right">{item.quantity}</td>
                  <td className="py-3 text-right">{formatCurrency(item.unit_price)}</td>
                  <td className="py-3 text-right">{item.vat_rate}%</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(item.quantity * item.unit_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ml-auto max-w-xs space-y-2 pt-2 border-t">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Sous-total HT</span><span>{formatCurrency(Number(quote.subtotal))}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>TVA</span><span>{formatCurrency(Number(quote.vat_amount))}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900">
              <span>Total TTC</span><span>{formatCurrency(Number(quote.total))}</span>
            </div>
          </div>

          {quote.valid_until && (
            <p className="text-sm text-gray-500">Valable jusqu&apos;au : {formatDate(quote.valid_until)}</p>
          )}
          {quote.notes && (
            <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-600">
              <p className="font-medium text-gray-700 mb-1">Notes</p>
              <p className="whitespace-pre-wrap">{quote.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
