import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - Your Data Protection Rights',
  description: 'SwissKnife privacy policy. Learn how we protect your data with local processing, no data collection, and privacy-first design principles.',
  keywords: ['privacy policy', 'data protection', 'privacy rights', 'GDPR', 'data security', 'online privacy'],
  openGraph: {
    title: 'Privacy Policy - Your Data Protection Rights | SwissKnife',
    description: 'SwissKnife privacy policy. Learn how we protect your data with local processing, no data collection, and privacy-first design principles.',
    url: 'https://swissknife.site/privacy',
    type: 'website',
  },
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-dark-800 rounded-xl shadow-lg p-8 sm:p-12 border border-dark-600">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-300">Your privacy is our priority</p>
            <p className="text-sm text-gray-400 mt-2">Last updated: December 2024</p>
          </div>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Our Privacy Commitment</h2>
              <p className="text-gray-200 leading-relaxed mb-4">
                SwissKnife is built with privacy at its core. We believe that your personal data should remain private,
                and we've designed our tools to respect and protect your privacy at every step.
              </p>
              <div className="bg-green-900 border border-green-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-100 mb-2">🔒 Privacy-First Design</h3>
                <p className="text-green-200">
                  All our tools process your data locally in your browser. We don't collect, store, or transmit
                  your personal information to our servers.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">What Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-100 mb-3">Information We DON'T Collect:</h3>
              <ul className="list-disc pl-6 text-gray-200 mb-4 space-y-1">
                <li>Passwords you generate using our password generator</li>
                <li>Text content you process with our text tools</li>
                <li>QR code content or generated codes</li>
                <li>Unit conversion calculations or inputs</li>
                <li>BMI calculations or health data</li>
                <li>Color palettes you create</li>
                <li>Any personal data processed by our tools</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-100 mb-3">Information We May Collect:</h3>
              <ul className="list-disc pl-6 text-gray-200 mb-4 space-y-1">
                <li>Basic website analytics (page views, browser type, general location)</li>
                <li>Error logs for technical improvements (no personal data)</li>
                <li>Contact form submissions (only when you choose to contact us)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">How Our Tools Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-100 mb-2">Local Processing</h3>
                  <p className="text-blue-200 text-sm">
                    All calculations and data processing happen in your browser using JavaScript.
                    Nothing is sent to our servers.
                  </p>
                </div>
                <div className="bg-purple-900 border border-purple-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-100 mb-2">No Data Storage</h3>
                  <p className="text-purple-200 text-sm">
                    We don't store any data you input into our tools. When you close your browser,
                    your data is gone.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">Google Analytics</h3>
              <p className="text-gray-200 mb-4">
                We use Google Analytics to understand how visitors use our website. This includes:
              </p>
              <ul className="list-disc pl-6 text-gray-200 mb-4 space-y-1">
                <li>Page views and session duration</li>
                <li>Browser type and device information</li>
                <li>General geographic location (country/city level)</li>
                <li>Referral sources (how you found our website)</li>
              </ul>
              <p className="text-gray-200 mb-4">
                You can opt out of Google Analytics tracking by installing the
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer"
                   className="text-primary-400 hover:text-primary-300 underline">
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </p>

              <h3 className="text-xl font-semibold text-gray-100 mb-3">Google AdSense</h3>
              <p className="text-gray-200 mb-4">
                We use Google AdSense for website monetization. AdSense may use cookies and similar
                technologies to serve relevant advertisements based on your browsing behavior.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Cookies and Local Storage</h2>
              <p className="text-gray-200 mb-4">
                We use minimal cookies and local storage for:
              </p>
              <ul className="list-disc pl-6 text-gray-200 mb-4 space-y-1">
                <li>Remembering your tool preferences (optional)</li>
                <li>Analytics and performance tracking</li>
                <li>Advertising personalization (Google AdSense)</li>
              </ul>
              <p className="text-gray-200">
                You can disable cookies in your browser settings, though this may affect website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-gray-200 mb-4">
                Since we don't collect or store your personal data, there's minimal risk of data breaches
                affecting your information. However, we maintain security best practices:
              </p>
              <ul className="list-disc pl-6 text-gray-200 mb-4 space-y-1">
                <li>HTTPS encryption for all website traffic</li>
                <li>Regular security updates and monitoring</li>
                <li>Secure hosting infrastructure</li>
                <li>Minimal data collection policies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-gray-200 mb-4">
                Under data protection laws (GDPR, CCPA, etc.), you have rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 text-gray-200 mb-4 space-y-1">
                <li><strong>Right to Access:</strong> Request information about data we collect</li>
                <li><strong>Right to Rectification:</strong> Correct any inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Right to Object:</strong> Opt out of data processing activities</li>
              </ul>
              <p className="text-gray-200">
                Since we don't store personal data from tool usage, most of these rights are automatically
                satisfied by our privacy-first design.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <p className="text-gray-200 mb-4">
                Our website is suitable for all ages. We don't knowingly collect personal information from
                children under 13. If you're a parent and believe your child has provided us with personal
                information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-200 mb-4">
                We may update this privacy policy from time to time. We'll notify users of any material
                changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-200 mb-4">
                If you have questions about this privacy policy or our privacy practices, please contact us:
              </p>
              <div className="bg-dark-700 rounded-lg p-4 border border-dark-500">
                <ul className="text-gray-200 space-y-2">
                  <li><strong>Email:</strong> contact@swissknife.site</li>
                  <li><strong>Contact Form:</strong> <a href="/contact" className="text-primary-400 hover:text-primary-300 underline">swissknife.site/contact</a></li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}