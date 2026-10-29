import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Surajit Sadhukhan | AI Engineer, IoT Builder & UI/UX Designer',
  description:
    'Portfolio of Surajit Sadhukhan (Suro), a CSE AI & ML student building applied AI projects, IoT systems, and user-centered digital experiences in Kolkata, India.',
  keywords: ['AI Engineer', 'IoT Systems', 'UI/UX Design', 'Machine Learning', 'Developer Portfolio', 'Kolkata'],
  authors: [{ name: 'Surajit Sadhukhan' }],
  openGraph: {
    title: 'Surajit Sadhukhan | AI Engineer, IoT Builder & UI/UX Designer',
    description:
      'Portfolio of Surajit Sadhukhan (Suro), a CSE AI & ML student building applied AI projects, IoT systems, and user-centered digital experiences in Kolkata, India.',
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
