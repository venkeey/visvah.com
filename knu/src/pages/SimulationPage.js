import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSettings } from '../contexts/SettingsContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import DAOGovernanceSimulation from '../components/DAOGovernanceSimulation';

const SimulationContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

const SimulationHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const SimulationTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 15px;
`;

const SimulationDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  margin-bottom: 20px;
`;

const SimulationCard = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 8px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.6)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 8px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.6)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled.button`
  background: ${props => props.theme === 'dark'
    ? (props.variant === 'primary' ? 'linear-gradient(135deg, #4a5568, #2d3748)' : 'transparent')
    : (props.variant === 'primary' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent')};
  color: ${props => props.variant === 'primary' ? 'white' : props.theme === 'dark' ? '#90cdf4' : '#4c51bf'};
  border: 2px solid ${props => props.variant === 'primary' ? 'transparent' : props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  padding: 15px 30px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultsSection = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  margin-top: 30px;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ResultCard = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.6)' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

const ResultValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 8px;
`;

const ResultLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-weight: 500;
`;

const ChartContainer = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  margin-top: 30px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartPlaceholder = styled.div`
  text-align: center;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-size: 1.1rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
`;

const NavButton = styled(Link)`
  background: ${props => props.variant === 'primary' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : props.theme === 'dark' ? '#90cdf4' : '#4c51bf'};
  border: 2px solid ${props => props.variant === 'primary' ? 'transparent' : props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  padding: 15px 30px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
  flex: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: ${props => props.variant === 'primary' ? 'white' : props.theme === 'dark' ? '#90cdf4' : '#4c51bf'};
  }
`;

// Simulation data for different chapters
const simulationData = {
  'sim1': {
    title: 'Introduction to Tokenomics Simulation',
    description: 'Explore the fundamentals of tokenomics and economic principles',
    controls: [
      { id: 'tokenSupply', label: 'Token Supply (M)', type: 'number', min: 1, max: 1000, defaultValue: 100 },
      { id: 'demand', label: 'Market Demand (M)', type: 'number', min: 1, max: 1000, defaultValue: 80 },
      { id: 'networkEffect', label: 'Network Effect Strength', type: 'select', options: ['Low', 'Medium', 'High'], defaultValue: 'Medium' },
      { id: 'adoptionRate', label: 'Adoption Rate (%)', type: 'range', min: 0, max: 100, defaultValue: 30 }
    ],
    calculateResults: (params) => ({
      tokenPrice: Math.round((params.demand / params.tokenSupply) * 100) / 100,
      marketCap: Math.round(params.tokenSupply * (params.demand / params.tokenSupply)),
      networkValue: Math.round(params.adoptionRate * (params.networkEffect === 'High' ? 2 : params.networkEffect === 'Medium' ? 1.5 : 1)),
      scarcityScore: Math.round(Math.max(0, 100 - (params.tokenSupply / params.demand) * 100))
    })
  },
  'sim2': {
    title: 'Token Standards and Types Simulation',
    description: 'Explore different token standards and their use cases',
    controls: [
      { id: 'tokenType', label: 'Token Type', type: 'select', options: ['ERC-20', 'ERC-721', 'ERC-1155'], defaultValue: 'ERC-20' },
      { id: 'circulatingSupply', label: 'Circulating Supply', type: 'number', min: 1, max: 1000, defaultValue: 100 },
      { id: 'utility', label: 'Utility Level', type: 'select', options: ['Low', 'Medium', 'High'], defaultValue: 'Medium' },
      { id: 'interoperability', label: 'Cross-Chain Support', type: 'select', options: ['None', 'Limited', 'Full'], defaultValue: 'Limited' }
    ],
    calculateResults: (params) => ({
      fungibility: params.tokenType === 'ERC-20' ? 100 : params.tokenType === 'ERC-721' ? 0 : 50,
      gasEfficiency: params.tokenType === 'ERC-1155' ? 90 : params.tokenType === 'ERC-20' ? 85 : 70,
      utilityScore: params.utility === 'High' ? 90 : params.utility === 'Medium' ? 60 : 30,
      interoperabilityScore: params.interoperability === 'Full' ? 100 : params.interoperability === 'Limited' ? 60 : 0
    })
  },
  'sim3': {
    title: 'Token Design Principles Simulation',
    description: 'Design effective token economies with proper incentives',
    controls: [
      { id: 'supplyModel', label: 'Supply Model', type: 'select', options: ['Fixed', 'Inflationary', 'Deflationary'], defaultValue: 'Fixed' },
      { id: 'incentiveStructure', label: 'Incentive Structure', type: 'select', options: ['Staking', 'Liquidity', 'Governance', 'Hybrid'], defaultValue: 'Hybrid' },
      { id: 'networkEffect', label: 'Network Effect Multiplier', type: 'range', min: 1, max: 5, defaultValue: 2 },
      { id: 'alignment', label: 'Stakeholder Alignment (%)', type: 'range', min: 0, max: 100, defaultValue: 75 }
    ],
    calculateResults: (params) => ({
      sustainabilityScore: params.supplyModel === 'Fixed' ? 80 : params.supplyModel === 'Deflationary' ? 85 : 70,
      incentiveEffectiveness: params.incentiveStructure === 'Hybrid' ? 90 : params.incentiveStructure === 'Staking' ? 75 : 65,
      networkGrowth: Math.round(params.networkEffect * 25),
      alignmentScore: params.alignment
    })
  },
  'sim4': {
    title: 'Distribution and Supply Mechanisms Simulation',
    description: 'Explore token distribution strategies and supply management',
    controls: [
      { id: 'distributionMethod', label: 'Distribution Method', type: 'select', options: ['ICO', 'IDO', 'Airdrop', 'Mining'], defaultValue: 'IDO' },
      { id: 'initialAllocation', label: 'Initial Allocation (%)', type: 'range', min: 10, max: 100, defaultValue: 60 },
      { id: 'vestingPeriod', label: 'Vesting Period (Months)', type: 'range', min: 0, max: 48, defaultValue: 12 },
      { id: 'inflationRate', label: 'Annual Inflation Rate (%)', type: 'range', min: 0, max: 20, defaultValue: 5 }
    ],
    calculateResults: (params) => ({
      decentralizationScore: params.distributionMethod === 'Airdrop' ? 90 : params.distributionMethod === 'Mining' ? 85 : params.distributionMethod === 'IDO' ? 70 : 60,
      priceStability: Math.max(0, 100 - params.inflationRate * 3),
      liquidityScore: params.distributionMethod === 'IDO' ? 85 : params.distributionMethod === 'ICO' ? 70 : 60,
      communityOwnership: Math.round(params.initialAllocation * 0.8)
    })
  },
  'sim5': {
    title: 'Token Utility and Use Cases Simulation',
    description: 'Explore real-world token applications and utility scenarios',
    controls: [
      { id: 'useCase', label: 'Primary Use Case', type: 'select', options: ['DeFi', 'NFTs', 'Governance', 'Payments'], defaultValue: 'DeFi' },
      { id: 'adoptionRate', label: 'Adoption Rate (%)', type: 'range', min: 0, max: 100, defaultValue: 40 },
      { id: 'networkEffect', label: 'Network Effect', type: 'range', min: 1, max: 10, defaultValue: 5 },
      { id: 'competition', label: 'Competition Level', type: 'select', options: ['Low', 'Medium', 'High'], defaultValue: 'Medium' }
    ],
    calculateResults: (params) => ({
      utilityScore: params.useCase === 'DeFi' ? 85 : params.useCase === 'Governance' ? 80 : params.useCase === 'NFTs' ? 75 : 70,
      adoptionPotential: Math.round(params.adoptionRate * (params.networkEffect / 5)),
      competitiveAdvantage: params.competition === 'Low' ? 90 : params.competition === 'Medium' ? 70 : 50,
      marketFit: Math.round((params.utilityScore + params.adoptionPotential) / 2)
    })
  },
  'sim6': {
    title: '🏛️ DAO Governance Exam - Pass the Test!',
    description: 'EXAM MODE: Adjust the parameters to achieve the target scores and PASS the DAO Governance certification!',
    controls: [
      { id: 'votingMechanism', label: 'Voting Mechanism', type: 'select', options: ['One Token One Vote', 'Quadratic Voting', 'Delegation', 'Time-Weighted', 'Conviction Voting'], defaultValue: 'One Token One Vote' },
      { id: 'voterParticipation', label: 'Voter Participation (%)', type: 'range', min: 0, max: 100, defaultValue: 0 },
      { id: 'quorumThreshold', label: 'Quorum Threshold (%)', type: 'range', min: 10, max: 90, defaultValue: 0 },
      { id: 'proposalComplexity', label: 'Proposal Complexity', type: 'select', options: ['Simple', 'Moderate', 'Complex'], defaultValue: 'Complex' },
      { id: 'whaleConcentration', label: 'Whale Concentration (%)', type: 'range', min: 0, max: 80, defaultValue: 0 },
      { id: 'delegationRate', label: 'Delegation Rate (%)', type: 'range', min: 0, max: 100, defaultValue: 0 },
      { id: 'timeLockDuration', label: 'Time Lock Duration (Days)', type: 'range', min: 0, max: 30, defaultValue: 0 },
      { id: 'vetoThreshold', label: 'Veto Threshold (%)', type: 'range', min: 0, max: 50, defaultValue: 0 }
    ],
    calculateResults: (params) => {
      // Calculate decentralization score based on voting mechanism and whale concentration
      let decentralizationScore = 70;
      if (params.votingMechanism === 'Quadratic Voting') decentralizationScore = 90;
      else if (params.votingMechanism === 'Delegation') decentralizationScore = 85;
      else if (params.votingMechanism === 'Time-Weighted') decentralizationScore = 80;
      else if (params.votingMechanism === 'Conviction Voting') decentralizationScore = 88;
      
      // Adjust for whale concentration
      decentralizationScore = Math.max(30, decentralizationScore - (params.whaleConcentration * 0.5));
      
      // Calculate governance efficiency
      const governanceEfficiency = params.quorumThreshold === 0 ? 0 : Math.min(100, (params.voterParticipation / params.quorumThreshold) * 100);
      
      // Calculate decision quality based on complexity and participation
      let decisionQuality = 65;
      if (params.proposalComplexity === 'Simple') decisionQuality = 85;
      else if (params.proposalComplexity === 'Moderate') decisionQuality = 75;
      
      // Boost decision quality with higher participation
      decisionQuality = Math.min(100, decisionQuality + (params.voterParticipation * 0.2));
      
      // Calculate attack resistance
      const attackResistance = Math.max(20, 100 - (params.whaleConcentration * 0.8) - (params.voterParticipation < 30 ? 30 : 0));
      
      // Calculate delegation effectiveness
      const delegationEffectiveness = params.votingMechanism === 'Delegation' ? 
        Math.min(100, params.delegationRate * 1.2) : 0;
      
      return {
        decentralizationScore: Math.round(decentralizationScore),
        governanceEfficiency: Math.round(governanceEfficiency),
        decisionQuality: Math.round(decisionQuality),
        participationRate: params.voterParticipation,
        attackResistance: Math.round(attackResistance),
        delegationEffectiveness: Math.round(delegationEffectiveness),
        timeLockSecurity: Math.min(100, params.timeLockDuration * 3.33),
        vetoProtection: Math.min(100, (50 - params.vetoThreshold) * 2)
      };
    }
  },
  'sim7': {
    title: 'Economic Models and Incentives Simulation',
    description: 'Explore incentive structures, game theory, and economic models',
    controls: [
      { id: 'economicModel', label: 'Economic Model', type: 'select', options: ['Inflationary', 'Deflationary', 'Stable', 'Hybrid'], defaultValue: 'Hybrid' },
      { id: 'stakingReward', label: 'Staking Reward Rate (%)', type: 'range', min: 0, max: 50, defaultValue: 8 },
      { id: 'liquidityIncentive', label: 'Liquidity Incentive (%)', type: 'range', min: 0, max: 30, defaultValue: 5 },
      { id: 'lockDuration', label: 'Average Lock Duration (Months)', type: 'range', min: 1, max: 48, defaultValue: 12 }
    ],
    calculateResults: (params) => ({
      sustainabilityScore: params.economicModel === 'Stable' ? 90 : params.economicModel === 'Hybrid' ? 80 : params.economicModel === 'Deflationary' ? 75 : 65,
      incentiveEffectiveness: Math.round((params.stakingReward * 0.4 + params.liquidityIncentive * 0.3 + params.lockDuration * 0.3)),
      longTermAlignment: Math.min(100, params.lockDuration * 2),
      economicStability: params.economicModel === 'Stable' ? 95 : params.economicModel === 'Hybrid' ? 85 : 70
    })
  },
  'sim8': {
    title: 'Token Valuation and Pricing Simulation',
    description: 'Explore token valuation methods and market dynamics',
    controls: [
      { id: 'valuationMethod', label: 'Valuation Method', type: 'select', options: ['DCF', 'NVT Ratio', 'TVL', 'Comparable'], defaultValue: 'DCF' },
      { id: 'revenueGrowth', label: 'Revenue Growth Rate (%)', type: 'range', min: -50, max: 200, defaultValue: 25 },
      { id: 'discountRate', label: 'Discount Rate (%)', type: 'range', min: 5, max: 30, defaultValue: 15 },
      { id: 'marketSentiment', label: 'Market Sentiment', type: 'select', options: ['Bearish', 'Neutral', 'Bullish'], defaultValue: 'Neutral' }
    ],
    calculateResults: (params) => ({
      intrinsicValue: Math.round((100 * (1 + params.revenueGrowth / 100)) / (params.discountRate / 100)),
      marketMultiplier: params.marketSentiment === 'Bullish' ? 1.5 : params.marketSentiment === 'Neutral' ? 1.0 : 0.7,
      valuationAccuracy: params.valuationMethod === 'DCF' ? 85 : params.valuationMethod === 'NVT Ratio' ? 80 : 75,
      riskAdjustedReturn: Math.round((params.revenueGrowth - params.discountRate) * (params.marketSentiment === 'Bullish' ? 1.2 : 1))
    })
  },
  'sim9': {
    title: 'Risk Assessment Simulation',
    description: 'Analyze and manage risks in tokenomics design',
    controls: [
      { id: 'marketVolatility', label: 'Market Volatility (%)', type: 'range', min: 0, max: 100, defaultValue: 50 },
      { id: 'liquidity', label: 'Liquidity Pool Size ($M)', type: 'number', min: 1, max: 1000, defaultValue: 100 },
      { id: 'governanceParticipation', label: 'Governance Participation (%)', type: 'range', min: 0, max: 100, defaultValue: 30 },
      { id: 'regulatoryRisk', label: 'Regulatory Risk Level', type: 'select', options: ['Low', 'Medium', 'High'], defaultValue: 'Medium' }
    ],
    calculateResults: (params) => ({
      riskScore: Math.round((params.marketVolatility * 0.3 + (100 - params.liquidity / 10) * 0.2 + (100 - params.governanceParticipation) * 0.3 + (params.regulatoryRisk === 'High' ? 100 : params.regulatoryRisk === 'Medium' ? 50 : 0) * 0.2)),
      volatilityImpact: Math.round(params.marketVolatility * 1.5),
      liquidityRisk: Math.round(Math.max(0, 100 - params.liquidity / 5)),
      governanceRisk: Math.round(100 - params.governanceParticipation)
    })
  },
  'sim10': {
    title: 'Token Valuation Simulation',
    description: 'Calculate token value based on various economic factors',
    controls: [
      { id: 'circulatingSupply', label: 'Circulating Supply (M)', type: 'number', min: 1, max: 1000, defaultValue: 100 },
      { id: 'marketCap', label: 'Market Cap ($M)', type: 'number', min: 1, max: 10000, defaultValue: 1000 },
      { id: 'burnRate', label: 'Burn Rate (%)', type: 'range', min: 0, max: 10, defaultValue: 2 },
      { id: 'stakingYield', label: 'Staking Yield (%)', type: 'range', min: 0, max: 50, defaultValue: 8 }
    ],
    calculateResults: (params) => ({
      tokenPrice: Math.round((params.marketCap / params.circulatingSupply) * 100) / 100,
      annualBurn: Math.round(params.circulatingSupply * (params.burnRate / 100)),
      stakingRewards: Math.round(params.marketCap * (params.stakingYield / 100)),
      priceImpact: Math.round((params.burnRate * 2 + params.stakingYield * 0.5) * 10) / 10
    })
  },
  'sim11': {
    title: 'Economic Model Simulation',
    description: 'Explore different economic models and their impacts',
    controls: [
      { id: 'modelType', label: 'Economic Model', type: 'select', options: ['Deflationary', 'Inflationary', 'Stable', 'Hybrid'], defaultValue: 'Deflationary' },
      { id: 'initialSupply', label: 'Initial Supply (M)', type: 'number', min: 1, max: 1000, defaultValue: 100 },
      { id: 'growthRate', label: 'Growth Rate (%)', type: 'range', min: -20, max: 50, defaultValue: 5 },
      { id: 'timeHorizon', label: 'Time Horizon (Years)', type: 'range', min: 1, max: 10, defaultValue: 5 }
    ],
    calculateResults: (params) => {
      const finalSupply = params.initialSupply * Math.pow(1 + params.growthRate / 100, params.timeHorizon);
      const inflationRate = params.modelType === 'Deflationary' ? -5 : params.modelType === 'Inflationary' ? 10 : params.modelType === 'Stable' ? 0 : 2;
      return {
        finalSupply: Math.round(finalSupply * 100) / 100,
        inflationRate: inflationRate,
        priceStability: params.modelType === 'Stable' ? 95 : params.modelType === 'Hybrid' ? 80 : params.modelType === 'Deflationary' ? 70 : 60,
        adoptionPotential: params.modelType === 'Hybrid' ? 85 : params.modelType === 'Stable' ? 80 : params.modelType === 'Deflationary' ? 75 : 65
      };
    }
  },
  'sim12': {
    title: 'Governance Simulation',
    description: 'Simulate governance mechanisms and voting outcomes',
    controls: [
      { id: 'voterParticipation', label: 'Voter Participation (%)', type: 'range', min: 0, max: 100, defaultValue: 60 },
      { id: 'quorumThreshold', label: 'Quorum Threshold (%)', type: 'range', min: 10, max: 90, defaultValue: 50 },
      { id: 'proposalType', label: 'Proposal Type', type: 'select', options: ['Tokenomics Change', 'Governance Update', 'Treasury Allocation', 'Protocol Upgrade'], defaultValue: 'Tokenomics Change' },
      { id: 'stakeholderDistribution', label: 'Stakeholder Distribution', type: 'select', options: ['Concentrated', 'Distributed', 'Balanced'], defaultValue: 'Balanced' }
    ],
    calculateResults: (params) => {
      const proposalSuccess = params.voterParticipation >= params.quorumThreshold;
      const governanceEfficiency = Math.min(100, (params.voterParticipation / params.quorumThreshold) * 100);
      const decentralizationScore = params.stakeholderDistribution === 'Distributed' ? 90 : params.stakeholderDistribution === 'Balanced' ? 70 : 40;
      return {
        proposalSuccess: proposalSuccess,
        governanceEfficiency: Math.round(governanceEfficiency),
        decentralizationScore: decentralizationScore,
        voterTurnout: params.voterParticipation
      };
    }
  }
};

const SimulationPage = () => {
  const { simulationId } = useParams();
  const { darkMode } = useSettings();
  const { completeSimulation, getSimulationProgress } = useUserProgress();
  const [simulation, setSimulation] = useState(null);
  const [params, setParams] = useState({});
  const [results, setResults] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const foundSimulation = simulationData[simulationId];
    if (foundSimulation) {
      setSimulation(foundSimulation);
      // Initialize default parameters
      const defaultParams = {};
      foundSimulation.controls.forEach(control => {
        defaultParams[control.id] = control.defaultValue;
      });
      setParams(defaultParams);
      
      // Start tracking simulation time
      setStartTime(Date.now());
      
      // Check if simulation is already completed
      const progress = getSimulationProgress(simulationId);
      setIsCompleted(progress.completed);
    }
  }, [simulationId, getSimulationProgress]);

  // Scroll to top when simulation changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [simulationId]);

  const handleParamChange = (paramId, value) => {
    setParams(prev => ({
      ...prev,
      [paramId]: value
    }));
  };

  const runSimulation = () => {
    if (simulation && simulation.calculateResults) {
      const calculatedResults = simulation.calculateResults(params);
      setResults(calculatedResults);
      
      // Track simulation completion if not already tracked
      if (startTime && !isCompleted) {
        const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // in minutes
        completeSimulation(simulationId, timeSpent, params);
        setIsCompleted(true);
      }
    }
  };

  const resetSimulation = () => {
    const defaultParams = {};
    simulation.controls.forEach(control => {
      defaultParams[control.id] = control.defaultValue;
    });
    setParams(defaultParams);
    setResults(null);
  };

  if (!simulation) {
    return (
      <SimulationContainer>
        <SimulationHeader theme={darkMode ? 'dark' : 'light'}>
          <SimulationTitle theme={darkMode ? 'dark' : 'light'}>Simulation Not Found</SimulationTitle>
          <SimulationDescription theme={darkMode ? 'dark' : 'light'}>
            The requested simulation could not be found.
          </SimulationDescription>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button theme={darkMode ? 'dark' : 'light'}>
              Return to Home
            </Button>
          </Link>
        </SimulationHeader>
      </SimulationContainer>
    );
  }

  return (
    <SimulationContainer>
      <SimulationHeader theme={darkMode ? 'dark' : 'light'}>
        <SimulationTitle theme={darkMode ? 'dark' : 'light'}>🎮 {simulation.title}</SimulationTitle>
        <SimulationDescription theme={darkMode ? 'dark' : 'light'}>
          {simulation.description}
        </SimulationDescription>
        {isCompleted && (
          <div style={{
            display: 'inline-block',
            background: '#10b981',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginTop: '15px'
          }}>
            ✅ Completed
          </div>
        )}
      </SimulationHeader>

      <SimulationCard theme={darkMode ? 'dark' : 'light'}>
        <ControlPanel>
          {simulation.controls.map(control => (
            <ControlGroup key={control.id}>
              <Label theme={darkMode ? 'dark' : 'light'}>{control.label}</Label>
              {control.type === 'range' && (
                <Input
                  type="range"
                  min={control.min}
                  max={control.max}
                  value={params[control.id] || control.defaultValue}
                  onChange={(e) => handleParamChange(control.id, parseFloat(e.target.value))}
                  theme={darkMode ? 'dark' : 'light'}
                />
              )}
              {control.type === 'number' && (
                <Input
                  type="number"
                  min={control.min}
                  max={control.max}
                  value={params[control.id] || control.defaultValue}
                  onChange={(e) => handleParamChange(control.id, parseFloat(e.target.value))}
                  theme={darkMode ? 'dark' : 'light'}
                />
              )}
              {control.type === 'select' && (
                <Select
                  value={params[control.id] || control.defaultValue}
                  onChange={(e) => handleParamChange(control.id, e.target.value)}
                  theme={darkMode ? 'dark' : 'light'}
                >
                  {control.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              )}
            </ControlGroup>
          ))}
        </ControlPanel>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Button
            onClick={runSimulation}
            variant="primary"
            theme={darkMode ? 'dark' : 'light'}
          >
            🚀 Run Simulation
          </Button>
          <Button
            onClick={resetSimulation}
            theme={darkMode ? 'dark' : 'light'}
          >
            🔄 Reset
          </Button>
        </div>

        {results && (
          <ResultsSection theme={darkMode ? 'dark' : 'light'}>
            <h3 style={{ color: darkMode ? '#e2e8f0' : '#2d3748', marginBottom: '20px' }}>
              📊 Simulation Results
            </h3>
            <ResultsGrid>
              {Object.entries(results).map(([key, value]) => (
                <ResultCard key={key} theme={darkMode ? 'dark' : 'light'}>
                  <ResultValue theme={darkMode ? 'dark' : 'light'}>
                    {typeof value === 'boolean' ? (value ? '✅' : '❌') : 
                     typeof value === 'number' ? Number(value).toFixed(2) : value}
                    {typeof value === 'number' && key.includes('Rate') && '%'}
                    {typeof value === 'number' && key.includes('Score') && '%'}
                    {typeof value === 'number' && key.includes('Price') && '$'}
                    {typeof value === 'number' && key.includes('Supply') && 'M'}
                    {typeof value === 'number' && key.includes('Cap') && 'M'}
                    {typeof value === 'number' && key.includes('Rewards') && '$'}
                    {typeof value === 'number' && key.includes('Burn') && 'M'}
                  </ResultValue>
                  <ResultLabel theme={darkMode ? 'dark' : 'light'}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </ResultLabel>
                </ResultCard>
              ))}
            </ResultsGrid>
          </ResultsSection>
        )}

        {/* Special DAO Governance Simulation for sim6 */}
        {simulationId === 'sim6' && results && (
          <div style={{ marginTop: '30px' }}>
            <DAOGovernanceSimulation params={params} results={results} />
          </div>
        )}

        <ChartContainer theme={darkMode ? 'dark' : 'light'}>
          <ChartPlaceholder theme={darkMode ? 'dark' : 'light'}>
            📈 Interactive charts and visualizations coming soon!
            <br />
            <small>Advanced analytics and real-time data visualization will be added in future updates.</small>
          </ChartPlaceholder>
        </ChartContainer>

        <NavigationButtons>
          <NavButton to="/" theme={darkMode ? 'dark' : 'light'}>
            🏠 Back to Home
          </NavButton>
          <NavButton to={`/quiz/${simulationId.replace('sim', 'quiz')}`} variant="primary" theme={darkMode ? 'dark' : 'light'}>
            📝 Take Quiz →
          </NavButton>
        </NavigationButtons>
      </SimulationCard>
    </SimulationContainer>
  );
};

export default SimulationPage;






