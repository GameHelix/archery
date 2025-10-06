import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with SwissKnife',
  description: 'Have questions, suggestions, or feedback about SwissKnife? Contact us using our secure contact form or email us directly.',
  keywords: ['contact', 'support', 'feedback', 'questions', 'help', 'get in touch'],
  openGraph: {
    title: 'Contact Us - Get in Touch with SwissKnife',
    description: 'Have questions, suggestions, or feedback about SwissKnife? Contact us using our secure contact form or email us directly.',
    url: 'https://swissknife.site/contact',
    type: 'website',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions, suggestions, or feedback? We'd love to hear from you.
            Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-dark-800 rounded-xl shadow-lg p-6 sm:p-8 border border-dark-600">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-dark-800 rounded-xl shadow-lg p-6 sm:p-8 border border-dark-600">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">Email</h3>
                  <p className="text-gray-300">contact@swissknife.site</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">Response Time</h3>
                  <p className="text-gray-300">We typically respond within 24-48 hours</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-900 border border-blue-700 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-100 mb-2">What can you contact us about?</h3>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Feature requests or tool suggestions</li>
                  <li>• Bug reports or technical issues</li>
                  <li>• General feedback or questions</li>
                  <li>• Business inquiries or partnerships</li>
                  <li>• Privacy or security concerns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-dark-800 rounded-xl shadow-lg p-6 sm:p-8 border border-dark-600">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Are your tools really free?</h3>
              <p className="text-gray-300 text-sm">
                Yes! All our tools are completely free to use with no hidden costs, subscriptions, or premium features.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Do you store my data?</h3>
              <p className="text-gray-300 text-sm">
                No. All processing happens locally in your browser. We don't collect or store any data you input into our tools.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Can I suggest new tools?</h3>
              <p className="text-gray-300 text-sm">
                Absolutely! We love hearing ideas for new tools. Use the contact form to suggest features you'd like to see.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Is SwissKnife secure?</h3>
              <p className="text-gray-300 text-sm">
                Yes! All processing happens in your browser locally. We use HTTPS encryption and follow security best practices.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}