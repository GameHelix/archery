// Advanced SEO utility functions and constants

export const SEO_CONSTANTS = {
  SITE_NAME: 'SwissKnife',
  SITE_URL: 'https://swissknife.site',
  SITE_DESCRIPTION: 'Access 12 powerful free online tools: Password generator, QR code creator, text converter, unit calculator, BMI tracker, PDF converter & more. No signup required, 100% privacy-focused web utilities for developers, students, and professionals.',
  SITE_KEYWORDS: [
    'free online tools 2025',
    'web utilities collection',
    'online productivity tools',
    'browser-based utilities',
    'no registration tools',
    'secure password generator online',
    'QR code generator free custom',
    'text case converter uppercase lowercase',
    'unit converter metric imperial',
    'BMI calculator body mass index',
    'color palette generator hex codes',
    'PDF converter documents online',
    'CSV Excel converter free',
    'tip calculator bill splitter',
    'todo list task manager',
    'image format converter',
    'timezone converter world clock',
    'developer tools online',
    'student utility tools',
    'business productivity tools',
    'design tools online',
    'calculation tools free',
    'privacy focused tools',
    'no download required',
    'mobile friendly tools',
    'instant online tools',
    'secure web utilities',
    'professional grade tools'
  ],
  TWITTER_HANDLE: '@swissknife_tools',
  ORGANIZATION_FOUNDED: '2024',
  DEFAULT_IMAGE: '/icon-512.png'
};

export const TOOL_CATEGORIES = {
  security: {
    name: 'Security Tools',
    description: 'Privacy-focused security utilities for generating passwords and protecting accounts',
    tools: ['password-generator'],
    color: 'red'
  },
  productivity: {
    name: 'Productivity Tools', 
    description: 'Efficiency-boosting tools for daily tasks and workflow optimization',
    tools: ['qr-generator', 'csv-excel-converter', 'todo-list', 'timezone-converter'],
    color: 'blue'
  },
  text: {
    name: 'Text Processing',
    description: 'Comprehensive text manipulation and analysis tools',
    tools: ['text-tools'],
    color: 'yellow'
  },
  conversion: {
    name: 'File Converters',
    description: 'Convert between different file formats and data types',
    tools: ['unit-converter', 'pdf-converter', 'image-converter'],
    color: 'green'
  },
  calculation: {
    name: 'Calculators',
    description: 'Specialized calculators for various mathematical and practical calculations',
    tools: ['bmi-calculator', 'tip-calculator'],
    color: 'purple'
  },
  design: {
    name: 'Design Tools',
    description: 'Creative tools for designers and visual content creators',
    tools: ['color-palette'],
    color: 'pink'
  }
} as const;

export const TOOL_METADATA = {
  'password-generator': {
    title: 'Free Password Generator - Create Secure Passwords Online | SwissKnife',
    description: 'Generate ultra-secure passwords with customizable length, character types, and advanced security features. Cryptographically secure random generation. No data stored.',
    keywords: ['password generator', 'secure passwords', 'random password', 'strong password', 'password security', 'cryptographically secure'],
    category: 'security',
    difficulty: 'easy',
    usageTime: 'PT1M',
    featured: true
  },
  'qr-generator': {
    title: 'QR Code Generator - Create Custom QR Codes Free | SwissKnife',
    description: 'Create custom QR codes for URLs, WiFi passwords, contact info, and text. Support for colors, error correction, and multiple formats. Download as PNG.',
    keywords: ['QR code generator', 'QR codes', 'quick response codes', 'WiFi QR', 'contact QR', 'URL QR'],
    category: 'productivity',
    difficulty: 'easy',
    usageTime: 'PT2M',
    featured: true
  },
  'text-tools': {
    title: 'Text Tools Suite - Case Converter & Text Manipulation | SwissKnife',
    description: 'Comprehensive text manipulation toolkit: case conversion, word count, character analysis, whitespace removal, and advanced formatting tools.',
    keywords: ['text tools', 'case converter', 'text manipulation', 'word count', 'character count', 'text formatting'],
    category: 'text',
    difficulty: 'easy',
    usageTime: 'PT1M',
    featured: true
  },
  'unit-converter': {
    title: 'Unit Converter - Metric Imperial Conversion Calculator | SwissKnife',
    description: 'Convert between metric and imperial units for length, weight, temperature, volume, and more. Accurate conversion with detailed formulas.',
    keywords: ['unit converter', 'metric imperial', 'measurement converter', 'length converter', 'weight converter', 'temperature converter'],
    category: 'conversion',
    difficulty: 'easy',
    usageTime: 'PT1M',
    featured: false
  },
  'bmi-calculator': {
    title: 'BMI Calculator - Body Mass Index Calculator with Health Tips | SwissKnife',
    description: 'Calculate Body Mass Index with health recommendations, ideal weight ranges, and detailed health insights for optimal wellness tracking.',
    keywords: ['BMI calculator', 'body mass index', 'health calculator', 'weight assessment', 'health tracker', 'wellness'],
    category: 'calculation',
    difficulty: 'easy',
    usageTime: 'PT2M',
    featured: false
  },
  'color-palette': {
    title: 'Color Palette Generator - Create Beautiful Color Schemes | SwissKnife',
    description: 'Generate harmonious color schemes for web design and creative projects. Extract colors from images, create palettes, and export hex codes.',
    keywords: ['color palette', 'color generator', 'color schemes', 'web design colors', 'hex colors', 'design tools'],
    category: 'design',
    difficulty: 'medium',
    usageTime: 'PT3M',
    featured: false
  },
  'pdf-converter': {
    title: 'PDF Converter - Convert Documents to PDF Online Free | SwissKnife',
    description: 'Convert documents, images, and text files to PDF format instantly. High-quality conversion with privacy protection and batch processing.',
    keywords: ['PDF converter', 'convert to PDF', 'document converter', 'file converter', 'PDF creation', 'document processing'],
    category: 'conversion',
    difficulty: 'easy',
    usageTime: 'PT2M',
    featured: false
  },
  'csv-excel-converter': {
    title: 'CSV Excel Converter - Convert Between CSV and Excel Files | SwissKnife',
    description: 'Convert between CSV and Excel formats with data preview and validation. Preserves data integrity and supports large files.',
    keywords: ['CSV converter', 'Excel converter', 'CSV to Excel', 'Excel to CSV', 'spreadsheet converter', 'data conversion'],
    category: 'conversion',
    difficulty: 'medium',
    usageTime: 'PT3M',
    featured: false
  },
  'tip-calculator': {
    title: 'Tip Calculator - Calculate Tips and Split Bills Easily | SwissKnife',
    description: 'Calculate tips and split bills among multiple people with custom percentages. Perfect for restaurants, delivery, and group dining.',
    keywords: ['tip calculator', 'bill splitter', 'tip percentage', 'restaurant calculator', 'bill calculator', 'dining calculator'],
    category: 'calculation',
    difficulty: 'easy',
    usageTime: 'PT1M',
    featured: false
  },
  'todo-list': {
    title: 'Todo List Manager - Organize Tasks and Boost Productivity | SwissKnife',
    description: 'Organize tasks with priorities, categories, and progress tracking. Simple yet powerful task management for personal and professional use.',
    keywords: ['todo list', 'task manager', 'productivity', 'task organizer', 'to-do app', 'task tracking'],
    category: 'productivity',
    difficulty: 'easy',
    usageTime: 'PT5M',
    featured: false
  },
  'image-converter': {
    title: 'Image Converter - Convert Image Formats Online Free | SwissKnife',
    description: 'Convert images between formats: JPG, PNG, WebP, GIF with quality control. Batch processing and privacy-focused conversion.',
    keywords: ['image converter', 'image format converter', 'JPG to PNG', 'PNG to WebP', 'image optimization', 'photo converter'],
    category: 'conversion',
    difficulty: 'medium',
    usageTime: 'PT2M',
    featured: false
  },
  'timezone-converter': {
    title: 'Timezone Converter - Convert Time Between Global Timezones | SwissKnife',
    description: 'Convert time between global timezones with daylight saving support. Perfect for scheduling meetings and international communication.',
    keywords: ['timezone converter', 'time converter', 'world clock', 'time zones', 'global time', 'meeting scheduler'],
    category: 'productivity',
    difficulty: 'easy',
    usageTime: 'PT1M',
    featured: false
  }
} as const;

// Generate canonical URL
export function generateCanonicalUrl(path: string): string {
  return `${SEO_CONSTANTS.SITE_URL}${path}`;
}

// Generate Open Graph URL
export function generateOGImageUrl(tool?: string): string {
  if (tool && TOOL_METADATA[tool as keyof typeof TOOL_METADATA]) {
    return `${SEO_CONSTANTS.SITE_URL}/og-images/${tool}.png`;
  }
  return `${SEO_CONSTANTS.SITE_URL}${SEO_CONSTANTS.DEFAULT_IMAGE}`;
}

// Generate tool-specific title
export function generateToolTitle(toolKey: string): string {
  const tool = TOOL_METADATA[toolKey as keyof typeof TOOL_METADATA];
  return tool?.title || `${toolKey} | SwissKnife - Free Online Tools`;
}

// Generate tool-specific description
export function generateToolDescription(toolKey: string): string {
  const tool = TOOL_METADATA[toolKey as keyof typeof TOOL_METADATA];
  return tool?.description || SEO_CONSTANTS.SITE_DESCRIPTION;
}

// Generate tool-specific keywords
export function generateToolKeywords(toolKey: string): string[] {
  const tool = TOOL_METADATA[toolKey as keyof typeof TOOL_METADATA];
  const baseKeywords = SEO_CONSTANTS.SITE_KEYWORDS.slice(0, 10); // Take first 10 general keywords
  return tool ? [...tool.keywords, ...baseKeywords] : baseKeywords;
}

// Get related tools based on category
export function getRelatedTools(currentTool: string, maxCount: number = 3): string[] {
  const currentToolData = TOOL_METADATA[currentTool as keyof typeof TOOL_METADATA];
  if (!currentToolData) return [];

  const category = currentToolData.category;
  const categoryTools = TOOL_CATEGORIES[category as keyof typeof TOOL_CATEGORIES]?.tools || [];
  
  // Get tools from same category (excluding current)
  const sameCategory = categoryTools.filter(tool => tool !== currentTool);
  
  // Get featured tools from other categories
  const otherFeaturedTools = Object.entries(TOOL_METADATA)
    .filter(([key, data]) => data.featured && key !== currentTool && !(categoryTools as readonly string[]).includes(key))
    .map(([key]) => key);
  
  // Combine and limit results
  return [...sameCategory, ...otherFeaturedTools].slice(0, maxCount);
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{name: string; href: string}>): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SEO_CONSTANTS.SITE_URL
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": crumb.name,
        "item": crumb.href.startsWith('http') ? crumb.href : `${SEO_CONSTANTS.SITE_URL}${crumb.href}`
      }))
    ]
  };
}

// Performance and Core Web Vitals optimization
export const WEB_VITALS_THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint
  FID: 100,  // First Input Delay
  CLS: 0.1   // Cumulative Layout Shift
};

// SEO scoring system
export function calculateSEOScore(pageData: {
  hasTitle: boolean;
  hasDescription: boolean;
  hasKeywords: boolean;
  hasStructuredData: boolean;
  hasBreadcrumbs: boolean;
  hasInternalLinks: boolean;
  hasAltTags: boolean;
  pageSpeed: number; // 0-100
}): number {
  let score = 0;
  
  if (pageData.hasTitle) score += 15;
  if (pageData.hasDescription) score += 15;
  if (pageData.hasKeywords) score += 10;
  if (pageData.hasStructuredData) score += 20;
  if (pageData.hasBreadcrumbs) score += 10;
  if (pageData.hasInternalLinks) score += 10;
  if (pageData.hasAltTags) score += 10;
  
  // Page speed component (0-10 points)
  score += Math.round(pageData.pageSpeed / 10);
  
  return Math.min(score, 100);
}