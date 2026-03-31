import React from 'react';
import { ContentSection, H5PContainer } from './MoodleStyles';

const activities = [
  {
    title: '🕒 Interactive Timeline: Evolution of Tokenomics',
    desc: "This H5P Timeline activity allows you to explore the chronological development of tokenomics from Bitcoin's genesis block to modern DeFi protocols. Click on timeline events to discover detailed insights about key milestones and their impact on the ecosystem.",
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    label: '🎮 H5P Timeline Activity Loaded Successfully'
  },
  {
    title: '🌳 Decision Tree: Real-World Scenarios',
    desc: 'Based on actual case studies from Chapter 10, this H5P Decision Tree puts you in the shoes of tokenomics designers and protocol builders. Make critical decisions about launch strategies, governance attacks, and token utility crises.',
    color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    label: '🎮 H5P Decision Tree Activity Loaded Successfully'
  },
  {
    title: '📊 Comparative Analysis: Project Comparison',
    desc: 'This H5P Interactive Chart allows you to compare the tokenomics approaches of projects featured in Chapter 10. Analyze Bitcoin, Ethereum, Terra, Uniswap, and Bitconnect side-by-side with interactive data visualization.',
    color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    label: '🎮 H5P Interactive Chart Activity Loaded Successfully'
  }
];

const MoodleH5P = ({ theme }) => (
  <ContentSection theme={theme}>
    <h2>🎮 H5P Interactive Activities</h2>
    <p>Engage with interactive H5P content designed to enhance your understanding of tokenomics case studies.</p>
    {activities.map(({ title, desc, color, label }) => (
      <H5PContainer key={title} theme={theme}>
        <h3 style={{ marginBottom: '20px', color: theme === 'dark' ? '#63b3ed' : '#3182ce' }}>{title}</h3>
        <p>{desc}</p>
        <div style={{ background: color, color: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center', marginTop: '20px' }}>
          {label}
        </div>
      </H5PContainer>
    ))}
  </ContentSection>
);

export default MoodleH5P;
