import React from 'react';
import { ContentSection } from './MoodleStyles';

const statusColor = (status) =>
  status === 'completed' ? '#10b981' : status === 'in-progress' ? '#f59e0b' : '#e2e8f0';

const statusIcon = (status) =>
  status === 'completed' ? '✅' : status === 'in-progress' ? '⏳' : '⏸️';

const statusLabel = (status) =>
  status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In Progress' : 'Not Started';

const MoodleCaseStudies = ({ theme, caseStudies, selectedCaseStudy, setSelectedCaseStudy }) => (
  <ContentSection theme={theme}>
    <h2>🔍 Interactive Case Studies</h2>
    <p>Click on any case study to explore detailed analysis, key metrics, and practical insights.</p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', marginTop: '25px' }}>
      {caseStudies.map(study => (
        <div
          key={study.id}
          onClick={() => setSelectedCaseStudy(study)}
          style={{
            padding: '20px',
            background: theme === 'dark' ? 'rgba(55, 65, 81, 0.6)' : 'rgba(247, 250, 252, 0.8)',
            borderRadius: '10px',
            border: `2px solid ${statusColor(study.status)}`,
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <h4 style={{ color: statusColor(study.status), marginBottom: '10px' }}>
            {statusIcon(study.status)} {study.title}
          </h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>{study.analysis.substring(0, 120)}...</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{study.time}</span>
            <span style={{ fontSize: '0.8rem', color: statusColor(study.status) }}>{statusLabel(study.status)}</span>
          </div>
        </div>
      ))}
    </div>

    {selectedCaseStudy && (
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        background: theme === 'dark' ? '#2d3748' : 'white',
        padding: '30px', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        maxWidth: '600px', width: '90%', maxHeight: '80vh', overflow: 'auto', zIndex: 1000,
        border: `2px solid ${statusColor(selectedCaseStudy.status)}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: theme === 'dark' ? '#63b3ed' : '#3182ce', margin: 0 }}>{selectedCaseStudy.title}</h3>
          <button onClick={() => setSelectedCaseStudy(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: theme === 'dark' ? '#a0aec0' : '#4a5568' }}>✕</button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: theme === 'dark' ? '#63b3ed' : '#3182ce', marginBottom: '10px' }}>Key Points:</h4>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            {selectedCaseStudy.keyPoints.map((point, i) => <li key={i} style={{ marginBottom: '8px' }}>{point}</li>)}
          </ul>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: theme === 'dark' ? '#63b3ed' : '#3182ce', marginBottom: '10px' }}>Analysis:</h4>
          <p style={{ lineHeight: '1.6' }}>{selectedCaseStudy.analysis}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', padding: '15px', background: theme === 'dark' ? 'rgba(55,65,81,0.6)' : 'rgba(247,250,252,0.8)', borderRadius: '10px' }}>
          {[['Market Cap', selectedCaseStudy.metrics.marketCap], ['Supply', selectedCaseStudy.metrics.supply], ['Consensus', selectedCaseStudy.metrics.consensus]].map(([label, val]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '5px' }}>{label}</div>
              <div style={{ fontWeight: '600' }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </ContentSection>
);

export default MoodleCaseStudies;
