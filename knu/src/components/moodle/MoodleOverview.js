import React from 'react';
import { ContentSection } from './MoodleStyles';

const cardStyle = (theme) => ({
  background: theme === 'dark' ? 'rgba(55, 65, 81, 0.6)' : 'rgba(247, 250, 252, 0.8)',
  borderRadius: '10px',
  border: `2px solid ${theme === 'dark' ? '#4a5568' : '#e2e8f0'}`
});

const MoodleOverview = ({ theme, onStart }) => (
  <ContentSection theme={theme}>
    <h2>📋 Chapter 10: Case Studies & Real-World Examples</h2>
    <p>Welcome to your Moodle course on tokenomics case studies! This course combines theoretical knowledge with practical applications through interactive content and community discussions.</p>

    <div style={{ ...cardStyle(theme), padding: '25px', marginBottom: '25px' }}>
      <h4 style={{ color: theme === 'dark' ? '#63b3ed' : '#3182ce', marginBottom: '15px' }}>🎯 Learning Objectives</h4>
      <ul style={{ lineHeight: '1.6', marginBottom: '15px' }}>
        <li>Analyze successful tokenomics models (Bitcoin, Ethereum)</li>
        <li>Understand failure patterns (Terra, Bitconnect)</li>
        <li>Apply case study analysis frameworks</li>
        <li>Participate in community discussions</li>
        <li>Complete practical assignments</li>
      </ul>
      <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>
        <strong>Estimated Time:</strong> 4-6 hours | <strong>Difficulty:</strong> Intermediate
      </p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '25px' }}>
      {[
        { icon: '📚', label: '3 Modules', sub: 'Learning Content' },
        { icon: '🔍', label: '3 Case Studies', sub: 'Interactive Analysis' },
        { icon: '❓', label: '3 Quiz Questions', sub: 'Knowledge Check' },
        { icon: '💬', label: 'Discussions', sub: 'Community Learning' }
      ].map(({ icon, label, sub }) => (
        <div key={label} style={{ textAlign: 'center', padding: '20px', ...cardStyle(theme) }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{icon}</div>
          <div style={{ fontWeight: '600' }}>{label}</div>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>{sub}</div>
        </div>
      ))}
    </div>

    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '20px', borderRadius: '12px', marginTop: '25px', textAlign: 'center' }}>
      <h4 style={{ marginBottom: '10px' }}>🚀 Ready to Start Learning?</h4>
      <p style={{ marginBottom: '15px', opacity: 0.9 }}>
        Begin with the Learning Content section to explore case studies, then test your knowledge with the quiz, and engage with the community through discussions.
      </p>
      <button
        onClick={onStart}
        style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s ease' }}
        onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.3)'}
        onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
      >
        Start Learning →
      </button>
    </div>
  </ContentSection>
);

export default MoodleOverview;
