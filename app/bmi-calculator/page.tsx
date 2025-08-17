'use client'

import { useState, useEffect } from 'react'
import { Activity, Info } from 'lucide-react'
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

  const getBMIColor = (bmiValue: number) => {
    if (bmiValue < 18.5) return 'text-blue-600'
    if (bmiValue < 25) return 'text-green-600'
    if (bmiValue < 30) return 'text-yellow-600'
    return 'text-red-600'
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Activity className="h-12 w-12 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">BMI Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your Body Mass Index (BMI) to assess if you're at a healthy weight for your height.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Details</h2>
            
            {/* Unit Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Measurement System
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="metric"
                    checked={unit === 'metric'}
                    onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">Metric (cm, kg)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="imperial"
                    checked={unit === 'imperial'}
                    onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">Imperial (ft/in, lbs)</span>
                </label>
              </div>
            </div>

            {/* Height Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height {unit === 'metric' ? '(cm)' : '(ft/in)'}
              </label>
              {unit === 'metric' ? (
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="170"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    placeholder="5"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="px-3 py-3 text-gray-500">ft</span>
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    placeholder="8"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="px-3 py-3 text-gray-500">in</span>
                </div>
              )}
            </div>

            {/* Weight Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? '70' : '154'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Ideal Weight Range */}
            {getIdealWeight() && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-sm font-medium text-green-900 mb-1">Ideal Weight Range</h3>
                <p className="text-green-800 font-medium">{getIdealWeight()}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your BMI Result</h2>
            
            {bmi ? (
              <div className="space-y-6">
                {/* BMI Value */}
                <div className="text-center">
                  <div className={`text-5xl font-bold mb-2 ${getBMIColor(bmi)}`}>
                    {bmi.toFixed(1)}
                  </div>
                  <div className={`text-xl font-medium ${getBMIColor(bmi)}`}>
                    {category}
                  </div>
                </div>

                {/* BMI Scale */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>15</span>
                    <span>40</span>
                  </div>
                  <div className="relative h-6 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-full">
                    <div 
                      className="absolute top-0 w-1 h-full bg-black rounded-full transform -translate-x-1/2"
                      style={{ left: `${getBMIBarPosition(bmi)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                </div>

                {/* BMI Categories */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">BMI Categories:</h3>
                  <div className="space-y-1 text-sm">
                    <div className={`flex justify-between p-2 rounded ${bmi < 18.5 ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-600'}`}>
                      <span>Underweight</span>
                      <span>&lt; 18.5</span>
                    </div>
                    <div className={`flex justify-between p-2 rounded ${bmi >= 18.5 && bmi < 25 ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-600'}`}>
                      <span>Normal weight</span>
                      <span>18.5 - 24.9</span>
                    </div>
                    <div className={`flex justify-between p-2 rounded ${bmi >= 25 && bmi < 30 ? 'bg-yellow-100 text-yellow-800 font-medium' : 'text-gray-600'}`}>
                      <span>Overweight</span>
                      <span>25 - 29.9</span>
                    </div>
                    <div className={`flex justify-between p-2 rounded ${bmi >= 30 ? 'bg-red-100 text-red-800 font-medium' : 'text-gray-600'}`}>
                      <span>Obese</span>
                      <span>&ge; 30</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Activity className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>Enter your height and weight to calculate your BMI</p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">About BMI</h3>
              <div className="space-y-3 text-blue-800">
                <p>
                  Body Mass Index (BMI) is a measure of body fat based on height and weight. 
                  It's a useful screening tool but doesn't directly measure body fat.
                </p>
                <p>
                  <strong>Important:</strong> BMI may not be accurate for athletes, elderly people, 
                  children, or people with certain medical conditions. Always consult with a 
                  healthcare professional for personalized health advice.
                </p>
                <p>
                  <strong>Limitations:</strong> BMI doesn't distinguish between muscle and fat, 
                  and it may not be suitable for all ethnic groups or body types.
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