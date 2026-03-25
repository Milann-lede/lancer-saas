import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Lancer — Gestion business pour freelances',
    template: '%s | Lancer',
  },
  description: 'Gérez vos clients, projets, devis et factures en un seul endroit. Automatisez votre admin et concentrez-vous sur votre métier.',
  keywords: ['freelance', 'facturation', 'devis', 'gestion clients', 'SaaS'],
  openGraph: {
    title: 'Lancer — Gestion business pour freelances',
    description: 'Gérez vos clients, projets, devis et factures en un seul endroit.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
