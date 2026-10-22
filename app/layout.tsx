import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Surajit — Developer Portfolio',
  description:
    'Portfolio of Surajit (Suro) — Aspiring AI Engineer, IoT Systems Builder, and UI/UX Designer. Projects, experience, and skills.',
  keywords: ['AI Engineer', 'IoT Systems', 'UI/UX Design', 'Machine Learning', 'Developer Portfolio'],
  authors: [{ name: 'Surajit' }],
  openGraph: {
    title: 'Surajit — Developer Portfolio',
    description: 'Aspiring AI Engineer, IoT Systems Builder, and UI/UX Designer.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#17161c' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
