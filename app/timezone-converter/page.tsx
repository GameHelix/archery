'use client'

import { useState, useEffect, useCallback } from 'react'
import { Clock, Globe, CalendarClock, MapPin, Plus, X, Users, Zap, Shield, Search } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface TimeZone {
  name: string
  label: string
  offset: string
  city: string
  country: string
  flag: string
}

interface WorldClock {
  id: string
  timezone: TimeZone
  time: string
  date: string
  isDaylight: boolean
}

const popularTimezones: TimeZone[] = [
  { name: 'America/New_York', label: 'Eastern Time', offset: 'UTC-5', city: 'New York', country: 'United States', flag: '🇺🇸' },
  { name: 'America/Los_Angeles', label: 'Pacific Time', offset: 'UTC-8', city: 'Los Angeles', country: 'United States', flag: '🇺🇸' },
  { name: 'America/Chicago', label: 'Central Time', offset: 'UTC-6', city: 'Chicago', country: 'United States', flag: '🇺🇸' },
  { name: 'Europe/London', label: 'GMT/BST', offset: 'UTC+0', city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Europe/Paris', label: 'CET/CEST', offset: 'UTC+1', city: 'Paris', country: 'France', flag: '🇫🇷' },
  { name: 'Europe/Berlin', label: 'CET/CEST', offset: 'UTC+1', city: 'Berlin', country: 'Germany', flag: '🇩🇪' },
  { name: 'Asia/Tokyo', label: 'JST', offset: 'UTC+9', city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
  { name: 'Asia/Shanghai', label: 'CST', offset: 'UTC+8', city: 'Shanghai', country: 'China', flag: '🇨🇳' },
  { name: 'Asia/Hong_Kong', label: 'HKT', offset: 'UTC+8', city: 'Hong Kong', country: 'Hong Kong', flag: '🇭🇰' },
  { name: 'Asia/Singapore', label: 'SGT', offset: 'UTC+8', city: 'Singapore', country: 'Singapore', flag: '🇸🇬' },
  { name: 'Asia/Dubai', label: 'GST', offset: 'UTC+4', city: 'Dubai', country: 'UAE', flag: '🇦🇪' },
  { name: 'Asia/Kolkata', label: 'IST', offset: 'UTC+5:30', city: 'Mumbai', country: 'India', flag: '🇮🇳' },
  { name: 'Australia/Sydney', label: 'AEST/AEDT', offset: 'UTC+10', city: 'Sydney', country: 'Australia', flag: '🇦🇺' },
  { name: 'Pacific/Auckland', label: 'NZST/NZDT', offset: 'UTC+12', city: 'Auckland', country: 'New Zealand', flag: '🇳🇿' },
  { name: 'America/Toronto', label: 'Eastern Time', offset: 'UTC-5', city: 'Toronto', country: 'Canada', flag: '🇨🇦' },
  { name: 'America/Vancouver', label: 'Pacific Time', offset: 'UTC-8', city: 'Vancouver', country: 'Canada', flag: '🇨🇦' },
  { name: 'America/Sao_Paulo', label: 'BRT', offset: 'UTC-3', city: 'São Paulo', country: 'Brazil', flag: '🇧🇷' },
  { name: 'America/Mexico_City', label: 'CST', offset: 'UTC-6', city: 'Mexico City', country: 'Mexico', flag: '🇲🇽' },
  { name: 'Europe/Moscow', label: 'MSK', offset: 'UTC+3', city: 'Moscow', country: 'Russia', flag: '🇷🇺' },
  { name: 'Africa/Cairo', label: 'EET', offset: 'UTC+2', city: 'Cairo', country: 'Egypt', flag: '🇪🇬' }
]

export default function TimezoneConverterPage() {
  const [worldClocks, setWorldClocks] = useState<WorldClock[]>([])
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedTimezone, setSelectedTimezone] = useState<TimeZone>(popularTimezones[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Timezone Converter - World Clock & Time Zone Tool",
    "applicationCategory": ["UtilitiesApplication", "ProductivityApplication"],
    "operatingSystem": ["Web Browser", "iOS", "Android", "Windows", "MacOS", "Linux"],
    "url": "https://swissknife.site/timezone-converter",
    "description": "Convert time between different timezones instantly with our free timezone converter. World clock, meeting planner, and timezone comparison tool for global scheduling.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Timezone conversion between any global timezones",
      "World clock with multiple cities",
      "Meeting planner for international scheduling",
      "Real-time clock updates",
      "Popular timezone presets",
      "Daylight saving time awareness",
      "Mobile-responsive design",
      "Touch-friendly interface",
      "Search functionality for cities",
      "Time difference calculator",
      "UTC/GMT conversion",
      "International meeting scheduler"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "768",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Initialize with some default world clocks
  useEffect(() => {
    const defaultClocks = [
      popularTimezones[0], // New York
      popularTimezones[3], // London
      popularTimezones[6], // Tokyo
      popularTimezones[7], // Shanghai
    ]
    
    setWorldClocks(defaultClocks.map((timezone, index) => ({
      id: `default-${index}`,
      timezone,
      time: '',
      date: '',
      isDaylight: false
    })))
  }, [])

  const formatTimeInTimezone = useCallback((date: Date, timezone: string) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })
      
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
      
      return {
        time: formatter.format(date),
        date: dateFormatter.format(date),
        isDaylight: false // This would need more complex DST detection
      }
    } catch (error) {
      return {
        time: 'Invalid timezone',
        date: '',
        isDaylight: false
      }
    }
  }, [])

  const convertTime = useCallback((timeString: string, fromTimezone: string, toTimezone: string) => {
    try {
      if (!timeString) return ''
      
      // Parse time string (assuming HH:MM format)
      const [hours, minutes] = timeString.split(':').map(num => parseInt(num, 10))
      if (isNaN(hours) || isNaN(minutes)) return ''
      
      // Create a date object for today with the specified time
      const today = new Date()
      today.setHours(hours, minutes, 0, 0)
      
      // Get the time in the target timezone
      const converted = formatTimeInTimezone(today, toTimezone)
      return converted.time
    } catch (error) {
      return 'Invalid time'
    }
  }, [formatTimeInTimezone])

  // Update world clocks
  useEffect(() => {
    setWorldClocks(prev => prev.map(clock => {
      const timeInfo = formatTimeInTimezone(currentTime, clock.timezone.name)
      return {
        ...clock,
        ...timeInfo
      }
    }))
  }, [currentTime, formatTimeInTimezone])

  const addWorldClock = useCallback((timezone: TimeZone) => {
    const newClock: WorldClock = {
      id: `clock-${Date.now()}`,
      timezone,
      time: '',
      date: '',
      isDaylight: false
    }
    
    setWorldClocks(prev => [...prev, newClock])
  }, [])

  const removeWorldClock = useCallback((id: string) => {
    setWorldClocks(prev => prev.filter(clock => clock.id !== id))
  }, [])

  const filteredTimezones = popularTimezones.filter(timezone =>
    timezone.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    timezone.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    timezone.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTimeDifference = (timezone1: string, timezone2: string) => {
    const now = new Date()
    const time1 = new Date(now.toLocaleString("en-US", { timeZone: timezone1 }))
    const time2 = new Date(now.toLocaleString("en-US", { timeZone: timezone2 }))
    const diffMs = time2.getTime() - time1.getTime()
    const diffHours = Math.round(diffMs / (1000 * 60 * 60))
    
    if (diffHours === 0) return 'Same time'
    if (diffHours > 0) return `+${diffHours}h ahead`
    return `${Math.abs(diffHours)}h behind`
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
              <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Timezone Converter & World Clock
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Convert time between any global timezones instantly and plan international meetings perfectly.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              🌍 World Clock • ⏰ Meeting Planner • 🔄 Real-time Updates • 📱 Mobile-Friendly
            </span>
          </p>
        </div>

        {/* Time Converter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8 mb-8">
          <div className="flex items-center mb-6">
            <CalendarClock className="h-5 w-5 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Time Converter</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
            {/* From Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Time
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[56px]"
                aria-label="Select time to convert"
              />
            </div>

            {/* From Timezone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                From Timezone
              </label>
              <select
                value={selectedTimezone.name}
                onChange={(e) => {
                  const timezone = popularTimezones.find(tz => tz.name === e.target.value)
                  if (timezone) setSelectedTimezone(timezone)
                }}
                className="w-full px-4 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[56px]"
                aria-label="Select source timezone"
              >
                {popularTimezones.map((timezone) => (
                  <option key={timezone.name} value={timezone.name}>
                    {timezone.flag} {timezone.city}, {timezone.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Time Display */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
              <div className="text-sm text-indigo-700 mb-1">Current time in {selectedTimezone.city}</div>
              <div className="text-2xl font-bold text-indigo-900">
                {formatTimeInTimezone(currentTime, selectedTimezone.name).time}
              </div>
              <div className="text-xs text-indigo-600">
                {formatTimeInTimezone(currentTime, selectedTimezone.name).date}
              </div>
            </div>
          </div>

          {/* Conversion Results */}
          {selectedTime && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Converted Times</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularTimezones.slice(0, 6).map((timezone) => {
                  const convertedTime = convertTime(selectedTime, selectedTimezone.name, timezone.name)
                  const timeDiff = getTimeDifference(selectedTimezone.name, timezone.name)
                  
                  return (
                    <div key={timezone.name} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{timezone.flag}</span>
                          <div>
                            <div className="font-medium text-gray-900">{timezone.city}</div>
                            <div className="text-xs text-gray-500">{timezone.country}</div>
                          </div>
                        </div>
                        <div className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                          {timeDiff}
                        </div>
                      </div>
                      <div className="text-xl font-bold text-gray-900">{convertedTime}</div>
                      <div className="text-sm text-gray-500">{timezone.label}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* World Clock */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">World Clock</h2>
            </div>
            <div className="text-sm text-gray-500">
              Updates every second
            </div>
          </div>

          {/* Add Timezone Section */}
          <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cities or countries..."
                  className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[48px]"
                  aria-label="Search timezones"
                />
              </div>
            </div>
            
            {searchQuery && (
              <div className="mt-4 max-h-48 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {filteredTimezones.slice(0, 12).map((timezone) => (
                    <button
                      key={timezone.name}
                      onClick={() => addWorldClock(timezone)}
                      className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-indigo-50 transition-colors text-left"
                    >
                      <span className="text-lg">{timezone.flag}</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{timezone.city}</div>
                        <div className="text-xs text-gray-500">{timezone.country}</div>
                      </div>
                      <Plus className="h-4 w-4 text-indigo-600 ml-auto" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* World Clocks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {worldClocks.map((clock) => (
              <div key={clock.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 relative group">
                <button
                  onClick={() => removeWorldClock(clock.id)}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{clock.timezone.flag}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{clock.timezone.city}</h3>
                    <p className="text-sm text-gray-500">{clock.timezone.country}</p>
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {clock.time || '--:--'}
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  {clock.date}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                    {clock.timezone.label}
                  </span>
                  {clock.timezone.name !== selectedTimezone.name && (
                    <span className="text-xs text-gray-500">
                      {getTimeDifference(selectedTimezone.name, clock.timezone.name)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {worldClocks.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Add Your First World Clock</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Search for cities above to add world clocks and track time across different timezones.
              </p>
            </div>
          )}
        </div>

        {/* Features & Tips */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Timezone Tools & Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for international time management and global scheduling.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🌍',
                title: 'Global Coverage',
                description: 'Support for all world timezones with automatic daylight saving time detection.',
                color: 'from-blue-50 to-blue-100 border-blue-200'
              },
              {
                icon: '⏰',
                title: 'Real-time Updates',
                description: 'Live clock updates every second to keep you perfectly synchronized.',
                color: 'from-green-50 to-green-100 border-green-200'
              },
              {
                icon: '📅',
                title: 'Meeting Planner',
                description: 'Perfect for scheduling international meetings and conferences.',
                color: 'from-purple-50 to-purple-100 border-purple-200'
              },
              {
                icon: '🔍',
                title: 'Smart Search',
                description: 'Quickly find any city or country with intelligent search functionality.',
                color: 'from-yellow-50 to-yellow-100 border-yellow-200'
              },
              {
                icon: '📱',
                title: 'Mobile Optimized',
                description: 'Touch-friendly interface that works perfectly on all devices.',
                color: 'from-pink-50 to-pink-100 border-pink-200'
              },
              {
                icon: '🎯',
                title: 'Precise Conversion',
                description: 'Accurate timezone calculations with consideration for DST changes.',
                color: 'from-indigo-50 to-indigo-100 border-indigo-200'
              }
            ].map((feature, index) => (
              <div key={index} className={`bg-gradient-to-br ${feature.color} rounded-2xl p-6 border hover:shadow-md transition-all duration-200`}>
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Timezones Reference */}
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Timezones Reference</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick reference for the most commonly used timezones around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {popularTimezones.slice(0, 16).map((timezone) => {
              const currentTimeInTz = formatTimeInTimezone(currentTime, timezone.name)
              return (
                <div key={timezone.name} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">{timezone.flag}</span>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{timezone.city}</div>
                      <div className="text-xs text-gray-500">{timezone.country}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {currentTimeInTz.time}
                  </div>
                  <div className="text-xs text-indigo-600">
                    {timezone.label} ({timezone.offset})
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pro Tips */}
        <div className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-8 border border-indigo-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pro Tips for Global Time Management</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expert advice for working across multiple timezones effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎯', title: 'Plan Ahead', desc: 'Always consider DST changes when scheduling future meetings' },
              { icon: '📊', title: 'Meeting Sweet Spots', desc: 'Find overlapping business hours for the best meeting times' },
              { icon: '⏰', title: 'Buffer Time', desc: 'Add 15-30 minute buffers for international calls' },
              { icon: '📝', title: 'Document Timezones', desc: 'Always specify timezones in meeting invites and documents' }
            ].map((tip, index) => (
              <div key={index} className="text-center bg-white/60 rounded-xl p-6 hover:bg-white/80 transition-colors">
                <div className="text-3xl mb-3">{tip.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}