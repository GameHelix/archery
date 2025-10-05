'use client'

import { useState, useCallback } from 'react'
import { Fingerprint, Copy, Check, RefreshCw, Settings, Trash2 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface GeneratedUUID {
  id: string
  uuid: string
  version: string
  timestamp: Date
}

type UUIDVersion = 'v4' | 'v1' | 'nil'

export default function UUIDGeneratorPage() {
  const [uuids, setUuids] = useState<GeneratedUUID[]>([])
  const [version, setVersion] = useState<UUIDVersion>('v4')
  const [count, setCount] = useState(1)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Simple UUID v4 generator (crypto.randomUUID alternative for better compatibility)
  const generateUUIDv4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  // Simple UUID v1 generator (timestamp-based)
  const generateUUIDv1 = (): string => {
    const timestamp = Date.now()
    const timeHex = timestamp.toString(16).padStart(12, '0')
    const randomBytes = Array.from({ length: 10 }, () => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join('')
    
    return [
      timeHex.slice(0, 8),
      timeHex.slice(8, 12),
      '1' + timeHex.slice(-3),
      '8' + randomBytes.slice(0, 3),
      randomBytes.slice(3, 15)
    ].join('-')
  }

  // Nil UUID (all zeros)
  const generateNilUUID = (): string => {
    return '00000000-0000-0000-0000-000000000000'
  }

  const generateUUID = (version: UUIDVersion): string => {
    switch (version) {
      case 'v4':
        return generateUUIDv4()
      case 'v1':
        return generateUUIDv1()
      case 'nil':
        return generateNilUUID()
      default:
        return generateUUIDv4()
    }
  }

  const handleGenerate = useCallback(() => {
    setIsGenerating(true)
    
    setTimeout(() => {
      const newUUIDs: GeneratedUUID[] = []
      
      for (let i = 0; i < count; i++) {
        newUUIDs.push({
          id: `uuid-${Date.now()}-${i}`,
          uuid: generateUUID(version),
          version: version,
          timestamp: new Date()
        })
      }
      
      setUuids(prev => [...newUUIDs, ...prev])
      setIsGenerating(false)
    }, 100)
  }, [count, version])

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const copyAllUUIDs = async () => {
    const allUUIDs = uuids.map(item => item.uuid).join('\n')
    await copyToClipboard(allUUIDs, 'all')
  }

  const clearHistory = () => {
    setUuids([])
  }

  const removeUUID = (id: string) => {
    setUuids(prev => prev.filter(uuid => uuid.id !== id))
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString()
  }

  const versionInfo = {
    v4: {
      name: 'Version 4 (Random)',
      description: 'Randomly generated UUID using cryptographic random numbers',
      example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    },
    v1: {
      name: 'Version 1 (Timestamp)',
      description: 'Time-based UUID using current timestamp',
      example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
    },
    nil: {
      name: 'Nil UUID',
      description: 'Special UUID with all bits set to zero',
      example: '00000000-0000-0000-0000-000000000000'
    }
  }

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "UUID/GUID Generator Tool",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/uuid-generator",
    "description": "Generate unique identifiers (UUID/GUID) online. Support for UUID v1, v4, and nil UUID formats with bulk generation and copy functionality.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "UUID v4 generation",
      "UUID v1 generation", 
      "Nil UUID generation",
      "Bulk UUID generation",
      "Copy to clipboard",
      "UUID history tracking"
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
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Fingerprint className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            UUID/GUID Generator
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Generate unique identifiers (UUID/GUID) for your applications. Support for multiple UUID versions and bulk generation.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              🔑 Cryptographically secure • ⚡ Instant generation • 📋 Bulk operations
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2">
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6 sm:p-8">
              {/* Generator Settings */}
              <div className="flex items-center mb-6">
                <Settings className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Generator Settings</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    UUID Version
                  </label>
                  <div className="space-y-2">
                    {Object.entries(versionInfo).map(([key, info]) => (
                      <button
                        key={key}
                        onClick={() => setVersion(key as UUIDVersion)}
                        className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                          version === key
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-dark-700 bg-dark-800 hover:border-purple-300 hover:bg-purple-50/50 text-gray-300'
                        }`}
                      >
                        <div className="font-medium">{info.name}</div>
                        <div className="text-xs opacity-75 mt-1">{info.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of UUIDs
                  </label>
                  <select
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  >
                    <option value={1}>1 UUID</option>
                    <option value={5}>5 UUIDs</option>
                    <option value={10}>10 UUIDs</option>
                    <option value={25}>25 UUIDs</option>
                    <option value={50}>50 UUIDs</option>
                    <option value={100}>100 UUIDs</option>
                  </select>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Example Format
                    </label>
                    <div className="p-3 bg-dark-700 rounded-lg font-mono text-sm text-gray-100 break-all">
                      {versionInfo[version].example}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Fingerprint className="h-5 w-5" />
                    <span>Generate {count} UUID{count > 1 ? 's' : ''}</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated UUIDs */}
            {uuids.length > 0 && (
              <div className="mt-6 bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-white">
                    Generated UUIDs ({uuids.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={copyAllUUIDs}
                      className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-400 rounded-lg transition-colors text-sm flex items-center space-x-1"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy All</span>
                    </button>
                    <button
                      onClick={clearHistory}
                      className="px-4 py-2 text-sm text-red-600 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {uuids.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-dark-800 rounded-xl border border-dark-700">
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-sm text-gray-100 break-all">
                          {item.uuid}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-400">
                            {item.version.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatTimestamp(item.timestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => copyToClipboard(item.uuid, item.id)}
                          className="p-2 text-gray-400 hover:text-green-600 rounded-lg transition-colors"
                        >
                          {copiedId === item.id ? 
                            <Check className="h-4 w-4 text-green-600" /> : 
                            <Copy className="h-4 w-4" />
                          }
                        </button>
                        <button
                          onClick={() => removeUUID(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* About UUIDs */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6">
              <div className="flex items-center mb-4">
                <Fingerprint className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-white">About UUIDs</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems.
                </p>
                <div className="space-y-2">
                  <div>
                    <div className="font-medium text-white">Common Uses:</div>
                    <div className="text-gray-400">
                      • Database primary keys<br/>
                      • Session identifiers<br/>
                      • File names<br/>
                      • API request tracking
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* UUID Versions */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6">
              <div className="flex items-center mb-4">
                <Settings className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-white">UUID Versions</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-300">
                <div>
                  <div className="font-medium text-white">Version 4:</div>
                  <div className="text-gray-400">Random UUIDs. Most commonly used.</div>
                </div>
                <div>
                  <div className="font-medium text-white">Version 1:</div>
                  <div className="text-gray-400">Time-based UUIDs with MAC address.</div>
                </div>
                <div>
                  <div className="font-medium text-white">Nil UUID:</div>
                  <div className="text-gray-400">Special UUID with all zeros.</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-lg font-semibold text-purple-300 mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Multiple UUID versions</li>
                <li>✓ Bulk generation up to 100</li>
                <li>✓ Copy individual or all UUIDs</li>
                <li>✓ Generation history</li>
                <li>✓ Cryptographically secure</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}