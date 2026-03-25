import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const subscription = event.data.object as Stripe.Subscription

  switch (event.type) {
    case 'checkout.session.completed': {
      const userId = session.metadata?.user_id
      const plan = session.metadata?.plan
      if (!userId || !plan) break

      await supabaseAdmin.from('profiles').update({
        stripe_subscription_id: session.subscription as string,
        subscription_plan: plan,
        subscription_status: 'active',
      }).eq('id', userId)
      break
    }

    case 'customer.subscription.updated': {
      const userId = subscription.metadata?.user_id
      if (!userId) break

      await supabaseAdmin.from('profiles').update({
        subscription_plan: subscription.metadata?.plan ?? 'free',
        subscription_status: subscription.status as string,
      }).eq('stripe_subscription_id', subscription.id)
      break
    }

    case 'customer.subscription.deleted': {
      await supabaseAdmin.from('profiles').update({
        subscription_plan: 'free',
        subscription_status: 'canceled',
        stripe_subscription_id: null,
      }).eq('stripe_subscription_id', subscription.id)
      break
    }
  }

  return NextResponse.json({ received: true })
}
