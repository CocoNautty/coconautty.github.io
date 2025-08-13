import { useState, useEffect, useRef } from 'react';
import { LAYOUT_CONSTANTS } from '../constants';

/**
 * Custom hook to track sticky state of an element
 * @returns {object} - Object containing ref and isPinned state
 */
export const useStickyState = () => {
  const [isPinned, setIsPinned] = useState(false);
  const stickyRef = useRef(null);

  useEffect(() => {
    const eventHandler = () => {
      if (stickyRef.current) {
        const windowWidth = window.innerWidth;
        const { top } = stickyRef.current.getBoundingClientRect();
        
        if (windowWidth <= LAYOUT_CONSTANTS.MOBILE_BREAKPOINT) {
          setIsPinned(top <= LAYOUT_CONSTANTS.STICKY_TITLE_THRESHOLD);
        }
      }
    };

    window.addEventListener('scroll', eventHandler, { passive: true });
    window.addEventListener('resize', eventHandler);

    return () => {
      window.removeEventListener('scroll', eventHandler);
      window.removeEventListener('resize', eventHandler);
    };
  }, []);

  return { stickyRef, isPinned };
};