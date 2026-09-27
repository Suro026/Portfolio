import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'GAMEFOLIO — Surajit',
  description:
    'A playable, interactive portfolio. Explore a cyberpunk world as Surajit — Aspiring AI Engineer, IoT Systems Builder, and UI/UX Designer.',
  keywords: ['AI Engineer', 'IoT Systems', 'UI/UX Design', 'Machine Learning', 'Interactive Portfolio', 'Game Portfolio'],
  authors: [{ name: 'Surajit' }],
  openGraph: {
    title: 'GAMEFOLIO — Surajit',
    description: 'A playable, interactive portfolio built like a game.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geist.className} ${geistMono.variable} antialiased bg-background text-foreground overscroll-none`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
