import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JSON Formatter/Validator - Format & Validate JSON Online | SwissKnife',
  description: 'Format, validate, and minify JSON data online. Pretty print JSON with custom indentation, validate JSON syntax, and analyze JSON structure with detailed error reporting.',
  keywords: 'json formatter, json validator, json prettify, json minify, json online tool, format json, validate json syntax, json pretty print',
  openGraph: {
    title: 'JSON Formatter/Validator - Format & Validate JSON Online',
    description: 'Format, validate, and minify JSON data with syntax validation and structure analysis.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JSON Formatter/Validator - Format & Validate JSON Online',
    description: 'Format, validate, and minify JSON data with syntax validation and structure analysis.',
  },
  alternates: {
    canonical: 'https://swissknife.site/json-formatter',
  },
}

export default function JSONFormatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}