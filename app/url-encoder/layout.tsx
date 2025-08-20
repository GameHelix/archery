import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'URL Encoder/Decoder - Encode URLs for Safe Transmission | SwissKnife',
  description: 'Encode and decode URLs online for safe web transmission. Support for standard URL encoding and component encoding with instant processing and error validation.',
  keywords: 'url encoder, url decoder, encode url, decode url, url encoding online, percent encoding, uri encoding, web development tool',
  openGraph: {
    title: 'URL Encoder/Decoder - Encode URLs for Safe Transmission',
    description: 'Encode and decode URLs online with support for standard and component encoding methods.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'URL Encoder/Decoder - Encode URLs for Safe Transmission',
    description: 'Encode and decode URLs online with support for standard and component encoding methods.',
  },
  alternates: {
    canonical: 'https://swissknife.site/url-encoder',
  },
}

export default function URLEncoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}