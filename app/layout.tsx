import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'SwissKnife - Essential Online Tools | Free Web Utilities',
    template: '%s | SwissKnife - Free Online Tools'
  },
  description: 'Free online tools for developers, designers & everyone. Password generator, QR codes, text tools, unit converter, BMI calculator & more. No registration required, privacy-first design.',
  keywords: [
    'online tools',
    'web utilities',
    'password generator',
    'QR code generator', 
    'text tools',
    'unit converter',
    'BMI calculator',
    'color palette generator',
    'free tools',
    'web applications',
    'developer tools',
    'productivity tools',
    'browser tools',
    'online utilities',
    'text converter',
    'measurement converter'
  ],
  authors: [{ name: 'SwissKnife', url: 'https://swissknife.site' }],
  creator: 'SwissKnife',
  publisher: 'SwissKnife',
  applicationName: 'SwissKnife',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://swissknife.site'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icon-512.png',
        color: '#3B82F6',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'SwissKnife - Essential Online Tools | Free Web Utilities',
    description: 'Free online tools for developers, designers & everyone. Password generator, QR codes, text tools, unit converter, BMI calculator & more. No registration required.',
    url: 'https://swissknife.site',
    siteName: 'SwissKnife',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife - Essential Online Tools Logo',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwissKnife - Essential Online Tools',
    description: 'Free online tools for developers, designers & everyone. Password generator, QR codes, text tools, unit converter & more. No registration required.',
    images: ['/icon-512.png'],
    creator: '@swissknife_tools',
    site: '@swissknife_tools',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'Web Utilities',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'SwissKnife',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#3B82F6',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3427635222854268"
          crossOrigin="anonymous"
        ></script>
        
        {/* Google Analytics */}
        <script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=G-4KTEVKY2W0"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-4KTEVKY2W0');
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}