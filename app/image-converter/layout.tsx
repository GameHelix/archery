import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free JPEG to PNG Converter - Convert Images Online | SwissKnife',
  description: 'Convert JPEG images to PNG format instantly with our free online image converter. Supports batch conversion, quality adjustment, and maintains transparency. No registration required.',
  keywords: [
    'jpeg to png converter',
    'image converter',
    'jpg to png',
    'image format converter',
    'online image converter',
    'free image converter',
    'convert jpeg to png',
    'convert jpg to png',
    'image conversion tool',
    'png converter',
    'jpeg converter',
    'batch image converter',
    'image format changer',
    'photo converter',
    'picture converter',
    'transparent background',
    'lossless conversion',
    'image quality',
    'web image converter',
    'mobile image converter',
    'drag and drop converter',
    'instant conversion',
    'privacy focused',
    'client side conversion',
    'no upload required',
    'image optimization',
    'format conversion',
    'digital image converter'
  ],
  openGraph: {
    title: 'Free JPEG to PNG Converter - Convert Images Online | SwissKnife',
    description: 'Convert JPEG images to PNG format instantly with our free, privacy-focused image converter. Supports batch conversion and quality adjustment.',
    url: 'https://swissknife.site/image-converter',
    type: 'website',
    siteName: 'SwissKnife',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife Free JPEG to PNG Converter - Image Conversion Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JPEG to PNG Converter - Instant Image Conversion',
    description: 'Convert JPEG to PNG format instantly. Privacy-focused with batch conversion and quality control.',
    images: ['https://swissknife.site/icon-512.png'],
  },
  alternates: {
    canonical: '/image-converter',
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

export default function ImageConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}