import React, { useState, useEffect } from 'react';
import {
  MoodleContainer, MoodleHeader, MoodleTitle, MoodleSubtitle,
  MoodleContent, Sidebar, SidebarSection, MenuItem, MainContent
} from './moodle/MoodleStyles';
import MoodleOverview from './moodle/MoodleOverview';
import MoodleCaseStudies from './moodle/MoodleCaseStudies';
import MoodleQuiz from './moodle/MoodleQuiz';
import MoodleH5P from './moodle/MoodleH5P';
import MoodleDiscussions from './moodle/MoodleDiscussions';
import MoodleAssignments from './moodle/MoodleAssignments';
import MoodleProgress from './moodle/MoodleProgress';
import { dailyQuestions, courseModules, caseStudies, quizQuestions } from '../data/moodleChapter10Data';

const MoodleChapter10Demo = ({ theme = 'light' }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [discussionPosts, setDiscussionPosts] = useState([
    { id: 1, author: 'CryptoLearner', avatar: 'CL', timestamp: '2 hours ago', message: 'The Bitcoin halving mechanism is fascinating! It creates predictable scarcity that has historically led to price appreciation.' },
    { id: 2, author: 'DeFiExplorer', avatar: 'DE', timestamp: '1 day ago', message: "Ethereum's transition to PoS shows how tokenomics can evolve with technology. The staking rewards create new economic incentives." },
    { id: 3, author: 'AMMEnthusiast', avatar: 'AE', timestamp: '3 hours ago', message: 'AMMs have revolutionized DeFi trading! The liquidity pool model and mathematical pricing formulas make decentralized trading accessible to everyone.' },
    { id: 4, author: 'TokenomicsGuru', avatar: 'TG', timestamp: '1 hour ago', message: 'The balance between usage and holding incentives is crucial! Too much focus on usage can hurt price stability, while excessive holding incentives can limit ecosystem growth.' }
  ]);
  const [newPost, setNewPost] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'New case study available: Terra collapse analysis', time: '2 hours ago' },
    { id: 2, type: 'success', message: 'Quiz completed! Score: 2/3', time: '1 day ago' },
    { id: 3, type: 'warning', message: 'Assignment due in 5 days', time: '3 days ago' }
  ]);
  const [achievements] = useState(['📚 Chapter Reader', '🎯 Case Study Analyst', '💡 Decision Maker']);
  const [studyTimer, setStudyTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [studySessions, setStudySessions] = useState([
    { date: '2024-11-20', duration: 45, topic: 'Bitcoin Case Study' },
    { date: '2024-11-19', duration: 60, topic: 'Ethereum Analysis' },
    { date: '2024-11-18', duration: 30, topic: 'Quiz Completion' }
  ]);
  const [dailyQuestion, setDailyQuestion] = useState(null);
  const [dailyQuestionAnswered, setDailyQuestionAnswered] = useState(false);
  const [dailyQuestionStreak, setDailyQuestionStreak] = useState(5);
  const [dailyQuestionHistory, setDailyQuestionHistory] = useState([]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => setStudyTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    const today = new Date().toDateString();
    const idx = Math.abs(today.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % dailyQuestions.length;
    setDailyQuestion(dailyQuestions[idx]);
    setDailyQuestionAnswered(localStorage.getItem('lastDailyQuestionDate') === today);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const handleTimerToggle = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      setStudySessions(prev => [...prev, { date: new Date().toISOString().split('T')[0], duration: Math.floor(studyTimer / 60), topic: 'Study Session' }]);
      setStudyTimer(0);
    } else {
      setIsTimerRunning(true);
    }
  };

  const todayStudyMinutes = studySessions
    .filter(s => s.date === new Date().toISOString().split('T')[0])
    .reduce((sum, s) => sum + s.duration, 0);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <MoodleOverview theme={theme} onStart={() => setActiveSection('content')} />;
      case 'content':
        return (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ color: theme === 'dark' ? '#63b3ed' : '#3182ce', marginBottom: '20px' }}>📚 Learning Content</h2>
            <p>Access the comprehensive learning materials for Chapter 10, including case studies, analysis frameworks, and real-world examples.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '25px' }}>
              {[
                { color: '#10b981', icon: '✅', title: 'Module 1: Bitcoin Case Study', desc: "Complete analysis of Bitcoin's tokenomics model, including supply mechanics, mining rewards, and economic incentives.", status: '📖 Completed', time: '45 min read' },
                { color: '#f59e0b', icon: '⏳', title: 'Module 2: Ethereum Analysis', desc: "Deep dive into Ethereum's transition to Proof of Stake, token economics, and governance mechanisms.", status: '🔄 In Progress', time: '60 min read' },
                { color: '#e2e8f0', icon: '⏸️', title: 'Module 3: Failure Case Studies', desc: 'Analysis of failed tokenomics models including Terra, Bitconnect, and lessons learned from their collapses.', status: '⏸️ Not Started', time: '75 min read' }
              ].map(({ color, icon, title, desc, status, time }) => (
                <div key={title} style={{ padding: '20px', background: theme === 'dark' ? 'rgba(55,65,81,0.6)' : 'rgba(247,250,252,0.8)', borderRadius: '10px', border: `2px solid ${color}` }}>
                  <h4 style={{ color, marginBottom: '10px' }}>{icon} {title}</h4>
                  <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>{desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color }}>{status}</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'case-studies':
        return <MoodleCaseStudies theme={theme} caseStudies={caseStudies} selectedCaseStudy={selectedCaseStudy} setSelectedCaseStudy={setSelectedCaseStudy} />;
      case 'quiz':
        return <MoodleQuiz theme={theme} quizQuestions={quizQuestions} quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers} />;
      case 'h5p':
        return <MoodleH5P theme={theme} />;
      case 'discussions':
        return <MoodleDiscussions theme={theme} discussionPosts={discussionPosts} setDiscussionPosts={setDiscussionPosts} newPost={newPost} setNewPost={setNewPost} />;
      case 'assignments':
        return <MoodleAssignments theme={theme} />;
      case 'progress':
        return <MoodleProgress theme={theme} courseProgress={65} achievements={achievements} discussionPosts={discussionPosts} dailyQuestion={dailyQuestion} dailyQuestionStreak={dailyQuestionStreak} dailyQuestionHistory={dailyQuestionHistory} />;
      default:
        return null;
    }
  };

  return (
    <MoodleContainer theme={theme}>
      <MoodleHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <MoodleTitle>🎓 Moodle LMS - Chapter 10 Demo</MoodleTitle>
            <MoodleSubtitle>Tokenomics Case Studies & Real-World Examples</MoodleSubtitle>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNotifications([])}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'white', padding: '10px', borderRadius: '8px', transition: 'all 0.3s ease' }}
                onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
              >
                🔔
                {notifications.length > 0 && (
                  <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Welcome, Student</div>
          </div>
        </div>
      </MoodleHeader>

      <MoodleContent>
        <Sidebar theme={theme}>
          <SidebarSection theme={theme}>
            <h3>Course Modules</h3>
            {courseModules.map(module => (
              <MenuItem key={module.id} active={activeSection === module.id} onClick={() => setActiveSection(module.id)} theme={theme}>
                {module.icon} {module.title}
              </MenuItem>
            ))}
          </SidebarSection>

          <SidebarSection theme={theme}>
            <h3>Student Info</h3>
            <div style={{ padding: '15px', background: theme === 'dark' ? 'rgba(55,65,81,0.6)' : 'rgba(247,250,252,0.8)', borderRadius: '8px' }}>
              <div style={{ fontWeight: '600', marginBottom: '5px' }}>John Doe</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Student ID: STU001</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Enrolled: Nov 2024</div>
              <div style={{ marginTop: '10px', padding: '10px', background: theme === 'dark' ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.1)', borderRadius: '6px', border: '1px solid #10b981' }}>
                <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '600' }}>Current Streak</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#10b981' }}>7 Days 🔥</div>
              </div>
            </div>
          </SidebarSection>

          <SidebarSection theme={theme}>
            <h3>⏱️ Study Timer</h3>
            <div style={{ background: theme === 'dark' ? 'rgba(55,65,81,0.6)' : 'rgba(247,250,252,0.8)', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '15px', fontFamily: 'monospace' }}>
                {Math.floor(studyTimer / 60).toString().padStart(2, '0')}:{(studyTimer % 60).toString().padStart(2, '0')}
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={handleTimerToggle} style={{ padding: '8px 16px', background: isTimerRunning ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}>
                  {isTimerRunning ? '⏹️ Stop' : '▶️ Start'}
                </button>
                <button onClick={() => { setStudyTimer(0); setIsTimerRunning(false); }} style={{ padding: '8px 16px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}>
                  🔄 Reset
                </button>
              </div>
              <div style={{ marginTop: '15px', fontSize: '0.8rem', opacity: 0.7 }}>Today's total: {todayStudyMinutes} min</div>
            </div>
          </SidebarSection>

          {dailyQuestion && (
            <SidebarSection theme={theme}>
              <h3>❓ Daily Question</h3>
              <div style={{ background: theme === 'dark' ? 'rgba(55,65,81,0.6)' : 'rgba(247,250,252,0.8)', padding: '15px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.7rem', padding: '4px 8px', borderRadius: '12px', background: dailyQuestion.difficulty === 'easy' ? '#10b981' : dailyQuestion.difficulty === 'medium' ? '#f59e0b' : '#ef4444', color: 'white', fontWeight: '600' }}>
                    {dailyQuestion.difficulty.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#667eea', fontWeight: '600' }}>{dailyQuestion.points} pts</span>
                </div>
                <div style={{ fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.4' }}>{dailyQuestion.question}</div>
                {!dailyQuestionAnswered ? (
                  <div style={{ marginBottom: '15px' }}>
                    {dailyQuestion.options.map((option, index) => (
                      <button key={index}
                        onClick={() => {
                          setDailyQuestionAnswered(true);
                          localStorage.setItem('lastDailyQuestionDate', new Date().toDateString());
                          if (index === dailyQuestion.correct) setDailyQuestionStreak(prev => prev + 1);
                          setDailyQuestionHistory(prev => [...prev, { date: new Date().toDateString(), question: dailyQuestion.question, correct: index === dailyQuestion.correct, points: index === dailyQuestion.correct ? dailyQuestion.points : 0 }]);
                        }}
                        style={{ width: '100%', padding: '8px 12px', margin: '4px 0', background: 'transparent', border: `1px solid ${theme === 'dark' ? '#4a5568' : '#e2e8f0'}`, borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left', transition: 'all 0.2s ease' }}
                        onMouseEnter={e => e.target.style.background = theme === 'dark' ? '#4a5568' : '#f7fafc'}
                        onMouseLeave={e => e.target.style.background = 'transparent'}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '10px', background: '#10b981', color: 'white', borderRadius: '6px', fontSize: '0.8rem', textAlign: 'center' }}>
                    ✅ Answered! +{dailyQuestion.points} points
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.7 }}>
                  <span>Streak: {dailyQuestionStreak} 🔥</span>
                  <span>Category: {dailyQuestion.category}</span>
                </div>
              </div>
            </SidebarSection>
          )}

          <SidebarSection theme={theme}>
            <h3>Quick Links</h3>
            {[['🌐 Moodle.org', 'https://moodle.org'], ['🎮 H5P.org', 'https://h5p.org'], ['📖 Moodle Docs', 'https://docs.moodle.org']].map(([label, url]) => (
              <MenuItem key={label} theme={theme} onClick={() => window.open(url, '_blank')}>{label}</MenuItem>
            ))}
          </SidebarSection>
        </Sidebar>

        <MainContent theme={theme}>
          {renderSection()}
        </MainContent>
      </MoodleContent>
    </MoodleContainer>
  );
};

export default MoodleChapter10Demo;
