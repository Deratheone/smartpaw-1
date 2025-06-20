import { useState, useEffect } from "react";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      
      setScrollProgress(scrolled);
    };

    // Update on initial load
    updateScrollProgress();
    
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/20 backdrop-blur-sm z-50">
      <div 
        className="h-full bg-gradient-to-r from-smartpaw-purple via-purple-500 to-blue-500 transition-all duration-150 ease-out shadow-sm"
        style={{ 
          width: `${scrollProgress}%`,
          boxShadow: scrollProgress > 0 ? '0 0 10px rgba(139, 92, 246, 0.5)' : 'none'
        }}
      />
    </div>
  );
};

export default ScrollProgress;
