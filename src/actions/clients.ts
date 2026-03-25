'use server'

import { createClient as createSupabase } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getClients() {
  const supabase = await createSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return data ?? []
}

export async function getClient(id: string) {
  const supabase = await createSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  return data
}

export async function createClientAction(formData: FormData) {
  const supabase = await createSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const { error, data } = await supabase.from('clients').insert({
    user_id: user.id,
    name: formData.get('name') as string,
    email: formData.get('email') as string || null,
    phone: formData.get('phone') as string || null,
    company: formData.get('company') as string || null,
    address: formData.get('address') as string || null,
    city: formData.get('city') as string || null,
    country: formData.get('country') as string || 'FR',
    postal_code: formData.get('postal_code') as string || null,
    vat_number: formData.get('vat_number') as string || null,
    notes: formData.get('notes') as string || null,
  }).select().single()

  if (error) return { error: error.message }

  revalidatePath('/clients')
  return { data }
}

export async function updateClientAction(id: string, formData: FormData) {
  const supabase = await createSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const { error } = await supabase
    .from('clients')
    .update({
      name: formData.get('name') as string,
      email: formData.get('email') as string || null,
      phone: formData.get('phone') as string || null,
      company: formData.get('company') as string || null,
      address: formData.get('address') as string || null,
      city: formData.get('city') as string || null,
      country: formData.get('country') as string || 'FR',
      postal_code: formData.get('postal_code') as string || null,
      vat_number: formData.get('vat_number') as string || null,
      notes: formData.get('notes') as string || null,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/clients')
  revalidatePath(`/clients/${id}`)
  return { success: true }
}

export async function deleteClientAction(id: string) {
  const supabase = await createSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/clients')
  return { success: true }
}
