import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface BaseInputProps {
  label?: string;
  error?: string;
  hint?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  touchOptimized?: boolean;
  fullWidth?: boolean;
}

type TouchInputProps = BaseInputProps & InputHTMLAttributes<HTMLInputElement>;
type TouchTextareaProps = BaseInputProps & TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
};

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base', 
  lg: 'px-5 py-4 text-lg'
};

const touchSizeClasses = {
  sm: 'px-3 py-3 text-sm min-h-[40px]',
  md: 'px-4 py-3.5 text-base min-h-[44px]',
  lg: 'px-5 py-4 text-lg min-h-[48px]'
};

const baseInputClasses = [
  'w-full border border-gray-300 rounded-lg',
  'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
  'disabled:bg-gray-100 disabled:cursor-not-allowed',
  'transition-all duration-200',
  'touch-manipulation'
].join(' ');

const TouchInput = forwardRef<HTMLInputElement, TouchInputProps>(({
  label,
  error,
  hint,
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  touchOptimized = true,
  fullWidth = true,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const sizeClass = touchOptimized ? touchSizeClasses[size as keyof typeof touchSizeClasses] : sizeClasses[size as keyof typeof sizeClasses];
  
  const inputClasses = [
    baseInputClasses,
    sizeClass,
    Icon && iconPosition === 'left' ? 'pl-12' : '',
    Icon && iconPosition === 'right' ? 'pr-12' : '',
    error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none`}>
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
});

TouchInput.displayName = 'TouchInput';

const TouchTextarea = forwardRef<HTMLTextAreaElement, TouchTextareaProps>(({
  label,
  error,
  hint,
  size = 'md',
  touchOptimized = true,
  fullWidth = true,
  resize = 'vertical',
  rows = 4,
  className = '',
  id,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const sizeClass = touchOptimized ? touchSizeClasses[size as keyof typeof touchSizeClasses] : sizeClasses[size as keyof typeof sizeClasses];
  
  const resizeClass = {
    'none': 'resize-none',
    'vertical': 'resize-y',
    'horizontal': 'resize-x', 
    'both': 'resize'
  }[resize];
  
  const textareaClasses = [
    baseInputClasses,
    sizeClass,
    resizeClass,
    error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
});

TouchTextarea.displayName = 'TouchTextarea';

export { TouchInput, TouchTextarea };