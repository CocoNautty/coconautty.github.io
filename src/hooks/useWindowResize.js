import { useState, useEffect } from 'react';

/**
 * Custom hook to track window dimensions and resize events
 * @param {number} debounceMs - Debounce delay in milliseconds
 * @returns {object} - Object containing width and height
 */
export const useWindowResize = (debounceMs = 150) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, debounceMs);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [debounceMs]);

  return windowSize;
};