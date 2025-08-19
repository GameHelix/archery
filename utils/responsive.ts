// Responsive utility functions and breakpoint definitions

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Get current breakpoint based on window width
export const getCurrentBreakpoint = (): Breakpoint => {
  if (typeof window === 'undefined') return 'md'; // SSR fallback
  
  const width = window.innerWidth;
  
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

// Check if current viewport matches breakpoint
export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
};

// Mobile-first media query utilities
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoints.md;
};

export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;
};

export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.lg;
};

// Touch device detection
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Responsive class utilities
export const responsiveClasses = {
  // Common responsive patterns
  stack: {
    mobile: 'flex flex-col space-y-4',
    tablet: 'md:flex-row md:space-y-0 md:space-x-6',
    desktop: 'lg:space-x-8'
  },
  
  grid: {
    mobile: 'grid grid-cols-1 gap-4',
    tablet: 'sm:grid-cols-2 sm:gap-6',
    desktop: 'lg:grid-cols-3 lg:gap-8'
  },
  
  text: {
    hero: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl',
    heading: 'text-xl sm:text-2xl lg:text-3xl',
    subheading: 'text-lg sm:text-xl lg:text-2xl',
    body: 'text-sm sm:text-base',
    caption: 'text-xs sm:text-sm'
  },
  
  spacing: {
    section: 'py-6 sm:py-8 lg:py-12',
    container: 'px-3 sm:px-6 lg:px-8',
    element: 'mb-4 sm:mb-6 lg:mb-8'
  },
  
  button: {
    touch: 'px-4 py-3 sm:px-6 sm:py-3 min-h-[44px] touch-manipulation',
    desktop: 'px-6 py-2.5 hover:scale-105'
  },
  
  card: {
    mobile: 'rounded-lg shadow-md p-4',
    desktop: 'rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow'
  }
};

// Generate responsive utility classes
export const generateResponsiveClass = (
  base: string,
  variations: Record<Breakpoint, string>
): string => {
  const classes = [base];
  
  Object.entries(variations).forEach(([breakpoint, value]) => {
    if (breakpoint === 'xs') {
      classes.push(value);
    } else {
      classes.push(`${breakpoint}:${value}`);
    }
  });
  
  return classes.join(' ');
};

// Common responsive patterns as functions
export const responsiveText = (
  mobile: string,
  tablet?: string,
  desktop?: string
): string => {
  const classes = [mobile];
  if (tablet) classes.push(`sm:${tablet}`);
  if (desktop) classes.push(`lg:${desktop}`);
  return classes.join(' ');
};

export const responsiveSpacing = (
  mobile: string,
  tablet?: string,
  desktop?: string
): string => {
  const classes = [mobile];
  if (tablet) classes.push(`sm:${tablet}`);
  if (desktop) classes.push(`lg:${desktop}`);
  return classes.join(' ');
};

// Debugging utilities for development
export const logBreakpointInfo = (): void => {
  if (typeof window === 'undefined') return;
  
  console.group('Responsive Debug Info');
  console.log('Window width:', window.innerWidth);
  console.log('Current breakpoint:', getCurrentBreakpoint());
  console.log('Is mobile:', isMobile());
  console.log('Is tablet:', isTablet());
  console.log('Is desktop:', isDesktop());
  console.log('Is touch device:', isTouchDevice());
  console.groupEnd();
};

// Test responsive breakpoints (development utility)
export const testBreakpoints = (): void => {
  if (typeof window === 'undefined') return;
  
  const originalWidth = window.innerWidth;
  
  console.group('Responsive Breakpoint Test');
  
  Object.entries(breakpoints).forEach(([name, width]) => {
    // Mock window width for testing
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width
    });
    
    console.log(`${name} (${width}px):`, {
      current: getCurrentBreakpoint(),
      isMobile: isMobile(),
      isTablet: isTablet(),
      isDesktop: isDesktop()
    });
  });
  
  // Restore original width
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: originalWidth
  });
  
  console.groupEnd();
};