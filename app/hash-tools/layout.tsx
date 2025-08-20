import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MD5/SHA Hash Generator - SwissKnife',
  description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes online. Hash text content or files with multiple algorithms simultaneously. Compare hash values and verify file integrity.',
  keywords: 'MD5 hash, SHA-1, SHA-256, SHA-512, hash generator, checksum, file integrity, cryptographic hash, hash comparison, online hash tool',
  openGraph: {
    title: 'MD5/SHA Hash Generator - SwissKnife',
    description: 'Generate cryptographic hashes using MD5, SHA-1, SHA-256, and SHA-512 algorithms. Hash text or files with multiple algorithms.',
    type: 'website',
    url: 'https://swissknife.site/hash-tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MD5/SHA Hash Generator - SwissKnife',
    description: 'Generate cryptographic hashes using MD5, SHA-1, SHA-256, and SHA-512 algorithms. Hash text or files with multiple algorithms.',
  },
  alternates: {
    canonical: 'https://swissknife.site/hash-tools',
  },
}

export default function HashToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}