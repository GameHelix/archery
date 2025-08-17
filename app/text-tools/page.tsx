'use client'

import { useState } from 'react'
import { Type, Copy, RotateCcw } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TextToolsPage() {
  const [inputText, setInputText] = useState('')
  const [activeTab, setActiveTab] = useState('case')

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Text copied to clipboard!')
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
    const uniqueLines = [...new Set(lines)]
    return uniqueLines.join('\n')
  }
  const sortLines = () => inputText.split('\n').sort().join('\n')
  const shuffleLines = () => {
    const lines = inputText.split('\n')
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[lines[i], lines[j]] = [lines[j], lines[i]]
    }
    return lines.join('\n')
  }

  const tabs = [
    { id: 'case', label: 'Case Conversion', icon: Type },
    { id: 'analysis', label: 'Text Analysis', icon: Type },
    { id: 'manipulation', label: 'Text Manipulation', icon: Type },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Type className="h-12 w-12 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Text Tools Suite</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive text manipulation tools for case conversion, analysis, and formatting.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Input Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-lg font-medium text-gray-700">
                Input Text
              </label>
              <button
                onClick={clearText}
                className="text-gray-500 hover:text-red-600 transition-colors"
                title="Clear text"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-vertical"
            />
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 inline mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Case Conversion Tab */}
          {activeTab === 'case' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'UPPERCASE', func: toUpperCase },
                { label: 'lowercase', func: toLowerCase },
                { label: 'Title Case', func: toTitleCase },
                { label: 'camelCase', func: toCamelCase },
                { label: 'snake_case', func: toSnakeCase },
                { label: 'kebab-case', func: toKebabCase },
              ].map((item, index) => {
                const result = item.func()
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{item.label}</h3>
                      <button
                        onClick={() => copyToClipboard(result)}
                        disabled={!inputText}
                        className="text-gray-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-700 bg-white p-3 rounded border min-h-[60px] font-mono break-all">
                      {result || 'Enter text to see result...'}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Text Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Characters', value: getCharCount() },
                { label: 'Characters (no spaces)', value: getCharCountNoSpaces() },
                { label: 'Words', value: getWordCount() },
                { label: 'Lines', value: getLineCount() },
                { label: 'Paragraphs', value: getParagraphCount() },
              ].map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-primary-800">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Text Manipulation Tab */}
          {activeTab === 'manipulation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Reverse Text', func: reverseText },
                { label: 'Remove Extra Spaces', func: removeExtraSpaces },
                { label: 'Remove Duplicate Lines', func: removeDuplicateLines },
                { label: 'Sort Lines', func: sortLines },
                { label: 'Shuffle Lines', func: shuffleLines },
              ].map((item, index) => {
                const result = item.func()
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{item.label}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setInputText(result)}
                          disabled={!inputText}
                          className="text-sm px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Apply
                        </button>
                        <button
                          onClick={() => copyToClipboard(result)}
                          disabled={!inputText}
                          className="text-gray-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          title="Copy to clipboard"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 bg-white p-3 rounded border min-h-[100px] font-mono whitespace-pre-wrap break-all">
                      {result || 'Enter text to see result...'}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Features Info */}
        <div className="mt-12 bg-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">Available Text Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-purple-800">
            <div>
              <h4 className="font-medium mb-2">Case Conversion:</h4>
              <ul className="text-sm space-y-1">
                <li>• UPPERCASE</li>
                <li>• lowercase</li>
                <li>• Title Case</li>
                <li>• camelCase</li>
                <li>• snake_case</li>
                <li>• kebab-case</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Text Analysis:</h4>
              <ul className="text-sm space-y-1">
                <li>• Character count</li>
                <li>• Word count</li>
                <li>• Line count</li>
                <li>• Paragraph count</li>
                <li>• Character count (no spaces)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Text Manipulation:</h4>
              <ul className="text-sm space-y-1">
                <li>• Reverse text</li>
                <li>• Remove extra spaces</li>
                <li>• Remove duplicate lines</li>
                <li>• Sort lines alphabetically</li>
                <li>• Shuffle lines randomly</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}