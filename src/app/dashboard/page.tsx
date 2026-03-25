import { Metadata } from 'next'
import { getDashboardStats } from '@/actions/invoices'
import { getInvoices } from '@/actions/invoices'
import { StatCard } from '@/components/dashboard/stat-card'
import { Badge } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDateShort, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils/format'
import {
  TrendingUp,
  Calendar,
  AlertTriangle,
  FolderOpen,
  FileText,
  Plus,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = { title: 'Tableau de bord' }

export default async function DashboardPage() {
  const [stats, invoices] = await Promise.all([getDashboardStats(), getInvoices()])

  const recentInvoices = invoices.slice(0, 5)
  const overdueInvoices = invoices.filter((i) => i.status === 'overdue')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 mt-1">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-3">
          <ButtonLink href="/quotes/new" variant="outline"><FileText className="w-4 h-4 mr-2" />Nouveau devis</ButtonLink>
          <ButtonLink href="/invoices/new"><Plus className="w-4 h-4 mr-2" />Nouvelle facture</ButtonLink>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Revenus du mois"
          value={formatCurrency(stats?.revenue_month ?? 0)}
          subtitle={`${formatCurrency(stats?.revenue_year ?? 0)} cette année`}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Impayés"
          value={formatCurrency(stats?.unpaid_total ?? 0)}
          subtitle={`${stats?.overdue_invoices ?? 0} facture(s) en retard`}
          icon={AlertTriangle}
          color={stats?.overdue_invoices ? 'red' : 'yellow'}
        />
        <StatCard
          title="Projets actifs"
          value={String(stats?.active_projects ?? 0)}
          subtitle={`${stats?.pending_quotes ?? 0} devis en attente`}
          icon={FolderOpen}
          color="blue"
        />
      </div>

      {/* Overdue alert */}
      {overdueInvoices.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800">
                  {overdueInvoices.length} facture{overdueInvoices.length > 1 ? 's' : ''} en retard
                </p>
                <p className="text-sm text-red-600">
                  Total : {formatCurrency(overdueInvoices.reduce((s, i) => s + Number(i.total), 0))}
                </p>
              </div>
            </div>
            <ButtonLink href="/invoices?status=overdue" size="sm" variant="destructive">Voir les factures</ButtonLink>
          </CardContent>
        </Card>
      )}

      {/* Recent invoices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Factures récentes</CardTitle>
          <ButtonLink href="/invoices" variant="ghost" size="sm">
            Tout voir <ArrowRight className="w-4 h-4 ml-1" />
          </ButtonLink>
        </CardHeader>
        <CardContent>
          {recentInvoices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Aucune facture pour l&apos;instant</p>
              <ButtonLink href="/invoices/new" className="mt-4" size="sm">Créer ma première facture</ButtonLink>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{invoice.invoice_number}</p>
                      <p className="text-xs text-gray-500">
                        {(invoice.client as { name?: string } | null)?.name ?? '—'} · Échéance {formatDateShort(invoice.due_date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[invoice.status]}`}>
                      {STATUS_LABELS[invoice.status] ?? invoice.status}
                    </span>
                    <span className="font-semibold text-gray-900 text-sm">
                      {formatCurrency(Number(invoice.total))}
                    </span>
                    <ButtonLink href={`/invoices/${invoice.id}`} variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </ButtonLink>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
