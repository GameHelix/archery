'use client'

import { useState, useCallback, useEffect } from 'react'
import { Braces, Copy, Check, AlertCircle, Minimize2, Maximize2, FileText, RefreshCw } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type FormatMode = 'format' | 'minify' | 'validate'

export default function JSONFormatterPage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [mode, setMode] = useState<FormatMode>('format')
  const [indentSize, setIndentSize] = useState(2)
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [jsonStats, setJsonStats] = useState<{
    size: number
    keys: number
    objects: number
    arrays: number
  } | null>(null)

  const analyzeJSON = (obj: any): { keys: number; objects: number; arrays: number } => {
    let stats = { keys: 0, objects: 0, arrays: 0 }
    
    const traverse = (item: any) => {
      if (Array.isArray(item)) {
        stats.arrays++
        item.forEach(traverse)
      } else if (item !== null && typeof item === 'object') {
        stats.objects++
        stats.keys += Object.keys(item).length
        Object.values(item).forEach(traverse)
      }
    }
    
    traverse(obj)
    return stats
  }

  const processJSON = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText('')
      setError('')
      setIsValid(null)
      setJsonStats(null)
      return
    }

    setIsProcessing(true)
    setError('')
    setCopied(false)

    try {
      // First, try to parse the JSON
      const parsed = JSON.parse(inputText)
      setIsValid(true)
      
      // Analyze the JSON structure
      const stats = analyzeJSON(parsed)
      setJsonStats({
        ...stats,
        size: new Blob([inputText]).size
      })

      let result = ''
      
      switch (mode) {
        case 'format':
          result = JSON.stringify(parsed, null, indentSize)
          break
        case 'minify':
          result = JSON.stringify(parsed)
          break
        case 'validate':
          result = `✓ Valid JSON\n\nStructure:\n- ${stats.objects} object(s)\n- ${stats.arrays} array(s)\n- ${stats.keys} key(s)\n- Size: ${new Blob([inputText]).size} bytes`
          break
      }
      
      setOutputText(result)
      
    } catch (err) {
      setIsValid(false)
      setJsonStats(null)
      
      if (err instanceof SyntaxError) {
        // Extract line number and position from error message
        const match = err.message.match(/position (\d+)/)
        const position = match ? parseInt(match[1]) : null
        
        if (position !== null) {
          const lines = inputText.substring(0, position).split('\n')
          const lineNumber = lines.length
          const columnNumber = lines[lines.length - 1].length + 1
          
          setError(`Invalid JSON at line ${lineNumber}, column ${columnNumber}: ${err.message}`)
        } else {
          setError(`Invalid JSON: ${err.message}`)
        }
      } else {
        setError('Failed to process JSON')
      }
      
      setOutputText('')
    } finally {
      setTimeout(() => setIsProcessing(false), 100)
    }
  }, [inputText, mode, indentSize])

  const handleInputChange = (value: string) => {
    setInputText(value)
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
    setIsValid(null)
    setJsonStats(null)
    setCopied(false)
  }

  const loadSampleJSON = () => {
    const sample = `{
  "name": "John Doe",
  "age": 30,
  "isEmployed": true,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "hobbies": ["reading", "swimming", "coding"],
  "spouse": null
}`
    setInputText(sample)
  }

  // Process JSON whenever input or settings change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      processJSON()
    }, 300) // Debounce processing
    
    return () => clearTimeout(timeoutId)
  }, [processJSON])

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JSON Formatter/Validator Tool",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/json-formatter",
    "description": "Format, validate, and minify JSON data online. Pretty print JSON with custom indentation, validate JSON syntax, and analyze JSON structure with detailed statistics.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "JSON formatting",
      "JSON validation",
      "JSON minification",
      "Syntax error detection",
      "JSON structure analysis",
      "Custom indentation"
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
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Braces className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            JSON Formatter/Validator
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Format, validate, and minify JSON data. Pretty print with custom indentation and get detailed structure analysis.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              ✅ Syntax validation • 🎨 Pretty formatting • 📊 Structure analysis
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2">
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6 sm:p-8">
              {/* Mode and Settings */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-semibold text-white">JSON Processor</h2>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={loadSampleJSON}
                    className="px-3 py-1 text-sm text-blue-400 hover:text-blue-400 hover:bg-blue-500/200/20 rounded-lg transition-colors"
                  >
                    Load Sample
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-3 py-1 text-sm text-gray-400 hover:text-gray-100 hover:bg-dark-700 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Mode Selection */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { id: 'format', label: 'Format', icon: Maximize2, desc: 'Pretty print JSON' },
                  { id: 'minify', label: 'Minify', icon: Minimize2, desc: 'Compress JSON' },
                  { id: 'validate', label: 'Validate', icon: Check, desc: 'Check syntax' }
                ].map((modeOption) => {
                  const IconComponent = modeOption.icon
                  return (
                    <button
                      key={modeOption.id}
                      onClick={() => setMode(modeOption.id as FormatMode)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        mode === modeOption.id
                          ? 'border-green-500 bg-green-500/20 text-green-400'
                          : 'border-dark-700 bg-dark-800 hover:border-green-300 hover:bg-green-500/20/50 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-1">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-medium">{modeOption.label}</div>
                      <div className="text-xs opacity-75">{modeOption.desc}</div>
                    </button>
                  )
                })}
              </div>

              {/* Indent Size Setting */}
              {mode === 'format' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Indentation Size
                  </label>
                  <select
                    value={indentSize}
                    onChange={(e) => setIndentSize(parseInt(e.target.value))}
                    className="px-3 py-2 border border-dark-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={8}>8 spaces</option>
                  </select>
                </div>
              )}

              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      JSON Input
                    </label>
                    {isValid !== null && (
                      <div className={`flex items-center space-x-1 text-sm ${
                        isValid ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {isValid ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Valid JSON</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-4 w-4" />
                            <span>Invalid JSON</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Paste your JSON here..."
                    rows={8}
                    className="w-full px-4 py-3 border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none font-mono text-sm"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      {inputText.length} characters
                    </span>
                    {isProcessing && (
                      <div className="flex items-center text-green-400">
                        <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                        <span className="text-xs">Processing...</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Output Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {mode === 'format' ? 'Formatted JSON' : 
                       mode === 'minify' ? 'Minified JSON' : 'Validation Result'}
                    </label>
                    {outputText && (
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-500/200/20 hover:bg-green-500/200/30 text-green-400 rounded-lg transition-colors text-sm"
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
                    placeholder={`${mode === 'format' ? 'Formatted' : 
                                 mode === 'minify' ? 'Minified' : 'Validation'} result will appear here...`}
                    rows={8}
                    className="w-full px-4 py-3 border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 bg-dark-800 transition-colors resize-none font-mono text-sm"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      {outputText.length} characters
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-500/200/20 border border-red-500/30 rounded-xl flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-red-400 text-sm font-medium mb-1">Syntax Error</div>
                      <div className="text-red-400 text-sm">{error}</div>
                    </div>
                  </div>
                )}

                {/* JSON Statistics */}
                {jsonStats && (
                  <div className="p-4 bg-blue-500/200/20 border border-blue-500/30 rounded-xl">
                    <div className="text-gray-300 text-sm font-medium mb-2">JSON Structure</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-400">
                      <div>
                        <div className="font-medium">{jsonStats.objects}</div>
                        <div className="text-xs">Objects</div>
                      </div>
                      <div>
                        <div className="font-medium">{jsonStats.arrays}</div>
                        <div className="text-xs">Arrays</div>
                      </div>
                      <div>
                        <div className="font-medium">{jsonStats.keys}</div>
                        <div className="text-xs">Keys</div>
                      </div>
                      <div>
                        <div className="font-medium">{jsonStats.size}</div>
                        <div className="text-xs">Bytes</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* About JSON */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6">
              <div className="flex items-center mb-4">
                <Braces className="h-6 w-6 text-green-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">About JSON</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  JSON (JavaScript Object Notation) is a lightweight data interchange format that's easy to read and write.
                </p>
                <div>
                  <div className="font-medium text-white">Common Uses:</div>
                  <div className="text-gray-400">
                    • REST API responses<br/>
                    • Configuration files<br/>
                    • Data storage<br/>
                    • Web applications
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6">
              <div className="flex items-center mb-4">
                <Check className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Features</h3>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Real-time validation
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Pretty formatting
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  JSON minification
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Error line detection
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Structure analysis
                </li>
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-green-50 to-blue-100 rounded-2xl p-6 border border-green-500/30">
              <h3 className="text-lg font-semibold text-green-300 mb-4">Tips</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• Use double quotes for strings</div>
                <div>• No trailing commas allowed</div>
                <div>• All property names must be quoted</div>
                <div>• Use null instead of undefined</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}