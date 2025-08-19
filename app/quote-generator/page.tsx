'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Share2, Copy, Heart, BookOpen, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Quote {
  quote: string;
  author: string;
  category: string;
}

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchRandomQuote();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/quotes?action=categories');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]); // Set empty array on error
    }
  };

  const fetchRandomQuote = async (category?: string) => {
    // Debounce requests - prevent multiple rapid requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    const minInterval = 1000; // Minimum 1 second between requests
    
    if (timeSinceLastRequest < minInterval && !initialLoad) {
      console.log('Request throttled - too frequent');
      return;
    }
    
    setLastRequestTime(now);
    setCooldownActive(true);
    
    if (!initialLoad) {
      setLoading(true);
    }
    
    // Clear cooldown after minimum interval
    setTimeout(() => {
      setCooldownActive(false);
    }, minInterval);
    
    try {
      const url = category 
        ? `/api/quotes?category=${encodeURIComponent(category)}`
        : '/api/quotes';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.quote) {
        setQuote(data.quote);
        setLiked(false);
      } else {
        console.error('No quote found in response:', data);
        setQuote({
          quote: "No quotes available for this category.",
          author: "System",
          category: "info"
        });
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      if (error instanceof Error && error.name === 'AbortError') {
        setQuote({
          quote: "Request timed out. Please try again.",
          author: "System",
          category: "timeout"
        });
      } else {
        setQuote({
          quote: "Sorry, we couldn't fetch a quote right now. Please try again in a moment.",
          author: "System",
          category: "error"
        });
      }
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchRandomQuote(category || undefined);
  };

  const copyToClipboard = async () => {
    if (!quote) return;
    
    const text = `"${quote.quote}" - ${quote.author}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const shareQuote = async () => {
    if (!quote) return;
    
    const text = `"${quote.quote}" - ${quote.author}`;
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Inspirational Quote',
          text,
          url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyToClipboard();
    }
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Daily Inspiration</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Quote Generator
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover wisdom and inspiration from great minds throughout history. 
              Find the perfect quote to motivate your day.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => {
                  const now = Date.now();
                  const timeSinceLastRequest = now - lastRequestTime;
                  const minInterval = 1000;
                  
                  if (timeSinceLastRequest >= minInterval || initialLoad) {
                    fetchRandomQuote(selectedCategory || undefined);
                  }
                }}
                disabled={loading || cooldownActive}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Loading...' : cooldownActive ? 'Please wait...' : 'New Quote'}
              </button>
            </div>

            {quote ? (
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="text-6xl text-purple-200 absolute -top-4 -left-2">"</div>
                  <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-800 leading-relaxed mb-6 px-8">
                    {quote.quote}
                  </blockquote>
                  <div className="text-6xl text-purple-200 absolute -bottom-8 -right-2">"</div>
                </div>
                
                <div className="flex items-center justify-center gap-4 text-lg text-gray-600">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold">— {quote.author}</span>
                  </div>
                  {quote.category && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {quote.category}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center gap-4 pt-6">
                  <button
                    onClick={toggleLike}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      liked
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                    title="Like this quote"
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={copyToClipboard}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      copied
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title="Copy to clipboard"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={shareQuote}
                    className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    title="Share quote"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                
                {copied && (
                  <div className="text-green-600 text-sm font-medium">
                    Quote copied to clipboard!
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <RefreshCw className="w-6 h-6 animate-spin text-purple-600" />
                    <span className="text-gray-600">Loading inspiration...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-gray-500">
                      Click "New Quote" to get started!
                    </div>
                    <button
                      onClick={() => fetchRandomQuote()}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl mx-auto"
                    >
                      <Sparkles className="w-5 h-5" />
                      Get Your First Quote
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-center">
            <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Find Your Daily Motivation
              </h2>
              <p className="text-gray-600 text-sm max-w-md">
                Explore thousands of inspiring quotes from philosophers, authors, leaders, 
                and visionaries who shaped our world.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Quote Generator",
            "description": "Random inspirational quote generator with quotes from famous authors and thinkers",
            "url": "https://swissknife.vercel.app/quote-generator",
            "applicationCategory": "Lifestyle",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}