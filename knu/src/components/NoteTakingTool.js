import React, { useState, useEffect, useRef } from 'react';
import { useUserProgress } from '../contexts/UserProgressContext';
import styled from 'styled-components';

const NoteContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  max-height: 500px;
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

const NoteHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const NoteTitle = styled.h3`
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

const SelectedText = styled.div`
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 14px;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  line-height: 1.4;
  border-left: 3px solid #667eea;
`;

const NoteTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 6px;
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  font-size: 14px;
  line-height: 1.4;
  resize: vertical;
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

const NoteActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const NoteButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.save {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
  }
  
  &.cancel {
    background: ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
    color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
    
    &:hover {
      background: ${props => props.theme === 'dark' ? '#2d3748' : '#cbd5e0'};
    }
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const NotesListContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
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
    right: auto;
    width: 100%;
    margin: 16px 0;
    max-height: 300px;
  }
`;

const NotesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const NotesTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin: 0;
`;

const NotesCount = styled.span`
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  padding: 2px 8px;
  border-radius: 12px;
`;

const NoteItem = styled.div`
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

const NoteText = styled.div`
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  margin-bottom: 4px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NoteMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
`;

const NoteDate = styled.span``;

const NoteItemActions = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
`;

const NoteItemButton = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.edit {
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

const EmptyState = styled.div`
  text-align: center;
  padding: 20px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  font-size: 12px;
`;

const NoteTakingTool = ({ chapterId, theme = 'light', isVisible = false, onClose, selectedText = '', selectedPosition = null }) => {
  const { notes, addNote, updateNote, removeNote } = useUserProgress();
  const [noteContent, setNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const textareaRef = useRef(null);

  // Filter notes for current chapter
  const chapterNotes = Object.values(notes).filter(note => note.chapterId === chapterId);

  useEffect(() => {
    if (isVisible && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isVisible]);

  const handleSaveNote = () => {
    if (noteContent.trim()) {
      if (editingNoteId) {
        updateNote(editingNoteId, noteContent);
        setEditingNoteId(null);
      } else {
        addNote(chapterId, selectedText, selectedPosition, noteContent);
      }
      setNoteContent('');
      onClose();
    }
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setNoteContent(note.content);
  };

  const handleDeleteNote = (noteId) => {
    removeNote(noteId);
  };

  const handleCancel = () => {
    setNoteContent('');
    setEditingNoteId(null);
    onClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isVisible) return null;

  return (
    <NoteContainer theme={theme}>
      <NoteHeader>
        <NoteTitle theme={theme}>
          {editingNoteId ? 'Edit Note' : 'Add Note'}
        </NoteTitle>
        <CloseButton theme={theme} onClick={handleCancel}>×</CloseButton>
      </NoteHeader>
      
      {selectedText && (
        <SelectedText theme={theme}>
          "{selectedText}"
        </SelectedText>
      )}
      
      <NoteTextarea
        ref={textareaRef}
        theme={theme}
        placeholder="Write your note here..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      
      <NoteActions>
        <NoteButton 
          className="cancel" 
          theme={theme}
          onClick={handleCancel}
        >
          Cancel
        </NoteButton>
        <NoteButton 
          className="save" 
          theme={theme}
          onClick={handleSaveNote}
          disabled={!noteContent.trim()}
        >
          {editingNoteId ? 'Update' : 'Save'} Note
        </NoteButton>
      </NoteActions>
    </NoteContainer>
  );
};

// Notes List Component
export const NotesListComponent = ({ chapterId, theme = 'light' }) => {
  const { notes, removeNote } = useUserProgress();
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Filter notes for current chapter
  const chapterNotes = Object.values(notes).filter(note => note.chapterId === chapterId);

  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
  };

  const handleDeleteNote = (noteId) => {
    removeNote(noteId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <NotesListContainer theme={theme}>
      <NotesHeader>
        <NotesTitle theme={theme}>Notes</NotesTitle>
        <NotesCount theme={theme}>{chapterNotes.length}</NotesCount>
      </NotesHeader>
      
      <div>
        {chapterNotes.length === 0 ? (
          <EmptyState theme={theme}>
            No notes yet.<br />
            Select text and click the note button to add notes.
          </EmptyState>
        ) : (
          chapterNotes.map((note) => (
            <NoteItem key={note.id} theme={theme}>
              <NoteText theme={theme}>
                {note.content}
              </NoteText>
              <NoteMeta theme={theme}>
                <NoteDate theme={theme}>
                  {formatDate(note.updatedAt || note.createdAt)}
                </NoteDate>
              </NoteMeta>
              <NoteItemActions>
                <NoteItemButton 
                  className="edit" 
                  theme={theme}
                  onClick={() => handleEditNote(note)}
                >
                  Edit
                </NoteItemButton>
                <NoteItemButton 
                  className="delete"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Delete
                </NoteItemButton>
              </NoteItemActions>
            </NoteItem>
          ))
        )}
      </div>
    </NotesListContainer>
  );
};

export default NoteTakingTool;
