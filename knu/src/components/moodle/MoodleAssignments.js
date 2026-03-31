import React from 'react';
import { ContentSection, AssignmentCard, SubmitButton } from './MoodleStyles';

const phases = [
  { label: 'Research Phase', status: '✅ Completed', color: '#10b981', pct: '100%' },
  { label: 'Analysis Phase', status: '🔄 In Progress', color: '#f59e0b', pct: '60%' },
  { label: 'Writing Phase', status: '⏸️ Not Started', color: '#a0aec0', pct: '0%' },
  { label: 'Review & Submit', status: '⏸️ Not Started', color: '#a0aec0', pct: '0%' }
];

const MoodleAssignments = ({ theme }) => (
  <ContentSection theme={theme}>
    <h2>📝 Course Assignment</h2>
    <p>Complete the final assignment to demonstrate your understanding of tokenomics case studies and earn your course completion certificate.</p>

    <AssignmentCard theme={theme}>
      <h3 style={{ color: theme === 'dark' ? '#63b3ed' : '#3182ce', marginBottom: '15px' }}>🎯 Final Assignment: Tokenomics Case Study Analysis</h3>
      <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        Choose one of the case studies from Chapter 10 (Bitcoin, Ethereum, Terra, Uniswap, or Bitconnect) and conduct a comprehensive analysis. Your analysis should include:
      </p>
      <ul style={{ marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.6' }}>
        <li>Token distribution and supply mechanics</li>
        <li>Governance structure and decision-making processes</li>
        <li>Economic incentives and token utility</li>
        <li>Success factors or failure points</li>
        <li>Lessons learned and recommendations</li>
      </ul>
      <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        <strong>Due Date:</strong> December 15, 2024<br />
        <strong>Word Count:</strong> 1500-2000 words<br />
        <strong>Weight:</strong> 40% of final grade
      </p>
      <SubmitButton>📤 Submit Assignment</SubmitButton>
    </AssignmentCard>

    <div style={{ background: theme === 'dark' ? 'rgba(55,65,81,0.6)' : 'rgba(247,250,252,0.8)', padding: '25px', borderRadius: '12px', marginTop: '25px' }}>
      <h4 style={{ marginBottom: '15px', color: theme === 'dark' ? '#63b3ed' : '#3182ce' }}>📊 Assignment Progress Tracker</h4>
      {phases.map(({ label, status, color, pct }) => (
        <div key={label} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span>{label}</span>
            <span style={{ color }}>{status}</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: theme === 'dark' ? '#4a5568' : '#e2e8f0', borderRadius: '4px' }}>
            <div style={{ width: pct, height: '100%', background: color, borderRadius: '4px' }} />
          </div>
        </div>
      ))}
    </div>
  </ContentSection>
);

export default MoodleAssignments;
