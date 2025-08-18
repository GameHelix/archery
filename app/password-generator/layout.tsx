import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Password Generator - Create Strong & Secure Passwords | SwissKnife',
  description: 'Generate strong, secure passwords instantly with our free password generator. Customizable length, character types, and strength indicator. No storage, completely private.',
  keywords: [
    'password generator',
    'strong password',
    'secure password',
    'random password',
    'password creator',
    'password maker',
    'free password generator',
    'online password tool',
    'password security',
    'cybersecurity'
  ],
  openGraph: {
    title: 'Password Generator - Create Strong & Secure Passwords | SwissKnife',
    description: 'Generate strong, secure passwords instantly with our free password generator. Customizable length, character types, and strength indicator.',
    url: 'https://swissknife.site/password-generator',
    type: 'website',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife Password Generator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator - Create Strong & Secure Passwords',
    description: 'Generate strong, secure passwords instantly. Free, private, and secure.',
  },
  alternates: {
    canonical: '/password-generator',
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

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}