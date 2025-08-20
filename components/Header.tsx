'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Wrench } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const tools = [
    { name: 'Password Generator', href: '/password-generator' },
    { name: 'Hash Generator (Bcrypt)', href: '/hash-generator' },
    { name: 'MD5/SHA Hash Generator', href: '/hash-tools' },
    { name: 'Base64 Encoder/Decoder', href: '/base64-encoder' },
    { name: 'UUID/GUID Generator', href: '/uuid-generator' },
    { name: 'URL Encoder/Decoder', href: '/url-encoder' },
    { name: 'QR Code Generator', href: '/qr-generator' },
    { name: 'JSON Formatter/Validator', href: '/json-formatter' },
    { name: 'Lorem Ipsum Generator', href: '/lorem-generator' },
    { name: 'PDF Converter', href: '/pdf-converter' },
    { name: 'CSV/Excel Converter', href: '/csv-excel-converter' },
    { name: 'CSV to SQL Converter', href: '/csv-to-sql' },
    { name: 'Text Tools', href: '/text-tools' },
    { name: 'Tip Calculator', href: '/tip-calculator' },
    { name: 'BMI Calculator', href: '/bmi-calculator' },
    { name: 'Todo List', href: '/todo-list' },
    { name: 'Unit Converter', href: '/unit-converter' },
    { name: 'Color Palette', href: '/color-palette' },
    { name: 'Image Converter', href: '/image-converter' },
    { name: 'Time Zone Converter', href: '/timezone-converter' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity touch-manipulation">
            <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">SwissKnife</span>
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
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3 bg-gray-50/80 backdrop-blur-sm">
            <div className="space-y-1 max-h-96 overflow-y-auto">
              <Link
                href="/"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-white active:bg-gray-100 rounded-lg mx-2 transition-all duration-200 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 Home
              </Link>
              
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 mx-2">
                🛠️ Tools ({tools.length})
              </div>
              
              <div className="grid grid-cols-1 gap-1 px-2">
                {tools.map((tool, index) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="block px-4 py-3 text-sm text-gray-700 hover:text-primary-600 hover:bg-white active:bg-gray-100 rounded-lg transition-all duration-200 touch-manipulation"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-2 mx-2 mt-4">
                <Link
                  href="/about"
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-white active:bg-gray-100 rounded-lg transition-all duration-200 touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📖 About
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-white active:bg-gray-100 rounded-lg transition-all duration-200 touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  💬 Contact
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}