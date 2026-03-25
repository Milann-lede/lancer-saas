'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button, ButtonLink, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Send, CheckCircle, Trash2, ExternalLink } from 'lucide-react'
import { formatCurrency, formatDate, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils/format'
import { updateInvoiceStatusAction, deleteInvoiceAction } from '@/actions/invoices'
import type { Invoice } from '@/types'

export function InvoiceDetail({ invoice }: { invoice: Invoice }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function updateStatus(status: string) {
    startTransition(async () => {
      const result = await updateInvoiceStatusAction(invoice.id, status)
      if (result?.error) toast.error(result.error)
      else { toast.success('Statut mis à jour'); router.refresh() }
    })
  }

  function handleDelete() {
    if (!confirm('Supprimer cette facture ?')) return
    startTransition(async () => {
      const result = await deleteInvoiceAction(invoice.id)
      if (result?.error) toast.error(result.error)
      else { toast.success('Facture supprimée'); router.push('/invoices') }
    })
  }

  const lineItems = invoice.line_items as { description: string; quantity: number; unit_price: number; vat_rate: number }[]

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <ButtonLink href="/invoices" variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Factures</ButtonLink>
        <div className="flex gap-2">
          {invoice.status === 'draft' && (
            <Button size="sm" onClick={() => updateStatus('sent')} disabled={isPending}>
              <Send className="w-4 h-4 mr-2" />Marquer envoyée
            </Button>
          )}
          {(invoice.status === 'sent' || invoice.status === 'overdue') && (
            <Button size="sm" onClick={() => updateStatus('paid')} disabled={isPending} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />Marquer payée
            </Button>
          )}
          {invoice.stripe_payment_link && (
            <a href={invoice.stripe_payment_link} target="_blank" rel="noreferrer" className={buttonVariants({ size: 'sm', variant: 'outline' })}>
              <ExternalLink className="w-4 h-4 mr-2" />Lien de paiement
            </a>
          )}
          <Button size="sm" variant="ghost" onClick={handleDelete} disabled={isPending} className="text-red-500 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 font-mono">{invoice.invoice_number}</p>
            <CardTitle className="text-xl mt-1">{invoice.title}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Client : {(invoice.client as { name?: string } | null)?.name ?? '—'}
              {invoice.due_date && ` · Échéance : ${formatDate(invoice.due_date)}`}
            </p>
          </div>
          <span className={`text-sm px-3 py-1 rounded-full font-medium ${STATUS_COLORS[invoice.status]}`}>
            {STATUS_LABELS[invoice.status]}
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
              <span>Sous-total HT</span><span>{formatCurrency(Number(invoice.subtotal))}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>TVA</span><span>{formatCurrency(Number(invoice.vat_amount))}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-base">
              <span>Total TTC</span><span>{formatCurrency(Number(invoice.total))}</span>
            </div>
          </div>

          {invoice.paid_at && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm text-green-700">
              Payée le {formatDate(invoice.paid_at)}
            </div>
          )}

          {invoice.notes && (
            <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-600">
              <p className="font-medium text-gray-700 mb-1">Notes</p>
              <p className="whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
