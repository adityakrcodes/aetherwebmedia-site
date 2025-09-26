'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  isLowPerformance: boolean;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    isLowPerformance: false
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;
    let isVisible = true;

    // Pause monitoring when tab is not visible
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const measureFPS = () => {
      if (!isVisible) {
        rafId = requestAnimationFrame(measureFPS);
        return;
      }

      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        const memoryUsage = (performance as any).memory?.usedJSHeapSize;
        
        setMetrics({
          fps,
          memoryUsage,
          isLowPerformance: fps < 30 || (memoryUsage && memoryUsage > 50 * 1024 * 1024) // 50MB
        });
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      rafId = requestAnimationFrame(measureFPS);
    };

    rafId = requestAnimationFrame(measureFPS);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Show in both development and production for testing
  // if (process.env.NODE_ENV !== 'development') {
  //   return null;
  // }

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs font-mono">
      <div>FPS: {metrics.fps}</div>
      {metrics.memoryUsage && (
        <div>Memory: {Math.round(metrics.memoryUsage / 1024 / 1024)}MB</div>
      )}
      <div className={metrics.isLowPerformance ? 'text-red-400' : 'text-green-400'}>
        {metrics.isLowPerformance ? 'LOW PERF' : 'GOOD'}
      </div>
    </div>
  );
}
