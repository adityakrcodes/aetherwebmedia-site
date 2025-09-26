'use client';

import { useRef, useEffect, useState } from 'react';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';

interface OptimizedAnimationProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeIn' | 'slideUp' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
}

export default function OptimizedAnimation({
  children,
  className = '',
  animationType = 'fadeIn',
  delay = 0,
  duration = 600,
  threshold = 0.1
}: OptimizedAnimationProps) {
  const { ref, isVisible } = useIntersectionAnimation({
    threshold,
    triggerOnce: true,
    enableAnimation: true
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  const getAnimationStyles = () => {
    if (!shouldAnimate) {
      switch (animationType) {
        case 'fadeIn':
          return { opacity: 0 };
        case 'slideUp':
          return { opacity: 0, transform: 'translateY(30px)' };
        case 'scale':
          return { opacity: 0, transform: 'scale(0.9)' };
        default:
          return {};
      }
    }

    return {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
    };
  };

  return (
    <div
      ref={ref}
      className={`scroll-optimized ${className}`}
      style={{
        ...getAnimationStyles(),
        willChange: shouldAnimate ? 'auto' : 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
}
