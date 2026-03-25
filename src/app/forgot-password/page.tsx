'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { resetPassword } from '@/actions/auth'
import { Loader2, Zap } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition()
  const [sent, setSent] = useState(false)

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await resetPassword(formData)
      if (result?.error) {
        toast.error(result.error)
      } else {
        setSent(true)
        toast.success('Email envoyé !')
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            Lancer
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Mot de passe oublié</CardTitle>
            <CardDescription>Entre ton email pour recevoir un lien de réinitialisation</CardDescription>
          </CardHeader>

          {sent ? (
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-700 text-sm">
                Email envoyé ! Vérifie ta boîte de réception.
              </div>
            </CardContent>
          ) : (
            <form action={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="marie@example.com" required disabled={isPending} />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Envoi...</> : 'Envoyer le lien'}
                </Button>
              </CardFooter>
            </form>
          )}

          <CardFooter>
            <Link href="/login" className="text-sm text-blue-600 hover:underline mx-auto">
              Retour à la connexion
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
