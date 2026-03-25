import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateQuoteWithAI } from '@/lib/ai'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  // Check plan — free users have limited AI calls
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_plan')
    .eq('id', user.id)
    .single()

  if (profile?.subscription_plan === 'free') {
    return NextResponse.json(
      { error: 'La génération IA est disponible à partir du plan Starter' },
      { status: 403 }
    )
  }

  try {
    const body = await req.json()
    const { projectDescription, clientName, freelancerName, freelancerCompany } = body

    if (!projectDescription || !clientName || !freelancerName) {
      return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
    }

    const result = await generateQuoteWithAI({
      projectDescription,
      clientName,
      freelancerName,
      freelancerCompany,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json({ error: 'Erreur lors de la génération' }, { status: 500 })
  }
}
