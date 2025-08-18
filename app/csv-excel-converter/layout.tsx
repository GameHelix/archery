import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSV to Excel Converter - Convert Spreadsheet Formats Online | SwissKnife',
  description: 'Convert between CSV and Excel formats instantly. Free online spreadsheet converter supporting XLSX, XLS, and CSV files. Drag-and-drop interface with preview.',
  keywords: [
    'CSV to Excel converter',
    'Excel to CSV converter',
    'spreadsheet converter',
    'XLSX converter',
    'XLS converter',
    'CSV converter',
    'Excel converter',
    'spreadsheet format converter',
    'free Excel converter',
    'online CSV converter',
    'file format converter',
    'data converter'
  ],
  openGraph: {
    title: 'CSV to Excel Converter - Convert Spreadsheet Formats Online | SwissKnife',
    description: 'Convert between CSV and Excel formats instantly. Free online spreadsheet converter with drag-and-drop interface and live preview.',
    url: 'https://swissknife.site/csv-excel-converter',
    type: 'website',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife CSV Excel Converter'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSV to Excel Converter - Convert Spreadsheet Formats',
    description: 'Convert spreadsheet formats instantly. Free, secure, and browser-based.',
  },
  alternates: {
    canonical: '/csv-excel-converter',
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

export default function CSVExcelConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}