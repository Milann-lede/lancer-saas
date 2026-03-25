import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendInvoiceEmail } from '@/lib/email'
import { formatDate } from '@/lib/utils/format'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { invoiceId } = await req.json()

  const [invoiceResult, profileResult] = await Promise.all([
    supabase.from('invoices').select('*, client:clients(name, email)').eq('id', invoiceId).eq('user_id', user.id).single(),
    supabase.from('profiles').select('full_name, company_name').eq('id', user.id).single(),
  ])

  const invoice = invoiceResult.data
  const profile = profileResult.data

  if (!invoice) return NextResponse.json({ error: 'Facture introuvable' }, { status: 404 })

  const clientEmail = (invoice.client as { email?: string } | null)?.email
  if (!clientEmail) return NextResponse.json({ error: 'Email client manquant' }, { status: 400 })

  try {
    await sendInvoiceEmail({
      to: clientEmail,
      clientName: (invoice.client as { name?: string } | null)?.name ?? 'Client',
      freelancerName: profile?.company_name ?? profile?.full_name ?? 'Freelance',
      invoiceNumber: invoice.invoice_number,
      total: Number(invoice.total),
      dueDate: formatDate(invoice.due_date),
      paymentLink: invoice.stripe_payment_link ?? undefined,
    })

    // Mark as sent
    await supabase.from('invoices').update({ status: 'sent' }).eq('id', invoiceId).eq('status', 'draft')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 })
  }
}
