'use client'

import { useState } from 'react'
import { Palette, Copy, RefreshCw, Download } from 'lucide-react'
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
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
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

  const generatePalette = () => {
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
  }

  const copyColor = async (color: string, format: 'hex' | 'rgb' | 'hsl') => {
    try {
      const colorObj = palette.find(c => c.hex === color)
      if (colorObj) {
        const valueToCopy = format === 'hex' ? colorObj.hex : format === 'rgb' ? colorObj.rgb : colorObj.hsl
        await navigator.clipboard.writeText(valueToCopy)
        alert(`${format.toUpperCase()} value copied: ${valueToCopy}`)
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
    
    const exportFileDefaultName = `color-palette-${Date.now()}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Palette className="h-12 w-12 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Color Palette Generator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate beautiful color palettes for your designs. Choose from various harmony types and export your favorites.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Palette Type
              </label>
              <select
                value={paletteType}
                onChange={(e) => setPaletteType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="random">Random</option>
                <option value="monochromatic">Monochromatic</option>
                <option value="complementary">Complementary</option>
                <option value="analogous">Analogous</option>
                <option value="triadic">Triadic</option>
              </select>
            </div>

            {paletteType !== 'random' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Palette Size
              </label>
              <input
                type="range"
                min="3"
                max="10"
                value={paletteSize}
                onChange={(e) => setPaletteSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center text-sm text-gray-600 mt-1">{paletteSize} colors</div>
            </div>

            <div className="flex items-end space-x-2">
              <button
                onClick={generatePalette}
                className="btn-primary flex-1 inline-flex items-center justify-center px-4 py-2"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate
              </button>
              {palette.length > 0 && (
                <button
                  onClick={exportPalette}
                  className="btn-secondary inline-flex items-center justify-center px-4 py-2"
                  title="Export palette"
                >
                  <Download className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Generated Palette */}
          {palette.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Generated Palette</h3>
              
              {/* Color Swatches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {palette.map((color, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                    <div 
                      className="h-24 w-full cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyColor(color.hex, 'hex')}
                      title="Click to copy HEX"
                    />
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-gray-700">{color.hex}</span>
                        <button
                          onClick={() => copyColor(color.hex, 'hex')}
                          className="text-gray-500 hover:text-primary-600 transition-colors"
                          title="Copy HEX"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-gray-600">{color.rgb}</span>
                        <button
                          onClick={() => copyColor(color.hex, 'rgb')}
                          className="text-gray-500 hover:text-primary-600 transition-colors"
                          title="Copy RGB"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-gray-600">{color.hsl}</span>
                        <button
                          onClick={() => copyColor(color.hex, 'hsl')}
                          className="text-gray-500 hover:text-primary-600 transition-colors"
                          title="Copy HSL"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Palette Preview */}
              <div className="flex rounded-lg overflow-hidden h-16 shadow-sm">
                {palette.map((color, index) => (
                  <div
                    key={index}
                    className="flex-1 cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyColor(color.hex, 'hex')}
                    title={`${color.hex} - Click to copy`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Color Theory Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Monochromatic',
              description: 'Uses variations in lightness and saturation of a single color. Creates a harmonious and cohesive look.',
              example: 'Perfect for minimalist designs and creating depth'
            },
            {
              title: 'Complementary',
              description: 'Uses colors that are opposite each other on the color wheel. Creates high contrast and vibrant looks.',
              example: 'Great for making elements stand out'
            },
            {
              title: 'Analogous',
              description: 'Uses colors that are next to each other on the color wheel. Creates serene and comfortable designs.',
              example: 'Ideal for natural and peaceful themes'
            },
            {
              title: 'Triadic',
              description: 'Uses three colors equally spaced around the color wheel. Offers strong visual contrast while retaining balance.',
              example: 'Perfect for vibrant and dynamic designs'
            },
            {
              title: 'Random',
              description: 'Generates completely random colors. Great for inspiration and discovering unexpected combinations.',
              example: 'Use for creative exploration and inspiration'
            },
          ].map((info, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{info.description}</p>
              <p className="text-gray-500 text-xs italic">{info.example}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}