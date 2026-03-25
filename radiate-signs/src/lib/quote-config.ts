export const STORAGE_KEY = 'radiate-builder-state'

export const PROJECT_TYPES = [
  'Custom Neon Sign',
  'Channel Letters',
  'Light Box',
  'Marquee Sign',
  'LED / Rope Lighting',
  'House Address Sign',
  'Not Sure Yet',
] as const

export const INSTALL_CONTEXTS = [
  'Storefront Exterior',
  'Interior Wall',
  'Window',
  'Event / Temporary Setup',
  'Home / Residential',
  'Other',
] as const

export const BUDGETS = [
  'Under $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
  'Not Sure Yet',
] as const

export const TIMELINES = [
  'ASAP',
  'Within 2-4 weeks',
  'Within 1-2 months',
  'Planning for later',
  'Just exploring',
] as const

export const SIZE_INTENTS = [
  'I know the approximate size',
  'I need help determining size',
  'Matching an existing sign',
] as const

export const SOURCE_OPTIONS = ['Instagram', 'TikTok', 'Google', 'Referral', 'Other'] as const

export const INTAKE_MODES = ['quick', 'detailed'] as const
export const BUILDER_MODES = ['standard', 'mockup'] as const

export const ACCEPTED_UPLOAD_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'] as const
export const MAX_UPLOAD_SIZE_BYTES = 8 * 1024 * 1024
export const MAX_UPLOAD_FILE_COUNT = 5

export const RATE_LIMIT_MAX_REQUESTS = 5
export const RATE_LIMIT_WINDOW_SECONDS = 10 * 60

export const FIELD_LIMITS = {
  name: 120,
  business: 160,
  email: 160,
  phone: 40,
  installLocation: 180,
  approximateSize: 120,
  notes: 2000,
  source: 50,
  builderText: 120,
  builderColor: 60,
  builderFont: 120,
  builderSize: 60,
  builderGlow: 20,
  builderBackboard: 60,
  uploadedImageName: 160,
  overlayScale: 20,
  overlayPosition: 40,
  fileName: 160,
  turnstileToken: 4096,
} as const

export type IntakeMode = (typeof INTAKE_MODES)[number]
export type BuilderMode = (typeof BUILDER_MODES)[number]
