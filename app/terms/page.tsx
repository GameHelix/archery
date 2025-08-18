import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service - Usage Guidelines & Policies',
  description: 'SwissKnife Terms of Service. Learn about usage guidelines, acceptable use policies, and legal terms for using our free online tools.',
  keywords: ['terms of service', 'usage guidelines', 'acceptable use', 'legal terms', 'user agreement'],
  openGraph: {
    title: 'Terms of Service - Usage Guidelines & Policies | SwissKnife',
    description: 'SwissKnife Terms of Service. Learn about usage guidelines, acceptable use policies, and legal terms for using our free online tools.',
    url: 'https://swissknife.site/terms',
    type: 'website',
  },
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">Usage guidelines and legal terms</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: December 2024</p>
          </div>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using SwissKnife ("we," "our," or "us"), you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">
                  🎯 Simple Terms: Use our tools fairly, don't abuse our service, and respect others. 
                  That's the core of our agreement.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily download and use SwissKnife for personal and commercial 
                purposes subject to the following conditions:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">You MAY:</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>Use all tools for personal, educational, or commercial purposes</li>
                <li>Generate unlimited content with our tools</li>
                <li>Share results created with our tools</li>
                <li>Access the website from multiple devices</li>
                <li>Use tools without creating an account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">You MAY NOT:</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>Attempt to reverse engineer or copy our website functionality</li>
                <li>Use automated scripts or bots to abuse our services</li>
                <li>Overload our servers with excessive requests</li>
                <li>Use the service for illegal activities</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with other users' access to the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">What We Provide</h3>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Free online tools and utilities</li>
                    <li>• Local processing for privacy</li>
                    <li>• No registration required</li>
                    <li>• Mobile-responsive design</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Service Limitations</h3>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Tools provided "as-is"</li>
                    <li>• No guaranteed uptime</li>
                    <li>• Features may change</li>
                    <li>• No customer support SLA</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
              <p className="text-gray-700 mb-4">As a user of SwissKnife, you are responsible for:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>Ensuring your use complies with applicable laws and regulations</li>
                <li>Not using our tools for harmful, illegal, or malicious purposes</li>
                <li>Respecting the intellectual property rights of others</li>
                <li>Not attempting to circumvent security measures</li>
                <li>Being respectful in any communications with us</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data</h2>
              <p className="text-gray-700 mb-4">
                Our approach to privacy is simple and transparent:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>We don't store the data you process with our tools</li>
                <li>All tool processing happens locally in your browser</li>
                <li>We may collect basic analytics for service improvement</li>
                <li>See our <a href="/privacy" className="text-primary-600 hover:text-primary-700 underline">Privacy Policy</a> for complete details</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Availability</h3>
              <p className="text-gray-700 mb-4">
                We strive to keep SwissKnife available 24/7, but we cannot guarantee uninterrupted service. 
                We may experience downtime due to maintenance, updates, or technical issues.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Accuracy of Results</h3>
              <p className="text-gray-700 mb-4">
                While we work hard to ensure our tools provide accurate results, we cannot guarantee the 
                accuracy, completeness, or reliability of any content generated by our tools. Users should 
                verify important calculations independently.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Content</h3>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites or services. We are not responsible 
                for the content, privacy policies, or practices of these external sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 font-medium text-sm">
                  ⚠️ Important Legal Notice: Please read this section carefully.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                In no event shall SwissKnife, nor its directors, employees, partners, agents, suppliers, 
                or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                damages, including without limitation, loss of profits, data, use, goodwill, or other 
                intangible losses, resulting from your use of the service.
              </p>
              <p className="text-gray-700 mb-4">
                Some jurisdictions do not allow the exclusion of certain warranties or the limitation or 
                exclusion of liability for certain damages. Accordingly, some of the above limitations may 
                not apply to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications to Service and Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify or discontinue, temporarily or permanently, the service 
                (or any part thereof) with or without notice. We may also update these Terms of Service 
                from time to time.
              </p>
              <p className="text-gray-700 mb-4">
                Material changes to these terms will be announced on our website. Your continued use of 
                the service after such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The service and its original content, features, and functionality are and will remain the 
                exclusive property of SwissKnife and its licensors. The service is protected by copyright, 
                trademark, and other laws.
              </p>
              <p className="text-gray-700 mb-4">
                Content you create using our tools belongs to you. We claim no ownership or rights to any 
                content generated through the use of our tools.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend access to our service immediately, without prior notice or 
                liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="text-gray-700 mb-4">
                Upon termination, your right to use the service will cease immediately, though any content 
                you've created using our tools remains yours.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
                SwissKnife operates, without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-700 mb-4">
                Our failure to enforce any right or provision of these Terms will not be considered a 
                waiver of those rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-100 rounded-lg p-4">
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Email:</strong> contact@swissknife.site</li>
                  <li><strong>Contact Form:</strong> <a href="/contact" className="text-primary-600 hover:text-primary-700 underline">swissknife.site/contact</a></li>
                </ul>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Questions?</strong> We're here to help! These terms might seem formal, but we're 
                  committed to being fair and transparent. If anything is unclear, don't hesitate to reach out.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}