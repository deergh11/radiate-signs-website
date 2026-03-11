'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX - 6 + 'px'
      cursor.style.top = mouseY - 6 + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX - 18) * 0.12
      ringY += (mouseY - ringY - 18) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animate)
    }

    const onEnterLink = () => {
      cursor.style.transform = 'scale(2.5)'
      ring.style.transform = 'scale(1.5)'
      ring.style.borderColor = 'rgba(0,245,255,0.8)'
    }

    const onLeaveLink = () => {
      cursor.style.transform = 'scale(1)'
      ring.style.transform = 'scale(1)'
      ring.style.borderColor = 'rgba(255,45,120,0.5)'
    }

    document.addEventListener('mousemove', onMove)
    animate()

    const links = document.querySelectorAll('a, button, [role="button"]')
    links.forEach(l => {
      l.addEventListener('mouseenter', onEnterLink)
      l.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
