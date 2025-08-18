import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Tools Suite - Case Conversion & Text Analysis | SwissKnife',
  description: 'Comprehensive text manipulation tools for case conversion, text analysis, and formatting. Transform text to uppercase, lowercase, camelCase, snake_case, kebab-case and more. Free online text tools.',
  keywords: [
    'text tools',
    'case conversion',
    'text analysis',
    'text manipulation',
    'uppercase converter',
    'lowercase converter',
    'camelCase converter',
    'snake_case converter',
    'kebab-case converter',
    'title case converter',
    'word count tool',
    'character count tool',
    'text counter',
    'text formatter',
    'text transformer',
    'free text tools',
    'online text converter'
  ],
  openGraph: {
    title: 'Text Tools Suite - Case Conversion & Text Analysis | SwissKnife',
    description: 'Transform text with comprehensive case conversion, analysis, and manipulation tools. Real-time processing with one-click copy.',
    url: 'https://swissknife.site/text-tools',
    type: 'website',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife Text Tools Suite'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Tools Suite - Case Conversion & Analysis',
    description: 'Transform text with comprehensive tools for case conversion, analysis, and manipulation. Free and instant.',
  },
  alternates: {
    canonical: '/text-tools',
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

export default function TextToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}