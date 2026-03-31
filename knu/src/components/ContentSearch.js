import React, { useState, useEffect, useRef } from 'react';
import { useUserProgress } from '../contexts/UserProgressContext';
import { getChapterById } from '../data/bookData';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-height: 600px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  z-index: 1000;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 90%;
    max-height: 80vh;
  }
`;

const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const SearchTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  cursor: pointer;
  font-size: 20px;
  padding: 4px;
  
  &:hover {
    color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 8px;
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  font-size: 14px;
  margin-bottom: 16px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
  
  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  }
`;

const SearchFilters = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 6px 12px;
  border: 1px solid ${props => props.active ? '#667eea' : (props.theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')};
  border-radius: 6px;
  background: ${props => props.active ? '#667eea' : 'transparent'};
  color: ${props => props.active ? 'white' : (props.theme === 'dark' ? '#e2e8f0' : '#2d3748')};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #667eea;
    background: ${props => props.active ? '#667eea' : 'rgba(102, 126, 234, 0.1)'};
  }
`;

const SearchResults = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 16px;
`;

const ResultItem = styled.div`
  padding: 12px;
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  border-radius: 8px;
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    transform: translateY(-1px);
  }
`;

const ResultTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#63b3ed' : '#3182ce'};
  margin-bottom: 4px;
`;

const ResultChapter = styled.div`
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  margin-bottom: 6px;
`;

const ResultSnippet = styled.div`
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  line-height: 1.4;
  
  .highlight {
    background: rgba(102, 126, 234, 0.3);
    padding: 1px 2px;
    border-radius: 2px;
  }
`;

const SearchStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  margin-bottom: 16px;
`;

const SearchHistory = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const HistoryTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin: 0 0 8px 0;
`;

const HistoryItem = styled.div`
  padding: 6px 12px;
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  border-radius: 6px;
  margin-bottom: 4px;
  cursor: pointer;
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-size: 14px;
`;

const ContentSearch = ({ theme = 'light', isVisible = false, onClose }) => {
  const { searchHistory, addSearchHistory } = useUserProgress();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);

  const filters = [
    { id: 'all', label: 'All Content' },
    { id: 'chapters', label: 'Chapters' },
    { id: 'concepts', label: 'Concepts' },
    { id: 'definitions', label: 'Definitions' }
  ];

  useEffect(() => {
    if (isVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    if (searchTerm.trim()) {
      performSearch(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, activeFilter]);

  const performSearch = async (query) => {
    setIsSearching(true);
    
    // Simulate search delay for better UX
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const results = [];
    const searchQuery = query.toLowerCase();
    
    // Search through all chapters (1-12)
    for (let i = 1; i <= 12; i++) {
      const chapter = getChapterById(i);
      if (chapter) {
        // Search in title
        if (chapter.title.toLowerCase().includes(searchQuery)) {
          results.push({
            id: `title_${chapter.id}`,
            type: 'chapter',
            title: chapter.title,
            chapter: `Chapter ${chapter.id}`,
            snippet: chapter.description,
            chapterId: chapter.id,
            position: 'title'
          });
        }
        
        // Search in description
        if (chapter.description.toLowerCase().includes(searchQuery)) {
          results.push({
            id: `desc_${chapter.id}`,
            type: 'chapter',
            title: 'Description',
            chapter: `Chapter ${chapter.id}`,
            snippet: chapter.description,
            chapterId: chapter.id,
            position: 'description'
          });
        }
        
        // Search in content
        if (typeof chapter.content === 'string') {
          const content = chapter.content.replace(/<[^>]*>/g, ' ').toLowerCase();
          if (content.includes(searchQuery)) {
            const index = content.indexOf(searchQuery);
            const start = Math.max(0, index - 50);
            const end = Math.min(content.length, index + searchQuery.length + 50);
            const snippet = content.substring(start, end);
            
            results.push({
              id: `content_${chapter.id}_${index}`,
              type: 'content',
              title: 'Content Match',
              chapter: `Chapter ${chapter.id}`,
              snippet: snippet,
              chapterId: chapter.id,
              position: 'content'
            });
          }
        }
      }
    }
    
    // Filter results based on active filter
    let filteredResults = results;
    if (activeFilter !== 'all') {
      filteredResults = results.filter(result => {
        switch (activeFilter) {
          case 'chapters':
            return result.type === 'chapter';
          case 'concepts':
            return result.type === 'content';
          case 'definitions':
            return result.snippet.toLowerCase().includes('definition') || 
                   result.snippet.toLowerCase().includes('means') ||
                   result.snippet.toLowerCase().includes('refers to');
          default:
            return true;
        }
      });
    }
    
    setSearchResults(filteredResults);
    setIsSearching(false);
    
    // Add to search history
    if (query.trim() && filteredResults.length > 0) {
      addSearchHistory(query, filteredResults.length);
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  const handleResultClick = (result) => {
    // Navigate to the chapter
    window.location.href = `/chapter/${result.chapterId}`;
    onClose();
  };

  const handleHistoryClick = (historyItem) => {
    setSearchTerm(historyItem.query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <SearchContainer theme={theme} onKeyDown={handleKeyPress}>
      <SearchHeader>
        <SearchTitle theme={theme}>🔍 Search Content</SearchTitle>
        <CloseButton theme={theme} onClick={onClose}>×</CloseButton>
      </SearchHeader>
      
      <SearchInput
        ref={searchInputRef}
        theme={theme}
        type="text"
        placeholder="Search chapters, concepts, definitions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <SearchFilters>
        {filters.map(filter => (
          <FilterButton
            key={filter.id}
            theme={theme}
            active={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </FilterButton>
        ))}
      </SearchFilters>
      
      {searchTerm && (
        <SearchStats theme={theme}>
          <span>
            {isSearching ? 'Searching...' : `${searchResults.length} results found`}
          </span>
          <span>Filter: {filters.find(f => f.id === activeFilter)?.label}</span>
        </SearchStats>
      )}
      
      <SearchResults>
        {searchResults.length === 0 && searchTerm ? (
          <EmptyState theme={theme}>
            No results found for "{searchTerm}"
          </EmptyState>
        ) : searchResults.length > 0 ? (
          searchResults.map((result) => (
            <ResultItem 
              key={result.id} 
              theme={theme}
              onClick={() => handleResultClick(result)}
            >
              <ResultTitle theme={theme}>{result.title}</ResultTitle>
              <ResultChapter theme={theme}>{result.chapter}</ResultChapter>
              <ResultSnippet 
                theme={theme}
                dangerouslySetInnerHTML={{ 
                  __html: highlightText(result.snippet, searchTerm) 
                }}
              />
            </ResultItem>
          ))
        ) : (
          <EmptyState theme={theme}>
            Start typing to search through all content
          </EmptyState>
        )}
      </SearchResults>
      
      {searchHistory.length > 0 && (
        <SearchHistory theme={theme}>
          <HistoryTitle theme={theme}>Recent Searches</HistoryTitle>
          {searchHistory.slice(0, 5).map((historyItem, index) => (
            <HistoryItem 
              key={index} 
              theme={theme}
              onClick={() => handleHistoryClick(historyItem)}
            >
              {historyItem.query} ({historyItem.results} results)
            </HistoryItem>
          ))}
        </SearchHistory>
      )}
    </SearchContainer>
  );
};

export default ContentSearch;
