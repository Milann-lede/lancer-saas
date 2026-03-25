import { Metadata } from 'next'
import { getInvoices } from '@/actions/invoices'
import { ButtonLink } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency, formatDateShort, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils/format'
import { Plus, Receipt, ArrowRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Factures' }

export default async function InvoicesPage() {
  const invoices = await getInvoices()

  const totalUnpaid = invoices
    .filter((i) => i.status === 'sent' || i.status === 'overdue')
    .reduce((s, i) => s + Number(i.total), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Factures</h1>
          <p className="text-gray-500 mt-1">
            {invoices.length} facture{invoices.length > 1 ? 's' : ''}
            {totalUnpaid > 0 && ` · ${formatCurrency(totalUnpaid)} à encaisser`}
          </p>
        </div>
        <ButtonLink href="/invoices/new"><Plus className="w-4 h-4 mr-2" />Nouvelle facture</ButtonLink>
      </div>

      {invoices.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune facture</h3>
            <p className="text-gray-500 mb-6">Crée ta première facture ou convertis un devis accepté</p>
            <ButtonLink href="/invoices/new"><Plus className="w-4 h-4 mr-2" />Créer une facture</ButtonLink>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Numéro</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Titre</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Échéance</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-right">Total TTC</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">{invoice.invoice_number}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{(invoice.client as { name?: string } | null)?.name ?? '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{invoice.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <span className={invoice.status === 'overdue' ? 'text-red-600 font-medium' : ''}>
                        {formatDateShort(invoice.due_date)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[invoice.status]}`}>
                        {STATUS_LABELS[invoice.status] ?? invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                      {formatCurrency(Number(invoice.total))}
                    </td>
                    <td className="px-6 py-4">
                      <ButtonLink href={`/invoices/${invoice.id}`} variant="ghost" size="sm"><ArrowRight className="w-4 h-4" /></ButtonLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
