import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSettings } from '../contexts/SettingsContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { glossaryData, searchGlossary, getAllGlossaryTerms } from '../data/glossary.js';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  margin-bottom: 20px;
`;

const SearchSection = styled.div`
  margin-bottom: 30px;
`;

const SearchContainer = styled.div`
  display: flex;
  max-width: 600px;
  margin: 0 auto 20px;
  position: relative;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: 2px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 12px;
  font-size: 16px;
  background: ${props => props.theme === 'dark' ? '#2d3748' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
    box-shadow: 0 0 0 3px ${props => props.theme === 'dark' ? 'rgba(99, 179, 237, 0.1)' : 'rgba(49, 130, 206, 0.1)'};
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#718096' : '#a0aec0'};
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#718096' : '#cbd5e0'};
  }
`;

const SearchStats = styled.div`
  text-align: center;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-size: 14px;
`;

const CategorySection = styled.div`
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const GlossaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
`;

const GlossaryItem = styled.div`
  background: ${props => props.theme === 'dark' ? '#2d3748' : '#ffffff'};
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  }

  &.highlight {
    background: ${props => props.theme === 'dark' ? '#2c5282' : '#ebf8ff'};
    border-color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  }
`;

const TermTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  margin-bottom: 10px;
`;

const TermDefinition = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#4a5568'};
  margin: 0;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-size: 1.1rem;
`;

const Footer = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  text-align: center;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-size: 14px;
`;

const GlossaryPage = () => {
  const { darkMode } = useSettings();
  const { updateStudyTime } = useUserProgress();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [searchResults, setSearchResults] = useState('All terms shown');

  // Track time spent on glossary page
  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // in minutes
      if (timeSpent > 0) {
        updateStudyTime(timeSpent);
      }
    };
  }, [updateStudyTime]);

  // Group terms by category
  const categorizedTerms = {
    "General Blockchain Concepts": [
      "Blockchain", "Smart Contract", "Consensus Mechanism", "Proof-of-Work (PoW)", 
      "Proof-of-Stake (PoS)", "Gas Fees", "Layer 2", "Sidechains", "Cross-Chain Bridges", 
      "Interoperability", "Rollups (Optimistic / ZK)", "State Channels", "Relay Chain"
    ],
    "Token Supply & Economics": [
      "Tokenomics", "Token Supply", "Circulating Supply", "Max Supply", "Total Supply",
      "Minting", "Burning", "Inflation", "Inflationary Model", "Deflationary Model",
      "Dynamic Supply / Rebasing", "Token Sink", "Treasury", "Vesting", "Cliff",
      "Lock-up Period", "Staking", "Slashing", "Yield Farming", "Liquidity Mining",
      "Impermanent Loss", "Token Velocity", "Inflation Rate"
    ],
    "Token Types & Standards": [
      "Utility Token", "Security Token", "Governance Token", "Hybrid Token",
      "Stablecoin", "Algorithmic Stablecoins", "Synthetic Asset", "Derivative Token",
      "NFT (Non-Fungible Token)", "Fractionalized NFT", "ERC-20", "ERC-721",
      "ERC-1155", "ERC-404", "ERC-4626", "ERC-4907", "ERC-6551"
    ],
    "Governance & DAO Concepts": [
      "DAO (Decentralized Autonomous Organization)", "Proposal", "Voting Power",
      "Quorum", "Timelock", "Quadratic Voting", "On-chain Governance", "Off-chain Governance"
    ],
    "DeFi & Financial Mechanics": [
      "DeFi", "Collateral", "Collateralized Borrowing", "Lending Protocol",
      "AMM (Automated Market Maker)", "Liquidity", "Liquidity Pool (LP)", "Slippage",
      "Stablecoin Collateralization", "Protocol Fees", "Dispute Resolution",
      "Synthetic Exposure", "Leverage", "Capital Efficiency", "Treasury Management", "Oracle"
    ],
    "NFT & Metaverse": [
      "Metadata", "Provenance", "Dynamic/Evolving NFT", "Fractionalization",
      "Token-Gated Access", "Play-to-Earn", "Digital Collectibles", "Virtual Land"
    ],
    "Regulatory & Legal": [
      "Howey Test", "MiCA (Markets in Crypto-Assets Regulation)", "Security Classification",
      "Compliance", "Legal Exposure"
    ],
    "Additional Concepts": [
      "Game Theory", "Decentralized Applications (dApps)", "Velocity", "Network Effects",
      "Consensus", "Airdrop"
    ]
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTerms([]);
      setSearchResults('All terms shown');
    } else {
      const results = searchGlossary(searchTerm);
      setFilteredTerms(results);
      setSearchResults(results.length === 0 ? 'No results found' : `${results.length} of ${getAllGlossaryTerms().length} terms found`);
    }
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const renderGlossaryItems = (terms) => {
    return terms.map((term) => {
      const definition = glossaryData[term];
      if (!definition) return null;

      const isHighlighted = filteredTerms.length > 0 && filteredTerms.some(result => result.term === term);

      return (
        <GlossaryItem 
          key={term} 
          className={isHighlighted ? 'highlight' : ''}
          theme={darkMode ? 'dark' : 'light'}
        >
          <TermTitle theme={darkMode ? 'dark' : 'light'}>{term}</TermTitle>
          <TermDefinition theme={darkMode ? 'dark' : 'light'}>{definition}</TermDefinition>
        </GlossaryItem>
      );
    });
  };

  const renderCategory = (categoryName, terms) => {
    const categoryTerms = terms.filter(term => glossaryData[term]);
    
    if (searchTerm && filteredTerms.length > 0) {
      const matchingTerms = categoryTerms.filter(term => 
        filteredTerms.some(result => result.term === term)
      );
      if (matchingTerms.length === 0) return null;
      return (
        <CategorySection key={categoryName}>
          <CategoryTitle theme={darkMode ? 'dark' : 'light'}>
            {categoryName}
          </CategoryTitle>
          <GlossaryGrid>
            {renderGlossaryItems(matchingTerms)}
          </GlossaryGrid>
        </CategorySection>
      );
    }

    return (
      <CategorySection key={categoryName}>
        <CategoryTitle theme={darkMode ? 'dark' : 'light'}>
          {categoryName}
        </CategoryTitle>
        <GlossaryGrid>
          {renderGlossaryItems(categoryTerms)}
        </GlossaryGrid>
      </CategorySection>
    );
  };

  return (
    <Container>
      <Header>
        <Title theme={darkMode ? 'dark' : 'light'}>
          📚 Tokenomics Glossary
        </Title>
        <Subtitle theme={darkMode ? 'dark' : 'light'}>
          Complete Reference Guide for All Key Terms
        </Subtitle>
      </Header>

      <SearchSection>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="🔍 Search for terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            theme={darkMode ? 'dark' : 'light'}
          />
          {searchTerm && (
            <ClearButton 
              onClick={handleClearSearch}
              theme={darkMode ? 'dark' : 'light'}
            >
              Clear
            </ClearButton>
          )}
        </SearchContainer>
        <SearchStats theme={darkMode ? 'dark' : 'light'}>
          {searchResults}
        </SearchStats>
      </SearchSection>

      {searchTerm && filteredTerms.length === 0 ? (
        <NoResults theme={darkMode ? 'dark' : 'light'}>
          No terms found matching "{searchTerm}"
        </NoResults>
      ) : (
        Object.entries(categorizedTerms).map(([category, terms]) => 
          renderCategory(category, terms)
        )
      )}

      <Footer theme={darkMode ? 'dark' : 'light'}>
        <p><strong>💡 Tip:</strong> This glossary is continuously updated as new terms and concepts emerge in the rapidly evolving blockchain space.</p>
        <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>
      </Footer>
    </Container>
  );
};

export default GlossaryPage;





