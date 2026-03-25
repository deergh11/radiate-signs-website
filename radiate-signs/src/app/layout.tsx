import type { Metadata } from 'next'
import { Barlow, Bebas_Neue } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const barlow = Barlow({
  subsets: ['latin'],
  variable: '--font-barlow',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const bebas = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Radiate Signs - Custom Neon Signs & Signage in Canada',
  description:
    'Custom neon signs, channel letters, LED installs, and UV printed signs for businesses across Canada. Get a free design mockup today.',
  keywords:
    'custom neon signs canada, neon signs toronto, channel letters, LED signage, business signs GTA, custom signs brampton',
  openGraph: {
    title: 'Radiate Signs - Custom Neon Signs & Signage in Canada',
    description:
      'We design, source, and install custom neon signs and commercial signage for businesses across Canada.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${bebas.variable} grain`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}
