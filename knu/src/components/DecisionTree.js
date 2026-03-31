import React, { useState } from 'react';
import styled from 'styled-components';

const DecisionContainer = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  margin: 30px 0;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const DecisionTitle = styled.h3`
  text-align: center;
  color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  margin-bottom: 30px;
  font-size: 1.5rem;
`;

const ScenarioCard = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(55, 65, 81, 0.8)' : 'rgba(247, 250, 252, 0.9)'};
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ScenarioTitle = styled.h4`
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 15px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ScenarioDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#4a5568'};
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const DecisionOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const DecisionButton = styled.button`
  background: ${props => props.selected ? '#3182ce' : 'transparent'};
  color: ${props => props.selected ? 'white' : props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  border: 2px solid ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  padding: 15px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
  
  &:hover {
    background: ${props => props.selected ? '#2c5282' : props.theme === 'dark' ? '#2c5282' : '#ebf8ff'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Enhanced selected state */
  ${props => props.selected && `
    background: #3182ce !important;
    color: white !important;
    border-color: #2c5282;
    box-shadow: 0 4px 15px rgba(49, 130, 206, 0.3);
    transform: scale(1.02);
  `}
  
  /* Active state for better feedback */
  &:active {
    transform: scale(0.98);
  }
`;

const OutcomePanel = styled.div`
  background: ${props => props.outcome === 'positive' ? 'rgba(16, 185, 129, 0.1)' : 
                        props.outcome === 'negative' ? 'rgba(239, 68, 68, 0.1)' : 
                        'rgba(245, 158, 11, 0.1)'};
  border: 1px solid ${props => props.outcome === 'positive' ? '#10b981' : 
                                props.outcome === 'negative' ? '#ef4444' : 
                                '#f59e0b'};
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  
  h5 {
    color: ${props => props.outcome === 'positive' ? '#10b981' : 
                      props.outcome === 'negative' ? '#ef4444' : 
                      '#f59e0b'};
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

const ResetButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 20px auto;
  display: block;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

const DecisionTree = ({ theme = 'light' }) => {
  const [selectedDecisions, setSelectedDecisions] = useState({});
  const [showOutcomes, setShowOutcomes] = useState(false);

  const scenarios = [
    {
      id: 1,
      title: '🚀 Launch Strategy Decision',
      description: 'You\'re launching a new DeFi protocol. Your team has limited resources and needs to decide on the initial token distribution strategy.',
      options: [
        {
          id: 'fair_launch',
          text: 'Fair Launch - No pre-mine, equal opportunity for all',
          outcome: {
            type: 'positive',
            title: '✅ Fair Launch Outcome',
            description: 'Your protocol gains strong community trust and organic growth.',
            points: [
              'High community engagement and ownership',
              'Strong initial liquidity from community',
              'Long-term sustainability focus',
              'Potential regulatory advantages'
            ]
          }
        },
        {
          id: 'vc_backed',
          text: 'VC-Backed - Significant allocation to venture capitalists',
          outcome: {
            type: 'mixed',
            title: '⚠️ VC-Backed Outcome',
            description: 'You get funding but face community skepticism and potential centralization.',
            points: [
              'Immediate funding and resources',
              'Professional guidance and connections',
              'Community concerns about centralization',
              'Pressure for quick returns'
            ]
          }
        },
        {
          id: 'team_heavy',
          text: 'Team-Heavy - Large allocation to team and advisors',
          outcome: {
            type: 'negative',
            title: '❌ Team-Heavy Outcome',
            description: 'Your protocol faces community backlash and trust issues.',
            points: [
              'Immediate community distrust',
              'Difficulty attracting users',
              'Regulatory scrutiny risk',
              'Poor long-term prospects'
            ]
          }
        }
      ]
    },
    {
      id: 2,
      title: '⚖️ Governance Attack Response',
      description: 'A whale has acquired 30% of your governance tokens and is threatening to pass harmful proposals. How do you respond?',
      options: [
        {
          id: 'implement_guardrails',
          text: 'Implement governance guardrails and timelocks',
          outcome: {
            type: 'positive',
            title: '✅ Guardrails Implementation',
            description: 'You successfully protect your protocol from governance attacks.',
            points: [
              'Enhanced security against whale manipulation',
              'Community confidence restored',
              'Long-term governance stability',
              'Sets precedent for other protocols'
            ]
          }
        },
        {
          id: 'negotiate',
          text: 'Try to negotiate with the whale',
          outcome: {
            type: 'mixed',
            title: '⚠️ Negotiation Attempt',
            description: 'You attempt diplomacy but risk appearing weak to the community.',
            points: [
              'Potential for peaceful resolution',
              'Risk of community perception issues',
              'Uncertain outcome',
              'Time-consuming process'
            ]
          }
        },
        {
          id: 'do_nothing',
          text: 'Do nothing and hope for the best',
          outcome: {
            type: 'negative',
            title: '❌ Inaction Outcome',
            description: 'Your protocol becomes vulnerable to governance attacks.',
            points: [
              'High risk of protocol takeover',
              'Community confidence destroyed',
              'Potential protocol failure',
              'Loss of user funds'
            ]
          }
        }
      ]
    },
    {
      id: 3,
      title: '💰 Token Utility Crisis',
      description: 'Your token price has dropped 80% and users are questioning its utility. The community is demanding immediate action.',
      options: [
        {
          id: 'burn_tokens',
          text: 'Implement aggressive token burning to reduce supply',
          outcome: {
            type: 'mixed',
            title: '⚠️ Token Burning Strategy',
            description: 'You reduce supply but may not address fundamental utility issues.',
            points: [
              'Immediate price support',
              'Reduced circulating supply',
              'May not solve core problems',
              'Temporary solution at best'
            ]
          }
        },
        {
          id: 'enhance_utility',
          text: 'Focus on building real utility and use cases',
          outcome: {
            type: 'positive',
            title: '✅ Utility Enhancement',
            description: 'You address the root cause and build sustainable value.',
            points: [
              'Long-term sustainable growth',
              'Real user adoption',
              'Stronger token fundamentals',
              'Community confidence restored'
            ]
          }
        },
        {
          id: 'pump_marketing',
          text: 'Launch aggressive marketing campaign to pump the price',
          outcome: {
            type: 'negative',
            title: '❌ Marketing Pump Strategy',
            description: 'You create artificial demand that will eventually collapse.',
            points: [
              'Temporary price increase',
              'No fundamental value creation',
              'Community trust destroyed',
              'Regulatory risk increased'
            ]
          }
        }
      ]
    }
  ];

  const handleDecision = (scenarioId, optionId) => {
    setSelectedDecisions(prev => ({
      ...prev,
      [scenarioId]: optionId
    }));
  };

  const handleShowOutcomes = () => {
    setShowOutcomes(true);
  };

  const handleReset = () => {
    setSelectedDecisions({});
    setShowOutcomes(false);
  };

  const allDecisionsMade = scenarios.every(scenario => selectedDecisions[scenario.id]);

  const getOutcome = (scenarioId) => {
    const selectedOptionId = selectedDecisions[scenarioId];
    if (!selectedOptionId) return null;
    
    const scenario = scenarios.find(s => s.id === scenarioId);
    return scenario.options.find(opt => opt.id === selectedOptionId)?.outcome;
  };

  return (
    <DecisionContainer theme={theme}>
      <DecisionTitle theme={theme}>
        🌳 Decision Tree: What Would You Do?
      </DecisionTitle>
      
      {scenarios.map((scenario) => (
        <ScenarioCard key={scenario.id} theme={theme}>
          <ScenarioTitle theme={theme}>
            {scenario.title}
          </ScenarioTitle>
          
          <ScenarioDescription theme={theme}>
            {scenario.description}
          </ScenarioDescription>
          
          <DecisionOptions>
            {scenario.options.map((option) => (
              <DecisionButton
                key={option.id}
                selected={selectedDecisions[scenario.id] === option.id}
                onClick={() => handleDecision(scenario.id, option.id)}
                theme={theme}
              >
                {option.text}
                {selectedDecisions[scenario.id] === option.id && (
                  <span style={{ 
                    marginLeft: '10px', 
                    fontSize: '1.2rem',
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}>
                    ✅
                  </span>
                )}
              </DecisionButton>
            ))}
          </DecisionOptions>
          
          {showOutcomes && selectedDecisions[scenario.id] && (
            <OutcomePanel 
              outcome={getOutcome(scenario.id)?.type}
              theme={theme}
            >
              <h5>
                {getOutcome(scenario.id)?.title}
              </h5>
              <p>{getOutcome(scenario.id)?.description}</p>
              <ul>
                {getOutcome(scenario.id)?.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </OutcomePanel>
          )}
        </ScenarioCard>
      ))}
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        {!showOutcomes ? (
          <DecisionButton
            onClick={handleShowOutcomes}
            disabled={!allDecisionsMade}
            theme={theme}
            style={{ 
              background: allDecisionsMade ? '#10b981' : '#6b7280',
              color: 'white',
              border: 'none',
              margin: '0 auto',
              display: 'block'
            }}
          >
            {allDecisionsMade ? '🎯 See Your Outcomes' : 'Make all decisions first'}
          </DecisionButton>
        ) : (
          <ResetButton onClick={handleReset}>
            🔄 Try Different Decisions
          </ResetButton>
        )}
      </div>
    </DecisionContainer>
  );
};

export default DecisionTree;
