import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tip Calculator - Calculate Tips and Split Bills | SwissKnife',
  description: 'Calculate tips and split bills easily with our free tip calculator. Supports custom tip percentages, bill splitting for groups, multiple currencies, and instant calculations.',
  keywords: [
    'tip calculator',
    'tip calculator app',
    'bill splitter',
    'tip percentage calculator',
    'restaurant tip calculator',
    'gratuity calculator',
    'bill splitting calculator',
    'tip amount calculator',
    'service tip calculator',
    'dining tip calculator',
    'free tip calculator',
    'online tip calculator',
    'tip splitting tool',
    'restaurant bill calculator',
    'group dining calculator',
    'tip guide',
    'tipping calculator'
  ],
  openGraph: {
    title: 'Tip Calculator - Calculate Tips and Split Bills | SwissKnife',
    description: 'Calculate tips and split bills easily. Free calculator with custom percentages, bill splitting, and multi-currency support.',
    url: 'https://swissknife.site/tip-calculator',
    type: 'website',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife Tip Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tip Calculator - Calculate Tips and Split Bills',
    description: 'Calculate tips and split bills easily. Free, instant, and supports multiple currencies.',
  },
  alternates: {
    canonical: '/tip-calculator',
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

export default function TipCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}