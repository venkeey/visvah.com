import React, { useState } from 'react';
import styled from 'styled-components';
import { getGlossaryDefinition, getAllGlossaryTerms } from '../data/glossary.js';

const TooltipContainer = styled.span`
  position: relative;
  display: inline;
  cursor: help;
  color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
`;

const TooltipContent = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.theme === 'dark' ? '#2d3748' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
  max-width: 300px;
  width: max-content;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  z-index: 1000;
  opacity: ${props => props.visible ? '1' : '0'};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: ${props => props.theme === 'dark' ? '#2d3748' : '#ffffff'};
  }
`;

const GlossaryTooltip = ({ children, term, theme = 'light', enabled = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Try to find the exact term first, then try case-insensitive matching
  let definition = getGlossaryDefinition(term);
  let exactTerm = term;
  
  if (!definition) {
    // Try case-insensitive matching
    const allTerms = getAllGlossaryTerms();
    const matchedTerm = allTerms.find(glossaryTerm => 
      glossaryTerm.toLowerCase() === term.toLowerCase()
    );
    
    if (matchedTerm) {
      definition = getGlossaryDefinition(matchedTerm);
      exactTerm = matchedTerm;
    }
  }

  if (!definition) {
    return (
      <span style={{ 
        backgroundColor: 'rgba(255, 193, 7, 0.2)', 
        padding: '2px 4px', 
        borderRadius: '4px',
        borderBottom: '2px dotted rgba(255, 193, 7, 0.5)',
        cursor: 'help'
      }}>
        {children}
      </span>
    );
  }

  return (
    <TooltipContainer
      theme={theme}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <TooltipContent 
        theme={theme} 
        visible={isVisible}
      >
        <strong>{exactTerm}</strong>
        <br />
        {definition}
      </TooltipContent>
    </TooltipContainer>
  );
};

export default GlossaryTooltip;
