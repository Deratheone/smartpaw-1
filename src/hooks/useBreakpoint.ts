import { useState, useEffect } from 'react';

// Breakpoint definitions
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

export const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('lg');
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      let breakpoint: Breakpoint = 'xs';
      for (const [key, value] of Object.entries(breakpoints)) {
        if (width >= value) {
          breakpoint = key as Breakpoint;
        }
      }
      setCurrentBreakpoint(breakpoint);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAbove = (breakpoint: Breakpoint) => windowWidth >= breakpoints[breakpoint];
  const isBelow = (breakpoint: Breakpoint) => windowWidth < breakpoints[breakpoint];
  const isBetween = (min: Breakpoint, max: Breakpoint) => 
    windowWidth >= breakpoints[min] && windowWidth < breakpoints[max];

  return {
    currentBreakpoint,
    windowWidth,
    isAbove,
    isBelow,
    isBetween,
    isMobile: isBelow('md'),
    isTablet: isBetween('md', 'lg'),
    isDesktop: isAbove('lg'),
  };
};

// Utility function for responsive classes
export const responsive = {
  show: {
    mobile: 'block md:hidden',
    tablet: 'hidden md:block lg:hidden',
    desktop: 'hidden lg:block',
    tabletUp: 'hidden md:block',
    mobileOnly: 'block md:hidden',
  },
  hide: {
    mobile: 'hidden md:block',
    tablet: 'block md:hidden lg:block',
    desktop: 'block lg:hidden',
    tabletUp: 'block md:hidden',
    mobileOnly: 'hidden md:block',
  },
  text: {
    mobile: 'text-sm',
    tablet: 'text-base',
    desktop: 'text-lg',
    responsive: 'text-sm md:text-base lg:text-lg',
  },
  spacing: {
    mobile: 'p-2',
    tablet: 'p-4',
    desktop: 'p-6',
    responsive: 'p-2 md:p-4 lg:p-6',
  },
  grid: {
    responsive1: 'grid-cols-1',
    responsive2: 'grid-cols-1 md:grid-cols-2',
    responsive3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    responsive4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }
};

export default useBreakpoint;
