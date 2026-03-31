import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import DarkModeToggle from './DarkModeToggle';
import SearchBar from './SearchBar';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Dark mode styles */
  html.dark-mode & {
    background: rgba(15, 20, 25, 0.95);
    border-bottom: 1px solid rgba(144, 205, 244, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }
`;

const NavContent = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 80px;
`;

const HomeButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #667eea;
  font-weight: 800;
  font-size: 1.4rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 8px 16px;
  border-radius: 12px;
  
  &:hover {
    color: #764ba2;
    transform: translateY(-2px);
    background: rgba(102, 126, 234, 0.1);
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #90cdf4;
    
    &:hover {
      color: #63b3ed;
      background: rgba(144, 205, 244, 0.1);
    }
  }
`;

const HomeButtonLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;


const SettingsButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 16px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.25);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
    box-shadow: 0 4px 20px rgba(74, 85, 104, 0.25);
    
    &:hover {
      box-shadow: 0 8px 30px rgba(74, 85, 104, 0.4);
    }
  }
`;



const Breadcrumb = styled.div`
  color: #666;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: rgba(102, 126, 234, 0.08);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    display: none;
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #a0aec0;
    background: rgba(144, 205, 244, 0.1);
    border: 1px solid rgba(144, 205, 244, 0.2);
  }
`;

const NavControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  /* Dark mode styles */
  html.dark-mode & {
    background: rgba(15, 20, 25, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${props => props.theme === 'dark' ? 'rgba(144, 205, 244, 0.2)' : 'rgba(102, 126, 234, 0.1)'};
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.theme === 'dark' ? '#63b3ed' : '#667eea'};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px ${props => props.theme === 'dark' ? 'rgba(99, 179, 237, 0.5)' : 'rgba(102, 126, 234, 0.5)'};
`;

const ProgressLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #667eea;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 8px 16px;
  border-radius: 12px;
  
  &:hover {
    color: #764ba2;
    transform: translateY(-2px);
    background: rgba(102, 126, 234, 0.1);
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    color: #90cdf4;
    
    &:hover {
      color: #63b3ed;
      background: rgba(144, 205, 244, 0.1);
    }
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  color: white;
  border: none;
  border-radius: 16px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(245, 158, 11, 0.25);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(245, 158, 11, 0.35);
    
    &::before {
      left: 100%;
    }
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    background: linear-gradient(135deg, #744210 0%, #975a16 100%);
    
    &:hover {
      box-shadow: 0 8px 25px rgba(116, 66, 16, 0.4);
    }
  }
`;

const AddNoteButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 16px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.25);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.35);
    
    &::before {
      left: 100%;
    }
  }
  
  /* Dark mode styles */
  html.dark-mode & {
    background: linear-gradient(135deg, #276749 0%, #22543d 100%);
    
    &:hover {
      box-shadow: 0 8px 25px rgba(39, 103, 73, 0.4);
    }
  }
`;


const Navigation = () => {
  const { dispatch, darkMode } = useSettings();
  const location = useLocation();
  const [readingProgress, setReadingProgress] = React.useState(0);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getBreadcrumb = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Home';
    
    if (path.startsWith('/chapter/')) {
      const chapterId = path.split('/chapter/')[1];
      return `Chapter ${chapterId}`;
    }
    
    if (path.startsWith('/simulation/')) {
      const simId = path.split('/simulation/')[1];
      // Extract number from sim1, sim2, etc.
      const simNumber = simId.replace('sim', '');
      return `Simulation ${simNumber}`;
    }
    
    if (path.startsWith('/quiz/')) {
      const quizId = path.split('/quiz/')[1];
      // Extract number from quiz1, quiz2, etc.
      const quizNumber = quizId.replace('quiz', '');
      return `Quiz ${quizNumber}`;
    }
    
    if (path === '/glossary') return 'Glossary';
    if (path === '/simulations') return 'All Simulations';
    if (path === '/quizzes') return 'All Quizzes';
    if (path === '/progress') return 'Progress Dashboard';
    if (path.startsWith('/faq/')) {
      const faqChapter = path.split('/faq/')[1];
      return faqChapter ? `FAQ Chapter ${faqChapter}` : 'FAQ';
    }
    if (path === '/faq') return 'FAQ';
    if (path === '/all-chapters') return 'All Chapters';
    
    return '';
  };

  const toggleSettings = () => {
    dispatch({ type: 'TOGGLE_SETTINGS_PANEL' });
  };

  const handleAddNote = () => {
    // Dispatch custom event to trigger note popup in ChapterPage
    window.dispatchEvent(new CustomEvent('showNotePopup'));
  };




  return (
    <NavContainer>
      <NavContent>
        <div style={{ justifySelf: 'start', display: 'flex' }}>
          <HomeButton to="/">
            <HomeButtonLogo
              src={`${process.env.PUBLIC_URL}/assets/TokenBookLogoNoBG.png`}
              alt="Tokenomics Book Logo"
            />
            Tokenomics Book
          </HomeButton>
        </div>
        
        <div style={{ justifySelf: 'center', display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Breadcrumb>
            {getBreadcrumb()}
          </Breadcrumb>
          <ProgressLink to="/progress">
            📊 Progress
          </ProgressLink>
          <ProgressLink to="/faq">
            ❓ FAQ
          </ProgressLink>
          <ProgressLink to="/all-chapters">
            📚 All Chapters
          </ProgressLink>
        </div>
        
        <div style={{ justifySelf: 'end', display: 'flex' }}>
          <NavControls>
            <SearchButton onClick={() => setIsSearchOpen(true)}>
              🔍
            </SearchButton>
            <AddNoteButton onClick={handleAddNote}>
              📝
            </AddNoteButton>
            <DarkModeToggle />
            <SettingsButton onClick={toggleSettings}>
              ⚙️
            </SettingsButton>
          </NavControls>
        </div>
      </NavContent>
      <ProgressBar theme={darkMode ? 'dark' : 'light'}>
        <ProgressFill 
          progress={readingProgress} 
          theme={darkMode ? 'dark' : 'light'}
        />
      </ProgressBar>
      
      {/* Search Bar */}
      <SearchBar 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </NavContainer>
  );
};

export default Navigation;


