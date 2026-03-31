import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const AudioContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${props => props.theme === 'dark' ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  z-index: 1000;
  min-width: 300px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    position: fixed;
    bottom: 10px;
    right: 10px;
    left: 10px;
    min-width: auto;
  }
`;

const AudioHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const AudioTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  }
`;

const AudioControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const PlayButton = styled.button`
  background: ${props => props.isPlaying ? '#e53e3e' : '#38a169'};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
    transform: none;
  }
`;

const SpeedControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SpeedLabel = styled.span`
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
`;

const SpeedSelect = styled.select`
  background: ${props => props.theme === 'dark' ? '#4a5568' : '#e2e8f0'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#2d3748'};
  border: 1px solid ${props => props.theme === 'dark' ? '#2d3748' : '#cbd5e0'};
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
`;

const ProgressContainer = styled.div`
  margin-bottom: 12px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${props => props.theme === 'dark' ? '#2d3748' : '#e2e8f0'};
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
`;

const StatusText = styled.div`
  font-size: 12px;
  color: ${props => props.theme === 'dark' ? '#a0aec0' : '#718096'};
  text-align: center;
  margin-top: 8px;
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-top: 8px;
`;

const AudioNarration = ({ 
  chapterId, 
  theme = 'light', 
  isVisible = false, 
  onClose,
  content = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  
  const speechSynthesis = useRef(null);
  const currentUtterance = useRef(null);
  const textQueue = useRef([]);
  const currentIndex = useRef(0);

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      speechSynthesis.current = window.speechSynthesis;
    } else {
      setError('Text-to-speech is not supported in this browser');
    }
  }, []);

  useEffect(() => {
    if (content && isVisible) {
      prepareTextForNarration();
    }
  }, [content, isVisible]);

  const prepareTextForNarration = () => {
    if (!content) return;
    
    // Remove HTML tags and clean up text
    const cleanText = content
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Split into sentences for better control
    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    textQueue.current = sentences.map(s => s.trim());
    currentIndex.current = 0;
    setProgress(0);
  };

  const speakText = (text) => {
    if (!speechSynthesis.current || !text) return;

    // Cancel any ongoing speech
    speechSynthesis.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setError('');
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      speakNext();
    };

    utterance.onerror = (event) => {
      setError(`Speech error: ${event.error}`);
      setIsPlaying(false);
      setIsPaused(false);
    };

    currentUtterance.current = utterance;
    speechSynthesis.current.speak(utterance);
  };

  const speakNext = () => {
    if (currentIndex.current < textQueue.current.length) {
      const nextText = textQueue.current[currentIndex.current];
      setCurrentText(nextText);
      setProgress((currentIndex.current / textQueue.current.length) * 100);
      speakText(nextText);
      currentIndex.current++;
    } else {
      // Finished all text
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      setCurrentText('');
    }
  };

  const handlePlayPause = () => {
    if (!isSupported) return;

    if (isPlaying && !isPaused) {
      // Pause
      speechSynthesis.current.pause();
      setIsPaused(true);
    } else if (isPaused) {
      // Resume
      speechSynthesis.current.resume();
      setIsPaused(false);
    } else {
      // Start or continue
      if (currentIndex.current === 0) {
        speakNext();
      } else {
        speechSynthesis.current.resume();
        setIsPaused(false);
      }
    }
  };

  const handleStop = () => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      currentIndex.current = 0;
      setProgress(0);
      setCurrentText('');
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(parseFloat(newSpeed));
    if (currentUtterance.current) {
      currentUtterance.current.rate = parseFloat(newSpeed);
    }
  };

  if (!isVisible) return null;

  return (
    <AudioContainer theme={theme}>
      <AudioHeader>
        <AudioTitle theme={theme}>Audio Narration</AudioTitle>
        <CloseButton theme={theme} onClick={onClose}>
          ✕
        </CloseButton>
      </AudioHeader>

      {!isSupported ? (
        <ErrorMessage>
          Text-to-speech is not supported in this browser. Please use Chrome, Firefox, or Safari.
        </ErrorMessage>
      ) : (
        <>
          <AudioControls>
            <PlayButton 
              isPlaying={isPlaying}
              onClick={handlePlayPause}
              disabled={!content}
            >
              {isPlaying && !isPaused ? '⏸️' : '▶️'}
            </PlayButton>
            
            <button 
              onClick={handleStop}
              style={{
                background: '#e53e3e',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              ⏹️ Stop
            </button>

            <SpeedControl>
              <SpeedLabel theme={theme}>Speed:</SpeedLabel>
              <SpeedSelect 
                theme={theme}
                value={speed}
                onChange={(e) => handleSpeedChange(e.target.value)}
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </SpeedSelect>
            </SpeedControl>
          </AudioControls>

          <ProgressContainer>
            <ProgressBar theme={theme}>
              <ProgressFill progress={progress} />
            </ProgressBar>
            <ProgressText theme={theme}>
              <span>{Math.round(progress)}%</span>
              <span>{currentIndex.current} / {textQueue.current.length}</span>
            </ProgressText>
          </ProgressContainer>

          {currentText && (
            <StatusText theme={theme}>
              Currently reading: "{currentText.substring(0, 50)}..."
            </StatusText>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
      )}
    </AudioContainer>
  );
};

export default AudioNarration;
