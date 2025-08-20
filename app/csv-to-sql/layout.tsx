import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CSV to SQL Converter - Generate INSERT Statements Online | SwissKnife',
  description: 'Convert CSV files to SQL INSERT statements online. Support for MySQL, PostgreSQL, SQLite, SQL Server. Automatic data type detection and CREATE TABLE generation.',
  keywords: 'csv to sql, csv converter, sql generator, insert statements, mysql, postgresql, sqlite, sql server, database migration, data import',
  openGraph: {
    title: 'CSV to SQL Converter - Generate INSERT Statements Online',
    description: 'Convert CSV files to SQL INSERT statements with automatic data type detection. Support for multiple SQL dialects.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'CSV to SQL Converter - Generate INSERT Statements Online',
    description: 'Convert CSV files to SQL INSERT statements with automatic data type detection. Support for multiple SQL dialects.',
  },
  alternates: {
    canonical: 'https://swissknife.site/csv-to-sql',
  },
}

export default function CSVToSQLLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}