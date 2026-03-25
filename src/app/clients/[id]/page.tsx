import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getClient } from '@/actions/clients'
import { ClientForm } from '@/components/clients/client-form'
import { ButtonLink } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = { title: 'Modifier le client' }

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await getClient(id)
  if (!client) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ButtonLink href="/clients" variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Clients</ButtonLink>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
      <ClientForm client={client} />
    </div>
  )
}
