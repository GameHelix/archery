'use client'

import { useState, useEffect } from 'react'
import { Calculator, DollarSign, Users, Percent, Receipt, PiggyBank, TrendingUp, Zap, Settings, Lightbulb, Star, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TipCalculatorPage() {
  const [billAmount, setBillAmount] = useState('')
  const [tipPercentage, setTipPercentage] = useState(18)
  const [numberOfPeople, setNumberOfPeople] = useState(1)
  const [customTip, setCustomTip] = useState('')
  const [isCustomTip, setIsCustomTip] = useState(false)
  const [roundUpTip, setRoundUpTip] = useState(false)
  const [currency, setCurrency] = useState('$')

  // Calculate values
  const bill = parseFloat(billAmount) || 0
  const tipPercent = isCustomTip ? (parseFloat(customTip) || 0) : tipPercentage
  const tipAmount = bill * (tipPercent / 100)
  const finalTipAmount = roundUpTip ? Math.ceil(tipAmount) : tipAmount
  const totalAmount = bill + finalTipAmount
  const perPersonBill = bill / numberOfPeople
  const perPersonTip = finalTipAmount / numberOfPeople
  const perPersonTotal = totalAmount / numberOfPeople

  const predefinedTips = [10, 15, 18, 20, 25]
  const currencies = [
    { symbol: '$', name: 'USD' },
    { symbol: '€', name: 'EUR' },
    { symbol: '£', name: 'GBP' },
    { symbol: '¥', name: 'JPY' },
  ]

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toFixed(2)}`
  }

  const getTipQuality = (percent: number) => {
    if (percent >= 25) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-50', icon: '🌟' }
    if (percent >= 20) return { label: 'Great', color: 'text-blue-600', bg: 'bg-blue-50', icon: '👏' }
    if (percent >= 18) return { label: 'Good', color: 'text-purple-600', bg: 'bg-purple-50', icon: '👍' }
    if (percent >= 15) return { label: 'Standard', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: '👌' }
    return { label: 'Below Average', color: 'text-orange-600', bg: 'bg-orange-50', icon: '🤔' }
  }

  const tipQuality = getTipQuality(tipPercent)

  const clearAll = () => {
    setBillAmount('')
    setTipPercentage(18)
    setNumberOfPeople(1)
    setCustomTip('')
    setIsCustomTip(false)
    setRoundUpTip(false)
  }

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Tip Calculator - Calculate Tips and Split Bills",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/tip-calculator",
    "description": "Calculate tips and split bills easily. Free tip calculator with customizable tip percentages, bill splitting, and multiple currencies.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Tip percentage calculation",
      "Bill splitting among multiple people",
      "Custom tip percentages",
      "Round up tip option",
      "Multiple currency support",
      "Real-time calculations"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Calculator className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tip Calculator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Calculate tips and split bills easily with customizable percentages and bill splitting.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              💰 Smart calculations • 👥 Bill splitting • 🌍 Multi-currency
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Calculator */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              {/* Bill Amount Input */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Receipt className="h-5 w-5 text-indigo-600 mr-2" />
                  <label className="text-xl font-semibold text-gray-900">
                    Bill Amount
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="bg-transparent text-gray-700 font-medium focus:outline-none"
                    >
                      {currencies.map((curr) => (
                        <option key={curr.symbol} value={curr.symbol}>
                          {curr.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="number"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full pl-16 pr-4 py-4 text-2xl font-semibold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Tip Percentage Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Percent className="h-5 w-5 text-purple-600 mr-2" />
                    <label className="text-xl font-semibold text-gray-900">
                      Tip Percentage
                    </label>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${tipQuality.bg} ${tipQuality.color}`}>
                    {tipQuality.icon} {tipQuality.label}
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {predefinedTips.map((tip) => (
                    <button
                      key={tip}
                      onClick={() => {
                        setTipPercentage(tip)
                        setIsCustomTip(false)
                        setCustomTip('')
                      }}
                      className={`p-3 sm:p-4 rounded-xl border-2 font-semibold transition-all duration-200 hover:scale-105 ${
                        !isCustomTip && tipPercentage === tip
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
                          : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 text-gray-700'
                      }`}
                    >
                      {tip}%
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setIsCustomTip(true)
                      setCustomTip(tipPercentage.toString())
                    }}
                    className={`flex-1 p-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                      isCustomTip
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 text-gray-700'
                    }`}
                  >
                    Custom
                  </button>
                  {isCustomTip && (
                    <input
                      type="number"
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      placeholder="0"
                      step="0.1"
                      className="w-24 p-3 text-center font-semibold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  )}
                </div>
              </div>

              {/* Number of People */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Users className="h-5 w-5 text-green-600 mr-2" />
                  <label className="text-xl font-semibold text-gray-900">
                    Split Between
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-xl text-gray-700 transition-colors duration-200"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <input
                      type="number"
                      value={numberOfPeople}
                      onChange={(e) => setNumberOfPeople(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      className="w-full p-3 text-2xl font-semibold text-center border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      {numberOfPeople === 1 ? 'person' : 'people'}
                    </p>
                  </div>
                  <button
                    onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-xl text-gray-700 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Settings className="h-5 w-5 text-orange-600 mr-2" />
                  <label className="text-xl font-semibold text-gray-900">
                    Options
                  </label>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <div className="font-medium text-gray-900">Round Up Tip</div>
                        <div className="text-sm text-gray-600">Round tip to nearest dollar</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={roundUpTip}
                      onChange={(e) => setRoundUpTip(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              {/* Results */}
              {bill > 0 && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
                    <Receipt className="h-6 w-6 mr-2" />
                    Calculation Results
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-sm text-gray-600 mb-1">Tip Amount</div>
                      <div className="text-2xl font-bold text-purple-600">
                        {formatCurrency(finalTipAmount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {tipPercent.toFixed(1)}% {roundUpTip && tipAmount !== finalTipAmount ? '(rounded up)' : ''}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                      <div className="text-2xl font-bold text-indigo-600">
                        {formatCurrency(totalAmount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Bill + tip
                      </div>
                    </div>
                  </div>

                  {numberOfPeople > 1 && (
                    <div className="border-t border-indigo-200 pt-4">
                      <h4 className="font-semibold text-indigo-800 mb-3 flex items-center">
                        <Users className="h-5 w-5 mr-1" />
                        Per Person ({numberOfPeople} people)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                          <div className="text-sm text-gray-600 mb-1">Bill</div>
                          <div className="text-lg font-bold text-gray-700">
                            {formatCurrency(perPersonBill)}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                          <div className="text-sm text-gray-600 mb-1">Tip</div>
                          <div className="text-lg font-bold text-purple-600">
                            {formatCurrency(perPersonTip)}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                          <div className="text-sm text-gray-600 mb-1">Total</div>
                          <div className="text-lg font-bold text-indigo-600">
                            {formatCurrency(perPersonTotal)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Clear Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={clearAll}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Quick Tips */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-6 w-6 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Tipping Guide</h3>
              </div>
              
              <div className="space-y-4 text-sm text-gray-700">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-medium text-green-800 mb-1">🍽️ Restaurants</div>
                  <div className="text-green-700">15-20% for good service, 18-25% for excellent</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-800 mb-1">🍕 Delivery</div>
                  <div className="text-blue-700">15-20% minimum, more for bad weather</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-medium text-purple-800 mb-1">🍺 Bars</div>
                  <div className="text-purple-700">$1-2 per drink or 15-20% of tab</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="font-medium text-orange-800 mb-1">✂️ Services</div>
                  <div className="text-orange-700">Hair: 15-25%, Taxi: 10-15%</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Star className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Instant tip calculations
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Bill splitting for groups
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom tip percentages
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multiple currencies
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Round up option
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Service quality indicators
                </li>
              </ul>
            </div>

            {/* Usage Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold text-orange-900 mb-4">💡 Pro Tips</h3>
              <div className="space-y-3 text-sm text-orange-800">
                <div>
                  <div className="font-medium mb-1">Quick Calculation:</div>
                  <div className="text-xs text-orange-700">For 20% tip: move decimal left and double</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Group Dining:</div>
                  <div className="text-xs text-orange-700">Consider rounding up individual amounts</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Service Quality:</div>
                  <div className="text-xs text-orange-700">Base tip on service, not just percentage</div>
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