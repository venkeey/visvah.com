import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for user progress
const initialState = {
  chapters: {},
  quizzes: {},
  simulations: {},
  totalProgress: 0,
  achievements: [],
  studyTime: 0,
  lastStudyDate: null,
  bookmarks: [],
  notes: {},
  searchHistory: [],
  offlineChapters: []
};

// Action types
const PROGRESS_ACTIONS = {
  COMPLETE_CHAPTER: 'COMPLETE_CHAPTER',
  COMPLETE_QUIZ: 'COMPLETE_QUIZ',
  COMPLETE_SIMULATION: 'COMPLETE_SIMULATION',
  UPDATE_STUDY_TIME: 'UPDATE_STUDY_TIME',
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
  RESET_PROGRESS: 'RESET_PROGRESS',
  LOAD_PROGRESS: 'LOAD_PROGRESS',
  ADD_BOOKMARK: 'ADD_BOOKMARK',
  REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
  ADD_NOTE: 'ADD_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
  REMOVE_NOTE: 'REMOVE_NOTE',
  ADD_SEARCH_HISTORY: 'ADD_SEARCH_HISTORY',
  UPDATE_OFFLINE_CHAPTERS: 'UPDATE_OFFLINE_CHAPTERS'
};

// Progress reducer
function progressReducer(state, action) {
  switch (action.type) {
    case PROGRESS_ACTIONS.COMPLETE_CHAPTER:
      return {
        ...state,
        chapters: {
          ...state.chapters,
          [action.payload.chapterId]: {
            completed: true,
            completedAt: new Date().toISOString(),
            timeSpent: action.payload.timeSpent || 0,
            notes: action.payload.notes || ''
          }
        }
      };

    case PROGRESS_ACTIONS.COMPLETE_QUIZ:
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          [action.payload.quizId]: {
            completed: true,
            completedAt: new Date().toISOString(),
            score: action.payload.score,
            attempts: (state.quizzes[action.payload.quizId]?.attempts || 0) + 1,
            bestScore: Math.max(
              action.payload.score,
              state.quizzes[action.payload.quizId]?.bestScore || 0
            )
          }
        }
      };

    case PROGRESS_ACTIONS.COMPLETE_SIMULATION:
      return {
        ...state,
        simulations: {
          ...state.simulations,
          [action.payload.simulationId]: {
            completed: true,
            completedAt: new Date().toISOString(),
            timeSpent: action.payload.timeSpent || 0,
            parameters: action.payload.parameters || {}
          }
        }
      };

    case PROGRESS_ACTIONS.UPDATE_STUDY_TIME:
      return {
        ...state,
        studyTime: state.studyTime + action.payload.minutes,
        lastStudyDate: new Date().toISOString()
      };

    case PROGRESS_ACTIONS.UNLOCK_ACHIEVEMENT:
      return {
        ...state,
        achievements: [...state.achievements, {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          unlockedAt: new Date().toISOString(),
          icon: action.payload.icon
        }]
      };

    case PROGRESS_ACTIONS.RESET_PROGRESS:
      return initialState;

    case PROGRESS_ACTIONS.LOAD_PROGRESS:
      return {
        ...state,
        ...action.payload
      };

    case PROGRESS_ACTIONS.ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [...state.bookmarks, {
          id: Date.now().toString(),
          chapterId: action.payload.chapterId,
          section: action.payload.section,
          text: action.payload.text,
          position: action.payload.position,
          createdAt: new Date().toISOString(),
          tags: action.payload.tags || []
        }]
      };

    case PROGRESS_ACTIONS.REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== action.payload.id)
      };

    case PROGRESS_ACTIONS.ADD_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.payload.id]: {
            id: action.payload.id,
            chapterId: action.payload.chapterId,
            text: action.payload.text,
            position: action.payload.position,
            content: action.payload.content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        }
      };

    case PROGRESS_ACTIONS.UPDATE_NOTE:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.payload.id]: {
            ...state.notes[action.payload.id],
            content: action.payload.content,
            updatedAt: new Date().toISOString()
          }
        }
      };

    case PROGRESS_ACTIONS.REMOVE_NOTE:
      const { [action.payload.id]: removed, ...remainingNotes } = state.notes;
      return {
        ...state,
        notes: remainingNotes
      };


    case PROGRESS_ACTIONS.ADD_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: [
          action.payload,
          ...state.searchHistory.filter(item => item.query !== action.payload.query)
        ].slice(0, 10) // Keep only last 10 searches
      };

    case PROGRESS_ACTIONS.UPDATE_OFFLINE_CHAPTERS:
      const { chapterId, action: offlineAction } = action.payload;
      if (offlineAction === 'add') {
        return {
          ...state,
          offlineChapters: [...new Set([...state.offlineChapters, chapterId])]
        };
      } else if (offlineAction === 'remove') {
        return {
          ...state,
          offlineChapters: state.offlineChapters.filter(id => id !== chapterId)
        };
      }
      return state;

    default:
      return state;
  }
}

// Create context
const UserProgressContext = createContext();

// Custom hook to use the context
export function useUserProgress() {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
}

// Provider component
export function UserProgressProvider({ children }) {
  const [state, dispatch] = useReducer(progressReducer, initialState);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        dispatch({ type: PROGRESS_ACTIONS.LOAD_PROGRESS, payload: parsed });
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(state));
  }, [state]);

  // Calculate total progress
  useEffect(() => {
    const totalChapters = 12; // Total number of chapters
    const totalQuizzes = 13; // Total number of quizzes
    const totalSimulations = 9; // Total number of simulations
    
    const completedChapters = Object.keys(state.chapters).filter(
      id => state.chapters[id].completed
    ).length;
    
    const completedQuizzes = Object.keys(state.quizzes).filter(
      id => state.quizzes[id].completed
    ).length;
    
    const completedSimulations = Object.keys(state.simulations).filter(
      id => state.simulations[id].completed
    ).length;
    
    const totalCompleted = completedChapters + completedQuizzes + completedSimulations;
    const totalItems = totalChapters + totalQuizzes + totalSimulations;
    
    const progress = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;
    
    if (progress !== state.totalProgress) {
      dispatch({ 
        type: PROGRESS_ACTIONS.LOAD_PROGRESS, 
        payload: { ...state, totalProgress: progress } 
      });
    }
  }, [state.chapters, state.quizzes, state.simulations, state.totalProgress]);

  // Actions
  const actions = {
    completeChapter: (chapterId, timeSpent = 0, notes = '') => {
      dispatch({
        type: PROGRESS_ACTIONS.COMPLETE_CHAPTER,
        payload: { chapterId, timeSpent, notes }
      });
    },

    completeQuiz: (quizId, score) => {
      dispatch({
        type: PROGRESS_ACTIONS.COMPLETE_QUIZ,
        payload: { quizId, score }
      });
    },

    completeSimulation: (simulationId, timeSpent = 0, parameters = {}) => {
      dispatch({
        type: PROGRESS_ACTIONS.COMPLETE_SIMULATION,
        payload: { simulationId, timeSpent, parameters }
      });
    },

    updateStudyTime: (minutes) => {
      dispatch({
        type: PROGRESS_ACTIONS.UPDATE_STUDY_TIME,
        payload: { minutes }
      });
    },

    unlockAchievement: (id, name, description, icon) => {
      dispatch({
        type: PROGRESS_ACTIONS.UNLOCK_ACHIEVEMENT,
        payload: { id, name, description, icon }
      });
    },

    resetProgress: () => {
      dispatch({ type: PROGRESS_ACTIONS.RESET_PROGRESS });
    },

    getChapterProgress: (chapterId) => {
      return state.chapters[chapterId] || { completed: false };
    },

    getQuizProgress: (quizId) => {
      return state.quizzes[quizId] || { completed: false };
    },

    getSimulationProgress: (simulationId) => {
      return state.simulations[simulationId] || { completed: false };
    },

    // Bookmark actions
    addBookmark: (chapterId, section, text, position, tags = []) => {
      dispatch({
        type: PROGRESS_ACTIONS.ADD_BOOKMARK,
        payload: { chapterId, section, text, position, tags }
      });
    },

    removeBookmark: (bookmarkId) => {
      dispatch({
        type: PROGRESS_ACTIONS.REMOVE_BOOKMARK,
        payload: { id: bookmarkId }
      });
    },

    // Note actions
    addNote: (chapterId, text, position, content) => {
      const noteId = `${chapterId}_${Date.now()}`;
      dispatch({
        type: PROGRESS_ACTIONS.ADD_NOTE,
        payload: { id: noteId, chapterId, text, position, content }
      });
      return noteId;
    },

    updateNote: (noteId, content) => {
      dispatch({
        type: PROGRESS_ACTIONS.UPDATE_NOTE,
        payload: { id: noteId, content }
      });
    },

    removeNote: (noteId) => {
      dispatch({
        type: PROGRESS_ACTIONS.REMOVE_NOTE,
        payload: { id: noteId }
      });
    },


    // Search history actions
    addSearchHistory: (query, results) => {
      dispatch({
        type: PROGRESS_ACTIONS.ADD_SEARCH_HISTORY,
        payload: { query, results, timestamp: new Date().toISOString() }
      });
    },

    // Offline chapters actions
    updateOfflineChapters: (chapterId, action) => {
      dispatch({
        type: PROGRESS_ACTIONS.UPDATE_OFFLINE_CHAPTERS,
        payload: { chapterId, action }
      });
    },

    getOfflineChapters: () => {
      return state.offlineChapters;
    }
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
}
