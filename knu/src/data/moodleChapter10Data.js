export const dailyQuestions = [
  {
    id: 1, difficulty: 'easy',
    question: 'What is the maximum supply of Bitcoin?',
    options: ['21 million', '100 million', '1 billion', 'Unlimited'],
    correct: 0,
    explanation: 'Bitcoin has a fixed maximum supply of 21 million coins, creating scarcity and deflationary pressure.',
    points: 10, category: 'Supply Mechanics'
  },
  {
    id: 2, difficulty: 'easy',
    question: 'Which consensus mechanism does Bitcoin use?',
    options: ['Proof of Stake', 'Proof of Work', 'Proof of Authority', 'Delegated Proof of Stake'],
    correct: 1,
    explanation: 'Bitcoin uses Proof of Work (PoW) where miners solve complex mathematical problems to validate transactions.',
    points: 10, category: 'Consensus Mechanisms'
  },
  {
    id: 3, difficulty: 'easy',
    question: 'What happens to Bitcoin mining rewards every 210,000 blocks?',
    options: ['They increase', 'They decrease by half', 'They stay the same', 'They stop completely'],
    correct: 1,
    explanation: 'Bitcoin halving occurs every 210,000 blocks, reducing mining rewards by 50% to control inflation.',
    points: 10, category: 'Mining Economics'
  },
  {
    id: 4, difficulty: 'easy',
    question: 'What does AMM stand for in DeFi?',
    options: ['Automated Market Maker', 'Advanced Market Mechanism', 'Algorithmic Market Model', 'Automated Money Market'],
    correct: 0,
    explanation: 'AMM stands for Automated Market Maker, which uses mathematical formulas and liquidity pools to enable decentralized trading.',
    points: 10, category: 'DeFi Concepts'
  },
  {
    id: 5, difficulty: 'medium',
    question: 'What is the main difference between usage and holding incentives?',
    options: ['Usage encourages spending, holding encourages saving', 'Usage increases supply, holding decreases supply', 'Usage is for beginners, holding is for experts', 'Usage is free, holding costs money'],
    correct: 0,
    explanation: 'Usage incentives encourage spending and circulating tokens (boosting economic activity), while holding incentives reward long-term commitment (creating stability and scarcity).',
    points: 15, category: 'Tokenomics Design'
  },
  {
    id: 6, difficulty: 'medium',
    question: "How does EIP-1559 affect Ethereum's tokenomics?",
    options: ['Increases total supply', 'Burns transaction fees', 'Reduces gas costs', 'Changes consensus mechanism'],
    correct: 1,
    explanation: 'EIP-1559 burns a portion of transaction fees, creating deflationary pressure on ETH supply.',
    points: 20, category: 'Token Economics'
  },
  {
    id: 7, difficulty: 'medium',
    question: 'What is the primary risk of algorithmic stablecoins?',
    options: ['High gas fees', 'Centralization', 'Bank run vulnerability', 'Slow transactions'],
    correct: 2,
    explanation: 'Algorithmic stablecoins are vulnerable to bank runs when confidence in the mechanism is lost.',
    points: 20, category: 'Risk Assessment'
  },
  {
    id: 8, difficulty: 'medium',
    question: 'How do staking rewards affect token velocity?',
    options: ['Increase velocity', 'Decrease velocity', 'No effect', 'Depends on market conditions'],
    correct: 1,
    explanation: 'Staking rewards incentivize holding tokens, reducing trading frequency and decreasing velocity.',
    points: 20, category: 'Token Velocity'
  },
  {
    id: 9, difficulty: 'hard',
    question: 'What is the optimal inflation rate for a utility token with staking rewards?',
    options: ['0% (deflationary)', '2-5% (low inflation)', '10-15% (moderate inflation)', 'Depends on token utility and economic model'],
    correct: 3,
    explanation: "Optimal inflation depends on the token's utility, staking requirements, and economic incentives. There's no one-size-fits-all answer.",
    points: 30, category: 'Economic Modeling'
  },
  {
    id: 10, difficulty: 'hard',
    question: 'How do you calculate the break-even point for a liquidity mining program?',
    options: ['APY × Initial investment', 'Rewards per day × Token price', 'Impermanent loss + Rewards - Gas fees', 'Complex calculation involving multiple variables'],
    correct: 3,
    explanation: 'Break-even analysis requires considering impermanent loss, rewards, gas fees, and opportunity costs.',
    points: 30, category: 'DeFi Economics'
  },
  {
    id: 11, difficulty: 'hard',
    question: 'What is the optimal governance token distribution to prevent whale attacks?',
    options: ['Equal distribution', 'Concentrated in early adopters', 'Balanced with vesting schedules and guardrails', 'No distribution needed'],
    correct: 2,
    explanation: 'Optimal distribution balances incentives with protection through vesting, guardrails, and gradual decentralization.',
    points: 30, category: 'Governance Design'
  }
];

export const courseModules = [
  { id: 'overview', title: 'Course Overview', icon: '📋' },
  { id: 'content', title: 'Learning Content', icon: '📚' },
  { id: 'case-studies', title: 'Case Studies', icon: '🔍' },
  { id: 'quiz', title: 'Knowledge Check', icon: '❓' },
  { id: 'h5p', title: 'H5P Activities', icon: '🎮' },
  { id: 'discussions', title: 'Discussions', icon: '💬' },
  { id: 'assignments', title: 'Assignments', icon: '📝' },
  { id: 'progress', title: 'Progress & Badges', icon: '📊' }
];

export const caseStudies = [
  {
    id: 'bitcoin', title: 'Bitcoin: Digital Gold Standard',
    status: 'completed', time: '45 min',
    keyPoints: [
      'Fixed 21M supply with halving every 4 years',
      'Proof-of-Work consensus mechanism',
      'Mining rewards decrease over time',
      'Store of value vs medium of exchange'
    ],
    analysis: "Bitcoin demonstrates how scarcity and predictable supply can create long-term value. The halving mechanism ensures controlled inflation while mining rewards incentivize network security.",
    metrics: { marketCap: '$800B+', supply: '21M', consensus: 'PoW' }
  },
  {
    id: 'ethereum', title: 'Ethereum: Smart Contract Platform',
    status: 'in-progress', time: '60 min',
    keyPoints: [
      'Transition from PoW to PoS (The Merge)',
      'EIP-1559 fee burning mechanism',
      'Staking rewards for validators',
      'Gas fees and network congestion'
    ],
    analysis: "Ethereum shows how adaptive tokenomics can evolve with technology. The shift to PoS reduces energy consumption while staking creates new economic incentives.",
    metrics: { marketCap: '$300B+', supply: 'Inflationary', consensus: 'PoS' }
  },
  {
    id: 'terra', title: 'Terra: Algorithmic Stablecoin Failure',
    status: 'not-started', time: '75 min',
    keyPoints: [
      'UST algorithmic stablecoin design',
      'LUNA token for stability mechanism',
      'Insufficient collateralization',
      'Bank run vulnerability'
    ],
    analysis: "Terra demonstrates the risks of complex tokenomics without proper risk management. The collapse highlights the importance of over-collateralization and transparency.",
    metrics: { marketCap: 'Collapsed', supply: 'Destroyed', consensus: 'PoS' }
  },
  {
    id: 'uniswap', title: 'Uniswap: AMM Innovation Success',
    status: 'not-started', time: '50 min',
    keyPoints: [
      'Automated Market Maker (AMM) model',
      'Liquidity pool mechanism',
      'UNI governance token',
      'Fee-based revenue model'
    ],
    analysis: "Uniswap revolutionized DeFi with its AMM design, enabling permissionless trading through liquidity pools. The UNI token provides governance rights while the protocol generates sustainable revenue through trading fees.",
    metrics: { marketCap: '$4B+', supply: '1B UNI', consensus: 'Governance' }
  },
  {
    id: 'curve', title: 'Curve: Incentive Balance Mastery',
    status: 'not-started', time: '45 min',
    keyPoints: [
      'veCRV governance model',
      'Long-term locking rewards',
      'Trading fee optimization',
      'Balanced usage/holding incentives'
    ],
    analysis: "Curve demonstrates excellent incentive balance through its veCRV model. Users lock CRV tokens for longer periods to gain governance power and higher rewards, creating both usage (trading) and holding (governance) incentives.",
    metrics: { marketCap: '$500M+', supply: '2B CRV', consensus: 'veCRV' }
  }
];

export const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of Bitcoin halving?',
    options: ['To increase mining rewards', 'To reduce inflation over time', 'To speed up transactions', 'To reduce network security'],
    correct: 1,
    explanation: 'Bitcoin halving reduces the block reward by 50% every 210,000 blocks, creating predictable scarcity and reducing inflation over time.'
  },
  {
    id: 2,
    question: 'Which mechanism does Ethereum use to control token supply?',
    options: ['Fixed supply cap', 'EIP-1559 fee burning', 'Mining rewards', 'Staking penalties'],
    correct: 1,
    explanation: 'EIP-1559 burns a portion of transaction fees, creating deflationary pressure and reducing total supply over time.'
  },
  {
    id: 3,
    question: "What was the main cause of Terra's collapse?",
    options: ['High gas fees', 'Insufficient collateralization', 'Slow transaction speed', 'Centralization'],
    correct: 1,
    explanation: "Terra's UST stablecoin relied on algorithmic mechanisms without sufficient collateral, making it vulnerable to bank runs."
  },
  {
    id: 4,
    question: 'How do Automated Market Makers (AMMs) work?',
    options: ['Using traditional order books', 'Through mathematical formulas and liquidity pools', 'With centralized price feeds', 'Via manual market making'],
    correct: 1,
    explanation: 'AMMs use mathematical formulas (like x*y=k) and liquidity pools to automatically price and execute trades, eliminating the need for traditional order books.'
  }
];
