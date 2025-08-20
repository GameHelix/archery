import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UUID/GUID Generator - Create Unique Identifiers Online | SwissKnife',
  description: 'Generate UUID/GUID unique identifiers online. Support for UUID v1, v4, and nil UUID formats with bulk generation. Free tool for developers and applications.',
  keywords: 'uuid generator, guid generator, unique identifier, uuid v4, uuid v1, nil uuid, bulk uuid generation, random uuid, timestamp uuid',
  openGraph: {
    title: 'UUID/GUID Generator - Create Unique Identifiers Online',
    description: 'Generate UUID/GUID unique identifiers with support for multiple versions and bulk generation.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'UUID/GUID Generator - Create Unique Identifiers Online',
    description: 'Generate UUID/GUID unique identifiers with support for multiple versions and bulk generation.',
  },
  alternates: {
    canonical: 'https://swissknife.site/uuid-generator',
  },
}

export default function UUIDGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}