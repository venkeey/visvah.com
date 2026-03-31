import React, { useState, useEffect } from 'react';
import './AchievementSystem.css';

// Achievement data
const ACHIEVEMENTS = {
  // Chapter achievements
  FIRST_CHAPTER: {
    id: 'FIRST_CHAPTER',
    name: 'First Steps',
    description: 'Complete your first chapter',
    icon: '📚',
    category: 'chapters',
    requirement: 1,
    points: 10
  },
  CHAPTER_MASTER: {
    id: 'CHAPTER_MASTER',
    name: 'Chapter Master',
    description: 'Complete all 12 chapters',
    icon: '👑',
    category: 'chapters',
    requirement: 12,
    points: 100
  },
  
  // Quiz achievements
  FIRST_QUIZ: {
    id: 'FIRST_QUIZ',
    name: 'Quiz Novice',
    description: 'Complete your first quiz',
    icon: '❓',
    category: 'quizzes',
    requirement: 1,
    points: 15
  },
  PERFECT_SCORE: {
    id: 'PERFECT_SCORE',
    name: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: '⭐',
    category: 'quizzes',
    requirement: 1,
    points: 25
  },
  QUIZ_MASTER: {
    id: 'QUIZ_MASTER',
    name: 'Quiz Master',
    description: 'Complete all quizzes',
    icon: '🏆',
    category: 'quizzes',
    requirement: 13,
    points: 150
  },
  
  // Simulation achievements
  FIRST_SIMULATION: {
    id: 'FIRST_SIMULATION',
    name: 'Simulation Explorer',
    description: 'Complete your first simulation',
    icon: '🔬',
    category: 'simulations',
    requirement: 1,
    points: 20
  },
  SIMULATION_MASTER: {
    id: 'SIMULATION_MASTER',
    name: 'Simulation Master',
    description: 'Complete all simulations',
    icon: '🧪',
    category: 'simulations',
    requirement: 9,
    points: 200
  },
  
  // Study time achievements
  STUDY_STRETCHER: {
    id: 'STUDY_STRETCHER',
    name: 'Study Stretcher',
    description: 'Study for 1 hour total',
    icon: '⏰',
    category: 'study_time',
    requirement: 60,
    points: 30
  },
  STUDY_MASTER: {
    id: 'STUDY_MASTER',
    name: 'Study Master',
    description: 'Study for 10 hours total',
    icon: '🎯',
    category: 'study_time',
    requirement: 600,
    points: 100
  },
  
  // Streak achievements
  DAILY_LEARNER: {
    id: 'DAILY_LEARNER',
    name: 'Daily Learner',
    description: 'Study for 7 consecutive days',
    icon: '📅',
    category: 'streak',
    requirement: 7,
    points: 50
  },
  WEEKLY_WARRIOR: {
    id: 'WEEKLY_WARRIOR',
    name: 'Weekly Warrior',
    description: 'Study for 4 consecutive weeks',
    icon: '🗓️',
    category: 'streak',
    requirement: 28,
    points: 200
  }
};

const AchievementSystem = ({ userProgress, onAchievementUnlocked }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationAchievement, setNotificationAchievement] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);

  // Check and unlock achievements based on progress
  useEffect(() => {
    if (!userProgress) return;

    const newUnlocked = [];
    let points = 0;

    Object.values(ACHIEVEMENTS).forEach(achievement => {
      const isUnlocked = checkAchievementUnlocked(achievement, userProgress);
      
      if (isUnlocked && !unlockedAchievements.find(a => a.id === achievement.id)) {
        newUnlocked.push(achievement);
        showAchievementNotification(achievement);
      }

      if (isUnlocked) {
        points += achievement.points;
      }
    });

    if (newUnlocked.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newUnlocked]);
      setTotalPoints(points);
      
      // Notify parent component
      if (onAchievementUnlocked) {
        newUnlocked.forEach(achievement => {
          onAchievementUnlocked(achievement);
        });
      }
    } else {
      setTotalPoints(points);
    }
  }, [userProgress, unlockedAchievements, onAchievementUnlocked]);

  // Check if an achievement should be unlocked
  const checkAchievementUnlocked = (achievement, progress) => {
    switch (achievement.category) {
      case 'chapters':
        const completedChapters = Object.keys(progress.chapters || {}).filter(
          id => progress.chapters[id].completed
        ).length;
        return completedChapters >= achievement.requirement;
        
      case 'quizzes':
        const completedQuizzes = Object.keys(progress.quizzes || {}).filter(
          id => progress.quizzes[id].completed
        ).length;
        return completedQuizzes >= achievement.requirement;
        
      case 'simulations':
        const completedSimulations = Object.keys(progress.simulations || {}).filter(
          id => progress.simulations[id].completed
        ).length;
        return completedSimulations >= achievement.requirement;
        
      case 'study_time':
        return (progress.studyTime || 0) >= achievement.requirement;
        
      case 'streak':
        // Simple streak calculation - can be enhanced
        return progress.lastStudyDate && 
               new Date(progress.lastStudyDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        
      default:
        return false;
    }
  };

  // Show achievement notification
  const showAchievementNotification = (achievement) => {
    setNotificationAchievement(achievement);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
      setNotificationAchievement(null);
    }, 4000);
  };

  // Get achievement progress
  const getAchievementProgress = (achievement) => {
    if (!userProgress) return 0;
    
    let current = 0;
    let total = achievement.requirement;
    
    switch (achievement.category) {
      case 'chapters':
        current = Object.keys(userProgress.chapters || {}).filter(
          id => userProgress.chapters[id].completed
        ).length;
        break;
      case 'quizzes':
        current = Object.keys(userProgress.quizzes || {}).filter(
          id => userProgress.quizzes[id].completed
        ).length;
        break;
      case 'simulations':
        current = Object.keys(userProgress.simulations || {}).filter(
          id => userProgress.simulations[id].completed
        ).length;
        break;
      case 'study_time':
        current = userProgress.studyTime || 0;
        break;
      default:
        current = 0;
    }
    
    return Math.min(current, total);
  };

  // Group achievements by category
  const groupedAchievements = Object.values(ACHIEVEMENTS).reduce((groups, achievement) => {
    const category = achievement.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(achievement);
    return groups;
  }, {});

  return (
    <div className="achievement-system">
      {/* Achievement Notification */}
      {showNotification && notificationAchievement && (
        <div className="achievement-notification">
          <div className="achievement-notification-content">
            <div className="achievement-icon">{notificationAchievement.icon}</div>
            <div className="achievement-info">
              <h3>Achievement Unlocked!</h3>
              <p className="achievement-name">{notificationAchievement.name}</p>
              <p className="achievement-description">{notificationAchievement.description}</p>
              <p className="achievement-points">+{notificationAchievement.points} points</p>
            </div>
          </div>
        </div>
      )}

      {/* Total Points Display */}
      <div className="total-points">
        <div className="points-icon">🏆</div>
        <div className="points-info">
          <span className="points-label">Total Points</span>
          <span className="points-value">{totalPoints}</span>
        </div>
      </div>

      {/* Achievement Categories */}
      <div className="achievement-categories">
        {Object.entries(groupedAchievements).map(([category, achievements]) => (
          <div key={category} className="achievement-category">
            <h3 className="category-title">
              {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
            </h3>
            <div className="achievements-grid">
              {achievements.map(achievement => {
                const isUnlocked = unlockedAchievements.find(a => a.id === achievement.id);
                const progress = getAchievementProgress(achievement);
                const progressPercentage = (progress / achievement.requirement) * 100;
                
                return (
                  <div 
                    key={achievement.id} 
                    className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                  >
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-content">
                      <h4 className="achievement-name">{achievement.name}</h4>
                      <p className="achievement-description">{achievement.description}</p>
                      <div className="achievement-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                        <span className="progress-text">
                          {progress} / {achievement.requirement}
                        </span>
                      </div>
                      <div className="achievement-points">
                        {achievement.points} points
                      </div>
                    </div>
                    {isUnlocked && (
                      <div className="unlock-badge">✓</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSystem;
