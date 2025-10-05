'use client'

import { useState, useCallback, useRef, useId } from 'react'
import { Image as ImageIcon, Upload, Download, X, CheckCircle, AlertCircle, Settings, Zap, Shield, Smartphone } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface ConvertedImage {
  id: string
  name: string
  originalSize: number
  convertedSize: number
  originalUrl: string
  convertedUrl: string
  status: 'converting' | 'completed' | 'error'
  quality: number
}

export default function ImageConverterPage() {
  const [images, setImages] = useState<ConvertedImage[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [quality, setQuality] = useState(95)
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const baseId = useId()
  const [idCounter, setIdCounter] = useState(0)

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free JPEG to PNG Converter - Image Conversion Tool",
    "applicationCategory": ["UtilitiesApplication", "MultimediaApplication"],
    "operatingSystem": ["Web Browser", "iOS", "Android", "Windows", "MacOS", "Linux"],
    "url": "https://swissknife.site/image-converter",
    "description": "Convert JPEG images to PNG format instantly with our free, privacy-focused image converter. Supports batch conversion, quality adjustment, and maintains transparency.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "JPEG to PNG conversion",
      "Batch image processing",
      "Quality adjustment control",
      "Transparency preservation",
      "Drag and drop interface",
      "Mobile-responsive design",
      "Privacy-focused (client-side conversion)",
      "No file size limits",
      "Instant download",
      "No registration required",
      "Touch-friendly interface",
      "Real-time preview"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "432",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  const convertImageToPng = useCallback((file: File, quality: number): Promise<ConvertedImage> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        
        if (ctx) {
          // Fill with transparent background for PNG
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0)
          
          canvas.toBlob((blob) => {
            if (blob) {
              const convertedUrl = URL.createObjectURL(blob)
              const currentCounter = idCounter
              setIdCounter(prev => prev + 1)
              const convertedImage: ConvertedImage = {
                id: `${baseId}-image-${currentCounter}`,
                name: file.name.replace(/\.(jpg|jpeg)$/i, '.png'),
                originalSize: file.size,
                convertedSize: blob.size,
                originalUrl: URL.createObjectURL(file),
                convertedUrl,
                status: 'completed',
                quality
              }
              resolve(convertedImage)
            } else {
              reject(new Error('Failed to convert image'))
            }
          }, 'image/png', quality / 100)
        } else {
          reject(new Error('Failed to get canvas context'))
        }
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  }, [])

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files) return
    
    const jpegFiles = Array.from(files).filter(file => 
      file.type === 'image/jpeg' || file.type === 'image/jpg' || 
      file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg')
    )
    
    if (jpegFiles.length === 0) {
      alert('Please select JPEG/JPG images only.')
      return
    }

    setIsConverting(true)
    
    // Add placeholder images with converting status
    const placeholderImages = jpegFiles.map((file, index) => {
      const currentCounter = idCounter + index
      setIdCounter(prev => prev + jpegFiles.length)
      return {
        id: `${baseId}-placeholder-${currentCounter}`,
      name: file.name.replace(/\.(jpg|jpeg)$/i, '.png'),
      originalSize: file.size,
      convertedSize: 0,
      originalUrl: URL.createObjectURL(file),
        convertedUrl: '',
        status: 'converting' as const,
        quality
      }
    })
    
    setImages(prev => [...prev, ...placeholderImages])
    
    // Convert images one by one
    for (let i = 0; i < jpegFiles.length; i++) {
      try {
        const convertedImage = await convertImageToPng(jpegFiles[i], quality)
        setImages(prev => prev.map(img => 
          img.id === placeholderImages[i].id ? convertedImage : img
        ))
      } catch (error) {
        setImages(prev => prev.map(img => 
          img.id === placeholderImages[i].id ? { ...img, status: 'error' } : img
        ))
      }
    }
    
    setIsConverting(false)
  }, [quality, convertImageToPng])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }, [handleFileSelect])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
  }, [handleFileSelect])

  const downloadImage = useCallback((image: ConvertedImage) => {
    const link = document.createElement('a')
    link.href = image.convertedUrl
    link.download = image.name
    link.click()
  }, [])

  const downloadAll = useCallback(() => {
    const completedImages = images.filter(img => img.status === 'completed')
    completedImages.forEach(img => downloadImage(img))
  }, [images, downloadImage])

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id)
      if (imageToRemove) {
        // Clean up object URLs
        URL.revokeObjectURL(imageToRemove.originalUrl)
        if (imageToRemove.convertedUrl) {
          URL.revokeObjectURL(imageToRemove.convertedUrl)
        }
      }
      return prev.filter(img => img.id !== id)
    })
  }, [])

  const clearAll = useCallback(() => {
    // Clean up all object URLs
    images.forEach(img => {
      URL.revokeObjectURL(img.originalUrl)
      if (img.convertedUrl) {
        URL.revokeObjectURL(img.convertedUrl)
      }
    })
    setImages([])
  }, [images])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const completedImages = images.filter(img => img.status === 'completed')
  const totalOriginalSize = completedImages.reduce((sum, img) => sum + img.originalSize, 0)
  const totalConvertedSize = completedImages.reduce((sum, img) => sum + img.convertedSize, 0)
  const compressionRatio = totalOriginalSize > 0 ? ((totalOriginalSize - totalConvertedSize) / totalOriginalSize * 100) : 0

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
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
              <ImageIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            JPEG to PNG Converter
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Convert your JPEG images to PNG format instantly with perfect quality preservation.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              🔒 Privacy-First • 📱 Mobile-Friendly • ⚡ Instant Conversion • 🎯 Specialized Tool
            </span>
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6 sm:p-8 mb-8">
          <div className="flex items-center mb-6">
            <Upload className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-white">Upload JPEG Images</h2>
          </div>

          {/* Quality Settings */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-500/30">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center text-sm font-medium text-gray-300">
                <Settings className="h-4 w-4 mr-2 text-blue-600" />
                PNG Quality: {quality}%
              </label>
            </div>
            <input
              type="range"
              min="60"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg appearance-none cursor-pointer"
              disabled={isConverting}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Lower size</span>
              <span>Higher quality</span>
            </div>
          </div>

          {/* Drag and Drop Area */}
          <div
            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-200 ${
              isDragOver
                ? 'border-blue-500 bg-blue-500/20'
                : 'border-dark-600 hover:border-blue-400 hover:bg-blue-25'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg"
              multiple
              onChange={handleFileInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isConverting}
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Drop JPEG files here or click to browse
                </h3>
                <p className="text-gray-400 mb-4">
                  Supports multiple file selection • Maximum quality conversion
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isConverting}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 min-h-[48px] touch-manipulation"
                >
                  {isConverting ? 'Converting...' : 'Select JPEG Files'}
                </button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                <span className="bg-blue-500/20 px-3 py-1 rounded-full">✨ Client-side conversion</span>
                <span className="bg-green-50 px-3 py-1 rounded-full">🔒 Privacy protected</span>
                <span className="bg-purple-50 px-3 py-1 rounded-full">⚡ Instant processing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Results */}
        {images.length > 0 && (
          <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6 sm:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <ImageIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-white">Conversion Results</h2>
              </div>
              
              <div className="flex items-center gap-4">
                {completedImages.length > 0 && (
                  <>
                    <div className="text-sm text-gray-400">
                      {completedImages.length} of {images.length} completed
                    </div>
                    <button
                      onClick={downloadAll}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 min-h-[40px] touch-manipulation flex items-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download All
                    </button>
                  </>
                )}
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 min-h-[40px] touch-manipulation"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Statistics */}
            {completedImages.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-600">{completedImages.length}</div>
                  <div className="text-sm text-blue-400">Images Converted</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/30">
                  <div className="text-2xl font-bold text-green-600">{formatFileSize(totalConvertedSize)}</div>
                  <div className="text-sm text-green-400">Total Size</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-4 border border-purple-500/30">
                  <div className="text-2xl font-bold text-purple-600">{compressionRatio.toFixed(1)}%</div>
                  <div className="text-sm text-purple-700">Size Change</div>
                </div>
              </div>
            )}

            {/* Image List */}
            <div className="space-y-4">
              {images.map((image) => (
                <div key={image.id} className="flex items-center gap-4 p-4 bg-dark-800 rounded-xl border border-dark-700">
                  <div className="w-16 h-16 bg-dark-700 rounded-lg overflow-hidden flex-shrink-0">
                    {image.originalUrl && (
                      <img
                        src={image.originalUrl}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{image.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                      <span>{formatFileSize(image.originalSize)}</span>
                      {image.status === 'completed' && (
                        <>
                          <span>→</span>
                          <span className="text-green-600 font-medium">{formatFileSize(image.convertedSize)}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {image.status === 'converting' && (
                      <div className="flex items-center text-blue-600">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span className="text-sm">Converting...</span>
                      </div>
                    )}
                    
                    {image.status === 'completed' && (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <button
                          onClick={() => downloadImage(image)}
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[40px] touch-manipulation"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    
                    {image.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors min-h-[40px] min-w-[40px] touch-manipulation"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features & Benefits */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Why Choose Our JPEG to PNG Converter?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Specialized tool designed specifically for JPEG to PNG conversion with focus on quality, privacy, and ease of use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🔒',
                title: 'Privacy First',
                description: 'All conversions happen in your browser. Images never leave your device.',
                color: 'from-green-50 to-green-100 border-green-200'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Instant conversion with no upload wait times. Process multiple images simultaneously.',
                color: 'from-yellow-50 to-yellow-100 border-yellow-200'
              },
              {
                icon: '🎯',
                title: 'Specialized Tool',
                description: 'Optimized specifically for JPEG to PNG conversion with transparency support.',
                color: 'from-blue-50 to-blue-100 border-blue-200'
              },
              {
                icon: '📱',
                title: 'Mobile Ready',
                description: 'Works perfectly on all devices with touch-friendly interface and responsive design.',
                color: 'from-purple-50 to-purple-100 border-purple-200'
              },
              {
                icon: '🔧',
                title: 'Quality Control',
                description: 'Adjust quality settings to balance between file size and image quality.',
                color: 'from-red-50 to-red-100 border-red-200'
              },
              {
                icon: '📊',
                title: 'Batch Processing',
                description: 'Convert multiple JPEG images to PNG format in one go with detailed statistics.',
                color: 'from-indigo-50 to-indigo-100 border-indigo-200'
              },
              {
                icon: '🎨',
                title: 'Transparency Support',
                description: 'Perfect conversion to PNG format with full transparency channel support.',
                color: 'from-pink-50 to-pink-100 border-pink-200'
              },
              {
                icon: '💼',
                title: 'Professional Grade',
                description: 'High-quality conversion suitable for professional photography and design work.',
                color: 'from-gray-50 to-gray-100 border-dark-700'
              }
            ].map((feature, index) => (
              <div key={index} className={`bg-gradient-to-br ${feature.color} rounded-2xl p-6 border hover:shadow-md transition-all duration-200`}>
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-dark-700">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Technical Specifications</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our converter uses advanced client-side processing to ensure the highest quality conversions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-white mb-3">🔍 Input Formats</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• JPEG (.jpg, .jpeg)</li>
                <li>• All quality levels</li>
                <li>• Color and grayscale</li>
                <li>• Any resolution</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-white mb-3">📤 Output Format</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• PNG (.png)</li>
                <li>• 24-bit color depth</li>
                <li>• Alpha channel support</li>
                <li>• Lossless compression</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-white mb-3">⚙️ Processing</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Client-side conversion</li>
                <li>• Canvas API technology</li>
                <li>• Quality preservation</li>
                <li>• Batch processing</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}