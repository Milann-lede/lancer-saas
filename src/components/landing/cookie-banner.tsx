'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const choice = localStorage.getItem('cookie-consent')
      if (!choice) {
        setVisible(true)
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem('cookie-consent', 'accepted')
    } catch {}
    setVisible(false)
  }

  function refuse() {
    try {
      localStorage.setItem('cookie-consent', 'refused')
    } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre{' '}
            <Link href="/confidentialite" className="text-blue-600 underline underline-offset-2 hover:text-blue-700">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={refuse}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
