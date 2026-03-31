import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

const ProgressBar = ({ 
  progress, 
  total, 
  completed, 
  showPercentage = true, 
  showCount = true, 
  variant = 'default', // 'default', 'success', 'warning', 'danger'
  size = 'medium', // 'small', 'medium', 'large'
  animated = true,
  className = ''
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Calculate progress percentage
  const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Animate progress bar when it becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (animated) {
            // Animate from 0 to actual progress
            setDisplayProgress(0);
            setTimeout(() => {
              setDisplayProgress(progressPercentage);
            }, 100);
          } else {
            setDisplayProgress(progressPercentage);
          }
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(`.progress-bar-${Math.random().toString(36).substr(2, 9)}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [progressPercentage, animated]);

  // Update display progress when progress changes
  useEffect(() => {
    if (isVisible && !animated) {
      setDisplayProgress(progressPercentage);
    }
  }, [progressPercentage, isVisible, animated]);

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return { backgroundColor: '#10b981', progressColor: '#059669' };
      case 'warning':
        return { backgroundColor: '#f59e0b', progressColor: '#d97706' };
      case 'danger':
        return { backgroundColor: '#ef4444', progressColor: '#dc2626' };
      default:
        return { backgroundColor: '#3b82f6', progressColor: '#2563eb' };
    }
  };

  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { height: '8px', fontSize: '12px' };
      case 'large':
        return { height: '16px', fontSize: '16px' };
      default:
        return { height: '12px', fontSize: '14px' };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <div className={`progress-bar progress-bar-${Math.random().toString(36).substr(2, 9)} ${className}`}>
      {/* Progress Info */}
      {(showPercentage || showCount) && (
        <div className="progress-info" style={{ fontSize: sizeStyles.fontSize }}>
          {showCount && (
            <span className="progress-count">
              {completed} / {total}
            </span>
          )}
          {showPercentage && (
            <span className="progress-percentage">
              {progressPercentage}%
            </span>
          )}
        </div>
      )}

      {/* Progress Bar Container */}
      <div 
        className="progress-container"
        style={{ 
          height: sizeStyles.height,
          backgroundColor: variantStyles.backgroundColor 
        }}
      >
        {/* Progress Fill */}
        <div
          className={`progress-fill ${animated ? 'animated' : ''}`}
          style={{
            width: `${displayProgress}%`,
            backgroundColor: variantStyles.progressColor,
            transition: animated ? 'width 1s ease-out' : 'none'
          }}
        />
        
        {/* Progress Glow Effect */}
        {animated && (
          <div
            className="progress-glow"
            style={{
              width: `${displayProgress}%`,
              backgroundColor: variantStyles.progressColor
            }}
          />
        )}
      </div>

      {/* Progress Labels */}
      {progress && progress.labels && (
        <div className="progress-labels">
          {progress.labels.map((label, index) => (
            <span 
              key={index} 
              className={`progress-label ${index < completed ? 'completed' : ''}`}
              style={{ fontSize: sizeStyles.fontSize }}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Specialized Progress Bar Components
export const ChapterProgressBar = ({ chapterId, totalSections, completedSections, className }) => (
  <ProgressBar
    progress={{
      labels: ['Introduction', 'Content', 'Exercises', 'Summary']
    }}
    total={totalSections}
    completed={completedSections}
    variant="success"
    size="medium"
    className={`chapter-progress ${className || ''}`}
  />
);

export const QuizProgressBar = ({ quizId, totalQuestions, correctAnswers, className }) => (
  <ProgressBar
    total={totalQuestions}
    completed={correctAnswers}
    variant="warning"
    size="small"
    showCount={true}
    showPercentage={true}
    className={`quiz-progress ${className || ''}`}
  />
);

export const OverallProgressBar = ({ totalProgress, className }) => (
  <ProgressBar
    total={100}
    completed={totalProgress}
    variant="default"
    size="large"
    showCount={false}
    showPercentage={true}
    className={`overall-progress ${className || ''}`}
  />
);

export default ProgressBar;
