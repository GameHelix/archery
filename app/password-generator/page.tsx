'use client'

import { useState, useCallback } from 'react'
import { Copy, RefreshCw, Shield, Eye, EyeOff, Check } from 'lucide-react'
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
  const [showPassword, setShowPassword] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePassword = useCallback(async () => {
    setIsGenerating(true)
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
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
      setIsGenerating(false)
      return
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      const array = new Uint32Array(1)
      crypto.getRandomValues(array)
      result += charset.charAt(array[0] % charset.length)
    }

    setPassword(result)
    setCopied(false)
    setIsGenerating(false)
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Shield className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Password Generator
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Create ultra-secure passwords in seconds. Fully customizable with real-time strength analysis.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              🔒 Generated locally in your browser • No data stored • Completely private
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Password Generator */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              {/* Password Display */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Your Secure Password</h2>
                  {password && password !== 'Please select at least one character type' && (
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  )}
                </div>
                
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    readOnly
                    placeholder="Click 'Generate Password' to create a secure password"
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 font-mono text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 pr-12"
                  />
                  <button
                    onClick={copyToClipboard}
                    disabled={!password || password === 'Please select at least one character type'}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password Strength */}
                {password && password !== 'Please select at least one character type' && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Security Level</span>
                      <div className="flex items-center space-x-2">
                        <Shield className={`h-4 w-4 ${strengthInfo.strength === 'Strong' ? 'text-green-500' : strengthInfo.strength === 'Good' ? 'text-blue-500' : strengthInfo.strength === 'Fair' ? 'text-yellow-500' : 'text-red-500'}`} />
                        <span className={`text-sm font-semibold ${strengthInfo.strength === 'Strong' ? 'text-green-600' : strengthInfo.strength === 'Good' ? 'text-blue-600' : strengthInfo.strength === 'Fair' ? 'text-yellow-600' : 'text-red-600'}`}>
                          {strengthInfo.strength}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${strengthInfo.color} shadow-sm`}
                        style={{ width: `${strengthInfo.strength === 'Strong' ? 100 : strengthInfo.strength === 'Good' ? 75 : strengthInfo.strength === 'Fair' ? 50 : 25}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {copied && (
                  <div className="mt-3 flex items-center text-green-600 font-medium animate-fade-in">
                    <Check className="h-4 w-4 mr-2" />
                    Password copied successfully!
                  </div>
                )}
              </div>

              {/* Length Control */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Password Length</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary-600">{length}</span>
                    <span className="text-sm text-gray-500">characters</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="4"
                    max="128"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer slider focus:outline-none focus:ring-4 focus:ring-primary-500/20"
                    style={{
                      background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((length - 4) / (128 - 4)) * 100}%, #E5E7EB ${((length - 4) / (128 - 4)) * 100}%, #E5E7EB 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>4</span>
                    <span>128</span>
                  </div>
                </div>
              </div>

              {/* Character Types */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Character Types</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'uppercase', label: 'Uppercase Letters', example: 'A-Z', checked: includeUppercase, onChange: setIncludeUppercase },
                    { id: 'lowercase', label: 'Lowercase Letters', example: 'a-z', checked: includeLowercase, onChange: setIncludeLowercase },
                    { id: 'numbers', label: 'Numbers', example: '0-9', checked: includeNumbers, onChange: setIncludeNumbers },
                    { id: 'symbols', label: 'Special Characters', example: '!@#$', checked: includeSymbols, onChange: setIncludeSymbols },
                  ].map((option) => (
                    <label key={option.id} className="flex items-center p-3 rounded-xl border-2 border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={option.checked}
                        onChange={(e) => option.onChange(e.target.checked)}
                        className="w-5 h-5 text-primary-600 bg-white border-2 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                      />
                      <div className="ml-3">
                        <div className="text-gray-800 font-medium">{option.label}</div>
                        <div className="text-xs text-gray-500 font-mono">{option.example}</div>
                      </div>
                    </label>
                  ))}
                </div>
                
                <label className="flex items-center mt-4 p-3 rounded-xl border-2 border-yellow-100 bg-yellow-50/50 hover:border-yellow-200 transition-all duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={excludeSimilar}
                    onChange={(e) => setExcludeSimilar(e.target.checked)}
                    className="w-5 h-5 text-yellow-600 bg-white border-2 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                  />
                  <div className="ml-3">
                    <div className="text-gray-800 font-medium">Exclude Similar Characters</div>
                    <div className="text-xs text-gray-600">Avoids: <span className="font-mono bg-gray-100 px-1 rounded">i l 1 L o 0 O</span></div>
                  </div>
                </label>
              </div>

              {/* Generate Button */}
              <button
                onClick={generatePassword}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-3 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5 mr-3" />
                    Generate Secure Password
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Security Tips */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Security Best Practices</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Use unique passwords for each account',
                  'Minimum 12+ characters recommended',
                  'Include multiple character types',
                  'Store passwords in a manager',
                  'Enable 2FA when available'
                ].map((tip, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Privacy Notice */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center mb-3">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-900">100% Private</h3>
              </div>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                  Generated locally in your browser
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                  No passwords stored or transmitted
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                  No tracking or analytics on passwords
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Password Security Guide
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Learn everything you need to know about creating and managing secure passwords
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Password Strength Guide */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
                <h3 className="text-2xl font-bold text-green-900 mb-6">What Makes a Strong Password?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white font-bold">12+</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900">Length Matters Most</h4>
                      <p className="text-green-800 text-sm">Use at least 12 characters. Each additional character exponentially increases security.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white font-bold">Aa</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900">Mix Character Types</h4>
                      <p className="text-green-800 text-sm">Combine uppercase, lowercase, numbers, and symbols for maximum entropy.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white font-bold">🚫</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900">Avoid Common Patterns</h4>
                      <p className="text-green-800 text-sm">No dictionary words, personal info, or predictable sequences like "123" or "abc".</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Manager Guide */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">Using Password Managers</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">One Master Password</h4>
                      <p className="text-blue-800 text-sm">Remember only one strong master password to secure all others.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <RefreshCw className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Auto-Generate Unique Passwords</h4>
                      <p className="text-blue-800 text-sm">Create different strong passwords for every account automatically.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Monitor for Breaches</h4>
                      <p className="text-blue-800 text-sm">Get alerts when your passwords appear in data breaches.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-red-50 rounded-2xl p-8 border border-red-200 mb-12">
              <h3 className="text-2xl font-bold text-red-900 mb-6 text-center">Common Password Mistakes to Avoid</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { mistake: "Using personal information", example: "john1985, sarah_smith", risk: "Easily guessed from social media" },
                  { mistake: "Reusing passwords", example: "Same password for email & banking", risk: "One breach compromises all accounts" },
                  { mistake: "Simple substitutions", example: "password → p@ssw0rd", risk: "Hackers know these patterns" },
                  { mistake: "Short passwords", example: "cat123, hello", risk: "Cracked in seconds by computers" },
                  { mistake: "Dictionary words", example: "elephant, basketball", risk: "Vulnerable to dictionary attacks" },
                  { mistake: "Keyboard patterns", example: "qwerty, 123456", risk: "Among first passwords tried" }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">{item.mistake}</h4>
                    <p className="text-sm text-red-700 mb-2 font-mono bg-red-100 px-2 py-1 rounded">{item.example}</p>
                    <p className="text-xs text-red-600">{item.risk}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Enable Two-Factor Authentication (2FA)</h3>
                <p className="text-purple-800">Add an extra layer of security beyond just passwords</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h4 className="font-semibold text-purple-900 mb-2">Authenticator Apps</h4>
                  <p className="text-sm text-purple-800">Google Authenticator, Authy, or Microsoft Authenticator</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h4 className="font-semibold text-purple-900 mb-2">SMS Codes</h4>
                  <p className="text-sm text-purple-800">Text messages with verification codes (less secure)</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔑</span>
                  </div>
                  <h4 className="font-semibold text-purple-900 mb-2">Hardware Keys</h4>
                  <p className="text-sm text-purple-800">YubiKey or other FIDO2 security keys (most secure)</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}