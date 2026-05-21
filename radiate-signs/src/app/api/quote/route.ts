import { randomUUID } from 'node:crypto'
import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { createQuoteFilePath, type StoredQuoteFile } from '@/lib/quote-files'
import { escapeHtml, getClientIp, rateLimitQuote, validateQuotePayload, validateQuoteUploadFiles, verifyTurnstileToken, type QuotePayload } from '@/lib/quote-security'

export const runtime = 'nodejs'

const MAX_EMAIL_ATTACHMENT_BYTES = 10 * 1024 * 1024
const MAX_SINGLE_EMAIL_ATTACHMENT_BYTES = 3 * 1024 * 1024

type EmailAttachment = {
  filename: string
  content: string
  content_type: string
}

function buildEmailHtml(data: QuotePayload, uploadedFiles: StoredQuoteFile[]) {
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

  const uploadedFilesHtml = uploadedFiles.length
    ? uploadedFiles
        .map(file => {
          const safeFileName = escapeHtml(file.name)
          const safeViewUrl = escapeHtml(file.viewUrl)
          const attachedLabel = file.attachedToEmail ? 'Attached to email and stored in Blob' : 'Stored in Blob and linked below'

          return `
            <li style="margin-bottom: 10px;">
              <a href="${safeViewUrl}" style="color: #00f5ff; text-decoration: none;">${safeFileName}</a>
              <span style="color: #888;"> (${Math.max(1, Math.round(file.size / 1024))} KB, ${escapeHtml(file.contentType)})</span>
              <div style="color: #888; font-size: 0.78rem; margin-top: 4px;">${attachedLabel}</div>
            </li>
          `
        })
        .join('')
    : '<li style="color: #888;">No uploaded files</li>'

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

      <div style="margin-bottom: 24px; padding: 20px; background: #161616; border-radius: 4px;">
        <p style="color: #888; font-size: 0.8rem; letter-spacing: 2px; margin-bottom: 10px;">UPLOADED FILES</p>
        <ul style="padding-left: 18px; margin: 0;">
          ${uploadedFilesHtml}
        </ul>
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

function buildEmailText(data: QuotePayload, uploadedFiles: StoredQuoteFile[]) {
  const uploadedFilesText = uploadedFiles.length
    ? uploadedFiles
        .map(file => `- ${file.name} (${file.contentType}, ${Math.max(1, Math.round(file.size / 1024))} KB): ${file.viewUrl}${file.attachedToEmail ? ' [attached to email]' : ''}`)
        .join('\n')
    : '- No uploaded files'

  return [
    'New Quote Request',
    '',
    `Mode: ${data.intakeMode === 'quick' ? 'Quick Quote' : 'Detailed Project Request'}`,
    `Name: ${data.name}`,
    `Business: ${data.business || '-'}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '-'}`,
    `Source: ${data.source || '-'}`,
    `Project Type: ${data.projectType || '-'}`,
    `Install Context: ${data.installationContext || '-'}`,
    `Location Details: ${data.installLocation || '-'}`,
    `Approximate Size: ${data.approximateSize || '-'}`,
    `Sizing Context: ${data.sizeIntent || '-'}`,
    `Budget: ${data.budget || '-'}`,
    `Timeline: ${data.timeline || '-'}`,
    `Selected Files: ${data.fileNames.length ? data.fileNames.join(', ') : '-'}`,
    '',
    'Uploaded Files',
    uploadedFilesText,
    '',
    data.builderText
      ? [
          'Design Preview',
          `Text: "${data.builderText}"`,
          `Color: ${data.builderColor || '-'}`,
          `Font: ${data.builderFont || '-'}`,
          `Size: ${data.builderSize || '-'}`,
          `Brightness: ${data.builderGlow || '-'}`,
          `Background: ${data.builderBackboard || '-'}`,
          `Mode: ${data.builderMode === 'mockup' ? 'Upload Your Space' : 'Standard Preview'}`,
          `Uploaded image used: ${data.usedUploadedImage === 'yes' ? `Yes${data.uploadedImageName ? ` (${data.uploadedImageName})` : ''}` : 'No'}`,
          `Overlay scale: ${data.overlayScale || '-'}`,
          `Overlay position: ${data.overlayPosition || '-'}`,
          '',
        ].join('\n')
      : '',
    `Notes: ${data.notes || '-'}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function pickEmailAttachments(files: File[]) {
  let totalSize = 0

  return files.flatMap(file => {
    const isEligibleImage = file.type.startsWith('image/')
    const nextTotal = totalSize + file.size

    if (!isEligibleImage || file.size > MAX_SINGLE_EMAIL_ATTACHMENT_BYTES || nextTotal > MAX_EMAIL_ATTACHMENT_BYTES) {
      return []
    }

    totalSize = nextTotal
    return [file]
  })
}

async function createEmailAttachments(files: File[]): Promise<EmailAttachment[]> {
  const attachments: EmailAttachment[] = []

  for (const file of files) {
    const content = Buffer.from(await file.arrayBuffer()).toString('base64')
    attachments.push({
      filename: file.name,
      content,
      content_type: file.type,
    })
  }

  return attachments
}

async function sendQuoteEmail({
  resendKey,
  payload,
}: {
  resendKey: string
  payload: Record<string, unknown>
}) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (response.ok) {
    return { ok: true as const }
  }

  const errorBody = await response.text().catch(() => '')
  return { ok: false as const, status: response.status, body: errorBody }
}

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    console.info(
      `[quote] Quote submission received in ${process.env.NODE_ENV || 'development'} mode. Turnstile dev bypass ${
        process.env.NEXT_PUBLIC_DISABLE_TURNSTILE_IN_DEV === 'true' ? 'enabled' : 'disabled'
      }.`
    )
  }

  const clientIp = getClientIp(req.headers)
  const rateLimit = await rateLimitQuote(clientIp)

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let formData: FormData

  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 })
  }

  const uploadedFiles = formData
    .getAll('files')
    .filter((value): value is File => value instanceof File && value.size > 0)

  const fileValidation = validateQuoteUploadFiles(uploadedFiles)
  if (!fileValidation.success) {
    return NextResponse.json({ error: fileValidation.error }, { status: 400 })
  }

  const body: Record<string, unknown> = {
    intakeMode: formData.get('intakeMode'),
    name: formData.get('name'),
    business: formData.get('business'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    projectType: formData.get('projectType'),
    installationContext: formData.get('installationContext'),
    installLocation: formData.get('installLocation'),
    approximateSize: formData.get('approximateSize'),
    sizeIntent: formData.get('sizeIntent'),
    budget: formData.get('budget'),
    timeline: formData.get('timeline'),
    notes: formData.get('notes'),
    fileNames: fileValidation.files.map(file => file.name),
    source: formData.get('source'),
    builderText: formData.get('builderText'),
    builderColor: formData.get('builderColor'),
    builderFont: formData.get('builderFont'),
    builderSize: formData.get('builderSize'),
    builderGlow: formData.get('builderGlow'),
    builderBackboard: formData.get('builderBackboard'),
    builderMode: formData.get('builderMode'),
    usedUploadedImage: formData.get('usedUploadedImage'),
    uploadedImageName: formData.get('uploadedImageName'),
    overlayScale: formData.get('overlayScale'),
    overlayPosition: formData.get('overlayPosition'),
    privacyConsent: formData.get('privacyConsent'),
    turnstileToken: formData.get('turnstileToken'),
  }

  const validation = validateQuotePayload(body)
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  const { data } = validation
  if (process.env.NODE_ENV !== 'production') {
    console.info(
      `[quote] Verifying Turnstile token in dev. Received token: ${
        data.turnstileToken === 'dev-bypass' ? 'dev-bypass' : 'real-token-or-empty'
      }.`
    )
  }
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

  if (uploadedFiles.length > 0 && !process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('Quote file upload misconfiguration: BLOB_READ_WRITE_TOKEN is missing.')
    return NextResponse.json({ error: 'File upload service unavailable.' }, { status: 500 })
  }

  const quoteId = randomUUID()
  const now = new Date()
  let storedFiles: StoredQuoteFile[] = []

  try {
    storedFiles = await Promise.all(
      uploadedFiles.map(async file => {
        const pathname = createQuoteFilePath(file.name, quoteId, now)
        const stored = await put(pathname, file, {
          access: 'public',
          addRandomSuffix: false,
          contentType: file.type,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        })

        return {
          name: file.name,
          pathname: stored.pathname,
          url: stored.url,
          contentType: file.type,
          size: file.size,
          viewUrl: stored.url,
          attachedToEmail: false,
        }
      })
    )
  } catch (error) {
    console.error('Quote file upload failed:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'We could not upload your files. Please try again.' }, { status: 500 })
  }

  const attachmentFiles = pickEmailAttachments(uploadedFiles)
  const emailAttachments = await createEmailAttachments(attachmentFiles)
  const attachmentNames = new Set(attachmentFiles.map(file => file.name))
  storedFiles = storedFiles.map(file => ({
    ...file,
    attachedToEmail: attachmentNames.has(file.name),
  }))

  const emailPayload = {
    from: sender,
    to: ['radiatesigns@gmail.com'],
    reply_to: data.email,
    subject: `New Quote: ${data.projectType || 'Signage Project'} - ${data.name}${data.business ? ` (${data.business})` : ''}`,
    html: buildEmailHtml(data, storedFiles),
    text: buildEmailText(data, storedFiles),
  }

  try {
    let response = await sendQuoteEmail({
      resendKey,
      payload: emailAttachments.length ? { ...emailPayload, attachments: emailAttachments } : emailPayload,
    })

    if (!response.ok && emailAttachments.length) {
      console.warn('Quote email send with attachments failed, retrying without attachments.', response.status, response.body)
      storedFiles = storedFiles.map(file => ({ ...file, attachedToEmail: false }))
      response = await sendQuoteEmail({
        resendKey,
        payload: {
          ...emailPayload,
          html: buildEmailHtml(data, storedFiles),
          text: buildEmailText(data, storedFiles),
        },
      })
    }

    if (!response.ok) {
      console.error('Quote email send failed with status:', response.status, response.body)
      return NextResponse.json({ error: 'Quote service unavailable.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Quote email request failed:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'Quote service unavailable.' }, { status: 500 })
  }
}
