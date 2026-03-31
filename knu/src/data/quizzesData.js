const quizzesData = [
  {
    id: "quiz1",
    title: "Chapter 1 Quiz: Introduction to Tokenomics",
    questions: [
      {
        question: "What is the primary focus of Tokenomics?",
        options: [
          "The study of traditional fiat currencies",
          "The science of an economy built around a digital token",
          "The history of blockchain technology",
          "The legal regulations of cryptocurrencies"
        ],
        correct: 1,
        explanation: "Tokenomics is the science of an economy built around a digital token, focusing on its design, mechanics, and strategic thinking."
      },
      {
        question: "Which of the following is NOT a key component of tokenomics?",
        options: [
          "Token supply",
          "Distribution mechanisms",
          "Blockchain consensus algorithms",
          "Utility and use cases"
        ],
        correct: 2,
        explanation: "While consensus algorithms are important for blockchain technology, they are not a direct component of tokenomics, which focuses on economic aspects."
      },
      {
        question: "What economic principle states that token value increases with limited supply and high demand?",
        options: [
          "Network effects",
          "Supply and demand",
          "Game theory",
          "Inflationary economics"
        ],
        correct: 1,
        explanation: "The basic economic principle of supply and demand applies to tokens - limited supply with high demand typically leads to price appreciation."
      },
      {
        question: "Which distribution method involves giving tokens away for free to users?",
        options: [
          "Initial Coin Offerings",
          "Mining rewards",
          "Airdrops",
          "Staking rewards"
        ],
        correct: 2,
        explanation: "Airdrops are a distribution method where tokens are given away for free to users, often to increase adoption or reward early supporters."
      },
      {
        question: "What is the main challenge in tokenomics design?",
        options: [
          "Technical implementation",
          "Balancing competing stakeholder interests",
          "Regulatory compliance",
          "All of the above"
        ],
        correct: 3,
        explanation: "Tokenomics design faces multiple challenges including balancing stakeholder interests, regulatory compliance, and technical constraints."
      }
    ]
  },
  {
    id: "quiz2",
    title: "Chapter 2 Quiz: Fundamentals of Tokens",
    questions: [
      {
        question: "Which token type grants access to products or services?",
        options: [
          "Security tokens",
          "Utility tokens",
          "Governance tokens",
          "Hybrid tokens"
        ],
        correct: 1,
        explanation: "Utility tokens grant access to products or services within a blockchain ecosystem."
      },
      {
        question: "What is the most common token standard for fungible tokens on Ethereum?",
        options: [
          "ERC-721",
          "ERC-20",
          "ERC-1155",
          "ERC-404"
        ],
        correct: 1,
        explanation: "ERC-20 is the most common standard for fungible tokens on Ethereum."
      },
      {
        question: "Which token standard is used for non-fungible tokens (NFTs)?",
        options: [
          "ERC-20",
          "ERC-721",
          "ERC-1155",
          "ERC-4626"
        ],
        correct: 1,
        explanation: "ERC-721 is the standard for non-fungible tokens, each identified by a unique tokenId."
      },
      {
        question: "What do governance tokens provide to holders?",
        options: [
          "Access to services",
          "Ownership of real assets",
          "Voting rights on protocol changes",
          "Staking rewards only"
        ],
        correct: 2,
        explanation: "Governance tokens grant voting rights on protocol changes, treasury usage, or upgrades."
      },
      {
        question: "Which of the following is an example of a hybrid token?",
        options: [
          "Ethereum (ETH)",
          "USDC",
          "MakerDAO (MKR)",
          "CryptoPunks"
        ],
        correct: 2,
        explanation: "MakerDAO (MKR) is a hybrid token that combines governance and utility functions."
      }
    ]
  },
  {
    id: "quiz3",
    title: "Chapter 3 Quiz: Token Design Principles",
    questions: [
      {
        question: "What is the fundamental relationship in tokenomics design?",
        options: [
          "Supply and demand dynamics",
          "Technical implementation",
          "Regulatory compliance",
          "Marketing strategy"
        ],
        correct: 0,
        explanation: "Supply and demand dynamics are fundamental to tokenomics design and value creation."
      },
      {
        question: "What should successful token economies align?",
        options: [
          "Only user interests",
          "Only developer interests",
          "Interests of all participants",
          "Only investor interests"
        ],
        correct: 2,
        explanation: "Successful token economies align the interests of all participants - users, developers, investors, and validators."
      },
      {
        question: "What happens to network value as more users join?",
        options: [
          "It decreases",
          "It stays the same",
          "It increases",
          "It becomes unstable"
        ],
        correct: 2,
        explanation: "Network effects mean that the value of the network increases with each additional user."
      },
      {
        question: "Which is NOT a key design consideration for tokenomics?",
        options: [
          "Token utility",
          "Distribution",
          "Governance",
          "Hardware requirements"
        ],
        correct: 3,
        explanation: "Hardware requirements are not a key design consideration for tokenomics, which focuses on economic aspects."
      },
      {
        question: "What should token design leverage for optimal results?",
        options: [
          "Centralized control",
          "Network effects",
          "High inflation",
          "Limited utility"
        ],
        correct: 1,
        explanation: "Token design should leverage network effects, where value increases with network size."
      }
    ]
  },
  {
    id: "quiz4",
    title: "Chapter 4 Quiz: Token Distribution & Supply Mechanisms",
    questions: [
      {
        question: "What does ICO stand for in token distribution?",
        options: [
          "Initial Coin Offering",
          "Initial Crypto Offering",
          "Internal Coin Offering",
          "International Coin Offering"
        ],
        correct: 0,
        explanation: "ICO stands for Initial Coin Offering, a traditional fundraising method."
      },
      {
        question: "Which distribution method uses automated market makers?",
        options: [
          "ICOs",
          "IDOs",
          "Airdrops",
          "Mining"
        ],
        correct: 1,
        explanation: "IDOs (Initial DEX Offerings) use automated market makers for decentralized fundraising."
      },
      {
        question: "What creates scarcity in fixed supply tokens?",
        options: [
          "Inflation",
          "Limited total supply",
          "High distribution",
          "Low demand"
        ],
        correct: 1,
        explanation: "Limited total supply creates scarcity and potential deflationary pressure."
      },
      {
        question: "What mechanism reduces token supply?",
        options: [
          "Minting",
          "Burning",
          "Distribution",
          "Staking"
        ],
        correct: 1,
        explanation: "Token burning permanently removes tokens from circulation, reducing supply."
      },
      {
        question: "Which supply type adjusts based on network conditions?",
        options: [
          "Fixed supply",
          "Inflationary supply",
          "Dynamic supply",
          "Deflationary supply"
        ],
        correct: 2,
        explanation: "Dynamic supply adjusts based on network conditions and demand."
      }
    ]
  },
  {
    id: "quiz5",
    title: "Chapter 5 Quiz: Token Utility and Use Cases",
    questions: [
      {
        question: "What do users do in collateralized borrowing?",
        options: [
          "Sell their tokens",
          "Lock tokens to borrow other assets",
          "Mine new tokens",
          "Trade tokens directly"
        ],
        correct: 1,
        explanation: "Users lock tokens as collateral to borrow other assets in DeFi protocols."
      },
      {
        question: "What do liquidity providers earn in AMMs?",
        options: [
          "Only governance rights",
          "Trading fees",
          "Only mining rewards",
          "Only staking rewards"
        ],
        correct: 1,
        explanation: "Liquidity providers earn trading fees from the automated market maker."
      },
      {
        question: "What enables verifiable digital ownership for art?",
        options: [
          "Utility tokens",
          "Security tokens",
          "NFTs",
          "Stablecoins"
        ],
        correct: 2,
        explanation: "NFTs (Non-Fungible Tokens) enable verifiable digital ownership for art and collectibles."
      },
      {
        question: "What bridges crypto with traditional commerce?",
        options: [
          "Governance tokens",
          "Stablecoins",
          "Utility tokens",
          "Security tokens"
        ],
        correct: 1,
        explanation: "Stablecoins provide a stable medium of exchange, bridging crypto with traditional commerce."
      },
      {
        question: "What do NFTs enable for creators?",
        options: [
          "Only speculation",
          "Direct monetization",
          "Only governance",
          "Only staking"
        ],
        correct: 1,
        explanation: "NFTs enable direct monetization for creators by eliminating intermediaries."
      }
    ]
  },
  {
    id: "quiz6",
    title: "Chapter 6 Quiz: Governance and Decision Making",
    questions: [
      {
        question: "What do governance tokens grant to holders?",
        options: [
          "Only staking rewards",
          "Voting rights proportional to holdings",
          "Only utility access",
          "Only trading fees"
        ],
        correct: 1,
        explanation: "Governance tokens grant voting rights proportional to holdings."
      },
      {
        question: "What reduces whale dominance in voting?",
        options: [
          "Linear voting",
          "Quadratic voting",
          "Delegated voting",
          "Time-locked voting"
        ],
        correct: 1,
        explanation: "Quadratic voting reduces whale dominance by increasing voting power with the square root of tokens."
      },
      {
        question: "What encourages long-term thinking in governance?",
        options: [
          "Instant voting",
          "Time-locked voting",
          "Delegated voting",
          "Quadratic voting"
        ],
        correct: 1,
        explanation: "Time-locked voting encourages long-term thinking by increasing voting power with lock duration."
      },
      {
        question: "What allows time to respond to passed votes?",
        options: [
          "Proposal creation",
          "Execution delays",
          "Voting periods",
          "Emergency procedures"
        ],
        correct: 1,
        explanation: "Execution delays allow time to respond to passed votes for safety."
      },
      {
        question: "What do DAOs manage through governance?",
        options: [
          "Only technical upgrades",
          "Treasury and protocol decisions",
          "Only community initiatives",
          "Only parameter adjustments"
        ],
        correct: 1,
        explanation: "DAOs manage treasury allocations and protocol decisions through governance."
      }
    ]
  },
  {
    id: "quiz7",
    title: "Chapter 7 Quiz: Economic Models and Tokenomics",
    questions: [
      {
        question: "What characterizes deflationary models?",
        options: [
          "Ongoing token creation",
          "Fixed supply with reduction mechanisms",
          "Dynamic supply adjustment",
          "High inflation rates"
        ],
        correct: 1,
        explanation: "Deflationary models have fixed supply with mechanisms to reduce circulating supply over time."
      },
      {
        question: "How do protocols capture value?",
        options: [
          "Only through mining",
          "Fee revenue and service charges",
          "Only through staking",
          "Only through governance"
        ],
        correct: 1,
        explanation: "Protocols capture value through transaction fees and service charges."
      },
      {
        question: "What increases as more users join the network?",
        options: [
          "Only technical complexity",
          "Network effects and value",
          "Only governance overhead",
          "Only security risks"
        ],
        correct: 1,
        explanation: "Network effects mean value increases as more users join the network."
      },
      {
        question: "What measures how quickly tokens change hands?",
        options: [
          "Holder distribution",
          "Token velocity",
          "Utility adoption",
          "Revenue generation"
        ],
        correct: 1,
        explanation: "Token velocity measures how quickly tokens change hands in the ecosystem."
      },
      {
        question: "What analyzes token concentration among holders?",
        options: [
          "Token velocity",
          "Holder distribution",
          "Utility adoption",
          "Revenue generation"
        ],
        correct: 1,
        explanation: "Holder distribution analyzes token concentration among holders."
      }
    ]
  },
  {
    id: "quiz8",
    title: "Chapter 8 Quiz: Valuation and Pricing of Tokens",
    questions: [
      {
        question: "What is the primary purpose of Discounted Cash Flow (DCF) in token valuation?",
        options: [
          "To predict token price movements",
          "To estimate the present value of future protocol revenues",
          "To calculate market capitalization",
          "To determine trading volume"
        ],
        correct: 1,
        explanation: "DCF estimates the present value of future cash flows by discounting them at a required rate of return, adapting traditional methods for protocol revenues."
      },
      {
        question: "What does the NVT (Network Value to Transactions) ratio measure?",
        options: [
          "Network security vs transaction speed",
          "Market cap vs on-chain transaction volume",
          "Token supply vs demand",
          "Protocol fees vs rewards"
        ],
        correct: 1,
        explanation: "NVT compares a token's market capitalization to its on-chain transaction volume to assess valuation relative to utility."
      },
      {
        question: "What is TVL (Total Value Locked) used to measure?",
        options: [
          "Total trading volume",
          "Sum of assets locked in a protocol",
          "Market capitalization",
          "Token velocity"
        ],
        correct: 1,
        explanation: "TVL measures the total value of assets locked in a DeFi protocol, showing the scale of economic activity supported by the token."
      },
      {
        question: "What is the main advantage of AMM (Automated Market Maker) pricing?",
        options: [
          "Higher trading fees",
          "Deterministic and transparent pricing",
          "Faster execution",
          "Lower slippage"
        ],
        correct: 1,
        explanation: "AMM pricing is deterministic and transparent, using mathematical formulas to automatically price trades without intermediaries."
      },
      {
        question: "What is Impermanent Loss (IL) in liquidity provision?",
        options: [
          "A permanent loss of tokens",
          "The potential loss when token price ratios change",
          "A fee charged by the protocol",
          "A reward for providing liquidity"
        ],
        correct: 1,
        explanation: "Impermanent Loss occurs when the price ratio of deposited tokens changes, potentially making LPs worse off than just holding the tokens."
      }
    ]
  },
  {
    id: "quiz9",
    title: "Chapter 9: Risks and Challenges Quiz",
    description: "Test your understanding of tokenomics risks and challenges",
    questions: [
      {
        question: "What is the primary risk associated with high market volatility in tokenomics?",
        options: [
          "Increased transaction fees",
          "Reduced user adoption due to price uncertainty",
          "Higher gas costs",
          "Slower block times"
        ],
        correct: 1,
        explanation: "High market volatility creates price uncertainty, which can deter users from adopting and using the token, as they cannot predict the value of their holdings."
      },
      {
        question: "Which of the following is NOT a common liquidity risk in tokenomics?",
        options: [
          "Insufficient trading volume",
          "Large price impact from small trades",
          "High staking rewards",
          "Wide bid-ask spreads"
        ],
        correct: 2,
        explanation: "High staking rewards are typically a positive feature that encourages token holding, not a liquidity risk. The other options are all common liquidity concerns."
      },
      {
        question: "What is the main challenge with regulatory compliance in tokenomics?",
        options: [
          "High gas fees",
          "Unclear and evolving regulations across jurisdictions",
          "Slow transaction speeds",
          "Limited scalability"
        ],
        correct: 1,
        explanation: "Regulatory compliance is challenging because cryptocurrency regulations are unclear, constantly evolving, and vary significantly across different countries and jurisdictions."
      },
      {
        question: "Which governance risk is most likely to occur in a centralized token project?",
        options: [
          "Low voter participation",
          "Single point of failure",
          "Slow decision-making",
          "High transaction costs"
        ],
        correct: 1,
        explanation: "Centralized token projects have a single point of failure risk, where if the central authority is compromised or fails, the entire system can collapse."
      },
      {
        question: "What is the primary purpose of risk management in tokenomics?",
        options: [
          "To maximize profits",
          "To protect token holders and ensure long-term sustainability",
          "To reduce transaction fees",
          "To increase token supply"
        ],
        correct: 1,
        explanation: "Risk management in tokenomics aims to protect token holders and ensure the long-term sustainability of the project by identifying and mitigating potential threats."
      }
    ]
  },
  {
    id: "quiz10",
    title: "Chapter 10: Case Studies Quiz",
    description: "Test your knowledge of real-world tokenomics examples",
    questions: [
      {
        question: "What makes Bitcoin's tokenomics model successful?",
        options: [
          "High inflation rate",
          "Predictable scarcity with fixed supply",
          "Centralized governance",
          "Variable transaction fees"
        ],
        correct: 1,
        explanation: "Bitcoin's success comes from its predictable scarcity - the fixed supply of 21 million BTC and the halving schedule every 4 years create reliable scarcity."
      },
      {
        question: "What was the key innovation in Ethereum's transition from PoW to PoS?",
        options: [
          "Increased block size",
          "Reduced energy consumption and improved scalability",
          "Higher transaction fees",
          "Centralized validation"
        ],
        correct: 1,
        explanation: "Ethereum's transition to PoS (The Merge) significantly reduced energy consumption and improved scalability while maintaining decentralization."
      },
      {
        question: "What is the main purpose of UNI tokens in Uniswap's governance?",
        options: [
          "To pay for transactions",
          "To provide voting power for protocol decisions",
          "To earn interest",
          "To reduce fees"
        ],
        correct: 1,
        explanation: "UNI tokens are governance tokens that give holders voting power to make decisions about the Uniswap protocol's future development and parameters."
      },
      {
        question: "What was the primary cause of Terra/LUNA's collapse?",
        options: [
          "High gas fees",
          "Insufficient collateral backing for the algorithmic stablecoin",
          "Low trading volume",
          "Regulatory pressure"
        ],
        correct: 1,
        explanation: "Terra/LUNA collapsed due to insufficient collateral backing for its algorithmic stablecoin UST, making it vulnerable to bank runs and market panic."
      },
      {
        question: "What is the key lesson from successful DeFi protocols like MakerDAO?",
        options: [
          "Over-collateralization is essential for stability",
          "High inflation rates are beneficial",
          "Centralized control is necessary",
          "Low liquidity is acceptable"
        ],
        correct: 0,
        explanation: "MakerDAO's success demonstrates that over-collateralization is essential for stability in DeFi protocols, ensuring the system can handle market volatility."
      }
    ]
  },
  {
    id: "quiz11",
    title: "Chapter 11: Future Trends Quiz",
    description: "Test your understanding of emerging tokenomics trends",
    questions: [
      {
        question: "What is the main benefit of cross-chain tokenomics?",
        options: [
          "Higher transaction fees",
          "Interoperability and expanded utility across multiple blockchains",
          "Centralized control",
          "Reduced security"
        ],
        correct: 1,
        explanation: "Cross-chain tokenomics enables interoperability, allowing tokens to function across multiple blockchains and expanding their utility and user base."
      },
      {
        question: "How does AI integration impact tokenomics?",
        options: [
          "It reduces token supply",
          "It enables dynamic parameter adjustment and automated optimization",
          "It increases centralization",
          "It slows down transactions"
        ],
        correct: 1,
        explanation: "AI integration in tokenomics enables dynamic parameter adjustment and automated optimization of economic models based on real-time market conditions."
      },
      {
        question: "What is the primary goal of sustainable tokenomics?",
        options: [
          "To maximize short-term profits",
          "To balance economic incentives with environmental and social responsibility",
          "To reduce token supply",
          "To increase transaction fees"
        ],
        correct: 1,
        explanation: "Sustainable tokenomics aims to balance economic incentives with environmental and social responsibility, ensuring long-term viability."
      },
      {
        question: "What role does quantum computing play in future tokenomics?",
        options: [
          "It will make all tokens obsolete",
          "It will require new security measures and potentially new token models",
          "It will reduce transaction costs",
          "It will increase centralization"
        ],
        correct: 1,
        explanation: "Quantum computing will require new security measures for blockchain systems and may necessitate new token models that are quantum-resistant."
      },
      {
        question: "What is the main advantage of modular tokenomics?",
        options: [
          "Higher complexity",
          "Flexibility and customization for different use cases",
          "Reduced functionality",
          "Centralized control"
        ],
        correct: 1,
        explanation: "Modular tokenomics provides flexibility and customization, allowing projects to mix and match different economic components for their specific use cases."
      }
    ]
  },
  {
    id: "quiz12",
    title: "Chapter 12: Practical Guide Quiz",
    description: "Test your knowledge of implementing tokenomics in practice",
    questions: [
      {
        question: "What is the first step in designing a tokenomics model?",
        options: [
          "Setting the token price",
          "Defining clear objectives and use cases",
          "Choosing a blockchain",
          "Setting up governance"
        ],
        correct: 1,
        explanation: "The first step is defining clear objectives and use cases, as this will guide all other decisions in the tokenomics design process."
      },
      {
        question: "Why is community engagement important in tokenomics implementation?",
        options: [
          "To increase token price",
          "To ensure adoption, feedback, and long-term sustainability",
          "To reduce development costs",
          "To speed up transactions"
        ],
        correct: 1,
        explanation: "Community engagement is crucial for adoption, provides valuable feedback, and ensures the long-term sustainability of the tokenomics model."
      },
      {
        question: "What is the purpose of a tokenomics audit?",
        options: [
          "To increase token supply",
          "To identify vulnerabilities, ensure compliance, and optimize the model",
          "To reduce transaction fees",
          "To centralize control"
        ],
        correct: 1,
        explanation: "A tokenomics audit helps identify vulnerabilities, ensures regulatory compliance, and optimizes the economic model for better performance."
      },
      {
        question: "How should tokenomics be adapted over time?",
        options: [
          "It should remain static",
          "It should evolve based on market conditions, user feedback, and project needs",
          "It should only change when the token price drops",
          "It should become more centralized"
        ],
        correct: 1,
        explanation: "Tokenomics should evolve based on market conditions, user feedback, and project needs to remain relevant and effective."
      },
      {
        question: "What is the key to successful tokenomics implementation?",
        options: [
          "High initial token price",
          "Balancing economic incentives with real utility and community needs",
          "Maximum token supply",
          "Centralized governance"
        ],
        correct: 1,
        explanation: "Successful tokenomics implementation requires balancing economic incentives with real utility and community needs, ensuring the token serves a genuine purpose."
      }
    ]
  }
];

export default quizzesData;



