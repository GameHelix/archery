import type { Metadata } from 'next'
import Link from 'next/link'
import { Wrench, Shield, Zap, Heart, Users, Code } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About SwissKnife - Free Online Tools for Everyone',
  description: 'Learn about SwissKnife, our mission to provide free, privacy-first online tools for developers, designers, and everyone. Discover our story and values.',
  keywords: ['about us', 'swissknife story', 'free tools', 'privacy-first', 'mission', 'online utilities'],
  openGraph: {
    title: 'About SwissKnife - Free Online Tools for Everyone',
    description: 'Learn about SwissKnife, our mission to provide free, privacy-first online tools for developers, designers, and everyone.',
    url: 'https://swissknife.site/about',
    type: 'website',
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays on your device. All processing happens locally in your browser.',
      color: 'bg-blue-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'No server round-trips. All tools work instantly with blazing fast performance.',
      color: 'bg-yellow-500'
    },
    {
      icon: Heart,
      title: 'Completely Free',
      description: 'No subscriptions, no hidden costs, no premium features. Everything is free forever.',
      color: 'bg-red-500'
    },
    {
      icon: Users,
      title: 'User Focused',
      description: 'Built based on real user needs. Simple, intuitive interfaces that just work.',
      color: 'bg-green-500'
    },
    {
      icon: Code,
      title: 'Open & Transparent',
      description: 'Clean, modern code. No tracking, no analytics beyond basic usage statistics.',
      color: 'bg-purple-500'
    },
    {
      icon: Wrench,
      title: 'Quality Tools',
      description: 'Each tool is carefully crafted and tested to provide reliable, accurate results.',
      color: 'bg-indigo-500'
    }
  ]

  const stats = [
    { number: '6+', label: 'Active Tools', description: 'Fully functional tools ready to use' },
    { number: '100%', label: 'Free', description: 'No costs, subscriptions, or limitations' },
    { number: '0', label: 'Data Stored', description: 'Your privacy is completely protected' },
    { number: '24/7', label: 'Available', description: 'Access tools anytime, anywhere' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <Wrench className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              About SwissKnife
            </h1>
            <p className="text-lg sm:text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              We're building the ultimate collection of free, privacy-first online tools. 
              Simple, fast, and secure utilities for developers, designers, and everyone.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                To democratize access to essential online tools while respecting user privacy and 
                maintaining the highest standards of security and performance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-12 border border-gray-100 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why SwissKnife?</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    In a world where online tools often come with privacy concerns, subscription fees, 
                    or complex interfaces, we saw the need for something different.
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    SwissKnife was born from the belief that essential tools should be free, fast, 
                    and respect your privacy. Every tool is designed with these principles at its core.
                  </p>
                  <Link 
                    href="/#tools"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors duration-200"
                  >
                    Explore Our Tools
                    <Wrench className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">{stat.number}</div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">{stat.label}</div>
                      <div className="text-xs text-gray-600">{stat.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything we build is guided by these core principles
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Built with Modern Technology</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We use cutting-edge web technologies to deliver fast, reliable, and secure tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 sm:p-8 border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Frontend Technologies</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Next.js 14 with App Router
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    React 18 with TypeScript
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Tailwind CSS for styling
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Progressive Web App (PWA)
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 sm:p-8 border border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4">Privacy & Security</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Client-side processing only
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    HTTPS encryption everywhere
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    No data collection or storage
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Open source friendly
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Future Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">What's Next?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're constantly working on new tools and improvements. Our roadmap includes advanced 
              document converters, image manipulation tools, and much more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors duration-200"
              >
                Suggest a Tool
                <Users className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="https://github.com/Ismat-Samadov/swissknife"
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-900 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
                <Code className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}