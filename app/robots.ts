import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://swissknife.site';
  
  return {
    rules: [
      // Main crawler rules - allow most content
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/_next/static/',
          '/static/',
          '/.well-known/',
          '/temp/',
          '/cache/',
          '/logs/',
          '/*.json$',
          '/*.xml$',
          '/manifest.json',
          '/sw.js',
        ],
        crawlDelay: 1,
      },
      // Google specific rules - more permissive
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/_next/static/',
        ],
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/icon-*.png',
          '/apple-touch-icon.png',
          '/favicon.ico',
        ],
        disallow: '/_next/static/',
      },
      
      // Bing specific rules
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/_next/static/',
        ],
        crawlDelay: 1,
      },
      
      // Other legitimate search engines
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
        crawlDelay: 2,
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
        crawlDelay: 2,
      },
      // Block AI training and scraping bots
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        userAgent: 'FacebookBot',
        disallow: '/',
      },
      {
        userAgent: 'Meta-ExternalAgent',
        disallow: '/',
      },
      {
        userAgent: 'OpenAI',
        disallow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        disallow: '/',
      },
      
      // Block aggressive SEO crawlers
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}