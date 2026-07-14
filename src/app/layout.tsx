import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Sonattatrip - Plan Smarter. Travel Better.',
    template: '%s | Sonattatrip',
  },
  description: 'Aplikasi perencanaan perjalanan dengan fitur pelacakan anggaran, itinerary, dan kolaborasi tim.',
  keywords: ['travel', 'trip planning', 'budget', 'expense tracker', 'itinerary', ' Indonesia'],
  authors: [{ name: 'Sonattatrip' }],
  creator: 'Sonattatrip',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://budgettrip.app',
    siteName: 'Sonattatrip',
    title: 'Sonattatrip - Plan Smarter. Travel Better.',
    description: 'Aplikasi perencanaan perjalanan dengan fitur pelacakan anggaran, itinerary, dan kolaborasi tim.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sonattatrip',
    description: 'Plan Smarter. Travel Better.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
