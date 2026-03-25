'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { LineItem } from '@/types'

function calcTotals(lineItems: LineItem[]) {
  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unit_price, 0)
  const vat_amount = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unit_price * (item.vat_rate / 100),
    0
  )
  return { subtotal, vat_amount, total: subtotal + vat_amount }
}

async function getNextInvoiceNumber(userId: string) {
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('invoice_prefix, invoice_counter')
    .eq('id', userId)
    .single()

  const prefix = profile?.invoice_prefix ?? 'FACT'
  const counter = (profile?.invoice_counter ?? 0) + 1
  const year = new Date().getFullYear()

  await supabase
    .from('profiles')
    .update({ invoice_counter: counter })
    .eq('id', userId)

  return `${prefix}-${year}-${String(counter).padStart(4, '0')}`
}

export async function getInvoices() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('invoices')
    .select('*, client:clients(id, name, company), project:projects(id, title)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return data ?? []
}

export async function getInvoice(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('invoices')
    .select('*, client:clients(*), project:projects(*)')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  return data
}

export async function createInvoiceAction(payload: {
  client_id: string
  project_id?: string
  quote_id?: string
  title: string
  line_items: LineItem[]
  due_date?: string
  notes?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const invoice_number = await getNextInvoiceNumber(user.id)
  const { subtotal, vat_amount, total } = calcTotals(payload.line_items)

  const { error, data } = await supabase.from('invoices').insert({
    user_id: user.id,
    invoice_number,
    ...payload,
    subtotal,
    vat_amount,
    total,
    status: 'draft',
  }).select().single()

  if (error) return { error: error.message }

  revalidatePath('/invoices')
  return { data }
}

export async function updateInvoiceStatusAction(id: string, status: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const updates: Record<string, unknown> = { status }
  if (status === 'paid') updates.paid_at = new Date().toISOString()

  const { error } = await supabase
    .from('invoices')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/invoices')
  revalidatePath(`/invoices/${id}`)
  return { success: true }
}

export async function deleteInvoiceAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/invoices')
  return { success: true }
}

export async function getDashboardStats() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString()

  const [
    { data: monthInvoices },
    { data: yearInvoices },
    { data: unpaidInvoices },
    { count: activeProjects },
    { count: pendingQuotes },
    { count: overdueCount },
  ] = await Promise.all([
    supabase.from('invoices').select('total').eq('user_id', user.id).eq('status', 'paid').gte('paid_at', startOfMonth),
    supabase.from('invoices').select('total').eq('user_id', user.id).eq('status', 'paid').gte('paid_at', startOfYear),
    supabase.from('invoices').select('total').eq('user_id', user.id).in('status', ['sent', 'overdue']),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'active'),
    supabase.from('quotes').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'sent'),
    supabase.from('invoices').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'overdue'),
  ])

  return {
    revenue_month: monthInvoices?.reduce((s, i) => s + Number(i.total), 0) ?? 0,
    revenue_year: yearInvoices?.reduce((s, i) => s + Number(i.total), 0) ?? 0,
    unpaid_total: unpaidInvoices?.reduce((s, i) => s + Number(i.total), 0) ?? 0,
    active_projects: activeProjects ?? 0,
    pending_quotes: pendingQuotes ?? 0,
    overdue_invoices: overdueCount ?? 0,
  }
}
