import Link from 'next/link'
import { Zap, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et de traitement des données personnelles de Lancer — conforme RGPD.',
}

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            Lancer
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Politique de confidentialité</h1>
          <p className="text-gray-400 text-sm mb-10">Dernière mise à jour : 25 mars 2026</p>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-10">
            <p className="text-blue-800 text-sm leading-relaxed">
              <strong>En résumé :</strong> Lancer collecte uniquement les données nécessaires à la fourniture du service.
              Vos données sont hébergées en Europe, ne sont jamais vendues à des tiers, et vous pouvez les supprimer à tout moment.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Responsable du traitement</h2>
            <div className="text-gray-600 leading-relaxed space-y-1">
              <p><strong>Lancer SAS</strong></p>
              <p>15 rue de la Paix, 75001 Paris, France</p>
              <p>Email DPO : <a href="mailto:legal@lancer.app" className="text-blue-600 hover:underline">legal@lancer.app</a></p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Données collectées</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <div>
                <p className="font-medium text-gray-800 mb-2">2.1 Données de compte</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Nom complet et adresse email (inscription)</li>
                  <li>Mot de passe (stocké de façon chiffrée, jamais en clair)</li>
                  <li>Informations de profil (nom d&apos;entreprise, SIRET, adresse)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-2">2.2 Données métier</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Informations clients (nom, email, société, adresse)</li>
                  <li>Projets, devis et factures créés sur la plateforme</li>
                  <li>Lignes de prestation et montants</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-2">2.3 Données de paiement</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Informations de facturation (gérées exclusivement par Stripe)</li>
                  <li>Lancer ne stocke jamais de numéro de carte bancaire</li>
                  <li>Identifiant client Stripe (token de référence)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-2">2.4 Données techniques</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Adresse IP (journaux de connexion, conservation 30 jours)</li>
                  <li>Informations de session et token d&apos;authentification</li>
                  <li>Logs d&apos;erreurs (sans données personnelles)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Finalités et base légale</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 text-gray-800 font-semibold">Finalité</th>
                    <th className="text-left p-3 border border-gray-200 text-gray-800 font-semibold">Base légale</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Fourniture du service (compte, facturation, devis)', 'Exécution du contrat'],
                    ['Envoi d\'emails transactionnels (factures, relances)', 'Exécution du contrat'],
                    ['Gestion des abonnements et paiements', 'Exécution du contrat'],
                    ['Génération IA de devis via OpenAI', 'Exécution du contrat + consentement'],
                    ['Amélioration du produit (logs anonymisés)', 'Intérêt légitime'],
                    ['Conformité légale et fiscale', 'Obligation légale'],
                  ].map(([finalite, base]) => (
                    <tr key={finalite}>
                      <td className="p-3 border border-gray-200">{finalite}</td>
                      <td className="p-3 border border-gray-200 text-blue-700">{base}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Durée de conservation</h2>
            <div className="text-gray-600 leading-relaxed space-y-2">
              <p><strong>Données de compte :</strong> Durée de l&apos;abonnement + 3 ans après résiliation (obligation légale)</p>
              <p><strong>Données de facturation :</strong> 10 ans (obligation comptable française)</p>
              <p><strong>Logs techniques :</strong> 30 jours glissants</p>
              <p><strong>Données clients saisis :</strong> Durée du compte + 3 ans</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Partage des données</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Lancer ne vend jamais vos données. Nous partageons uniquement ce qui est strictement nécessaire
              avec nos sous-traitants techniques, tous encadrés par un accord de traitement des données :
            </p>
            <div className="space-y-3">
              {[
                { name: 'Supabase', role: 'Base de données et authentification', location: 'AWS Frankfurt, EU' },
                { name: 'Stripe', role: 'Paiements et abonnements', location: 'USA (clauses contractuelles types)' },
                { name: 'Resend', role: 'Envoi d\'emails transactionnels', location: 'USA (clauses contractuelles types)' },
                { name: 'OpenAI', role: 'Génération IA de devis (plans payants uniquement)', location: 'USA (clauses contractuelles types)' },
                { name: 'Vercel', role: 'Hébergement de l\'application', location: 'USA + edge EU' },
              ].map((p) => (
                <div key={p.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 bg-gray-50 rounded-lg p-4">
                  <span className="font-semibold text-gray-800 w-24 shrink-0">{p.name}</span>
                  <span className="text-gray-600 flex-1">{p.role}</span>
                  <span className="text-xs text-gray-400 shrink-0">{p.location}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Vos droits</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { right: '✅ Droit d\'accès', desc: 'Obtenir une copie de vos données' },
                { right: '✏️ Droit de rectification', desc: 'Corriger vos données inexactes' },
                { right: '🗑️ Droit à l\'effacement', desc: 'Supprimer votre compte et données' },
                { right: '📦 Droit à la portabilité', desc: 'Exporter vos données (JSON/CSV)' },
                { right: '🚫 Droit d\'opposition', desc: 'Opposer à certains traitements' },
                { right: '⏸️ Droit de limitation', desc: 'Limiter le traitement de vos données' },
              ].map((r) => (
                <div key={r.right} className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-800 text-sm">{r.right}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{r.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Pour exercer vos droits, contactez notre DPO à{' '}
              <a href="mailto:legal@lancer.app" className="text-blue-600 hover:underline">legal@lancer.app</a>.
              Réponse garantie sous 30 jours. Vous pouvez également introduire une réclamation auprès de la{' '}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CNIL</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Cookies</h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>Lancer utilise uniquement des cookies fonctionnels, strictement nécessaires :</p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">sb-auth-token</span>
                  <span className="text-gray-500">Session Supabase — expire à la déconnexion</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">cookie-consent</span>
                  <span className="text-gray-500">Préférence cookies — 12 mois</span>
                </div>
              </div>
              <p>Aucun cookie publicitaire, aucun pixel de tracking, aucun outil d&apos;analytics tiers.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Pour toute question relative à cette politique ou à vos données personnelles :{' '}
              <a href="mailto:legal@lancer.app" className="text-blue-600 hover:underline">legal@lancer.app</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
