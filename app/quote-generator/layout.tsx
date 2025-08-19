import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Quote Generator | Inspirational Quotes | SwissKnife',
  description: 'Discover inspiring quotes from famous authors and thinkers. Get random motivational quotes, browse by category, and share wisdom with our quote generator tool.',
  keywords: 'random quotes, inspirational quotes, motivational quotes, famous quotes, quote generator, daily quotes, wisdom, authors',
  openGraph: {
    title: 'Random Quote Generator - Daily Inspiration',
    description: 'Discover inspiring quotes from famous authors and thinkers. Get random motivational quotes and browse by category.',
    type: 'website',
    url: 'https://swissknife.vercel.app/quote-generator',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife Quote Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Quote Generator - Daily Inspiration',
    description: 'Discover inspiring quotes from famous authors and thinkers.',
    images: ['/icon-512.png'],
  },
  alternates: {
    canonical: 'https://swissknife.vercel.app/quote-generator',
  },
};

export default function QuoteGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}