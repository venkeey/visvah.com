import React, { useState, useEffect } from 'react';
import { useUserProgress } from '../contexts/UserProgressContext';
import ProgressBar, { OverallProgressBar, ChapterProgressBar, QuizProgressBar } from './ProgressBar';
import AchievementSystem from './AchievementSystem';
import './ProgressDashboard.css';

const ProgressDashboard = () => {
  const {
    totalProgress,
    chapters,
    quizzes,
    simulations,
    studyTime,
    lastStudyDate,
    achievements
  } = useUserProgress();

  const [activeTab, setActiveTab] = useState('overview');
  const [studyStartTime, setStudyStartTime] = useState(null);
  const [currentStudySession, setCurrentStudySession] = useState(0);

  // Start study timer when component mounts
  useEffect(() => {
    if (!studyStartTime) {
      setStudyStartTime(Date.now());
    }
  }, [studyStartTime]);

  // Update study time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (studyStartTime) {
        const elapsedMinutes = Math.floor((Date.now() - studyStartTime) / (1000 * 60));
        setCurrentStudySession(elapsedMinutes);
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [studyStartTime]);

  // Calculate statistics
  const completedChapters = Object.keys(chapters).filter(id => chapters[id].completed).length;
  const completedQuizzes = Object.keys(quizzes).filter(id => quizzes[id].completed).length;
  const completedSimulations = Object.keys(simulations).filter(id => simulations[id].completed).length;
  
  const totalChapters = 12;
  const totalQuizzes = 13;
  const totalSimulations = 9;

  const chapterProgress = Math.round((completedChapters / totalChapters) * 100);
  const quizProgress = Math.round((completedQuizzes / totalQuizzes) * 100);
  const simulationProgress = Math.round((completedSimulations / totalSimulations) * 100);

  // Format study time
  const formatStudyTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // Format last study date
  const formatLastStudyDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'chapters', label: 'Chapters', icon: '📚' },
    { id: 'quizzes', label: 'Quizzes', icon: '❓' },
    { id: 'simulations', label: 'Simulations', icon: '🔬' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' }
  ];

  return (
    <div className="progress-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Your Learning Progress</h1>
        <p>Track your journey through the Tokenomics Book</p>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-tab">
            {/* Overall Progress */}
            <div className="overview-section">
              <h2>Overall Progress</h2>
              <OverallProgressBar totalProgress={totalProgress} />
              <div className="progress-stats">
                <div className="stat-item">
                  <span className="stat-label">Chapters</span>
                  <span className="stat-value">{completedChapters}/{totalChapters}</span>
                  <span className="stat-percentage">{chapterProgress}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Quizzes</span>
                  <span className="stat-value">{completedQuizzes}/{totalQuizzes}</span>
                  <span className="stat-percentage">{quizProgress}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Simulations</span>
                  <span className="stat-value">{completedSimulations}/{totalSimulations}</span>
                  <span className="stat-percentage">{simulationProgress}%</span>
                </div>
              </div>
            </div>

            {/* Study Statistics */}
            <div className="overview-section">
              <h2>Study Statistics</h2>
              <div className="study-stats">
                <div className="study-stat-card">
                  <div className="stat-icon">⏰</div>
                  <div className="stat-content">
                    <h3>Total Study Time</h3>
                    <p className="stat-value">{formatStudyTime(studyTime + currentStudySession)}</p>
                  </div>
                </div>
                <div className="study-stat-card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-content">
                    <h3>Last Study Session</h3>
                    <p className="stat-value">{formatLastStudyDate(lastStudyDate)}</p>
                  </div>
                </div>
                <div className="study-stat-card">
                  <div className="stat-icon">🏆</div>
                  <div className="stat-content">
                    <h3>Achievements Unlocked</h3>
                    <p className="stat-value">{achievements.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="overview-section">
              <h2>Quick Actions</h2>
              <div className="quick-actions">
                <button className="action-button primary">
                  📚 Continue Reading
                </button>
                <button className="action-button secondary">
                  ❓ Take a Quiz
                </button>
                <button className="action-button secondary">
                  🔬 Run Simulation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chapters Tab */}
        {activeTab === 'chapters' && (
          <div className="chapters-tab">
            <h2>Chapter Progress</h2>
            <div className="chapters-grid">
              {Array.from({ length: totalChapters }, (_, i) => {
                const chapterId = `chapter${String(i + 1).padStart(2, '0')}`;
                const chapterProgress = chapters[chapterId];
                const isCompleted = chapterProgress?.completed;
                
                return (
                  <div key={chapterId} className={`chapter-card ${isCompleted ? 'completed' : ''}`}>
                    <div className="chapter-header">
                      <h3>Chapter {i + 1}</h3>
                      {isCompleted && <span className="completion-badge">✓</span>}
                    </div>
                    <ChapterProgressBar
                      totalSections={4}
                      completedSections={isCompleted ? 4 : 0}
                    />
                    {isCompleted && (
                      <div className="completion-info">
                        <p>Completed: {new Date(chapterProgress.completedAt).toLocaleDateString()}</p>
                        <p>Time spent: {formatStudyTime(chapterProgress.timeSpent || 0)}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div className="quizzes-tab">
            <h2>Quiz Progress</h2>
            <div className="quizzes-grid">
              {Array.from({ length: totalQuizzes }, (_, i) => {
                const quizId = `quiz${i + 1}`;
                const quizProgress = quizzes[quizId];
                const isCompleted = quizProgress?.completed;
                
                return (
                  <div key={quizId} className={`quiz-card ${isCompleted ? 'completed' : ''}`}>
                    <div className="quiz-header">
                      <h3>Quiz {i + 1}</h3>
                      {isCompleted && <span className="completion-badge">✓</span>}
                    </div>
                    {isCompleted ? (
                      <div className="quiz-results">
                        <p>Score: {quizProgress.score}%</p>
                        <p>Best Score: {quizProgress.bestScore}%</p>
                        <p>Attempts: {quizProgress.attempts}</p>
                        <p>Completed: {new Date(quizProgress.completedAt).toLocaleDateString()}</p>
                      </div>
                    ) : (
                      <p className="not-started">Not started yet</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Simulations Tab */}
        {activeTab === 'simulations' && (
          <div className="simulations-tab">
            <h2>Simulation Progress</h2>
            <div className="simulations-grid">
              {Array.from({ length: totalSimulations }, (_, i) => {
                const simulationId = `simulation${i + 1}`;
                const simulationProgress = simulations[simulationId];
                const isCompleted = simulationProgress?.completed;
                
                return (
                  <div key={simulationId} className={`simulation-card ${isCompleted ? 'completed' : ''}`}>
                    <div className="simulation-header">
                      <h3>Simulation {i + 1}</h3>
                      {isCompleted && <span className="completion-badge">✓</span>}
                    </div>
                    {isCompleted ? (
                      <div className="simulation-results">
                        <p>Time spent: {formatStudyTime(simulationProgress.timeSpent || 0)}</p>
                        <p>Completed: {new Date(simulationProgress.completedAt).toLocaleDateString()}</p>
                      </div>
                    ) : (
                      <p className="not-started">Not started yet</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="achievements-tab">
            <AchievementSystem 
              userProgress={{
                chapters,
                quizzes,
                simulations,
                studyTime: studyTime + currentStudySession,
                lastStudyDate
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressDashboard;
