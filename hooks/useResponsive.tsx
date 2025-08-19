'use client';

import { useState, useEffect } from 'react';
import { Breakpoint, breakpoints, getCurrentBreakpoint, isMobile, isTablet, isDesktop, isTouchDevice } from '@/utils/responsive';

interface ResponsiveState {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  width: number;
  height: number;
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    breakpoint: 'md',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    width: 1024,
    height: 768
  });

  useEffect(() => {
    const updateState = () => {
      setState({
        breakpoint: getCurrentBreakpoint(),
        isMobile: isMobile(),
        isTablet: isTablet(), 
        isDesktop: isDesktop(),
        isTouchDevice: isTouchDevice(),
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial state
    updateState();

    // Add event listener
    window.addEventListener('resize', updateState);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateState);
  }, []);

  return state;
};

// Hook to check if viewport matches specific breakpoint
export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      if (typeof window !== 'undefined') {
        setMatches(window.innerWidth >= breakpoints[breakpoint]);
      }
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, [breakpoint]);

  return matches;
};

// Hook to get responsive value based on current breakpoint
export const useResponsiveValue = <T,>(values: Partial<Record<Breakpoint, T>>): T | undefined => {
  const { breakpoint } = useResponsive();
  
  // Find the best matching value by checking breakpoints in descending order
  const orderedBreakpoints: Breakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const currentIndex = orderedBreakpoints.indexOf(breakpoint);
  
  // Look for values starting from current breakpoint and going down
  for (let i = currentIndex; i < orderedBreakpoints.length; i++) {
    const bp = orderedBreakpoints[i];
    if (values[bp] !== undefined) {
      return values[bp];
    }
  }
  
  return undefined;
};

// Hook for orientation detection
export const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  
  useEffect(() => {
    const updateOrientation = () => {
      if (typeof window !== 'undefined') {
        setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
      }
    };
    
    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    
    return () => window.removeEventListener('resize', updateOrientation);
  }, []);
  
  return orientation;
};

// Hook for preferred color scheme detection
export const useColorScheme = () => {
  const [scheme, setScheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateScheme = (e: MediaQueryListEvent | MediaQueryList) => {
      setScheme(e.matches ? 'dark' : 'light');
    };
    
    updateScheme(mediaQuery);
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateScheme);
      return () => mediaQuery.removeEventListener('change', updateScheme);
    }
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(updateScheme);
      return () => mediaQuery.removeListener(updateScheme);
    }
  }, []);
  
  return scheme;
};