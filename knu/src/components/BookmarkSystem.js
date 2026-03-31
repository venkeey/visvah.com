import React, { useState, useEffect } from 'react';
import { useUserProgress } from '../contexts/UserProgressContext';
import styled from 'styled-components';

const BookmarkContainer = styled.div`
  position: fixed;
  top: 80px;
  left: 20px;
  width: 300px;
  max-height: 400px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  z-index: 100;
  transition: all 0.3s ease;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    margin: 16px 0;
    max-height: 300px;
  }
`;

const BookmarkHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const BookmarkTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin: 0;
`;

const BookmarkCount = styled.span`
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  padding: 2px 8px;
  border-radius: 12px;
`;

const BookmarkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BookmarkItem = styled.div`
  padding: 12px;
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  border-radius: 8px;
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    transform: translateY(-1px);
  }
`;

const BookmarkText = styled.div`
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 4px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BookmarkMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
`;

const BookmarkChapter = styled.span`
  font-weight: 500;
`;

const BookmarkDate = styled.span``;

const BookmarkActions = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
`;

const BookmarkButton = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.view {
    background: ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
    color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
    
    &:hover {
      background: ${props => props.theme === 'dark' ? '#2d3748' : '#cbd5e0'};
    }
  }
  
  &.delete {
    background: #fed7d7;
    color: #c53030;
    
    &:hover {
      background: #feb2b2;
    }
  }
`;

const AddBookmarkButton = styled.button`
  width: 100%;
  padding: 8px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 20px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-size: 12px;
`;

const BookmarkSystem = ({ chapterId, theme = 'light' }) => {
  const { bookmarks, addBookmark, removeBookmark } = useUserProgress();
  const [selectedText, setSelectedText] = useState('');
  const [showAddButton, setShowAddButton] = useState(false);

  // Filter bookmarks for current chapter
  const chapterBookmarks = bookmarks.filter(bookmark => bookmark.chapterId === chapterId);

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      
      if (text.length > 0 && text.length < 200) {
        setSelectedText(text);
        setShowAddButton(true);
      } else {
        setSelectedText('');
        setShowAddButton(false);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, []);

  const handleAddBookmark = () => {
    if (selectedText) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      addBookmark(
        chapterId,
        'Selected Text',
        selectedText,
        {
          x: rect.left,
          y: rect.top,
          scrollY: window.scrollY
        }
      );
      
      setSelectedText('');
      setShowAddButton(false);
      selection.removeAllRanges();
    }
  };

  const handleViewBookmark = (bookmark) => {
    // Scroll to the bookmark position
    window.scrollTo({
      top: bookmark.position.scrollY,
      behavior: 'smooth'
    });
  };

  const handleDeleteBookmark = (bookmarkId) => {
    removeBookmark(bookmarkId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <BookmarkContainer theme={theme}>
      <BookmarkHeader>
        <BookmarkTitle theme={theme}>Bookmarks</BookmarkTitle>
        <BookmarkCount theme={theme}>{chapterBookmarks.length}</BookmarkCount>
      </BookmarkHeader>
      
      {showAddButton && (
        <AddBookmarkButton onClick={handleAddBookmark} theme={theme}>
          📌 Bookmark Selected Text
        </AddBookmarkButton>
      )}
      
      <BookmarkList>
        {chapterBookmarks.length === 0 ? (
          <EmptyState theme={theme}>
            No bookmarks yet.<br />
            Select text to create a bookmark.
          </EmptyState>
        ) : (
          chapterBookmarks.map((bookmark) => (
            <BookmarkItem key={bookmark.id} theme={theme}>
              <BookmarkText theme={theme}>
                "{bookmark.text}"
              </BookmarkText>
              <BookmarkMeta theme={theme}>
                <BookmarkChapter theme={theme}>
                  Chapter {bookmark.chapterId}
                </BookmarkChapter>
                <BookmarkDate theme={theme}>
                  {formatDate(bookmark.createdAt)}
                </BookmarkDate>
              </BookmarkMeta>
              <BookmarkActions>
                <BookmarkButton 
                  className="view" 
                  theme={theme}
                  onClick={() => handleViewBookmark(bookmark)}
                >
                  View
                </BookmarkButton>
                <BookmarkButton 
                  className="delete"
                  onClick={() => handleDeleteBookmark(bookmark.id)}
                >
                  Delete
                </BookmarkButton>
              </BookmarkActions>
            </BookmarkItem>
          ))
        )}
      </BookmarkList>
    </BookmarkContainer>
  );
};

export default BookmarkSystem;

