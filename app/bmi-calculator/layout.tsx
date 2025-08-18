import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BMI Calculator - Body Mass Index Calculator | SwissKnife',
  description: 'Calculate your Body Mass Index (BMI) to assess if you\'re at a healthy weight. Free BMI calculator with metric and imperial units, ideal weight ranges, and health recommendations.',
  keywords: [
    'BMI calculator',
    'body mass index calculator',
    'BMI calculation',
    'healthy weight calculator',
    'weight assessment tool',
    'metric BMI calculator',
    'imperial BMI calculator',
    'ideal weight calculator',
    'health assessment tool',
    'weight status calculator',
    'BMI chart',
    'body weight calculator',
    'fitness calculator',
    'health screening tool',
    'obesity calculator',
    'underweight calculator',
    'overweight calculator',
    'normal weight range',
    'BMI categories',
    'free BMI calculator'
  ],
  openGraph: {
    title: 'BMI Calculator - Body Mass Index Calculator | SwissKnife',
    description: 'Calculate your BMI instantly with our free calculator. Support for metric and imperial units, ideal weight ranges, and personalized health recommendations.',
    url: 'https://swissknife.site/bmi-calculator',
    type: 'website',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife BMI Calculator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator - Body Mass Index Calculator',
    description: 'Calculate your BMI and assess your healthy weight range. Free, instant, and supports both metric and imperial units.',
  },
  alternates: {
    canonical: '/bmi-calculator',
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

export default function BMICalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}