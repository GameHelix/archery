import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface TouchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  touchOptimized?: boolean;
}

const variantClasses = {
  primary: 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white border-transparent focus:ring-primary-500',
  secondary: 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white border-transparent focus:ring-gray-500',
  outline: 'bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-700 border-gray-300 focus:ring-primary-500',
  ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-transparent focus:ring-gray-500',
  success: 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white border-transparent focus:ring-green-500',
  warning: 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white border-transparent focus:ring-yellow-500',
  danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border-transparent focus:ring-red-500'
};

const sizeClasses = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
};

const touchSizeClasses = {
  xs: 'px-3 py-2 text-xs min-h-[36px]',
  sm: 'px-4 py-3 text-sm min-h-[40px]',
  md: 'px-5 py-3.5 text-base min-h-[44px]',
  lg: 'px-6 py-4 text-lg min-h-[48px]',
  xl: 'px-8 py-5 text-xl min-h-[52px]'
};

export default function TouchButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  touchOptimized = true,
  className = '',
  disabled,
  ...props
}: TouchButtonProps) {
  const sizeClass = touchOptimized ? touchSizeClasses[size] : sizeClasses[size];
  
  const baseClasses = [
    'inline-flex items-center justify-center font-semibold rounded-lg border',
    'transition-all duration-200 transform',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    touchOptimized ? 'touch-manipulation active:scale-95' : 'hover:scale-105 active:scale-95',
    fullWidth ? 'w-full' : '',
    variantClasses[variant],
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  const isDisabled = disabled || loading;

  return (
    <button
      className={baseClasses}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <Loader2 className="animate-spin mr-2 h-4 w-4" />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {!loading && children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
}