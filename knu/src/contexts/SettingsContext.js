import React, { createContext, useContext, useReducer, useEffect } from 'react';

const SettingsContext = createContext();

const initialState = {
  darkMode: true,
  tooltipsEnabled: true,
  fontSize: 'medium',
  highContrast: false,
  soundEffects: false,
  readingProgress: true,
  settingsPanelOpen: false,
  audioNarrationEnabled: false,
  offlineModeEnabled: false,
  notesToolEnabled: false,
  bookmarksEnabled: false,
  notesPanelVisible: false
};

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'TOGGLE_TOOLTIPS':
      return { ...state, tooltipsEnabled: !state.tooltipsEnabled };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    case 'TOGGLE_HIGH_CONTRAST':
      return { ...state, highContrast: !state.highContrast };
    case 'TOGGLE_SOUND_EFFECTS':
      return { ...state, soundEffects: !state.soundEffects };
    case 'TOGGLE_READING_PROGRESS':
      return { ...state, readingProgress: !state.readingProgress };
    case 'TOGGLE_AUDIO_NARRATION':
      return { ...state, audioNarrationEnabled: !state.audioNarrationEnabled };
    case 'TOGGLE_OFFLINE_MODE':
      return { ...state, offlineModeEnabled: !state.offlineModeEnabled };
    case 'TOGGLE_NOTES_TOOL':
      return { ...state, notesToolEnabled: !state.notesToolEnabled };
    case 'TOGGLE_BOOKMARKS':
      return { ...state, bookmarksEnabled: !state.bookmarksEnabled };
    case 'TOGGLE_NOTES_PANEL':
      return { ...state, notesPanelVisible: !state.notesPanelVisible };
    case 'TOGGLE_SETTINGS_PANEL':
      return { ...state, settingsPanelOpen: !state.settingsPanelOpen };
    case 'LOAD_SETTINGS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = {
      darkMode: localStorage.getItem('darkMode') !== null ? localStorage.getItem('darkMode') === 'true' : true,
      tooltipsEnabled: localStorage.getItem('tooltipsEnabled') !== null ? localStorage.getItem('tooltipsEnabled') !== 'false' : true,
      fontSize: localStorage.getItem('fontSize') || 'medium',
      highContrast: localStorage.getItem('highContrast') !== null ? localStorage.getItem('highContrast') === 'true' : false,
      soundEffects: localStorage.getItem('soundEffects') !== null ? localStorage.getItem('soundEffects') === 'true' : false,
      readingProgress: localStorage.getItem('readingProgress') !== null ? localStorage.getItem('readingProgress') !== 'false' : true,
      audioNarrationEnabled: localStorage.getItem('audioNarrationEnabled') !== null ? localStorage.getItem('audioNarrationEnabled') === 'true' : false,
      offlineModeEnabled: localStorage.getItem('offlineModeEnabled') !== null ? localStorage.getItem('offlineModeEnabled') === 'true' : false,
      notesToolEnabled: localStorage.getItem('notesToolEnabled') !== null ? localStorage.getItem('notesToolEnabled') === 'true' : false,
      bookmarksEnabled: localStorage.getItem('bookmarksEnabled') !== null ? localStorage.getItem('bookmarksEnabled') === 'true' : false,
      notesPanelVisible: localStorage.getItem('notesPanelVisible') !== null ? localStorage.getItem('notesPanelVisible') === 'true' : false
    };
    dispatch({ type: 'LOAD_SETTINGS', payload: savedSettings });
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('darkMode', state.darkMode);
    localStorage.setItem('tooltipsEnabled', state.tooltipsEnabled);
    localStorage.setItem('fontSize', state.fontSize);
    localStorage.setItem('highContrast', state.highContrast);
    localStorage.setItem('soundEffects', state.soundEffects);
    localStorage.setItem('readingProgress', state.readingProgress);
    localStorage.setItem('audioNarrationEnabled', state.audioNarrationEnabled);
    localStorage.setItem('offlineModeEnabled', state.offlineModeEnabled);
    localStorage.setItem('notesToolEnabled', state.notesToolEnabled);
    localStorage.setItem('bookmarksEnabled', state.bookmarksEnabled);
    localStorage.setItem('notesPanelVisible', state.notesPanelVisible);
  }, [state]);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (state.darkMode) {
      root.classList.add('dark-mode');
      body.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
      body.classList.remove('dark-mode');
    }

    // Apply font size
    root.style.setProperty('--font-size', getFontSizeValue(state.fontSize));

    // Apply high contrast
    if (state.highContrast) {
      root.classList.add('high-contrast');
      body.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
      body.classList.remove('high-contrast');
    }
  }, [state.darkMode, state.fontSize, state.highContrast]);

  const getFontSizeValue = (size) => {
    switch (size) {
      case 'small': return '14px';
      case 'medium': return '16px';
      case 'large': return '18px';
      case 'xlarge': return '20px';
      default: return '16px';
    }
  };

  const value = {
    ...state,
    dispatch
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
