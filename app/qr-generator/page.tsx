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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-lg">
              <QrCode className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            QR Code Generator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create custom QR codes instantly for any purpose. URLs, WiFi passwords, contact info, and more.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              🎨 Fully customizable • 📱 Mobile optimized • 🔗 Universal compatibility
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Input Section */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              {/* Quick Templates */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Smartphone className="h-5 w-5 text-purple-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Choose QR Code Type</h2>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {qrTypes.map((type) => {
                    const IconComponent = type.icon
                    return (
                      <button
                        key={type.id}
                        onClick={() => handleTemplateSelect(type)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                          selectedTemplate === type.id
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 text-gray-700'
                        }`}
                      >
                        <IconComponent className="h-6 w-6 mx-auto mb-2" />
                        <div className="text-sm font-medium">{type.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Text Input */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Content to Encode
                </label>
                <div className="relative">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={selectedTemplate ? qrTypes.find(t => t.id === selectedTemplate)?.placeholder : "Enter text, URL, or other data to encode..."}
                    rows={4}
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 resize-none"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {text.length} characters
                  </div>
                </div>
              </div>

              {/* Customization Options */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Error Correction & Size */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      <Settings className="inline h-5 w-5 mr-2" />
                      Error Correction
                    </label>
                    <select
                      value={errorLevel}
                      onChange={(e) => setErrorLevel(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    >
                      <option value="L">Low (7% recovery)</option>
                      <option value="M">Medium (15% recovery)</option>
                      <option value="Q">Quartile (25% recovery)</option>
                      <option value="H">High (30% recovery)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Higher levels allow recovery from more damage</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-lg font-semibold text-gray-900">
                        QR Code Size
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-purple-600">{size}</span>
                        <span className="text-sm text-gray-500">px</span>
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
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>128px</span>
                      <span>512px</span>
                    </div>
                  </div>
                </div>

                {/* Color Customization */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    <Palette className="inline h-5 w-5 mr-2" />
                    Color Customization
                  </label>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foreground (QR Pattern)
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          className="w-12 h-12 border-2 border-gray-200 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                        />
                        <input
                          type="text"
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          className="w-12 h-12 border-2 border-gray-200 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                        />
                        <input
                          type="text"
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono"
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
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
              >
                {isGenerating ? (
                  <>
                    <QrCode className="h-5 w-5 mr-3 animate-pulse" />
                    Generating QR Code...
                  </>
                ) : (
                  <>
                    <QrCode className="h-5 w-5 mr-3" />
                    Generate QR Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section & Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* QR Code Display */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your QR Code</h2>
              
              <div className="text-center">
                <div className="inline-block p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-4 border border-gray-200">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto rounded-lg"
                    style={{ display: qrDataURL ? 'block' : 'none' }}
                  />
                  {!qrDataURL && (
                    <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-xl">
                      <div className="text-center">
                        <QrCode className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">QR code will appear here</p>
                      </div>
                    </div>
                  )}
                </div>

                {qrDataURL && (
                  <div className="space-y-3">
                    <button
                      onClick={downloadQR}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PNG
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2 text-green-300" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Image
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Usage Tips */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Pro Tips</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
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
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Popular Examples</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-green-800 mb-1">Website:</div>
                  <code className="text-xs bg-green-100 px-2 py-1 rounded text-green-700 break-all">https://swissknife.site</code>
                </div>
                <div>
                  <div className="font-medium text-green-800 mb-1">WiFi:</div>
                  <code className="text-xs bg-green-100 px-2 py-1 rounded text-green-700 break-all">WIFI:T:WPA;S:MyWiFi;P:Password123;;</code>
                </div>
                <div>
                  <div className="font-medium text-green-800 mb-1">Contact:</div>
                  <code className="text-xs bg-green-100 px-2 py-1 rounded text-green-700 break-all">tel:+1-555-123-4567</code>
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