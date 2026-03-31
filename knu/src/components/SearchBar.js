import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import './SearchBar.css';

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();
  const { darkMode } = useSettings();

  // Search data - in a real app, this would come from your data files
  const searchData = [
    // Chapters
    { id: 'chapter01', type: 'chapter', title: 'Introduction to Tokenomics', content: 'Understanding the basics of token economics and blockchain fundamentals', path: '/chapter/01' },
    { id: 'chapter02', type: 'chapter', title: 'Token Fundamentals', content: 'Core concepts of token design, utility, and value proposition', path: '/chapter/02' },
    { id: 'chapter03', type: 'chapter', title: 'Token Design Principles', content: 'Best practices for designing effective tokenomics models', path: '/chapter/03' },
    { id: 'chapter04', type: 'chapter', title: 'Distribution Strategies', content: 'How to distribute tokens fairly and effectively', path: '/chapter/04' },
    { id: 'chapter05', type: 'chapter', title: 'Utility and Use Cases', content: 'Real-world applications and utility of tokens', path: '/chapter/05' },
    { id: 'chapter06', type: 'chapter', title: 'Governance Models', content: 'Decentralized governance and decision-making structures', path: '/chapter/06' },
    { id: 'chapter07', type: 'chapter', title: 'Economic Models', content: 'Token economics and market dynamics', path: '/chapter/07' },
    { id: 'chapter08', type: 'chapter', title: 'Valuation Methods', content: 'How to value tokens and assess their worth', path: '/chapter/08' },
    { id: 'chapter09', type: 'chapter', title: 'Risk Assessment', content: 'Identifying and managing risks in token projects', path: '/chapter/09' },
    { id: 'chapter10', type: 'chapter', title: 'Case Studies', content: 'Real-world examples of successful tokenomics', path: '/chapter/10' },
    { id: 'chapter11', type: 'chapter', title: 'Future Trends', content: 'Emerging trends and innovations in tokenomics', path: '/chapter/11' },
    { id: 'chapter12', type: 'chapter', title: 'Conclusion', content: 'Summary and next steps in your tokenomics journey', path: '/chapter/12' },
    
    // Quizzes
    { id: 'quiz1', type: 'quiz', title: 'Tokenomics Basics Quiz', content: 'Test your knowledge of fundamental tokenomics concepts', path: '/quiz/quiz1' },
    { id: 'quiz2', type: 'quiz', title: 'Token Design Quiz', content: 'Quiz on token design principles and best practices', path: '/quiz/quiz2' },
    { id: 'quiz3', type: 'quiz', title: 'Distribution Strategies Quiz', content: 'Test your understanding of token distribution methods', path: '/quiz/quiz3' },
    { id: 'quiz4', type: 'quiz', title: 'Utility and Governance Quiz', content: 'Quiz on token utility and governance models', path: '/quiz/quiz4' },
    { id: 'quiz5', type: 'quiz', title: 'Economic Models Quiz', content: 'Test your knowledge of token economics', path: '/quiz/quiz5' },
    { id: 'quiz6', type: 'quiz', title: 'Valuation and Risk Quiz', content: 'Quiz on token valuation and risk assessment', path: '/quiz/quiz6' },
    { id: 'quiz7', type: 'quiz', title: 'Case Studies Quiz', content: 'Test your understanding of real-world examples', path: '/quiz/quiz7' },
    { id: 'quiz8', type: 'quiz', title: 'Advanced Concepts Quiz', content: 'Advanced tokenomics concepts and applications', path: '/quiz/quiz8' },
    { id: 'quiz9', type: 'quiz', title: 'Future Trends Quiz', content: 'Quiz on emerging trends in tokenomics', path: '/quiz/quiz9' },
    { id: 'quiz10', type: 'quiz', title: 'Comprehensive Review Quiz', content: 'Final comprehensive review of all concepts', path: '/quiz/quiz10' },
    
    // Simulations
    { id: 'sim1', type: 'simulation', title: 'Chapter 1 Simulation - Introduction to Tokenomics', content: 'Interactive simulation to explore the fundamentals of tokenomics and economic principles', path: '/simulation/sim1' },
    { id: 'sim2', type: 'simulation', title: 'Chapter 2 Simulation - Token Standards and Types', content: 'Interactive exploration of different token standards and their use cases', path: '/simulation/sim2' },
    { id: 'sim3', type: 'simulation', title: 'Chapter 3 Simulation - Token Design Principles', content: 'Interactive design workshop for creating effective token economies', path: '/simulation/sim3' },
    { id: 'sim4', type: 'simulation', title: 'Chapter 4 Simulation - Distribution and Supply Mechanisms', content: 'Interactive exploration of token distribution strategies and supply management', path: '/simulation/sim4' },
    { id: 'sim5', type: 'simulation', title: 'Chapter 5 Simulation - Token Utility and Use Cases', content: 'Interactive exploration of real-world token applications and utility scenarios', path: '/simulation/sim5' },
    { id: 'sim6', type: 'simulation', title: 'Chapter 6 Simulation - DAO Governance and Decision Making', content: 'Interactive simulation exploring various governance models, voting mechanisms, and DAO structures', path: '/simulation/sim6' },
    { id: 'sim7', type: 'simulation', title: 'Chapter 7 Simulation - Economic Models and Token Valuation', content: 'Interactive exploration of token economics, valuation methods, and market dynamics', path: '/simulation/sim7' },
    { id: 'sim8', type: 'simulation', title: 'Chapter 8 Simulation - Risk Assessment and Management', content: 'Interactive risk assessment and mitigation strategies for token projects', path: '/simulation/sim8' },
    { id: 'sim9', type: 'simulation', title: 'Chapter 9 Simulation - Advanced Tokenomics and Future Trends', content: 'Advanced tokenomics concepts and emerging trends in the field', path: '/simulation/sim9' }
  ];

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Handle search query changes
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate search delay for better UX
    const timeoutId = setTimeout(() => {
      const searchResults = performSearch(query);
      setResults(searchResults);
      setShowResults(true);
      setSelectedIndex(-1);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Perform search
  const performSearch = (searchQuery) => {
    const lowerQuery = searchQuery.toLowerCase();
    
    return searchData
      .filter(item => {
        const titleMatch = item.title.toLowerCase().includes(lowerQuery);
        const contentMatch = item.content.toLowerCase().includes(lowerQuery);
        const typeMatch = item.type.toLowerCase().includes(lowerQuery);
        
        return titleMatch || contentMatch || typeMatch;
      })
      .map(item => ({
        ...item,
        relevance: calculateRelevance(item, lowerQuery)
      }))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 10); // Limit to top 10 results
  };

  // Calculate search relevance score
  const calculateRelevance = (item, query) => {
    let score = 0;
    
    if (item.title.toLowerCase().includes(query)) score += 10;
    if (item.content.toLowerCase().includes(query)) score += 5;
    if (item.type.toLowerCase().includes(query)) score += 3;
    
    // Boost exact matches
    if (item.title.toLowerCase() === query) score += 20;
    if (item.content.toLowerCase().includes(query)) score += 2;
    
    return score;
  };

    // Handle keyboard navigation
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'Tab':
        // Allow tab to close search if no results are selected
        if (selectedIndex === -1) {
          e.preventDefault();
          onClose();
        }
        break;
      default:
        break;
    }
  };

  // Handle result click
  const handleResultClick = (result) => {
    navigate(result.path);
    onClose();
    setQuery('');
    setResults([]);
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case 'chapter': return '📚';
      case 'quiz': return '❓';
      case 'simulation': return '🔬';
      default: return '📄';
    }
  };

  // Get type color
  const getTypeColor = (type) => {
    switch (type) {
      case 'chapter': return '#10b981';
      case 'quiz': return '#f59e0b';
      case 'simulation': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-container" ref={resultsRef}>
                       {/* Search Input */}
               <div className="search-input-container">
                 <div className="search-icon">🔍</div>
                 <input
                   ref={inputRef}
                   type="text"
                   placeholder="Search chapters, quizzes, simulations..."
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                   onKeyDown={handleKeyDown}
                   className="search-input"
                 />
                 {query && (
                   <button
                     className="clear-button"
                     onClick={() => setQuery('')}
                     title="Clear search"
                   >
                     ✕
                   </button>
                 )}
                 <button
                   className="close-search-button"
                   onClick={onClose}
                   title="Close search (ESC)"
                 >
                   ✕
                 </button>
               </div>

        {/* Search Results */}
        {showResults && (
          <div className="search-results">
            {isLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <span>Searching...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="results-list">
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    className={`result-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleResultClick(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="result-icon" style={{ color: getTypeColor(result.type) }}>
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="result-content">
                      <div className="result-title">{result.title}</div>
                      <div className="result-description">{result.content}</div>
                      <div className="result-meta">
                        <span className="result-type" style={{ color: getTypeColor(result.type) }}>
                          {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <span>No results found for "{query}"</span>
                <span className="no-results-suggestion">Try different keywords or check spelling</span>
              </div>
            )}
          </div>
        )}

                       {/* Search Tips */}
               {!showResults && query.length === 0 && (
                 <div className="search-tips">
                   <div className="tips-header">
                     <span className="tips-icon">💡</span>
                     <span>Search Tips</span>
                   </div>
                   <div className="tips-list">
                     <div className="tip-item">
                       <span className="tip-keyword">tokenomics</span>
                       <span>Find all content about tokenomics</span>
                     </div>
                     <div className="tip-item">
                       <span className="tip-keyword">governance</span>
                       <span>Search for governance-related content</span>
                     </div>
                     <div className="tip-item">
                       <span className="tip-keyword">simulation</span>
                       <span>Find interactive simulations</span>
                     </div>
                   </div>

                 </div>
               )}
      </div>
    </div>
  );
};

export default SearchBar;
