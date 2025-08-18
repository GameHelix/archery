import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Timezone Converter - World Clock & Time Zone Tool | SwissKnife',
  description: 'Convert time between different timezones instantly with our free timezone converter. World clock, meeting planner, and timezone comparison tool. Find the perfect time across all global timezones.',
  keywords: [
    'timezone converter',
    'time zone converter',
    'world clock',
    'time converter',
    'timezone conversion',
    'meeting planner',
    'global time',
    'international time',
    'time zones',
    'UTC converter',
    'GMT converter',
    'world time',
    'timezone calculator',
    'time difference calculator',
    'international clock',
    'global clock',
    'time zone map',
    'timezone tool',
    'meeting scheduler',
    'time zone comparison',
    'timezone finder',
    'world meeting planner',
    'timezone scheduling',
    'international meetings',
    'time zone differences',
    'global timezone',
    'timezone lookup',
    'world time converter'
  ],
  openGraph: {
    title: 'Free Timezone Converter - World Clock & Time Zone Tool | SwissKnife',
    description: 'Convert time between different timezones instantly. Perfect for scheduling international meetings and tracking global time differences.',
    url: 'https://swissknife.site/timezone-converter',
    type: 'website',
    siteName: 'SwissKnife',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife Free Timezone Converter - World Clock Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Timezone Converter - World Clock & Meeting Planner',
    description: 'Convert time between timezones instantly. Perfect for international meetings and global scheduling.',
    images: ['https://swissknife.site/icon-512.png'],
  },
  alternates: {
    canonical: '/timezone-converter',
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

export default function TimezoneConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}