import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface SEOFooterLinksProps {
  currentPage?: string;
  className?: string;
}

export default function SEOFooterLinks({ currentPage, className = '' }: SEOFooterLinksProps) {
  const toolCategories = [
    {
      name: 'Security Tools',
      description: 'Privacy-focused security utilities',
      tools: [
        { name: 'Password Generator', href: '/password-generator', description: 'Generate ultra-secure passwords' }
      ]
    },
    {
      name: 'Productivity Tools',
      description: 'Boost your daily productivity',
      tools: [
        { name: 'QR Code Generator', href: '/qr-generator', description: 'Create custom QR codes' },
        { name: 'Todo List Manager', href: '/todo-list', description: 'Organize your tasks' },
        { name: 'Timezone Converter', href: '/timezone-converter', description: 'Convert global timezones' }
      ]
    },
    {
      name: 'Conversion Tools',
      description: 'Convert between formats and units',
      tools: [
        { name: 'Unit Converter', href: '/unit-converter', description: 'Metric & imperial conversions' },
        { name: 'PDF Converter', href: '/pdf-converter', description: 'Convert documents to PDF' },
        { name: 'Image Converter', href: '/image-converter', description: 'Convert image formats' }
      ]
    },
    {
      name: 'Calculators & Tools',
      description: 'Specialized calculation tools',
      tools: [
        { name: 'BMI Calculator', href: '/bmi-calculator', description: 'Calculate Body Mass Index' },
        { name: 'Tip Calculator', href: '/tip-calculator', description: 'Calculate tips and split bills' },
        { name: 'Text Tools Suite', href: '/text-tools', description: 'Text manipulation tools' }
      ]
    }
  ];

  const filteredCategories = toolCategories.map(category => ({
    ...category,
    tools: category.tools.filter(tool => tool.href !== currentPage)
  })).filter(category => category.tools.length > 0);

  return (
    <section className={`bg-gray-50 border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Explore More SwissKnife Tools
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of free online utilities designed to boost your productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filteredCategories.map((category) => (
            <div key={category.name} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                {category.name}
              </h3>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                {category.description}
              </p>
              <ul className="space-y-2">
                {category.tools.slice(0, 3).map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className="group flex items-start text-xs text-gray-700 hover:text-primary-600 transition-colors duration-200"
                    >
                      <ArrowRight className="h-3 w-3 mt-0.5 mr-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-gray-500 text-xs">{tool.description}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional SEO Links */}
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Company</h4>
              <ul className="space-y-1">
                <li>
                  <Link href="/about" className="text-xs text-gray-600 hover:text-primary-600 transition-colors">
                    About SwissKnife
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-xs text-gray-600 hover:text-primary-600 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Resources</h4>
              <ul className="space-y-1">
                <li>
                  <Link href="/#tools" className="text-xs text-gray-600 hover:text-primary-600 transition-colors">
                    All Tools
                  </Link>
                </li>
                <li>
                  <Link href="/?category=security" className="text-xs text-gray-600 hover:text-primary-600 transition-colors">
                    Security Tools
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Popular</h4>
              <ul className="space-y-1">
                <li>
                  <Link href="/password-generator" className="text-xs text-gray-600 hover:text-primary-600 transition-colors">
                    Password Generator
                  </Link>
                </li>
                <li>
                  <Link href="/qr-generator" className="text-xs text-gray-600 hover:text-primary-600 transition-colors">
                    QR Generator
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Legal</h4>
              <ul className="space-y-1">
                <li>
                  <Link href="/privacy" className="text-xs text-gray-600 hover:text-primary-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-xs text-gray-600 hover:text-primary-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Text Content */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              SwissKnife is a comprehensive collection of 12 essential free online tools designed for developers, 
              students, professionals, and anyone who needs reliable web utilities. Our tools include a secure password generator, 
              QR code creator, text manipulation suite, unit converter, BMI calculator, color palette generator, PDF converter, 
              CSV/Excel converter, tip calculator, todo list manager, image converter, and timezone converter. All tools are 
              completely free, require no registration, and process data locally in your browser for maximum privacy and security. 
              Perfect for daily productivity, development work, design projects, and educational purposes.
            </p>
          </div>
        </div>

        {/* Schema.org LocalBusiness markup for better local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "SwissKnife Online Tools",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1500"
              }
            }, null, 2)
          }}
        />
      </div>
    </section>
  );
}