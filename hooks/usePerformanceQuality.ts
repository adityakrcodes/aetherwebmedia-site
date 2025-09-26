'use client';

import { useState, useEffect, useCallback } from 'react';

type QualityLevel = 'low' | 'medium' | 'high';

interface PerformanceQualityOptions {
  targetFPS?: number;
  lowFPSThreshold?: number;
  highFPSThreshold?: number;
  adjustmentDelay?: number;
}

export function usePerformanceQuality(options: PerformanceQualityOptions = {}) {
  const {
    targetFPS = 30,
    lowFPSThreshold = 25,
    highFPSThreshold = 45,
    adjustmentDelay = 2000
  } = options;

  const [quality, setQuality] = useState<QualityLevel>('high');
  const [fps, setFps] = useState(60);
  const [isAdjusting, setIsAdjusting] = useState(false);

  const adjustQuality = useCallback((currentFPS: number) => {
    if (isAdjusting) return;

    setIsAdjusting(true);

    if (currentFPS < lowFPSThreshold && quality !== 'low') {
      setQuality('low');
    } else if (currentFPS > highFPSThreshold && quality !== 'high') {
      setQuality('high');
    } else if (currentFPS >= lowFPSThreshold && currentFPS <= highFPSThreshold && quality !== 'medium') {
      setQuality('medium');
    }

    setTimeout(() => setIsAdjusting(false), adjustmentDelay);
  }, [lowFPSThreshold, highFPSThreshold, quality, isAdjusting, adjustmentDelay]);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const currentFPS = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFps(currentFPS);
        adjustQuality(currentFPS);
        
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
    };
  }, [adjustQuality]);

  const getQualitySettings = () => {
    switch (quality) {
      case 'low':
        return {
          animationSpeed: 0.5,
          particleCount: 0.3,
          complexity: 0.4,
          effects: false,
          shadows: false
        };
      case 'medium':
        return {
          animationSpeed: 0.7,
          particleCount: 0.6,
          complexity: 0.7,
          effects: true,
          shadows: false
        };
      default:
        return {
          animationSpeed: 1.0,
          particleCount: 1.0,
          complexity: 1.0,
          effects: true,
          shadows: true
        };
    }
  };

  return {
    quality,
    fps,
    settings: getQualitySettings(),
    isAdjusting
  };
}
