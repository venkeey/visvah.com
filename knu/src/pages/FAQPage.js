import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSettings } from '../contexts/SettingsContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import faqData from '../data/faqData';

const FAQContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const FAQTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 15px;
`;

const FAQDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  margin-bottom: 20px;
  line-height: 1.6;
`;

const ChapterSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const ChapterButton = styled.button`
  background: ${props => props.active ? 
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
    props.theme === 'dark' ? 'rgba(45, 55, 72, 0.6)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.active ? 'white' : props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  border: 2px solid ${props => props.active ? '#667eea' : props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  padding: 12px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const FAQSection = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const FAQItem = styled.div`
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.6)' : 'rgba(255, 255, 255, 0.8)'};
  border: none;
  padding: 20px;
  text-align: left;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  }

  .arrow {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const FAQAnswer = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.4)' : 'rgba(255, 255, 255, 0.6)'};
  padding: ${props => props.isOpen ? '20px' : '0 20px'};
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  line-height: 1.6;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  border-top: ${props => props.isOpen ? '1px solid' : 'none'};
  border-color: ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  flex-wrap: wrap;
`;

const NavButton = styled(Link)`
  background: ${props => props.theme === 'dark'
    ? (props.type === 'back' 
        ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)'
        : 'linear-gradient(135deg, #744210 0%, #975a16 100%)')
    : (props.type === 'back' 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)')};
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
`;

const StatsSection = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.6)' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const StatItem = styled.div`
  text-align: center;
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
    margin-bottom: 5px;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  }
`;

const FAQPage = () => {
  const { chapterId } = useParams();
  const { darkMode } = useSettings();
  const { updateStudyTime } = useUserProgress();
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [openQuestions, setOpenQuestions] = useState({});
  const theme = darkMode ? 'dark' : 'light';

  // Track time spent on FAQ page
  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // in minutes
      if (timeSpent > 0) {
        updateStudyTime(timeSpent);
      }
    };
  }, [updateStudyTime]);

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedChapter]);

  // Set initial chapter from URL params or default to 1
  useEffect(() => {
    if (chapterId) {
      setSelectedChapter(parseInt(chapterId));
    }
  }, [chapterId]);

  const toggleQuestion = (questionIndex) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  const currentFAQ = faqData[selectedChapter];
  const totalQuestions = Object.values(faqData).reduce((sum, chapter) => sum + chapter.questions.length, 0);
  const totalChapters = Object.keys(faqData).length;

  if (!currentFAQ) {
    return (
      <FAQContainer>
        <FAQHeader theme={theme}>
          <FAQTitle theme={theme}>FAQ Not Found</FAQTitle>
          <FAQDescription theme={theme}>
            The requested FAQ section could not be found.
          </FAQDescription>
          <NavButton to="/" type="back" theme={theme}>
            Return to Home
          </NavButton>
        </FAQHeader>
      </FAQContainer>
    );
  }

  return (
    <FAQContainer>
      <FAQHeader theme={theme}>
        <FAQTitle theme={theme}>❓ Frequently Asked Questions</FAQTitle>
        <FAQDescription theme={theme}>
          Find answers to common questions about tokenomics concepts. Select a chapter below to explore specific topics and deepen your understanding.
        </FAQDescription>
        
        <StatsSection theme={theme}>
          <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '10px' }}>
            📊 FAQ Statistics
          </div>
          <StatsGrid>
            <StatItem theme={theme}>
              <div className="stat-value">{totalChapters}</div>
              <div className="stat-label">Chapters</div>
            </StatItem>
            <StatItem theme={theme}>
              <div className="stat-value">{totalQuestions}</div>
              <div className="stat-label">Total Questions</div>
            </StatItem>
            <StatItem theme={theme}>
              <div className="stat-value">{currentFAQ.questions.length}</div>
              <div className="stat-label">This Chapter</div>
            </StatItem>
          </StatsGrid>
        </StatsSection>
      </FAQHeader>

      <ChapterSelector>
        {Object.keys(faqData).map((chapterNum) => (
          <ChapterButton
            key={chapterNum}
            active={selectedChapter === parseInt(chapterNum)}
            theme={theme}
            onClick={() => setSelectedChapter(parseInt(chapterNum))}
          >
            Ch {chapterNum}
          </ChapterButton>
        ))}
      </ChapterSelector>

      <FAQSection theme={theme}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px', 
          color: theme === 'dark' ? '#63b3ed' : '#3182ce',
          fontSize: '1.8rem'
        }}>
          {currentFAQ.title}
        </h2>
        
        {currentFAQ.questions.map((faq, index) => (
          <FAQItem key={index} theme={theme}>
            <FAQQuestion
              theme={theme}
              isOpen={openQuestions[index]}
              onClick={() => toggleQuestion(index)}
            >
              <span>{faq.question}</span>
              <span className="arrow">▼</span>
            </FAQQuestion>
            <FAQAnswer
              theme={theme}
              isOpen={openQuestions[index]}
            >
              {faq.answer}
            </FAQAnswer>
          </FAQItem>
        ))}
      </FAQSection>

      <NavigationButtons>
        <NavButton to={`/chapter/${selectedChapter}`} type="back" theme={theme}>
          ← Back to Chapter {selectedChapter}
        </NavButton>
        <NavButton to={`/quiz/quiz${selectedChapter}`} type="home" theme={theme}>
          🧠 Take Quiz
        </NavButton>
        <NavButton to={`/simulation/sim${selectedChapter}`} type="home" theme={theme}>
          🚀 Run Simulation
        </NavButton>
        <NavButton to="/" type="home" theme={theme}>
          🏠 Home
        </NavButton>
      </NavigationButtons>
    </FAQContainer>
  );
};

export default FAQPage;
