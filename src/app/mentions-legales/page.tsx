import Link from 'next/link'
import { Zap, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de Lancer — éditeur, hébergement, propriété intellectuelle.',
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentions légales</h1>
          <p className="text-gray-400 text-sm mb-10">Dernière mise à jour : 25 mars 2026</p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Éditeur du site</h2>
            <div className="text-gray-600 leading-relaxed space-y-1">
              <p><strong>Dénomination sociale :</strong> Lancer SAS</p>
              <p><strong>Forme juridique :</strong> Société par Actions Simplifiée</p>
              <p><strong>Capital social :</strong> 10 000 €</p>
              <p><strong>Siège social :</strong> 15 rue de la Paix, 75001 Paris, France</p>
              <p><strong>SIRET :</strong> En cours d&apos;immatriculation</p>
              <p><strong>N° TVA intracommunautaire :</strong> FR XX XXXXXXXXX</p>
              <p><strong>Directeur de la publication :</strong> Équipe Lancer</p>
              <p><strong>Email :</strong> <a href="mailto:hello@lancer.app" className="text-blue-600 hover:underline">hello@lancer.app</a></p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Hébergement</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <div>
                <p className="font-medium text-gray-800">Application web (frontend &amp; API) :</p>
                <p>Vercel Inc. — 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
                <p>Les serveurs de déploiement utilisés pour l&apos;Europe sont localisés dans la région EU.</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Base de données &amp; authentification :</p>
                <p>Supabase Inc. — via AWS Frankfurt (eu-central-1), Allemagne</p>
                <p>Les données personnelles des utilisateurs sont stockées exclusivement en Europe.</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed">
              L&apos;ensemble des éléments constituant le site Lancer (textes, graphismes, logotypes, icônes, images,
              éléments sonores, logiciels, code source, etc.) sont la propriété exclusive de Lancer SAS ou font
              l&apos;objet d&apos;une autorisation d&apos;utilisation. Toute reproduction, représentation, modification,
              publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé
              utilisé, est interdite sans l&apos;autorisation préalable et écrite de Lancer SAS.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Données personnelles &amp; RGPD</h2>
            <p className="text-gray-600 leading-relaxed">
              Le traitement des données personnelles des utilisateurs est décrit en détail dans notre{' '}
              <Link href="/confidentialite" className="text-blue-600 hover:underline">politique de confidentialité</Link>.
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et
              Libertés, vous disposez de droits d&apos;accès, de rectification, de suppression et de portabilité de vos données.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Le site Lancer utilise uniquement des cookies strictement nécessaires au fonctionnement du service
              (session d&apos;authentification, préférences d&apos;interface). Aucun cookie publicitaire ou de traçage
              tiers n&apos;est utilisé.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Vous pouvez gérer vos préférences via la bannière de consentement affichée lors de votre première visite,
              ou en contactant notre DPO à <a href="mailto:legal@lancer.app" className="text-blue-600 hover:underline">legal@lancer.app</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Limitation de responsabilité</h2>
            <p className="text-gray-600 leading-relaxed">
              Lancer SAS s&apos;efforce de fournir des informations aussi précises que possible sur ce site. Cependant,
              Lancer SAS ne pourra être tenue responsable des omissions, inexactitudes ou carences dans la mise à jour,
              qu&apos;elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
              Lancer SAS se réserve le droit de corriger, à tout moment et sans préavis, le contenu de ce site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Droit applicable</h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux
              français seront seuls compétents. Pour toute question, contactez-nous à{' '}
              <a href="mailto:hello@lancer.app" className="text-blue-600 hover:underline">hello@lancer.app</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
