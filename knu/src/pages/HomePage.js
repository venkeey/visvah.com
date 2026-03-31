import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useUserProgress } from '../contexts/UserProgressContext';
import { bookData } from '../data/bookData';
import Logo from '../components/Logo';
import GlossaryTooltip from '../components/GlossaryTooltip';

const HomeContainer = styled.div`
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

const QuickReference = styled.div`
  text-align: center;
  margin: 20px 0;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  color: white;
  
  /* Dark mode styles */
  html.dark-mode & {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    color: white;
  }
`;

const GlossaryLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  display: inline-block;
  transition: all 0.3s ease;
  margin: 0 10px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
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
  font-size: 2.2em;
  border-bottom: 3px solid #667eea;
  padding-bottom: 10px;
  display: inline-block;
  color: #1a202c;
  font-weight: 700;
  margin-bottom: 30px;
  
  /* Dark mode styles */
  html.dark-mode & {
    border-bottom: 3px solid #90cdf4;
    color: #f7fafc;
  }
`;

const ChapterList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 20px;
`;

const ChapterItem = styled.li`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    background: #2d3748;
    border-left: 4px solid #90cdf4;
    
    &:hover {
      box-shadow: 0 10px 30px rgba(144, 205, 244, 0.2);
    }
  }
`;

const ChapterLink = styled(Link)`
  text-decoration: none;
  display: block;
  
  &:hover {
    text-decoration: none;
  }
`;

const ChapterTitle = styled.div`
  color: #1a202c;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1em;
  display: block;
  margin-bottom: 8px;
  
  &:hover {
    color: #667eea;
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #f7fafc;
    
    &:hover {
      color: #90cdf4;
    }
  }
`;

const ChapterDescription = styled.div`
  color: #666;
  font-size: 0.9em;
  margin-top: 5px;
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #a0aec0;
  }
`;

const ChapterMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
  font-size: 0.85em;
  color: #667eea;
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #90cdf4;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ChapterTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8em;
  font-weight: 500;
  
  /* Dark mode styles */
  html.dark-mode & {
    background: linear-gradient(135deg, #2d3748, #1a202c);
    color: #90cdf4;
  }
`;

const InteractiveCard = styled.div`
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    background: #2d3748;
    
    &:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
  }
`;

const InteractiveLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  
  &:hover {
    color: #764ba2;
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #90cdf4;
    
    &:hover {
      color: #63b3ed;
    }
  }
`;

const HomePage = () => {
  const { updateStudyTime, chapters } = useUserProgress();

  // Track time spent on homepage
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
    <HomeContainer>
      <Header>
        <Logo size="large" />
        <Title>Tokenomics Book</Title>
        <Subtitle>Interactive Learning Platform for Token Economics</Subtitle>
        
        <div style={{
          display: 'inline-block',
          background: 'rgba(102, 126, 234, 0.1)',
          color: '#667eea',
          padding: '16px 32px',
          borderRadius: '25px',
          fontSize: '1.1rem',
          fontWeight: '600',
          marginBottom: '20px',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          📊 Overall Progress: {Object.keys(chapters).filter(id => chapters[id].completed).length} / 12 chapters completed
        </div>
        
        <QuickReference>
          <h3 style={{ margin: '0 0 10px 0' }}>📚 Quick Reference</h3>
          <GlossaryLink to="/glossary">View Complete Glossary</GlossaryLink>
          <GlossaryLink to="/glossary-example">Try Tooltips</GlossaryLink>
          <p style={{ margin: '10px 0 0 0', fontSize: '0.9em' }}>
            All key terms and definitions with interactive tooltips
          </p>
          <div style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <strong>Tooltip Test:</strong> Hover over <GlossaryTooltip term="Tokenomics" theme="light">Tokenomics</GlossaryTooltip> to see if tooltips work.
          </div>
        </QuickReference>
      </Header>

      <Section>
        <SectionTitle>📚 Table of Contents</SectionTitle>
        <ChapterList>
          {bookData.chapters && bookData.chapters.map((chapter) => (
            <ChapterLink to={`/chapter/${chapter.id}`} key={chapter.id}>
              <ChapterItem>
                <ChapterTitle>
                  {chapter.title.startsWith('Chapter') ? chapter.title : `Chapter ${chapter.id}: ${chapter.title}`}
                </ChapterTitle>
                <ChapterDescription>{chapter.description}</ChapterDescription>
                <ChapterMeta>
                  <MetaItem>
                    🎮 1 Simulation
                  </MetaItem>
                  <MetaItem>
                    📝 1 Quiz
                  </MetaItem>
                  <MetaItem>
                    ❓ 1 FAQ
                  </MetaItem>
                  {chapters[`chapter${String(chapter.id).padStart(2, '0')}`]?.completed && (
                    <MetaItem style={{ color: '#10b981', fontWeight: '600' }}>
                      ✅ Completed
                    </MetaItem>
                  )}
                </ChapterMeta>
                <ChapterTags>
                  <Tag>Tokenomics</Tag>
                  <Tag>Interactive</Tag>
                  <Tag>Learning</Tag>
                </ChapterTags>
              </ChapterItem>
            </ChapterLink>
          ))}
        </ChapterList>
      </Section>

      <Section>
        <SectionTitle>📊 Your Progress</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <InteractiveCard>
            <h3>📚 Chapters</h3>
            <p>Completed: {Object.keys(chapters).filter(id => chapters[id].completed).length} / 12</p>
            <InteractiveLink to="/progress">
              View Progress →
            </InteractiveLink>
          </InteractiveCard>
          
          <InteractiveCard>
            <h3>🎮 Simulations</h3>
            <p>Interactive learning experiences</p>
            <InteractiveLink to="/simulations">
              View All Simulations →
            </InteractiveLink>
          </InteractiveCard>
          
          <InteractiveCard>
            <h3>❓ FAQs</h3>
            <p>Common questions & answers</p>
            <InteractiveLink to="/faq">
              Browse All FAQs →
            </InteractiveLink>
          </InteractiveCard>
          
          <InteractiveCard>
            <h3>📚 All Chapters</h3>
            <p>Complete overview of all content</p>
            <InteractiveLink to="/all-chapters">
              View All Chapters →
            </InteractiveLink>
          </InteractiveCard>
          
          <InteractiveCard>
            <h3>📝 Quizzes</h3>
            <p>Test your knowledge</p>
            <InteractiveLink to="/quizzes">
              View All Quizzes →
            </InteractiveLink>
          </InteractiveCard>
        </div>
      </Section>

      <Section>
        <SectionTitle>🚀 Quick Access</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <InteractiveCard>
            <h3>🎮 All Simulations</h3>
            <p>Browse all 12 interactive simulations in one place</p>
            <InteractiveLink to="/simulations">
              View All Simulations →
            </InteractiveLink>
          </InteractiveCard>
          
          <InteractiveCard>
            <h3>📝 All Quizzes</h3>
            <p>Test your knowledge with all 12 comprehensive quizzes</p>
            <InteractiveLink to="/quizzes">
              View All Quizzes →
            </InteractiveLink>
          </InteractiveCard>
        </div>
      </Section>
    </HomeContainer>
  );
};

export default HomePage;
