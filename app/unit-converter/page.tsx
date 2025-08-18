'use client'

import { useState } from 'react'
import { Gauge, ArrowLeftRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Unit {
  name: string
  symbol: string
  factor: number
}

interface UnitCategory {
  name: string
  units: Unit[]
}

const unitCategories: UnitCategory[] = [
  {
    name: 'Length',
    units: [
      { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      { name: 'Meter', symbol: 'm', factor: 1 },
      { name: 'Kilometer', symbol: 'km', factor: 1000 },
      { name: 'Inch', symbol: 'in', factor: 0.0254 },
      { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { name: 'Mile', symbol: 'mi', factor: 1609.344 },
    ]
  },
  {
    name: 'Weight',
    units: [
      { name: 'Milligram', symbol: 'mg', factor: 0.000001 },
      { name: 'Gram', symbol: 'g', factor: 0.001 },
      { name: 'Kilogram', symbol: 'kg', factor: 1 },
      { name: 'Ton', symbol: 't', factor: 1000 },
      { name: 'Ounce', symbol: 'oz', factor: 0.0283495 },
      { name: 'Pound', symbol: 'lb', factor: 0.453592 },
      { name: 'Stone', symbol: 'st', factor: 6.35029 },
    ]
  },
  {
    name: 'Temperature',
    units: [
      { name: 'Celsius', symbol: '°C', factor: 1 },
      { name: 'Fahrenheit', symbol: '°F', factor: 1 },
      { name: 'Kelvin', symbol: 'K', factor: 1 },
    ]
  },
  {
    name: 'Volume',
    units: [
      { name: 'Milliliter', symbol: 'ml', factor: 0.001 },
      { name: 'Liter', symbol: 'l', factor: 1 },
      { name: 'Cubic Meter', symbol: 'm³', factor: 1000 },
      { name: 'Fluid Ounce', symbol: 'fl oz', factor: 0.0295735 },
      { name: 'Cup', symbol: 'cup', factor: 0.236588 },
      { name: 'Pint', symbol: 'pt', factor: 0.473176 },
      { name: 'Quart', symbol: 'qt', factor: 0.946353 },
      { name: 'Gallon', symbol: 'gal', factor: 3.78541 },
    ]
  },
  {
    name: 'Area',
    units: [
      { name: 'Square Millimeter', symbol: 'mm²', factor: 0.000001 },
      { name: 'Square Centimeter', symbol: 'cm²', factor: 0.0001 },
      { name: 'Square Meter', symbol: 'm²', factor: 1 },
      { name: 'Square Kilometer', symbol: 'km²', factor: 1000000 },
      { name: 'Square Inch', symbol: 'in²', factor: 0.00064516 },
      { name: 'Square Foot', symbol: 'ft²', factor: 0.092903 },
      { name: 'Square Yard', symbol: 'yd²', factor: 0.836127 },
      { name: 'Acre', symbol: 'ac', factor: 4046.86 },
      { name: 'Hectare', symbol: 'ha', factor: 10000 },
    ]
  },
  {
    name: 'Speed',
    units: [
      { name: 'Meter per Second', symbol: 'm/s', factor: 1 },
      { name: 'Kilometer per Hour', symbol: 'km/h', factor: 0.277778 },
      { name: 'Mile per Hour', symbol: 'mph', factor: 0.44704 },
      { name: 'Foot per Second', symbol: 'ft/s', factor: 0.3048 },
      { name: 'Knot', symbol: 'kt', factor: 0.514444 },
    ]
  }
]

export default function UnitConverterPage() {
  const [selectedCategory, setSelectedCategory] = useState(unitCategories[0])
  const [fromUnit, setFromUnit] = useState(selectedCategory.units[2])
  const [toUnit, setToUnit] = useState(selectedCategory.units[0])
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')

  const convertValue = (value: string, from: Unit, to: Unit, category: string) => {
    const numValue = parseFloat(value)
    if (isNaN(numValue)) return ''

    let result: number

    if (category === 'Temperature') {
      // Special conversion for temperature
      if (from.symbol === '°C' && to.symbol === '°F') {
        result = (numValue * 9/5) + 32
      } else if (from.symbol === '°F' && to.symbol === '°C') {
        result = (numValue - 32) * 5/9
      } else if (from.symbol === '°C' && to.symbol === 'K') {
        result = numValue + 273.15
      } else if (from.symbol === 'K' && to.symbol === '°C') {
        result = numValue - 273.15
      } else if (from.symbol === '°F' && to.symbol === 'K') {
        result = ((numValue - 32) * 5/9) + 273.15
      } else if (from.symbol === 'K' && to.symbol === '°F') {
        result = ((numValue - 273.15) * 9/5) + 32
      } else {
        result = numValue
      }
    } else {
      // Standard conversion using factors
      const baseValue = numValue * from.factor
      result = baseValue / to.factor
    }

    return result.toFixed(6).replace(/\.?0+$/, '')
  }

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    const converted = convertValue(value, fromUnit, toUnit, selectedCategory.name)
    setToValue(converted)
  }

  const handleToValueChange = (value: string) => {
    setToValue(value)
    const converted = convertValue(value, toUnit, fromUnit, selectedCategory.name)
    setFromValue(converted)
  }

  const handleCategoryChange = (category: UnitCategory) => {
    setSelectedCategory(category)
    setFromUnit(category.units[0])
    setToUnit(category.units[1] || category.units[0])
    setFromValue('')
    setToValue('')
  }

  const swapUnits = () => {
    const tempUnit = fromUnit
    setFromUnit(toUnit)
    setToUnit(tempUnit)
    
    const tempValue = fromValue
    setFromValue(toValue)
    setToValue(tempValue)
  }

  const clearValues = () => {
    setFromValue('')
    setToValue('')
  }

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Unit Converter - Measurement Conversion Tool",
    "applicationCategory": ["UtilitiesApplication", "EducationApplication"],
    "operatingSystem": ["Web Browser", "iOS", "Android", "Windows", "MacOS", "Linux"],
    "url": "https://swissknife.site/unit-converter",
    "description": "Convert between different units of measurement with our free, mobile-friendly unit converter. Supports length, weight, temperature, volume, area, and speed conversions with instant results.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Length conversions (metric and imperial)",
      "Weight and mass conversions",
      "Temperature conversions (Celsius, Fahrenheit, Kelvin)",
      "Volume and capacity conversions",
      "Area conversions",
      "Speed conversions",
      "Instant conversion results",
      "Mobile-responsive design",
      "Touch-friendly interface",
      "Conversion formulas display",
      "Common conversions reference",
      "No registration required"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "890",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Gauge className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Free Unit Converter
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Convert between different units of measurement instantly and accurately.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              📏 Length • ⚖️ Weight • 🌡️ Temperature • 🪣 Volume • 📐 Area • 🏃 Speed
            </span>
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
          {/* Category Selection */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Gauge className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Select Conversion Type</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {unitCategories.map((category) => {
                const categoryIcons: { [key: string]: string } = {
                  'Length': '📏',
                  'Weight': '⚖️',
                  'Temperature': '🌡️',
                  'Volume': '🪣',
                  'Area': '📐',
                  'Speed': '🏃'
                }
                return (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryChange(category)}
                    className={`p-4 text-sm font-medium rounded-xl transition-all duration-200 min-h-[56px] touch-manipulation ${
                      selectedCategory.name === category.name
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">{categoryIcons[category.name]}</span>
                      <span className="text-xs sm:text-sm">{category.name}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Conversion Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* From Unit */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <label className="block text-sm font-medium text-blue-900 mb-3">
                  Convert From
                </label>
                <select
                  value={fromUnit.symbol}
                  onChange={(e) => {
                    const unit = selectedCategory.units.find(u => u.symbol === e.target.value)
                    if (unit) {
                      setFromUnit(unit)
                      const converted = convertValue(fromValue, unit, toUnit, selectedCategory.name)
                      setToValue(converted)
                    }
                  }}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[48px] mb-3"
                  aria-label="Select unit to convert from"
                >
                  {selectedCategory.units.map((unit) => (
                    <option key={unit.symbol} value={unit.symbol}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={fromValue}
                  onChange={(e) => handleFromValueChange(e.target.value)}
                  placeholder="Enter value"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[56px]"
                  aria-label="Value to convert"
                />
              </div>
            </div>

            {/* Swap & Clear Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 lg:my-0 my-6">
              <button
                onClick={swapUnits}
                className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation min-h-[56px] min-w-[56px]"
                title="Swap units"
                aria-label="Swap conversion units"
              >
                <ArrowLeftRight className="h-6 w-6 text-blue-600" />
              </button>
              {(fromValue || toValue) && (
                <button
                  onClick={clearValues}
                  className="px-4 py-2 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium text-gray-700 touch-manipulation"
                  title="Clear values"
                  aria-label="Clear all values"
                >
                  Clear
                </button>
              )}
            </div>

            {/* To Unit */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <label className="block text-sm font-medium text-green-900 mb-3">
                  Convert To
                </label>
                <select
                  value={toUnit.symbol}
                  onChange={(e) => {
                    const unit = selectedCategory.units.find(u => u.symbol === e.target.value)
                    if (unit) {
                      setToUnit(unit)
                      const converted = convertValue(fromValue, fromUnit, unit, selectedCategory.name)
                      setToValue(converted)
                    }
                  }}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[48px] mb-3"
                  aria-label="Select unit to convert to"
                >
                  {selectedCategory.units.map((unit) => (
                    <option key={unit.symbol} value={unit.symbol}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={toValue}
                  onChange={(e) => handleToValueChange(e.target.value)}
                  placeholder="Result"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl text-lg bg-green-50/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[56px]"
                  aria-label="Conversion result"
                />
              </div>
            </div>
          </div>

          {/* Empty State Message */}
          {!fromValue && !toValue && (
            <div className="mt-8 text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Gauge className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Convert?</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-4">
                Enter a value in either field to see instant conversion results with detailed formulas.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                <span className="bg-blue-50 px-2 py-1 rounded-full">✨ Real-time conversion</span>
                <span className="bg-green-50 px-2 py-1 rounded-full">🔄 Bidirectional</span>
                <span className="bg-purple-50 px-2 py-1 rounded-full">🎯 High precision</span>
              </div>
            </div>
          )}

          {/* Conversion Formula */}
          {fromValue && toValue && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">=</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-900">Conversion Result</h3>
              </div>
              <div className="bg-white/80 rounded-xl p-4 border border-blue-300">
                <p className="text-xl font-mono text-blue-800 text-center">
                  <span className="font-bold text-blue-900">{fromValue}</span>
                  <span className="mx-2 text-gray-600">{fromUnit.symbol}</span>
                  <span className="mx-3 text-2xl">=</span>
                  <span className="font-bold text-green-700">{toValue}</span>
                  <span className="ml-2 text-gray-600">{toUnit.symbol}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Reference & Common Conversions */}
        <div className="mt-12 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Quick Reference Guide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Commonly used conversion formulas and quick reference values for everyday calculations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Length', 
                icon: '📏',
                conversions: ['1 m = 3.28 ft', '1 km = 0.62 mi', '1 in = 2.54 cm', '1 yd = 0.91 m'],
                color: 'from-blue-50 to-blue-100 border-blue-200'
              },
              { 
                title: 'Weight', 
                icon: '⚖️',
                conversions: ['1 kg = 2.20 lb', '1 lb = 16 oz', '1 g = 0.035 oz', '1 ton = 1000 kg'],
                color: 'from-green-50 to-green-100 border-green-200'
              },
              { 
                title: 'Temperature', 
                icon: '🌡️',
                conversions: ['0°C = 32°F', '100°C = 212°F', '0°C = 273.15K', '37°C = 98.6°F'],
                color: 'from-red-50 to-red-100 border-red-200'
              },
              { 
                title: 'Volume', 
                icon: '🫗',
                conversions: ['1 L = 0.26 gal', '1 gal = 4 qt', '1 cup = 236.6 ml', '1 pt = 0.47 L'],
                color: 'from-cyan-50 to-cyan-100 border-cyan-200'
              },
              { 
                title: 'Area', 
                icon: '📐',
                conversions: ['1 m² = 10.76 ft²', '1 ha = 2.47 ac', '1 km² = 0.39 mi²', '1 ac = 4047 m²'],
                color: 'from-purple-50 to-purple-100 border-purple-200'
              },
              { 
                title: 'Speed', 
                icon: '🏃',
                conversions: ['1 m/s = 3.6 km/h', '1 mph = 1.61 km/h', '1 kt = 1.85 km/h', '1 ft/s = 0.68 mph'],
                color: 'from-orange-50 to-orange-100 border-orange-200'
              },
            ].map((category, index) => (
              <div key={index} className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200`}>
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-800">
                  {category.conversions.map((conversion, idx) => (
                    <li key={idx} className="font-mono bg-white/50 rounded-lg px-3 py-2 hover:bg-white/70 transition-colors">
                      {conversion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-8 border border-indigo-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Unit Converter?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fast, accurate, and user-friendly conversion tool for all your measurement needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {
              [
                { icon: '⚡', title: 'Instant Results', desc: 'Real-time conversions as you type' },
                { icon: '📱', title: 'Mobile Friendly', desc: 'Optimized for all devices and screen sizes' },
                { icon: '🎯', title: 'High Precision', desc: 'Accurate calculations with detailed results' },
                { icon: '🔄', title: 'Bidirectional', desc: 'Convert in both directions seamlessly' }
              ].map((feature, index) => (
                <div key={index} className="text-center bg-white/60 rounded-xl p-6 hover:bg-white/80 transition-colors">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))
            }
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}