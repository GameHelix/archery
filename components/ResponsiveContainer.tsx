import { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  mobilePadding?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  centerContent?: boolean;
  fullHeightOnMobile?: boolean;
}

const maxWidthClasses = {
  'sm': 'max-w-sm',
  'md': 'max-w-md', 
  'lg': 'max-w-lg',
  'xl': 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl'
};

const paddingClasses = {
  'none': '',
  'xs': 'px-2 sm:px-3 lg:px-4',
  'sm': 'px-3 sm:px-4 lg:px-6',
  'md': 'px-4 sm:px-6 lg:px-8',
  'lg': 'px-4 sm:px-6 lg:px-8 xl:px-12',
  'xl': 'px-6 sm:px-8 lg:px-12 xl:px-16'
};

const mobilePaddingClasses = {
  'none': '',
  'xs': 'px-2',
  'sm': 'px-3',
  'md': 'px-4',
  'lg': 'px-6'
};

export default function ResponsiveContainer({ 
  children, 
  className = '',
  maxWidth = '7xl',
  padding = 'md',
  mobilePadding,
  centerContent = false,
  fullHeightOnMobile = false
}: ResponsiveContainerProps) {
  const basePadding = mobilePadding ? mobilePaddingClasses[mobilePadding] : paddingClasses[padding];
  const responsivePadding = mobilePadding 
    ? `${mobilePaddingClasses[mobilePadding]} sm:${paddingClasses[padding].split(' ').slice(1).join(' ')}`
    : paddingClasses[padding];
  
  const centerClass = centerContent ? 'flex flex-col items-center justify-center' : '';
  const heightClass = fullHeightOnMobile ? 'min-h-screen sm:min-h-0' : '';
  
  return (
    <div className={`${maxWidthClasses[maxWidth]} mx-auto ${responsivePadding} ${centerClass} ${heightClass} ${className}`}>
      {children}
    </div>
  );
}