import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSettings } from '../contexts/SettingsContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { getChapterById, getNextChapter, getPreviousChapter } from '../data/bookData';
import { parseHTMLGlossaryTerms } from '../utils/glossaryParser';
import BookmarkSystem from '../components/BookmarkSystem';
import InteractiveGlossary from '../components/InteractiveGlossary';
import NoteTakingTool, { NotesListComponent } from '../components/NoteTakingTool';
import ContentSearch from '../components/ContentSearch';
import AudioNarration from '../components/AudioNarration';
import OfflineMode from '../components/OfflineMode';


// Mapping of chapters to their corresponding quiz and simulation IDs
const chapterToQuizSimMapping = {
  1: { quiz: 'quiz1', simulation: 'sim1' },
  2: { quiz: 'quiz2', simulation: 'sim2' },
  3: { quiz: 'quiz3', simulation: 'sim3' },
  4: { quiz: 'quiz4', simulation: 'sim4' },
  5: { quiz: 'quiz5', simulation: 'sim5' },
  6: { quiz: 'quiz6', simulation: 'sim6' },
  7: { quiz: 'quiz7', simulation: 'sim7' },
  8: { quiz: 'quiz8', simulation: 'sim8' },
  9: { quiz: 'quiz9', simulation: 'sim9' },
  10: { quiz: 'quiz10', simulation: 'sim10' },
  11: { quiz: 'quiz11', simulation: 'sim11' },
  12: { quiz: 'quiz12', simulation: 'sim12' }
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

const ChapterHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
`;

const ChapterTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 15px;
`;

const ChapterDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  margin-bottom: 20px;
  line-height: 1.6;
`;

const ChapterNumber = styled.div`
  display: inline-block;
  background: ${props => props.theme === 'dark' ? '#3182ce' : '#667eea'};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ContentSection = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  line-height: 1.8;
  font-size: ${props => props.fontSize === 'small' ? '14px' : props.fontSize === 'large' ? '18px' : '16px'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};

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

const NavigationSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding: 25px 30px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  min-height: 80px;
`;

const NavButton = styled(Link)`
  background: ${props => props.theme === 'dark' ? '#3182ce' : '#667eea'};
  color: white;
  text-decoration: none;
  padding: 15px 25px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 140px;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  
  &:hover {
    background: ${props => props.theme === 'dark' ? '#2c5282' : '#5a67d8'};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const HomeButton = styled(Link)`
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#f7fafc'};
  color: ${props => props.theme === 'dark' ? '#90cdf4' : '#4a5568'};
  text-decoration: none;
  padding: 15px 25px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 140px;
  justify-content: center;
  border: 2px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${props => props.theme === 'dark' ? '#2d3748' : '#edf2f7'};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const TooltipInfo = styled.div`
  text-align: center;
  margin: 20px 0;
  padding: 15px;
  background: ${props => props.theme === 'dark' ? 'rgba(99, 179, 237, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
  border-radius: 8px;
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(99, 179, 237, 0.3)' : 'rgba(102, 126, 234, 0.3)'};
  color: ${props => props.theme === 'dark' ? '#90cdf4' : '#4c51bf'};
  font-size: 14px;
`;

const InteractiveSection = styled.div`
  margin: 40px 0;
  padding: 30px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const InteractiveTitle = styled.h3`
  text-align: center;
  margin-bottom: 25px;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  font-size: 1.5em;
  font-weight: 600;
`;

const InteractiveButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const InteractiveButton = styled(Link)`
  background: ${props => props.theme === 'dark' ? '#3182ce' : '#667eea'};
  color: white;
  text-decoration: none;
  padding: 18px 30px;
  border-radius: 15px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);

  &:hover {
    background: ${props => props.theme === 'dark' ? '#2c5282' : '#5a67d8'};
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
  }
`;

const QuizSimSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
  flex-wrap: wrap;
  padding: 30px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.6)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 20px;
  }
`;

const QuizSimButton = styled(Link)`
  background: ${props => props.theme === 'dark'
    ? (props.type === 'quiz'
        ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)'
        : props.type === 'simulation'
        ? 'linear-gradient(135deg, #744210 0%, #975a16 100%)'
        : 'linear-gradient(135deg, #276749 0%, #22543d 100%)')
    : (props.type === 'quiz'
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : props.type === 'simulation'
        ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        : 'linear-gradient(135deg, #10b981 0%, #059669 100%)')};
  color: white;
  text-decoration: none;
  padding: 20px 30px;
  border-radius: 15px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    border-color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
    filter: brightness(1.1);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    min-width: 180px;
    padding: 18px 25px;
    font-size: 14px;
  }
`;

const ChapterPage = () => {
  const { chapterId } = useParams();
  const { darkMode, tooltipsEnabled, fontSize, audioNarrationEnabled, offlineModeEnabled, notesToolEnabled, bookmarksEnabled, notesPanelVisible } = useSettings();
  const { completeChapter, updateStudyTime, getChapterProgress } = useUserProgress();
  const [chapter, setChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [previousChapter, setPreviousChapter] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Learning features state
  const [showGlossary, setShowGlossary] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    const currentChapter = getChapterById(parseInt(chapterId));
    if (currentChapter) {
      setChapter(currentChapter);
      setNextChapter(getNextChapter(currentChapter.id));
      setPreviousChapter(getPreviousChapter(currentChapter.id));
      
      // Start tracking reading time
      setStartTime(Date.now());
    }
  }, [chapterId]);

  // Separate effect for completion status to avoid unnecessary re-renders
  useEffect(() => {
    if (chapterId) {
      const progress = getChapterProgress(chapterId);
      setIsCompleted(progress.completed);
    }
  }, [chapterId, getChapterProgress]);

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapterId]);

  // Track study time and mark chapter as completed when user scrolls to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (!isCompleted && startTime) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Mark as completed when user reaches 90% of the page
        if (scrollPercent >= 90) {
          const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // in minutes
          completeChapter(chapterId, timeSpent);
          updateStudyTime(timeSpent);
          setIsCompleted(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCompleted, startTime, chapterId, completeChapter, updateStudyTime]);

  const contentRef = useRef(null);

  // Handle text selection for note-taking
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      
      if (text.length > 0 && text.length < 500) {
        setSelectedText(text);
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectedPosition({
          x: rect.left,
          y: rect.top,
          scrollY: window.scrollY
        });
      } else {
        setSelectedText('');
        setSelectedPosition(null);
      }
    };

    const handleDoubleClick = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      
      if (text.length > 0 && text.length < 500 && notesToolEnabled) {
        setSelectedText(text);
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectedPosition({
          x: rect.left,
          y: rect.top,
          scrollY: window.scrollY
        });
        setShowNotePopup(true);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);
    document.addEventListener('dblclick', handleDoubleClick);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
      document.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [notesToolEnabled]);

  // Listen for add note button click from navigation
  useEffect(() => {
    const handleShowNotePopup = () => {
      if (notesToolEnabled) {
        setShowNotePopup(true);
      }
    };

    window.addEventListener('showNotePopup', handleShowNotePopup);
    return () => window.removeEventListener('showNotePopup', handleShowNotePopup);
  }, [notesToolEnabled]);

  // Keyboard shortcuts for learning features
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            setShowSearch(true);
            break;
          case 'g':
            e.preventDefault();
            setShowGlossary(!showGlossary);
            break;
          case 'n':
            if (selectedText && notesToolEnabled) {
              e.preventDefault();
              setShowNotePopup(true);
            }
            break;
          case 'a':
            e.preventDefault();
            // Audio narration is now controlled by settings context
            break;
          case 'o':
            e.preventDefault();
            // Offline mode is now controlled by settings context
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showGlossary, selectedText, notesToolEnabled]);


  // Removed problematic DOM manipulation useEffect that was causing removeChild errors

  const renderContent = useMemo(() => {
    if (tooltipsEnabled && chapter?.content) {
      return parseHTMLGlossaryTerms(chapter.content, darkMode ? 'dark' : 'light', tooltipsEnabled);
    }
    return <div dangerouslySetInnerHTML={{ __html: chapter?.content || '' }} />;
  }, [tooltipsEnabled, chapter?.content, darkMode]);

  if (!chapter) {
    return (
      <Container>
        <ChapterHeader theme={darkMode ? 'dark' : 'light'}>
          <ChapterTitle theme={darkMode ? 'dark' : 'light'}>
            Chapter Not Found
          </ChapterTitle>
          <ChapterDescription theme={darkMode ? 'dark' : 'light'}>
            The requested chapter could not be found.
          </ChapterDescription>
          <HomeButton to="/" theme={darkMode ? 'dark' : 'light'}>
            Return to Home
          </HomeButton>
        </ChapterHeader>
      </Container>
    );
  }

  const settings = { darkMode, fontSize };

  return (
    <Container>
      <ChapterHeader theme={settings.darkMode ? 'dark' : 'light'}>
        <ChapterNumber theme={settings.darkMode ? 'dark' : 'light'}>
          Chapter {chapter.id}
        </ChapterNumber>
        <ChapterTitle theme={settings.darkMode ? 'dark' : 'light'}>
          {chapter.title}
        </ChapterTitle>
        {chapter.description && (
          <ChapterDescription theme={settings.darkMode ? 'dark' : 'light'}>
            {chapter.description}
          </ChapterDescription>
        )}
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
      </ChapterHeader>

      {tooltipsEnabled && (
        <TooltipInfo theme={settings.darkMode ? 'dark' : 'light'}>
          💡 <strong>Tip:</strong> Hover over highlighted terms to see their definitions. 
          You can toggle this feature in the settings panel.
        </TooltipInfo>
      )}

      <ContentSection 
        ref={contentRef}
        theme={settings.darkMode ? 'dark' : 'light'}
        fontSize={settings.fontSize}
      >
        {renderContent}
      </ContentSection>

      {chapterToQuizSimMapping[chapter.id] && (
        <QuizSimSection theme={settings.darkMode ? 'dark' : 'light'}>
          <div style={{
            width: '100%',
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '1.2rem',
            fontWeight: '600',
            color: settings.darkMode ? '#e2e8f0' : '#2d3748'
          }}>
            📚 Continue Your Learning Journey
          </div>
          <div style={{
            width: '100%',
            textAlign: 'center',
            marginBottom: '25px',
            fontSize: '0.9rem',
            color: settings.darkMode ? '#a0aec0' : '#718096',
            fontStyle: 'italic'
          }}>
            Test your knowledge and explore concepts interactively
          </div>
          <QuizSimButton 
            to={`/quiz/${chapterToQuizSimMapping[chapter.id].quiz}`}
            type="quiz"
            theme={settings.darkMode ? 'dark' : 'light'}
          >
            🧠 Take Chapter {chapter.id} Quiz
          </QuizSimButton>
          <QuizSimButton 
            to={`/simulation/${chapterToQuizSimMapping[chapter.id].simulation}`}
            type="simulation"
            theme={settings.darkMode ? 'dark' : 'light'}
          >
            🚀 Run Chapter {chapter.id} Simulation
          </QuizSimButton>
          <QuizSimButton 
            to={`/faq/${chapter.id}`}
            type="faq"
            theme={settings.darkMode ? 'dark' : 'light'}
          >
            ❓ Chapter {chapter.id} FAQ
          </QuizSimButton>
          {chapter.id === 10 && (
            <QuizSimButton
              to={`/interactive/${chapter.id}`}
              type="interactive"
              theme={settings.darkMode ? 'dark' : 'light'}
            >
              🎯 Interactive Components
            </QuizSimButton>
          )}
        </QuizSimSection>
      )}

      <NavigationSection theme={settings.darkMode ? 'dark' : 'light'}>
        {previousChapter ? (
          <NavButton 
            to={`/chapter/${previousChapter.id}`}
            theme={settings.darkMode ? 'dark' : 'light'}
          >
            ← Chapter {previousChapter.id}
          </NavButton>
        ) : (
          <div style={{ minWidth: '140px' }}></div>
        )}
        
        <HomeButton to="/" theme={settings.darkMode ? 'dark' : 'light'}>
          🏠 Home
        </HomeButton>
        
        {nextChapter ? (
          <NavButton 
            to={`/chapter/${nextChapter.id}`}
            theme={settings.darkMode ? 'dark' : 'light'}
          >
            Chapter {nextChapter.id} →
          </NavButton>
        ) : (
          <div style={{ minWidth: '140px' }}></div>
        )}
      </NavigationSection>
      
      {/* Learning Features */}
      
      {bookmarksEnabled && (
        <BookmarkSystem 
          chapterId={chapterId} 
          theme={darkMode ? 'dark' : 'light'} 
        />
      )}
      
      {notesPanelVisible && (
        <NotesListComponent 
          chapterId={chapterId} 
          theme={darkMode ? 'dark' : 'light'} 
        />
      )}
      
      <InteractiveGlossary 
        theme={darkMode ? 'dark' : 'light'}
        isVisible={showGlossary}
        onClose={() => setShowGlossary(false)}
      />
      
      <ContentSearch 
        theme={darkMode ? 'dark' : 'light'}
        isVisible={showSearch}
        onClose={() => setShowSearch(false)}
      />
      
      {notesToolEnabled && showNotePopup && (
        <NoteTakingTool 
          chapterId={chapterId}
          theme={darkMode ? 'dark' : 'light'}
          isVisible={showNotePopup}
          onClose={() => setShowNotePopup(false)}
          selectedText={selectedText}
          selectedPosition={selectedPosition}
        />
      )}
      
      {audioNarrationEnabled && (
        <AudioNarration 
          chapterId={chapterId}
          theme={darkMode ? 'dark' : 'light'}
          isVisible={true}
          onClose={() => {}}
          content={chapter?.content || ''}
        />
      )}
      
      {offlineModeEnabled && (
        <OfflineMode 
          theme={darkMode ? 'dark' : 'light'}
          isVisible={true}
          onClose={() => {}}
        />
      )}
    </Container>
  );
};

export default ChapterPage;

