import { Metadata } from 'next'
import { getQuotes } from '@/actions/quotes'
import { ButtonLink } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency, formatDateShort, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils/format'
import { Plus, FileText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Devis' }

export default async function QuotesPage() {
  const quotes = await getQuotes()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Devis</h1>
          <p className="text-gray-500 mt-1">{quotes.length} devis</p>
        </div>
        <ButtonLink href="/quotes/new"><Plus className="w-4 h-4 mr-2" />Nouveau devis</ButtonLink>
      </div>

      {quotes.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun devis</h3>
            <p className="text-gray-500 mb-6">Génère ton premier devis en quelques secondes avec l&apos;IA</p>
            <ButtonLink href="/quotes/new"><Plus className="w-4 h-4 mr-2" />Créer un devis</ButtonLink>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Numéro</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Titre</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Valable jusqu&apos;au</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-right">Total TTC</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">{quote.quote_number}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{(quote.client as { name?: string } | null)?.name ?? '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{quote.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDateShort(quote.valid_until)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[quote.status]}`}>
                        {STATUS_LABELS[quote.status] ?? quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                      {formatCurrency(Number(quote.total))}
                    </td>
                    <td className="px-6 py-4">
                      <ButtonLink href={`/quotes/${quote.id}`} variant="ghost" size="sm"><ArrowRight className="w-4 h-4" /></ButtonLink>
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
