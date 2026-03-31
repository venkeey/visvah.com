import React from 'react';
import styled from 'styled-components';
import { useSettings } from '../contexts/SettingsContext';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const Panel = styled.div`
  background: white;
  border-radius: 20px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid #e2e8f0;
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.9)'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease;
  
  html.dark-mode & {
    background: #1a202c;
    color: #e2e8f0;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(144, 205, 244, 0.2);
  }
`;

const Header = styled.div`
  padding: 25px 30px 20px;
  border-bottom: 1px solid #e2e8f0;
  position: relative;
  
  html.dark-mode & {
    border-bottom: 1px solid #4a5568;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  
  html.dark-mode & {
    color: #e2e8f0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #718096;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f7fafc;
    color: #4a5568;
  }
  
  html.dark-mode & {
    color: #a0aec0;
    
    &:hover {
      background: #2d3748;
      color: #e2e8f0;
    }
  }
`;

const SettingGroup = styled.div`
  padding: 20px 30px;
  border-bottom: 1px solid #f7fafc;
  
  &:last-child {
    border-bottom: none;
  }
  
  html.dark-mode & {
    border-bottom: 1px solid #2d3748;
  }
`;

const SettingLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.05);
  }
  
  html.dark-mode & {
    &:hover {
      background: rgba(102, 126, 234, 0.1);
    }
  }
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-top: 4px;
  
  html.dark-mode & {
    color: #a0aec0;
  }
`;

const Toggle = styled.button`
  width: 50px;
  height: 26px;
  background: ${props => {
    if (props.active) {
      return props.theme === 'dark' ? '#90cdf4' : '#667eea';
    }
    return props.theme === 'dark' ? '#2d3748' : '#e2e8f0';
  }};
  border-radius: 13px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
  outline: none;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '26px' : '2px'};
    width: 22px;
    height: 22px;
    background: ${props => {
      if (props.active) {
        return props.theme === 'dark' ? '#1a202c' : 'white';
      }
      return props.theme === 'dark' ? '#e2e8f0' : 'white';
    }};
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #2d3748;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  min-width: 120px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  html.dark-mode & {
    background: #2d3748;
    color: #e2e8f0;
    border-color: #4a5568;
    
    &:focus {
      border-color: #667eea;
    }
  }
`;


const SettingsPanel = () => {
  const { 
    settingsPanelOpen, 
    darkMode, 
    tooltipsEnabled, 
    fontSize, 
    highContrast, 
    soundEffects, 
    readingProgress,
    audioNarrationEnabled,
    offlineModeEnabled,
    notesToolEnabled,
    notesPanelVisible,
    bookmarksEnabled,
    dispatch 
  } = useSettings();

  const handleToggle = (setting) => {
    let actionType;
    switch (setting) {
      case 'darkMode':
        actionType = 'TOGGLE_DARK_MODE';
        break;
      case 'tooltipsEnabled':
        actionType = 'TOGGLE_TOOLTIPS';
        break;
      case 'highContrast':
        actionType = 'TOGGLE_HIGH_CONTRAST';
        break;
      case 'soundEffects':
        actionType = 'TOGGLE_SOUND_EFFECTS';
        break;
      case 'readingProgress':
        actionType = 'TOGGLE_READING_PROGRESS';
        break;
      case 'audioNarrationEnabled':
        actionType = 'TOGGLE_AUDIO_NARRATION';
        break;
      case 'offlineModeEnabled':
        actionType = 'TOGGLE_OFFLINE_MODE';
        break;
      case 'notesToolEnabled':
        actionType = 'TOGGLE_NOTES_TOOL';
        break;
      case 'notesPanelVisible':
        actionType = 'TOGGLE_NOTES_PANEL';
        break;
      case 'bookmarksEnabled':
        actionType = 'TOGGLE_BOOKMARKS';
        break;
      default:
        actionType = `TOGGLE_${setting.toUpperCase()}`;
    }
    dispatch({ type: actionType });
  };

  const handleFontSizeChange = (e) => {
    dispatch({ type: 'SET_FONT_SIZE', payload: e.target.value });
  };

  const closePanel = () => {
    dispatch({ type: 'TOGGLE_SETTINGS_PANEL' });
  };

  return (
    <Overlay isOpen={settingsPanelOpen} onClick={closePanel}>
      <Panel isOpen={settingsPanelOpen} onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>⚙️ Settings</Title>
          <CloseButton onClick={closePanel}>×</CloseButton>
        </Header>

        <SettingGroup>
          <SettingLabel>
            <div>
              <div>🌙 Dark Mode</div>
              <Description>Switch between light and dark themes</Description>
            </div>
            <Toggle active={darkMode} theme={darkMode ? 'dark' : 'light'} onClick={() => handleToggle('darkMode')} />
          </SettingLabel>
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>
            <div>
              <div>💡 Tooltips</div>
              <Description>Show helpful tooltips and explanations</Description>
            </div>
            <Toggle active={tooltipsEnabled} theme={darkMode ? 'dark' : 'light'} onClick={() => handleToggle('tooltipsEnabled')} />
          </SettingLabel>
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>
            <div>
              <div>📝 Font Size</div>
              <Description>Adjust text size for better readability</Description>
            </div>
            <Select value={fontSize} onChange={handleFontSizeChange}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xlarge">Extra Large</option>
            </Select>
          </SettingLabel>
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>
            <div>
              <div>🎨 High Contrast</div>
              <Description>Increase contrast for better visibility</Description>
            </div>
            <Toggle active={highContrast} theme={darkMode ? 'dark' : 'light'} onClick={() => handleToggle('highContrast')} />
          </SettingLabel>
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>
            <div>
              <div>🔊 Sound Effects</div>
              <Description>Play sounds for interactions</Description>
            </div>
            <Toggle active={soundEffects} theme={darkMode ? 'dark' : 'light'} onClick={() => handleToggle('soundEffects')} />
          </SettingLabel>
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>
            <div>
              <div>📊 Reading Progress</div>
              <Description>Track your reading progress</Description>
            </div>
            <Toggle active={readingProgress} theme={darkMode ? 'dark' : 'light'} onClick={() => handleToggle('readingProgress')} />
          </SettingLabel>
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>
            <div>
              <div>🔊 Audio Narration</div>
              <Description>Enable text-to-speech for chapter content</Description>
            </div>
            <Toggle active={audioNarrationEnabled} theme={darkMode ? 'dark' : 'light'} onClick={() => handleToggle('audioNarrationEnabled')} />
          </SettingLabel>
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>
            <div>
              <div>📱 Offline Mode</div>
              <Description>Download chapters for offline reading</Description>
            </div>
            <Toggle active={offlineModeEnabled} theme={darkMode ? 'dark' : 'light'} onClick={() => handleToggle('offlineModeEnabled')} />
          </SettingLabel>
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>
            <div>
              <div>📝 Notes Panel</div>
              <Description>Show notes panel in top right corner</Description>
            </div>
            <Toggle active={notesPanelVisible} theme={darkMode ? 'dark' : 'light'} onClick={() => handleToggle('notesPanelVisible')} />
          </SettingLabel>
        </SettingGroup>

        <SettingGroup>
          <SettingLabel>
            <div>
              <div>🔖 Bookmarks</div>
              <Description>Enable bookmarking functionality</Description>
            </div>
            <Toggle active={bookmarksEnabled} theme={darkMode ? 'dark' : 'light'} onClick={() => handleToggle('bookmarksEnabled')} />
          </SettingLabel>
        </SettingGroup>
      </Panel>
    </Overlay>
  );
};

export default SettingsPanel;


