'use client'

import { useState, useCallback, useEffect } from 'react'
import { Link, Copy, Check, AlertCircle, ArrowRightLeft, Globe, RefreshCw } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function URLEncoderPage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [encodingType, setEncodingType] = useState<'standard' | 'component'>('standard')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const processURL = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText('')
      setError('')
      return
    }

    setIsProcessing(true)
    setError('')
    setCopied(false)

    try {
      let result = ''
      
      if (mode === 'encode') {
        if (encodingType === 'standard') {
          // Standard URL encoding (encodeURI)
          result = encodeURI(inputText)
        } else {
          // Component encoding (encodeURIComponent)
          result = encodeURIComponent(inputText)
        }
      } else {
        // Decode
        try {
          result = decodeURIComponent(inputText)
        } catch (decodeError) {
          throw new Error('Invalid URL encoded string')
        }
      }
      
      setOutputText(result)
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(mode === 'encode' ? 'Failed to encode URL' : 'Invalid URL encoded string')
      }
      setOutputText('')
    } finally {
      setTimeout(() => setIsProcessing(false), 100)
    }
  }, [inputText, mode, encodingType])

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

  const loadSampleURL = () => {
    const sample = mode === 'encode' 
      ? 'https://example.com/search?q=hello world&type=web&lang=en'
      : 'https%3A//example.com/search%3Fq%3Dhello%20world%26type%3Dweb%26lang%3Den'
    setInputText(sample)
  }

  // Process URL whenever input or mode changes
  useEffect(() => {
    processURL()
  }, [processURL])

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "URL Encoder/Decoder Tool",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/url-encoder",
    "description": "Encode and decode URLs online. Convert URLs for safe transmission in web applications with support for standard URL encoding and component encoding.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "URL encoding",
      "URL decoding", 
      "Standard URL encoding",
      "Component encoding",
      "Bidirectional conversion",
      "Error validation"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-cyan-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Link className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            URL Encoder/Decoder
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Encode URLs for safe transmission or decode URL-encoded strings back to readable format. Support for standard and component encoding.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              🔗 Safe URL transmission • ⚡ Instant processing • 🔄 Bidirectional conversion
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              {/* Mode and Settings */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {mode === 'encode' ? 'URL Encoder' : 'URL Decoder'}
                </h2>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={swapMode}
                    className="flex items-center space-x-2 px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-lg transition-colors"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
                    </span>
                  </button>
                  <button
                    onClick={loadSampleURL}
                    className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Load Sample
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Encoding Type Selection */}
              {mode === 'encode' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Encoding Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setEncodingType('standard')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        encodingType === 'standard'
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/50 text-gray-700'
                      }`}
                    >
                      <div className="font-medium mb-1">Standard (encodeURI)</div>
                      <div className="text-xs opacity-75">
                        Encodes entire URLs, preserves :/?#[]@
                      </div>
                      <div className="text-xs mt-1 font-mono bg-gray-100 p-1 rounded">
                        space → %20
                      </div>
                    </button>

                    <button
                      onClick={() => setEncodingType('component')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        encodingType === 'component'
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/50 text-gray-700'
                      }`}
                    >
                      <div className="font-medium mb-1">Component (encodeURIComponent)</div>
                      <div className="text-xs opacity-75">
                        Encodes all special characters
                      </div>
                      <div className="text-xs mt-1 font-mono bg-gray-100 p-1 rounded">
                        ? → %3F, & → %26
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {mode === 'encode' ? 'URL to Encode' : 'Encoded URL to Decode'}
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={mode === 'encode' 
                      ? 'Enter URL to encode...\nExample: https://example.com/search?q=hello world' 
                      : 'Enter encoded URL to decode...\nExample: https%3A//example.com/search%3Fq%3Dhello%20world'
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none font-mono text-sm"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {inputText.length} characters
                    </span>
                    {isProcessing && (
                      <div className="flex items-center text-teal-600">
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
                      {mode === 'encode' ? 'Encoded URL Result' : 'Decoded URL Result'}
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
                      ? 'Encoded URL will appear here...' 
                      : 'Decoded URL will appear here...'
                    }
                    rows={4}
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
            {/* About URL Encoding */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-teal-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">About URL Encoding</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  URL encoding converts characters into a format that can be transmitted over the Internet safely.
                </p>
                <div>
                  <div className="font-medium text-gray-900">When to Use:</div>
                  <div className="text-gray-600">
                    • URLs with spaces or special chars<br/>
                    • Form data submission<br/>
                    • API query parameters<br/>
                    • File names in URLs
                  </div>
                </div>
              </div>
            </div>

            {/* Encoding Types */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Link className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Encoding Types</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <div className="font-medium text-gray-900">encodeURI:</div>
                  <div className="text-gray-600">For complete URLs. Preserves URL structure characters.</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">encodeURIComponent:</div>
                  <div className="text-gray-600">For URL parts. Encodes all special characters.</div>
                </div>
              </div>
            </div>

            {/* Common Encodings */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-2xl p-6 border border-teal-200">
              <h3 className="text-lg font-semibold text-teal-900 mb-4">Common Encodings</h3>
              <div className="space-y-2 text-sm text-teal-800">
                <div className="flex justify-between font-mono">
                  <span>space</span>
                  <span>%20</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>?</span>
                  <span>%3F</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>&</span>
                  <span>%26</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>=</span>
                  <span>%3D</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>@</span>
                  <span>%40</span>
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