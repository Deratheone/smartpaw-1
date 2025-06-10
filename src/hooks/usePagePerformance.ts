import { useEffect } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
}

/**
 * Hook for monitoring page performance metrics
 */
export const usePagePerformance = (pageName: string) => {
  useEffect(() => {
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        const metrics: PerformanceMetrics = {
          pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        };

        // Get paint timings
        paint.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            metrics.firstContentfulPaint = entry.startTime;
          }
        });

        // Get LCP if available
        if ('web-vitals' in window) {
          // This would integrate with web-vitals library if installed
          console.log(`Performance metrics for ${pageName}:`, metrics);
        }

        // Send to analytics service (replace with your preferred service)
        if (process.env.NODE_ENV === 'production') {
          // Example: sendToAnalytics(pageName, metrics);
        }
      }
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, [pageName]);
};
