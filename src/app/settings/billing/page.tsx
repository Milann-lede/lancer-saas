'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CheckCircle, Loader2, Zap, Crown } from 'lucide-react'
import { PLANS } from '@/lib/stripe'

const PLAN_ICONS = { starter: Zap, pro: Crown }

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleSubscribe(plan: string) {
    setLoading(plan)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur lors du paiement')
      setLoading(null)
    }
  }

  async function handleManageBilling() {
    setLoading('portal')
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur')
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Abonnement</h1>
        <p className="text-gray-500 mt-1">Choisissez le plan adapté à votre activité</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Gratuit</CardTitle>
            <CardDescription>Pour démarrer</CardDescription>
            <div className="text-3xl font-bold text-gray-900">0€<span className="text-base font-normal text-gray-500">/mois</span></div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              {['3 clients', '3 projets', '5 factures/mois', '5 devis/mois', 'Export PDF'].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" /> {f}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full mt-6" disabled>Plan actuel</Button>
          </CardContent>
        </Card>

        {/* Starter */}
        <Card className="border-2 border-blue-500 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            Recommandé
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" /> {PLANS.starter.name}
            </CardTitle>
            <CardDescription>Pour les freelances actifs</CardDescription>
            <div className="text-3xl font-bold text-gray-900">{PLANS.starter.price}€<span className="text-base font-normal text-gray-500">/mois</span></div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              {PLANS.starter.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" /> {f}
                </li>
              ))}
            </ul>
            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700" onClick={() => handleSubscribe('starter')} disabled={!!loading}>
              {loading === 'starter' ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Redirection...</> : 'Commencer — 19€/mois'}
            </Button>
          </CardContent>
        </Card>

        {/* Pro */}
        <Card className="border-2 border-purple-300 md:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-600" /> {PLANS.pro.name}
              </CardTitle>
              <CardDescription>Pour les freelances et agences à fort volume</CardDescription>
              <div className="text-3xl font-bold text-gray-900 mt-2">{PLANS.pro.price}€<span className="text-base font-normal text-gray-500">/mois</span></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {PLANS.pro.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-purple-500 shrink-0" /> {f}
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-6 border-purple-300 hover:bg-purple-50" onClick={() => handleSubscribe('pro')} disabled={!!loading}>
              {loading === 'pro' ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Redirection...</> : 'Passer au Pro — 39€/mois'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">Gérer mon abonnement, changer de plan ou annuler</p>
          <Button variant="outline" onClick={handleManageBilling} disabled={loading === 'portal'}>
            {loading === 'portal' ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Chargement...</> : 'Portail de facturation'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
