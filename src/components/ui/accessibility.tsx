import React from 'react';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => (
  <a
    href={href}
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-smartpaw-purple focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-smartpaw-purple"
  >
    {children}
  </a>
);

interface VisuallyHiddenProps {
  children: React.ReactNode;
}

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ children }) => (
  <span className="sr-only">{children}</span>
);

interface FocusTrapProps {
  children: React.ReactNode;
  isActive: boolean;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({ children, isActive }) => {
  const trapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isActive) return;

    const focusableElements = trapRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  return (
    <div ref={trapRef}>
      {children}
    </div>
  );
};

interface AnnouncementProps {
  message: string;
  priority?: 'polite' | 'assertive';
}

export const LiveAnnouncement: React.FC<AnnouncementProps> = ({ 
  message, 
  priority = 'polite' 
}) => (
  <div
    aria-live={priority}
    aria-atomic="true"
    className="sr-only"
  >
    {message}
  </div>
);

// Hook for managing focus announcement
export const useFocusAnnouncement = () => {
  const [announcement, setAnnouncement] = React.useState('');

  const announce = React.useCallback((message: string) => {
    setAnnouncement(message);
    // Clear after announcement to allow re-announcement of same message
    setTimeout(() => setAnnouncement(''), 100);
  }, []);

  return { announcement, announce };
};

// Hook for managing reduced motion preferences
export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return reducedMotion;
};

export default {
  SkipLink,
  VisuallyHidden,
  FocusTrap,
  LiveAnnouncement,
  useFocusAnnouncement,
  useReducedMotion
};
