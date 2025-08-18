import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Converter - Convert Documents to PDF Online | SwissKnife',
  description: 'Convert Word, Text, Images, and other documents to PDF format instantly. Free online PDF converter with drag-and-drop interface. No registration required.',
  keywords: [
    'PDF converter',
    'convert to PDF',
    'Word to PDF',
    'text to PDF',
    'image to PDF',
    'document converter',
    'online PDF maker',
    'free PDF converter',
    'PDF creator',
    'document to PDF',
    'file converter',
    'PDF generator'
  ],
  openGraph: {
    title: 'PDF Converter - Convert Documents to PDF Online | SwissKnife',
    description: 'Convert Word, Text, Images, and other documents to PDF format instantly. Free online PDF converter with drag-and-drop interface.',
    url: 'https://swissknife.site/pdf-converter',
    type: 'website',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife PDF Converter'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Converter - Convert Documents to PDF Online',
    description: 'Convert any document to PDF instantly. Free, secure, and browser-based.',
  },
  alternates: {
    canonical: '/pdf-converter',
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

export default function PDFConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}