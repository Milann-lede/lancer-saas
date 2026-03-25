import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getQuote } from '@/actions/quotes'
import { QuoteDetail } from '@/components/quotes/quote-detail'

export const metadata: Metadata = { title: 'Devis' }

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const quote = await getQuote(id)
  if (!quote) notFound()

  return <QuoteDetail quote={quote} />
}
