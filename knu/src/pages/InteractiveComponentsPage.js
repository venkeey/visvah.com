import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSettings } from '../contexts/SettingsContext';
import InteractiveTimeline from '../components/InteractiveTimeline';
import DecisionTree from '../components/DecisionTree';
import ComparativeAnalysis from '../components/ComparativeAnalysis';
import MoodleChapter10Demo from '../components/MoodleChapter10Demo';

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme === 'dark' ? '#1a202c' : '#f7fafc'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  transition: all 0.3s ease;
`;

const Header = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  padding: 30px 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  margin-bottom: 15px;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-size: 1.1rem;
  margin-bottom: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 25px;
`;

const NavButton = styled(Link)`
  background: ${props => props.type === 'back' 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
  color: white;
  text-decoration: none;
  padding: 15px 25px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    filter: brightness(1.1);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h2 {
    color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
    font-size: 2rem;
    margin-bottom: 15px;
  }
  
  p {
    color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
    font-size: 1.1rem;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const InteractiveComponentsPage = () => {
  const { chapterId } = useParams();
  const { darkMode } = useSettings();
  const theme = darkMode ? 'dark' : 'light';
  const [showMoodleDemo, setShowMoodleDemo] = useState(false);

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapterId]);
  
  // Only allow Chapter 10 for this demo
  if (chapterId !== '10') {
    return (
      <Container theme={theme}>
        <Header theme={theme}>
          <Title theme={theme}>🚫 Access Restricted</Title>
          <Subtitle theme={theme}>
            This interactive components page is currently only available for Chapter 10.
          </Subtitle>
          <NavigationButtons>
            <NavButton to="/" type="home">🏠 Go Home</NavButton>
          </NavigationButtons>
        </Header>
      </Container>
    );
  }

  // Show Moodle demo if toggled
  if (showMoodleDemo) {
    return (
      <div>
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '20px', 
          zIndex: 1000 
        }}>
          <NavButton 
            onClick={() => setShowMoodleDemo(false)}
            type="back"
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '10px 20px',
              fontSize: '0.9rem'
            }}
          >
            ← Back to Interactive Components
          </NavButton>
        </div>
        <MoodleChapter10Demo theme={theme} />
      </div>
    );
  }

  return (
    <Container theme={theme}>
      <Header theme={theme}>
        <Title theme={theme}>
          🎯 Chapter 10: Interactive Case Studies
        </Title>
        <Subtitle theme={theme}>
          Dive deep into real-world tokenomics examples through interactive experiences. 
          Explore the evolution of blockchain, make critical decisions, and analyze 
          project comparisons to understand what works and what doesn't.
        </Subtitle>
        
                 <NavigationButtons>
           <NavButton to={`/chapter/${chapterId}`} type="back">
             ← Back to Chapter {chapterId}
           </NavButton>
           <NavButton to={`/quiz/quiz${chapterId}`} type="home">
             🧠 Take Quiz
           </NavButton>
           <NavButton to={`/simulation/sim${chapterId}`} type="home">
             🚀 Run Simulation
           </NavButton>
           <NavButton to={`/faq/${chapterId}`} type="home">
             ❓ View FAQ
           </NavButton>
           <NavButton to="/" type="home">
             🏠 Home
           </NavButton>
                       <NavButton 
              onClick={() => setShowMoodleDemo(!showMoodleDemo)}
              type="home"
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
            >
              🎓 Moodle Demo
            </NavButton>
         </NavigationButtons>
      </Header>

      <ContentSection>
        {/* Chapter 10 Welcome Section */}
        <SectionHeader theme={theme}>
          <h2>📚 Welcome to Chapter 10: Case Studies & Real-World Examples</h2>
          <p>
            This chapter explores successful and failed tokenomics implementations through 
            interactive learning experiences. You'll analyze real projects, make decisions 
            in critical scenarios, and understand the principles that drive success or failure.
          </p>
        </SectionHeader>
        
        <SectionHeader theme={theme}>
          <h2>🕒 Interactive Timeline: Evolution of Tokenomics</h2>
          <p>
            Explore the chronological development of tokenomics from Bitcoin's genesis 
            block to modern DeFi protocols. Click on timeline events to discover 
            detailed insights about key milestones and their impact on the ecosystem.
          </p>
        </SectionHeader>
        
        <InteractiveTimeline theme={theme} />
        
        <SectionHeader theme={theme}>
          <h2>🌳 Decision Tree: Real-World Tokenomics Scenarios</h2>
          <p>
            Based on actual case studies from Chapter 10, put yourself in the shoes of 
            tokenomics designers and protocol builders. Make critical decisions about 
            launch strategies, governance attacks, and token utility crises. See how 
            your choices affect project outcomes and learn from real-world consequences.
          </p>
        </SectionHeader>
        
        <DecisionTree theme={theme} />
        
        <SectionHeader theme={theme}>
          <h2>📊 Comparative Analysis: Success vs. Failure Case Studies</h2>
          <p>
            Compare the tokenomics approaches of projects featured in Chapter 10. 
            Analyze Bitcoin, Ethereum, Terra, Uniswap, and Bitconnect side-by-side. 
            Understand what drives success, identify failure patterns, and learn to 
            spot red flags in tokenomics design.
          </p>
        </SectionHeader>
        
        <ComparativeAnalysis theme={theme} />
        
        {/* Completion Section */}
        <SectionHeader theme={theme}>
          <h2>🎉 Interactive Learning Complete!</h2>
          <p>
            You've successfully explored the interactive components of Chapter 10. 
            You now have hands-on experience with real-world tokenomics case studies, 
            decision-making scenarios, and project comparisons.
          </p>
        </SectionHeader>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '30px',
          padding: '30px',
          background: theme === 'dark' ? 'rgba(55, 65, 81, 0.8)' : 'rgba(247, 250, 252, 0.9)',
          borderRadius: '15px',
          border: `1px solid ${theme === 'dark' ? '#4a5568' : '#e2e8f0'}`
        }}>
          <h3 style={{ 
            color: theme === 'dark' ? '#63b3ed' : '#3182ce',
            marginBottom: '20px'
          }}>
            🚀 Ready for More Learning?
          </h3>
          <p style={{ 
            color: theme === 'dark' ? '#a0aec0' : '#4a5568',
            marginBottom: '25px',
            fontSize: '1.1rem'
          }}>
            Return to Chapter 10 to continue reading, or take the quiz and simulation 
            to test your knowledge!
          </p>
          <NavButton to="/chapter/10" type="back" style={{ margin: '0 10px' }}>
            📖 Return to Chapter 10
          </NavButton>
          <NavButton to="/quiz/quiz10" type="home" style={{ margin: '0 10px' }}>
            🧠 Take Chapter 10 Quiz
          </NavButton>
        </div>
      </ContentSection>
    </Container>
  );
};

export default InteractiveComponentsPage;
