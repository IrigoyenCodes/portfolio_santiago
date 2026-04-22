'use client';

import { useState, useEffect } from 'react';

/**
 * Returns the current window scrollY value, updated on every scroll event.
 * Uses passive listeners for better performance.
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
