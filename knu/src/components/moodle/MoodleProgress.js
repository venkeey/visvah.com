import React from 'react';
import { ContentSection, ProgressBar, ProgressFill, Badge } from './MoodleStyles';

const MoodleProgress = ({ theme, courseProgress, achievements, discussionPosts, dailyQuestion, dailyQuestionStreak, dailyQuestionHistory }) => {
  const correctCount = dailyQuestionHistory.filter(q => q.correct).length;
  const successRate = dailyQuestionHistory.length > 0
    ? Math.round((correctCount / dailyQuestionHistory.length) * 100)
    : 0;
  const totalPoints = dailyQuestionHistory.reduce((sum, q) => sum + q.points, 0);

  return (
    <ContentSection theme={theme}>
      <h2>📊 Progress & Achievements</h2>
      <p>Track your learning progress and unlock achievements as you complete course activities.</p>

      <div style={{ background: theme === 'dark' ? 'rgba(55,65,81,0.6)' : 'rgba(247,250,252,0.8)', padding: '25px', borderRadius: '12px', marginBottom: '25px' }}>
        <h4 style={{ marginBottom: '15px', color: theme === 'dark' ? '#63b3ed' : '#3182ce' }}>Overall Course Progress</h4>
        <ProgressBar theme={theme}><ProgressFill progress={courseProgress} /></ProgressBar>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.9rem' }}>
          <span>{courseProgress}% Complete</span>
          <span>13 of 20 activities completed</span>
        </div>
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          {[['📚', 'Case Studies', '2/3 Completed'], ['❓', 'Quiz', '0/3 Answered'], ['💬', 'Discussions', `${discussionPosts.length} Posts`]].map(([icon, label, sub]) => (
            <div key={label} style={{ textAlign: 'center', padding: '15px', background: theme === 'dark' ? 'rgba(45,55,72,0.6)' : 'rgba(255,255,255,0.6)', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{icon}</div>
              <div style={{ fontWeight: '600' }}>{label}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: theme === 'dark' ? 'rgba(55,65,81,0.6)' : 'rgba(247,250,252,0.8)', padding: '25px', borderRadius: '12px', marginBottom: '25px' }}>
        <h4 style={{ marginBottom: '15px', color: theme === 'dark' ? '#63b3ed' : '#3182ce' }}>🏆 Achievements Unlocked</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {achievements.map((badge, i) => <Badge key={i}>{badge}</Badge>)}
        </div>
        <p style={{ marginTop: '15px', fontSize: '0.9rem', opacity: 0.7 }}>Continue learning to unlock more achievements!</p>
      </div>

      <div style={{ background: theme === 'dark' ? 'rgba(55,65,81,0.6)' : 'rgba(247,250,252,0.8)', padding: '25px', borderRadius: '12px' }}>
        <h4 style={{ marginBottom: '15px', color: theme === 'dark' ? '#63b3ed' : '#3182ce' }}>📈 Learning Analytics</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          {[['⏱️', '8.5 hours', 'Total Study Time'], ['📚', '3/3', 'Modules Completed'], ['🎮', '5/5', 'H5P Activities'], ['💬', '7', 'Discussion Posts']].map(([icon, val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '5px' }}>{icon}</div>
              <div style={{ fontWeight: '600' }}>{val}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: theme === 'dark' ? 'rgba(55,65,81,0.6)' : 'rgba(247,250,252,0.8)', padding: '25px', borderRadius: '12px', marginTop: '25px' }}>
        <h4 style={{ marginBottom: '15px', color: theme === 'dark' ? '#63b3ed' : '#3182ce' }}>❓ Daily Question Performance</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          {[['🔥', dailyQuestionStreak, 'Current Streak'], ['✅', correctCount, 'Correct Answers'], ['📊', `${successRate}%`, 'Success Rate'], ['⭐', totalPoints, 'Total Points']].map(([icon, val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '5px' }}>{icon}</div>
              <div style={{ fontWeight: '600' }}>{val}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{label}</div>
            </div>
          ))}
        </div>
        {dailyQuestionHistory.length > 0 && (
          <div>
            <h5 style={{ marginBottom: '15px', color: theme === 'dark' ? '#63b3ed' : '#3182ce' }}>Recent Questions</h5>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {dailyQuestionHistory.slice(-5).reverse().map((q, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: theme === 'dark' ? 'rgba(45,55,72,0.6)' : 'rgba(255,255,255,0.6)', borderRadius: '6px', marginBottom: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '4px' }}>{q.question.length > 50 ? q.question.substring(0, 50) + '...' : q.question}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{q.date}</div>
                  </div>
                  <div style={{ padding: '4px 8px', borderRadius: '12px', background: q.correct ? '#10b981' : '#ef4444', color: 'white', fontSize: '0.7rem', fontWeight: '600' }}>
                    {q.correct ? `+${q.points}` : '0'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ContentSection>
  );
};

export default MoodleProgress;
