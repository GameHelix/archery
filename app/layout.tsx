import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SwissKnife - Essential Online Tools',
  description: 'A comprehensive collection of essential online tools including password generator, QR code generator, document converter, and more. Free, fast, and secure.',
  keywords: 'online tools, password generator, QR code, document converter, text tools, calculator, utilities',
  authors: [{ name: 'SwissKnife' }],
  creator: 'SwissKnife',
  publisher: 'SwissKnife',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://swissknife.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SwissKnife - Essential Online Tools',
    description: 'A comprehensive collection of essential online tools including password generator, QR code generator, document converter, and more. Free, fast, and secure.',
    url: 'https://swissknife.site',
    siteName: 'SwissKnife',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SwissKnife - Essential Online Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwissKnife - Essential Online Tools',
    description: 'A comprehensive collection of essential online tools including password generator, QR code generator, document converter, and more. Free, fast, and secure.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}