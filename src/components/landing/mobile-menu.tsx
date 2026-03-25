'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Zap } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="md:hidden fixed inset-0 top-[65px] z-40 bg-white border-t border-gray-100">
          <div className="flex flex-col p-6 gap-1">
            <Link
              href="#features"
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-colors"
            >
              Comment ça marche
            </Link>
            <Link
              href="#pricing"
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-colors"
            >
              Tarifs
            </Link>
            <Link
              href="#faq"
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-colors"
            >
              FAQ
            </Link>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
              <ButtonLink
                href="/login"
                variant="outline"
                className="w-full justify-center h-11 text-base"
                onClick={() => setOpen(false)}
              >
                Connexion
              </ButtonLink>
              <ButtonLink
                href="/register"
                className="w-full justify-center h-11 text-base bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setOpen(false)}
              >
                Essai gratuit — c&apos;est gratuit
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
