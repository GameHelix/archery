import Link from 'next/link';
import { 
  Key, 
  QrCode, 
  Type, 
  Calculator, 
  Activity, 
  Palette,
  FileText,
  Table
} from 'lucide-react';

interface Tool {
  name: string;
  href: string;
  description: string;
  icon: any;
  color: string;
}

const allTools: Tool[] = [
  {
    name: 'Password Generator',
    href: '/password-generator',
    description: 'Create strong, secure passwords',
    icon: Key,
    color: 'bg-red-500'
  },
  {
    name: 'QR Code Generator',
    href: '/qr-generator',
    description: 'Generate QR codes instantly',
    icon: QrCode,
    color: 'bg-blue-500'
  },
  {
    name: 'Text Tools',
    href: '/text-tools',
    description: 'Text case conversion & manipulation',
    icon: Type,
    color: 'bg-yellow-500'
  },
  {
    name: 'Unit Converter',
    href: '/unit-converter',
    description: 'Convert units of measurement',
    icon: Calculator,
    color: 'bg-indigo-500'
  },
  {
    name: 'BMI Calculator',
    href: '/bmi-calculator',
    description: 'Calculate Body Mass Index',
    icon: Activity,
    color: 'bg-orange-500'
  },
  {
    name: 'Color Palette',
    href: '/color-palette',
    description: 'Generate beautiful color palettes',
    icon: Palette,
    color: 'bg-rose-500'
  },
  {
    name: 'PDF Converter',
    href: '/pdf-converter',
    description: 'Convert documents to PDF',
    icon: FileText,
    color: 'bg-green-500'
  },
  {
    name: 'CSV/Excel Converter',
    href: '/csv-excel-converter',
    description: 'Convert between CSV and Excel',
    icon: Table,
    color: 'bg-purple-500'
  }
];

interface RelatedToolsProps {
  currentTool: string;
  category?: 'generators' | 'converters' | 'calculators' | 'utilities';
  maxItems?: number;
}

export default function RelatedTools({ 
  currentTool, 
  category,
  maxItems = 3 
}: RelatedToolsProps) {
  const getRelatedTools = () => {
    let filteredTools = allTools.filter(tool => tool.href !== currentTool);
    
    if (category === 'generators') {
      filteredTools = filteredTools.filter(tool => 
        tool.name.includes('Generator') || tool.name.includes('QR')
      );
    } else if (category === 'converters') {
      filteredTools = filteredTools.filter(tool => 
        tool.name.includes('Converter') || tool.name.includes('Tools')
      );
    } else if (category === 'calculators') {
      filteredTools = filteredTools.filter(tool => 
        tool.name.includes('Calculator') || tool.name.includes('BMI')
      );
    }
    
    // If no category match or not enough tools, get random tools
    if (filteredTools.length < maxItems) {
      filteredTools = allTools.filter(tool => tool.href !== currentTool);
    }
    
    return filteredTools.slice(0, maxItems);
  };

  const relatedTools = getRelatedTools();

  if (relatedTools.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            You Might Also Like
          </h2>
          <p className="text-gray-600">
            Discover more free tools to boost your productivity
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1 p-6"
            >
              <div className="flex items-center justify-center mb-4">
                <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <tool.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center group-hover:text-primary-600 transition-colors duration-300">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}