import { Resend } from 'resend'

export async function sendInvoiceEmail(params: {
  to: string
  clientName: string
  freelancerName: string
  invoiceNumber: string
  total: number
  dueDate: string
  paymentLink?: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@lancer.app'
  const { to, clientName, freelancerName, invoiceNumber, total, dueDate, paymentLink } = params

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
      <div style="background: #2563eb; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 20px;">⚡ Lancer</h1>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 8px 8px;">
        <p>Bonjour ${clientName},</p>
        <p>Veuillez trouver ci-joint la facture <strong>${invoiceNumber}</strong> de la part de <strong>${freelancerName}</strong>.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
          <tr style="background: #f9fafb;">
            <td style="padding: 12px; border: 1px solid #e5e7eb;">Montant total TTC</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">${total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">Date d'échéance</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${dueDate}</td>
          </tr>
        </table>
        ${paymentLink ? `
          <div style="text-align: center; margin: 24px 0;">
            <a href="${paymentLink}" style="background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              Payer en ligne →
            </a>
          </div>
        ` : ''}
        <p style="color: #6b7280; font-size: 14px;">En cas de question, n'hésitez pas à contacter ${freelancerName} directement.</p>
      </div>
    </div>
  `

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Facture ${invoiceNumber} — ${freelancerName}`,
    html,
  })
}

export async function sendReminderEmail(params: {
  to: string
  clientName: string
  freelancerName: string
  invoiceNumber: string
  total: number
  daysOverdue: number
  paymentLink?: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@lancer.app'
  const { to, clientName, freelancerName, invoiceNumber, total, daysOverdue, paymentLink } = params

  const urgency = daysOverdue < 14 ? 'Rappel' : daysOverdue < 30 ? 'Deuxième relance' : 'Mise en demeure'
  const tone = daysOverdue < 14
    ? 'Sauf erreur de notre part, nous n\'avons pas encore reçu le règlement de cette facture.'
    : daysOverdue < 30
    ? 'Malgré notre premier rappel, nous constatons que cette facture reste impayée. Merci de régulariser votre situation dans les meilleurs délais.'
    : 'En l\'absence de règlement, nous serons contraints de prendre les mesures nécessaires pour recouvrer cette créance.'

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
      <div style="background: ${daysOverdue >= 30 ? '#dc2626' : '#f59e0b'}; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 20px;">⚡ Lancer — ${urgency}</h1>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 8px 8px;">
        <p>Bonjour ${clientName},</p>
        <p>${tone}</p>
        <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
          <tr style="background: #f9fafb;">
            <td style="padding: 12px; border: 1px solid #e5e7eb;">Facture</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">${invoiceNumber}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">Montant dû</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold; color: #dc2626;">${total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 12px; border: 1px solid #e5e7eb;">Retard</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${daysOverdue} jour${daysOverdue > 1 ? 's' : ''}</td>
          </tr>
        </table>
        ${paymentLink ? `
          <div style="text-align: center; margin: 24px 0;">
            <a href="${paymentLink}" style="background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              Régler maintenant →
            </a>
          </div>
        ` : ''}
        <p style="color: #6b7280; font-size: 14px;">Cordialement, ${freelancerName}</p>
      </div>
    </div>
  `

  return resend.emails.send({
    from: FROM,
    to,
    subject: `[${urgency}] Facture ${invoiceNumber} — ${total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} en attente`,
    html,
  })
}
