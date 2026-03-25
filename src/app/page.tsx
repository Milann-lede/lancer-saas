import Link from 'next/link'
import { ButtonLink } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Zap, CheckCircle, ArrowRight, Receipt, Users,
  Sparkles, Bell, TrendingUp, Shield, Star,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            Lancer
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="#features" className="hover:text-gray-900">Fonctionnalités</Link>
            <Link href="#pricing" className="hover:text-gray-900">Tarifs</Link>
            <Link href="#faq" className="hover:text-gray-900">FAQ</Link>
          </div>
          <div className="flex items-center gap-3">
            <ButtonLink href="/login" variant="ghost" size="sm">Connexion</ButtonLink>
            <ButtonLink href="/register" size="sm" className="bg-blue-600 hover:bg-blue-700">Essai gratuit</ButtonLink>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm px-4 py-2 rounded-full mb-8 font-medium">
          <Sparkles className="w-4 h-4" />
          Génération IA de devis en 30 secondes
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Arrête de perdre du temps<br />
          <span className="text-blue-600">sur ton admin.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Lancer automatise ta facturation, tes relances et tes devis.
          Tu te concentres sur ce qui rapporte. L&apos;admin se gère tout seul.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ButtonLink href="/register" size="lg" className="bg-blue-600 hover:bg-blue-700 text-base px-8 h-12">
            Commencer gratuitement <ArrowRight className="w-4 h-4 ml-2" />
          </ButtonLink>
          <ButtonLink href="/login" variant="outline" size="lg" className="text-base px-8 h-12">Voir une démo</ButtonLink>
        </div>
        <p className="text-sm text-gray-400 mt-4">Aucune carte bancaire requise · Gratuit pour toujours</p>

        {/* Dashboard preview mockup */}
        <div className="mt-16 rounded-2xl border border-gray-200 overflow-hidden shadow-2xl bg-gray-50">
          <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 mx-4 bg-white rounded px-3 py-1 text-xs text-gray-400">app.lancer.co/dashboard</div>
          </div>
          <div className="p-8 grid grid-cols-3 gap-4">
            {[
              { label: 'Revenus du mois', value: '8 450 €', color: 'text-green-600' },
              { label: 'Impayés', value: '2 100 €', color: 'text-yellow-600' },
              { label: 'Projets actifs', value: '6', color: 'text-blue-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 text-left border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 mb-4">Rejoins plus de 1 200 freelances qui ont repris le contrôle de leur business</p>
          <div className="flex items-center justify-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-gray-600">4.9/5 · 340+ avis</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tout ce dont tu as besoin, rien de plus</h2>
          <p className="text-gray-500 text-lg">Conçu pour les freelances qui veulent gérer leur business sans y passer leur vie.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: 'Devis IA en 30 secondes',
              desc: "Décris ton projet, l'IA génère un devis professionnel complet avec les bonnes lignes et les bons tarifs.",
              color: 'bg-blue-50 text-blue-600',
            },
            {
              icon: Receipt,
              title: 'Facturation automatique',
              desc: 'Convertis un devis accepté en facture en un clic. Numérotation automatique, PDF prêt à envoyer.',
              color: 'bg-green-50 text-green-600',
            },
            {
              icon: Bell,
              title: 'Relances automatiques',
              desc: "Plus jamais de facture impayée. Lancer relance tes clients à J+7, J+14 et J+30 automatiquement.",
              color: 'bg-yellow-50 text-yellow-600',
            },
            {
              icon: Users,
              title: 'Gestion des clients',
              desc: 'Centralise toutes les infos de tes clients : contacts, historique, notes, projets liés.',
              color: 'bg-purple-50 text-purple-600',
            },
            {
              icon: TrendingUp,
              title: 'Tableau de bord',
              desc: "Revenus du mois, impayés, projets actifs. Tout d'un coup d'oeil, sans tableau Excel.",
              color: 'bg-indigo-50 text-indigo-600',
            },
            {
              icon: Shield,
              title: 'Conforme et sécurisé',
              desc: 'Conformité française (mentions légales, TVA, SIRET). Données chiffrées et hébergées en Europe.',
              color: 'bg-red-50 text-red-600',
            },
          ].map((feature) => (
            <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment ça marche</h2>
            <p className="text-gray-500 text-lg">Opérationnel en moins de 5 minutes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Crée ton compte', desc: 'Inscription gratuite, aucune carte requise. Configure ton profil en 2 minutes.' },
              { step: '2', title: 'Ajoute tes clients', desc: 'Importe ou crée tes clients. Lie-les à des projets pour un suivi complet.' },
              { step: '3', title: 'Génère et envoie', desc: 'Devis IA, factures automatiques, relances — tout se fait depuis le dashboard.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Ce qu&apos;ils en disent</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Sophie M.', role: 'Développeuse freelance', text: "J'ai récupéré 6h par semaine sur mon admin. Les relances automatiques ont réduit mes impayés de 80%." },
            { name: 'Thomas L.', role: 'Designer UI/UX', text: 'La génération IA de devis est bluffante. En 30 secondes, j\'ai un devis professionnel que j\'aurais mis 2h à faire.' },
            { name: 'Marie C.', role: 'Consultante marketing', text: 'Enfin un outil pensé pour les indépendants français. Les mentions légales et la TVA sont gérées automatiquement.' },
          ].map((t) => (
            <Card key={t.name} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tarifs simples et transparents</h2>
            <p className="text-gray-500">Sans engagement. Sans surprise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-1">Gratuit</h3>
                <div className="text-3xl font-bold mb-4">0€</div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {['3 clients', '5 factures/mois', '5 devis/mois', 'Export PDF'].map((f) => (
                    <li key={f} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-400" /> {f}</li>
                  ))}
                </ul>
                <ButtonLink href="/register" variant="outline" className="w-full">Commencer</ButtonLink>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">Populaire</div>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-1">Starter</h3>
                <div className="text-3xl font-bold mb-1">19€</div>
                <p className="text-sm text-gray-400 mb-4">par mois</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {['Clients illimités', '20 factures/mois', 'Génération IA (50/mois)', 'Relances auto', 'Export PDF'].map((f) => (
                    <li key={f} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-500" /> {f}</li>
                  ))}
                </ul>
                <ButtonLink href="/register" className="w-full bg-blue-600 hover:bg-blue-700">Commencer</ButtonLink>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-1">Pro</h3>
                <div className="text-3xl font-bold mb-1">39€</div>
                <p className="text-sm text-gray-400 mb-4">par mois</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {['Tout Starter', 'Factures illimitées', 'IA illimitée', 'Signature élec.', 'Support prioritaire'].map((f) => (
                    <li key={f} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-500" /> {f}</li>
                  ))}
                </ul>
                <ButtonLink href="/register" variant="outline" className="w-full">Commencer</ButtonLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Questions fréquentes</h2>
        <div className="space-y-6">
          {[
            { q: 'Est-ce que mes factures sont conformes à la législation française ?', a: 'Oui. Lancer génère des factures avec toutes les mentions légales obligatoires : SIRET, TVA, numérotation séquentielle, conditions de paiement.' },
            { q: 'Puis-je importer mes données existantes ?', a: "Tu peux créer tes clients et projets manuellement. L'import CSV est disponible sur le plan Pro." },
            { q: "La génération IA est-elle vraiment efficace ?", a: 'L\'IA utilise GPT-4o et est entraînée sur des milliers de devis freelance réels. Le résultat est immédiatement utilisable dans 90% des cas.' },
            { q: "Puis-je annuler à tout moment ?", a: "Oui, sans engagement, sans frais de résiliation. Tu conserves l'accès jusqu'à la fin de la période payée." },
            { q: 'Mes données sont-elles sécurisées ?', a: 'Toutes les données sont chiffrées au repos et en transit. L\'hébergement est en Europe (Supabase/AWS Frankfurt).' },
          ].map((item) => (
            <div key={item.q} className="border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à reprendre le contrôle ?</h2>
          <p className="text-blue-100 text-lg mb-8">Rejoins 1 200+ freelances. Gratuit pour commencer.</p>
          <ButtonLink href="/register" size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-base px-8 h-12">
            Créer mon compte gratuit <ArrowRight className="w-4 h-4 ml-2" />
          </ButtonLink>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              Lancer
            </Link>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="#" className="hover:text-gray-900">Mentions légales</Link>
              <Link href="#" className="hover:text-gray-900">Confidentialité</Link>
              <Link href="#" className="hover:text-gray-900">CGV</Link>
              <Link href="mailto:hello@lancer.app" className="hover:text-gray-900">Contact</Link>
            </div>
            <p className="text-sm text-gray-400">© 2026 Lancer. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
