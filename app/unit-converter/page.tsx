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
    setToUnit(category.units[1])
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Gauge className="h-12 w-12 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Unit Converter</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert between different units of measurement including length, weight, temperature, volume, area, and speed.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Category Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Conversion Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {unitCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryChange(category)}
                  className={`p-3 text-sm font-medium rounded-lg transition-colors ${
                    selectedCategory.name === category.name
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Conversion Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* From Unit */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {selectedCategory.units.map((unit) => (
                    <option key={unit.symbol} value={unit.symbol}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  type="number"
                  value={fromValue}
                  onChange={(e) => handleFromValueChange(e.target.value)}
                  placeholder="Enter value"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-3 bg-primary-100 hover:bg-primary-200 rounded-full transition-colors"
                title="Swap units"
              >
                <ArrowLeftRight className="h-6 w-6 text-primary-600" />
              </button>
            </div>

            {/* To Unit */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {selectedCategory.units.map((unit) => (
                    <option key={unit.symbol} value={unit.symbol}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  type="number"
                  value={toValue}
                  onChange={(e) => handleToValueChange(e.target.value)}
                  placeholder="Result"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Conversion Formula */}
          {fromValue && toValue && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Conversion</h3>
              <p className="text-blue-800">
                {fromValue} {fromUnit.symbol} = {toValue} {toUnit.symbol}
              </p>
            </div>
          )}
        </div>

        {/* Common Conversions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Length', conversions: ['1 m = 3.28 ft', '1 km = 0.62 mi', '1 in = 2.54 cm'] },
            { title: 'Weight', conversions: ['1 kg = 2.20 lb', '1 lb = 16 oz', '1 g = 0.035 oz'] },
            { title: 'Temperature', conversions: ['0°C = 32°F', '100°C = 212°F', '0°C = 273.15K'] },
            { title: 'Volume', conversions: ['1 L = 0.26 gal', '1 gal = 4 qt', '1 cup = 236.6 ml'] },
            { title: 'Area', conversions: ['1 m² = 10.76 ft²', '1 ha = 2.47 ac', '1 km² = 0.39 mi²'] },
            { title: 'Speed', conversions: ['1 m/s = 3.6 km/h', '1 mph = 1.61 km/h', '1 kt = 1.85 km/h'] },
          ].map((category, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{category.title}</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {category.conversions.map((conversion, idx) => (
                  <li key={idx} className="font-mono">{conversion}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}