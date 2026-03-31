import React from 'react';
import { getAllGlossaryTerms } from '../data/glossary.js';
import GlossaryTooltip from '../components/GlossaryTooltip.js';

// Cache the glossary terms for performance
let glossaryTerms = null;

const getGlossaryTerms = () => {
  if (!glossaryTerms) {
    glossaryTerms = getAllGlossaryTerms();
  }
  return glossaryTerms;
};

// Cache the compiled regex for performance
let glossaryRegex = null;

const createGlossaryRegex = () => {
  if (glossaryRegex) return glossaryRegex;
  const terms = getGlossaryTerms();
  const sortedTerms = [...terms].sort((a, b) => b.length - a.length);
  const escapedTerms = sortedTerms.map(term =>
    term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  glossaryRegex = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi');
  return glossaryRegex;
};

// Parse text and wrap glossary terms with tooltips
export const parseGlossaryTerms = (text, theme = 'light', enabled = true) => {
  if (!enabled || !text || typeof text !== 'string') {
    return text;
  }

  const regex = createGlossaryRegex();
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    if (!part) return null;
    
    // Check if this part is a glossary term
    const isGlossaryTerm = getGlossaryTerms().some(term => 
      term.toLowerCase() === part.toLowerCase()
    );
    
    if (isGlossaryTerm) {
      // Find the exact term (case-insensitive match)
      const exactTerm = getGlossaryTerms().find(term => 
        term.toLowerCase() === part.toLowerCase()
      );
      
      return (
        <GlossaryTooltip 
          key={index} 
          term={exactTerm} 
          theme={theme}
          enabled={enabled}
        >
          {part}
        </GlossaryTooltip>
      );
    }
    
    return part;
  }).filter(Boolean);
};

// Parse markdown content and wrap glossary terms
export const parseMarkdownGlossaryTerms = (markdownContent, theme = 'light', enabled = true) => {
  if (!enabled || !markdownContent || typeof markdownContent !== 'string') {
    return markdownContent;
  }

  const regex = createGlossaryRegex();
  const parts = markdownContent.split(regex);
  
  return parts.map((part, index) => {
    if (!part) return null;
    
    // Check if this part is a glossary term
    const isGlossaryTerm = getGlossaryTerms().some(term => 
      term.toLowerCase() === part.toLowerCase()
    );
    
    if (isGlossaryTerm) {
      // Find the exact term (case-insensitive match)
      const exactTerm = getGlossaryTerms().find(term => 
        term.toLowerCase() === part.toLowerCase()
      );
      
      return (
        <GlossaryTooltip 
          key={index} 
          term={exactTerm} 
          theme={theme}
          enabled={enabled}
        >
          {part}
        </GlossaryTooltip>
      );
    }
    
    return part;
  }).filter(Boolean);
};

// Parse HTML content and wrap glossary terms while preserving HTML structure
export const parseHTMLGlossaryTerms = (htmlContent, theme = 'light', enabled = true) => {
  if (!enabled || !htmlContent || typeof htmlContent !== 'string') {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  if (typeof document === 'undefined') {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  try {
    // Create a temporary DOM element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Function to convert DOM node to React component
    const nodeToReact = (node, index = 0) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text.trim()) return null;
        
        // Check if this text contains glossary terms
        const regex = createGlossaryRegex();
        const matches = [...text.matchAll(regex)];

        if (matches.length === 0) {
          return text;
        }
        
        // Split text and wrap glossary terms
        const parts = [];
        let lastIndex = 0;
        
        matches.forEach((match) => {
          const term = match[0];
          const index = match.index;
          
          // Add text before the match
          if (index > lastIndex) {
            parts.push(text.slice(lastIndex, index));
          }
          
          // Add the wrapped term with clean underline styling
          parts.push(
            <GlossaryTooltip 
              key={`${term}-${index}`} 
              term={term} 
              theme={theme}
              enabled={enabled}
            >
              <span style={{ 
                cursor: 'help',
                textDecoration: 'underline dotted'
              }}>
                {term}
              </span>
            </GlossaryTooltip>
          );
          
          lastIndex = index + term.length;
        });
        
        // Add remaining text
        if (lastIndex < text.length) {
          parts.push(text.slice(lastIndex));
        }
        
        return parts;
      }
      
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();
        const children = Array.from(node.childNodes)
          .map((childNode, childIndex) => nodeToReact(childNode, childIndex))
          .filter(Boolean);
        
        // Handle special cases
        if (tagName === 'br') {
          return <br key={`br-${index}`} />;
        }
        
        if (tagName === 'hr') {
          return <hr key={`hr-${index}`} />;
        }
        
        // Convert HTML attributes to React props
        const props = { key: `${tagName}-${index}` };
        Array.from(node.attributes).forEach(attr => {
          if (attr.name === 'class') {
            props.className = attr.value;
          } else if (attr.name === 'style') {
            // Parse CSS string into React style object
            const styleObj = {};
            attr.value.split(';').forEach(style => {
              const [property, value] = style.split(':').map(s => s.trim());
              if (property && value) {
                // Convert CSS property names to camelCase
                const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                styleObj[camelProperty] = value;
              }
            });
            props.style = styleObj;
          } else if (attr.name.startsWith('data-')) {
            props[attr.name] = attr.value;
          } else if (attr.name !== 'key') {
            props[attr.name] = attr.value;
          }
        });
        
        // Create React element
        return React.createElement(tagName, props, ...children);
      }
      
      return null;
    };
    
    // Convert the entire DOM tree to React components
    const reactComponents = Array.from(tempDiv.childNodes)
      .map((childNode, index) => nodeToReact(childNode, index))
      .filter(Boolean);
    
    return <div>{reactComponents}</div>;
    
  } catch (error) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }
};

// Simple text replacement for non-React contexts
export const replaceGlossaryTerms = (text, enabled = true) => {
  if (!enabled || !text || typeof text !== 'string') {
    return text;
  }

  const regex = createGlossaryRegex();
  return text.replace(regex, (match) => {
    const exactTerm = getGlossaryTerms().find(term => 
      term.toLowerCase() === match.toLowerCase()
    );
    return `<span class="glossary-term" data-term="${exactTerm}">${match}</span>`;
  });
};

// Get glossary terms that appear in a given text
export const getGlossaryTermsInText = (text) => {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const regex = createGlossaryRegex();
  const matches = text.match(regex) || [];
  
  // Return unique terms (case-insensitive)
  const uniqueTerms = [...new Set(matches.map(match => {
    return getGlossaryTerms().find(term => 
      term.toLowerCase() === match.toLowerCase()
    );
  }))];
  
  return uniqueTerms.filter(Boolean);
};

// Check if a text contains any glossary terms
export const hasGlossaryTerms = (text) => {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const regex = createGlossaryRegex();
  return regex.test(text);
};

const glossaryParser = {
  parseGlossaryTerms,
  parseMarkdownGlossaryTerms,
  replaceGlossaryTerms,
  getGlossaryTermsInText,
  hasGlossaryTerms
};

export default glossaryParser;



