import { ReactNode } from 'react';

interface MobileCardProps {
  children: ReactNode;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  mobilePadding?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  background?: 'white' | 'gray' | 'transparent' | 'glass';
  className?: string;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

const paddingClasses = {
  'none': '',
  'xs': 'p-2 sm:p-3',
  'sm': 'p-3 sm:p-4',
  'md': 'p-4 sm:p-6',
  'lg': 'p-6 sm:p-8',
  'xl': 'p-8 sm:p-10'
};

const mobilePaddingClasses = {
  'none': '',
  'xs': 'p-2',
  'sm': 'p-3', 
  'md': 'p-4',
  'lg': 'p-6'
};

const shadowClasses = {
  'none': '',
  'sm': 'shadow-sm',
  'md': 'shadow-md',
  'lg': 'shadow-lg',
  'xl': 'shadow-xl'
};

const roundedClasses = {
  'none': '',
  'sm': 'rounded-sm',
  'md': 'rounded-md',
  'lg': 'rounded-lg',
  'xl': 'rounded-xl',
  '2xl': 'rounded-2xl'
};

const backgroundClasses = {
  'white': 'bg-white',
  'gray': 'bg-gray-50',
  'transparent': 'bg-transparent',
  'glass': 'bg-white/80 backdrop-blur-sm'
};

export default function MobileCard({
  children,
  padding = 'md',
  mobilePadding,
  shadow = 'md',
  border = true,
  rounded = 'xl',
  background = 'glass',
  className = '',
  hoverable = false,
  clickable = false,
  onClick
}: MobileCardProps) {
  const paddingClass = mobilePadding 
    ? `${mobilePaddingClasses[mobilePadding]} sm:${paddingClasses[padding].split(' ').slice(1).join(' ')}`
    : paddingClasses[padding];

  const interactiveClasses = [
    clickable || hoverable ? 'transition-all duration-200' : '',
    hoverable ? 'hover:shadow-lg hover:-translate-y-1' : '',
    clickable ? 'cursor-pointer active:scale-95 touch-manipulation' : '',
    onClick ? 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2' : ''
  ].filter(Boolean);

  const cardClasses = [
    backgroundClasses[background],
    shadowClasses[shadow],
    border ? 'border border-white/20' : '',
    roundedClasses[rounded],
    paddingClass,
    ...interactiveClasses,
    className
  ].filter(Boolean).join(' ');

  const CardComponent = onClick ? 'button' : 'div';

  return (
    <CardComponent 
      className={cardClasses}
      onClick={onClick}
      {...(onClick && { tabIndex: 0, role: 'button' })}
    >
      {children}
    </CardComponent>
  );
}