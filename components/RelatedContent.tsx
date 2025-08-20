import Link from 'next/link';
import { ArrowRight, Star, Users, Zap } from 'lucide-react';

interface RelatedTool {
  name: string;
  description: string;
  href: string;
  category: 'security' | 'productivity' | 'design' | 'calculation' | 'conversion' | 'text';
  popularity: number; // 1-5 scale
  difficulty: 'easy' | 'medium' | 'advanced';
}

interface RelatedContentProps {
  currentTool?: string;
  category?: string;
  maxItems?: number;
  className?: string;
}

const allTools: RelatedTool[] = [
  {
    name: 'Password Generator',
    description: 'Generate secure passwords with customizable options and strength indicators',
    href: '/password-generator',
    category: 'security',
    popularity: 5,
    difficulty: 'easy'
  },
  {
    name: 'QR Code Generator',
    description: 'Create custom QR codes for URLs, text, WiFi credentials, and contact info',
    href: '/qr-generator',
    category: 'productivity',
    popularity: 5,
    difficulty: 'easy'
  },
  {
    name: 'Text Tools Suite',
    description: 'Comprehensive text manipulation: case conversion, word count, formatting',
    href: '/text-tools',
    category: 'text',
    popularity: 4,
    difficulty: 'easy'
  },
  {
    name: 'Unit Converter',
    description: 'Convert between metric and imperial units for length, weight, temperature',
    href: '/unit-converter',
    category: 'conversion',
    popularity: 4,
    difficulty: 'easy'
  },
  {
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index with health recommendations and ideal weight ranges',
    href: '/bmi-calculator',
    category: 'calculation',
    popularity: 4,
    difficulty: 'easy'
  },
  {
    name: 'Color Palette Generator',
    description: 'Generate harmonious color schemes for web design and creative projects',
    href: '/color-palette',
    category: 'design',
    popularity: 4,
    difficulty: 'medium'
  },
  {
    name: 'PDF Converter',
    description: 'Convert documents, images, and text files to PDF format instantly',
    href: '/pdf-converter',
    category: 'conversion',
    popularity: 5,
    difficulty: 'easy'
  },
  {
    name: 'CSV/Excel Converter',
    description: 'Convert between CSV and Excel formats with data preview and validation',
    href: '/csv-excel-converter',
    category: 'productivity',
    popularity: 3,
    difficulty: 'medium'
  },
  {
    name: 'Tip Calculator',
    description: 'Calculate tips and split bills among multiple people with custom percentages',
    href: '/tip-calculator',
    category: 'calculation',
    popularity: 3,
    difficulty: 'easy'
  },
  {
    name: 'Todo List Manager',
    description: 'Organize tasks with priorities, categories, and progress tracking',
    href: '/todo-list',
    category: 'productivity',
    popularity: 3,
    difficulty: 'easy'
  },
  {
    name: 'Image Converter',
    description: 'Convert images between formats: JPG, PNG, WebP, GIF with quality control',
    href: '/image-converter',
    category: 'conversion',
    popularity: 4,
    difficulty: 'medium'
  },
  {
    name: 'Timezone Converter',
    description: 'Convert time between global timezones with daylight saving support',
    href: '/timezone-converter',
    category: 'productivity',
    popularity: 3,
    difficulty: 'easy'
  }
];

export default function RelatedContent({ 
  currentTool, 
  category, 
  maxItems = 3,
  className = ''
}: RelatedContentProps) {
  // Filter and sort related tools
  const getRelatedTools = () => {
    let filtered = allTools.filter(tool => 
      tool.href !== currentTool
    );

    // If category is specified, prioritize same category tools
    if (category) {
      const sameCategory = filtered.filter(tool => tool.category === category);
      const otherCategory = filtered.filter(tool => tool.category !== category);
      filtered = [...sameCategory, ...otherCategory];
    }

    // Sort by popularity then by name
    filtered.sort((a, b) => {
      if (a.popularity !== b.popularity) {
        return b.popularity - a.popularity;
      }
      return a.name.localeCompare(b.name);
    });

    return filtered.slice(0, maxItems);
  };

  const relatedTools = getRelatedTools();

  if (relatedTools.length === 0) {
    return null;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'security': return '🔐';
      case 'productivity': return '⚡';
      case 'design': return '🎨';
      case 'calculation': return '🧮';
      case 'conversion': return '🔄';
      case 'text': return '📝';
      default: return '🛠️';
    }
  };

  return (
    <section className={`${className}`}>
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Zap className="h-5 w-5 text-blue-600 mr-2" />
            Related Tools
          </h2>
          <Link 
            href="/#tools" 
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors"
          >
            View all tools
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {relatedTools.map((tool, index) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2" role="img" aria-label={tool.category}>
                      {getCategoryIcon(tool.category)}
                    </span>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <div className="flex items-center ml-2">
                      {[...Array(tool.popularity)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(tool.difficulty)}`}>
                      {tool.difficulty}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {tool.category}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-3 mt-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              Need help choosing the right tool? 
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link 
                href="/about" 
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Users className="h-4 w-4 mr-1" />
                About SwissKnife
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export tool categories for reuse
export const toolCategories = {
  security: ['password-generator'],
  productivity: ['qr-generator', 'csv-excel-converter', 'todo-list', 'timezone-converter'],
  design: ['color-palette'],
  calculation: ['bmi-calculator', 'tip-calculator'],
  conversion: ['unit-converter', 'pdf-converter', 'image-converter'],
  text: ['text-tools']
} as const;

// Helper function to get category for a tool
export function getToolCategory(toolPath: string): string | undefined {
  for (const [category, tools] of Object.entries(toolCategories)) {
    if ((tools as readonly string[]).includes(toolPath)) {
      return category;
    }
  }
  return undefined;
}