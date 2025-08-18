import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Color Palette Generator - Design Color Schemes | SwissKnife',
  description: 'Generate beautiful color palettes for your designs with our free color palette generator. Create monochromatic, complementary, analogous, triadic, and random color schemes. Export palettes instantly.',
  keywords: [
    'color palette generator',
    'color scheme generator',
    'color harmony',
    'design colors',
    'color theory',
    'monochromatic colors',
    'complementary colors',
    'analogous colors',
    'triadic colors',
    'color wheel',
    'hex colors',
    'rgb colors',
    'hsl colors',
    'design tool',
    'color picker',
    'palette export',
    'color combinations',
    'web design colors',
    'graphic design',
    'color inspiration',
    'brand colors',
    'ui colors',
    'free color tool',
    'online color generator',
    'color swatches',
    'design palette',
    'color matching',
    'visual design'
  ],
  openGraph: {
    title: 'Free Color Palette Generator - Design Color Schemes | SwissKnife',
    description: 'Generate beautiful color palettes with monochromatic, complementary, analogous, and triadic schemes. Perfect for designers and developers.',
    url: 'https://swissknife.site/color-palette',
    type: 'website',
    siteName: 'SwissKnife',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife Color Palette Generator - Design Color Schemes Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Color Palette Generator - Design Perfect Color Schemes',
    description: 'Generate harmonious color palettes with color theory algorithms. Export HEX, RGB, HSL values instantly.',
    images: ['https://swissknife.site/icon-512.png'],
  },
  alternates: {
    canonical: '/color-palette',
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

export default function ColorPaletteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}