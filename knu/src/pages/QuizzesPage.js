import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useUserProgress } from '../contexts/UserProgressContext';
import { useSettings } from '../contexts/SettingsContext';
import quizzesData from '../data/quizzesData';

const QuizzesContainer = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  transition: all 0.3s ease;
  
  /* Dark mode styles */
  html.dark-mode & {
    background: rgba(26, 32, 44, 0.98);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 2.8em;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  font-weight: 700;
  
  /* Dark mode styles */
  html.dark-mode & {
    background: linear-gradient(135deg, #90cdf4, #63b3ed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2em;
  color: #666;
  margin-bottom: 20px;
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #a0aec0;
  }
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  /* Dark mode styles */
  html.dark-mode & {
    background: rgba(26, 32, 44, 0.98);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 30px;
  text-align: center;
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #e2e8f0;
  }
`;

const QuizzesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
`;

const QuizCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    background: rgba(45, 55, 72, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    }
  }
`;

const QuizTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 10px;
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #e2e8f0;
  }
`;

const QuizDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 15px;
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #a0aec0;
  }
`;

const QuizStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  padding: 10px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  
  /* Dark mode styles */
  html.dark-mode & {
    border-top: 1px solid #4a5568;
    border-bottom: 1px solid #4a5568;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 2px;
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #90cdf4;
  }
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #a0aec0;
  }
`;

const SampleQuestions = styled.div`
  margin-top: 15px;
`;

const SampleTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #a0aec0;
  }
`;

const QuestionItem = styled.div`
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 6px;
  padding-left: 15px;
  position: relative;
  line-height: 1.4;
  
  &:before {
    content: "❓";
    position: absolute;
    left: 0;
    font-size: 0.8rem;
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #a0aec0;
  }
`;

const QuizLink = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-top: 15px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    background: linear-gradient(135deg, #2d3748, #1a202c);
    color: #90cdf4;
    
    &:hover {
      box-shadow: 0 8px 25px rgba(144, 205, 244, 0.3);
    }
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;

const NavButton = styled(Link)`
  background: ${props => props.theme === 'dark'
    ? (props.variant === 'primary' ? 'linear-gradient(135deg, #4a5568, #2d3748)' : 'transparent')
    : (props.variant === 'primary' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent')};
  color: ${props => props.theme === 'dark'
    ? (props.variant === 'primary' ? 'white' : '#90cdf4')
    : (props.variant === 'primary' ? 'white' : '#667eea')};
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.theme === 'dark'
    ? (props.variant === 'primary' ? 'transparent' : '#90cdf4')
    : (props.variant === 'primary' ? 'transparent' : '#667eea')};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme === 'dark'
      ? '0 8px 25px rgba(144, 205, 244, 0.3)'
      : '0 8px 25px rgba(102, 126, 234, 0.3)'};
  }
`;

const QuizzesPage = () => {
  const { quizzes, updateStudyTime } = useUserProgress();
  const { darkMode } = useSettings();
  const theme = darkMode ? 'dark' : 'light';

  // Track time spent on quizzes page
  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // in minutes
      if (timeSpent > 0) {
        updateStudyTime(timeSpent);
      }
    };
  }, [updateStudyTime]);

  return (
    <QuizzesContainer>
      <Header>
        <Title>📝 Interactive Quizzes</Title>
        <Subtitle>Test your knowledge of tokenomics concepts with comprehensive quizzes</Subtitle>
        <div style={{
          display: 'inline-block',
          background: 'rgba(102, 126, 234, 0.1)',
          color: '#667eea',
          padding: '12px 24px',
          borderRadius: '20px',
          fontSize: '1rem',
          fontWeight: '600',
          marginTop: '20px',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          📊 Progress: {Object.keys(quizzes).filter(id => quizzes[id].completed).length} / {quizzesData.length} completed
        </div>
      </Header>

      <Section>
        <SectionTitle>📚 All Quizzes</SectionTitle>
        
        <QuizzesGrid>
          {quizzesData.map((quiz) => (
            <QuizCard key={quiz.id}>
              <QuizTitle>{quiz.title}</QuizTitle>
              <QuizDescription>
                {quiz.description || `Test your understanding of ${quiz.title.toLowerCase()}`}
              </QuizDescription>
              
              <QuizStats>
                <StatItem>
                  <StatValue>{quiz.questions.length}</StatValue>
                  <StatLabel>Questions</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>5</StatValue>
                  <StatLabel>Options</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>100%</StatValue>
                  <StatLabel>Pass Rate</StatLabel>
                </StatItem>
              </QuizStats>
              
              <SampleQuestions>
                <SampleTitle>Sample Questions:</SampleTitle>
                {quiz.questions.slice(0, 2).map((question, index) => (
                  <QuestionItem key={index}>
                    {question.question.length > 60 
                      ? question.question.substring(0, 60) + '...' 
                      : question.question}
                  </QuestionItem>
                ))}
                {quiz.questions.length > 2 && (
                  <QuestionItem>
                    +{quiz.questions.length - 2} more questions
                  </QuestionItem>
                )}
              </SampleQuestions>
              
              <QuizLink to={`/quiz/${quiz.id}`}>
                📝 Take Quiz →
              </QuizLink>
              
              {quizzes[quiz.id]?.completed && (
                <div style={{
                  display: 'inline-block',
                  background: '#10b981',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  marginTop: '10px'
                }}>
                  ✅ Completed ({quizzes[quiz.id].bestScore}%)
                </div>
              )}
            </QuizCard>
          ))}
        </QuizzesGrid>
      </Section>

      <NavigationButtons>
        <NavButton to="/" theme={theme}>
          🏠 Back to Home
        </NavButton>
        <NavButton to="/simulations" variant="primary" theme={theme}>
          🎮 View All Simulations →
        </NavButton>
      </NavigationButtons>
    </QuizzesContainer>
  );
};

export default QuizzesPage;
