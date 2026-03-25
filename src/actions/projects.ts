'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getProjects() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('projects')
    .select('*, client:clients(id, name, company)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return data ?? []
}

export async function getProject(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('projects')
    .select('*, client:clients(*)')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  return data
}

export async function createProjectAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const budget = formData.get('budget') as string
  const { error, data } = await supabase.from('projects').insert({
    user_id: user.id,
    client_id: formData.get('client_id') as string || null,
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    status: (formData.get('status') as string) || 'active',
    budget: budget ? parseFloat(budget) : null,
    start_date: formData.get('start_date') as string || null,
    end_date: formData.get('end_date') as string || null,
  }).select().single()

  if (error) return { error: error.message }

  revalidatePath('/projects')
  return { data }
}

export async function updateProjectAction(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const budget = formData.get('budget') as string
  const { error } = await supabase
    .from('projects')
    .update({
      client_id: formData.get('client_id') as string || null,
      title: formData.get('title') as string,
      description: formData.get('description') as string || null,
      status: formData.get('status') as string,
      budget: budget ? parseFloat(budget) : null,
      start_date: formData.get('start_date') as string || null,
      end_date: formData.get('end_date') as string || null,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/projects')
  revalidatePath(`/projects/${id}`)
  return { success: true }
}

export async function deleteProjectAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non autorisé' }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/projects')
  return { success: true }
}
