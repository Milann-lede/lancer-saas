import { Metadata } from 'next'
import { getClients } from '@/actions/clients'
import { createClient } from '@/lib/supabase/server'
import { QuoteForm } from '@/components/quotes/quote-form'

export const metadata: Metadata = { title: 'Nouveau devis' }

export default async function NewQuotePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [clients, profileResult] = await Promise.all([
    getClients(),
    supabase.from('profiles').select('subscription_plan, full_name, company_name').eq('id', user!.id).single(),
  ])

  const profile = profileResult.data

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Nouveau devis</h1>
      <QuoteForm
        clients={clients}
        userPlan={profile?.subscription_plan ?? 'free'}
        userName={profile?.full_name ?? ''}
        userCompany={profile?.company_name ?? undefined}
      />
    </div>
  )
}
