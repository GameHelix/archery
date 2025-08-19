'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const toolNames: { [key: string]: string } = {
  'password-generator': 'Password Generator',
  'qr-generator': 'QR Code Generator',
  'text-tools': 'Text Tools',
  'unit-converter': 'Unit Converter',
  'bmi-calculator': 'BMI Calculator',
  'color-palette': 'Color Palette',
  'pdf-converter': 'PDF Converter',
  'csv-excel-converter': 'CSV/Excel Converter',
  'tip-calculator': 'Tip Calculator',
  'todo-list': 'Todo List',
  'image-converter': 'Image Converter',
  'timezone-converter': 'Timezone Converter',
  'about': 'About',
  'contact': 'Contact',
  'privacy': 'Privacy Policy',
  'terms': 'Terms of Service'
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;
  
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];
  
  let currentPath = '';
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    const label = toolNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ label, href: currentPath });
  });
  
  return (
    <nav className="bg-white border-b border-gray-100 py-3" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
              )}
              {index === 0 ? (
                <Link
                  href={breadcrumb.href}
                  className="flex items-center text-gray-500 hover:text-primary-600 transition-colors"
                >
                  <Home className="w-4 h-4 mr-1" />
                  {breadcrumb.label}
                </Link>
              ) : index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="text-gray-500 hover:text-primary-600 transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}