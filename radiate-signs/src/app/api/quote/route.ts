import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const {
    name, business, email, phone,
    service, budget, timeline, message,
    builderText, builderColor, builderFont, builderSize,
  } = body

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #f5f5f5; padding: 40px; border-radius: 8px;">
      <h1 style="color: #ff2d78; font-size: 2rem; margin-bottom: 8px;">New Quote Request</h1>
      <p style="color: #888; margin-bottom: 32px;">Radiate Signs — radiatesigns.ca</p>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; color: #888; width: 140px;">Name</td><td style="padding: 10px 0; color: white; font-weight: bold;">${name}</td></tr>
        <tr><td style="padding: 10px 0; color: #888;">Business</td><td style="padding: 10px 0; color: white;">${business || '—'}</td></tr>
        <tr><td style="padding: 10px 0; color: #888;">Email</td><td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #00f5ff;">${email}</a></td></tr>
        <tr><td style="padding: 10px 0; color: #888;">Phone</td><td style="padding: 10px 0; color: white;">${phone || '—'}</td></tr>
        <tr><td style="padding: 10px 0; color: #888;">Service</td><td style="padding: 10px 0; color: #ff2d78; font-weight: bold;">${service}</td></tr>
        <tr><td style="padding: 10px 0; color: #888;">Budget</td><td style="padding: 10px 0; color: white;">${budget || '—'}</td></tr>
        <tr><td style="padding: 10px 0; color: #888;">Timeline</td><td style="padding: 10px 0; color: white;">${timeline || '—'}</td></tr>
      </table>

      ${builderText ? `
        <div style="margin: 24px 0; padding: 20px; background: rgba(255,45,120,0.1); border: 1px solid rgba(255,45,120,0.3); border-radius: 4px;">
          <p style="color: #ff2d78; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 8px;">FROM SIGN BUILDER</p>
          <p style="color: white; margin: 4px 0;">Text: <strong>"${builderText}"</strong></p>
          <p style="color: white; margin: 4px 0;">Color: ${builderColor} · Font: ${builderFont}${builderSize ? ` · Size: ~${builderSize}` : ''}</p>
        </div>
      ` : ''}

      ${message ? `
        <div style="margin-top: 24px;">
          <p style="color: #888; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 8px;">PROJECT DETAILS</p>
          <p style="color: white; line-height: 1.6; background: #161616; padding: 16px; border-radius: 4px;">${message}</p>
        </div>
      ` : ''}

      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #222;">
        <a href="mailto:${email}" style="display: inline-block; padding: 12px 32px; background: #ff2d78; color: black; text-decoration: none; font-weight: bold; border-radius: 4px;">
          Reply to ${name}
        </a>
        ${phone ? `<a href="https://wa.me/${phone.replace(/\D/g, '')}" style="display: inline-block; margin-left: 12px; padding: 12px 32px; border: 1px solid #00f5ff; color: #00f5ff; text-decoration: none; border-radius: 4px;">WhatsApp</a>` : ''}
      </div>
    </div>
  `

  // Send via Resend
  const resendKey = process.env.RESEND_API_KEY

  if (!resendKey) {
    // In dev without Resend, just log and return success
    console.log('Quote request received:', body)
    return NextResponse.json({ success: true })
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Radiate Signs Website <quotes@radiatesigns.ca>',
        to: ['radiatesigns@gmail.com'], // ← change to your email
        reply_to: email,
        subject: `New Quote: ${service} — ${name}${business ? ` (${business})` : ''}`,
        html: htmlContent,
      }),
    })

    if (!res.ok) {
      console.error('Resend error:', await res.text())
      return NextResponse.json({ error: 'Email failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
