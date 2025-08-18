'use client'

import { useState } from 'react'
import { Type, Copy, RotateCcw, Zap, FileText, Search, Settings, BookOpen, Eye } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TextToolsPage() {
  const [inputText, setInputText] = useState('')
  const [activeTab, setActiveTab] = useState('case')
  const [showPreview, setShowPreview] = useState(false)
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(label)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const clearText = () => {
    setInputText('')
  }

  // Case conversion functions
  const toUpperCase = () => inputText.toUpperCase()
  const toLowerCase = () => inputText.toLowerCase()
  const toTitleCase = () => inputText.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
  const toCamelCase = () => inputText
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    ).replace(/\s+/g, '')
  const toSnakeCase = () => inputText
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w_]/g, '')
  const toKebabCase = () => inputText
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')

  // Text analysis
  const getWordCount = () => inputText.trim() ? inputText.trim().split(/\s+/).length : 0
  const getCharCount = () => inputText.length
  const getCharCountNoSpaces = () => inputText.replace(/\s/g, '').length
  const getParagraphCount = () => inputText.trim() ? inputText.trim().split(/\n\s*\n/).length : 0
  const getLineCount = () => inputText.trim() ? inputText.split('\n').length : 0

  // Text manipulation
  const reverseText = () => inputText.split('').reverse().join('')
  const removeExtraSpaces = () => inputText.replace(/\s+/g, ' ').trim()
  const removeDuplicateLines = () => {
    const lines = inputText.split('\n')
    const uniqueLines = Array.from(new Set(lines))
    return uniqueLines.join('\n')
  }
  const sortLines = () => inputText.split('\n').sort().join('\n')
  const shuffleLines = () => {
    const lines = inputText.split('\n')
    for (let i = lines.length - 1; i > 0; i--) {
      const array = new Uint32Array(1)
      crypto.getRandomValues(array)
      const j = array[0] % (i + 1)
      ;[lines[i], lines[j]] = [lines[j], lines[i]]
    }
    return lines.join('\n')
  }

  const tabs = [
    { id: 'case', label: 'Case Conversion', icon: Type, color: 'bg-purple-500' },
    { id: 'analysis', label: 'Text Analysis', icon: FileText, color: 'bg-blue-500' },
    { id: 'manipulation', label: 'Text Manipulation', icon: Settings, color: 'bg-green-500' },
  ]

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Text Tools Suite - Case Conversion & Text Analysis",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/text-tools",
    "description": "Comprehensive text manipulation tools for case conversion, analysis, and formatting. Transform text to uppercase, lowercase, camelCase, snake_case, and more.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Case conversion (uppercase, lowercase, title case, camelCase, snake_case, kebab-case)",
      "Text analysis (word count, character count, line count)",
      "Text manipulation (reverse text, remove spaces, sort lines)",
      "Real-time text preview",
      "One-click copy to clipboard"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Type className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Text Tools Suite
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive text manipulation tools for case conversion, analysis, and formatting.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              📝 Case conversion • 📊 Text analysis • ⚡ Text manipulation
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Text Tools */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              {/* Input Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-purple-600 mr-2" />
                    <label className="text-xl font-semibold text-gray-900">
                      Input Text
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        showPreview 
                          ? 'bg-purple-100 text-purple-700 shadow-md' 
                          : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                      }`}
                      title={showPreview ? 'Hide preview' : 'Show live preview'}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={clearText}
                      className="p-2 bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                      title="Clear text"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your text here... ✨\n\nTry: 'Hello World Example Text' to see the magic happen!"
                    rows={showPreview ? 6 : 8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-vertical transition-all duration-200 text-sm sm:text-base"
                  />
                  {inputText && (
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">
                      {inputText.length} chars
                    </div>
                  )}
                </div>
                
                {/* Live Preview */}
                {showPreview && inputText && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <h4 className="text-sm font-medium text-purple-800 mb-2 flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      Live Preview
                    </h4>
                    <div className="text-sm text-purple-700 bg-white p-3 rounded-lg font-mono whitespace-pre-wrap break-words max-h-32 overflow-y-auto">
                      {inputText}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Tabs */}
              <div className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                          activeTab === tab.id
                            ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md'
                            : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 text-gray-700 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors ${
                            activeTab === tab.id ? 'bg-purple-200' : 'bg-gray-100 group-hover:bg-purple-100'
                          }`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <span className="font-medium text-sm">{tab.label}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Case Conversion Tab */}
              {activeTab === 'case' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {[
                    { label: 'UPPERCASE', func: toUpperCase, desc: 'CONVERTS ALL TEXT TO UPPERCASE', color: 'border-red-200 bg-red-50' },
                    { label: 'lowercase', func: toLowerCase, desc: 'converts all text to lowercase', color: 'border-blue-200 bg-blue-50' },
                    { label: 'Title Case', func: toTitleCase, desc: 'Converts Text To Title Case Format', color: 'border-green-200 bg-green-50' },
                    { label: 'camelCase', func: toCamelCase, desc: 'convertsTextToCamelCaseFormat', color: 'border-purple-200 bg-purple-50' },
                    { label: 'snake_case', func: toSnakeCase, desc: 'converts_text_to_snake_case_format', color: 'border-yellow-200 bg-yellow-50' },
                    { label: 'kebab-case', func: toKebabCase, desc: 'converts-text-to-kebab-case-format', color: 'border-indigo-200 bg-indigo-50' },
                  ].map((item, index) => {
                    const result = item.func()
                    const isActive = copiedItem === item.label
                    return (
                      <div key={index} className={`rounded-xl p-4 sm:p-6 border-2 transition-all duration-200 hover:shadow-md ${item.color}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-base mb-1">{item.label}</h3>
                            <p className="text-xs text-gray-600">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(result, item.label)}
                            disabled={!inputText}
                            className={`ml-3 p-2 rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'bg-green-500 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md'
                            }`}
                            title={isActive ? 'Copied!' : 'Copy to clipboard'}
                          >
                            {isActive ? (
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        <div className="text-sm text-gray-800 bg-white p-3 rounded-lg border min-h-[80px] font-mono break-all overflow-hidden">
                          {result || (
                            <span className="text-gray-400 italic">
                              {inputText ? 'Processing...' : 'Enter text to see result...'}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Text Analysis Tab */}
              {activeTab === 'analysis' && (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {[
                      { label: 'Characters', value: getCharCount(), icon: '🔤', color: 'from-blue-400 to-blue-600', desc: 'Total character count' },
                      { label: 'Characters (no spaces)', value: getCharCountNoSpaces(), icon: '📝', color: 'from-green-400 to-green-600', desc: 'Characters excluding spaces' },
                      { label: 'Words', value: getWordCount(), icon: '📖', color: 'from-purple-400 to-purple-600', desc: 'Total word count' },
                      { label: 'Lines', value: getLineCount(), icon: '📄', color: 'from-orange-400 to-orange-600', desc: 'Number of lines' },
                      { label: 'Paragraphs', value: getParagraphCount(), icon: '📋', color: 'from-red-400 to-red-600', desc: 'Number of paragraphs' },
                    ].map((stat, index) => (
                      <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                        <div className="text-3xl mb-2">{stat.icon}</div>
                        <div className="text-3xl sm:text-4xl font-bold mb-2">
                          {stat.value.toLocaleString()}
                        </div>
                        <div className="text-sm font-semibold mb-1 opacity-90">
                          {stat.label}
                        </div>
                        <div className="text-xs opacity-75">
                          {stat.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Reading Time Estimation */}
                  {inputText && (
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                      <h4 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Reading Analysis
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-2xl font-bold text-indigo-600">
                            {Math.ceil(getWordCount() / 200)}
                          </div>
                          <div className="text-sm text-indigo-800">Minutes to read</div>
                          <div className="text-xs text-gray-600">~200 WPM</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-2xl font-bold text-purple-600">
                            {Math.ceil(getCharCount() / 5)}
                          </div>
                          <div className="text-sm text-purple-800">Avg. keystrokes</div>
                          <div className="text-xs text-gray-600">Including spaces</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-2xl font-bold text-pink-600">
                            {getWordCount() > 0 ? Math.round((getCharCount() / getWordCount()) * 10) / 10 : 0}
                          </div>
                          <div className="text-sm text-pink-800">Avg. word length</div>
                          <div className="text-xs text-gray-600">Characters per word</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Text Manipulation Tab */}
              {activeTab === 'manipulation' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {[
                    { label: 'Reverse Text', func: reverseText, icon: '🔄', desc: 'Reverses the entire text', color: 'border-red-200 bg-red-50' },
                    { label: 'Remove Extra Spaces', func: removeExtraSpaces, icon: '✂️', desc: 'Cleans up multiple spaces', color: 'border-blue-200 bg-blue-50' },
                    { label: 'Remove Duplicate Lines', func: removeDuplicateLines, icon: '🗂️', desc: 'Removes repeated lines', color: 'border-green-200 bg-green-50' },
                    { label: 'Sort Lines', func: sortLines, icon: '🔤', desc: 'Sorts lines alphabetically', color: 'border-purple-200 bg-purple-50' },
                    { label: 'Shuffle Lines', func: shuffleLines, icon: '🎲', desc: 'Randomizes line order', color: 'border-yellow-200 bg-yellow-50' },
                  ].map((item, index) => {
                    const result = item.func()
                    const isActive = copiedItem === item.label
                    return (
                      <div key={index} className={`rounded-xl p-4 sm:p-6 border-2 transition-all duration-200 hover:shadow-md ${item.color}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start flex-1">
                            <div className="text-2xl mr-3 mt-1">{item.icon}</div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-base mb-1">{item.label}</h3>
                              <p className="text-xs text-gray-600">{item.desc}</p>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <button
                              onClick={() => setInputText(result)}
                              disabled={!inputText || !result}
                              className="text-sm px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                              title="Apply to input text"
                            >
                              Apply
                            </button>
                            <button
                              onClick={() => copyToClipboard(result, item.label)}
                              disabled={!inputText || !result}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                isActive
                                  ? 'bg-green-500 text-white shadow-md'
                                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md'
                              }`}
                              title={isActive ? 'Copied!' : 'Copy to clipboard'}
                            >
                              {isActive ? (
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-800 bg-white p-3 rounded-lg border min-h-[120px] font-mono whitespace-pre-wrap break-all overflow-hidden">
                          {result || (
                            <span className="text-gray-400 italic">
                              {inputText ? 'Processing...' : 'Enter text to see result...'}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-orange-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={clearText}
                  className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear All Text
                </button>
                <button
                  onClick={() => setInputText('Hello World Example Text\nThis is a sample paragraph for testing.\nAnother line for demonstration.')}
                  className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Load Sample Text
                </button>
              </div>
            </div>

            {/* Tool Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Settings className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time text processing
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  One-click copy to clipboard
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multiple case conversions
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Detailed text analysis
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Text manipulation tools
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Reading time estimation
                </li>
              </ul>
            </div>

            {/* Available Tools */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Available Tools</h3>
              <div className="space-y-4 text-sm text-green-800">
                <div>
                  <div className="font-medium mb-2 flex items-center">
                    <Type className="h-4 w-4 mr-1" />
                    Case Conversion
                  </div>
                  <div className="text-xs text-green-700 space-y-1">
                    <div>• UPPERCASE, lowercase, Title Case</div>
                    <div>• camelCase, snake_case, kebab-case</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2 flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    Text Analysis
                  </div>
                  <div className="text-xs text-green-700 space-y-1">
                    <div>• Character, word, line counts</div>
                    <div>• Reading time estimation</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2 flex items-center">
                    <Settings className="h-4 w-4 mr-1" />
                    Text Manipulation
                  </div>
                  <div className="text-xs text-green-700 space-y-1">
                    <div>• Reverse, sort, shuffle lines</div>
                    <div>• Remove spaces and duplicates</div>
                  </div>
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