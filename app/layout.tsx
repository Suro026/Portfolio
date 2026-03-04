import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollProgress } from '@/components/scroll-progress'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Surajit | AI Engineer & Systems Builder',
  description: 'Building intelligent systems at the intersection of AI, IoT, and design. Explore my projects, architecture, and design work.',
  keywords: ['AI Engineer', 'IoT Systems', 'UI/UX Design', 'Machine Learning', 'Full Stack'],
  authors: [{ name: 'Surajit' }],
  openGraph: {
    title: 'Surajit | AI Engineer & Systems Builder',
    description: 'Building intelligent systems at the intersection of AI, IoT, and design.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e0a2e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geist.className} antialiased bg-background text-foreground`}>
        <ScrollProgress />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
