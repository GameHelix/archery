import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Placeholder Text Generator Online | SwissKnife',
  description: 'Generate Lorem Ipsum placeholder text online. Create words, sentences, or paragraphs of dummy text for design mockups, web development, and content planning.',
  keywords: 'lorem ipsum generator, placeholder text, dummy text, lorem ipsum, text generator, filler text, design mockup text, web development placeholder',
  openGraph: {
    title: 'Lorem Ipsum Generator - Placeholder Text Generator Online',
    description: 'Generate Lorem Ipsum placeholder text for design mockups and web development projects.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Lorem Ipsum Generator - Placeholder Text Generator Online',
    description: 'Generate Lorem Ipsum placeholder text for design mockups and web development projects.',
  },
  alternates: {
    canonical: 'https://swissknife.site/lorem-generator',
  },
}

export default function LoremGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}