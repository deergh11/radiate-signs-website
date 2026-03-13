'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type HeroImage = {
  src: string
  alt: string
}

type HeroImageCarouselProps = {
  images: HeroImage[]
}

export function HeroImageCarousel({ images }: HeroImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length)
    }, 4000)

    return () => window.clearInterval(interval)
  }, [images.length])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'clamp(320px, 35vw, 480px)',
        maxHeight: 480,
        borderRadius: 28,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'linear-gradient(180deg, rgba(12,12,12,0.9) 0%, rgba(3,3,3,1) 100%)',
        boxShadow:
          '0 0 0 1px rgba(194,113,186,0.1), 0 30px 80px rgba(0,0,0,0.45), 0 0 60px rgba(194,113,186,0.18)',
      }}
    >
      {images.map((image, index) => (
        <div
          key={image.src}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === activeIndex ? 1 : 0,
            transition: 'opacity 900ms ease',
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 900px) calc(100vw - 80px), 42vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(2,2,2,0.08) 0%, rgba(2,2,2,0.18) 42%, rgba(2,2,2,0.72) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at top right, rgba(115,194,202,0.22), transparent 34%), radial-gradient(circle at bottom left, rgba(194,113,186,0.24), transparent 38%)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 'auto 24px 24px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div>
          <div
            className="section-label"
            style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}
          >
            Real Installations
          </div>
          <div
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.6rem)',
              letterSpacing: '2px',
              color: 'white',
              textShadow: '0 0 30px rgba(194,113,186,0.28)',
            }}
          >
            Commercial Signage In The Wild
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignSelf: 'flex-end' }}>
          {images.map((image, index) => (
            <span
              key={`${image.src}-dot`}
              style={{
                width: index === activeIndex ? 28 : 10,
                height: 10,
                borderRadius: 999,
                background:
                  index === activeIndex ? 'var(--neon-pink)' : 'rgba(255,255,255,0.28)',
                boxShadow:
                  index === activeIndex ? '0 0 14px rgba(194,113,186,0.75)' : 'none',
                transition: 'all 300ms ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
