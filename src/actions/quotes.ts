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

async function getNextQuoteNumber(userId: string) {
  const supabase = await createClient()
  const year = new Date().getFullYear()
  const { count } = await supabase
    .from('quotes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  const counter = (count ?? 0) + 1
  return `DEV-${year}-${String(counter).padStart(4, '0')}`
}

export async function getQuotes() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('quotes')
    .select('*, client:clients(id, name, company), project:projects(id, title)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return data ?? []
}

export async function getQuote(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('quotes')
    .select('*, client:clients(*), project:projects(*)')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  return data
}

export async function createQuoteAction(payload: {
  client_id: string
  project_id?: string
  title: string
  line_items: LineItem[]
  valid_until?: string
  notes?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const quote_number = await getNextQuoteNumber(user.id)
  const { subtotal, vat_amount, total } = calcTotals(payload.line_items)

  const { error, data } = await supabase.from('quotes').insert({
    user_id: user.id,
    quote_number,
    ...payload,
    subtotal,
    vat_amount,
    total,
    status: 'draft',
  }).select().single()

  if (error) return { error: error.message }

  revalidatePath('/quotes')
  return { data }
}

export async function updateQuoteStatusAction(id: string, status: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const { error } = await supabase
    .from('quotes')
    .update({ status })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/quotes')
  revalidatePath(`/quotes/${id}`)
  return { success: true }
}

export async function convertQuoteToInvoiceAction(quoteId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const { data: quote } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', quoteId)
    .eq('user_id', user.id)
    .single()

  if (!quote) return { error: 'Devis introuvable' }

  // Get next invoice number
  const { data: profile } = await supabase
    .from('profiles')
    .select('invoice_prefix, invoice_counter')
    .eq('id', user.id)
    .single()

  const prefix = profile?.invoice_prefix ?? 'FACT'
  const counter = (profile?.invoice_counter ?? 0) + 1
  const year = new Date().getFullYear()
  const invoice_number = `${prefix}-${year}-${String(counter).padStart(4, '0')}`

  await supabase.from('profiles').update({ invoice_counter: counter }).eq('id', user.id)

  // Due date: 30 days from now
  const due_date = new Date()
  due_date.setDate(due_date.getDate() + 30)

  const { error, data } = await supabase.from('invoices').insert({
    user_id: user.id,
    client_id: quote.client_id,
    project_id: quote.project_id,
    quote_id: quote.id,
    invoice_number,
    title: quote.title,
    line_items: quote.line_items,
    subtotal: quote.subtotal,
    vat_amount: quote.vat_amount,
    total: quote.total,
    status: 'draft',
    due_date: due_date.toISOString().split('T')[0],
    notes: quote.notes,
  }).select().single()

  if (error) return { error: error.message }

  // Mark quote as accepted
  await supabase.from('quotes').update({ status: 'accepted' }).eq('id', quoteId)

  revalidatePath('/quotes')
  revalidatePath('/invoices')
  return { data }
}

export async function deleteQuoteAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const { error } = await supabase
    .from('quotes')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/quotes')
  return { success: true }
}
