'use client'

import { useState, useEffect } from 'react'
import { Activity, Info, Scale, Heart, Target, TrendingUp, Zap, Settings, Users, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function BMICalculatorPage() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState('')
  const [heightFeet, setHeightFeet] = useState('')
  const [heightInches, setHeightInches] = useState('')
  const [age, setAge] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const calculateBMI = () => {
    let heightInMeters: number
    let weightInKg: number

    if (unit === 'metric') {
      heightInMeters = parseFloat(height) / 100
      weightInKg = parseFloat(weight)
    } else {
      const totalInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0)
      heightInMeters = totalInches * 0.0254
      weightInKg = parseFloat(weight) * 0.453592
    }

    if (heightInMeters > 0 && weightInKg > 0) {
      const calculatedBMI = weightInKg / (heightInMeters * heightInMeters)
      setBmi(calculatedBMI)
      
      if (calculatedBMI < 18.5) {
        setCategory('Underweight')
      } else if (calculatedBMI < 25) {
        setCategory('Normal weight')
      } else if (calculatedBMI < 30) {
        setCategory('Overweight')
      } else {
        setCategory('Obese')
      }
    } else {
      setBmi(null)
      setCategory('')
    }
  }

  useEffect(() => {
    calculateBMI()
  }, [height, weight, heightFeet, heightInches, unit])

  const getBMIData = (bmiValue: number) => {
    if (bmiValue < 18.5) return {
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-200',
      icon: '⚡',
      status: 'Underweight',
      description: 'Below normal weight range',
      recommendation: 'Consider gaining weight through healthy diet and exercise'
    }
    if (bmiValue < 25) return {
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: '✅',
      status: 'Normal weight',
      description: 'Within healthy weight range',
      recommendation: 'Maintain your current lifestyle and weight'
    }
    if (bmiValue < 30) return {
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: '⚠️',
      status: 'Overweight',
      description: 'Above normal weight range',
      recommendation: 'Consider weight loss through diet and exercise'
    }
    return {
      color: 'text-red-600',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-200',
      icon: '🚨',
      status: 'Obese',
      description: 'Significantly above normal weight',
      recommendation: 'Consult healthcare professional for weight management plan'
    }
  }

  const getBMIBarPosition = (bmiValue: number) => {
    if (bmiValue < 15) return 0
    if (bmiValue > 40) return 100
    return ((bmiValue - 15) / 25) * 100
  }

  const getIdealWeight = () => {
    if (!height && !(heightFeet && heightInches)) return null
    
    let heightInMeters: number
    if (unit === 'metric') {
      heightInMeters = parseFloat(height) / 100
    } else {
      const totalInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0)
      heightInMeters = totalInches * 0.0254
    }

    if (heightInMeters > 0) {
      const minWeight = 18.5 * heightInMeters * heightInMeters
      const maxWeight = 24.9 * heightInMeters * heightInMeters
      
      if (unit === 'metric') {
        return `${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)} kg`
      } else {
        return `${(minWeight * 2.20462).toFixed(1)} - ${(maxWeight * 2.20462).toFixed(1)} lbs`
      }
    }
    return null
  }

  const clearAll = () => {
    setHeight('')
    setWeight('')
    setHeightFeet('')
    setHeightInches('')
    setAge('')
    setBmi(null)
    setCategory('')
  }

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BMI Calculator - Body Mass Index Calculator",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": "https://swissknife.site/bmi-calculator",
    "description": "Calculate your Body Mass Index (BMI) to assess if you're at a healthy weight. Free BMI calculator with metric and imperial units, ideal weight ranges, and health recommendations.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "BMI calculation with metric and imperial units",
      "Ideal weight range calculation",
      "BMI categories and health recommendations",
      "Interactive BMI scale visualization",
      "Health tips and limitations information"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    }
  }

  const bmiData = bmi ? getBMIData(bmi) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-900 to-dark-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Activity className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            BMI Calculator
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Calculate your Body Mass Index (BMI) to assess if you're at a healthy weight for your height.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              📊 Instant calculation • 📏 Multiple units • 💡 Health insights
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Calculator */}
          <div className="xl:col-span-2">
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Scale className="h-5 w-5 text-orange-600 mr-2" />
                  <h2 className="text-xl font-semibold text-white">Enter Your Details</h2>
                </div>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-sm text-orange-600 hover:text-orange-400 font-medium"
                >
                  {showAdvanced ? 'Basic' : 'Advanced'}
                </button>
              </div>
              
              {/* Unit Selection */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Settings className="h-5 w-5 text-purple-600 mr-2" />
                  <label className="text-lg font-semibold text-white">
                    Measurement System
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setUnit('metric')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      unit === 'metric'
                        ? 'border-orange-500 bg-orange-50 text-orange-400 shadow-md'
                        : 'border-dark-700 bg-dark-800 hover:border-orange-300 hover:bg-orange-50/50 text-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors ${
                        unit === 'metric' ? 'bg-orange-200' : 'bg-dark-700'
                      }`}>
                        <BarChart3 className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Metric</span>
                    </div>
                    <div className="text-sm opacity-75">Centimeters & Kilograms</div>
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      unit === 'imperial'
                        ? 'border-orange-500 bg-orange-50 text-orange-400 shadow-md'
                        : 'border-dark-700 bg-dark-800 hover:border-orange-300 hover:bg-orange-50/50 text-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors ${
                        unit === 'imperial' ? 'bg-orange-200' : 'bg-dark-700'
                      }`}>
                        <Scale className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Imperial</span>
                    </div>
                    <div className="text-sm opacity-75">Feet/Inches & Pounds</div>
                  </button>
                </div>
              </div>

              {/* Height Input */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  <label className="text-lg font-semibold text-white">
                    Height {unit === 'metric' ? '(cm)' : '(ft/in)'}
                  </label>
                </div>
                {unit === 'metric' ? (
                  <div className="relative">
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="170"
                      step="0.1"
                      className="w-full px-4 py-4 text-lg font-semibold border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <span className="text-gray-500 font-medium">cm</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="number"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        placeholder="5"
                        className="w-full px-4 py-4 text-lg font-semibold border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <span className="text-gray-500 font-medium">ft</span>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        placeholder="8"
                        className="w-full px-4 py-4 text-lg font-semibold border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <span className="text-gray-500 font-medium">in</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Weight Input */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Scale className="h-5 w-5 text-green-600 mr-2" />
                  <label className="text-lg font-semibold text-white">
                    Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unit === 'metric' ? '70' : '154'}
                    step="0.1"
                    className="w-full px-4 py-4 text-lg font-semibold border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-gray-500 font-medium">{unit === 'metric' ? 'kg' : 'lbs'}</span>
                  </div>
                </div>
              </div>

              {/* Advanced Options */}
              {showAdvanced && (
                <div className="mb-8 p-4 bg-dark-800 rounded-xl border border-dark-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Users className="h-5 w-5 text-purple-600 mr-2" />
                    Additional Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Age (optional)
                      </label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="25"
                        className="w-full px-4 py-3 border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Ideal Weight Range */}
              {getIdealWeight() && (
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-500/30">
                  <h3 className="text-lg font-semibold text-green-300 mb-2 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Healthy Weight Range
                  </h3>
                  <p className="text-2xl font-bold text-green-400">{getIdealWeight()}</p>
                  <p className="text-sm text-green-600 mt-1">Based on normal BMI range (18.5-24.9)</p>
                </div>
              )}

              {/* Clear Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={clearAll}
                  className="px-6 py-3 bg-dark-8000 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6">
              <div className="flex items-center mb-6">
                <Activity className="h-6 w-6 text-orange-600 mr-2" />
                <h2 className="text-xl font-semibold text-white">Your BMI Result</h2>
              </div>
              
              {bmi && bmiData ? (
                <div className="space-y-6">
                  {/* BMI Value */}
                  <div className={`text-center p-6 rounded-2xl ${bmiData.bgColor} ${bmiData.borderColor} border-2`}>
                    <div className="text-4xl mb-2">{bmiData.icon}</div>
                    <div className={`text-4xl sm:text-5xl font-bold mb-2 ${bmiData.color}`}>
                      {bmi.toFixed(1)}
                    </div>
                    <div className={`text-xl font-semibold ${bmiData.color} mb-2`}>
                      {bmiData.status}
                    </div>
                    <div className="text-sm text-gray-400">
                      {bmiData.description}
                    </div>
                  </div>

                  {/* BMI Scale */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      BMI Scale
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>15</span>
                        <span>40</span>
                      </div>
                      <div className="relative h-6 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-full shadow-inner">
                        <div 
                          className="absolute top-0 w-2 h-full bg-dark-800 border-2 border-gray-800 rounded-full transform -translate-x-1/2 shadow-lg"
                          style={{ left: `${getBMIBarPosition(bmi)}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-4 text-xs text-gray-400 text-center">
                        <span>Under</span>
                        <span>Normal</span>
                        <span>Over</span>
                        <span>Obese</span>
                      </div>
                    </div>
                  </div>

                  {/* BMI Categories */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">BMI Categories:</h4>
                    <div className="space-y-2 text-sm">
                      <div className={`flex justify-between p-3 rounded-xl transition-all duration-200 ${
                        bmi < 18.5 
                          ? 'bg-blue-500/10 text-gray-300 font-semibold border-2 border-blue-300 shadow-md' 
                          : 'bg-dark-800 text-gray-400 border border-dark-700'
                      }`}>
                        <span className="flex items-center">
                          {bmi < 18.5 && <CheckCircle className="h-4 w-4 mr-2" />}
                          Underweight
                        </span>
                        <span>&lt; 18.5</span>
                      </div>
                      <div className={`flex justify-between p-3 rounded-xl transition-all duration-200 ${
                        bmi >= 18.5 && bmi < 25 
                          ? 'bg-green-100 text-gray-300 font-semibold border-2 border-green-300 shadow-md' 
                          : 'bg-dark-800 text-gray-400 border border-dark-700'
                      }`}>
                        <span className="flex items-center">
                          {bmi >= 18.5 && bmi < 25 && <CheckCircle className="h-4 w-4 mr-2" />}
                          Normal weight
                        </span>
                        <span>18.5 - 24.9</span>
                      </div>
                      <div className={`flex justify-between p-3 rounded-xl transition-all duration-200 ${
                        bmi >= 25 && bmi < 30 
                          ? 'bg-yellow-100 text-gray-300 font-semibold border-2 border-yellow-300 shadow-md' 
                          : 'bg-dark-800 text-gray-400 border border-dark-700'
                      }`}>
                        <span className="flex items-center">
                          {bmi >= 25 && bmi < 30 && <CheckCircle className="h-4 w-4 mr-2" />}
                          Overweight
                        </span>
                        <span>25 - 29.9</span>
                      </div>
                      <div className={`flex justify-between p-3 rounded-xl transition-all duration-200 ${
                        bmi >= 30 
                          ? 'bg-red-100 text-red-400 font-semibold border-2 border-red-300 shadow-md' 
                          : 'bg-dark-800 text-gray-400 border border-dark-700'
                      }`}>
                        <span className="flex items-center">
                          {bmi >= 30 && <CheckCircle className="h-4 w-4 mr-2" />}
                          Obese
                        </span>
                        <span>&ge; 30</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className={`p-4 rounded-xl ${bmiData.bgColor} ${bmiData.borderColor} border`}>
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <Heart className="h-4 w-4 mr-2" />
                      Recommendation
                    </h4>
                    <p className="text-sm text-gray-300">
                      {bmiData.recommendation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <div className="w-16 h-16 bg-dark-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="font-medium mb-2">Calculate Your BMI</p>
                  <p className="text-sm">Enter your height and weight to get started</p>
                </div>
              )}
            </div>

            {/* Health Tips */}
            <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-pink-600 mr-2" />
                <h3 className="text-lg font-semibold text-white">Health Tips</h3>
              </div>
              
              <div className="space-y-4 text-sm text-gray-300">
                <div className="p-3 bg-green-50 rounded-lg border border-green-500/30">
                  <div className="font-medium text-gray-300 mb-1">🥗 Healthy Diet</div>
                  <div className="text-green-400">Balanced nutrition with fruits, vegetables, and lean proteins</div>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <div className="font-medium text-gray-300 mb-1">🏃 Regular Exercise</div>
                  <div className="text-blue-400">150+ minutes of moderate activity per week</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-500/30">
                  <div className="font-medium text-gray-300 mb-1">😴 Quality Sleep</div>
                  <div className="text-purple-700">7-9 hours of sleep for optimal health</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-500/30">
                  <div className="font-medium text-gray-300 mb-1">💧 Stay Hydrated</div>
                  <div className="text-orange-400">8 glasses of water daily</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-6 sm:p-8 border border-blue-500/30">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-blue-300 mb-6">About BMI & Important Limitations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    What BMI Measures
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Body weight relative to height</li>
                    <li>• General health screening tool</li>
                    <li>• Population-level health trends</li>
                    <li>• Risk assessment for weight-related conditions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                    Important Limitations
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Doesn't distinguish muscle from fat</li>
                    <li>• May not be accurate for athletes</li>
                    <li>• Different standards for different ethnicities</li>
                    <li>• Not suitable for children or elderly</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/50 rounded-xl border border-blue-300">
                <p className="text-sm text-gray-300">
                  <strong>Medical Disclaimer:</strong> BMI is a screening tool only. Always consult with a healthcare professional for personalized health advice, especially before making significant lifestyle changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}