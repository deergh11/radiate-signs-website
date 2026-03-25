import { NextRequest, NextResponse } from 'next/server'
import { type QuotePayload, escapeHtml, getClientIp, rateLimitQuote, validateQuotePayload, verifyTurnstileToken } from '@/lib/quote-security'

function buildEmailHtml(data: QuotePayload) {
  const safe = {
    name: escapeHtml(data.name),
    business: escapeHtml(data.business || '-'),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone || '-'),
    projectType: escapeHtml(data.projectType || '-'),
    installationContext: escapeHtml(data.installationContext || '-'),
    installLocation: escapeHtml(data.installLocation || '-'),
    approximateSize: escapeHtml(data.approximateSize || '-'),
    sizeIntent: escapeHtml(data.sizeIntent || '-'),
    budget: escapeHtml(data.budget || '-'),
    timeline: escapeHtml(data.timeline || '-'),
    notes: escapeHtml(data.notes || ''),
    source: escapeHtml(data.source || '-'),
    builderText: escapeHtml(data.builderText),
    builderColor: escapeHtml(data.builderColor || '-'),
    builderFont: escapeHtml(data.builderFont || '-'),
    builderSize: escapeHtml(data.builderSize || '-'),
    builderGlow: escapeHtml(data.builderGlow || '-'),
    builderBackboard: escapeHtml(data.builderBackboard || '-'),
    builderMode: escapeHtml(data.builderMode === 'mockup' ? 'Upload Your Space' : 'Standard Preview'),
    uploadedImageName: escapeHtml(data.uploadedImageName || ''),
    overlayScale: escapeHtml(data.overlayScale || '-'),
    overlayPosition: escapeHtml(data.overlayPosition || '-'),
    files: data.fileNames.length ? data.fileNames.map(fileName => escapeHtml(fileName)).join(', ') : '-',
  }

  return `
    <div style="font-family: sans-serif; max-width: 680px; margin: 0 auto; background: #0f0f0f; color: #f5f5f5; padding: 40px; border-radius: 8px;">
      <h1 style="color: #ff2d78; font-size: 2rem; margin-bottom: 8px;">New Quote Request</h1>
      <p style="color: #888; margin-bottom: 32px;">Radiate Signs - radiatesigns.ca</p>

      <div style="margin-bottom: 24px;">
        <p style="color: #888; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 10px;">REQUEST MODE</p>
        <p style="color: white; margin: 0;">${data.intakeMode === 'quick' ? 'Quick Quote' : 'Detailed Project Request'}</p>
        <p style="color: white; margin: 8px 0 0;">Privacy Policy Consent: Yes</p>
      </div>

      <div style="margin-bottom: 24px;">
        <p style="color: #888; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 10px;">CONTACT DETAILS</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; width: 180px;">Name</td><td style="padding: 8px 0; color: white; font-weight: bold;">${safe.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Business</td><td style="padding: 8px 0; color: white;">${safe.business}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${safe.email}" style="color: #00f5ff;">${safe.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0; color: white;">${safe.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Source</td><td style="padding: 8px 0; color: white;">${safe.source}</td></tr>
        </table>
      </div>

      <div style="margin-bottom: 24px;">
        <p style="color: #888; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 10px;">PROJECT INTAKE</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; width: 180px;">Project Type</td><td style="padding: 8px 0; color: #ff2d78; font-weight: bold;">${safe.projectType}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Install Context</td><td style="padding: 8px 0; color: white;">${safe.installationContext}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Location Details</td><td style="padding: 8px 0; color: white;">${safe.installLocation}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Approximate Size</td><td style="padding: 8px 0; color: white;">${safe.approximateSize}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Sizing Context</td><td style="padding: 8px 0; color: white;">${safe.sizeIntent}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Budget</td><td style="padding: 8px 0; color: white;">${safe.budget}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Timeline</td><td style="padding: 8px 0; color: white;">${safe.timeline}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Selected Files</td><td style="padding: 8px 0; color: white;">${safe.files}</td></tr>
        </table>
      </div>

      ${data.builderText ? `
        <div style="margin: 24px 0; padding: 20px; background: rgba(255,45,120,0.1); border: 1px solid rgba(255,45,120,0.3); border-radius: 4px;">
          <p style="color: #ff2d78; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 8px;">YOUR DESIGN PREVIEW</p>
          <p style="color: white; margin: 4px 0;">Text: <strong>"${safe.builderText}"</strong></p>
          <p style="color: white; margin: 4px 0;">Color: ${safe.builderColor} | Font: ${safe.builderFont}${data.builderSize ? ` | Size: ${safe.builderSize}` : ''}</p>
          <p style="color: white; margin: 4px 0;">Brightness: ${safe.builderGlow} | Background: ${safe.builderBackboard} | Mode: ${safe.builderMode}</p>
          <p style="color: white; margin: 4px 0;">Uploaded image used: ${data.usedUploadedImage === 'yes' ? 'Yes' : 'No'}${safe.uploadedImageName ? ` (${safe.uploadedImageName})` : ''}</p>
          <p style="color: white; margin: 4px 0;">Overlay scale: ${safe.overlayScale}${data.overlayScale ? 'x' : ''} | Position: ${safe.overlayPosition}</p>
        </div>
      ` : ''}

      ${data.notes ? `
        <div style="margin-top: 24px;">
          <p style="color: #888; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 8px;">ADDITIONAL NOTES</p>
          <p style="color: white; line-height: 1.6; background: #161616; padding: 16px; border-radius: 4px;">${safe.notes}</p>
        </div>
      ` : ''}

      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #222;">
        <a href="mailto:${safe.email}" style="display: inline-block; padding: 12px 32px; background: #ff2d78; color: black; text-decoration: none; font-weight: bold; border-radius: 4px;">
          Reply to ${safe.name}
        </a>
        ${data.phone ? `<a href="https://wa.me/${encodeURIComponent(data.phone.replace(/\D/g, ''))}" style="display: inline-block; margin-left: 12px; padding: 12px 32px; border: 1px solid #00f5ff; color: #00f5ff; text-decoration: none; border-radius: 4px;">WhatsApp</a>` : ''}
      </div>
    </div>
  `
}

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req.headers)
  const rateLimit = await rateLimitQuote(clientIp)

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const validation = validateQuotePayload(body)
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  const { data } = validation
  const turnstileValid = await verifyTurnstileToken(data.turnstileToken, clientIp)

  if (!turnstileValid) {
    return NextResponse.json({ error: 'Security verification failed. Please try again.' }, { status: 400 })
  }

  const resendKey = process.env.RESEND_API_KEY
  const sender = 'Radiate Signs Website <onboarding@resend.dev>'
  const isProductionLike = process.env.NODE_ENV === 'production'

  if (!resendKey) {
    if (isProductionLike) {
      console.error('Quote email misconfiguration: RESEND_API_KEY is missing.')
      return NextResponse.json({ error: 'Quote service unavailable.' }, { status: 500 })
    }

    console.warn('Quote email skipped in development because RESEND_API_KEY is missing.')
    return NextResponse.json({ success: true })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: ['radiatesigns@gmail.com'],
        reply_to: data.email,
        subject: `New Quote: ${data.projectType || 'Signage Project'} - ${data.name}${data.business ? ` (${data.business})` : ''}`,
        html: buildEmailHtml(data),
      }),
    })

    if (!response.ok) {
      console.error('Quote email send failed with status:', response.status)
      return NextResponse.json({ error: 'Quote service unavailable.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Quote email request failed:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'Quote service unavailable.' }, { status: 500 })
  }
}
