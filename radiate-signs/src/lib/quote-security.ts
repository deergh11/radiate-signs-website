import {
  BUDGETS,
  BUILDER_MODES,
  FIELD_LIMITS,
  INSTALL_CONTEXTS,
  INTAKE_MODES,
  MAX_UPLOAD_FILE_COUNT,
  PROJECT_TYPES,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_SECONDS,
  SIZE_INTENTS,
  SOURCE_OPTIONS,
  TIMELINES,
  type BuilderMode,
  type IntakeMode,
} from '@/lib/quote-config'

export type QuotePayload = {
  intakeMode: IntakeMode
  name: string
  business: string
  email: string
  phone: string
  projectType: string
  installationContext: string
  installLocation: string
  approximateSize: string
  sizeIntent: string
  budget: string
  timeline: string
  notes: string
  fileNames: string[]
  source: string
  builderText: string
  builderColor: string
  builderFont: string
  builderSize: string
  builderGlow: string
  builderBackboard: string
  builderMode: BuilderMode | ''
  usedUploadedImage: 'yes' | 'no' | ''
  uploadedImageName: string
  overlayScale: string
  overlayPosition: string
  privacyConsent: true
  turnstileToken: string
}

type ValidationResult =
  | { success: true; data: QuotePayload }
  | { success: false; error: string }

type RateLimitResult = {
  allowed: boolean
  remaining: number
  resetAt: number
}

type MemoryEntry = {
  count: number
  resetAt: number
}

const memoryStore = globalThis as typeof globalThis & {
  __radiateQuoteRateLimit?: Map<string, MemoryEntry>
}

const fallbackRateLimitStore = memoryStore.__radiateQuoteRateLimit ?? new Map<string, MemoryEntry>()
memoryStore.__radiateQuoteRateLimit = fallbackRateLimitStore

const enumSets = {
  intakeMode: new Set<string>(INTAKE_MODES),
  projectType: new Set<string>(PROJECT_TYPES),
  installationContext: new Set<string>(INSTALL_CONTEXTS),
  sizeIntent: new Set<string>(SIZE_INTENTS),
  budget: new Set<string>(BUDGETS),
  timeline: new Set<string>(TIMELINES),
  source: new Set<string>(SOURCE_OPTIONS),
  builderMode: new Set<string>(BUILDER_MODES),
} as const

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const overlayScalePattern = /^\d+(\.\d{1,2})?$/
const overlayPositionPattern = /^\d{1,3},\d{1,3}$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function normalizeString(value: unknown, maxLength: number, field: string): string {
  if (value === undefined || value === null) return ''
  if (typeof value !== 'string') throw new Error(`${field} must be a string.`)

  const normalized = value.trim()
  if (normalized.length > maxLength) throw new Error(`${field} is too long.`)

  return normalized
}

function normalizeBoolean(value: unknown, field: string): boolean {
  if (typeof value !== 'boolean') throw new Error(`${field} must be a boolean.`)
  return value
}

function normalizeEnum(value: unknown, values: Set<string>, field: string): string {
  const normalized = normalizeString(value, 120, field)
  if (!normalized) return ''
  if (!values.has(normalized)) throw new Error(`${field} is invalid.`)
  return normalized
}

function normalizeFileNames(value: unknown): string[] {
  if (value === undefined || value === null || value === '') return []
  if (!Array.isArray(value)) throw new Error('fileNames must be an array.')
  if (value.length > MAX_UPLOAD_FILE_COUNT) throw new Error('Too many files were provided.')

  return value.map((entry, index) => normalizeString(entry, FIELD_LIMITS.fileName, `fileNames[${index}]`))
}

function validateRequiredFields(data: QuotePayload) {
  if (!data.name || !data.email || !data.projectType) {
    throw new Error('Please fill in your name, email, and project type.')
  }

  if (data.intakeMode === 'quick') {
    return
  }

  if (data.installationContext && !enumSets.installationContext.has(data.installationContext)) {
    throw new Error('Installation context is invalid.')
  }
}

export function validateQuotePayload(input: unknown): ValidationResult {
  if (!isRecord(input)) {
    return { success: false, error: 'Invalid request body.' }
  }

  try {
    const intakeMode = normalizeEnum(input.intakeMode, enumSets.intakeMode, 'intakeMode') as IntakeMode | ''
    if (!intakeMode) throw new Error('intakeMode is required.')

    const email = normalizeString(input.email, FIELD_LIMITS.email, 'email').toLowerCase()
    if (!emailPattern.test(email)) throw new Error('A valid email address is required.')

    const privacyConsent = normalizeBoolean(input.privacyConsent, 'privacyConsent')
    if (!privacyConsent) throw new Error('Privacy consent required.')

    const turnstileToken = normalizeString(input.turnstileToken, FIELD_LIMITS.turnstileToken, 'turnstileToken')
    if (!turnstileToken) throw new Error('Security verification is required.')

    const data: QuotePayload = {
      intakeMode,
      name: normalizeString(input.name, FIELD_LIMITS.name, 'name'),
      business: normalizeString(input.business, FIELD_LIMITS.business, 'business'),
      email,
      phone: normalizeString(input.phone, FIELD_LIMITS.phone, 'phone'),
      projectType: normalizeEnum(input.projectType, enumSets.projectType, 'projectType'),
      installationContext: normalizeEnum(input.installationContext, enumSets.installationContext, 'installationContext'),
      installLocation: normalizeString(input.installLocation, FIELD_LIMITS.installLocation, 'installLocation'),
      approximateSize: normalizeString(input.approximateSize, FIELD_LIMITS.approximateSize, 'approximateSize'),
      sizeIntent: normalizeEnum(input.sizeIntent, enumSets.sizeIntent, 'sizeIntent'),
      budget: normalizeEnum(input.budget, enumSets.budget, 'budget'),
      timeline: normalizeEnum(input.timeline, enumSets.timeline, 'timeline'),
      notes: normalizeString(input.notes, FIELD_LIMITS.notes, 'notes'),
      fileNames: normalizeFileNames(input.fileNames),
      source: normalizeEnum(input.source, enumSets.source, 'source'),
      builderText: normalizeString(input.builderText, FIELD_LIMITS.builderText, 'builderText'),
      builderColor: normalizeString(input.builderColor, FIELD_LIMITS.builderColor, 'builderColor'),
      builderFont: normalizeString(input.builderFont, FIELD_LIMITS.builderFont, 'builderFont'),
      builderSize: normalizeString(input.builderSize, FIELD_LIMITS.builderSize, 'builderSize'),
      builderGlow: normalizeString(input.builderGlow, FIELD_LIMITS.builderGlow, 'builderGlow'),
      builderBackboard: normalizeString(input.builderBackboard, FIELD_LIMITS.builderBackboard, 'builderBackboard'),
      builderMode: normalizeEnum(input.builderMode, enumSets.builderMode, 'builderMode') as BuilderMode | '',
      usedUploadedImage: (() => {
        const value = normalizeString(input.usedUploadedImage, 10, 'usedUploadedImage')
        if (!value) return ''
        if (value !== 'yes' && value !== 'no') throw new Error('usedUploadedImage is invalid.')
        return value
      })(),
      uploadedImageName: normalizeString(input.uploadedImageName, FIELD_LIMITS.uploadedImageName, 'uploadedImageName'),
      overlayScale: normalizeString(input.overlayScale, FIELD_LIMITS.overlayScale, 'overlayScale'),
      overlayPosition: normalizeString(input.overlayPosition, FIELD_LIMITS.overlayPosition, 'overlayPosition'),
      privacyConsent: true,
      turnstileToken,
    }

    if (data.overlayScale && !overlayScalePattern.test(data.overlayScale)) {
      throw new Error('overlayScale is invalid.')
    }

    if (data.overlayPosition && !overlayPositionPattern.test(data.overlayPosition)) {
      throw new Error('overlayPosition is invalid.')
    }

    validateRequiredFields(data)

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid request body.',
    }
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()

  return headers.get('x-real-ip') || 'unknown'
}

async function useKvRateLimit(key: string): Promise<RateLimitResult | null> {
  const kvUrl = process.env.KV_REST_API_URL
  const kvToken = process.env.KV_REST_API_TOKEN

  if (!kvUrl || !kvToken) return null

  const headers = {
    Authorization: `Bearer ${kvToken}`,
  }

  try {
    const countResponse = await fetch(`${kvUrl}/incr/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers,
      cache: 'no-store',
    })

    if (!countResponse.ok) return null

    const countJson = (await countResponse.json()) as { result?: number }
    const count = typeof countJson.result === 'number' ? countJson.result : Number(countJson.result)

    if (!Number.isFinite(count)) return null

    if (count === 1) {
      await fetch(`${kvUrl}/expire/${encodeURIComponent(key)}/${RATE_LIMIT_WINDOW_SECONDS}`, {
        method: 'POST',
        headers,
        cache: 'no-store',
      }).catch(() => undefined)
    }

    const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - count)
    return {
      allowed: count <= RATE_LIMIT_MAX_REQUESTS,
      remaining,
      resetAt: Date.now() + RATE_LIMIT_WINDOW_SECONDS * 1000,
    }
  } catch {
    return null
  }
}

function useMemoryRateLimit(key: string): RateLimitResult {
  const now = Date.now()
  const existing = fallbackRateLimitStore.get(key)

  if (!existing || existing.resetAt <= now) {
    const nextEntry = {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_SECONDS * 1000,
    }
    fallbackRateLimitStore.set(key, nextEntry)

    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetAt: nextEntry.resetAt,
    }
  }

  existing.count += 1
  fallbackRateLimitStore.set(key, existing)

  return {
    allowed: existing.count <= RATE_LIMIT_MAX_REQUESTS,
    remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - existing.count),
    resetAt: existing.resetAt,
  }
}

export async function rateLimitQuote(ip: string): Promise<RateLimitResult> {
  const key = `quote:${ip}`
  const kvResult = await useKvRateLimit(key)
  if (kvResult) return kvResult

  return useMemoryRateLimit(key)
}

export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    return process.env.NODE_ENV !== 'production' && token === 'dev-bypass'
  }

  try {
    const formData = new URLSearchParams({
      secret,
      response: token,
    })

    if (ip) formData.append('remoteip', ip)

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      cache: 'no-store',
    })

    if (!response.ok) return false

    const data = (await response.json()) as { success?: boolean }
    return Boolean(data.success)
  } catch {
    return false
  }
}
