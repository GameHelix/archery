import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder - Online Base64 Converter | SwissKnife',
  description: 'Encode and decode Base64 strings online. Convert text to Base64 encoding or decode Base64 back to readable text. Free tool with UTF-8 support and instant processing.',
  keywords: 'base64 encoder, base64 decoder, base64 converter, encode base64, decode base64, base64 online tool, text to base64, base64 to text',
  openGraph: {
    title: 'Base64 Encoder/Decoder - Online Base64 Converter',
    description: 'Encode and decode Base64 strings online with instant processing and UTF-8 support.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Base64 Encoder/Decoder - Online Base64 Converter',
    description: 'Encode and decode Base64 strings online with instant processing and UTF-8 support.',
  },
  alternates: {
    canonical: 'https://swissknife.site/base64-encoder',
  },
}

export default function Base64EncoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}