'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { signIn, signUp } from '@/actions/auth'
import { Loader2, Zap } from 'lucide-react'

interface AuthFormProps {
  mode: 'login' | 'register'
}

export function AuthForm({ mode }: AuthFormProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setMessage(null)
    startTransition(async () => {
      const result = mode === 'login' ? await signIn(formData) : await signUp(formData)
      if (!result) return
      if ('error' in result && result.error) {
        setMessage({ type: 'error', text: result.error })
        toast.error(result.error)
      }
      if ('success' in result && result.success) {
        setMessage({ type: 'success', text: result.success })
        toast.success(result.success)
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
            <CardTitle className="text-2xl">
              {mode === 'login' ? 'Connexion' : 'Créer un compte'}
            </CardTitle>
            <CardDescription>
              {mode === 'login'
                ? 'Accède à ton espace de gestion'
                : 'Lance ton activité en moins de 2 minutes'}
            </CardDescription>
          </CardHeader>

          <form action={handleSubmit}>
            <CardContent className="space-y-4">
              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nom complet</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    placeholder="Marie Dupont"
                    required
                    disabled={isPending}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="marie@example.com"
                  required
                  disabled={isPending}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  {mode === 'login' && (
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  )}
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={mode === 'register' ? 'Minimum 8 caractères' : '••••••••'}
                  required
                  disabled={isPending}
                />
              </div>

              {message && (
                <div className={`rounded-md p-3 text-sm ${
                  message.type === 'error'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-green-50 text-green-700 border border-green-200'
                }`}>
                  {message.text}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Chargement...</>
                ) : mode === 'login' ? (
                  'Se connecter'
                ) : (
                  'Créer mon compte gratuitement'
                )}
              </Button>

              <p className="text-sm text-center text-gray-500">
                {mode === 'login' ? (
                  <>Pas encore de compte ?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline font-medium">
                      Inscription gratuite
                    </Link>
                  </>
                ) : (
                  <>Déjà un compte ?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline font-medium">
                      Se connecter
                    </Link>
                  </>
                )}
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
