'use client'

import { useState, useRef, useCallback, useId } from 'react'
import { Database, Upload, Download, X, Check, AlertCircle, FileText, RefreshCw, Eye, Copy, Settings } from 'lucide-react'
import Papa from 'papaparse'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface CSVFile {
  id: string
  file: File
  name: string
  size: number
  status: 'pending' | 'processing' | 'completed' | 'error'
  sql?: string
  tableName?: string
  error?: string
  preview?: string[][]
}

type SQLDialect = 'mysql' | 'postgresql' | 'sqlite' | 'sqlserver'

export default function CSVToSQLPage() {
  const [files, setFiles] = useState<CSVFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [sqlDialect, setSqlDialect] = useState<SQLDialect>('mysql')
  const [showPreview, setShowPreview] = useState<string | null>(null)
  const [showSQLOutput, setShowSQLOutput] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const baseId = useId()
  const [idCounter, setIdCounter] = useState(0)

  const dialectInfo = {
    mysql: { name: 'MySQL', syntax: 'MySQL/MariaDB compatible' },
    postgresql: { name: 'PostgreSQL', syntax: 'PostgreSQL compatible' },
    sqlite: { name: 'SQLite', syntax: 'SQLite compatible' },
    sqlserver: { name: 'SQL Server', syntax: 'Microsoft SQL Server compatible' }
  }

  const generatePreview = async (file: File): Promise<string[][]> => {
    return new Promise((resolve) => {
      Papa.parse(file, {
        preview: 5,
        complete: (result) => {
          resolve(result.data as string[][])
        },
        error: () => {
          resolve([['Error reading CSV file']])
        }
      })
    })
  }

  const sanitizeColumnName = (name: string): string => {
    return name.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase()
  }

  const detectDataType = (values: string[], dialect: SQLDialect): string => {
    const nonEmptyValues = values.filter(v => v && v.trim() !== '')
    if (nonEmptyValues.length === 0) return dialect === 'sqlserver' ? 'NVARCHAR(MAX)' : 'TEXT'
    
    const isAllNumbers = nonEmptyValues.every(v => !isNaN(Number(v)) && !isNaN(parseFloat(v)))
    const isAllIntegers = nonEmptyValues.every(v => Number.isInteger(Number(v)) && !isNaN(Number(v)))
    const isAllDates = nonEmptyValues.every(v => !isNaN(Date.parse(v)))
    
    const maxLength = Math.max(...nonEmptyValues.map(v => v.length))
    
    if (isAllIntegers && isAllNumbers) {
      return dialect === 'sqlserver' ? 'INT' : 'INTEGER'
    }
    
    if (isAllNumbers) {
      return dialect === 'sqlserver' ? 'DECIMAL(10,2)' : 'DECIMAL(10,2)'
    }
    
    if (isAllDates) {
      switch (dialect) {
        case 'mysql': return 'DATETIME'
        case 'postgresql': return 'TIMESTAMP'
        case 'sqlite': return 'TEXT'
        case 'sqlserver': return 'DATETIME2'
        default: return 'TEXT'
      }
    }
    
    if (maxLength <= 255) {
      switch (dialect) {
        case 'mysql': return `VARCHAR(${Math.max(255, maxLength)})`
        case 'postgresql': return `VARCHAR(${Math.max(255, maxLength)})`
        case 'sqlite': return 'TEXT'
        case 'sqlserver': return `NVARCHAR(${Math.max(255, maxLength)})`
        default: return 'VARCHAR(255)'
      }
    }
    
    switch (dialect) {
      case 'mysql': return 'TEXT'
      case 'postgresql': return 'TEXT'
      case 'sqlite': return 'TEXT'
      case 'sqlserver': return 'NVARCHAR(MAX)'
      default: return 'TEXT'
    }
  }

  const escapeValue = (value: string, dialect: SQLDialect): string => {
    if (value === null || value === undefined || value === '') {
      return 'NULL'
    }
    
    const stringValue = String(value).replace(/'/g, "''")
    return `'${stringValue}'`
  }

  const generateSQL = (data: string[][], tableName: string, dialect: SQLDialect): string => {
    if (data.length === 0) return ''
    
    const headers = data[0].map(header => sanitizeColumnName(header))
    const rows = data.slice(1)
    
    const columns = headers.map((header, index) => {
      const columnData = rows.map(row => row[index] || '')
      const dataType = detectDataType(columnData, dialect)
      return `  ${header} ${dataType}`
    })
    
    let createTableSQL = `CREATE TABLE ${tableName} (\n${columns.join(',\n')}\n);\n\n`
    
    const insertStatements = rows
      .filter(row => row.some(cell => cell && cell.trim() !== ''))
      .map(row => {
        const values = row.map(cell => escapeValue(cell, dialect)).join(', ')
        return `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${values});`
      })
    
    return createTableSQL + insertStatements.join('\n')
  }

  const handleFileSelect = useCallback(async (selectedFiles: FileList) => {
    const newFiles: CSVFile[] = []
    
    for (const file of Array.from(selectedFiles)) {
      if (!file.name.toLowerCase().endsWith('.csv')) {
        alert(`File "${file.name}" is not a CSV file. Please select CSV files only.`)
        continue
      }

      const preview = await generatePreview(file)
      const tableName = sanitizeColumnName(file.name.replace('.csv', ''))
      
      const currentCounter = idCounter + newFiles.length
      
      newFiles.push({
        id: `${baseId}-file-${currentCounter}`,
        file,
        name: file.name,
        size: file.size,
        status: 'pending',
        tableName,
        preview
      })
    }

    setIdCounter(prev => prev + newFiles.length)
    setFiles(prev => [...prev, ...newFiles])
  }, [baseId, idCounter])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files)
    }
  }, [handleFileSelect])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files)
    }
  }, [handleFileSelect])

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }, [])

  const convertFile = async (fileItem: CSVFile) => {
    setFiles(prev => prev.map(f => 
      f.id === fileItem.id ? { ...f, status: 'processing' } : f
    ))

    try {
      const csvText = await fileItem.file.text()
      const parsed = Papa.parse(csvText, { header: false, skipEmptyLines: true })
      
      if (parsed.errors.length > 0) {
        throw new Error('Failed to parse CSV file')
      }

      const sql = generateSQL(parsed.data as string[][], fileItem.tableName!, sqlDialect)

      setFiles(prev => prev.map(f => 
        f.id === fileItem.id ? { 
          ...f, 
          status: 'completed',
          sql
        } : f
      ))
    } catch (error) {
      console.error('Conversion error:', error)
      setFiles(prev => prev.map(f => 
        f.id === fileItem.id ? { 
          ...f, 
          status: 'error',
          error: 'Failed to convert CSV to SQL. Please check your file format.'
        } : f
      ))
    }
  }

  const convertAllFiles = async () => {
    setIsProcessing(true)
    const pendingFiles = files.filter(f => f.status === 'pending')
    
    for (const file of pendingFiles) {
      await convertFile(file)
    }
    
    setIsProcessing(false)
  }

  const downloadSQL = (fileItem: CSVFile) => {
    if (fileItem.sql) {
      const blob = new Blob([fileItem.sql], { type: 'text/sql' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${fileItem.tableName}.sql`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSV to SQL Converter Tool",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/csv-to-sql",
    "description": "Convert CSV files to SQL INSERT statements online. Generate SQL for MySQL, PostgreSQL, SQLite, and SQL Server with automatic data type detection.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "CSV to SQL conversion",
      "Multiple SQL dialects support",
      "Automatic data type detection",
      "SQL INSERT statement generation",
      "Data preview functionality",
      "Batch file processing"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Database className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            CSV to SQL Converter
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Convert CSV files to SQL INSERT statements. Support for MySQL, PostgreSQL, SQLite, and SQL Server.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              🗃️ Auto data types • 💾 Multiple SQL dialects • ⚡ Instant generation
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Settings className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">SQL Dialect</h2>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(dialectInfo).map(([key, info]) => (
                    <button
                      key={key}
                      onClick={() => setSqlDialect(key as SQLDialect)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                        sqlDialect === key
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 text-gray-700'
                      }`}
                    >
                      <div className="font-medium text-sm">{info.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-blue-600" />
                  Upload CSV Files
                </h2>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50 scale-105'
                      : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".csv"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Drop CSV files here or click to browse
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Supports CSV (.csv) files only
                      </p>
                    </div>
                    
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select Files
                    </button>
                  </div>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Files ({files.length})
                    </h3>
                    {files.some(f => f.status === 'pending') && (
                      <button
                        onClick={convertAllFiles}
                        disabled={isProcessing}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Converting...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Convert All
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)} • Table: {file.tableName}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => setShowPreview(showPreview === file.id ? null : file.id)}
                            className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
                            title="Preview data"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {file.status === 'pending' && (
                            <button
                              onClick={() => convertFile(file)}
                              className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Convert
                            </button>
                          )}
                          
                          {file.status === 'processing' && (
                            <div className="flex items-center text-blue-600">
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
                              <span className="text-xs font-medium">Processing...</span>
                            </div>
                          )}
                          
                          {file.status === 'completed' && (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setShowSQLOutput(showSQLOutput === file.id ? null : file.id)}
                                className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
                              >
                                View SQL
                              </button>
                              <button
                                onClick={() => downloadSQL(file)}
                                className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                              >
                                Download
                              </button>
                            </div>
                          )}
                          
                          {file.status === 'error' && (
                            <div className="flex items-center text-red-600">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              <span className="text-xs font-medium">Error</span>
                            </div>
                          )}
                          
                          <button
                            onClick={() => removeFile(file.id)}
                            className="p-1 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showPreview && (
                <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Data Preview</h4>
                    <button
                      onClick={() => setShowPreview(null)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                      <tbody>
                        {files.find(f => f.id === showPreview)?.preview?.map((row, i) => (
                          <tr key={i} className={i === 0 ? 'bg-blue-50' : 'bg-white'}>
                            {row.map((cell, j) => (
                              <td key={j} className="px-2 py-1 border border-gray-200 text-gray-700 truncate max-w-32">
                                {cell || '—'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {showSQLOutput && (
                <div className="mt-6 bg-gray-900 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">Generated SQL</h4>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          const file = files.find(f => f.id === showSQLOutput)
                          if (file?.sql) copyToClipboard(file.sql)
                        }}
                        className="p-1 text-gray-400 hover:text-white rounded"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setShowSQLOutput(null)}
                        className="p-1 text-gray-400 hover:text-white rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
                      {files.find(f => f.id === showSQLOutput)?.sql}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Supported SQL Dialects</h3>
              </div>
              
              <div className="space-y-3">
                {Object.entries(dialectInfo).map(([key, info]) => (
                  <div key={key} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <Database className="h-5 w-5 text-gray-600 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{info.name}</div>
                      <div className="text-xs text-gray-500">{info.syntax}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Check className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Automatic data type detection
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  CREATE TABLE generation
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  INSERT statements
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Multiple SQL dialects
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  SQL syntax highlighting
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Common Use Cases</h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div>
                  <div className="font-medium mb-1">Data Migration:</div>
                  <div className="text-xs text-blue-700">Import CSV data into databases</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Database Seeding:</div>
                  <div className="text-xs text-blue-700">Generate test data for applications</div>
                </div>
                <div>
                  <div className="font-medium mb-1">ETL Processes:</div>
                  <div className="text-xs text-blue-700">Transform CSV to SQL for data pipelines</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}