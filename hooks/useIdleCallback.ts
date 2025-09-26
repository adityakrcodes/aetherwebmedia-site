'use client';

import { useEffect, useRef } from 'react';

interface IdleCallbackOptions {
  timeout?: number;
}

export function useIdleCallback(
  callback: () => void,
  deps: React.DependencyList = [],
  options: IdleCallbackOptions = {}
) {
  const { timeout = 5000 } = options;
  const callbackRef = useRef(callback);
  const timeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const executeCallback = () => {
      callbackRef.current();
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = requestIdleCallback(executeCallback, { timeout });
      timeoutIdRef.current = id;
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      timeoutIdRef.current = setTimeout(executeCallback, 0) as unknown as number;
    }

    return () => {
      if (timeoutIdRef.current) {
        if ('cancelIdleCallback' in window) {
          cancelIdleCallback(timeoutIdRef.current);
        } else {
          clearTimeout(timeoutIdRef.current);
        }
      }
    };
  }, deps);
}
