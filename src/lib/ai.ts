import OpenAI from 'openai'
import type { LineItem } from '@/types'

export interface GenerateQuoteInput {
  projectDescription: string
  clientName: string
  freelancerName: string
  freelancerCompany?: string
  currency?: string
}

export interface GeneratedQuote {
  title: string
  line_items: LineItem[]
  notes: string
}

export async function generateQuoteWithAI(input: GenerateQuoteInput): Promise<GeneratedQuote> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const prompt = `Tu es un expert en tarification freelance.
Génère un devis professionnel en JSON basé sur cette description de projet.

Description du projet: "${input.projectDescription}"
Client: ${input.clientName}
Freelance: ${input.freelancerName}${input.freelancerCompany ? ` (${input.freelancerCompany})` : ''}

Réponds UNIQUEMENT avec un JSON valide dans ce format exact:
{
  "title": "Titre du projet",
  "line_items": [
    {
      "description": "Prestation détaillée",
      "quantity": 1,
      "unit_price": 1500,
      "vat_rate": 20
    }
  ],
  "notes": "Conditions particulières, délais, révisions incluses..."
}

Règles:
- Entre 3 et 6 lignes de prestations
- Prix en euros, réalistes pour un freelance senior en France
- TVA à 20% par défaut
- Notes utiles et professionnelles
- Quantités en jours ou unités selon la prestation`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  const content = completion.choices[0].message.content
  if (!content) throw new Error('Réponse IA vide')

  return JSON.parse(content) as GeneratedQuote
}

export async function generateReminderEmail(params: {
  clientName: string
  invoiceNumber: string
  amount: number
  daysOverdue: number
  freelancerName: string
}): Promise<{ subject: string; body: string }> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const urgency = params.daysOverdue < 14 ? 'courtoise' : params.daysOverdue < 30 ? 'ferme' : 'mise en demeure'

  const prompt = `Rédige un email de relance de paiement ${urgency} en français.
Facture: ${params.invoiceNumber}
Montant: ${params.amount}€
Retard: ${params.daysOverdue} jours
Client: ${params.clientName}
Expéditeur: ${params.freelancerName}

Réponds avec un JSON: {"subject": "...", "body": "..."}`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.6,
  })

  const content = completion.choices[0].message.content
  if (!content) throw new Error('Réponse IA vide')

  return JSON.parse(content)
}
