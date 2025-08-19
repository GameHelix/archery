import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://swissknife.site'
  const currentDate = new Date()
  
  const tools = [
    // High priority core tools
    { path: '/password-generator', priority: 0.95, changeFreq: 'weekly' as const },
    { path: '/qr-generator', priority: 0.95, changeFreq: 'weekly' as const },
    { path: '/text-tools', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/unit-converter', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/bmi-calculator', priority: 0.85, changeFreq: 'weekly' as const },
    { path: '/color-palette', priority: 0.85, changeFreq: 'weekly' as const },
    
    // Medium priority tools
    { path: '/pdf-converter', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/csv-excel-converter', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/tip-calculator', priority: 0.75, changeFreq: 'weekly' as const },
    { path: '/todo-list', priority: 0.75, changeFreq: 'weekly' as const },
    { path: '/image-converter', priority: 0.75, changeFreq: 'weekly' as const },
    { path: '/timezone-converter', priority: 0.75, changeFreq: 'weekly' as const },
  ]
  
  const staticPages = [
    { path: '/about', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/privacy', priority: 0.4, changeFreq: 'yearly' as const },
    { path: '/terms', priority: 0.4, changeFreq: 'yearly' as const },
  ]
  
  return [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    
    // Tools
    ...tools.map(tool => ({
      url: `${baseUrl}${tool.path}`,
      lastModified: currentDate,
      changeFrequency: tool.changeFreq,
      priority: tool.priority,
    })),
    
    // Static pages
    ...staticPages.map(page => ({
      url: `${baseUrl}${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFreq,
      priority: page.priority,
    })),
  ]
}