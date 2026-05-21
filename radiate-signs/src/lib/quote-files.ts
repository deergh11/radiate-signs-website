import { createHmac, timingSafeEqual } from 'node:crypto'
import { QUOTE_FILE_RETENTION_DAYS } from '@/lib/quote-config'

const DEFAULT_LINK_SECRET = 'quote-file-links'

export type StoredQuoteFile = {
  name: string
  pathname: string
  url: string
  contentType: string
  size: number
  viewUrl: string
  attachedToEmail: boolean
}

export function sanitizeFileName(fileName: string) {
  const normalized = fileName
    .normalize('NFKD')
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return normalized || 'upload'
}

export function getQuoteRetentionExpiresAt(now = new Date()) {
  return new Date(now.getTime() + QUOTE_FILE_RETENTION_DAYS * 24 * 60 * 60 * 1000)
}

export function createQuoteFilePath(fileName: string, quoteId: string, now = new Date()) {
  const datePrefix = now.toISOString().slice(0, 10)
  const retentionPrefix = getQuoteRetentionExpiresAt(now).toISOString().slice(0, 10)
  const safeName = sanitizeFileName(fileName)

  return `quotes/${datePrefix}/${quoteId}/retain-until-${retentionPrefix}/${safeName}`
}

function getSigningSecret() {
  return process.env.QUOTE_FILE_LINK_SECRET || process.env.BLOB_READ_WRITE_TOKEN || DEFAULT_LINK_SECRET
}

function createSignature(pathname: string, expiresAt: string) {
  return createHmac('sha256', getSigningSecret())
    .update(`${pathname}:${expiresAt}`)
    .digest('hex')
}

export function createSignedQuoteFileUrl(origin: string, pathname: string, expiresAt: string) {
  const url = new URL('/api/quote/file', origin)
  url.searchParams.set('pathname', pathname)
  url.searchParams.set('expires', expiresAt)
  url.searchParams.set('signature', createSignature(pathname, expiresAt))
  return url.toString()
}

export function verifySignedQuoteFileAccess(pathname: string, expiresAt: string, signature: string) {
  const expiresAtMs = Date.parse(expiresAt)
  if (!Number.isFinite(expiresAtMs) || expiresAtMs < Date.now()) return false

  const expected = Buffer.from(createSignature(pathname, expiresAt), 'hex')
  const provided = Buffer.from(signature, 'hex')

  if (expected.length !== provided.length) return false

  return timingSafeEqual(expected, provided)
}
