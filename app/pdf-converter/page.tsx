'use client'

import { useState, useRef, useCallback, useId } from 'react'
import { FileText, Upload, Download, X, Check, AlertCircle, File, Image, FileUp, Zap } from 'lucide-react'
import jsPDF from 'jspdf'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface FileItem {
  id: string
  file: File
  name: string
  size: number
  type: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  pdfUrl?: string
  error?: string
}

export default function PDFConverterPage() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const baseId = useId()
  const [idCounter, setIdCounter] = useState(0)

  const supportedTypes = {
    'text/plain': { name: 'Text Files', extensions: '.txt', icon: FileText },
    'text/html': { name: 'HTML Files', extensions: '.html, .htm', icon: FileText },
    'text/markdown': { name: 'Markdown Files', extensions: '.md', icon: FileText },
    'image/jpeg': { name: 'JPEG Images', extensions: '.jpg, .jpeg', icon: Image },
    'image/png': { name: 'PNG Images', extensions: '.png', icon: Image },
    'image/gif': { name: 'GIF Images', extensions: '.gif', icon: Image },
    'image/webp': { name: 'WebP Images', extensions: '.webp', icon: Image },
  }

  const handleFileSelect = useCallback((selectedFiles: FileList) => {
    const newFiles: FileItem[] = Array.from(selectedFiles).map((file, index) => {
      const currentCounter = idCounter + index
      return {
        id: `${baseId}-pdf-${currentCounter}`,
      file,
      name: file.name,
      size: file.size,
        type: file.type,
        status: 'pending' as const
      }
    }).filter(fileItem => {
      if (!Object.keys(supportedTypes).includes(fileItem.type)) {
        alert(`File type "${fileItem.type}" is not supported. Please select text files or images.`)
        return false
      }
      return true
    })

    setIdCounter(prev => prev + selectedFiles.length)
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

  const convertToPDF = async (fileItem: FileItem) => {
    setFiles(prev => prev.map(f => 
      f.id === fileItem.id ? { ...f, status: 'processing' } : f
    ))

    try {
      const pdf = new jsPDF()
      let pdfUrl: string

      if (fileItem.type.startsWith('text/') || fileItem.type === 'text/html') {
        // Handle text files
        const text = await fileItem.file.text()
        
        // Clean HTML if needed
        let cleanText = text
        if (fileItem.type === 'text/html') {
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = text
          cleanText = tempDiv.textContent || tempDiv.innerText || ''
        }

        // Add text to PDF with proper line wrapping
        const pageWidth = pdf.internal.pageSize.width
        const margin = 20
        const maxWidth = pageWidth - (margin * 2)
        
        // Split text into lines that fit the page width
        const lines = pdf.splitTextToSize(cleanText, maxWidth)
        
        // Add title
        pdf.setFontSize(16)
        pdf.text(`Converted from: ${fileItem.name}`, margin, 20)
        
        // Add content
        pdf.setFontSize(12)
        let yPosition = 40
        
        for (const line of lines) {
          if (yPosition > pdf.internal.pageSize.height - margin) {
            pdf.addPage()
            yPosition = margin
          }
          pdf.text(line, margin, yPosition)
          yPosition += 7
        }

        // Create blob and URL
        const pdfBlob = pdf.output('blob')
        pdfUrl = URL.createObjectURL(pdfBlob)

      } else if (fileItem.type.startsWith('image/')) {
        // Handle image files
        const imageUrl = URL.createObjectURL(fileItem.file)
        
        return new Promise<void>((resolve) => {
          const img = new globalThis.Image()
          img.onload = () => {
            const imgWidth = pdf.internal.pageSize.width - 40
            const imgHeight = (img.height * imgWidth) / img.width
            
            // Add title
            pdf.setFontSize(16)
            pdf.text(`Image: ${fileItem.name}`, 20, 20)
            
            // Add image
            pdf.addImage(img, 'JPEG', 20, 30, imgWidth, imgHeight)
            
            // Create blob and URL
            const pdfBlob = pdf.output('blob')
            const pdfUrl = URL.createObjectURL(pdfBlob)
            
            setFiles(prev => prev.map(f => 
              f.id === fileItem.id ? { 
                ...f, 
                status: 'completed',
                pdfUrl 
              } : f
            ))
            
            URL.revokeObjectURL(imageUrl)
            resolve(undefined)
          }
          img.onerror = () => {
            setFiles(prev => prev.map(f => 
              f.id === fileItem.id ? { 
                ...f, 
                status: 'error',
                error: 'Failed to load image for conversion.'
              } : f
            ))
            URL.revokeObjectURL(imageUrl)
            resolve(undefined)
          }
          img.src = imageUrl
        })
      }

      setFiles(prev => prev.map(f => 
        f.id === fileItem.id ? { 
          ...f, 
          status: 'completed',
          pdfUrl 
        } : f
      ))
    } catch (error) {
      console.error('PDF conversion error:', error)
      setFiles(prev => prev.map(f => 
        f.id === fileItem.id ? { 
          ...f, 
          status: 'error',
          error: 'Conversion failed. Please try again.'
        } : f
      ))
    }
  }

  const convertAllFiles = async () => {
    setIsProcessing(true)
    const pendingFiles = files.filter(f => f.status === 'pending')
    
    for (const file of pendingFiles) {
      await convertToPDF(file)
    }
    
    setIsProcessing(false)
  }

  const downloadFile = (fileItem: FileItem) => {
    if (fileItem.pdfUrl) {
      const link = document.createElement('a')
      link.href = fileItem.pdfUrl
      link.download = `${fileItem.name.split('.')[0]}.pdf`
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

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF Converter Tool",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/pdf-converter",
    "description": "Convert documents and images to PDF format online. Free PDF converter supporting text files, HTML, images, and more.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Text to PDF conversion",
      "Image to PDF conversion", 
      "HTML to PDF conversion",
      "Drag and drop interface",
      "Batch conversion support",
      "No file size limits"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-lg">
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            PDF Converter
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Convert your documents and images to PDF format instantly. Support for text files, images, and more.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              📄 Multiple formats • 🚀 Instant conversion • 🔒 Secure & private
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Converter */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              {/* File Upload Area */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-red-600" />
                  Upload Files
                </h2>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
                    isDragging
                      ? 'border-red-500 bg-red-50 scale-105'
                      : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".txt,.html,.htm,.md,.jpg,.jpeg,.png,.gif,.webp"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
                      <FileUp className="h-8 w-8 text-red-600" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Drop files here or click to browse
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Support for text files, HTML, images (JPG, PNG, GIF, WebP)
                      </p>
                    </div>
                    
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
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
                    <h3 className="text-lg font-semibold text-gray-900">
                      Files ({files.length})
                    </h3>
                    {files.some(f => f.status === 'pending') && (
                      <button
                        onClick={convertAllFiles}
                        disabled={isProcessing}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <>
                            <Zap className="h-4 w-4 mr-2 animate-pulse" />
                            Converting...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Convert All
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {files.map((file) => {
                      const typeInfo = supportedTypes[file.type as keyof typeof supportedTypes]
                      const IconComponent = typeInfo?.icon || File
                      
                      return (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-red-300 transition-all duration-200"
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="h-5 w-5 text-red-600" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(file.size)} • {typeInfo?.name || 'Unknown'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            {file.status === 'pending' && (
                              <button
                                onClick={() => convertToPDF(file)}
                                className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors"
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
                                <div className="flex items-center text-green-600">
                                  <Check className="h-4 w-4 mr-1" />
                                  <span className="text-xs font-medium">Ready</span>
                                </div>
                                <button
                                  onClick={() => downloadFile(file)}
                                  className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
                                >
                                  Download PDF
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
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Supported Formats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <File className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Supported Formats</h3>
              </div>
              
              <div className="space-y-3">
                {Object.entries(supportedTypes).map(([type, info]) => {
                  const IconComponent = info.icon
                  return (
                    <div key={type} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <IconComponent className="h-5 w-5 text-gray-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{info.name}</div>
                        <div className="text-xs text-gray-500">{info.extensions}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Lightning fast conversion
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  No file size limits
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Batch processing support
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  High-quality output
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Works offline in browser
                </li>
              </ul>
            </div>

            {/* Privacy Notice */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center mb-3">
                <AlertCircle className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-900">100% Private</h3>
              </div>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                  All conversions happen in your browser
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                  Files never leave your device
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                  No data stored on our servers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}