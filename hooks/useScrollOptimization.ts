'use client';

import { useEffect, useRef, useCallback } from 'react';

interface ScrollOptimizationOptions {
  throttleMs?: number;
  passive?: boolean;
  enableSmoothScrolling?: boolean;
}

export function useScrollOptimization(options: ScrollOptimizationOptions = {}) {
  const {
    throttleMs = 16, // ~60fps
    passive = true,
    enableSmoothScrolling = true
  } = options;

  const ticking = useRef(false);
  const lastScrollTime = useRef(0);

  const throttledScrollHandler = useCallback((callback: () => void) => {
    return (event: Event) => {
      const now = performance.now();
      
      if (!ticking.current && (now - lastScrollTime.current) >= throttleMs) {
        requestAnimationFrame(() => {
          callback();
          ticking.current = false;
          lastScrollTime.current = now;
        });
        ticking.current = true;
      }
    };
  }, [throttleMs]);

  useEffect(() => {
    // Optimize scroll performance
    if (enableSmoothScrolling) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    // Add scroll optimization CSS
    const style = document.createElement('style');
    style.textContent = `
      * {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }
      
      /* Optimize repaints during scroll */
      .scroll-optimized {
        will-change: transform;
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      /* Reduce motion for better performance */
      @media (prefers-reduced-motion: reduce) {
        * {
          scroll-behavior: auto !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [enableSmoothScrolling]);

  return { throttledScrollHandler };
}
