import React, { useState } from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  margin: 30px 0;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const TimelineTitle = styled.h3`
  text-align: center;
  color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  margin-bottom: 30px;
  font-size: 1.5rem;
`;

const TimelineWrapper = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 40px;
  width: 100%;
  
  &:nth-child(odd) {
    .timeline-content {
      margin-left: 0;
      margin-right: 55%;
      text-align: right;
      
      @media (max-width: 768px) {
        margin-left: 60px;
        margin-right: 0;
        text-align: left;
      }
    }
    
    .timeline-dot {
      left: 50%;
      transform: translateX(-50%);
      
      @media (max-width: 768px) {
        left: 20px;
      }
    }
  }
  
  &:nth-child(even) {
    .timeline-content {
      margin-left: 55%;
      margin-right: 0;
      text-align: left;
      
      @media (max-width: 768px) {
        margin-left: 60px;
        margin-right: 0;
        text-align: left;
      }
    }
    
    .timeline-dot {
      left: 50%;
      transform: translateX(-50%);
      
      @media (max-width: 768px) {
        left: 20px;
      }
    }
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${props => props.active ? '#10b981' : '#667eea'};
  border: 4px solid white;
  border-radius: 50%;
  top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  
  &:hover {
    transform: scale(1.2);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const TimelineContent = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(55, 65, 81, 0.8)' : 'rgba(247, 250, 252, 0.9)'};
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 15px;
  padding: 20px;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const TimelineDate = styled.div`
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#90cdf4' : '#2b6cb0'};
  font-size: 0.9rem;
  margin-bottom: 8px;
`;

const TimelineItemTitle = styled.h4`
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 10px;
  font-size: 1.1rem;
`;

const TimelineDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#4a5568'};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const TimelineImpact = styled.div`
  background: ${props => props.positive ? '#10b981' : props.negative ? '#ef4444' : '#f59e0b'};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  margin-top: 8px;
`;

const DetailPanel = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(55, 65, 81, 0.95)' : 'rgba(255, 255, 255, 0.98)'};
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 15px;
  padding: 25px;
  margin-top: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  h5 {
    color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
    margin-bottom: 15px;
    font-size: 1.1rem;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
  }
  
  li {
    color: ${props => props.theme === 'dark' ? '#a0aec0' : '#4a5568'};
    margin-bottom: 8px;
    font-size: 0.9rem;
  }
`;

const InteractiveTimeline = ({ theme = 'light' }) => {
  const [activeItem, setActiveItem] = useState(null);

  const timelineData = [
    {
      id: 1,
      date: '2009',
      title: 'Bitcoin Genesis Block',
      description: 'Satoshi Nakamoto mines the first Bitcoin block, creating the first cryptocurrency.',
      impact: 'positive',
      details: {
        title: 'Revolutionary Impact',
        points: [
          'First decentralized digital currency',
          'Proof-of-work consensus mechanism',
          'Fixed supply of 21 million BTC',
          'Open-source codebase'
        ]
      }
    },
    {
      id: 2,
      date: '2010',
      title: 'First Bitcoin Transaction',
      description: 'Laszlo Hanyecz pays 10,000 BTC for two pizzas, establishing Bitcoin as a medium of exchange.',
      impact: 'neutral',
      details: {
        title: 'Real-World Usage',
        points: [
          'First documented commercial transaction',
          'Demonstrated practical utility',
          'Established exchange value',
          'Community milestone celebration'
        ]
      }
    },
    {
      id: 3,
      date: '2013',
      title: 'Ethereum Whitepaper',
      description: 'Vitalik Buterin publishes the Ethereum whitepaper, introducing smart contracts.',
      impact: 'positive',
      details: {
        title: 'Smart Contract Revolution',
        points: [
          'Programmable blockchain platform',
          'Turing-complete smart contracts',
          'Ether (ETH) as fuel token',
          'Decentralized application support'
        ]
      }
    },
    {
      id: 4,
      date: '2015',
      title: 'Ethereum Mainnet Launch',
      description: 'Ethereum goes live with Frontier release, enabling smart contract deployment.',
      impact: 'positive',
      details: {
        title: 'Platform Launch',
        points: [
          'Proof-of-work consensus',
          'Smart contract execution',
          'Developer tooling',
          'Community building'
        ]
      }
    },
    {
      id: 5,
      date: '2017',
      title: 'ICO Boom & DeFi Emergence',
      description: 'Initial Coin Offerings become popular, and DeFi protocols begin development.',
      impact: 'mixed',
      details: {
        title: 'Mixed Outcomes',
        points: [
          'Innovation in fundraising',
          'Many failed projects',
          'DeFi protocol development',
          'Regulatory attention'
        ]
      }
    },
    {
      id: 6,
      date: '2020',
      title: 'DeFi Summer',
      description: 'Decentralized Finance protocols gain massive adoption and TVL growth.',
      impact: 'positive',
      details: {
        title: 'DeFi Explosion',
        points: [
          'Yield farming innovation',
          'Liquidity mining rewards',
          'AMM protocol growth',
          'Cross-chain bridges'
        ]
      }
    },
    {
      id: 7,
      date: '2022',
      title: 'Ethereum Merge',
      description: 'Ethereum transitions from Proof-of-Work to Proof-of-Stake consensus.',
      impact: 'positive',
      details: {
        title: 'Sustainability Milestone',
        points: [
          '99.95% energy reduction',
          'Staking rewards system',
          'Improved security',
          'Scalability foundation'
        ]
      }
    },
    {
      id: 8,
      date: '2023-2024',
      title: 'Layer 2 Scaling & Institutional Adoption',
      description: 'Rollup solutions mature and traditional finance begins embracing blockchain.',
      impact: 'positive',
      details: {
        title: 'Mainstream Integration',
        points: [
          'Layer 2 scaling solutions',
          'Institutional investment',
          'Regulatory clarity',
          'Real-world asset tokenization'
        ]
      }
    }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      case 'mixed': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <TimelineContainer theme={theme}>
      <TimelineTitle theme={theme}>
        🕒 Interactive Timeline: Evolution of Tokenomics
      </TimelineTitle>
      
      <TimelineWrapper>
        {timelineData.map((item) => (
          <TimelineItem key={item.id}>
            <TimelineDot
              active={activeItem === item.id}
              onClick={() => handleItemClick(item.id)}
            />
            <TimelineContent theme={theme}>
              <TimelineDate theme={theme}>{item.date}</TimelineDate>
              <TimelineItemTitle theme={theme}>{item.title}</TimelineItemTitle>
              <TimelineDescription theme={theme}>
                {item.description}
              </TimelineDescription>
              <TimelineImpact positive={item.impact === 'positive'} negative={item.impact === 'negative'}>
                {item.impact === 'positive' ? '✅ Positive' : 
                 item.impact === 'negative' ? '❌ Negative' : '⚠️ Mixed'}
              </TimelineImpact>
              
              {activeItem === item.id && (
                <DetailPanel theme={theme}>
                  <h5>{item.details.title}</h5>
                  <ul>
                    {item.details.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </DetailPanel>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  );
};

export default InteractiveTimeline;
