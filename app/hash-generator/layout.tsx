import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bcrypt Hash Generator - Secure Password Hashing Online | SwissKnife',
  description: 'Generate secure bcrypt password hashes online with configurable salt rounds. Compare passwords with hashes, client-side processing for maximum security.',
  keywords: 'bcrypt hash generator, password hashing, bcrypt online, hash comparison, salt rounds, secure password storage, password verification, bcrypt tool',
  openGraph: {
    title: 'Bcrypt Hash Generator - Secure Password Hashing Online',
    description: 'Generate secure bcrypt password hashes with configurable salt rounds. Compare passwords with existing hashes safely.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Bcrypt Hash Generator - Secure Password Hashing Online',
    description: 'Generate secure bcrypt password hashes with configurable salt rounds. Compare passwords with existing hashes safely.',
  },
  alternates: {
    canonical: 'https://swissknife.site/hash-generator',
  },
}

export default function HashGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}