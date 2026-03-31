import React from 'react';
import styled from 'styled-components';
import { useSettings } from '../contexts/SettingsContext';
import GlossaryTooltip from './GlossaryTooltip';
import { parseGlossaryTerms } from '../utils/glossaryParser';

const ExampleContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ExampleSection = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 30px;
  margin: 20px 0;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const Title = styled.h2`
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const Paragraph = styled.p`
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  line-height: 1.8;
  margin-bottom: 15px;
  font-size: 16px;
`;

const InfoBox = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(99, 179, 237, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(99, 179, 237, 0.3)' : 'rgba(102, 126, 234, 0.3)'};
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  color: ${props => props.theme === 'dark' ? '#90cdf4' : '#4c51bf'};
  font-size: 14px;
`;

const GlossaryExample = () => {
  const { darkMode, tooltipsEnabled } = useSettings();

  const exampleText = `
    Tokenomics is the study of how tokens function within blockchain ecosystems. 
    Understanding concepts like Proof-of-Work, Proof-of-Stake, and Smart Contracts 
    is essential for designing effective token economics. DeFi protocols often use 
    Liquidity Pools and Automated Market Makers to facilitate trading, while 
    Governance Tokens allow holders to participate in protocol decisions.
  `;

  // Parse the text to add glossary tooltips
  const parsedText = parseGlossaryTerms(exampleText, darkMode ? 'dark' : 'light', tooltipsEnabled);

  return (
    <ExampleContainer>
      <ExampleSection theme={darkMode ? 'dark' : 'light'}>
        <Title theme={darkMode ? 'dark' : 'light'}>
          📚 Glossary Tooltip Examples
        </Title>
        
        <InfoBox theme={darkMode ? 'dark' : 'light'}>
          💡 <strong>How to use:</strong> Hover over the highlighted terms below to see their definitions. 
          You can toggle tooltips on/off in the settings panel.
        </InfoBox>

        <Paragraph theme={darkMode ? 'dark' : 'light'}>
          {parsedText}
        </Paragraph>

        <Paragraph theme={darkMode ? 'dark' : 'light'}>
          Here are some individual examples: <GlossaryTooltip term="NFT (Non-Fungible Token)" theme={darkMode ? 'dark' : 'light'} enabled={tooltipsEnabled}>NFT</GlossaryTooltip>, 
          <GlossaryTooltip term="DAO (Decentralized Autonomous Organization)" theme={darkMode ? 'dark' : 'light'} enabled={tooltipsEnabled}> DAO</GlossaryTooltip>, and 
          <GlossaryTooltip term="Stablecoin" theme={darkMode ? 'dark' : 'light'} enabled={tooltipsEnabled}> Stablecoin</GlossaryTooltip> are important concepts in the crypto space.
        </Paragraph>

        <Paragraph theme={darkMode ? 'dark' : 'light'}>
          Technical terms like <GlossaryTooltip term="Layer 2" theme={darkMode ? 'dark' : 'light'} enabled={tooltipsEnabled}>Layer 2</GlossaryTooltip>, 
          <GlossaryTooltip term="Cross-Chain Bridges" theme={darkMode ? 'dark' : 'light'} enabled={tooltipsEnabled}> Cross-Chain Bridges</GlossaryTooltip>, and 
          <GlossaryTooltip term="Rollups (Optimistic / ZK)" theme={darkMode ? 'dark' : 'light'} enabled={tooltipsEnabled}> Rollups</GlossaryTooltip> 
          are crucial for blockchain scalability.
        </Paragraph>
      </ExampleSection>

      <ExampleSection theme={darkMode ? 'dark' : 'light'}>
        <Title theme={darkMode ? 'dark' : 'light'}>
          🔧 How It Works
        </Title>
        
        <Paragraph theme={darkMode ? 'dark' : 'light'}>
          The glossary tooltip system automatically detects key terms in the text and adds interactive tooltips. 
          When you hover over highlighted terms, you'll see their definitions and explanations.
        </Paragraph>

        <Paragraph theme={darkMode ? 'dark' : 'light'}>
          You can customize the tooltip behavior in the settings panel, including enabling/disabling tooltips 
          and adjusting their appearance for better readability.
        </Paragraph>
      </ExampleSection>
    </ExampleContainer>
  );
};

export default GlossaryExample;



