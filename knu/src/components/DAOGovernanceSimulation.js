import React, { useState, useEffect } from 'react';
import { TokenomicsChart, TokenDistributionChart } from './InteractiveCharts';
import './DAOGovernanceSimulation.css';

const DAOGovernanceSimulation = ({ params, results }) => {
  const [proposalData, setProposalData] = useState({
    forVotes: 0,
    againstVotes: 0,
    abstainVotes: 0,
    totalVotes: 0
  });

  // Smart Governance Score System - Realistic trade-offs and conflicting objectives
  const [governanceScore, setGovernanceScore] = useState({
    overall: 0,
    breakdown: {},
    feedback: [],
    passed: false
  });

  // Realistic whale population data (fixed, user cannot change)
  const whalePopulationData = {
    totalWhales: 12,
    totalHoldings: 4500000, // 4.5M tokens
    averageWhaleSize: 375000, // 375K tokens per whale
    largestWhale: 850000, // 850K tokens
    whaleConcentration: 45, // 45% of total supply
    distribution: {
      'Mega Whales (500K+)': 3,
      'Large Whales (200K-500K)': 4,
      'Medium Whales (100K-200K)': 3,
      'Small Whales (50K-100K)': 2
    }
  };

  // Smart scoring with realistic constraints and trade-offs
  const calculateSmartGovernanceScore = (params, results) => {
    let totalScore = 0;
    const breakdown = {};
    const feedback = [];
    
    // 1. DECENTRALIZATION (25% weight) - Conflicts with efficiency and security
    let decentralizationScore = results.decentralizationScore;
    
    // Penalty for extreme decentralization (too slow, too fragmented)
    if (decentralizationScore > 90) {
      decentralizationScore = 90 - (decentralizationScore - 90) * 2; // Heavy penalty for going too high
      feedback.push("⚠️ Extreme decentralization (90%+) creates decision paralysis");
    }
    
    // Bonus for balanced decentralization
    if (decentralizationScore >= 70 && decentralizationScore <= 85) {
      decentralizationScore += 5; // Sweet spot bonus
      feedback.push("✅ Optimal decentralization range (70-85%) - good balance!");
    }
    
    decentralizationScore = Math.max(0, Math.min(100, decentralizationScore));
    const decentralizationWeighted = (decentralizationScore / 100) * 25;
    breakdown.decentralization = { raw: decentralizationScore, weighted: decentralizationWeighted };
    
    // 2. GOVERNANCE EFFICIENCY (25% weight) - Conflicts with decentralization and security
    let efficiencyScore = results.governanceEfficiency;
    
    // Penalty for extreme efficiency (too centralized, too fast)
    if (efficiencyScore > 85) {
      efficiencyScore = 85 - (efficiencyScore - 85) * 1.5;
      feedback.push("⚠️ Extreme efficiency (85%+) may indicate over-centralization");
    }
    
    // Bonus for balanced efficiency
    if (efficiencyScore >= 65 && efficiencyScore <= 80) {
      efficiencyScore += 3;
      feedback.push("✅ Good efficiency range (65-80%) - not too slow, not too centralized");
    }
    
    efficiencyScore = Math.max(0, Math.min(100, efficiencyScore));
    const efficiencyWeighted = (efficiencyScore / 100) * 25;
    breakdown.efficiency = { raw: efficiencyScore, weighted: efficiencyWeighted };
    
    // 3. DECISION QUALITY (20% weight) - Requires balance between speed and thoroughness
    let qualityScore = results.decisionQuality;
    
    // Penalty for extreme quality (too slow, too complex)
    if (qualityScore > 90) {
      qualityScore = 90 - (qualityScore - 90) * 1.2;
      feedback.push("⚠️ Extreme quality (90%+) may cause decision paralysis");
    }
    
    // Bonus for balanced quality
    if (qualityScore >= 60 && qualityScore <= 80) {
      qualityScore += 4;
      feedback.push("✅ Balanced quality (60-80%) - thorough but not paralyzed");
    }
    
    qualityScore = Math.max(0, Math.min(100, qualityScore));
    const qualityWeighted = (qualityScore / 100) * 20;
    breakdown.quality = { raw: qualityScore, weighted: qualityWeighted };
    
    // 4. ATTACK RESISTANCE (30% weight) - Conflicts with decentralization and efficiency
    let resistanceScore = results.attackResistance;
    
    // Penalty for extreme resistance (too restrictive, too slow)
    if (resistanceScore > 95) {
      resistanceScore = 95 - (resistanceScore - 95) * 2;
      feedback.push("⚠️ Extreme security (95%+) may make governance too rigid");
    }
    
    // Bonus for optimal resistance
    if (resistanceScore >= 80 && resistanceScore <= 90) {
      resistanceScore += 5;
      feedback.push("✅ Optimal security range (80-90%) - secure but not paralyzed");
    }
    
    resistanceScore = Math.max(0, Math.min(100, resistanceScore));
    const resistanceWeighted = (resistanceScore / 100) * 30;
    breakdown.resistance = { raw: resistanceScore, weighted: resistanceWeighted };
    
    // 5. SYSTEM CONSTRAINTS - Realistic trade-offs
    let constraintPenalty = 0;
    
    // Whale concentration vs decentralization trade-off (using realistic data)
    if (whalePopulationData.whaleConcentration > 50 && decentralizationScore > 80) {
      constraintPenalty += 5;
      feedback.push("⚠️ High whale concentration with extreme decentralization may be unrealistic");
    }
    
    // Participation vs security trade-off
    if (params.voterParticipation > 90 && params.quorumThreshold > 70) {
      constraintPenalty += 3;
      feedback.push("⚠️ High participation with high quorum may indicate over-optimization");
    }
    
    // Time lock vs efficiency trade-off
    if (params.timeLockDuration > 20 && efficiencyScore > 75) {
      constraintPenalty += 4;
      feedback.push("⚠️ Long time locks with high efficiency may be contradictory");
    }
    
    // Calculate final score
    totalScore = decentralizationWeighted + efficiencyWeighted + qualityWeighted + resistanceWeighted - constraintPenalty;
    totalScore = Math.max(0, Math.min(100, totalScore));
    
    // Determine pass/fail (need 75% to pass due to increased difficulty)
    const passed = totalScore >= 75;
    
    // Add overall feedback
    if (passed) {
      feedback.unshift(`🎉 EXCELLENT! You achieved a balanced governance system with ${totalScore.toFixed(1)}%`);
      feedback.push("💡 You've mastered the art of governance trade-offs!");
    } else {
      feedback.unshift(`📚 Keep optimizing! You need ${(75 - totalScore).toFixed(1)}% more to pass`);
      feedback.push("💡 Remember: governance is about balance, not perfection in any single area");
    }
    
    return {
      overall: totalScore,
      breakdown,
      feedback,
      passed
    };
  };

  // Calculate smart governance score
  useEffect(() => {
    const scoreData = calculateSmartGovernanceScore(params, results);
    setGovernanceScore(scoreData);
  }, [params, results]);

  // Generate simple proposal voting data
  useEffect(() => {
    const totalVotes = 1000;
    const participation = params.voterParticipation / 100;
    const actualVotes = Math.round(totalVotes * participation);
    
    let forVotes = Math.round(actualVotes * 0.6);
    let againstVotes = Math.round(actualVotes * 0.3);
    let abstainVotes = actualVotes - forVotes - againstVotes;
    
    setProposalData({
      forVotes,
      againstVotes,
      abstainVotes,
      totalVotes: actualVotes
    });
  }, [params.voterParticipation]);

  // Smart governance chart data with optimal ranges
  const governanceChartData = {
    labels: ['Decentralization', 'Efficiency', 'Decision Quality', 'Attack Resistance'],
    datasets: [
      {
        label: 'Current Score',
        data: [
          Number(results.decentralizationScore).toFixed(2),
          Number(results.governanceEfficiency).toFixed(2),
          Number(results.decisionQuality).toFixed(2),
          Number(results.attackResistance).toFixed(2)
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
        borderWidth: 2
      },
      {
        label: 'Optimal Range',
        data: [77.5, 72.5, 70, 85], // Sweet spot averages
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: '#22c55e',
        borderWidth: 2,
        borderDash: [5, 5]
      }
    ]
  };

  const votingData = {
    labels: ['For', 'Against', 'Abstain'],
    datasets: [{
      data: [
        Number(proposalData.forVotes).toFixed(2),
        Number(proposalData.againstVotes).toFixed(2),
        Number(proposalData.abstainVotes).toFixed(2)
      ],
      backgroundColor: ['#10b981', '#ef4444', '#6b7280'],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  };

  return (
    <div className="dao-governance-simulation">
      <div className="simulation-header">
        <h2>🏛️ Smart Governance Challenge</h2>
        <p>Master the art of governance trade-offs! Find the sweet spot between conflicting objectives.</p>
      </div>

      {/* Whale Population Display - Fixed, User Cannot Change */}
      <div className="whale-population-display">
        <h3>🐋 Whale Population Analysis (Fixed)</h3>
        <div className="whale-stats-grid">
          <div className="whale-stat-card">
            <div className="whale-stat-icon">🐋</div>
            <div className="whale-stat-value">{whalePopulationData.totalWhales}</div>
            <div className="whale-stat-label">Total Whales</div>
          </div>
          <div className="whale-stat-card">
            <div className="whale-stat-icon">💰</div>
            <div className="whale-stat-value">{(whalePopulationData.totalHoldings / 1000000).toFixed(1)}M</div>
            <div className="whale-stat-label">Total Holdings</div>
          </div>
          <div className="whale-stat-card">
            <div className="whale-stat-icon">⚖️</div>
            <div className="whale-stat-value">{whalePopulationData.whaleConcentration}%</div>
            <div className="whale-stat-label">Concentration</div>
          </div>
          <div className="whale-stat-card">
            <div className="whale-stat-icon">📊</div>
            <div className="whale-stat-value">{(whalePopulationData.averageWhaleSize / 1000).toFixed(0)}K</div>
            <div className="whale-stat-label">Avg Whale Size</div>
          </div>
        </div>
        <div className="whale-distribution">
          <h4>Whale Distribution (Read-Only)</h4>
          <div className="distribution-bars">
            {Object.entries(whalePopulationData.distribution).map(([category, count]) => (
              <div key={category} className="distribution-bar">
                <div className="bar-label">{category}</div>
                <div className="bar-container">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${(count / whalePopulationData.totalWhales) * 100}%` }}
                  ></div>
                </div>
                <div className="bar-count">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Governance Score */}
      <div className="governance-score-display">
        <div className={`score-badge ${governanceScore.passed ? 'passed' : 'failed'}`}>
          {governanceScore.passed ? '🎉 PASSED' : '📚 OPTIMIZING'}
        </div>
        <div className="overall-score">
          Smart Governance Score: <span className={governanceScore.passed ? 'passed' : 'failed'}>{governanceScore.overall.toFixed(1)}/100</span>
          <span className="pass-threshold"> (Need 75% to pass - realistic governance is hard!)</span>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="score-breakdown">
        <h3>📊 Score Breakdown</h3>
        <div className="breakdown-grid">
          <div className="breakdown-item">
            <span className="metric-name">Decentralization</span>
            <span className="metric-score">{governanceScore.breakdown.decentralization?.raw.toFixed(1)}/100</span>
            <span className="metric-weight">(25%)</span>
            <span className="metric-weighted">+{governanceScore.breakdown.decentralization?.weighted.toFixed(1)}</span>
          </div>
          <div className="breakdown-item">
            <span className="metric-name">Efficiency</span>
            <span className="metric-score">{governanceScore.breakdown.efficiency?.raw.toFixed(1)}/100</span>
            <span className="metric-weight">(25%)</span>
            <span className="metric-weighted">+{governanceScore.breakdown.efficiency?.weighted.toFixed(1)}</span>
          </div>
          <div className="breakdown-item">
            <span className="metric-name">Decision Quality</span>
            <span className="metric-score">{governanceScore.breakdown.quality?.raw.toFixed(1)}/100</span>
            <span className="metric-weight">(20%)</span>
            <span className="metric-weighted">+{governanceScore.breakdown.quality?.weighted.toFixed(1)}</span>
          </div>
          <div className="breakdown-item">
            <span className="metric-name">Attack Resistance</span>
            <span className="metric-score">{governanceScore.breakdown.resistance?.raw.toFixed(1)}/100</span>
            <span className="metric-weight">(30%)</span>
            <span className="metric-weighted">+{governanceScore.breakdown.resistance?.weighted.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Smart Feedback */}
      <div className="smart-feedback">
        <h3>💡 Governance Insights</h3>
        <div className="feedback-list">
          {governanceScore.feedback.map((feedback, index) => (
            <div key={index} className={`feedback-item ${index === 0 ? 'main-feedback' : ''}`}>
              {feedback}
            </div>
          ))}
        </div>
      </div>

      <div className="simulation-content">
        {/* Voting Results */}
        <div className="voting-section">
          <h3>🗳️ Current Proposal Voting</h3>
          <div className="voting-stats">
            <div className="stat-item">
              <span className="stat-label">Total Votes</span>
              <span className="stat-value">{Number(proposalData.totalVotes).toFixed(2)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Participation</span>
              <span className="stat-value">{Number(params.voterParticipation).toFixed(2)}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Quorum</span>
              <span className="stat-value">{Number(params.quorumThreshold).toFixed(2)}%</span>
            </div>
          </div>
          
          <TokenDistributionChart
            distribution={{
              'For': Number(proposalData.forVotes).toFixed(2),
              'Against': Number(proposalData.againstVotes).toFixed(2),
              'Abstain': Number(proposalData.abstainVotes).toFixed(2)
            }}
            height={250}
          />
          
          <div className="proposal-status">
            <span className={`status ${proposalData.forVotes > proposalData.againstVotes ? 'success' : 'danger'}`}>
              {proposalData.forVotes > proposalData.againstVotes ? '✅ Likely to Pass' : '❌ Likely to Fail'}
            </span>
          </div>
        </div>

        {/* Governance Overview */}
        <div className="governance-section">
          <h3>📊 Governance Performance vs Optimal Ranges</h3>
          <TokenomicsChart
            type="bar"
            data={governanceChartData}
            height={300}
          />
          
          <div className="key-metrics">
            <div className="metric-item">
              <span className="metric-label">Decentralization Score</span>
              <span className="metric-value">{Number(results.decentralizationScore).toFixed(2)}/100</span>
              <span className="metric-target">(Optimal: 70-85%)</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Governance Efficiency</span>
              <span className="metric-value">{Number(results.governanceEfficiency).toFixed(2)}/100</span>
              <span className="metric-target">(Optimal: 65-80%)</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Decision Quality</span>
              <span className="metric-value">{Number(results.decisionQuality).toFixed(2)}/100</span>
              <span className="metric-target">(Optimal: 60-80%)</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Attack Resistance</span>
              <span className="metric-value">{Number(results.attackResistance).toFixed(2)}/100</span>
              <span className="metric-target">(Optimal: 80-90%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAOGovernanceSimulation;
