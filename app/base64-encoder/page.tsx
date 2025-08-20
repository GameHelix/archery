'use client'

import { useState, useCallback, useEffect } from 'react'
import { Code, Copy, Check, AlertCircle, ArrowRightLeft, FileText, RefreshCw } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Base64EncoderPage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const processText = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText('')
      setError('')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(inputText)))
        setOutputText(encoded)
      } else {
        try {
          const decoded = decodeURIComponent(escape(atob(inputText)))
          setOutputText(decoded)
        } catch (decodeError) {
          throw new Error('Invalid Base64 string')
        }
      }
    } catch (err) {
      setError(mode === 'encode' ? 'Failed to encode text' : 'Invalid Base64 string')
      setOutputText('')
    } finally {
      setTimeout(() => setIsProcessing(false), 100)
    }
  }, [inputText, mode])

  const handleInputChange = (value: string) => {
    setInputText(value)
    setCopied(false)
  }

  const swapMode = () => {
    setMode(prev => prev === 'encode' ? 'decode' : 'encode')
    setInputText(outputText)
    setOutputText('')
    setError('')
    setCopied(false)
  }

  const copyToClipboard = async () => {
    if (!outputText) return
    
    try {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const clearAll = () => {
    setInputText('')
    setOutputText('')
    setError('')
    setCopied(false)
  }

  // Process text whenever input or mode changes
  useEffect(() => {
    processText()
  }, [processText])

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Base64 Encoder/Decoder Tool",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/base64-encoder",
    "description": "Encode and decode Base64 strings online. Convert text to Base64 encoding or decode Base64 back to readable text with instant processing and copy functionality.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Base64 encoding",
      "Base64 decoding",
      "UTF-8 support",
      "Instant processing",
      "Copy to clipboard",
      "Bidirectional conversion"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Code className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Base64 Encoder/Decoder
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Encode text to Base64 format or decode Base64 strings back to readable text. Support for UTF-8 encoding.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              🔒 Client-side processing • ⚡ Instant results • 📋 Copy to clipboard
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              {/* Mode Selector */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
                </h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={swapMode}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
                    </span>
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={mode === 'encode' 
                      ? 'Enter text to encode to Base64...' 
                      : 'Enter Base64 string to decode...'
                    }
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none font-mono text-sm"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {inputText.length} characters
                    </span>
                    {isProcessing && (
                      <div className="flex items-center text-blue-600">
                        <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                        <span className="text-xs">Processing...</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Output Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {mode === 'encode' ? 'Base64 Encoded Result' : 'Decoded Text'}
                    </label>
                    {outputText && (
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors text-sm"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder={mode === 'encode' 
                      ? 'Base64 encoded result will appear here...' 
                      : 'Decoded text will appear here...'
                    }
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 transition-colors resize-none font-mono text-sm"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {outputText.length} characters
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <span className="text-red-800 text-sm">{error}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* About Base64 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Code className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">About Base64</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
                </p>
                <div className="space-y-2">
                  <div>
                    <div className="font-medium text-gray-900">Common Uses:</div>
                    <div className="text-gray-600">
                      • Email attachments (MIME)<br/>
                      • Data URLs in web pages<br/>
                      • JSON Web Tokens (JWT)<br/>
                      • API data transmission
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Check className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Bidirectional conversion
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  UTF-8 character support
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Instant processing
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Copy to clipboard
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Error validation
                </li>
              </ul>
            </div>

            {/* Examples */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Examples</h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div>
                  <div className="font-medium mb-1">Text:</div>
                  <div className="font-mono text-xs bg-blue-100 p-2 rounded">Hello World!</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Base64:</div>
                  <div className="font-mono text-xs bg-blue-100 p-2 rounded break-all">SGVsbG8gV29ybGQh</div>
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