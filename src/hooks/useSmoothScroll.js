import { LAYOUT_CONSTANTS } from '../constants';

/**
 * Custom hook for smooth scrolling to sections
 * @returns {function} - Function to scroll to a section by ID
 */
export const useSmoothScroll = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const scrollToY = section.getBoundingClientRect().top + window.scrollY - LAYOUT_CONSTANTS.SCROLL_MARGIN_TOP;
      window.scrollTo({ top: scrollToY, behavior: 'smooth' });
    }
  };

  return scrollToSection;
};