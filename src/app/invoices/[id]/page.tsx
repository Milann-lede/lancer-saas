import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getInvoice } from '@/actions/invoices'
import { InvoiceDetail } from '@/components/invoices/invoice-detail'

export const metadata: Metadata = { title: 'Facture' }

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invoice = await getInvoice(id)
  if (!invoice) notFound()

  return <InvoiceDetail invoice={invoice} />
}
