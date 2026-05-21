import { get } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { verifySignedQuoteFileAccess } from '@/lib/quote-files'

export const runtime = 'nodejs'

function getFileNameFromPath(pathname: string) {
  const parts = pathname.split('/')
  return parts[parts.length - 1] || 'quote-file'
}

export async function GET(req: NextRequest) {
  const pathname = req.nextUrl.searchParams.get('pathname') || ''
  const expiresAt = req.nextUrl.searchParams.get('expires') || ''
  const signature = req.nextUrl.searchParams.get('signature') || ''

  if (!pathname || !expiresAt || !signature) {
    return NextResponse.json({ error: 'Missing file link parameters.' }, { status: 400 })
  }

  if (!verifySignedQuoteFileAccess(pathname, expiresAt, signature)) {
    return NextResponse.json({ error: 'This file link is invalid or has expired.' }, { status: 403 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'File service unavailable.' }, { status: 500 })
  }

  try {
    const blobResult = await get(pathname, {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    if (!blobResult || blobResult.statusCode !== 200) {
      return NextResponse.json({ error: 'File unavailable.' }, { status: 404 })
    }

    return new NextResponse(blobResult.stream, {
      headers: {
        'Content-Type': blobResult.blob.contentType || 'application/octet-stream',
        'Cache-Control': 'private, no-store, max-age=0',
        'Content-Disposition': `inline; filename="${getFileNameFromPath(pathname)}"`,
      },
    })
  } catch (error) {
    console.error('Quote file fetch failed:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'File unavailable.' }, { status: 404 })
  }
}
