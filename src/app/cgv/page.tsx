import Link from 'next/link'
import { Zap, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Conditions Générales de Vente de Lancer — tarifs, abonnements, résiliation et droits des utilisateurs.',
}

export default function CGVPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Conditions Générales de Vente</h1>
          <p className="text-gray-400 text-sm mb-10">Dernière mise à jour : 25 mars 2026</p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Objet</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre
              Lancer SAS (ci-après « Lancer ») et toute personne physique ou morale (ci-après « l&apos;Utilisateur »)
              souscrivant à un abonnement ou utilisant les services proposés sur la plateforme accessible à
              l&apos;adresse <strong>lancer-tau.vercel.app</strong>. Toute utilisation du service implique l&apos;acceptation
              pleine et entière des présentes CGV.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Prestataire</h2>
            <div className="text-gray-600 leading-relaxed space-y-1">
              <p><strong>Lancer SAS</strong></p>
              <p>15 rue de la Paix, 75001 Paris, France</p>
              <p>Email : <a href="mailto:hello@lancer.app" className="text-blue-600 hover:underline">hello@lancer.app</a></p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Services proposés</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Lancer est une plateforme SaaS (Software as a Service) dédiée à la gestion administrative
              des freelances et indépendants. Elle propose notamment : gestion des clients et projets,
              création de devis et factures, génération par intelligence artificielle, relances automatiques,
              et tableau de bord analytique.
            </p>
            <div className="space-y-4">
              {[
                {
                  plan: 'Gratuit',
                  price: '0 €/mois',
                  features: ['3 clients', '5 factures par mois', '5 devis par mois', 'Export PDF'],
                  color: 'bg-gray-50 border-gray-200',
                },
                {
                  plan: 'Starter',
                  price: '19 €/mois HT',
                  features: ['Clients illimités', '20 factures par mois', 'Génération IA (50 devis/mois)', 'Relances automatiques', 'Export PDF'],
                  color: 'bg-blue-50 border-blue-200',
                },
                {
                  plan: 'Pro',
                  price: '39 €/mois HT',
                  features: ['Tout Starter', 'Factures illimitées', 'Génération IA illimitée', 'Signature électronique', 'Support prioritaire'],
                  color: 'bg-purple-50 border-purple-200',
                },
              ].map((p) => (
                <div key={p.plan} className={`border rounded-xl p-5 ${p.color}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">{p.plan}</span>
                    <span className="font-bold text-gray-800">{p.price}</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {p.features.map((f) => <li key={f}>• {f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Tarifs et paiement</h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                Les prix sont indiqués en euros hors taxes (HT). La TVA applicable est celle en vigueur en France
                au taux de 20 % pour les utilisateurs assujettis à la TVA.
              </p>
              <p>
                Le paiement s&apos;effectue par carte bancaire via <strong>Stripe</strong>, prestataire de paiement sécurisé.
                Lancer ne stocke aucune donnée bancaire. L&apos;abonnement est prélevé mensuellement à date anniversaire.
              </p>
              <p>
                En cas d&apos;échec de paiement, Lancer se réserve le droit de suspendre l&apos;accès aux fonctionnalités
                payantes dans un délai de 7 jours, après notification par email.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Durée et renouvellement</h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                L&apos;abonnement est souscrit pour une durée d&apos;un mois, renouvelable tacitement par période d&apos;un mois,
                sauf résiliation par l&apos;Utilisateur avant la date d&apos;échéance.
              </p>
              <p>
                Les abonnements annuels (s&apos;ils sont proposés) sont renouvelables tacitement par période d&apos;un an.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Résiliation</h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                <strong>Sans engagement :</strong> L&apos;Utilisateur peut résilier son abonnement à tout moment,
                directement depuis son espace personnel (Paramètres → Facturation → Gérer l&apos;abonnement), sans
                frais ni délai de préavis.
              </p>
              <p>
                <strong>Accès après résiliation :</strong> L&apos;accès aux fonctionnalités payantes est maintenu
                jusqu&apos;à la fin de la période en cours déjà payée. Aucun remboursement prorata temporis n&apos;est effectué.
              </p>
              <p>
                <strong>Données après résiliation :</strong> L&apos;Utilisateur dispose de 30 jours après résiliation
                pour exporter ses données. Au-delà, les données pourront être supprimées conformément à notre{' '}
                <Link href="/confidentialite" className="text-blue-600 hover:underline">politique de confidentialité</Link>.
              </p>
              <p>
                <strong>Résiliation par Lancer :</strong> Lancer se réserve le droit de résilier le compte d&apos;un
                Utilisateur en cas de violation des présentes CGV, de fraude avérée ou d&apos;utilisation abusive du service.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Droit de rétractation</h2>
            <p className="text-gray-600 leading-relaxed">
              Conformément à l&apos;article L. 221-18 du Code de la consommation, l&apos;Utilisateur consommateur dispose
              d&apos;un délai de rétractation de <strong>14 jours</strong> à compter de la souscription de l&apos;abonnement,
              sans avoir à justifier de motifs. Ce délai peut être réduit si l&apos;Utilisateur a expressément demandé
              l&apos;exécution du service avant l&apos;expiration de ce délai (accès immédiat à la plateforme).
              Pour exercer ce droit, contactez-nous à{' '}
              <a href="mailto:hello@lancer.app" className="text-blue-600 hover:underline">hello@lancer.app</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Disponibilité du service</h2>
            <p className="text-gray-600 leading-relaxed">
              Lancer s&apos;engage à maintenir le service disponible 24h/24, 7j/7, sauf en cas de maintenance planifiée
              (annoncée au minimum 48h à l&apos;avance par email) ou d&apos;incident technique indépendant de sa volonté.
              Lancer ne saurait être responsable des interruptions de service dues à des tiers (hébergeur, réseau Internet).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Responsabilité</h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                Lancer est une obligation de moyens et non de résultats. La responsabilité de Lancer ne pourra
                être engagée qu&apos;en cas de faute lourde ou de dol de sa part.
              </p>
              <p>
                L&apos;Utilisateur est seul responsable de l&apos;exactitude des données saisies (informations clients,
                montants, TVA, mentions légales de ses propres factures). Lancer fournit des outils mais ne vérifie
                pas la conformité fiscale des documents générés par l&apos;Utilisateur.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Données personnelles</h2>
            <p className="text-gray-600 leading-relaxed">
              Le traitement des données personnelles est décrit dans notre{' '}
              <Link href="/confidentialite" className="text-blue-600 hover:underline">politique de confidentialité</Link>,
              conforme au RGPD.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Modification des CGV</h2>
            <p className="text-gray-600 leading-relaxed">
              Lancer se réserve le droit de modifier les présentes CGV à tout moment. Les Utilisateurs seront
              informés par email au moins 30 jours avant l&apos;entrée en vigueur de toute modification substantielle.
              La poursuite de l&apos;utilisation du service après cette date vaut acceptation des nouvelles CGV.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Droit applicable et juridiction</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes CGV sont soumises au droit français. En cas de litige, les parties s&apos;efforceront
              de trouver une solution amiable. À défaut, les tribunaux compétents du ressort de Paris seront
              seuls compétents. Pour les litiges de consommation, l&apos;Utilisateur peut également recourir à la
              médiation (médiateur de la consommation agréé).
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
