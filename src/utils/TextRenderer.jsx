import React from 'react';
import { InlineLink } from '../components/Containers/Containers';

/**
 * Renders text with inline links based on placeholder patterns
 * @param {string} text - Text with placeholders like {LINK_KEY}
 * @param {object} links - Object mapping placeholders to link data
 * @returns {JSX.Element}
 */
export const renderTextWithLinks = (text, links = {}) => {
  if (!links || Object.keys(links).length === 0) {
    return text;
  }

  const parts = text.split(/(\{[^}]+\})/);
  
  return parts.map((part, index) => {
    const linkKey = part.match(/\{(.+)\}/)?.[1];
    
    if (linkKey && links[linkKey]) {
      return (
        <InlineLink key={index} href={links[linkKey].href}>
          {links[linkKey].text}
        </InlineLink>
      );
    }
    
    return part;
  });
};