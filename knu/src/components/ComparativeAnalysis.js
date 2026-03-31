import React, { useState } from 'react';
import styled from 'styled-components';

const ComparisonContainer = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  margin: 30px 0;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const ComparisonTitle = styled.h3`
  text-align: center;
  color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  margin-bottom: 30px;
  font-size: 1.5rem;
`;

const ProjectSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const ProjectButton = styled.button`
  background: ${props => props.selected ? '#3182ce' : 'transparent'};
  color: ${props => props.selected ? 'white' : props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  border: 2px solid ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? '#2c5282' : '#ebf8ff'};
    transform: translateY(-1px);
  }
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ProjectCard = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(55, 65, 81, 0.8)' : 'rgba(247, 250, 252, 0.9)'};
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const ProjectName = styled.h4`
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 8px;
  font-size: 1.3rem;
`;

const ProjectStatus = styled.div`
  display: inline-block;
  background: ${props => props.status === 'success' ? '#10b981' : 
                        props.status === 'failed' ? '#ef4444' : 
                        props.status === 'mixed' ? '#f59e0b' : '#6b7280'};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
`;

const MetricItem = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.6)' : 'rgba(255, 255, 255, 0.7)'};
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 10px;
  padding: 15px;
`;

const MetricLabel = styled.div`
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#90cdf4' : '#2b6cb0'};
  font-size: 0.9rem;
  margin-bottom: 8px;
`;

const MetricValue = styled.div`
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  font-size: 1rem;
  font-weight: 500;
`;

const MetricBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 4px;
  margin-top: 8px;
  overflow: hidden;
`;

const MetricFill = styled.div`
  height: 100%;
  background: ${props => props.color};
  width: ${props => props.percentage}%;
  transition: width 0.5s ease;
`;

const InsightPanel = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(55, 65, 81, 0.95)' : 'rgba(255, 255, 255, 0.98)'};
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 15px;
  padding: 25px;
  margin-top: 25px;
  
  h5 {
    color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
    margin-bottom: 15px;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  p {
    color: ${props => props.theme === 'dark' ? '#a0aec0' : '#4a5568'};
    margin-bottom: 15px;
    line-height: 1.6;
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

const ComparativeAnalysis = ({ theme = 'light' }) => {
  const [selectedProjects, setSelectedProjects] = useState(['bitcoin', 'ethereum']);

  const projects = {
    bitcoin: {
      name: 'Bitcoin (BTC)',
      status: 'success',
      description: 'The first and most successful cryptocurrency',
      metrics: {
        'Market Cap': { value: '$1.2T', percentage: 100, color: '#f7931a' },
        'Circulating Supply': { value: '19.5M / 21M', percentage: 93, color: '#f7931a' },
        'Network Security': { value: 'Extremely High', percentage: 95, color: '#10b981' },
        'Community Trust': { value: 'Very High', percentage: 90, color: '#10b981' },
        'Regulatory Status': { value: 'Increasing Clarity', percentage: 75, color: '#f59e0b' },
        'Developer Activity': { value: 'Active', percentage: 70, color: '#f59e0b' }
      },
      insights: {
        title: '💡 Bitcoin Success Factors',
        description: 'Bitcoin\'s success stems from its simplicity, scarcity, and first-mover advantage.',
        points: [
          'Fixed supply creates predictable scarcity',
          'Strong network effects drive adoption',
          'Community consensus prevents changes',
          'Proven security over 15+ years'
        ]
      }
    },
    ethereum: {
      name: 'Ethereum (ETH)',
      status: 'success',
      description: 'The leading smart contract platform',
      metrics: {
        'Market Cap': { value: '$450B', percentage: 37, color: '#627eea' },
        'Circulating Supply': { value: '120M (Inflationary)', percentage: 80, color: '#627eea' },
        'Network Security': { value: 'Very High', percentage: 90, color: '#10b981' },
        'Community Trust': { value: 'High', percentage: 85, color: '#10b981' },
        'Regulatory Status': { value: 'Uncertain', percentage: 60, color: '#f59e0b' },
        'Developer Activity': { value: 'Very Active', percentage: 95, color: '#10b981' }
      },
      insights: {
        title: '💡 Ethereum Innovation Factors',
        description: 'Ethereum\'s success comes from enabling innovation and adaptation.',
        points: [
          'Smart contracts enable new use cases',
          'Community-driven evolution',
          'Strong developer ecosystem',
          'Flexible tokenomics model'
        ]
      }
    },
    terra: {
      name: 'Terra (LUNA)',
      status: 'failed',
      description: 'Algorithmic stablecoin that collapsed in 2022',
      metrics: {
        'Market Cap': { value: '$0 (Collapsed)', percentage: 0, color: '#ef4444' },
        'Circulating Supply': { value: 'Destroyed', percentage: 0, color: '#ef4444' },
        'Network Security': { value: 'Compromised', percentage: 20, color: '#ef4444' },
        'Community Trust': { value: 'Destroyed', percentage: 10, color: '#ef4444' },
        'Regulatory Status': { value: 'Under Investigation', percentage: 30, color: '#f59e0b' },
        'Developer Activity': { value: 'Abandoned', percentage: 15, color: '#ef4444' }
      },
      insights: {
        title: '💡 Terra Failure Lessons',
        description: 'Terra\'s collapse demonstrates the risks of complex, untested economic mechanisms.',
        points: [
          'Algorithmic stability without collateral is risky',
          'Complex mechanisms create multiple failure points',
          'Insufficient risk management and safeguards',
          'Community trust is fragile and hard to rebuild'
        ]
      }
    },
    uniswap: {
      name: 'Uniswap (UNI)',
      status: 'success',
      description: 'Leading decentralized exchange protocol',
      metrics: {
        'Market Cap': { value: '$12B', percentage: 1, color: '#ff007a' },
        'Circulating Supply': { value: '600M / 1B', percentage: 60, color: '#ff007a' },
        'Network Security': { value: 'High', percentage: 85, color: '#10b981' },
        'Community Trust': { value: 'High', percentage: 80, color: '#10b981' },
        'Regulatory Status': { value: 'Uncertain', percentage: 65, color: '#f59e0b' },
        'Developer Activity': { value: 'Very Active', percentage: 90, color: '#10b981' }
      },
      insights: {
        title: '💡 Uniswap Success Factors',
        description: 'Uniswap\'s success comes from community governance and real utility.',
        points: [
          'Community ownership through fair distribution',
          'Real utility in DeFi ecosystem',
          'Transparent governance processes',
          'Continuous innovation and adaptation'
        ]
      }
    },
    bitconnect: {
      name: 'Bitconnect (BCC)',
      status: 'failed',
      description: 'Ponzi scheme disguised as a lending platform',
      metrics: {
        'Market Cap': { value: '$0 (Scam)', percentage: 0, color: '#ef4444' },
        'Circulating Supply': { value: 'Worthless', percentage: 0, color: '#ef4444' },
        'Network Security': { value: 'Fake', percentage: 5, color: '#ef4444' },
        'Community Trust': { value: 'Destroyed', percentage: 0, color: '#ef4444' },
        'Regulatory Status': { value: 'Banned', percentage: 10, color: '#ef4444' },
        'Developer Activity': { value: 'None', percentage: 0, color: '#ef4444' }
      },
      insights: {
        title: '💡 Bitconnect Warning Signs',
        description: 'Bitconnect demonstrates classic red flags of fraudulent projects.',
        points: [
          'Unrealistic returns not supported by economics',
          'Opaque business model and mechanics',
          'Pressure to recruit others (pyramid structure)',
          'No real utility or value creation'
        ]
      }
    }
  };

  const availableProjects = Object.keys(projects);
  const maxProjects = 2;

  const handleProjectToggle = (projectId) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    } else if (selectedProjects.length < maxProjects) {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  const getMetricColor = (percentage) => {
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    if (percentage >= 40) return '#f97316';
    return '#ef4444';
  };

  return (
    <ComparisonContainer theme={theme}>
      <ComparisonTitle theme={theme}>
        📊 Comparative Analysis: Tokenomics Projects
      </ComparisonTitle>
      
      <ProjectSelector>
        {availableProjects.map((projectId) => (
          <ProjectButton
            key={projectId}
            selected={selectedProjects.includes(projectId)}
            onClick={() => handleProjectToggle(projectId)}
            theme={theme}
            disabled={!selectedProjects.includes(projectId) && selectedProjects.length >= maxProjects}
          >
            {projects[projectId].name}
          </ProjectButton>
        ))}
      </ProjectSelector>
      
      <ComparisonGrid>
        {selectedProjects.map((projectId) => {
          const project = projects[projectId];
          return (
            <ProjectCard key={projectId} theme={theme}>
              <ProjectHeader theme={theme}>
                <ProjectName theme={theme}>{project.name}</ProjectName>
                <ProjectStatus status={project.status}>
                  {project.status === 'success' ? '✅ Success' : 
                   project.status === 'failed' ? '❌ Failed' : '⚠️ Mixed'}
                </ProjectStatus>
              </ProjectHeader>
              
              <MetricGrid>
                {Object.entries(project.metrics).map(([label, metric]) => (
                  <MetricItem key={label} theme={theme}>
                    <MetricLabel theme={theme}>{label}</MetricLabel>
                    <MetricValue theme={theme}>{metric.value}</MetricValue>
                    <MetricBar theme={theme}>
                      <MetricFill 
                        percentage={metric.percentage} 
                        color={getMetricColor(metric.percentage)}
                      />
                    </MetricBar>
                  </MetricItem>
                ))}
              </MetricGrid>
              
              <InsightPanel theme={theme}>
                <h5>{project.insights.title}</h5>
                <p>{project.insights.description}</p>
                <ul>
                  {project.insights.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </InsightPanel>
            </ProjectCard>
          );
        })}
      </ComparisonGrid>
      
      <div style={{ 
        textAlign: 'center', 
        color: theme === 'dark' ? '#a0aec0' : '#718096',
        fontSize: '0.9rem',
        fontStyle: 'italic'
      }}>
        💡 Select up to 2 projects to compare their tokenomics approaches and outcomes
      </div>
    </ComparisonContainer>
  );
};

export default ComparativeAnalysis;
