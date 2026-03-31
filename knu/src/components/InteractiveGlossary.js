import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GlossaryContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  max-height: 400px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  z-index: 100;
  transition: all 0.3s ease;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    position: relative;
    bottom: auto;
    right: auto;
    width: 100%;
    margin: 16px 0;
    max-height: 300px;
  }
`;

const GlossaryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const GlossaryTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  
  &:hover {
    color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  }
`;

const TermItem = styled.div`
  padding: 12px;
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  border-radius: 8px;
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    transform: translateY(-1px);
  }
`;

const TermName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  margin-bottom: 4px;
`;

const TermDefinition = styled.div`
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  line-height: 1.4;
`;

const TermExample = styled.div`
  font-size: 11px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-style: italic;
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 6px;
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  font-size: 12px;
  margin-bottom: 12px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
  
  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 20px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-size: 12px;
`;

// Tokenomics glossary data
const GLOSSARY_TERMS = [
  {
    term: "Tokenomics",
    definition: "The study of the economic systems and mechanisms that govern the creation, distribution, and management of tokens in blockchain networks.",
    example: "Bitcoin's tokenomics includes a fixed supply of 21 million coins and a halving mechanism every 4 years."
  },
  {
    term: "Token Supply",
    definition: "The total number of tokens that exist or will ever exist in a cryptocurrency or token economy.",
    example: "Ethereum has no maximum supply, while Bitcoin has a fixed supply of 21 million coins."
  },
  {
    term: "Token Distribution",
    definition: "The process and mechanism by which tokens are allocated to different participants in the ecosystem.",
    example: "Initial token distribution might include 40% to investors, 30% to the team, and 30% to community rewards."
  },
  {
    term: "Token Utility",
    definition: "The specific functions and use cases that a token serves within its ecosystem.",
    example: "Ethereum's ETH token is used for gas fees, staking, and as a store of value."
  },
  {
    term: "Token Burn",
    definition: "The permanent removal of tokens from circulation, reducing the total supply.",
    example: "Binance Coin (BNB) burns tokens quarterly based on trading volume to reduce supply."
  },
  {
    term: "Staking",
    definition: "The process of locking up tokens to participate in network consensus and earn rewards.",
    example: "Ethereum 2.0 validators stake 32 ETH to participate in the network and earn staking rewards."
  },
  {
    term: "Governance Token",
    definition: "A token that gives holders the right to vote on protocol changes and decisions.",
    example: "UNI token holders can vote on Uniswap protocol upgrades and parameter changes."
  },
  {
    term: "Liquidity Mining",
    definition: "The process of providing liquidity to decentralized exchanges in exchange for token rewards.",
    example: "Users provide ETH/USDC liquidity to Uniswap and earn UNI tokens as rewards."
  },
  {
    term: "Token Vesting",
    definition: "The gradual release of tokens over time according to a predetermined schedule.",
    example: "Team tokens might vest over 4 years with a 1-year cliff before any tokens are released."
  },
  {
    term: "Token Inflation",
    definition: "The increase in token supply over time, which can affect token value.",
    example: "Some tokens have annual inflation rates of 2-5% to incentivize network participation."
  },
  {
    term: "Token Deflation",
    definition: "The decrease in token supply over time, often through burning mechanisms.",
    example: "Bitcoin's halving events reduce the rate of new coin creation, creating deflationary pressure."
  },
  {
    term: "Token Economics",
    definition: "The economic principles and models that govern token value and ecosystem sustainability.",
    example: "A well-designed token economy balances supply, demand, utility, and incentives."
  }
];

const InteractiveGlossary = ({ theme = 'light', isVisible = false, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedTerms, setHighlightedTerms] = useState(new Set());

  // Filter terms based on search
  const filteredTerms = GLOSSARY_TERMS.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Highlight terms in the page content
  useEffect(() => {
    if (isVisible) {
      highlightTermsInContent();
    } else {
      removeHighlights();
    }
  }, [isVisible]);

  const highlightTermsInContent = () => {
    const content = document.querySelector('main, .chapter-content, .content');
    if (!content) return;

    GLOSSARY_TERMS.forEach(({ term }) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      const walker = document.createTreeWalker(
        content,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        if (regex.test(node.textContent)) {
          textNodes.push(node);
        }
      }

      textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        if (parent.tagName !== 'SCRIPT' && parent.tagName !== 'STYLE') {
          const html = textNode.textContent.replace(regex, `<span class="glossary-term" data-term="${term}" style="background: rgba(102, 126, 234, 0.2); cursor: pointer; border-radius: 2px; padding: 1px 2px;">$&</span>`);
          const wrapper = document.createElement('div');
          wrapper.innerHTML = html;
          parent.replaceChild(wrapper, textNode);
        }
      });
    });

    // Add click handlers to highlighted terms
    document.querySelectorAll('.glossary-term').forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        const term = e.target.getAttribute('data-term');
        setSearchTerm(term);
      });
    });
  };

  const removeHighlights = () => {
    document.querySelectorAll('.glossary-term').forEach(element => {
      const parent = element.parentNode;
      parent.replaceChild(document.createTextNode(element.textContent), element);
      parent.normalize();
    });
  };

  if (!isVisible) return null;

  return (
    <GlossaryContainer theme={theme}>
      <GlossaryHeader>
        <GlossaryTitle theme={theme}>📖 Interactive Glossary</GlossaryTitle>
        <CloseButton theme={theme} onClick={onClose}>×</CloseButton>
      </GlossaryHeader>
      
      <SearchInput
        theme={theme}
        type="text"
        placeholder="Search terms..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {filteredTerms.length === 0 ? (
          <EmptyState theme={theme}>
            No terms found matching "{searchTerm}"
          </EmptyState>
        ) : (
          filteredTerms.map((term, index) => (
            <TermItem key={index} theme={theme}>
              <TermName theme={theme}>{term.term}</TermName>
              <TermDefinition theme={theme}>{term.definition}</TermDefinition>
              {term.example && (
                <TermExample theme={theme}>
                  Example: {term.example}
                </TermExample>
              )}
            </TermItem>
          ))
        )}
      </div>
    </GlossaryContainer>
  );
};

export default InteractiveGlossary;

