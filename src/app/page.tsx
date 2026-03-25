import Link from 'next/link'
import { ButtonLink } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MobileMenu } from '@/components/landing/mobile-menu'
import {
  Zap, CheckCircle, ArrowRight, Receipt, Users,
  Sparkles, Bell, TrendingUp, Shield, Star,
  Clock, AlertCircle, FileText, ChevronDown,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ============================================================
          NAV
      ============================================================ */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span>Lancer</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="#features" className="hover:text-gray-900 transition-colors">Fonctionnalités</Link>
            <Link href="#how-it-works" className="hover:text-gray-900 transition-colors">Comment ça marche</Link>
            <Link href="#pricing" className="hover:text-gray-900 transition-colors">Tarifs</Link>
            <Link href="#faq" className="hover:text-gray-900 transition-colors">FAQ</Link>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <ButtonLink href="/login" variant="ghost" size="sm" className="text-gray-600">
              Connexion
            </ButtonLink>
            <ButtonLink
              href="/register"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4"
            >
              Essai gratuit
            </ButtonLink>
          </div>

          {/* Mobile hamburger */}
          <MobileMenu />
        </div>
      </nav>

      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 60%, #2563eb 100%)' }}>
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm px-4 py-2 rounded-full mb-8 font-medium">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Nouveau : devis IA en 30 secondes chrono
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Arrête de perdre<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #93c5fd, #60a5fa)' }}>
              6h par semaine
            </span>
            <br />sur ton admin.
          </h1>

          {/* Subhead */}
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Lancer automatise ta facturation, tes relances clients et tes devis.
            Tu te concentres sur ton métier. Le reste se gère tout seul.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <ButtonLink
              href="/register"
              size="lg"
              className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 h-12 text-base shadow-lg shadow-blue-900/30"
            >
              Commencer gratuitement
              <ArrowRight className="w-4 h-4 ml-2" />
            </ButtonLink>
            <ButtonLink
              href="#dashboard-preview"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-8 h-12 text-base"
            >
              Voir le dashboard
            </ButtonLink>
          </div>

          {/* Social proof line */}
          <div className="flex items-center justify-center gap-3 mb-14">
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {[
                { initials: 'SM', bg: 'bg-purple-500' },
                { initials: 'TL', bg: 'bg-green-500' },
                { initials: 'MC', bg: 'bg-orange-500' },
                { initials: 'AB', bg: 'bg-pink-500' },
                { initials: 'JR', bg: 'bg-teal-500' },
              ].map((a) => (
                <div
                  key={a.initials}
                  className={`w-8 h-8 rounded-full ${a.bg} border-2 border-[#1e3a5f] flex items-center justify-center text-white text-xs font-bold`}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-blue-100">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold text-white">4.9/5</span>
              <span>· 1 200+ freelances</span>
            </div>
          </div>

          {/* Browser mockup */}
          <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-blue-900/50 bg-gray-900 max-w-4xl mx-auto">
            {/* Browser chrome */}
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 max-w-xs mx-auto bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 text-center">
                app.lancer.co/dashboard
              </div>
            </div>
            {/* Dashboard content */}
            <div className="bg-gray-50 p-4 sm:p-6">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Revenus du mois', value: '8 450 €', delta: '+12%', color: 'text-green-600', deltaBg: 'bg-green-50 text-green-700' },
                  { label: 'Impayés', value: '1 200 €', delta: '-43%', color: 'text-amber-600', deltaBg: 'bg-amber-50 text-amber-700' },
                  { label: 'Projets actifs', value: '6', delta: '+2', color: 'text-blue-600', deltaBg: 'bg-blue-50 text-blue-700' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-3 sm:p-4 text-left border border-gray-100 shadow-sm">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-1">{stat.label}</p>
                    <p className={`text-lg sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${stat.deltaBg}`}>{stat.delta}</span>
                  </div>
                ))}
              </div>
              {/* Mini chart bar */}
              <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100 shadow-sm mb-3">
                <p className="text-xs text-gray-500 mb-3">Revenus des 6 derniers mois</p>
                <div className="flex items-end gap-2 h-16">
                  {[40, 65, 55, 80, 72, 100].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm bg-blue-500" style={{ height: `${h}%`, opacity: i === 5 ? 1 : 0.4 + i * 0.1 }} />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  {['Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mars'].map((m) => (
                    <span key={m} className="text-[9px] text-gray-400">{m}</span>
                  ))}
                </div>
              </div>
              {/* Recent invoices */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-4 py-2.5 border-b border-gray-50 flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-700">Factures récentes</p>
                  <span className="text-[10px] text-blue-600 font-medium">Voir tout →</span>
                </div>
                {[
                  { client: 'Acme Corp', amount: '3 200 €', status: 'Payée', statusColor: 'bg-green-50 text-green-700' },
                  { client: 'TechStart', amount: '1 800 €', status: 'En attente', statusColor: 'bg-amber-50 text-amber-700' },
                  { client: 'Studio Kleo', amount: '950 €', status: 'Payée', statusColor: 'bg-green-50 text-green-700' },
                ].map((inv) => (
                  <div key={inv.client} className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[9px] font-bold text-blue-700">
                        {inv.client.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs text-gray-700">{inv.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-900">{inv.amount}</span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${inv.statusColor}`}>{inv.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="h-16 relative overflow-hidden -mb-1">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 64L1440 64L1440 0C1200 48 960 64 720 48C480 32 240 0 0 32V64Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ============================================================
          SOCIAL PROOF STRIP
      ============================================================ */}
      <section className="py-14 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm text-gray-400 mb-8 uppercase tracking-widest font-medium">
            Déjà adoptés par des freelances qui travaillent avec
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {['Publicis', 'ManoMano', 'Contentsquare', 'Alma', 'Doctrine', 'Pennylane', 'Spendesk'].map((name) => (
              <span key={name} className="text-gray-300 font-semibold text-lg tracking-tight hover:text-gray-400 transition-colors">
                {name}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">4.9/5</span>
              <span className="text-sm text-gray-500">· 340+ avis vérifiés</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-gray-200" />
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">1 200+</span> freelances actifs
            </p>
            <div className="hidden sm:block w-px h-5 bg-gray-200" />
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">98%</span> de taux de satisfaction
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          PAIN POINTS
      ============================================================ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Le problème</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">Tu te reconnais ?</h2>
            <p className="text-gray-500 text-lg">La vie d&apos;un freelance, c&apos;est 80% de vrai travail et 20% d&apos;admin qui bouffe ton temps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: '⏰',
                title: "Tu passes des heures sur l'admin",
                desc: "Relancer un client par mail, refaire une facture à la main, chercher un vieux devis dans tes mails... Tu perds entre 5 et 8 heures par semaine sur des tâches sans valeur ajoutée.",
                stat: '6h/semaine perdues',
              },
              {
                emoji: '💸',
                title: 'Tes clients ne paient pas à temps',
                desc: "En France, 30% des factures freelance sont payées en retard. Tu dois relancer, parfois 3 ou 4 fois, en espérant ne pas froisser un client. C'est épuisant et ça nuit à ta trésorerie.",
                stat: '30% des factures impayées',
              },
              {
                emoji: '📄',
                title: 'Tu refais tout de zéro à chaque fois',
                desc: "Nouveau client, nouveau devis… tu reprends le même template Word, tu corriges les fautes, tu recalcules la TVA. Et si tu oublies une mention légale obligatoire, tu es exposé juridiquement.",
                stat: '45min par devis en moyenne',
              },
            ].map((pain) => (
              <div key={pain.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{pain.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{pain.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{pain.desc}</p>
                <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {pain.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SOLUTION
      ============================================================ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">La solution</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">Lancer gère tout ça à ta place</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              On a pris les 3 problèmes les plus douloureux du quotidien freelance. Et on les a automatisés entièrement.
            </p>
          </div>
          <div className="space-y-8">
            {[
              {
                emoji: '⏰',
                color: 'bg-blue-600',
                title: "L'admin en 5 minutes, pas en 5 heures",
                desc: "Lancer centralise tout : clients, projets, devis, factures. Plus besoin de chercher dans tes mails ou tes dossiers. Tout est là, organisé, prêt à utiliser.",
                cta: 'Explorer les fonctionnalités',
                href: '#features',
              },
              {
                emoji: '💸',
                color: 'bg-green-600',
                title: 'Les relances se font sans toi',
                desc: "Configure une fois les scénarios de relance (J+7, J+14, J+30). Lancer envoie des emails professionnels à tes clients automatiquement. Tes impayés fondent sans que tu aies à intervenir.",
                cta: 'Voir la démo relances',
                href: '/register',
              },
              {
                emoji: '📄',
                color: 'bg-purple-600',
                title: 'Un devis pro en 30 secondes avec l\'IA',
                desc: "Tu décris ton projet en langage naturel. L'IA génère un devis complet avec les bonnes lignes, les bons tarifs et toutes les mentions légales françaises obligatoires. Tu valides, tu envoies.",
                cta: 'Essayer l\'IA gratuitement',
                href: '/register',
              },
            ].map((sol, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className={`shrink-0 w-12 h-12 ${sol.color} rounded-2xl flex items-center justify-center text-xl shadow-sm`}>
                  {sol.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{sol.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-3">{sol.desc}</p>
                  <Link href={sol.href} className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                    {sol.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURES GRID
      ============================================================ */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Fonctionnalités</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">Tout ce dont tu as besoin, rien de superflu</h2>
            <p className="text-gray-500 text-lg">Conçu pour les freelances français qui veulent un outil efficace, pas une usine à gaz.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Devis IA en 30 secondes',
                desc: "Décris ton projet en langage naturel. GPT-4o génère un devis professionnel complet avec mentions légales, conditions de paiement et calcul automatique de la TVA.",
                color: 'bg-blue-50 text-blue-600',
                badge: 'IA',
                badgeColor: 'bg-blue-100 text-blue-700',
              },
              {
                icon: Receipt,
                title: 'Facturation automatique',
                desc: 'Convertis un devis accepté en facture en un clic. Numérotation séquentielle conforme, PDF professionnel prêt à envoyer, archivage automatique.',
                color: 'bg-green-50 text-green-600',
                badge: null,
                badgeColor: '',
              },
              {
                icon: Bell,
                title: 'Relances sans effort',
                desc: "Configure des scénarios de relance : J+7 rappel poli, J+14 relance ferme, J+30 mise en demeure. Lancer envoie tout automatiquement à ta place.",
                color: 'bg-amber-50 text-amber-600',
                badge: 'Auto',
                badgeColor: 'bg-amber-100 text-amber-700',
              },
              {
                icon: Users,
                title: 'Gestion des clients',
                desc: 'Centralise tous tes clients : coordonnées, SIRET, historique complet, notes internes, projets liés. Retrouve tout en quelques secondes.',
                color: 'bg-purple-50 text-purple-600',
                badge: null,
                badgeColor: '',
              },
              {
                icon: TrendingUp,
                title: 'Dashboard temps réel',
                desc: "Revenus du mois, taux de recouvrement, projets actifs, impayés. Un tableau de bord qui te donne une vision claire de ta santé financière — sans Excel.",
                color: 'bg-indigo-50 text-indigo-600',
                badge: null,
                badgeColor: '',
              },
              {
                icon: Shield,
                title: 'Conforme RGPD & droit français',
                desc: "Toutes les mentions légales obligatoires incluses (SIRET, TVA, délais de paiement). Données chiffrées, hébergées en Europe. Tu es protégé, tes clients aussi.",
                color: 'bg-red-50 text-red-600',
                badge: 'RGPD',
                badgeColor: 'bg-red-100 text-red-700',
              },
            ].map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${feature.color} flex items-center justify-center`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    {feature.badge && (
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${feature.badgeColor}`}>
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mid-page CTA */}
          <div className="mt-12 text-center">
            <ButtonLink
              href="/register"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-base"
            >
              Tout essayer gratuitement
              <ArrowRight className="w-4 h-4 ml-2" />
            </ButtonLink>
            <p className="text-sm text-gray-400 mt-3">Aucune carte bancaire requise · Annulation à tout moment</p>
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS
      ============================================================ */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Simple</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">Opérationnel en moins de 5 minutes</h2>
            <p className="text-gray-500 text-lg">Pas de formation, pas de configuration longue. Tu es prêt en quelques clics.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-gray-200" style={{ left: '16.67%', right: '16.67%' }} />

            {[
              {
                step: '1',
                icon: Zap,
                title: 'Crée ton compte',
                desc: "Inscription gratuite en 60 secondes. Renseigne ton SIRET, ton taux de TVA habituel, tes informations bancaires. Tu es prêt.",
                duration: '< 2 min',
              },
              {
                step: '2',
                icon: Users,
                title: 'Ajoute tes clients',
                desc: "Crée tes clients ou importe-les. Chaque client a son espace : coordonnées, SIRET, historique des projets et factures associés.",
                duration: '< 2 min',
              },
              {
                step: '3',
                icon: TrendingUp,
                title: 'Génère, envoie, encaisse',
                desc: "Crée un devis avec l'IA, envoie-le, convertis-le en facture d'un clic. Les relances se gèrent automatiquement. Tu encaisses.",
                duration: '< 1 min',
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black mb-5 shadow-lg shadow-blue-200 z-10">
                  {item.step}
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {item.duration}
                </span>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          DASHBOARD PREVIEW (large)
      ============================================================ */}
      <section id="dashboard-preview" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">Aperçu produit</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">Ton business, d&apos;un seul coup d&apos;œil</h2>
            <p className="text-gray-400 text-lg">Un tableau de bord pensé pour les freelances. Pas pour les comptables.</p>
          </div>

          {/* Large browser mockup */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* Browser bar */}
            <div className="bg-gray-800 px-5 py-3.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 max-w-sm mx-auto bg-gray-700 rounded-md px-4 py-1.5 text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                app.lancer.co/dashboard
              </div>
            </div>

            {/* App layout */}
            <div className="bg-gray-50 flex min-h-[420px]">
              {/* Sidebar */}
              <div className="hidden sm:flex w-48 bg-white border-r border-gray-100 flex-col p-4 gap-1">
                <div className="flex items-center gap-2 px-2 py-2 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-bold text-sm text-gray-900">Lancer</span>
                </div>
                {[
                  { label: 'Dashboard', active: true, icon: TrendingUp },
                  { label: 'Clients', active: false, icon: Users },
                  { label: 'Factures', active: false, icon: Receipt },
                  { label: 'Devis', active: false, icon: FileText },
                  { label: 'Relances', active: false, icon: Bell },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      item.active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-4 sm:p-6 overflow-auto">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-bold text-gray-900">Bonjour, Sophie 👋</h3>
                    <p className="text-xs text-gray-500">Mars 2026</p>
                  </div>
                  <ButtonLink href="/register" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                    + Nouvelle facture
                  </ButtonLink>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: 'Revenus mars', value: '8 450 €', color: 'text-green-600', icon: TrendingUp, iconBg: 'bg-green-50 text-green-600' },
                    { label: 'Impayés', value: '1 200 €', color: 'text-amber-600', icon: AlertCircle, iconBg: 'bg-amber-50 text-amber-600' },
                    { label: 'Clients actifs', value: '12', color: 'text-blue-600', icon: Users, iconBg: 'bg-blue-50 text-blue-600' },
                    { label: 'Projets en cours', value: '4', color: 'text-purple-600', icon: Zap, iconBg: 'bg-purple-50 text-purple-600' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] text-gray-500">{s.label}</p>
                        <div className={`w-6 h-6 rounded-lg ${s.iconBg} flex items-center justify-center`}>
                          <s.icon className="w-3 h-3" />
                        </div>
                      </div>
                      <p className={`text-base sm:text-lg font-bold ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Invoices table */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">Factures récentes</p>
                    <span className="text-xs text-blue-600 font-medium cursor-pointer hover:text-blue-700">Voir toutes →</span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {[
                      { num: 'FA-2026-012', client: 'Acme Corp', amount: '3 200 €', date: '15 mars', status: 'Payée', statusColor: 'bg-green-50 text-green-700' },
                      { num: 'FA-2026-011', client: 'TechStart', amount: '1 800 €', date: '8 mars', status: 'En attente', statusColor: 'bg-amber-50 text-amber-700' },
                      { num: 'FA-2026-010', client: 'Studio Kleo', amount: '950 €', date: '1 mars', status: 'Payée', statusColor: 'bg-green-50 text-green-700' },
                      { num: 'FA-2026-009', client: 'Novaxis', amount: '2 500 €', date: '22 fév.', status: 'Relancée', statusColor: 'bg-blue-50 text-blue-700' },
                    ].map((inv) => (
                      <div key={inv.num} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700 hidden sm:flex">
                            {inv.client.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-900">{inv.client}</p>
                            <p className="text-[10px] text-gray-400">{inv.num} · {inv.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-900">{inv.amount}</span>
                          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${inv.statusColor} hidden sm:inline`}>
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIALS
      ============================================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Témoignages</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">Ce qu&apos;ils en disent</h2>
            <p className="text-gray-500 text-lg">Des freelances comme toi, qui ont arrêté de souffrir sur leur admin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                initials: 'SM',
                name: 'Sophie M.',
                role: 'Développeuse freelance',
                company: 'React / Node.js',
                bg: 'bg-purple-500',
                text: "J'ai récupéré 6h par semaine sur mon admin. Les relances automatiques ont réduit mes impayés de 80% en 2 mois. Je regrette de ne pas avoir découvert ça plus tôt.",
                stat: '6h récupérées/semaine',
              },
              {
                initials: 'TL',
                name: 'Thomas L.',
                role: 'Designer UI/UX',
                company: 'Studio indépendant',
                bg: 'bg-blue-500',
                text: "La génération IA de devis est bluffante. En 30 secondes, j'ai un devis professionnel que j'aurais mis 2 heures à faire. Mes clients me trouvent plus sérieux qu'avant.",
                stat: '-2h par devis',
              },
              {
                initials: 'MC',
                name: 'Marie C.',
                role: 'Consultante marketing',
                company: 'Growth & contenu',
                bg: 'bg-orange-500',
                text: "Enfin un outil pensé pour les indépendants français. Les mentions légales, la TVA, les numérotations séquentielles... tout est géré automatiquement. Je ne risque plus rien juridiquement.",
                stat: 'Zéro litige depuis 8 mois',
              },
            ].map((t) => (
              <Card key={t.name} className="border-0 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${t.bg} flex items-center justify-center text-white font-bold text-sm`}>
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.role} · {t.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-green-600">{t.stat}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PRICING
      ============================================================ */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Tarifs</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">Tarifs simples et transparents</h2>
            <p className="text-gray-500 text-lg">Sans engagement. Sans surprise. Tu peux annuler à tout moment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Free */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-7">
                <div className="mb-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Gratuit</h3>
                  <p className="text-sm text-gray-500">Pour tester et démarrer</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-black text-gray-900">0 €</span>
                  <span className="text-gray-500 text-sm ml-1">/ mois</span>
                </div>
                <ul className="space-y-3 mb-7">
                  {[
                    { text: '3 clients maximum', ok: true },
                    { text: '5 factures par mois', ok: true },
                    { text: '5 devis par mois', ok: true },
                    { text: 'Export PDF', ok: true },
                    { text: 'Génération IA', ok: false },
                    { text: 'Relances automatiques', ok: false },
                  ].map((f) => (
                    <li key={f.text} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle className={`w-4 h-4 shrink-0 ${f.ok ? 'text-gray-400' : 'text-gray-200'}`} />
                      <span className={f.ok ? 'text-gray-700' : 'text-gray-300'}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/register" variant="outline" className="w-full justify-center h-10">
                  Commencer gratuitement
                </ButtonLink>
              </CardContent>
            </Card>

            {/* Starter — highlighted */}
            <Card className="border-2 border-blue-500 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                ⭐ Le plus populaire
              </div>
              <CardContent className="p-7">
                <div className="mb-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Starter</h3>
                  <p className="text-sm text-gray-500">Pour les freelances actifs</p>
                </div>
                <div className="mb-1">
                  <span className="text-4xl font-black text-gray-900">19 €</span>
                  <span className="text-gray-500 text-sm ml-1">/ mois</span>
                </div>
                <p className="text-xs text-green-600 font-semibold mb-6">Rentabilisé dès la 1ère heure récupérée</p>
                <ul className="space-y-3 mb-7">
                  {[
                    'Clients illimités',
                    '20 factures par mois',
                    'Génération IA (50 devis/mois)',
                    'Relances automatiques',
                    'Export PDF professionnel',
                    'Dashboard complet',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle className="w-4 h-4 shrink-0 text-blue-500" />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href="/register"
                  className="w-full justify-center h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Commencer — 14j offerts
                </ButtonLink>
                <p className="text-center text-xs text-gray-400 mt-2">Sans carte bancaire</p>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-7">
                <div className="mb-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Pro</h3>
                  <p className="text-sm text-gray-500">Pour les freelances qui scalent</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-black text-gray-900">39 €</span>
                  <span className="text-gray-500 text-sm ml-1">/ mois</span>
                </div>
                <ul className="space-y-3 mb-7">
                  {[
                    'Tout le plan Starter',
                    'Factures illimitées',
                    'IA illimitée',
                    'Signature électronique',
                    'Import/export CSV',
                    'Support prioritaire 24h',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle className="w-4 h-4 shrink-0 text-purple-500" />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/register" variant="outline" className="w-full justify-center h-10">
                  Commencer
                </ButtonLink>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            Tous les prix sont HT · TVA applicable selon ton régime · Paiement sécurisé par Stripe
          </p>
        </div>
      </section>

      {/* ============================================================
          ROI SECTION
      ============================================================ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-red-500 uppercase tracking-widest">ROI</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">Combien tu perds chaque mois&nbsp;?</h2>
            <p className="text-gray-500 text-lg">Une petite arithmétique qui fait mal — et qui justifie l&apos;investissement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Loss calculation */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-7">
              <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center gap-2">
                <span className="text-red-500">⚠️</span> Sans Lancer
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Admin (6h × TJM 350€ ÷ 8h)', value: '262 €', sublabel: 'par semaine gaspillés' },
                  { label: 'Impayés moyens non relancés', value: '400 €', sublabel: 'par mois en trésorerie bloquée' },
                  { label: 'Devis perdus (trop long à faire)', value: '150 €', sublabel: 'par mois en opportunités ratées' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-red-100 last:border-0">
                    <div>
                      <p className="text-sm text-gray-700">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.sublabel}</p>
                    </div>
                    <span className="font-bold text-red-600 text-base">{item.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3">
                  <p className="font-bold text-gray-900">Perte mensuelle estimée</p>
                  <span className="font-black text-red-600 text-2xl">~812 €</span>
                </div>
              </div>
            </div>

            {/* Gain calculation */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-7">
              <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center gap-2">
                <span className="text-green-600">✅</span> Avec Lancer Starter
              </h3>
              <div className="space-y-4">
                {[
                  { label: '6h admin récupérées → travail facturable', value: '+840 €', sublabel: 'de CA en plus par mois' },
                  { label: 'Relances auto → taux recouvrement +80%', value: '-320 €', sublabel: "d'impayés récupérés" },
                  { label: 'Devis rapides → plus de missions signées', value: '+200 €', sublabel: 'de revenus supplémentaires' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-green-100 last:border-0">
                    <div>
                      <p className="text-sm text-gray-700">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.sublabel}</p>
                    </div>
                    <span className="font-bold text-green-600 text-base">{item.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <p className="font-bold text-gray-900">Gain net mensuel</p>
                    <p className="text-xs text-gray-400">Coût Lancer : 19 €/mois</p>
                  </div>
                  <span className="font-black text-green-600 text-2xl">~1 340 €</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 mb-6 text-lg">
              <span className="font-bold text-gray-900">ROI estimé : 70×</span> pour 19€/mois investis.
            </p>
            <ButtonLink
              href="/register"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-base"
            >
              Commencer à récupérer du temps
              <ArrowRight className="w-4 h-4 ml-2" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ
      ============================================================ */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">Questions fréquentes</h2>
            <p className="text-gray-500 text-lg">Ce que les freelances nous demandent avant de se lancer.</p>
          </div>
          <div className="space-y-0 divide-y divide-gray-200">
            {[
              {
                q: 'Est-ce que mes factures sont conformes à la législation française ?',
                a: "Oui, à 100%. Lancer génère des factures avec toutes les mentions légales obligatoires : SIRET, numéro de TVA intracommunautaire, numérotation séquentielle, date d'émission, conditions de paiement, pénalités de retard. Tu es couvert en cas de contrôle.",
              },
              {
                q: "La génération IA est-elle vraiment efficace ?",
                a: "L'IA utilise GPT-4o, entraîné sur des milliers de devis freelance réels français. Elle connaît les tarifs standards par domaine (dev, design, marketing...) et inclut automatiquement les bonnes mentions légales. Le résultat est immédiatement utilisable dans plus de 90% des cas — tu corrigeras juste les chiffres si nécessaire.",
              },
              {
                q: "Que se passe-t-il si j'annule mon abonnement ?",
                a: "Tu conserves l'accès à toutes tes données et fonctionnalités jusqu'à la fin de ta période d'abonnement. Après, tu bascules automatiquement sur le plan gratuit. Tes données restent accessibles, tu ne perds rien.",
              },
              {
                q: 'Puis-je importer mes clients et factures existants ?',
                a: "Tu peux créer tes clients manuellement (moins de 2 min chacun) ou utiliser l'import CSV disponible sur le plan Pro. Pour les factures existantes, on propose une migration assistée sur les plans payants — contacte-nous.",
              },
              {
                q: 'Mes données financières sont-elles sécurisées ?',
                a: "Absolument. Toutes les données sont chiffrées au repos (AES-256) et en transit (TLS 1.3). Hébergement en Europe (AWS Frankfurt via Supabase). On ne revend jamais tes données. Conformité RGPD complète. Tu peux demander l'export ou la suppression de tes données à tout moment.",
              },
            ].map((item, i) => (
              <details key={i} className="group py-5 cursor-pointer list-none">
                <summary className="flex items-center justify-between gap-4 font-semibold text-gray-900 cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="text-gray-500 text-sm leading-relaxed mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
      ============================================================ */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 60%, #2563eb 100%)' }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Prêt à reprendre le contrôle de ton business&nbsp;?
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Rejoins 1 200+ freelances qui ont échangé leurs soirées sur Excel contre plus de temps facturable.
            14 jours d&apos;essai gratuit, sans carte bancaire.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink
              href="/register"
              size="lg"
              className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 font-bold px-10 h-13 text-base shadow-xl shadow-blue-900/30"
            >
              Créer mon compte — c&apos;est gratuit
              <ArrowRight className="w-4 h-4 ml-2" />
            </ButtonLink>
            <ButtonLink
              href="/login"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-8 h-12 text-base"
            >
              J&apos;ai déjà un compte
            </ButtonLink>
          </div>
          <p className="text-blue-200/70 text-sm mt-6">Aucune carte bancaire · Gratuit pour commencer · Annulation en 1 clic</p>
        </div>
      </section>

      {/* ============================================================
          FOOTER
      ============================================================ */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                Lancer
              </Link>
              <p className="text-sm leading-relaxed max-w-xs mb-5">
                La plateforme de gestion business pour freelances français. Devis IA, facturation automatique, relances intelligentes.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://twitter.com/lancerapp" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://linkedin.com/company/lancerapp" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://github.com/Milann-lede/lancer-saas" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <p className="font-semibold text-white mb-4 text-sm">Produit</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="#features" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition-colors">Comment ça marche</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Essai gratuit</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Connexion</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="font-semibold text-white mb-4 text-sm">Légal</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
                <li><Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
                <li><a href="mailto:hello@lancer.app" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="mailto:legal@lancer.app" className="hover:text-white transition-colors">DPO / RGPD</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2026 Lancer SAS. Tous droits réservés.</p>
            <p className="text-gray-500">
              Données hébergées en Europe · Conforme RGPD · Paiements sécurisés par Stripe
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
