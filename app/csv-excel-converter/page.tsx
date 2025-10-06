'use client'

import { useState, useRef, useCallback, useId } from 'react'
import { Table, Upload, Download, X, Check, AlertCircle, FileSpreadsheet, FileText, RefreshCw, Eye, Settings } from 'lucide-react'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface ConversionFile {
  id: string
  file: File
  name: string
  size: number
  type: string
  format: 'csv' | 'excel'
  status: 'pending' | 'processing' | 'completed' | 'error'
  convertedUrl?: string
  convertedName?: string
  error?: string
  preview?: string[][]
}

type ConversionDirection = 'csv-to-excel' | 'excel-to-csv' | 'auto'

export default function CSVExcelConverterPage() {
  const [files, setFiles] = useState<ConversionFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [conversionMode, setConversionMode] = useState<ConversionDirection>('auto')
  const [showPreview, setShowPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const baseId = useId()
  const [idCounter, setIdCounter] = useState(0)

  const supportedFormats = {
    'csv': { name: 'CSV Files', extensions: '.csv', icon: FileText, description: 'Comma Separated Values' },
    'excel': { name: 'Excel Files', extensions: '.xlsx, .xls', icon: FileSpreadsheet, description: 'Microsoft Excel Spreadsheet' },
  }

  const detectFileFormat = (file: File): 'csv' | 'excel' | null => {
    const extension = file.name.toLowerCase().split('.').pop()
    if (extension === 'csv') return 'csv'
    if (extension === 'xlsx' || extension === 'xls') return 'excel'
    return null
  }

  const generatePreview = async (file: File, format: 'csv' | 'excel'): Promise<string[][]> => {
    if (format === 'csv') {
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
    } else {
      // Excel format
      const buffer = await file.arrayBuffer()
      const workbook = XLSX.read(buffer, { type: 'array' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1, range: 'A1:Z5' }) as string[][]
      return data.length > 0 ? data : [['Empty spreadsheet']]
    }
  }

  const handleFileSelect = useCallback(async (selectedFiles: FileList) => {
    const newFiles: ConversionFile[] = []
    
    for (const file of Array.from(selectedFiles)) {
      const format = detectFileFormat(file)
      if (!format) {
        alert(`File "${file.name}" is not a supported format. Please select CSV or Excel files.`)
        continue
      }

      const preview = await generatePreview(file, format)
      
      const currentCounter = idCounter + newFiles.length
      
      newFiles.push({
        id: `${baseId}-file-${currentCounter}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        format,
        status: 'pending' as const,
        preview
      })
    }

    setIdCounter(prev => prev + newFiles.length)
    setFiles(prev => [...prev, ...newFiles])
  }, [])

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

  const convertFile = async (fileItem: ConversionFile) => {
    setFiles(prev => prev.map(f => 
      f.id === fileItem.id ? { ...f, status: 'processing' } : f
    ))

    try {
      let blob: Blob
      let fileName: string
      let targetFormat: string

      if (fileItem.format === 'csv') {
        // Convert CSV to Excel
        const csvText = await fileItem.file.text()
        const parsed = Papa.parse(csvText, {
          header: false,
          skipEmptyLines: true,  // Skip empty lines
          dynamicTyping: true,   // Convert numeric strings to numbers
        })

        // Filter out completely empty rows and clean data
        const cleanedData = (parsed.data as any[][])
          .filter(row => {
            // Keep row if it has at least one non-empty, non-null value
            return row.some(cell => cell !== null && cell !== undefined && cell !== '')
          })
          .map(row => {
            // Replace null/undefined with empty string for Excel compatibility
            return row.map(cell => cell ?? '')
          })

        // Only create worksheet if we have data
        if (cleanedData.length === 0) {
          throw new Error('No valid data found in CSV file')
        }

        const worksheet = XLSX.utils.aoa_to_sheet(cleanedData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' })
        blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        fileName = fileItem.name.replace(/\.csv$/i, '.xlsx')
        targetFormat = 'Excel'
      } else {
        // Convert Excel to CSV
        const buffer = await fileItem.file.arrayBuffer()
        const workbook = XLSX.read(buffer, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const csvText = XLSX.utils.sheet_to_csv(firstSheet)
        
        blob = new Blob([csvText], { type: 'text/csv' })
        fileName = fileItem.name.replace(/\.(xlsx|xls)$/i, '.csv')
        targetFormat = 'CSV'
      }

      const convertedUrl = URL.createObjectURL(blob)

      setFiles(prev => prev.map(f => 
        f.id === fileItem.id ? { 
          ...f, 
          status: 'completed',
          convertedUrl,
          convertedName: fileName
        } : f
      ))
    } catch (error) {
      console.error('Conversion error:', error)
      setFiles(prev => prev.map(f => 
        f.id === fileItem.id ? { 
          ...f, 
          status: 'error',
          error: 'Conversion failed. Please check your file format.'
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

  const downloadFile = (fileItem: ConversionFile) => {
    if (fileItem.convertedUrl && fileItem.convertedName) {
      const link = document.createElement('a')
      link.href = fileItem.convertedUrl
      link.download = fileItem.convertedName
      link.click()
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getTargetFormat = (sourceFormat: 'csv' | 'excel') => {
    return sourceFormat === 'csv' ? 'Excel' : 'CSV'
  }

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CSV Excel Converter Tool",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/csv-excel-converter",
    "description": "Convert between CSV and Excel formats online. Free spreadsheet converter supporting XLSX, XLS, and CSV files with preview functionality.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "CSV to Excel conversion",
      "Excel to CSV conversion",
      "Batch file processing",
      "Data preview functionality",
      "Drag and drop interface",
      "Multiple format support"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-900 to-dark-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Table className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            CSV/Excel Converter
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Convert between CSV and Excel formats seamlessly. Support for XLSX, XLS, and CSV with live preview.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              📊 Data preview • 🔄 Bidirectional conversion • ⚡ Instant processing
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Converter */}
          <div className="xl:col-span-2">
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6 sm:p-8">
              {/* Conversion Mode Selector */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Settings className="h-5 w-5 text-purple-400 mr-2" />
                  <h2 className="text-xl font-semibold text-white">Conversion Mode</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'auto', label: 'Auto Detect', desc: 'Automatically detect and convert' },
                    { id: 'csv-to-excel', label: 'CSV → Excel', desc: 'Convert CSV to XLSX format' },
                    { id: 'excel-to-csv', label: 'Excel → CSV', desc: 'Convert XLSX/XLS to CSV' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setConversionMode(mode.id as ConversionDirection)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        conversionMode === mode.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-dark-700 bg-dark-800 hover:border-purple-300 hover:bg-purple-50/50 text-gray-300'
                      }`}
                    >
                      <div className="font-medium mb-1">{mode.label}</div>
                      <div className="text-sm opacity-75">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload Area */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-purple-400" />
                  Upload Spreadsheet Files
                </h2>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
                    isDragging
                      ? 'border-purple-500 bg-purple-50 scale-105'
                      : 'border-dark-600 bg-dark-800 hover:border-purple-400 hover:bg-purple-50/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto">
                      <Table className="h-8 w-8 text-purple-400" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Drop spreadsheet files here or click to browse
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base">
                        Supports CSV (.csv) and Excel (.xlsx, .xls) files
                      </p>
                    </div>
                    
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select Files
                    </button>
                  </div>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Files ({files.length})
                    </h3>
                    {files.some(f => f.status === 'pending') && (
                      <button
                        onClick={convertAllFiles}
                        disabled={isProcessing}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    {files.map((file) => {
                      const formatInfo = supportedFormats[file.format]
                      const IconComponent = formatInfo.icon
                      const targetFormat = getTargetFormat(file.format)
                      
                      return (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-4 bg-dark-800 rounded-xl border border-dark-700 hover:border-purple-300 transition-all duration-200"
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="h-5 w-5 text-purple-400" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {formatFileSize(file.size)} • {formatInfo.name} → {targetFormat}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => setShowPreview(showPreview === file.id ? null : file.id)}
                              className="p-2 text-gray-400 hover:text-purple-400 rounded-lg transition-colors"
                              title="Preview data"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            {file.status === 'pending' && (
                              <button
                                onClick={() => convertFile(file)}
                                className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 transition-colors"
                              >
                                Convert
                              </button>
                            )}
                            
                            {file.status === 'processing' && (
                              <div className="flex items-center text-blue-400">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
                                <span className="text-xs font-medium">Processing...</span>
                              </div>
                            )}
                            
                            {file.status === 'completed' && (
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center text-green-400">
                                  <Check className="h-4 w-4 mr-1" />
                                  <span className="text-xs font-medium">Ready</span>
                                </div>
                                <button
                                  onClick={() => downloadFile(file)}
                                  className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
                                >
                                  Download
                                </button>
                              </div>
                            )}
                            
                            {file.status === 'error' && (
                              <div className="flex items-center text-red-400">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                <span className="text-xs font-medium">Error</span>
                              </div>
                            )}
                            
                            <button
                              onClick={() => removeFile(file.id)}
                              className="p-1 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Data Preview */}
              {showPreview && (
                <div className="mt-6 bg-dark-800 rounded-xl p-4 border border-dark-700">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">Data Preview</h4>
                    <button
                      onClick={() => setShowPreview(null)}
                      className="p-1 text-gray-400 hover:text-gray-400 rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                      <tbody>
                        {files.find(f => f.id === showPreview)?.preview?.map((row, i) => (
                          <tr key={i} className={i === 0 ? 'bg-purple-50' : 'bg-white'}>
                            {row.map((cell, j) => (
                              <td key={j} className="px-2 py-1 border border-dark-700 text-gray-300 truncate max-w-32">
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Format Info */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6">
              <div className="flex items-center mb-4">
                <FileSpreadsheet className="h-6 w-6 text-green-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Supported Formats</h3>
              </div>
              
              <div className="space-y-4">
                {Object.entries(supportedFormats).map(([key, info]) => {
                  const IconComponent = info.icon
                  return (
                    <div key={key} className="flex items-start p-3 bg-dark-800 rounded-lg">
                      <IconComponent className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-white">{info.name}</div>
                        <div className="text-xs text-gray-400 mb-1">{info.extensions}</div>
                        <div className="text-xs text-gray-400">{info.description}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Features */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6">
              <div className="flex items-center mb-4">
                <Check className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Features</h3>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Bidirectional conversion
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Data preview before conversion
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Batch file processing
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Preserve data formatting
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Large file support
                </li>
              </ul>
            </div>

            {/* Use Cases */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
              <h3 className="text-lg font-semibold text-green-300 mb-4">Common Use Cases</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div>
                  <div className="font-medium mb-1">Data Import/Export:</div>
                  <div className="text-xs text-green-400">Exchange data between systems</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Report Generation:</div>
                  <div className="text-xs text-green-400">Convert CSV reports to Excel format</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Database Exports:</div>
                  <div className="text-xs text-green-400">Transform database dumps for analysis</div>
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