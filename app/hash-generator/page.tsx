'use client'

import { useState, useCallback, useRef } from 'react'
import { Hash, Copy, Eye, EyeOff, Check, AlertCircle, Shield, RefreshCw, Settings } from 'lucide-react'
import bcrypt from 'bcryptjs'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface HashResult {
  id: string
  password: string
  hash: string
  saltRounds: number
  timestamp: Date
}

export default function HashGeneratorPage() {
  const [password, setPassword] = useState('')
  const [saltRounds, setSaltRounds] = useState(10)
  const [generatedHashes, setGeneratedHashes] = useState<HashResult[]>([])
  const [comparePassword, setComparePassword] = useState('')
  const [compareHash, setCompareHash] = useState('')
  const [compareResult, setCompareResult] = useState<boolean | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComparing, setIsComparing] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const idCounter = useRef(0)

  const generateHash = useCallback(async () => {
    if (!password.trim()) return

    setIsGenerating(true)
    try {
      // Generate hash asynchronously to avoid blocking UI
      setTimeout(async () => {
        try {
          const hash = await bcrypt.hash(password, saltRounds)
          const newHash: HashResult = {
            id: `hash-${++idCounter.current}`,
            password: password,
            hash: hash,
            saltRounds: saltRounds,
            timestamp: new Date()
          }
          
          setGeneratedHashes(prev => [newHash, ...prev])
          setPassword('')
        } catch (error) {
          console.error('Hash generation error:', error)
        } finally {
          setIsGenerating(false)
        }
      }, 100)
    } catch (error) {
      console.error('Hash generation error:', error)
      setIsGenerating(false)
    }
  }, [password, saltRounds])

  const compareHash = useCallback(async () => {
    if (!comparePassword.trim() || !compareHash.trim()) return

    setIsComparing(true)
    try {
      setTimeout(async () => {
        try {
          const isMatch = await bcrypt.compare(comparePassword, compareHash)
          setCompareResult(isMatch)
        } catch (error) {
          console.error('Hash comparison error:', error)
          setCompareResult(false)
        } finally {
          setIsComparing(false)
        }
      }, 100)
    } catch (error) {
      console.error('Hash comparison error:', error)
      setCompareResult(false)
      setIsComparing(false)
    }
  }, [comparePassword, compareHash])

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const clearHistory = () => {
    setGeneratedHashes([])
  }

  const removeHash = (id: string) => {
    setGeneratedHashes(prev => prev.filter(hash => hash.id !== id))
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString()
  }

  const saltRoundOptions = [
    { value: 4, label: '4 rounds (Fast)', time: '~1ms' },
    { value: 8, label: '8 rounds (Balanced)', time: '~10ms' },
    { value: 10, label: '10 rounds (Default)', time: '~65ms' },
    { value: 12, label: '12 rounds (Strong)', time: '~250ms' },
    { value: 14, label: '14 rounds (Very Strong)', time: '~1s' },
    { value: 16, label: '16 rounds (Maximum)', time: '~4s' }
  ]

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Bcrypt Hash Generator Tool",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/hash-generator",
    "description": "Generate secure bcrypt password hashes online. Compare passwords with hashes, customize salt rounds, and ensure secure password storage with industry-standard bcrypt encryption.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Bcrypt hash generation",
      "Password hash comparison",
      "Configurable salt rounds",
      "Secure client-side processing",
      "Hash history tracking",
      "Copy to clipboard functionality"
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
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Hash className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Bcrypt Hash Generator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Generate secure bcrypt password hashes with configurable salt rounds. Compare passwords with existing hashes.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              🔒 Industry standard • 🔐 Client-side security • ⚙️ Configurable salt rounds
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2 space-y-6">
            {/* Hash Generator */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <Hash className="h-6 w-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Generate Hash</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salt Rounds
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {saltRoundOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSaltRounds(option.value)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm ${
                          saltRounds === option.value
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50/50 text-gray-700'
                        }`}
                      >
                        <div className="font-medium">{option.value}</div>
                        <div className="text-xs opacity-75">{option.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password to Hash
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && generateHash()}
                      placeholder="Enter password to hash"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    />
                    <button
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                    >
                      {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={generateHash}
                  disabled={!password.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Generating Hash...</span>
                    </>
                  ) : (
                    <>
                      <Hash className="h-5 w-5" />
                      <span>Generate Bcrypt Hash</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Hash Comparison */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Compare Hash</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={comparePassword}
                    onChange={(e) => setComparePassword(e.target.value)}
                    placeholder="Enter password to verify"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bcrypt Hash
                  </label>
                  <textarea
                    value={compareHash}
                    onChange={(e) => setCompareHash(e.target.value)}
                    placeholder="Enter bcrypt hash to compare against"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={compareHash}
                  disabled={!comparePassword.trim() || !compareHash.trim() || isComparing}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isComparing ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Comparing...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5" />
                      <span>Compare Hash</span>
                    </>
                  )}
                </button>

                {compareResult !== null && (
                  <div className={`p-4 rounded-xl flex items-center space-x-3 ${
                    compareResult 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    {compareResult ? (
                      <>
                        <Check className="h-5 w-5 text-green-600" />
                        <span className="text-green-800 font-medium">Password matches the hash!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="text-red-800 font-medium">Password does not match the hash.</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Generated Hashes History */}
            {generatedHashes.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Generated Hashes</h2>
                  <button
                    onClick={clearHistory}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Clear History
                  </button>
                </div>

                <div className="space-y-4">
                  {generatedHashes.map((hashResult) => (
                    <div key={hashResult.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">
                            Salt Rounds: {hashResult.saltRounds}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(hashResult.timestamp)}
                          </span>
                        </div>
                        <button
                          onClick={() => removeHash(hashResult.id)}
                          className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                        >
                          <AlertCircle className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Original Password:</label>
                          <div className="flex items-center justify-between p-2 bg-white rounded border">
                            <code className="text-sm text-gray-800 font-mono">
                              {showPasswords ? hashResult.password : '•'.repeat(hashResult.password.length)}
                            </code>
                            <button
                              onClick={() => copyToClipboard(hashResult.password, `${hashResult.id}-password`)}
                              className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                            >
                              {copiedId === `${hashResult.id}-password` ? 
                                <Check className="h-4 w-4 text-green-600" /> : 
                                <Copy className="h-4 w-4" />
                              }
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Bcrypt Hash:</label>
                          <div className="flex items-center justify-between p-2 bg-white rounded border">
                            <code className="text-sm text-gray-800 font-mono break-all">
                              {hashResult.hash}
                            </code>
                            <button
                              onClick={() => copyToClipboard(hashResult.hash, `${hashResult.id}-hash`)}
                              className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors ml-2"
                            >
                              {copiedId === `${hashResult.id}-hash` ? 
                                <Check className="h-4 w-4 text-green-600" /> : 
                                <Copy className="h-4 w-4" />
                              }
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Security Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Security Features</h3>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Client-side processing only
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Industry-standard bcrypt algorithm
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Configurable salt rounds
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  No data storage or transmission
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Password comparison verification
                </li>
              </ul>
            </div>

            {/* Salt Rounds Guide */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Settings className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Salt Rounds Guide</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <div className="font-medium text-gray-900">4-8 Rounds:</div>
                  <div className="text-gray-600">Fast but less secure. Good for development.</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">10-12 Rounds:</div>
                  <div className="text-gray-600">Balanced security and performance. Recommended for production.</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">14-16 Rounds:</div>
                  <div className="text-gray-600">Maximum security but slower. Use for highly sensitive data.</div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl p-6 border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-900 mb-4">Best Practices</h3>
              <div className="space-y-3 text-sm text-orange-800">
                <div>
                  <div className="font-medium mb-1">Never store plain passwords:</div>
                  <div className="text-xs text-orange-700">Always hash passwords before storage</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Use appropriate salt rounds:</div>
                  <div className="text-xs text-orange-700">Balance security with performance needs</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Regular security updates:</div>
                  <div className="text-xs text-orange-700">Monitor and update hashing strategies</div>
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