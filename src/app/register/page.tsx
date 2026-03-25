import { Metadata } from 'next'
import { AuthForm } from '@/components/auth/auth-form'

export const metadata: Metadata = { title: 'Inscription' }

export default function RegisterPage() {
  return <AuthForm mode="register" />
}
