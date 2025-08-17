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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'SwissKnife - Essential Online Tools',
    description: 'A comprehensive collection of essential online tools including password generator, QR code generator, document converter, and more. Free, fast, and secure.',
    url: 'https://swissknife.site',
    siteName: 'SwissKnife',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
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
    images: ['/icon-512.png'],
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3427635222854268"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}