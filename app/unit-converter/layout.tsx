import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Unit Converter - Length, Weight, Temperature & More | SwissKnife',
  description: 'Convert between different units of measurement with our free, mobile-friendly unit converter. Supports length, weight, temperature, volume, area, and speed conversions. Instant results with detailed formulas.',
  keywords: [
    'unit converter',
    'measurement converter',
    'length converter',
    'weight converter',
    'temperature converter',
    'volume converter',
    'area converter',
    'speed converter',
    'metric converter',
    'imperial converter',
    'celsius to fahrenheit',
    'meters to feet',
    'kilograms to pounds',
    'kilometers to miles',
    'liters to gallons',
    'online converter',
    'free converter',
    'mobile converter',
    'measurement tool',
    'conversion calculator',
    'units of measurement',
    'metric system',
    'imperial system',
    'conversion formulas',
    'instant converter',
    'responsive converter',
    'conversion tool',
    'unit calculator'
  ],
  openGraph: {
    title: 'Free Unit Converter - Length, Weight, Temperature & More | SwissKnife',
    description: 'Convert between different units of measurement with our free, mobile-friendly unit converter. Supports 6 categories with instant results and conversion formulas.',
    url: 'https://swissknife.site/unit-converter',
    type: 'website',
    siteName: 'SwissKnife',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife Free Unit Converter - Measurement Conversion Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Unit Converter - Instant Measurement Conversions',
    description: 'Convert length, weight, temperature, volume, area, and speed units instantly. Mobile-friendly with conversion formulas.',
    images: ['https://swissknife.site/icon-512.png'],
  },
  alternates: {
    canonical: '/unit-converter',
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

export default function UnitConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}