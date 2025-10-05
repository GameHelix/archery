'use client'

import { useState, useRef } from 'react'
import { QrCode, Download, Copy, Smartphone, Wifi, Mail, Phone, MessageSquare, Link, Palette, Settings, Check, AlertCircle } from 'lucide-react'
import QRCodeLib from 'qrcode'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function QRGeneratorPage() {
  const [text, setText] = useState('')
  const [qrDataURL, setQrDataURL] = useState('')
  const [errorLevel, setErrorLevel] = useState('M')
  const [size, setSize] = useState(256)
  const [darkColor, setDarkColor] = useState('#000000')
  const [lightColor, setLightColor] = useState('#FFFFFF')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateQR = async () => {
    if (!text.trim()) return

    setIsGenerating(true)
    try {
      const canvas = canvasRef.current
      if (canvas) {
        await QRCodeLib.toCanvas(canvas, text, {
          errorCorrectionLevel: errorLevel as any,
          width: size,
          color: {
            dark: darkColor,
            light: lightColor,
          },
          margin: 2,
        })
        
        const dataURL = canvas.toDataURL('image/png')
        setQrDataURL(dataURL)
      }
    } catch (error) {
      console.error('Error generating QR code:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQR = () => {
    if (qrDataURL) {
      const link = document.createElement('a')
      link.download = 'qrcode.png'
      link.href = qrDataURL
      link.click()
    }
  }

  const copyToClipboard = async () => {
    if (qrDataURL) {
      try {
        const response = await fetch(qrDataURL)
        const blob = await response.blob()
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ])
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('Failed to copy QR code:', error)
        setCopied(false)
      }
    }
  }

  const qrTypes = [
    { 
      id: 'text',
      label: 'Plain Text', 
      placeholder: 'Enter any text to encode...',
      icon: MessageSquare,
      example: 'Hello World!'
    },
    { 
      id: 'url',
      label: 'Website URL', 
      placeholder: 'https://example.com',
      icon: Link,
      example: 'https://swissknife.site'
    },
    { 
      id: 'email',
      label: 'Email Address', 
      placeholder: 'mailto:someone@example.com',
      icon: Mail,
      example: 'mailto:contact@swissknife.site'
    },
    { 
      id: 'phone',
      label: 'Phone Number', 
      placeholder: 'tel:+1234567890',
      icon: Phone,
      example: 'tel:+1-555-123-4567'
    },
    { 
      id: 'sms',
      label: 'SMS Message', 
      placeholder: 'sms:+1234567890',
      icon: MessageSquare,
      example: 'sms:+1-555-123-4567?body=Hello!'
    },
    { 
      id: 'wifi',
      label: 'WiFi Network', 
      placeholder: 'WIFI:T:WPA;S:NetworkName;P:Password;;',
      icon: Wifi,
      example: 'WIFI:T:WPA;S:MyWiFi;P:MyPassword;;'
    },
  ]

  const handleTemplateSelect = (template: typeof qrTypes[0]) => {
    setText(template.example)
    setSelectedTemplate(template.id)
  }

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication", 
    "name": "QR Code Generator Tool",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/qr-generator",
    "description": "Create custom QR codes for URLs, text, WiFi, email, phone numbers with customizable colors and sizes. Free online QR code generator.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Custom QR code generation",
      "Multiple content types support",
      "Color customization",
      "Size adjustment",
      "Error correction levels",
      "Download and copy functionality"
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center justify-center mb-5 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/20 border border-purple-400/30">
              <QrCode className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 leading-tight">
            QR Code Generator
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Create custom QR codes instantly for any purpose. URLs, WiFi passwords, contact info, and more.
          </p>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
            Fully customizable - Mobile optimized - Universal compatibility
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Input Section */}
          <div className="xl:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6 sm:p-8 lg:p-10">
              {/* Quick Templates */}
              <div className="mb-8">
                <div className="flex items-center mb-5 sm:mb-6">
                  <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mr-2 sm:mr-3" />
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Choose QR Code Type</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {qrTypes.map((type) => {
                    const IconComponent = type.icon
                    return (
                      <button
                        key={type.id}
                        onClick={() => handleTemplateSelect(type)}
                        className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation min-h-[80px] sm:min-h-[88px] flex flex-col items-center justify-center ${
                          selectedTemplate === type.id
                            ? 'border-purple-500 bg-purple-500/20 text-purple-400 shadow-lg'
                            : 'border-dark-700 bg-dark-800 hover:border-purple-300 hover:bg-purple-500/10 active:bg-purple-500/20 text-gray-300'
                        }`}
                        aria-label={`Select ${type.label} QR code type`}
                      >
                        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 mb-2 sm:mb-2.5" />
                        <div className="text-sm sm:text-base font-medium text-center leading-tight">{type.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Text Input */}
              <div className="mb-8">
                <label className="block text-lg sm:text-xl font-bold text-white mb-4">
                  Content to Encode
                </label>
                <div className="relative">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={selectedTemplate ? qrTypes.find(t => t.id === selectedTemplate)?.placeholder : "Enter text, URL, or other data to encode..."}
                    rows={5}
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 border-2 border-dark-600 rounded-xl bg-dark-800 text-base sm:text-lg md:text-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 resize-none"
                    aria-label="QR code content"
                  />
                  <div className="absolute bottom-3 right-3 text-xs sm:text-sm text-gray-400 bg-dark-900/80 px-2 py-1 rounded">
                    {text.length} chars
                  </div>
                </div>
              </div>

              {/* Customization Options */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Error Correction & Size */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-white mb-3">
                      <Settings className="inline h-5 w-5 mr-2" />
                      Error Correction
                    </label>
                    <select
                      value={errorLevel}
                      onChange={(e) => setErrorLevel(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-dark-600 rounded-xl bg-dark-800 bg-dark-800 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    >
                      <option value="L">Low (7% recovery)</option>
                      <option value="M">Medium (15% recovery)</option>
                      <option value="Q">Quartile (25% recovery)</option>
                      <option value="H">High (30% recovery)</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Higher levels allow recovery from more damage</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-lg font-semibold text-white">
                        QR Code Size
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-purple-600">{size}</span>
                        <span className="text-sm text-gray-400">px</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="128"
                      max="512"
                      step="32"
                      value={size}
                      onChange={(e) => setSize(parseInt(e.target.value))}
                      className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-500/20"
                      style={{
                        background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${((size - 128) / (512 - 128)) * 100}%, #E5E7EB ${((size - 128) / (512 - 128)) * 100}%, #E5E7EB 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>128px</span>
                      <span>512px</span>
                    </div>
                  </div>
                </div>

                {/* Color Customization */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">
                    <Palette className="inline h-5 w-5 mr-2" />
                    Color Customization
                  </label>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Foreground (QR Pattern)
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          className="w-12 h-12 border-2 border-dark-600 rounded-xl bg-dark-800 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                        />
                        <input
                          type="text"
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          className="flex-1 px-3 py-2 border-2 border-dark-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Background
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          className="w-12 h-12 border-2 border-dark-600 rounded-xl bg-dark-800 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                        />
                        <input
                          type="text"
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          className="flex-1 px-3 py-2 border-2 border-dark-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono"
                          placeholder="#FFFFFF"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateQR}
                disabled={!text.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:from-purple-800 active:to-pink-800 text-white font-bold py-5 sm:py-6 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-base sm:text-lg md:text-xl touch-manipulation min-h-[56px]"
                aria-label="Generate QR code"
              >
                {isGenerating ? (
                  <>
                    <QrCode className="h-5 w-5 sm:h-6 sm:w-6 mr-3 animate-pulse flex-shrink-0" />
                    <span>Generating QR Code...</span>
                  </>
                ) : (
                  <>
                    <QrCode className="h-5 w-5 sm:h-6 sm:w-6 mr-3 flex-shrink-0" />
                    <span>Generate QR Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section & Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* QR Code Display */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Your QR Code</h2>
              
              <div className="text-center">
                <div className="inline-block p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-4 border border-dark-700">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto rounded-lg"
                    style={{ display: qrDataURL ? 'block' : 'none' }}
                  />
                  {!qrDataURL && (
                    <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-dark-600 rounded-xl">
                      <div className="text-center">
                        <QrCode className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">QR code will appear here</p>
                      </div>
                    </div>
                  )}
                </div>

                {qrDataURL && (
                  <div className="space-y-3 sm:space-y-4">
                    <button
                      onClick={downloadQR}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 text-white font-bold py-4 sm:py-5 px-4 sm:px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center text-base sm:text-lg touch-manipulation min-h-[52px]"
                      aria-label="Download QR code as PNG"
                    >
                      <Download className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 flex-shrink-0" />
                      <span>Download PNG</span>
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 active:from-gray-800 active:to-gray-900 text-white font-bold py-4 sm:py-5 px-4 sm:px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center text-base sm:text-lg touch-manipulation min-h-[52px]"
                      aria-label="Copy QR code image to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-green-300 flex-shrink-0" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 flex-shrink-0" />
                          <span>Copy Image</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Usage Tips */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-white">Pro Tips</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Test your QR code with multiple devices
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Use high error correction for small prints
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Ensure good contrast between colors
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Keep URLs short for cleaner codes
                </li>
              </ul>
            </div>

            {/* Examples */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
              <h3 className="text-lg font-semibold text-green-300 mb-4">Popular Examples</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-300 mb-1">Website:</div>
                  <code className="text-xs bg-green-100 px-2 py-1 rounded text-green-400 break-all">https://swissknife.site</code>
                </div>
                <div>
                  <div className="font-medium text-gray-300 mb-1">WiFi:</div>
                  <code className="text-xs bg-green-100 px-2 py-1 rounded text-green-400 break-all">WIFI:T:WPA;S:MyWiFi;P:Password123;;</code>
                </div>
                <div>
                  <div className="font-medium text-gray-300 mb-1">Contact:</div>
                  <code className="text-xs bg-green-100 px-2 py-1 rounded text-green-400 break-all">tel:+1-555-123-4567</code>
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