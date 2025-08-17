'use client'

import { useState, useRef } from 'react'
import { QrCode, Download, Copy } from 'lucide-react'
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
        alert('QR code copied to clipboard!')
      } catch (error) {
        console.error('Failed to copy QR code:', error)
        alert('Failed to copy QR code to clipboard')
      }
    }
  }

  const qrTypes = [
    { label: 'Text', placeholder: 'Enter any text' },
    { label: 'URL', placeholder: 'https://example.com' },
    { label: 'Email', placeholder: 'mailto:someone@example.com' },
    { label: 'Phone', placeholder: 'tel:+1234567890' },
    { label: 'SMS', placeholder: 'sms:+1234567890' },
    { label: 'WiFi', placeholder: 'WIFI:T:WPA;S:NetworkName;P:Password;;' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <QrCode className="h-12 w-12 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">QR Code Generator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate QR codes for text, URLs, email addresses, phone numbers, and more. Customize colors and size.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">QR Code Content</h2>
            
            {/* Quick Templates */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Templates
              </label>
              <div className="grid grid-cols-2 gap-2">
                {qrTypes.map((type) => (
                  <button
                    key={type.label}
                    onClick={() => setText(type.placeholder)}
                    className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text or URL
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text, URL, or other data to encode..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Customization Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Error Correction Level
                </label>
                <select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size: {size}px
                </label>
                <input
                  type="range"
                  min="128"
                  max="512"
                  step="32"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foreground Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={generateQR}
              disabled={!text.trim() || isGenerating}
              className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate QR Code'}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated QR Code</h2>
            
            <div className="text-center">
              <div className="inline-block p-4 bg-gray-50 rounded-lg mb-4">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto"
                  style={{ display: qrDataURL ? 'block' : 'none' }}
                />
                {!qrDataURL && (
                  <div className="w-64 h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <QrCode className="h-16 w-16 mx-auto mb-2 text-gray-300" />
                      <p>QR code will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              {qrDataURL && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={downloadQR}
                    className="btn-primary inline-flex items-center justify-center px-4 py-2"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PNG
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="btn-secondary inline-flex items-center justify-center px-4 py-2"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Usage Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
            <div>
              <h4 className="font-medium mb-2">Website URL:</h4>
              <code className="text-sm bg-green-100 px-2 py-1 rounded">https://swissknife.site</code>
            </div>
            <div>
              <h4 className="font-medium mb-2">WiFi Network:</h4>
              <code className="text-sm bg-green-100 px-2 py-1 rounded">WIFI:T:WPA;S:MyNetwork;P:MyPassword;;</code>
            </div>
            <div>
              <h4 className="font-medium mb-2">Email Address:</h4>
              <code className="text-sm bg-green-100 px-2 py-1 rounded">mailto:contact@swissknife.site</code>
            </div>
            <div>
              <h4 className="font-medium mb-2">Phone Number:</h4>
              <code className="text-sm bg-green-100 px-2 py-1 rounded">tel:+1234567890</code>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}