'use client'

import { useState, useCallback } from 'react'
import { Copy, RefreshCw, Key } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(() => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const similarChars = 'il1Lo0O'

    let charset = ''
    if (includeUppercase) charset += uppercase
    if (includeLowercase) charset += lowercase
    if (includeNumbers) charset += numbers
    if (includeSymbols) charset += symbols

    if (excludeSimilar) {
      charset = charset.split('').filter(char => !similarChars.includes(char)).join('')
    }

    if (charset === '') {
      setPassword('Please select at least one character type')
      return
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(result)
    setCopied(false)
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar])

  const copyToClipboard = async () => {
    if (password && password !== 'Please select at least one character type') {
      try {
        await navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy password:', err)
      }
    }
  }

  const getPasswordStrength = () => {
    if (!password || password === 'Please select at least one character type') return { strength: 'none', color: 'bg-gray-300' }
    
    let score = 0
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1
    if (password.length >= 16) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    if (score <= 2) return { strength: 'Weak', color: 'bg-red-500' }
    if (score <= 4) return { strength: 'Fair', color: 'bg-yellow-500' }
    if (score <= 6) return { strength: 'Good', color: 'bg-blue-500' }
    return { strength: 'Strong', color: 'bg-green-500' }
  }

  const strengthInfo = getPasswordStrength()

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Password Generator Tool",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser", 
    "url": "https://swissknife.site/password-generator",
    "description": "Generate strong, secure passwords with customizable length and character options. Free online password generator tool.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "@priceCurrency": "USD"
    },
    "featureList": [
      "Customizable password length",
      "Include/exclude character types",
      "Password strength indicator", 
      "Copy to clipboard functionality",
      "No data storage or tracking"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Key className="h-12 w-12 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Password Generator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate secure, random passwords with customizable options. Keep your accounts safe with strong passwords.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Generated Password Display */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generated Password
            </label>
            <div className="relative">
              <input
                type="text"
                value={password}
                readOnly
                placeholder="Click 'Generate Password' to create a password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={copyToClipboard}
                disabled={!password || password === 'Please select at least one character type'}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {password && password !== 'Please select at least one character type' && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Password Strength:</span>
                  <span className={`font-medium ${strengthInfo.strength === 'Strong' ? 'text-green-600' : strengthInfo.strength === 'Good' ? 'text-blue-600' : strengthInfo.strength === 'Fair' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {strengthInfo.strength}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.color}`}
                    style={{ width: `${strengthInfo.strength === 'Strong' ? 100 : strengthInfo.strength === 'Good' ? 75 : strengthInfo.strength === 'Fair' ? 50 : 25}%` }}
                  ></div>
                </div>
              </div>
            )}

            {copied && (
              <div className="mt-2 text-sm text-green-600 font-medium">
                ✓ Password copied to clipboard!
              </div>
            )}
          </div>

          {/* Password Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Length</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="4"
                    max="128"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="number"
                    min="4"
                    max="128"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value) || 4)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Character Types</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700">Uppercase (A-Z)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700">Lowercase (a-z)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700">Numbers (0-9)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700">Symbols (!@#$%...)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={excludeSimilar}
                    onChange={(e) => setExcludeSimilar(e.target.checked)}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700">Exclude similar characters (il1Lo0O)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={generatePassword}
              className="btn-primary inline-flex items-center px-8 py-3 text-lg font-medium"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Generate Password
            </button>
          </div>
        </div>

        {/* Security Tips */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Password Security Tips</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Use different passwords for each account
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Make passwords at least 12 characters long
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Include a mix of uppercase, lowercase, numbers, and symbols
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Use a password manager to store your passwords securely
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Enable two-factor authentication when available
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}