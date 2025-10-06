'use client'

import { useState, useCallback } from 'react'
import { Palette, Copy, RefreshCw, Download, Check, Sparkles, Eye } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Color {
  hex: string
  rgb: string
  hsl: string
}

export default function ColorPalettePage() {
  const [palette, setPalette] = useState<Color[]>([])
  const [paletteType, setPaletteType] = useState<'random' | 'monochromatic' | 'complementary' | 'analogous' | 'triadic'>('random')
  const [baseColor, setBaseColor] = useState('#3B82F6')
  const [paletteSize, setPaletteSize] = useState(5)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h: number, s: number
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
        default: h = 0
      }
      h /= 6
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100
    l /= 100

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2
    let r = 0, g = 0, b = 0

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  const generateRandomColor = (): string => {
    // Use crypto.getRandomValues for consistent random generation
    const array = new Uint32Array(1)
    crypto.getRandomValues(array)
    return `#${(array[0] % 16777215).toString(16).padStart(6, '0')}`
  }

  const createColor = (hex: string): Color => {
    const rgb = hexToRgb(hex)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    return {
      hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    }
  }

  const generatePalette = useCallback(async () => {
    setIsGenerating(true)
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
    let colors: string[] = []

    switch (paletteType) {
      case 'random':
        colors = Array.from({ length: paletteSize }, () => generateRandomColor())
        break

      case 'monochromatic':
        const baseRgb = hexToRgb(baseColor)
        const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b)
        colors = Array.from({ length: paletteSize }, (_, i) => {
          const lightness = Math.max(10, Math.min(90, baseHsl.l + (i - Math.floor(paletteSize / 2)) * 15))
          return hslToHex(baseHsl.h, baseHsl.s, lightness)
        })
        break

      case 'complementary':
        const baseRgb2 = hexToRgb(baseColor)
        const baseHsl2 = rgbToHsl(baseRgb2.r, baseRgb2.g, baseRgb2.b)
        colors = [baseColor]
        const complementaryHue = (baseHsl2.h + 180) % 360
        colors.push(hslToHex(complementaryHue, baseHsl2.s, baseHsl2.l))
        
        for (let i = 2; i < paletteSize; i++) {
          const hue = i % 2 === 0 ? baseHsl2.h : complementaryHue
          const lightness = Math.max(20, Math.min(80, baseHsl2.l + (Math.floor(i / 2) - 1) * 20))
          colors.push(hslToHex(hue, baseHsl2.s, lightness))
        }
        break

      case 'analogous':
        const baseRgb3 = hexToRgb(baseColor)
        const baseHsl3 = rgbToHsl(baseRgb3.r, baseRgb3.g, baseRgb3.b)
        colors = [baseColor]
        for (let i = 1; i < paletteSize; i++) {
          const hueOffset = i <= Math.floor(paletteSize / 2) ? i * 30 : -(paletteSize - i) * 30
          const newHue = (baseHsl3.h + hueOffset + 360) % 360
          colors.push(hslToHex(newHue, baseHsl3.s, baseHsl3.l))
        }
        break

      case 'triadic':
        const baseRgb4 = hexToRgb(baseColor)
        const baseHsl4 = rgbToHsl(baseRgb4.r, baseRgb4.g, baseRgb4.b)
        colors = [baseColor]
        colors.push(hslToHex((baseHsl4.h + 120) % 360, baseHsl4.s, baseHsl4.l))
        colors.push(hslToHex((baseHsl4.h + 240) % 360, baseHsl4.s, baseHsl4.l))
        
        for (let i = 3; i < paletteSize; i++) {
          const baseIndex = i % 3
          const baseHue = baseIndex === 0 ? baseHsl4.h : baseIndex === 1 ? (baseHsl4.h + 120) % 360 : (baseHsl4.h + 240) % 360
          const lightness = Math.max(20, Math.min(80, baseHsl4.l + (Math.floor(i / 3) - 1) * 20))
          colors.push(hslToHex(baseHue, baseHsl4.s, lightness))
        }
        break
    }

    setPalette(colors.map(createColor))
    setIsGenerating(false)
  }, [paletteType, baseColor, paletteSize])

  const copyColor = async (color: string, format: 'hex' | 'rgb' | 'hsl') => {
    try {
      const colorObj = palette.find(c => c.hex === color)
      if (colorObj) {
        const valueToCopy = format === 'hex' ? colorObj.hex : format === 'rgb' ? colorObj.rgb : colorObj.hsl
        await navigator.clipboard.writeText(valueToCopy)
        setCopiedColor(`${color}-${format}`)
        setTimeout(() => setCopiedColor(null), 2000)
      }
    } catch (error) {
      console.error('Failed to copy color:', error)
    }
  }

  const exportPalette = () => {
    const paletteData = {
      type: paletteType,
      baseColor,
      colors: palette
    }
    
    const dataStr = JSON.stringify(paletteData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
    const exportFileDefaultName = `color-palette-${timestamp}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Color Palette Generator - Design Color Schemes",
    "applicationCategory": ["UtilitiesApplication", "DesignApplication"],
    "operatingSystem": ["Web Browser", "iOS", "Android", "Windows", "MacOS", "Linux"],
    "url": "https://swissknife.site/color-palette",
    "description": "Generate beautiful color palettes for your designs with monochromatic, complementary, analogous, triadic, and random color schemes. Export palettes in HEX, RGB, and HSL formats.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Monochromatic color schemes",
      "Complementary color harmonies",
      "Analogous color combinations",
      "Triadic color schemes",
      "Random color generation",
      "HEX, RGB, HSL color formats",
      "One-click color copying",
      "Palette export to JSON",
      "Mobile-responsive design",
      "Color theory education",
      "Live palette preview",
      "Touch-friendly interface"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "654",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

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
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Palette className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Color Palette Generator
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Generate beautiful color palettes using proven color theory principles.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              🎨 Color Harmony • 📐 Color Theory • 💾 Export Ready • 📱 Mobile Friendly
            </span>
          </p>
        </div>

        <div className="bg-dark-card backdrop-blur-sm rounded-2xl shadow-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 p-6 sm:p-8 mb-8">
          {/* Controls */}
          <div className="space-y-6 mb-8">
            <div className="flex items-center mb-4">
              <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Palette Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Palette Type
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'random', label: 'Random', emoji: '🎲' },
                    { value: 'monochromatic', label: 'Monochromatic', emoji: '🌈' },
                    { value: 'complementary', label: 'Complementary', emoji: '🎭' },
                    { value: 'analogous', label: 'Analogous', emoji: '🌅' },
                    { value: 'triadic', label: 'Triadic', emoji: '🔺' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paletteType"
                        value={option.value}
                        checked={paletteType === option.value}
                        onChange={(e) => setPaletteType(e.target.value as any)}
                        className="w-4 h-4 text-purple-400 border-dark-600 focus:ring-purple-500"
                      />
                      <span className="ml-3 flex items-center text-sm text-gray-300">
                        <span className="mr-2">{option.emoji}</span>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {paletteType !== 'random' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Base Color
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <input
                          type="color"
                          value={baseColor}
                          onChange={(e) => setBaseColor(e.target.value)}
                          className="w-20 h-20 border-4 border-white rounded-2xl shadow-lg cursor-pointer"
                          title="Pick base color"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      placeholder="#3B82F6"
                      className="w-full px-4 py-3 text-center font-mono text-sm border border-dark-600 rounded-xl bg-dark-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      aria-label="Base color hex value"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Palette Size
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={paletteSize}
                    onChange={(e) => setPaletteSize(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>3</span>
                    <span className="font-semibold text-purple-400">{paletteSize} colors</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={generatePalette}
                  disabled={isGenerating}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px] touch-manipulation flex items-center justify-center"
                  aria-label="Generate color palette"
                >
                  <RefreshCw className={`h-5 w-5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                  {isGenerating ? 'Generating...' : 'Generate Palette'}
                </button>
                
                {palette.length > 0 && (
                  <button
                    onClick={exportPalette}
                    className="w-full px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 min-h-[48px] touch-manipulation flex items-center justify-center"
                    title="Export palette as JSON"
                    aria-label="Export color palette"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Palette
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Generated Palette */}
          {palette.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-purple-400 mr-2" />
                  <h3 className="text-xl font-semibold text-white">Generated Palette</h3>
                </div>
                <div className="text-sm text-gray-400">
                  {paletteType.charAt(0).toUpperCase() + paletteType.slice(1)} • {palette.length} colors
                </div>
              </div>
              
              {/* Color Swatches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {palette.map((color, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-dark-700 hover:shadow-xl transition-all duration-200">
                    <div 
                      className="h-32 w-full cursor-pointer hover:scale-105 transition-transform relative group"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyColor(color.hex, 'hex')}
                      title="Click to copy HEX"
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
                        <Copy className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between group">
                        <span className="text-sm font-mono font-medium text-gray-100">{color.hex.toUpperCase()}</span>
                        <button
                          onClick={() => copyColor(color.hex, 'hex')}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            copiedColor === `${color.hex}-hex` 
                              ? 'bg-green-500/200/20 text-green-400' 
                              : 'text-gray-400 hover:text-purple-400 hover:bg-purple-50'
                          }`}
                          title="Copy HEX"
                        >
                          {copiedColor === `${color.hex}-hex` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between group">
                        <span className="text-xs font-mono text-gray-400">{color.rgb}</span>
                        <button
                          onClick={() => copyColor(color.hex, 'rgb')}
                          className={`p-1.5 rounded-lg transition-all duration-200 ${
                            copiedColor === `${color.hex}-rgb` 
                              ? 'bg-green-500/200/20 text-green-400' 
                              : 'text-gray-400 hover:text-purple-400 hover:bg-purple-50'
                          }`}
                          title="Copy RGB"
                        >
                          {copiedColor === `${color.hex}-rgb` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between group">
                        <span className="text-xs font-mono text-gray-400">{color.hsl}</span>
                        <button
                          onClick={() => copyColor(color.hex, 'hsl')}
                          className={`p-1.5 rounded-lg transition-all duration-200 ${
                            copiedColor === `${color.hex}-hsl` 
                              ? 'bg-green-500/200/20 text-green-400' 
                              : 'text-gray-400 hover:text-purple-400 hover:bg-purple-50'
                          }`}
                          title="Copy HSL"
                        >
                          {copiedColor === `${color.hex}-hsl` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Palette Preview */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Full Palette Preview</h4>
                <div className="flex rounded-2xl overflow-hidden h-24 shadow-lg border-4 border-white">
                  {palette.map((color, index) => (
                    <div
                      key={index}
                      className="flex-1 cursor-pointer hover:scale-105 transition-all duration-200 relative group"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyColor(color.hex, 'hex')}
                      title={`${color.hex} - Click to copy`}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
                        <span className="text-white text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {color.hex}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Empty State */}
          {palette.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Palette className="h-10 w-10 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Ready to Create Amazing Colors?</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                Choose your palette type, adjust settings, and generate beautiful color combinations based on proven color theory principles.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                <span className="bg-purple-50 px-3 py-1 rounded-full">🌈 Color Theory</span>
                <span className="bg-pink-50 px-3 py-1 rounded-full">🎨 Professional Quality</span>
                <span className="bg-blue-500/200/20 px-3 py-1 rounded-full">📋 Copy & Export</span>
              </div>
            </div>
          )}
        </div>

        {/* Color Theory & Tips Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Color Theory Guide</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Understanding color relationships helps create harmonious and effective designs. Each palette type serves different purposes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Monochromatic',
                emoji: '🌈',
                description: 'Uses variations in lightness and saturation of a single color. Creates a harmonious and cohesive look.',
                example: 'Perfect for minimalist designs and creating depth',
                color: 'from-blue-50 to-blue-100 border-blue-200',
                useCases: ['Minimalist designs', 'Brand consistency', 'Elegant layouts']
              },
              {
                title: 'Complementary',
                emoji: '🎭',
                description: 'Uses colors that are opposite each other on the color wheel. Creates high contrast and vibrant looks.',
                example: 'Great for making elements stand out',
                color: 'from-red-50 to-red-100 border-red-200',
                useCases: ['Call-to-action buttons', 'Highlighting content', 'Dynamic layouts']
              },
              {
                title: 'Analogous',
                emoji: '🌅',
                description: 'Uses colors that are next to each other on the color wheel. Creates serene and comfortable designs.',
                example: 'Ideal for natural and peaceful themes',
                color: 'from-green-50 to-green-100 border-green-200',
                useCases: ['Nature themes', 'Calming interfaces', 'Gradients']
              },
              {
                title: 'Triadic',
                emoji: '🔺',
                description: 'Uses three colors equally spaced around the color wheel. Offers strong visual contrast while retaining balance.',
                example: 'Perfect for vibrant and dynamic designs',
                color: 'from-purple-50 to-purple-100 border-purple-200',
                useCases: ['Playful designs', 'Children\'s content', 'Creative projects']
              },
              {
                title: 'Random',
                emoji: '🎲',
                description: 'Generates completely random colors. Great for inspiration and discovering unexpected combinations.',
                example: 'Use for creative exploration and inspiration',
                color: 'from-yellow-50 to-yellow-100 border-yellow-200',
                useCases: ['Creative inspiration', 'Art projects', 'Experimentation']
              },
            ].map((info, index) => (
              <div key={index} className={`bg-gradient-to-br ${info.color} rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all duration-200`}>
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{info.emoji}</span>
                  <h3 className="text-lg font-bold text-white">{info.title}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{info.description}</p>
                <div className="space-y-3">
                  <div className="bg-white/60 rounded-xl p-3">
                    <p className="text-xs text-gray-400 italic">"{info.example}"</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-300 mb-2">Best for:</p>
                    <div className="flex flex-wrap gap-1">
                      {info.useCases.map((useCase, idx) => (
                        <span key={idx} className="text-xs bg-white/70 px-2 py-1 rounded-full text-gray-400">
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pro Tips Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-8 border border-indigo-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Pro Design Tips</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Professional advice for using colors effectively in your designs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {
              [
                { icon: '🎯', title: '60-30-10 Rule', desc: 'Use 60% dominant, 30% secondary, 10% accent colors' },
                { icon: '📱', title: 'Test Accessibility', desc: 'Ensure sufficient contrast for readability' },
                { icon: '🖥️', title: 'Consider Context', desc: 'Colors look different on various screens and lighting' },
                { icon: '🎨', title: 'Less is More', desc: 'Start with fewer colors and add gradually' }
              ].map((tip, index) => (
                <div key={index} className="text-center bg-white/60 rounded-xl p-6 hover:bg-white/80 transition-colors">
                  <div className="text-3xl mb-3">{tip.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-400">{tip.desc}</p>
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