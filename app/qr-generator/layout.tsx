import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QR Code Generator - Create Custom QR Codes Instantly | SwissKnife',
  description: 'Generate custom QR codes for URLs, text, WiFi, email, phone numbers, and more. Free online QR code generator with customizable colors, sizes, and error correction.',
  keywords: [
    'QR code generator',
    'QR code maker',
    'custom QR code',
    'free QR generator',
    'QR code creator',
    'WiFi QR code',
    'URL QR code',
    'email QR code',
    'phone QR code',
    'QR code online',
    'generate QR code',
    'QR scanner'
  ],
  openGraph: {
    title: 'QR Code Generator - Create Custom QR Codes Instantly | SwissKnife',
    description: 'Generate custom QR codes for URLs, text, WiFi, email, phone numbers, and more. Free online QR code generator with customizable options.',
    url: 'https://swissknife.site/qr-generator',
    type: 'website',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife QR Code Generator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Generator - Create Custom QR Codes Instantly',
    description: 'Generate custom QR codes for any purpose. Free, fast, and fully customizable.',
  },
  alternates: {
    canonical: '/qr-generator',
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

export default function QRGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}