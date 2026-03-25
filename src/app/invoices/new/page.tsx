import { Metadata } from 'next'
import { getClients } from '@/actions/clients'
import { InvoiceForm } from '@/components/invoices/invoice-form'

export const metadata: Metadata = { title: 'Nouvelle facture' }

export default async function NewInvoicePage() {
  const clients = await getClients()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Nouvelle facture</h1>
      <InvoiceForm clients={clients} />
    </div>
  )
}
