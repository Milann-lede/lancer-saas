'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button, ButtonLink, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Send, CheckCircle, Trash2, ExternalLink, Loader2, RotateCcw, Mail } from 'lucide-react'
import { formatCurrency, formatDate, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils/format'
import { updateInvoiceStatusAction, deleteInvoiceAction } from '@/actions/invoices'
import type { Invoice } from '@/types'

export function InvoiceDetail({ invoice }: { invoice: Invoice }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isSending, setIsSending] = useState(false)

  const clientEmail = (invoice.client as { email?: string } | null)?.email

  async function handleSendEmail() {
    if (!clientEmail) {
      toast.error("Ce client n'a pas d'adresse email enregistrée")
      return
    }
    setIsSending(true)
    try {
      const res = await fetch('/api/send-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId: invoice.id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Erreur lors de l'envoi")
      toast.success(`Facture envoyée à ${clientEmail}`)
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de l'envoi")
    } finally {
      setIsSending(false)
    }
  }

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
  const isWorking = isPending || isSending

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <ButtonLink href="/invoices" variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Factures</ButtonLink>
        <div className="flex flex-wrap gap-2">
          {invoice.status === 'draft' && (
            <Button size="sm" onClick={handleSendEmail} disabled={isWorking || !clientEmail}>
              {isSending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Envoi...</> : <><Send className="w-4 h-4 mr-2" />Envoyer par email</>}
            </Button>
          )}
          {(invoice.status === 'sent' || invoice.status === 'overdue') && (
            <>
              <Button size="sm" variant="outline" onClick={handleSendEmail} disabled={isWorking || !clientEmail} title={clientEmail ? `Renvoyer à ${clientEmail}` : "Email client manquant"}>
                {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4 mr-2" />}
                {!isSending && 'Renvoyer'}
              </Button>
              <Button size="sm" onClick={() => updateStatus('paid')} disabled={isWorking} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />Marquer payée
              </Button>
            </>
          )}
          {invoice.stripe_payment_link && (
            <a href={invoice.stripe_payment_link} target="_blank" rel="noreferrer" className={buttonVariants({ size: 'sm', variant: 'outline' })}>
              <ExternalLink className="w-4 h-4 mr-2" />Lien de paiement
            </a>
          )}
          <Button size="sm" variant="ghost" onClick={handleDelete} disabled={isWorking} className="text-red-500 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Email info banner */}
      {clientEmail && invoice.status === 'draft' && (
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5">
          <Mail className="w-4 h-4 text-blue-500 shrink-0" />
          <span>L&apos;email sera envoyé à <strong className="text-blue-700">{clientEmail}</strong></span>
        </div>
      )}
      {!clientEmail && invoice.status === 'draft' && (
        <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
          <Mail className="w-4 h-4 shrink-0" />
          <span>Ce client n&apos;a pas d&apos;email — <ButtonLink href="/clients" variant="link" className="h-auto p-0 text-amber-700 underline text-sm">ajouter un email client</ButtonLink></span>
        </div>
      )}

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
