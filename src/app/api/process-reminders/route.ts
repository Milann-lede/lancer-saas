/**
 * Route déclenchée par un cron job (ex: Vercel Cron à minuit chaque nuit)
 * Traite les factures en retard et envoie des relances automatiques.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendReminderEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  // Protect with a shared secret
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const today = new Date().toISOString().split('T')[0]

  // 1. Mark sent invoices as overdue if past due date
  await supabase
    .from('invoices')
    .update({ status: 'overdue' })
    .eq('status', 'sent')
    .lt('due_date', today)

  // 2. Fetch all overdue invoices with client and profile info
  const { data: overdueInvoices } = await supabase
    .from('invoices')
    .select(`
      id, invoice_number, total, due_date, stripe_payment_link,
      client:clients(name, email),
      profile:profiles!invoices_user_id_fkey(full_name, company_name, subscription_plan)
    `)
    .eq('status', 'overdue')

  if (!overdueInvoices?.length) {
    return NextResponse.json({ processed: 0 })
  }

  let sent = 0
  const now = new Date()

  for (const invoice of overdueInvoices) {
    const client = invoice.client as { name?: string; email?: string } | null
    const profile = invoice.profile as { full_name?: string; company_name?: string; subscription_plan?: string } | null

    // Only send reminders for paid plans
    if (profile?.subscription_plan === 'free') continue
    if (!client?.email) continue

    const dueDate = new Date(invoice.due_date)
    const daysOverdue = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))

    // Send at J+7, J+14, J+30 (± 1 day tolerance)
    const reminderDays = [7, 14, 30]
    const shouldSend = reminderDays.some((d) => Math.abs(daysOverdue - d) <= 1)

    if (!shouldSend) continue

    try {
      await sendReminderEmail({
        to: client.email,
        clientName: client.name ?? 'Client',
        freelancerName: profile?.company_name ?? profile?.full_name ?? 'Freelance',
        invoiceNumber: invoice.invoice_number,
        total: Number(invoice.total),
        daysOverdue,
        paymentLink: invoice.stripe_payment_link ?? undefined,
      })
      sent++
    } catch (err) {
      console.error(`Failed to send reminder for invoice ${invoice.invoice_number}:`, err)
    }
  }

  return NextResponse.json({ processed: overdueInvoices.length, sent })
}
