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
  PenTool, 
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
    name: 'Simple Drawing Tool',
    description: 'Draw and sketch with simple tools',
    icon: PenTool,
    href: '/drawing-tool',
    color: 'bg-violet-500'
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
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                SwissKnife
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto animate-slide-up">
                Your ultimate collection of essential online tools. Fast, secure, and completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="#tools" 
                  className="btn-primary bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center justify-center px-8 py-3 text-lg font-medium"
                >
                  Explore Tools
                </Link>
                <Link 
                  href="/password-generator" 
                  className="btn-secondary bg-primary-700 hover:bg-primary-600 text-white border-2 border-primary-400 inline-flex items-center justify-center px-8 py-3 text-lg font-medium"
                >
                  Start Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SwissKnife?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Built for developers, designers, and everyone who needs reliable online tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Completely Free</h3>
                <p className="text-gray-600">All tools are free to use with no hidden costs or subscriptions required.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy First</h3>
                <p className="text-gray-600">Your data is processed locally. We don't store or share your information.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
                <p className="text-gray-600">All tools work perfectly on desktop, tablet, and mobile devices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Essential Tools</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A carefully curated collection of tools for your daily tasks
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="tool-card group"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}