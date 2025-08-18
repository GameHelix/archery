import { Wrench, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">SwissKnife</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your ultimate collection of essential online tools. Fast, secure, and completely free. 
              No registration required.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:contact@swissknife.site" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              <li>
                <a href="/password-generator" className="text-gray-400 hover:text-white transition-colors">
                  Password Generator
                </a>
              </li>
              <li>
                <a href="/qr-generator" className="text-gray-400 hover:text-white transition-colors">
                  QR Code Generator
                </a>
              </li>
              <li>
                <a href="/document-converter" className="text-gray-400 hover:text-white transition-colors">
                  Document Converter
                </a>
              </li>
              <li>
                <a href="/text-tools" className="text-gray-400 hover:text-white transition-colors">
                  Text Tools
                </a>
              </li>
              <li>
                <a href="/unit-converter" className="text-gray-400 hover:text-white transition-colors">
                  Unit Converter
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 SwissKnife. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Made with ❤️ for developers and creators
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}