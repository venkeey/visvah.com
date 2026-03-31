import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSettings } from '../contexts/SettingsContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { chapters as chaptersData } from '../data/chapters';

const AllChaptersContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 40px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 15px;
`;

const PageDescription = styled.p`
  font-size: 1.3rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  margin-bottom: 30px;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const StatCard = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(55, 65, 81, 0.6)' : 'rgba(247, 250, 252, 0.8)'};
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-weight: 600;
`;

const ChapterGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 40px;
`;

const ChapterCard = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
`;

const ChapterHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ChapterNumber = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  margin-right: 15px;
`;

const ChapterTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin: 0;
  flex: 1;
`;

const ChapterDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ChapterContent = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(55, 65, 81, 0.4)' : 'rgba(247, 250, 252, 0.6)'};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
    margin-top: 2em;
    margin-bottom: 1em;
  }
  
  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  
  p {
    margin-bottom: 1.5em;
  }
  
  ul, ol {
    margin-bottom: 1.5em;
    padding-left: 2em;
  }
  
  li {
    margin-bottom: 0.5em;
  }
  
  strong {
    color: ${props => props.theme === 'dark' ? '#90cdf4' : '#2b6cb0'};
    font-weight: 600;
  }
  
  code {
    background: ${props => props.theme === 'dark' ? '#2d3748' : '#f7fafc'};
    color: ${props => props.theme === 'dark' ? '#68d391' : '#38a169'};
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.9em;
  }
  
  pre {
    background: ${props => props.theme === 'dark' ? '#2d3748' : '#f7fafc'};
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5em 0;
    border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
    padding-left: 20px;
    margin: 1.5em 0;
    font-style: italic;
    color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
  }
  
  th, td {
    border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
    padding: 12px;
    text-align: left;
  }
  
  th {
    background: ${props => props.theme === 'dark' ? '#2d3748' : '#f7fafc'};
    font-weight: 600;
  }
  
  tr:nth-child(even) {
    background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.3)' : 'rgba(247, 250, 252, 0.5)'};
  }
`;

const ContentSection = styled.div`
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: 600;
`;

const SectionContent = styled.div`
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  line-height: 1.5;
  font-size: 0.9rem;
`;

const ChapterActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  background: ${props => props.theme === 'dark' 
    ? (props.type === 'primary' 
        ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)'
        : props.type === 'quiz'
        ? 'linear-gradient(135deg, #744210 0%, #975a16 100%)'
        : props.type === 'simulation'
        ? 'linear-gradient(135deg, #2c5282 0%, #2a4365 100%)'
        : 'linear-gradient(135deg, #276749 0%, #22543d 100%)')
    : (props.type === 'primary' 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : props.type === 'quiz'
    ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    : props.type === 'simulation'
    ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)')};
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    filter: brightness(1.1);
  }
`;

const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding: 10px;
  background: ${props => props.theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'};
  border-radius: 8px;
  border: 1px solid #10b981;
`;

const ProgressText = styled.span`
  font-size: 0.9rem;
  color: #10b981;
  font-weight: 600;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  border-radius: 12px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  font-size: 1rem;
  margin-bottom: 30px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : props.theme === 'dark' ? 'rgba(45, 55, 72, 0.6)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.active ? 'white' : props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  border: 2px solid ${props => props.active ? '#667eea' : props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const AllChaptersPage = () => {
  const { darkMode } = useSettings();
  const { chapters, getChapterProgress } = useUserProgress();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const theme = darkMode ? 'dark' : 'light';

  // Track time spent on page
  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60);
      if (timeSpent > 0) {
        // Could add study time tracking here if needed
      }
    };
  }, []);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredChapters = chaptersData.filter(chapter => {
    const matchesSearch = chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chapter.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (typeof chapter.content === 'string' && 
                          chapter.content.replace(/<[^>]*>/g, ' ').toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && chapters[`chapter${String(chapter.id).padStart(2, '0')}`]?.completed) ||
                         (filter === 'in-progress' && false) || // No in-progress state for chapters
                         (filter === 'not-started' && !chapters[`chapter${String(chapter.id).padStart(2, '0')}`]?.completed);
    
    return matchesSearch && matchesFilter;
  });

  const totalChapters = chaptersData.length;
  const completedChapters = Object.values(chapters).filter(chapter => chapter.completed).length;
  const averageProgress = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  return (
    <AllChaptersContainer>
      <PageHeader theme={theme}>
        <PageTitle theme={theme}>📚 All Chapters</PageTitle>
        <PageDescription theme={theme}>
          Complete tokenomics book with all chapters and full content in one page. Search, filter, and read everything you need to master tokenomics concepts.
        </PageDescription>
        
        <StatsGrid>
          <StatCard theme={theme}>
            <StatValue theme={theme}>{totalChapters}</StatValue>
            <StatLabel theme={theme}>Total Chapters</StatLabel>
          </StatCard>
          <StatCard theme={theme}>
            <StatValue theme={theme}>{completedChapters}</StatValue>
            <StatLabel theme={theme}>Completed</StatLabel>
          </StatCard>
          <StatCard theme={theme}>
            <StatValue theme={theme}>{averageProgress}%</StatValue>
            <StatLabel theme={theme}>Average Progress</StatLabel>
          </StatCard>
          <StatCard theme={theme}>
            <StatValue theme={theme}>{totalChapters - completedChapters}</StatValue>
            <StatLabel theme={theme}>Remaining</StatLabel>
          </StatCard>
        </StatsGrid>
      </PageHeader>

      <SearchBar
        theme={theme}
        type="text"
        placeholder="Search chapters, topics, or concepts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <FilterButtons>
        <FilterButton
          theme={theme}
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          All Chapters
        </FilterButton>
        <FilterButton
          theme={theme}
          active={filter === 'completed'}
          onClick={() => setFilter('completed')}
        >
          ✅ Completed
        </FilterButton>
        <FilterButton
          theme={theme}
          active={filter === 'in-progress'}
          onClick={() => setFilter('in-progress')}
        >
          🔄 In Progress
        </FilterButton>
        <FilterButton
          theme={theme}
          active={filter === 'not-started'}
          onClick={() => setFilter('not-started')}
        >
          📖 Not Started
        </FilterButton>
      </FilterButtons>

      <ChapterGrid>
        {filteredChapters.map((chapter) => {
          const chapterProgress = getChapterProgress(chapter.id);
          const isCompleted = chapters[`chapter${String(chapter.id).padStart(2, '0')}`]?.completed;
          
          return (
            <ChapterCard key={chapter.id} theme={theme}>
              <ChapterHeader>
                <ChapterNumber>{chapter.id}</ChapterNumber>
                <ChapterTitle theme={theme}>{chapter.title}</ChapterTitle>
              </ChapterHeader>

              {isCompleted && (
                <ProgressIndicator theme={theme}>
                  <span>✅</span>
                  <ProgressText>Completed</ProgressText>
                </ProgressIndicator>
              )}

              <ChapterDescription theme={theme}>
                {chapter.description}
              </ChapterDescription>

              <ChapterContent theme={theme}>
                <div 
                  dangerouslySetInnerHTML={{ __html: chapter.content }}
                />
              </ChapterContent>

              <ChapterActions>
                <ActionButton to={`/chapter/${chapter.id}`} type="primary" theme={theme}>
                  📖 Read Chapter
                </ActionButton>
                <ActionButton to={`/quiz/quiz${chapter.id}`} type="quiz" theme={theme}>
                  🧠 Quiz
                </ActionButton>
                <ActionButton to={`/simulation/sim${chapter.id}`} type="simulation" theme={theme}>
                  🚀 Simulation
                </ActionButton>
                <ActionButton to={`/faq/${chapter.id}`} type="faq" theme={theme}>
                  ❓ FAQ
                </ActionButton>
              </ChapterActions>
            </ChapterCard>
          );
        })}
      </ChapterGrid>

      {filteredChapters.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: theme === 'dark' ? '#a0aec0' : '#718096'
        }}>
          <h3>No chapters found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      )}
    </AllChaptersContainer>
  );
};

export default AllChaptersPage;
