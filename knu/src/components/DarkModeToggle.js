import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const ToggleButton = styled.button`
  background: ${props => props.darkMode 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
  border: none;
  border-radius: 25px;
  width: 50px;
  height: 25px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ToggleSlider = styled.div`
  position: absolute;
  top: 2px;
  left: ${props => props.darkMode ? '27px' : '2px'};
  width: 21px;
  height: 21px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const Icon = styled.span`
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s ease;
  color: ${props => props.darkMode ? '#667eea' : '#f5576c'};
`;

const Tooltip = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  margin-top: 5px;
  z-index: 1000;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-bottom-color: rgba(0, 0, 0, 0.8);
  }
  
  ${ToggleContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const DarkModeToggle = () => {
  const { darkMode, dispatch } = useSettings();

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <ToggleContainer>
      <ToggleButton 
        darkMode={darkMode} 
        onClick={toggleDarkMode}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <ToggleSlider darkMode={darkMode}>
          <Icon visible={!darkMode} darkMode={darkMode}>
            ☀️
          </Icon>
          <Icon visible={darkMode} darkMode={darkMode}>
            🌙
          </Icon>
        </ToggleSlider>
      </ToggleButton>
      <Tooltip>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </Tooltip>
    </ToggleContainer>
  );
};

export default DarkModeToggle;



