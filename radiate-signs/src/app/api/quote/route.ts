import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const {
    intakeMode,
    name,
    business,
    email,
    phone,
    projectType,
    installationContext,
    installLocation,
    approximateSize,
    sizeIntent,
    budget,
    timeline,
    notes,
    fileNames,
    source,
    builderText,
    builderColor,
    builderFont,
    builderSize,
    builderGlow,
    builderBackboard,
    builderMode,
    usedUploadedImage,
    uploadedImageName,
    overlayScale,
    overlayPosition,
    privacyConsent,
  } = body

  if (!privacyConsent) {
    return NextResponse.json({ error: 'Privacy consent required' }, { status: 400 })
  }

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 680px; margin: 0 auto; background: #0f0f0f; color: #f5f5f5; padding: 40px; border-radius: 8px;">
      <h1 style="color: #ff2d78; font-size: 2rem; margin-bottom: 8px;">New Quote Request</h1>
      <p style="color: #888; margin-bottom: 32px;">Radiate Signs - radiatesigns.ca</p>

      <div style="margin-bottom: 24px;">
        <p style="color: #888; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 10px;">REQUEST MODE</p>
        <p style="color: white; margin: 0;">${intakeMode === 'quick' ? 'Quick Quote' : 'Detailed Project Request'}</p>
        <p style="color: white; margin: 8px 0 0;">Privacy Policy Consent: Yes</p>
      </div>

      <div style="margin-bottom: 24px;">
        <p style="color: #888; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 10px;">CONTACT DETAILS</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; width: 180px;">Name</td><td style="padding: 8px 0; color: white; font-weight: bold;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Business</td><td style="padding: 8px 0; color: white;">${business || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00f5ff;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0; color: white;">${phone || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Source</td><td style="padding: 8px 0; color: white;">${source || '-'}</td></tr>
        </table>
      </div>

      <div style="margin-bottom: 24px;">
        <p style="color: #888; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 10px;">PROJECT INTAKE</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; width: 180px;">Project Type</td><td style="padding: 8px 0; color: #ff2d78; font-weight: bold;">${projectType || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Install Context</td><td style="padding: 8px 0; color: white;">${installationContext || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Location Details</td><td style="padding: 8px 0; color: white;">${installLocation || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Approximate Size</td><td style="padding: 8px 0; color: white;">${approximateSize || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Sizing Context</td><td style="padding: 8px 0; color: white;">${sizeIntent || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Budget</td><td style="padding: 8px 0; color: white;">${budget || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Timeline</td><td style="padding: 8px 0; color: white;">${timeline || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Selected Files</td><td style="padding: 8px 0; color: white;">${Array.isArray(fileNames) && fileNames.length ? fileNames.join(', ') : '-'}</td></tr>
        </table>
      </div>

      ${builderText ? `
        <div style="margin: 24px 0; padding: 20px; background: rgba(255,45,120,0.1); border: 1px solid rgba(255,45,120,0.3); border-radius: 4px;">
          <p style="color: #ff2d78; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 8px;">YOUR DESIGN PREVIEW</p>
          <p style="color: white; margin: 4px 0;">Text: <strong>"${builderText}"</strong></p>
          <p style="color: white; margin: 4px 0;">Color: ${builderColor || '-'} · Font: ${builderFont || '-'}${builderSize ? ` · Size: ${builderSize}` : ''}</p>
          <p style="color: white; margin: 4px 0;">Brightness: ${builderGlow || '-'} · Background: ${builderBackboard || '-'} · Mode: ${builderMode === 'mockup' ? 'Upload Your Space' : 'Standard Preview'}</p>
          <p style="color: white; margin: 4px 0;">Uploaded image used: ${usedUploadedImage === 'yes' ? 'Yes' : 'No'}${uploadedImageName ? ` (${uploadedImageName})` : ''}</p>
          <p style="color: white; margin: 4px 0;">Overlay scale: ${overlayScale || '-'}${overlayScale ? 'x' : ''} · Position: ${overlayPosition || '-'}</p>
        </div>
      ` : ''}

      ${notes ? `
        <div style="margin-top: 24px;">
          <p style="color: #888; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 8px;">ADDITIONAL NOTES</p>
          <p style="color: white; line-height: 1.6; background: #161616; padding: 16px; border-radius: 4px;">${notes}</p>
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

  const resendKey = process.env.RESEND_API_KEY
  const sender = 'Radiate Signs Website <onboarding@resend.dev>'

  if (!resendKey) {
    console.log('Quote request received:', body)
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
        reply_to: email,
        subject: `New Quote: ${projectType || 'Signage Project'} - ${name}${business ? ` (${business})` : ''}`,
        html: htmlContent,
      }),
    })

    if (!response.ok) {
      console.error('Resend error:', await response.text())
      return NextResponse.json({ error: 'Email failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
