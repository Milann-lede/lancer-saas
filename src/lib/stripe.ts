import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
})

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 19,
    priceId: process.env.STRIPE_PRICE_STARTER!,
    features: [
      'Clients illimités',
      'Projets illimités',
      '20 factures/mois',
      'Génération IA (50 devis/mois)',
      'Relances automatiques',
      'Export PDF',
    ],
  },
  pro: {
    name: 'Pro',
    price: 39,
    priceId: process.env.STRIPE_PRICE_PRO!,
    features: [
      'Tout Starter',
      'Factures illimitées',
      'Génération IA illimitée',
      'Signature électronique',
      'Multi-devises',
      'Support prioritaire',
      'Personnalisation avancée',
    ],
  },
}
