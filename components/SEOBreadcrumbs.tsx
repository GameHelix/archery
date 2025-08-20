import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface SEOBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function SEOBreadcrumbs({ items, className = '' }: SEOBreadcrumbsProps) {
  const allItems = [
    { name: 'Home', href: '/', current: false },
    ...items
  ];

  return (
    <nav 
      className={`flex ${className}`} 
      aria-label="Breadcrumb"
      role="navigation"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm">
        {allItems.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" />
            )}
            {item.current ? (
              <span 
                className="ml-1 text-sm font-medium text-gray-500 truncate max-w-[200px]"
                aria-current="page"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1 inline" aria-hidden="true" />}
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="inline-flex items-center ml-1 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
                {...(index === 0 && { 'aria-label': 'Go to homepage' })}
              >
                {index === 0 && <Home className="w-4 h-4 mr-1" aria-hidden="true" />}
                <span className="truncate max-w-[200px]">{item.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Hook to generate breadcrumbs based on pathname
export function useBreadcrumbs(pathname: string, customName?: string) {
  const pathSegments = pathname.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) {
    return [];
  }

  const breadcrumbs: BreadcrumbItem[] = [];
  let currentPath = '';

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    let name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Custom naming for specific routes
    const routeNames: Record<string, string> = {
      'password-generator': 'Password Generator',
      'qr-generator': 'QR Code Generator', 
      'pdf-converter': 'PDF Converter',
      'csv-excel-converter': 'CSV/Excel Converter',
      'text-tools': 'Text Tools',
      'tip-calculator': 'Tip Calculator',
      'bmi-calculator': 'BMI Calculator',
      'todo-list': 'Todo List',
      'unit-converter': 'Unit Converter',
      'color-palette': 'Color Palette',
      'image-converter': 'Image Converter',
      'timezone-converter': 'Timezone Converter'
    };

    if (routeNames[segment]) {
      name = routeNames[segment];
    }

    if (isLast && customName) {
      name = customName;
    }

    breadcrumbs.push({
      name,
      href: currentPath,
      current: isLast
    });
  });

  return breadcrumbs;
}