import Link from 'next/link'
import { 
  Key, 
  QrCode, 
  FileText, 
  Table, 
  Type, 
  Calculator, 
  Activity, 
  CheckSquare, 
  Gauge, 
  Palette, 
  Image, 
  Clock, 
  Play 
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const tools = [
  {
    name: 'Password Generator',
    description: 'Generate secure passwords with customizable options',
    icon: Key,
    href: '/password-generator',
    color: 'bg-red-500'
  },
  {
    name: 'QR Code Generator',
    description: 'Create QR codes for text, URLs, and more',
    icon: QrCode,
    href: '/qr-generator',
    color: 'bg-blue-500'
  },
  {
    name: 'Document Converter',
    description: 'Convert between different document formats',
    icon: FileText,
    href: '/document-converter',
    color: 'bg-green-500'
  },
  {
    name: 'Spreadsheet Converter',
    description: 'Convert CSV, Excel, and other spreadsheet formats',
    icon: Table,
    href: '/spreadsheet-converter',
    color: 'bg-purple-500'
  },
  {
    name: 'Text Tools Suite',
    description: 'Case conversion, word count, and text manipulation',
    icon: Type,
    href: '/text-tools',
    color: 'bg-yellow-500'
  },
  {
    name: 'Tip Calculator',
    description: 'Calculate tips and split bills easily',
    icon: Calculator,
    href: '/tip-calculator',
    color: 'bg-indigo-500'
  },
  {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index',
    icon: Activity,
    href: '/bmi-calculator',
    color: 'bg-orange-500'
  },
  {
    name: 'Simple To-Do List',
    description: 'Organize your tasks efficiently',
    icon: CheckSquare,
    href: '/todo-list',
    color: 'bg-teal-500'
  },
  {
    name: 'Unit Converter',
    description: 'Convert between different units of measurement',
    icon: Gauge,
    href: '/unit-converter',
    color: 'bg-cyan-500'
  },
  {
    name: 'Color Palette Generator',
    description: 'Generate beautiful color palettes',
    icon: Palette,
    href: '/color-palette',
    color: 'bg-rose-500'
  },
  {
    name: 'Image Format Converter',
    description: 'Convert images between different formats',
    icon: Image,
    href: '/image-converter',
    color: 'bg-emerald-500'
  },
  {
    name: 'Time Zone Converter',
    description: 'Convert time between different time zones',
    icon: Clock,
    href: '/timezone-converter',
    color: 'bg-lime-500'
  },
  {
    name: 'Media Converter',
    description: 'Convert audio and video files',
    icon: Play,
    href: '/media-converter',
    color: 'bg-slate-500'
  }
]

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://swissknife.site/#organization",
        "name": "SwissKnife",
        "url": "https://swissknife.site",
        "logo": {
          "@type": "ImageObject",
          "url": "https://swissknife.site/icon-512.png",
          "width": 512,
          "height": 512
        },
        "description": "Your ultimate collection of essential online tools. Fast, secure, and completely free.",
        "foundingDate": "2024",
        "sameAs": [
          "https://swissknife.site"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://swissknife.site/#website",
        "url": "https://swissknife.site",
        "name": "SwissKnife - Essential Online Tools",
        "description": "A comprehensive collection of essential online tools including password generator, QR code generator, text tools, unit converter, BMI calculator, and color palette generator.",
        "publisher": {
          "@id": "https://swissknife.site/#organization"
        },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://swissknife.site/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://swissknife.site/#webpage",
        "url": "https://swissknife.site",
        "name": "SwissKnife - Essential Online Tools",
        "isPartOf": {
          "@id": "https://swissknife.site/#website"
        },
        "about": {
          "@id": "https://swissknife.site/#organization"
        },
        "description": "Free online tools for password generation, QR codes, text manipulation, unit conversion, BMI calculation, and color palettes. No registration required.",
        "breadcrumb": {
          "@id": "https://swissknife.site/#breadcrumb"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://swissknife.site/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://swissknife.site"
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "SwissKnife Tools",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Web Browser",
        "url": "https://swissknife.site",
        "description": "Collection of essential online tools for developers, designers, and everyday users.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Password Generator",
          "QR Code Generator", 
          "Text Tools Suite",
          "Unit Converter",
          "BMI Calculator",
          "Color Palette Generator"
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
            <div className="text-center">
              {/* Logo/Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center animate-fade-in">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in leading-tight">
                <span className="bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
                  SwissKnife
                </span>
              </h1>
              
              <h2 className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-primary-100 max-w-4xl mx-auto animate-slide-up font-medium leading-relaxed px-4">
                Your ultimate collection of essential online tools. Fast, secure, and completely free.
              </h2>
              
              <p className="text-sm sm:text-base text-primary-200 mb-8 sm:mb-10 max-w-2xl mx-auto animate-slide-up px-4">
                No registration required. All processing happens locally in your browser for maximum privacy.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 animate-slide-up">
                <Link 
                  href="#tools" 
                  className="w-full sm:w-auto bg-white text-primary-600 hover:bg-primary-50 hover:scale-105 transition-all duration-200 inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                  </svg>
                  Explore Tools
                </Link>
                <Link 
                  href="/password-generator" 
                  className="w-full sm:w-auto bg-primary-500 hover:bg-primary-400 text-white border-2 border-primary-400 hover:border-primary-300 hover:scale-105 transition-all duration-200 inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Start Now
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto mt-12 sm:mt-16 px-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">6+</div>
                  <div className="text-xs sm:text-sm text-primary-200">Active Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">100%</div>
                  <div className="text-xs sm:text-sm text-primary-200">Free</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">0</div>
                  <div className="text-xs sm:text-sm text-primary-200">Registration</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-4 sm:h-6 lg:h-8 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Why Choose SwissKnife?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Built for developers, designers, and everyone who needs reliable online tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              <div className="group text-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Completely Free</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">All tools are free to use with no hidden costs, subscriptions, or premium features.</p>
              </div>
              
              <div className="group text-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Privacy First</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Your data is processed locally in your browser. We don't store or share your information.</p>
              </div>
              
              <div className="group text-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Mobile Friendly</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">All tools work perfectly on desktop, tablet, and mobile devices with responsive design.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Essential Tools
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A carefully curated collection of tools for your daily tasks. Each tool is optimized for performance and ease of use.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {tools.map((tool, index) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-2 p-6 sm:p-8 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center mb-4 sm:mb-6">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 ${tool.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <tool.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 text-center group-hover:text-primary-600 transition-colors duration-300">
                    {tool.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
                    {tool.description}
                  </p>
                  
                  {/* Hover indicator */}
                  <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* Call to action */}
            <div className="text-center mt-12 sm:mt-16">
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                More tools coming soon! Have a suggestion?
              </p>
              <Link 
                href="mailto:contact@swissknife.site"
                className="inline-flex items-center px-6 py-3 text-sm sm:text-base font-semibold text-primary-600 bg-white rounded-xl shadow-lg hover:shadow-xl border border-primary-200 hover:border-primary-300 hover:scale-105 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Suggest a Tool
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}