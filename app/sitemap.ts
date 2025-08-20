import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://swissknife.site'
  const currentDate = new Date()
  
  // Define when each tool was last significantly updated
  const toolUpdates = {
    '/password-generator': '2025-08-19',
    '/qr-generator': '2025-08-19', 
    '/text-tools': '2025-08-18',
    '/unit-converter': '2025-08-18',
    '/bmi-calculator': '2025-08-17',
    '/color-palette': '2025-08-17',
    '/pdf-converter': '2025-08-16',
    '/csv-excel-converter': '2025-08-16',
    '/tip-calculator': '2025-08-15',
    '/todo-list': '2025-08-15',
    '/image-converter': '2025-08-14',
    '/timezone-converter': '2025-08-14'
  }
  
  const tools = [
    // High priority core tools - most popular and frequently used
    { path: '/password-generator', priority: 0.95, changeFreq: 'weekly' as const, category: 'security' },
    { path: '/qr-generator', priority: 0.95, changeFreq: 'weekly' as const, category: 'productivity' },
    { path: '/text-tools', priority: 0.9, changeFreq: 'weekly' as const, category: 'text' },
    { path: '/unit-converter', priority: 0.9, changeFreq: 'weekly' as const, category: 'conversion' },
    { path: '/bmi-calculator', priority: 0.85, changeFreq: 'weekly' as const, category: 'health' },
    { path: '/color-palette', priority: 0.85, changeFreq: 'weekly' as const, category: 'design' },
    
    // Medium priority tools - specialized but valuable
    { path: '/pdf-converter', priority: 0.8, changeFreq: 'weekly' as const, category: 'conversion' },
    { path: '/csv-excel-converter', priority: 0.8, changeFreq: 'weekly' as const, category: 'conversion' },
    { path: '/tip-calculator', priority: 0.75, changeFreq: 'weekly' as const, category: 'calculation' },
    { path: '/todo-list', priority: 0.75, changeFreq: 'weekly' as const, category: 'productivity' },
    { path: '/image-converter', priority: 0.75, changeFreq: 'weekly' as const, category: 'conversion' },
    { path: '/timezone-converter', priority: 0.75, changeFreq: 'weekly' as const, category: 'productivity' },
  ]
  
  const staticPages = [
    { path: '/about', priority: 0.6, changeFreq: 'monthly' as const, lastMod: '2025-08-19' },
    { path: '/contact', priority: 0.6, changeFreq: 'monthly' as const, lastMod: '2025-08-19' },
    { path: '/privacy', priority: 0.4, changeFreq: 'yearly' as const, lastMod: '2024-12-01' },
    { path: '/terms', priority: 0.4, changeFreq: 'yearly' as const, lastMod: '2024-12-01' },
  ]
  
  return [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    
    // Tools - with specific last modified dates
    ...tools.map(tool => ({
      url: `${baseUrl}${tool.path}`,
      lastModified: new Date(toolUpdates[tool.path as keyof typeof toolUpdates] || currentDate.toISOString().split('T')[0]),
      changeFrequency: tool.changeFreq,
      priority: tool.priority,
    })),
    
    // Static pages - with specific last modified dates  
    ...staticPages.map(page => ({
      url: `${baseUrl}${page.path}`,
      lastModified: new Date(page.lastMod),
      changeFrequency: page.changeFreq,
      priority: page.priority,
    })),
    
    // Add category-based virtual pages for better SEO organization
    {
      url: `${baseUrl}/?category=security`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/?category=productivity`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/?category=conversion`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]
}