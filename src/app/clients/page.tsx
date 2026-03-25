import { Metadata } from 'next'
import { getClients } from '@/actions/clients'
import { ButtonLink } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Users, Mail, Phone, Building2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Clients' }

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500 mt-1">{clients.length} client{clients.length > 1 ? 's' : ''}</p>
        </div>
        <ButtonLink href="/clients/new"><Plus className="w-4 h-4 mr-2" />Nouveau client</ButtonLink>
      </div>

      {clients.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun client</h3>
            <p className="text-gray-500 mb-6">Commence par ajouter ton premier client</p>
            <ButtonLink href="/clients/new"><Plus className="w-4 h-4 mr-2" />Ajouter un client</ButtonLink>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    {client.company && (
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3" /> {client.company}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-500">
                  {client.email && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-3 h-3" /> {client.email}
                    </p>
                  )}
                  {client.phone && (
                    <p className="flex items-center gap-2">
                      <Phone className="w-3 h-3" /> {client.phone}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex justify-end">
                  <ButtonLink href={`/clients/${client.id}`} variant="ghost" size="sm">
                    Voir <ArrowRight className="w-3 h-3 ml-1" />
                  </ButtonLink>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
