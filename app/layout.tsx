import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'SwissKnife - 12 Essential Free Online Tools | Web Utilities 2025',
    template: '%s | SwissKnife - Free Online Tools'
  },
  description: 'Access 12 powerful free online tools: Password generator, QR code creator, text converter, unit calculator, BMI tracker, PDF converter & more. No signup required, 100% privacy-focused web utilities for developers, students, and professionals.',
  keywords: [
    // Primary keywords
    'free online tools 2025',
    'web utilities collection',
    'online productivity tools',
    'browser-based utilities',
    'no registration tools',
    
    // Tool-specific keywords
    'secure password generator online',
    'QR code generator free custom',
    'text case converter uppercase lowercase',
    'unit converter metric imperial',
    'BMI calculator body mass index',
    'color palette generator hex codes',
    'PDF converter documents online',
    'CSV Excel converter free',
    'tip calculator bill splitter',
    'todo list task manager',
    'image format converter',
    'timezone converter world clock',
    
    // Target audience keywords
    'developer tools online',
    'student utility tools',
    'business productivity tools',
    'design tools online',
    'calculation tools free',
    
    // Feature keywords
    'privacy focused tools',
    'no download required',
    'mobile friendly tools',
    'instant online tools',
    'secure web utilities',
    'professional grade tools'
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
    title: 'SwissKnife - 12 Essential Free Online Tools | Web Utilities 2025',
    description: 'Access 12 powerful free online tools: Password generator, QR code creator, text converter, unit calculator, BMI tracker, PDF converter & more. No signup required, 100% privacy-focused web utilities for developers, students, and professionals.',
    url: 'https://swissknife.site',
    siteName: 'SwissKnife',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife - 12 Essential Free Online Tools for Developers and Everyone',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwissKnife - 12 Free Online Tools | 2025',
    description: '🛠️ 12 powerful online tools: Password generator, QR codes, text converter, BMI calculator & more. 100% free, no signup required!',
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
    yandex: process.env.YANDEX_VERIFICATION || '',
    yahoo: process.env.YAHOO_SITE_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    },
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'SwissKnife',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#3B82F6',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#3B82F6',
    'color-scheme': 'light',
    'rating': 'general',
    'distribution': 'global',
    'revisit-after': '1 days',
    'language': 'EN',
    'geo.region': 'US',
    'geo.placename': 'Global',
    // Advanced SEO meta tags
    'content-language': 'en-US',
    'audience': 'all',
    'doc-type': 'Web Page',
    'doc-rights': 'Copywritten Work',
    'doc-class': 'Living Document',
    'copyright': 'SwissKnife 2025',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'expires': '0',
    // Rich snippets optimization
    'og:see_also': 'https://swissknife.site/about',
    'article:author': 'SwissKnife',
    'article:publisher': 'https://swissknife.site',
    // Performance hints
    'dns-prefetch-control': 'on',
    'preconnect': 'https://fonts.googleapis.com',
    // Security headers
    'referrer': 'strict-origin-when-cross-origin',
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
      <body className="min-h-screen bg-dark-primary dark">
        {children}
      </body>
    </html>
  )
}