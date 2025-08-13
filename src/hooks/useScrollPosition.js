import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * @param {number} throttleMs - Throttle delay in milliseconds
 * @returns {object} - Object containing scrollY position
 */
export const useScrollPosition = (throttleMs = 16) => {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: window.scrollY,
    scrollX: window.scrollX
  });

  useEffect(() => {
    let timeoutId = null;
    let lastScrollTime = 0;

    const updateScrollPosition = () => {
      const now = Date.now();
      if (now - lastScrollTime >= throttleMs) {
        setScrollPosition({
          scrollY: window.scrollY,
          scrollX: window.scrollX
        });
        lastScrollTime = now;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setScrollPosition({
            scrollY: window.scrollY,
            scrollX: window.scrollX
          });
        }, throttleMs - (now - lastScrollTime));
      }
    };

    window.addEventListener('scroll', updateScrollPosition, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', updateScrollPosition);
    };
  }, [throttleMs]);

  return scrollPosition;
};