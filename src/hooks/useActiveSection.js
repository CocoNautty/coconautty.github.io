import { useState, useEffect } from 'react';
import { LAYOUT_CONSTANTS } from '../constants';

/**
 * Custom hook to track which section is currently active based on scroll position
 * @param {Array} sections - Array of section objects with text property
 * @returns {string} - Currently active section name
 */
export const useActiveSection = (sections) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.text || '');

  useEffect(() => {
    const determineActiveSection = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].text);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= LAYOUT_CONSTANTS.NAVIGATION_OFFSET && rect.bottom >= LAYOUT_CONSTANTS.NAVIGATION_OFFSET) {
            setActiveSection(sections[i].text);
            break;
          }
        }
      }
    };

    const scrollHandler = () => {
      determineActiveSection();
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [sections]);

  return activeSection;
};