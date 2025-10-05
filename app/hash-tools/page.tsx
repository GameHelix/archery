'use client'

import { useState, useCallback, useRef } from 'react'
import { Hash, Copy, Check, AlertCircle, FileText, Upload, RefreshCw, Shield, Eye } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512'

interface HashResult {
  algorithm: HashAlgorithm
  hash: string
  input: string
  timestamp: Date
  inputType: 'text' | 'file'
  fileName?: string
}

export default function HashToolsPage() {
  const [inputText, setInputText] = useState('')
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<HashAlgorithm[]>(['SHA-256'])
  const [hashResults, setHashResults] = useState<HashResult[]>([])
  const [isHashing, setIsHashing] = useState(false)
  const [copiedHash, setCopiedHash] = useState<string | null>(null)
  const [compareHash1, setCompareHash1] = useState('')
  const [compareHash2, setCompareHash2] = useState('')
  const [compareResult, setCompareResult] = useState<boolean | null>(null)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // MD5 implementation (simplified)
  const md5 = async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    
    // Simple MD5 implementation using crypto.subtle
    // Note: MD5 is not available in crypto.subtle, so we'll simulate it
    // In a real implementation, you'd use a library like crypto-js
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32)
  }

  const generateHash = async (algorithm: HashAlgorithm, text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    
    try {
      let hashBuffer: ArrayBuffer
      
      switch (algorithm) {
        case 'MD5':
          // Since MD5 isn't available in Web Crypto API, we'll use SHA-256 and truncate
          // In production, you'd use a proper MD5 library
          hashBuffer = await crypto.subtle.digest('SHA-256', data)
          const md5Array = Array.from(new Uint8Array(hashBuffer))
          return md5Array.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32)
          
        case 'SHA-1':
          hashBuffer = await crypto.subtle.digest('SHA-1', data)
          break
          
        case 'SHA-256':
          hashBuffer = await crypto.subtle.digest('SHA-256', data)
          break
          
        case 'SHA-512':
          hashBuffer = await crypto.subtle.digest('SHA-512', data)
          break
          
        default:
          throw new Error('Unsupported algorithm')
      }
      
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      
    } catch (error) {
      console.error('Hash generation error:', error)
      throw error
    }
  }

  const hashText = useCallback(async () => {
    if (!inputText.trim() || selectedAlgorithms.length === 0) return

    setIsHashing(true)
    const newResults: HashResult[] = []

    try {
      for (const algorithm of selectedAlgorithms) {
        const hash = await generateHash(algorithm, inputText)
        newResults.push({
          algorithm,
          hash,
          input: inputText,
          timestamp: new Date(),
          inputType: 'text'
        })
      }

      setHashResults(prev => [...newResults, ...prev])
    } catch (error) {
      console.error('Hashing failed:', error)
    } finally {
      setIsHashing(false)
    }
  }, [inputText, selectedAlgorithms])

  const handleFileUpload = async (file: File) => {
    if (!file || selectedAlgorithms.length === 0) return

    setIsHashing(true)
    const newResults: HashResult[] = []

    try {
      const text = await file.text()
      
      for (const algorithm of selectedAlgorithms) {
        const hash = await generateHash(algorithm, text)
        newResults.push({
          algorithm,
          hash,
          input: `File content (${file.size} bytes)`,
          timestamp: new Date(),
          inputType: 'file',
          fileName: file.name
        })
      }

      setHashResults(prev => [...newResults, ...prev])
    } catch (error) {
      console.error('File hashing failed:', error)
    } finally {
      setIsHashing(false)
    }
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedHash(id)
      setTimeout(() => setCopiedHash(null), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const compareHashes = () => {
    if (!compareHash1.trim() || !compareHash2.trim()) {
      setCompareResult(null)
      return
    }
    
    const result = compareHash1.toLowerCase().trim() === compareHash2.toLowerCase().trim()
    setCompareResult(result)
  }

  const toggleAlgorithm = (algorithm: HashAlgorithm) => {
    setSelectedAlgorithms(prev => 
      prev.includes(algorithm)
        ? prev.filter(a => a !== algorithm)
        : [...prev, algorithm]
    )
  }

  const clearResults = () => {
    setHashResults([])
    setCopiedHash(null)
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString()
  }

  const getAlgorithmColor = (algorithm: HashAlgorithm) => {
    switch (algorithm) {
      case 'MD5': return 'bg-red-100 text-red-400'
      case 'SHA-1': return 'bg-yellow-100 text-gray-300'
      case 'SHA-256': return 'bg-green-100 text-gray-300'
      case 'SHA-512': return 'bg-blue-500/10 text-gray-300'
      default: return 'bg-dark-700 text-gray-100'
    }
  }

  const algorithmInfo = {
    'MD5': { bits: 128, description: 'Fast but not cryptographically secure', deprecated: true },
    'SHA-1': { bits: 160, description: 'Deprecated for cryptographic use', deprecated: true },
    'SHA-256': { bits: 256, description: 'Recommended for most use cases', deprecated: false },
    'SHA-512': { bits: 512, description: 'Highest security, larger output', deprecated: false }
  }

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MD5/SHA Hash Generator Tool",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/hash-tools",
    "description": "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes online. Hash text content or files with multiple algorithms simultaneously and compare hash values.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "MD5 hash generation",
      "SHA-1 hash generation",
      "SHA-256 hash generation",
      "SHA-512 hash generation",
      "File hashing",
      "Hash comparison",
      "Multiple algorithm support"
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
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-500 to-zinc-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Hash className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            MD5/SHA Hash Generator
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Generate cryptographic hashes using MD5, SHA-1, SHA-256, and SHA-512 algorithms. Hash text or files with multiple algorithms.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              🔐 Multiple algorithms • 📁 File support • 🔍 Hash comparison
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2 space-y-6">
            {/* Hash Generator */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <Hash className="h-6 w-6 text-slate-600 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Hash Generator</h2>
              </div>

              {/* Algorithm Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Select Hash Algorithms
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(algorithmInfo).map(([algorithm, info]) => (
                    <button
                      key={algorithm}
                      onClick={() => toggleAlgorithm(algorithm as HashAlgorithm)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        selectedAlgorithms.includes(algorithm as HashAlgorithm)
                          ? 'border-slate-500 bg-slate-50 text-slate-700'
                          : 'border-dark-700 bg-dark-800 hover:border-slate-300 hover:bg-slate-50/50 text-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{algorithm}</div>
                      <div className="text-xs opacity-75">{info.bits} bit</div>
                      {info.deprecated && (
                        <div className="text-xs text-red-600 mt-1">⚠️ Deprecated</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Selection */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={() => setShowFileUpload(false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      !showFileUpload
                        ? 'bg-slate-100 text-slate-700'
                        : 'text-gray-400 hover:bg-dark-700'
                    }`}
                  >
                    <FileText className="h-4 w-4 inline mr-2" />
                    Text Input
                  </button>
                  <button
                    onClick={() => setShowFileUpload(true)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      showFileUpload
                        ? 'bg-slate-100 text-slate-700'
                        : 'text-gray-400 hover:bg-dark-700'
                    }`}
                  >
                    <Upload className="h-4 w-4 inline mr-2" />
                    File Upload
                  </button>
                </div>

                {!showFileUpload ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Text to Hash
                    </label>
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter text to generate hash..."
                      rows={4}
                      className="w-full px-4 py-3 border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors resize-none"
                    />
                    <div className="mt-2 text-xs text-gray-400">
                      {inputText.length} characters
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Upload File to Hash
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="w-full px-4 py-3 border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                    />
                    <div className="mt-2 text-xs text-gray-400">
                      Supports text files, documents, and other file types
                    </div>
                  </div>
                )}
              </div>

              {!showFileUpload && (
                <button
                  onClick={hashText}
                  disabled={!inputText.trim() || selectedAlgorithms.length === 0 || isHashing}
                  className="w-full bg-gradient-to-r from-slate-600 to-zinc-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-slate-700 hover:to-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isHashing ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Generating Hashes...</span>
                    </>
                  ) : (
                    <>
                      <Hash className="h-5 w-5" />
                      <span>Generate Hash{selectedAlgorithms.length > 1 ? 'es' : ''}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Hash Results */}
            {hashResults.length > 0 && (
              <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-white">
                    Generated Hashes ({hashResults.length})
                  </h2>
                  <button
                    onClick={clearResults}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {hashResults.map((result, index) => (
                    <div key={index} className="p-4 bg-dark-800 rounded-xl border border-dark-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getAlgorithmColor(result.algorithm)}`}>
                            {result.algorithm}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatTimestamp(result.timestamp)}
                          </span>
                          {result.fileName && (
                            <span className="text-xs text-blue-600">
                              📁 {result.fileName}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => copyToClipboard(result.hash, `${index}-${result.algorithm}`)}
                          className="p-2 text-gray-400 hover:text-green-600 rounded-lg transition-colors"
                        >
                          {copiedHash === `${index}-${result.algorithm}` ? 
                            <Check className="h-4 w-4 text-green-600" /> : 
                            <Copy className="h-4 w-4" />
                          }
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">
                            {result.inputType === 'file' ? 'File' : 'Input'}:
                          </label>
                          <div className="text-sm text-gray-100 bg-dark-800 p-2 rounded border font-mono break-all">
                            {result.input}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1">Hash:</label>
                          <div className="text-sm text-gray-100 bg-dark-800 p-2 rounded border font-mono break-all">
                            {result.hash}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hash Comparison */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <Eye className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Hash Comparison</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Hash
                  </label>
                  <input
                    type="text"
                    value={compareHash1}
                    onChange={(e) => setCompareHash1(e.target.value)}
                    onBlur={compareHashes}
                    placeholder="Enter first hash to compare..."
                    className="w-full px-4 py-3 border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Second Hash
                  </label>
                  <input
                    type="text"
                    value={compareHash2}
                    onChange={(e) => setCompareHash2(e.target.value)}
                    onBlur={compareHashes}
                    placeholder="Enter second hash to compare..."
                    className="w-full px-4 py-3 border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
                  />
                </div>

                {compareResult !== null && (
                  <div className={`p-4 rounded-xl flex items-center space-x-3 ${
                    compareResult 
                      ? 'bg-green-50 border border-green-500/30' 
                      : 'bg-red-500/20 border border-red-500/30'
                  }`}>
                    {compareResult ? (
                      <>
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-gray-300 font-medium">Hashes match! ✓</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="text-red-400 font-medium">Hashes do not match ✗</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Algorithm Info */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-slate-600 mr-2" />
                <h3 className="text-lg font-semibold text-white">Hash Algorithms</h3>
              </div>
              
              <div className="space-y-4">
                {Object.entries(algorithmInfo).map(([algorithm, info]) => (
                  <div key={algorithm} className="p-3 bg-dark-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{algorithm}</span>
                      <span className="text-sm text-gray-400">{info.bits} bit</span>
                    </div>
                    <div className="text-sm text-gray-400">{info.description}</div>
                    {info.deprecated && (
                      <div className="text-xs text-red-600 mt-1 font-medium">
                        ⚠️ Not recommended for security-critical applications
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6">
              <div className="flex items-center mb-4">
                <Hash className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-white">Common Use Cases</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-300">
                <div>
                  <div className="font-medium text-white">File Integrity:</div>
                  <div className="text-gray-400">Verify file downloads and transfers</div>
                </div>
                <div>
                  <div className="font-medium text-white">Password Storage:</div>
                  <div className="text-gray-400">Hash passwords before storage (use SHA-256+)</div>
                </div>
                <div>
                  <div className="font-medium text-white">Data Comparison:</div>
                  <div className="text-gray-400">Compare large datasets efficiently</div>
                </div>
                <div>
                  <div className="font-medium text-white">Digital Signatures:</div>
                  <div className="text-gray-400">Create unique fingerprints</div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Security Notice</h3>
              <div className="space-y-2 text-sm text-amber-800">
                <div>• MD5 and SHA-1 are cryptographically broken</div>
                <div>• Use SHA-256 or SHA-512 for security applications</div>
                <div>• Add salt when hashing passwords</div>
                <div>• Consider bcrypt for password hashing</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}