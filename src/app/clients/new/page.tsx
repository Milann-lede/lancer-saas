import { Metadata } from 'next'
import { ClientForm } from '@/components/clients/client-form'

export const metadata: Metadata = { title: 'Nouveau client' }

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Nouveau client</h1>
      <ClientForm />
    </div>
  )
}
