'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
        setErrorMessage(result.error || 'Failed to send message')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (status === 'success') {
    return (
      <div className="text-center py-6 sm:py-8 px-4">
        <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Message Sent Successfully!</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
          Thank you for reaching out. We'll get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-colors duration-200 touch-manipulation focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {status === 'error' && (
        <div className="flex items-start p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-red-700 text-sm leading-relaxed">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={status === 'loading'}
            className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed touch-manipulation"
            placeholder="Your full name"
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={status === 'loading'}
            className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed touch-manipulation"
            placeholder="your.email@example.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
          disabled={status === 'loading'}
          className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed touch-manipulation"
          placeholder="What is this regarding?"
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={5}
          disabled={status === 'loading'}
          className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical min-h-[120px] touch-manipulation"
          placeholder="Please provide details about your inquiry, feedback, or question..."
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-primary-600 text-white font-semibold py-3.5 px-6 text-base rounded-lg hover:bg-primary-700 active:bg-primary-800 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center touch-manipulation"
      >
        {status === 'loading' ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </>
        )}
      </button>

      <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed px-2">
        * Required fields. We'll never share your email with anyone else.
      </p>
    </form>
  )
}