'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { Profile } from '@/types'

export default function SettingsPage() {
  const supabase = createClient()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [profile, setProfile] = useState<Partial<Profile>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) setProfile(data)
      setLoading(false)
    }
    load()
  }, [])

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from('profiles').update({
        full_name: formData.get('full_name') as string,
        company_name: formData.get('company_name') as string || null,
        siret: formData.get('siret') as string || null,
        vat_number: formData.get('vat_number') as string || null,
        address: formData.get('address') as string || null,
        city: formData.get('city') as string || null,
        postal_code: formData.get('postal_code') as string || null,
        phone: formData.get('phone') as string || null,
        invoice_prefix: formData.get('invoice_prefix') as string || 'FACT',
      }).eq('id', user.id)

      if (error) toast.error(error.message)
      else toast.success('Profil mis à jour')
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-500 mt-1">Gérez votre profil et vos préférences de facturation</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>Ces informations apparaissent sur vos factures et devis</CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nom complet *</Label>
                <Input id="full_name" name="full_name" defaultValue={profile.full_name ?? ''} required disabled={isPending} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_name">Nom de l&apos;entreprise</Label>
                <Input id="company_name" name="company_name" defaultValue={profile.company_name ?? ''} disabled={isPending} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siret">SIRET</Label>
                <Input id="siret" name="siret" defaultValue={profile.siret ?? ''} disabled={isPending} placeholder="12345678901234" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vat_number">Numéro TVA intracommunautaire</Label>
                <Input id="vat_number" name="vat_number" defaultValue={profile.vat_number ?? ''} disabled={isPending} placeholder="FR12345678901" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" name="phone" defaultValue={profile.phone ?? ''} disabled={isPending} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice_prefix">Préfixe facture</Label>
                <Input id="invoice_prefix" name="invoice_prefix" defaultValue={profile.invoice_prefix ?? 'FACT'} disabled={isPending} placeholder="FACT" maxLength={10} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="address">Adresse</Label>
                <Input id="address" name="address" defaultValue={profile.address ?? ''} disabled={isPending} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input id="city" name="city" defaultValue={profile.city ?? ''} disabled={isPending} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">Code postal</Label>
                <Input id="postal_code" name="postal_code" defaultValue={profile.postal_code ?? ''} disabled={isPending} />
              </div>
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Enregistrement...</> : 'Enregistrer'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
