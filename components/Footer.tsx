import { Wrench } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-dark-secondary to-dark-950 text-white border-t border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4 group">
              <Wrench className="h-8 w-8 text-primary-500 group-hover:text-primary-400 transition-colors" />
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">SwissKnife</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md leading-relaxed">
              Your ultimate collection of essential online tools. Fast, secure, and completely free.
              No registration required.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Popular Tools</h3>
            <ul className="space-y-2">
              <li>
                <a href="/password-generator" className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Password Generator</span>
                </a>
              </li>
              <li>
                <a href="/qr-generator" className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">QR Code Generator</span>
                </a>
              </li>
              <li>
                <a href="/pdf-converter" className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">PDF Converter</span>
                </a>
              </li>
              <li>
                <a href="/text-tools" className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Text Tools</span>
                </a>
              </li>
              <li>
                <a href="/unit-converter" className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Unit Converter</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">About</span>
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Terms of Service</span>
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 SwissKnife. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0 flex items-center gap-1">
              Made with <span className="text-red-500 animate-pulse">❤️</span> for developers and creators
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}