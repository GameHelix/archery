import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free GIF to MP4 Converter - Convert Animated GIFs Online | SwissKnife',
  description: 'Convert GIF animations to MP4 videos instantly with our free online converter. Reduce file size by up to 95% while maintaining quality. Supports batch conversion and custom quality settings.',
  keywords: [
    'gif to mp4 converter',
    'gif to video converter',
    'animated gif converter',
    'gif to mp4 online',
    'convert gif to mp4',
    'gif video converter',
    'animation converter',
    'gif compression',
    'reduce gif size',
    'gif optimizer',
    'video converter',
    'media converter',
    'free gif converter',
    'online gif to mp4',
    'gif to movie',
    'batch gif converter',
    'gif file converter',
    'animated image converter',
    'gif to mp4 free',
    'convert animation to video',
    'gif compressor',
    'video optimization',
    'file size reducer',
    'gif transformation',
    'multimedia converter',
    'gif processing tool',
    'video format converter',
    'gif encoder'
  ],
  openGraph: {
    title: 'Free GIF to MP4 Converter - Convert Animated GIFs Online | SwissKnife',
    description: 'Convert GIF animations to MP4 videos with up to 95% file size reduction. Batch processing and quality control included.',
    url: 'https://swissknife.site/media-converter',
    type: 'website',
    siteName: 'SwissKnife',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife Free GIF to MP4 Converter - Animation Conversion Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free GIF to MP4 Converter - Reduce File Size by 95%',
    description: 'Convert animated GIFs to MP4 videos with massive file size reduction and quality preservation.',
    images: ['https://swissknife.site/icon-512.png'],
  },
  alternates: {
    canonical: '/media-converter',
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

export default function MediaConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}