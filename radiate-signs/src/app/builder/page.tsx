'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Download, RotateCcw, Upload, X } from 'lucide-react'
import { ACCEPTED_UPLOAD_TYPES, MAX_UPLOAD_SIZE_BYTES, STORAGE_KEY } from '@/lib/quote-config'

type NeonColor = {
  name: string
  value: string
  shadow: string
}

type FontStyle = {
  name: string
  css: string
  import: string
  bestFor: string
}

type BackboardStyle = {
  name: string
  value: string
  bg: string
  accent?: string
}

type BuilderMode = 'standard' | 'mockup'

type UploadedImage = {
  url: string
  name: string
  type: string
}

type BuilderSnapshot = {
  text: string
  color: string
  font: string
  width: number
  height: number
  unit: 'in' | 'cm'
  brightness: number
  backboard: string
  mode: BuilderMode
  overlayX: number
  overlayY: number
  overlayScale: number
  showOverlay: boolean
  uploadedImageName: string
}

const NEON_COLORS: NeonColor[] = [
  { name: 'Warm White', value: '#fff1d6', shadow: '255,241,214' },
  { name: 'Cool White', value: '#e8f7ff', shadow: '232,247,255' },
  { name: 'Soft Pink', value: '#f6a7d8', shadow: '246,167,216' },
  { name: 'Hot Pink', value: '#ff4fbf', shadow: '255,79,191' },
  { name: 'Red', value: '#ff4a4a', shadow: '255,74,74' },
  { name: 'Orange', value: '#ff7a18', shadow: '255,122,24' },
  { name: 'Yellow', value: '#ffd84d', shadow: '255,216,77' },
  { name: 'Lime Green', value: '#bbff4d', shadow: '187,255,77' },
  { name: 'Emerald', value: '#38f2a0', shadow: '56,242,160' },
  { name: 'Cyan', value: '#61e8ff', shadow: '97,232,255' },
  { name: 'Blue', value: '#5d8bff', shadow: '93,139,255' },
  { name: 'Purple', value: '#af7cff', shadow: '175,124,255' },
]

const FONT_STYLES: FontStyle[] = [
  { name: 'Classic Script', css: '"Dancing Script", cursive', import: 'Dancing+Script:wght@700', bestFor: 'Restaurants and hospitality spaces' },
  { name: 'Bold Display', css: '"Bebas Neue", sans-serif', import: 'Bebas+Neue', bestFor: 'Storefronts and high-visibility signage' },
  { name: 'Retro Serif', css: '"Playfair Display", serif', import: 'Playfair+Display:ital,wght@1,700', bestFor: 'Boutique interiors and premium feature walls' },
  { name: 'Modern Sans', css: '"Barlow Condensed", sans-serif', import: 'Barlow+Condensed:wght@700', bestFor: 'Clean business branding and reception areas' },
  { name: 'Neon Italic', css: '"Satisfy", cursive', import: 'Satisfy', bestFor: 'Lifestyle brands and social media moments' },
  { name: 'Street Style', css: '"Permanent Marker", cursive', import: 'Permanent+Marker', bestFor: 'Event activations and casual retail environments' },
  { name: 'Luxury Serif', css: '"Cormorant Garamond", serif', import: 'Cormorant+Garamond:wght@700', bestFor: 'Upscale interiors and hospitality concepts' },
  { name: 'Condensed Impact', css: '"Oswald", sans-serif', import: 'Oswald:wght@600', bestFor: 'Channel-style statements and storefront walls' },
  { name: 'Retro Rounded', css: '"Monoton", cursive', import: 'Monoton', bestFor: 'Feature signs and nightlife-inspired installs' },
  { name: 'Clean Geometric', css: '"Montserrat", sans-serif', import: 'Montserrat:wght@700', bestFor: 'Modern brands and reception signage' },
  { name: 'Handwritten Casual', css: '"Caveat", cursive', import: 'Caveat:wght@700', bestFor: 'Cafe interiors and relaxed retail spaces' },
  { name: 'Editorial Sans', css: '"Space Grotesk", sans-serif', import: 'Space+Grotesk:wght@700', bestFor: 'Contemporary commercial interiors' },
]

const BACKBOARD_STYLES: BackboardStyle[] = [
  { name: 'Plain Black', value: 'black', bg: '#080808', accent: '#151515' },
  { name: 'Dark Wall', value: 'dark-wall', bg: 'linear-gradient(135deg, #101216 0%, #050607 100%)', accent: '#1c2730' },
  { name: 'Concrete Wall', value: 'concrete', bg: 'linear-gradient(135deg, #2f3236 0%, #17191c 100%)', accent: '#555b61' },
  { name: 'Brick Wall', value: 'brick', bg: 'linear-gradient(135deg, #4a1f1a 0%, #24110d 100%)', accent: '#7b4035' },
  { name: 'Storefront Glass', value: 'glass', bg: 'linear-gradient(135deg, rgba(33,46,59,0.96) 0%, rgba(7,11,16,0.98) 100%)', accent: '#73c2ca' },
  { name: 'Feature Wall', value: 'feature-wall', bg: 'linear-gradient(135deg, #352b2b 0%, #151313 100%)', accent: '#8f6b53' },
]

const PRESET_GROUPS = [
  { label: 'Restaurant', items: ['Open Late', 'Fresh Daily', 'Good Eats'] },
  { label: 'Home', items: ['Good Vibes Only', 'Stay Awhile', 'The Loft'] },
  { label: 'Retail', items: ['New Arrivals', 'Radiate', 'Shop Local'] },
]

export default function BuilderPage() {
  const [text, setText] = useState('Open 24/7')
  const [color, setColor] = useState(NEON_COLORS[0])
  const [font, setFont] = useState(FONT_STYLES[0])
  const [backboard, setBackboard] = useState(BACKBOARD_STYLES[0])
  const [signWidth, setSignWidth] = useState(42)
  const [signHeight, setSignHeight] = useState(18)
  const [sizeUnit, setSizeUnit] = useState<'in' | 'cm'>('in')
  const [brightness, setBrightness] = useState(3)
  const [mode, setMode] = useState<BuilderMode>('standard')
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)
  const [uploadError, setUploadError] = useState('')
  const [showOverlay, setShowOverlay] = useState(true)
  const [overlayX, setOverlayX] = useState(50)
  const [overlayY, setOverlayY] = useState(50)
  const [overlayScale, setOverlayScale] = useState(1)
  const [imageAspectRatio, setImageAspectRatio] = useState(1.45)
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const mockupSurfaceRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragPointerId = useRef<number | null>(null)
  const resizePointerId = useRef<number | null>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ scale: 1, x: 0 })

  useEffect(() => {
    const allFonts = FONT_STYLES.map(fontOption => fontOption.import).join('&family=')
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${allFonts}&display=swap`
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return

    try {
      const parsed = JSON.parse(saved) as Partial<BuilderSnapshot>
      if (parsed.text) setText(parsed.text)
      if (parsed.color) {
        const matchedColor = NEON_COLORS.find(item => item.name === parsed.color)
        if (matchedColor) setColor(matchedColor)
      }
      if (parsed.font) {
        const matchedFont = FONT_STYLES.find(item => item.name === parsed.font)
        if (matchedFont) setFont(matchedFont)
      }
      if (parsed.backboard) {
        const matchedBoard = BACKBOARD_STYLES.find(item => item.name === parsed.backboard)
        if (matchedBoard) setBackboard(matchedBoard)
      }
      if (typeof parsed.width === 'number') setSignWidth(parsed.width)
      if (typeof parsed.height === 'number') setSignHeight(parsed.height)
      if (parsed.unit === 'in' || parsed.unit === 'cm') setSizeUnit(parsed.unit)
      if (typeof parsed.brightness === 'number') setBrightness(parsed.brightness)
      if (parsed.mode === 'mockup' || parsed.mode === 'standard') setMode(parsed.mode)
      if (typeof parsed.overlayX === 'number') setOverlayX(parsed.overlayX)
      if (typeof parsed.overlayY === 'number') setOverlayY(parsed.overlayY)
      if (typeof parsed.overlayScale === 'number') setOverlayScale(parsed.overlayScale)
      if (typeof parsed.showOverlay === 'boolean') setShowOverlay(parsed.showOverlay)
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    const snapshot: BuilderSnapshot = {
      text,
      color: color.name,
      font: font.name,
      width: signWidth,
      height: signHeight,
      unit: sizeUnit,
      brightness,
      backboard: backboard.name,
      mode,
      overlayX,
      overlayY,
      overlayScale,
      showOverlay,
      uploadedImageName: uploadedImage?.name || '',
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  }, [text, color.name, font.name, signWidth, signHeight, sizeUnit, brightness, backboard.name, mode, overlayX, overlayY, overlayScale, showOverlay, uploadedImage?.name])

  useEffect(() => {
    return () => {
      if (uploadedImage?.url) {
        URL.revokeObjectURL(uploadedImage.url)
      }
    }
  }, [uploadedImage])

  const displayFontSize = useMemo(
    () => Math.max(42, Math.min(132, (sizeUnit === 'cm' ? signWidth / 2.54 : signWidth) * 1.55)),
    [signWidth, sizeUnit]
  )

  const glowCSS = useMemo(
    () => `
      0 0 ${4 * brightness}px rgba(255,255,255,0.95),
      0 0 ${9 * brightness}px ${color.value},
      0 0 ${18 * brightness}px ${color.value},
      0 0 ${34 * brightness}px rgba(${color.shadow},0.72),
      0 0 ${58 * brightness}px rgba(${color.shadow},0.4),
      0 0 ${84 * brightness}px rgba(${color.shadow},0.22)
    `,
    [brightness, color.shadow, color.value]
  )

  const neonHalo = useMemo(
    () => `radial-gradient(circle, rgba(${color.shadow},${0.24 * brightness}) 0%, rgba(${color.shadow},${0.12 * brightness}) 24%, rgba(${color.shadow},0.02) 65%, transparent 78%)`,
    [brightness, color.shadow]
  )

  const quoteHref = useMemo(() => {
    const params = new URLSearchParams({
      text,
      color: color.name,
      font: font.name,
      size: `${signWidth}${sizeUnit} x ${signHeight}${sizeUnit}`,
      glow: brightness.toString(),
      backboard: backboard.name,
      builderMode: mode,
      usedUploadedImage: uploadedImage ? 'yes' : 'no',
      uploadedImageName: uploadedImage?.name || '',
      overlayScale: overlayScale.toFixed(2),
      overlayPosition: `${Math.round(overlayX)},${Math.round(overlayY)}`,
    })

    return `/quote?${params.toString()}`
  }, [backboard.name, brightness, color.name, font.name, mode, overlayScale, overlayX, overlayY, signHeight, signWidth, sizeUnit, text, uploadedImage])

  const handleCopyToQuote = async () => {
    const summary = [
      `Text: "${text}"`,
      `Color: ${color.name}`,
      `Font: ${font.name}`,
      `Width: ${signWidth}${sizeUnit}`,
      `Height: ${signHeight}${sizeUnit}`,
      `Brightness: ${brightness}`,
      `Backboard: ${backboard.name}`,
      `Mode: ${mode === 'mockup' ? 'Upload Your Space' : 'Standard Preview'}`,
      uploadedImage ? `Uploaded image: ${uploadedImage.name}` : '',
    ]
      .filter(Boolean)
      .join(' | ')

    await navigator.clipboard.writeText(summary).catch(() => {})
  }

  const resetBuilder = () => {
    setText('Open 24/7')
    setColor(NEON_COLORS[0])
    setFont(FONT_STYLES[0])
    setBackboard(BACKBOARD_STYLES[0])
    setSignWidth(42)
    setSignHeight(18)
    setSizeUnit('in')
    setBrightness(3)
    setMode('standard')
    setOverlayX(50)
    setOverlayY(50)
    setOverlayScale(1)
    setShowOverlay(true)
    if (uploadedImage?.url) URL.revokeObjectURL(uploadedImage.url)
    setUploadedImage(null)
  }

  const clampOverlay = (value: number) => Math.min(90, Math.max(10, value))

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!ACCEPTED_UPLOAD_TYPES.includes(file.type as (typeof ACCEPTED_UPLOAD_TYPES)[number])) {
      setUploadError('Please upload a PNG, JPG, JPEG, or WebP image.')
      event.target.value = ''
      return
    }

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setUploadError('Please upload an image under 8MB for the mockup preview.')
      event.target.value = ''
      return
    }

    if (uploadedImage?.url) {
      URL.revokeObjectURL(uploadedImage.url)
    }

    const objectUrl = URL.createObjectURL(file)
    setUploadError('')
    setUploadedImage({ url: objectUrl, name: file.name, type: file.type })
    setMode('mockup')
    setShowOverlay(true)
    setOverlayX(50)
    setOverlayY(50)
    setOverlayScale(1)
    setImageAspectRatio(1.45)
  }

  const removeUploadedImage = () => {
    if (uploadedImage?.url) {
      URL.revokeObjectURL(uploadedImage.url)
    }
    setUploadedImage(null)
    setUploadError('')
    setMode('standard')
    setOverlayX(50)
    setOverlayY(50)
    setOverlayScale(1)
    setImageAspectRatio(1.45)
  }

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!uploadedImage || !mockupSurfaceRef.current) return
    const rect = mockupSurfaceRef.current.getBoundingClientRect()
    dragPointerId.current = event.pointerId
    dragOffset.current = {
      x: event.clientX - rect.left - (overlayX / 100) * rect.width,
      y: event.clientY - rect.top - (overlayY / 100) * rect.height,
    }
    setDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || dragPointerId.current !== event.pointerId || !mockupSurfaceRef.current) return
    const rect = mockupSurfaceRef.current.getBoundingClientRect()
    const nextX = ((event.clientX - rect.left - dragOffset.current.x) / rect.width) * 100
    const nextY = ((event.clientY - rect.top - dragOffset.current.y) / rect.height) * 100
    setOverlayX(clampOverlay(nextX))
    setOverlayY(clampOverlay(nextY))
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current === event.pointerId) {
      dragPointerId.current = null
      setDragging(false)
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const startResize = (event: React.PointerEvent<HTMLButtonElement>) => {
    resizePointerId.current = event.pointerId
    resizeStart.current = { scale: overlayScale, x: event.clientX }
    setResizing(true)
    event.currentTarget.setPointerCapture(event.pointerId)
    event.stopPropagation()
  }

  const onResize = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!resizing || resizePointerId.current !== event.pointerId) return
    const delta = (event.clientX - resizeStart.current.x) / 160
    const nextScale = Math.min(2.2, Math.max(0.55, resizeStart.current.scale + delta))
    setOverlayScale(nextScale)
    event.stopPropagation()
  }

  const endResize = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (resizePointerId.current === event.pointerId) {
      resizePointerId.current = null
      setResizing(false)
      event.currentTarget.releasePointerCapture(event.pointerId)
      event.stopPropagation()
    }
  }

  const overlayText = text || 'Your Text Here'
  const previewBackground = backboard.bg

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div style={{ padding: '60px 40px 0' }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Interactive Tool</div>
        <h1 className="display-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white', marginBottom: 16 }}>
          Design Your <span className="neon-text-pink">Sign</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 620, lineHeight: 1.7 }}>
          Build a fast neon concept, then preview it in your own space. This tool is designed to help you move from idea to a clearer mockup request without losing the premium feel of the final sign.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 400px',
          gap: 24,
          padding: '48px 40px',
          minHeight: '80vh',
          alignItems: 'start',
        }}
      >
        <div style={{ position: 'sticky', top: 120 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 16,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                padding: 4,
                borderRadius: 999,
              }}
            >
              {[
                { key: 'standard' as const, label: 'Standard Preview' },
                { key: 'mockup' as const, label: 'Upload Your Space' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setMode(tab.key)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 999,
                    border: 'none',
                    background: mode === tab.key ? 'rgba(194,113,186,0.16)' : 'transparent',
                    color: mode === tab.key ? 'white' : 'var(--text-muted)',
                    fontSize: '0.75rem',
                    letterSpacing: '1.4px',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ color: 'var(--text-muted)', fontSize: '0.76rem', letterSpacing: '1px' }}>
              {mode === 'mockup' ? 'Place the sign on the photo, resize it, and use it as a visual mockup guide.' : 'Live preview updates as you design.'}
            </div>
          </div>

          <div
            ref={previewRef}
            style={{
              background: 'linear-gradient(180deg, #050607 0%, #0d0f12 100%)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              minHeight: 520,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '28px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at top, rgba(115,194,202,0.08), transparent 48%), radial-gradient(circle at bottom, rgba(194,113,186,0.08), transparent 42%)',
                pointerEvents: 'none',
              }}
            />
            {mode === 'mockup' && uploadedImage ? (
              <div
                ref={mockupSurfaceRef}
                style={{
                  width: '100%',
                  maxWidth: 860,
                  aspectRatio: imageAspectRatio.toString(),
                  maxHeight: 430,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: '#080808',
                  boxShadow: '0 26px 70px rgba(0,0,0,0.42)',
                }}
              >
                <img
                  src={uploadedImage.url}
                  alt="Uploaded business space preview"
                  onLoad={event => {
                    const nextRatio = event.currentTarget.naturalWidth / Math.max(event.currentTarget.naturalHeight, 1)
                    setImageAspectRatio(Math.min(1.9, Math.max(0.85, nextRatio)))
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    background: '#060606',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(6,6,6,0.1) 0%, rgba(6,6,6,0.05) 40%, rgba(6,6,6,0.34) 100%)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.04), transparent 50%)',
                    pointerEvents: 'none',
                  }}
                />
                {!showOverlay && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 16,
                      top: 16,
                      padding: '8px 12px',
                      fontSize: '0.72rem',
                      background: 'rgba(5,5,5,0.82)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text-muted)',
                      zIndex: 4,
                    }}
                  >
                    Showing uploaded image only
                  </div>
                )}
                {showOverlay && (
                  <div
                    onPointerDown={startDrag}
                    onPointerMove={onDrag}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    style={{
                      position: 'absolute',
                      left: `${overlayX}%`,
                      top: `${overlayY}%`,
                      transform: `translate(-50%, -50%) scale(${overlayScale})`,
                      cursor: dragging ? 'grabbing' : 'grab',
                      touchAction: 'none',
                      zIndex: 5,
                      userSelect: 'none',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-28% -18%',
                        background: neonHalo,
                        filter: 'blur(24px)',
                        opacity: 0.95,
                        mixBlendMode: 'screen',
                        pointerEvents: 'none',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-18% -8%',
                        color: `rgba(${color.shadow},0.72)`,
                        filter: 'blur(11px)',
                        textAlign: 'center',
                        fontFamily: font.css,
                        fontSize: displayFontSize,
                        lineHeight: 1.1,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        mixBlendMode: 'screen',
                        opacity: 0.82,
                        pointerEvents: 'none',
                      }}
                    >
                      {overlayText}
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-10% -5%',
                        color: `rgba(255,255,255,0.28)`,
                        filter: 'blur(2px)',
                        textAlign: 'center',
                        fontFamily: font.css,
                        fontSize: displayFontSize,
                        lineHeight: 1.1,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        opacity: 0.55,
                        pointerEvents: 'none',
                      }}
                    >
                      {overlayText}
                    </div>
                    <div
                      style={{
                        position: 'relative',
                        fontFamily: font.css,
                        fontSize: displayFontSize,
                        color: color.value,
                        textShadow: glowCSS,
                        textAlign: 'center',
                        lineHeight: 1.1,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        maxWidth: 520,
                        padding: '10px 16px',
                        mixBlendMode: 'screen',
                      }}
                    >
                      {overlayText}
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        left: -34,
                        right: -34,
                        bottom: -46,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        pointerEvents: 'none',
                        opacity: 0.8,
                      }}
                    >
                      <span style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.45)' }} />
                      <span style={{ color: 'white', fontSize: '0.72rem', letterSpacing: '1px' }}>{signWidth}{sizeUnit} W</span>
                      <span style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.45)' }} />
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: -24,
                        bottom: -24,
                        left: -42,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                        pointerEvents: 'none',
                        opacity: 0.8,
                      }}
                    >
                      <span style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.45)' }} />
                      <span style={{ color: 'white', fontSize: '0.72rem', letterSpacing: '1px', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{signHeight}{sizeUnit} H</span>
                      <span style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.45)' }} />
                    </div>
                    <button
                      type="button"
                      onPointerDown={startResize}
                      onPointerMove={onResize}
                      onPointerUp={endResize}
                      onPointerCancel={endResize}
                      aria-label="Resize sign overlay"
                      style={{
                        position: 'absolute',
                        right: -14,
                        bottom: -14,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.55)',
                        background: 'rgba(10,10,10,0.88)',
                        color: 'white',
                        display: 'grid',
                        placeItems: 'center',
                        boxShadow: `0 0 18px rgba(${color.shadow},0.25)`,
                        cursor: 'nwse-resize',
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  maxWidth: 860,
                  minHeight: 430,
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: previewBackground,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 26px 70px rgba(0,0,0,0.42)',
                  padding: '80px 60px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
                      radial-gradient(circle at top right, ${backboard.accent ? `${backboard.accent}33` : 'rgba(255,255,255,0.06)'} 0%, transparent 28%),
                      linear-gradient(180deg, rgba(255,255,255,0.04), transparent 32%),
                      repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)
                    `,
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    fontFamily: font.css,
                    fontSize: displayFontSize,
                    color: color.value,
                    textShadow: glowCSS,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    wordBreak: 'break-word',
                    position: 'relative',
                    zIndex: 1,
                    transition: 'all 0.3s ease',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {overlayText}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(ellipse at center, rgba(${color.shadow},${0.04 * brightness}) 0%, transparent 70%)`,
                    pointerEvents: 'none',
                    transition: 'background 0.3s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 72,
                    right: 72,
                    bottom: 34,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    pointerEvents: 'none',
                    opacity: 0.75,
                  }}
                >
                  <span style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.28)' }} />
                  <span style={{ color: 'white', fontSize: '0.72rem', letterSpacing: '1px' }}>{signWidth}{sizeUnit} W</span>
                  <span style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.28)' }} />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: 72,
                    bottom: 72,
                    left: 26,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    pointerEvents: 'none',
                    opacity: 0.75,
                  }}
                >
                  <span style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.28)' }} />
                  <span style={{ color: 'white', fontSize: '0.72rem', letterSpacing: '1px', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{signHeight}{sizeUnit} H</span>
                  <span style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.28)' }} />
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              textAlign: 'center',
              marginTop: 12,
              fontSize: '0.7rem',
              letterSpacing: '2px',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            {mode === 'mockup' && uploadedImage ? 'Visual Mockup in Your Space · For Placement and Style Direction' : 'Live Preview · Approximate Visual Only'}
          </div>
          <div style={{ textAlign: 'center', marginTop: 8, fontSize: '0.78rem', color: 'rgba(255,255,255,0.56)', lineHeight: 1.5 }}>
            Preview is for visual reference only. Final designs are refined for production.
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={quoteHref}
              className="btn-neon"
              style={{ fontSize: '0.85rem', flex: '1 1 260px', justifyContent: 'center' }}
            >
              Request a Professional Mockup <ArrowRight size={14} />
            </Link>
            <button
              onClick={handleCopyToQuote}
              className="btn-neon btn-neon-cyan"
              style={{ fontSize: '0.85rem', padding: '14px 20px' }}
              title="Copy design specs"
            >
              <Download size={16} />
            </button>
            <button
              onClick={resetBuilder}
              style={{
                padding: '14px 20px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div>
            <div className="section-label" style={{ marginBottom: 10 }}>Step 1</div>
            <h2 style={{ color: 'white', fontSize: '1.1rem', marginBottom: 14, letterSpacing: '0.5px' }}>Enter Your Text</h2>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Your Text
            </label>
            <textarea
              value={text}
              onChange={event => setText(event.target.value)}
              maxLength={60}
              rows={2}
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'white',
                fontFamily: 'Barlow, sans-serif',
                fontSize: '1.1rem',
                padding: '16px',
                resize: 'none',
                outline: 'none',
                lineHeight: 1.5,
                transition: 'border-color 0.2s',
              }}
              onFocus={event => {
                event.currentTarget.style.borderColor = 'var(--neon-pink)'
              }}
              onBlur={event => {
                event.currentTarget.style.borderColor = 'var(--border)'
              }}
              placeholder="Type your sign text..."
            />
            <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
              {PRESET_GROUPS.map(group => (
                <div key={group.label}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 6 }}>
                    {group.label}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {group.items.map(preset => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setText(preset)}
                        style={{
                          padding: '7px 10px',
                          border: '1px solid rgba(255,255,255,0.08)',
                          background: 'rgba(255,255,255,0.03)',
                          color: 'var(--text-muted)',
                          fontSize: '0.72rem',
                        }}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{text.length}/60</div>
            </div>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: 10 }}>Step 2</div>
            <h2 style={{ color: 'white', fontSize: '1.1rem', marginBottom: 14, letterSpacing: '0.5px' }}>Choose Font</h2>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Font Family
            </label>
            <div
              style={{
                padding: 18,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <select
                value={font.name}
                onChange={event => {
                  const nextFont = FONT_STYLES.find(item => item.name === event.target.value)
                  if (nextFont) setFont(nextFont)
                }}
                style={{
                  width: '100%',
                  background: '#080808',
                  border: '1px solid var(--border)',
                  color: 'white',
                  fontFamily: font.css,
                  fontSize: '1rem',
                  padding: '14px 16px',
                  outline: 'none',
                }}
              >
                {FONT_STYLES.map(item => (
                  <option key={item.name} value={item.name} style={{ fontFamily: item.css, backgroundColor: '#080808', color: '#ffffff' }}>
                    {item.name} - {item.bestFor}
                  </option>
                ))}
              </select>
              <div style={{ color: 'white', fontFamily: font.css, fontSize: '1.3rem' }}>{overlayText}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>{font.bestFor}</div>
            </div>
          </div>

          <div>
            <div className="section-label" style={{ marginBottom: 10 }}>Step 3</div>
            <h2 style={{ color: 'white', fontSize: '1.1rem', marginBottom: 14, letterSpacing: '0.5px' }}>Customize Style</h2>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Preview Mode
            </label>
            <div
              style={{
                padding: 18,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                marginBottom: 20,
              }}
            >
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setMode('standard')}
                  style={{
                    padding: '12px 16px',
                    border: `1px solid ${mode === 'standard' ? 'var(--neon-pink)' : 'var(--border)'}`,
                    background: mode === 'standard' ? 'rgba(194,113,186,0.1)' : 'rgba(255,255,255,0.02)',
                    color: mode === 'standard' ? 'white' : 'var(--text-muted)',
                  }}
                >
                  Standard preview
                </button>
                <button
                  type="button"
                  onClick={() => setMode('mockup')}
                  style={{
                    padding: '12px 16px',
                    border: `1px solid ${mode === 'mockup' ? 'var(--neon-cyan)' : 'var(--border)'}`,
                    background: mode === 'mockup' ? 'rgba(115,194,202,0.08)' : 'rgba(255,255,255,0.02)',
                    color: mode === 'mockup' ? 'white' : 'var(--text-muted)',
                  }}
                >
                  Upload your space
                </button>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  onChange={handleUpload}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-neon btn-neon-cyan"
                  style={{ fontSize: '0.8rem', padding: '12px 16px' }}
                >
                  <Upload size={15} /> {uploadedImage ? 'Replace Space Image' : 'Upload Space Image'}
                </button>
                {uploadedImage && (
                  <button
                    type="button"
                    onClick={removeUploadedImage}
                    style={{
                      padding: '12px 16px',
                      border: '1px solid var(--border)',
                      background: 'transparent',
                      color: 'var(--text-muted)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <X size={15} /> Remove Image
                  </button>
                )}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                {uploadedImage ? (
                  <>Using <span style={{ color: 'white' }}>{uploadedImage.name}</span> as your uploaded-space mockup. It is intended to help with placement, scale, and design direction before we produce a refined professional mockup.</>
                ) : (
                  <>Upload a storefront, feature wall, or reception photo to see how your sign could sit in the real space. We will turn this into a cleaner, more accurate professional mockup after submission. Max file size: 8MB.</>
                )}
              </div>
              {uploadError && (
                <div style={{ color: 'var(--neon-pink)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                  {uploadError}
                </div>
              )}
            </div>

            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Neon Color · <span style={{ color: color.value }}>{color.name}</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(44px, 1fr))', gap: 8 }}>
              {NEON_COLORS.map(item => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setColor(item)}
                  title={item.name}
                  style={{
                    aspectRatio: '1',
                    background: item.value,
                    border: color.value === item.value ? '2px solid white' : '2px solid transparent',
                    boxShadow: color.value === item.value ? `0 0 16px ${item.value}, 0 0 32px ${item.value}` : 'none',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    position: 'relative',
                  }}
                >
                  {color.value === item.value && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                      }}
                    >
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Size
            </label>
            <div style={{ padding: 18, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {(['in', 'cm'] as const).map(unit => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => setSizeUnit(unit)}
                    style={{
                      padding: '10px 14px',
                      background: sizeUnit === unit ? 'rgba(194,113,186,0.1)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${sizeUnit === unit ? 'var(--neon-pink)' : 'var(--border)'}`,
                      color: sizeUnit === unit ? 'white' : 'var(--text-muted)',
                    }}
                  >
                    {unit === 'in' ? 'Inches' : 'Centimeters'}
                  </button>
                ))}
              </div>
              <div style={{ display: 'grid', gap: 18 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', marginBottom: 8 }}>
                    <span>Width</span>
                    <span>{signWidth}{sizeUnit}</span>
                  </div>
                  <input
                    type="range"
                    min={sizeUnit === 'in' ? 18 : 45}
                    max={sizeUnit === 'in' ? 72 : 183}
                    value={signWidth}
                    onChange={event => setSignWidth(Number(event.target.value))}
                    style={{ width: '100%', accentColor: 'var(--neon-pink)' }}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', marginBottom: 8 }}>
                    <span>Height</span>
                    <span>{signHeight}{sizeUnit}</span>
                  </div>
                  <input
                    type="range"
                    min={sizeUnit === 'in' ? 8 : 20}
                    max={sizeUnit === 'in' ? 36 : 91}
                    value={signHeight}
                    onChange={event => setSignHeight(Number(event.target.value))}
                    style={{ width: '100%', accentColor: 'var(--neon-cyan)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Brightness
            </label>
            <input
              type="range"
              min={1}
              max={4}
              step={0.25}
              value={brightness}
              onChange={event => setBrightness(Number(event.target.value))}
              style={{ width: '100%', accentColor: 'var(--neon-pink)' }}
            />
          </div>

          {uploadedImage && mode === 'mockup' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
                Overlay Placement
              </label>
              <div style={{ padding: 18, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'grid', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                    <span>Overlay Scale</span>
                    <span>{overlayScale.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min={0.55}
                    max={2.2}
                    step={0.05}
                    value={overlayScale}
                    onChange={event => setOverlayScale(Number(event.target.value))}
                    style={{ width: '100%', accentColor: 'var(--neon-cyan)' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setShowOverlay(current => !current)}
                    style={{
                      padding: '12px 16px',
                      border: '1px solid var(--border)',
                      background: 'rgba(255,255,255,0.02)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {showOverlay ? 'Show Before Image' : 'Show Sign Overlay'}
                  </button>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center' }}>
                    Position: {Math.round(overlayX)}%, {Math.round(overlayY)}%
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>
              Preview Backgrounds
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {BACKBOARD_STYLES.map(item => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setBackboard(item)}
                  style={{
                    padding: 10,
                    background: 'var(--bg-card)',
                    border: `1px solid ${backboard.name === item.name ? 'var(--neon-pink)' : 'var(--border)'}`,
                    color: backboard.name === item.name ? 'white' : 'var(--text-muted)',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      height: 64,
                      borderRadius: 8,
                      marginBottom: 8,
                      background: item.bg,
                      boxShadow: item.accent ? `inset 0 0 0 1px ${item.accent}55` : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                    }}
                  />
                  <span style={{ fontSize: '0.8rem' }}>{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="section-label" style={{ marginBottom: 10 }}>Step 4</div>
            <h2 style={{ color: 'white', fontSize: '1.1rem', marginBottom: 14, letterSpacing: '0.5px' }}>Preview & Request Mockup</h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 12 }}>
              Your builder settings, visual sizing, and any uploaded photo will be included with the request so we can refine it into a production-ready mockup.
            </div>
          </div>

          <div
            style={{
              padding: 24,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--neon-pink)',
            }}
          >
            <div style={{ fontSize: '0.7rem', letterSpacing: '2px', color: 'var(--neon-pink)', textTransform: 'uppercase', marginBottom: 8 }}>
              Ready to bring this to life?
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 16 }}>
              We will review your selected style, sizing, glow, and any uploaded space image, then turn it into a cleaner business-ready mockup and quote.
            </p>
            <Link href={quoteHref} className="btn-neon" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
              REQUEST A PROFESSIONAL MOCKUP <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          div[style*="grid-template-columns: minmax(0, 1fr) 400px"] {
            grid-template-columns: 1fr !important;
          }

          div[style*="position: sticky"] {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
