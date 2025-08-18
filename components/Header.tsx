'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Wrench } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const tools = [
    { name: 'Password Generator', href: '/password-generator' },
    { name: 'QR Code Generator', href: '/qr-generator' },
    { name: 'Document Converter', href: '/document-converter' },
    { name: 'Spreadsheet Converter', href: '/spreadsheet-converter' },
    { name: 'Text Tools', href: '/text-tools' },
    { name: 'Tip Calculator', href: '/tip-calculator' },
    { name: 'BMI Calculator', href: '/bmi-calculator' },
    { name: 'Todo List', href: '/todo-list' },
    { name: 'Unit Converter', href: '/unit-converter' },
    { name: 'Color Palette', href: '/color-palette' },
    { name: 'Image Converter', href: '/image-converter' },
    { name: 'Time Zone Converter', href: '/timezone-converter' },
    { name: 'Media Converter', href: '/media-converter' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Wrench className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">SwissKnife</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary-600 transition-colors">
                Tools
              </button>
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="grid grid-cols-1 gap-1 p-2 max-h-96 overflow-y-auto">
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded transition-colors"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wide">
                Tools
              </div>
              <div className="grid grid-cols-1 gap-1 pl-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="block px-3 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}