// FAQ data for each chapter of the tokenomics book
const faqData = {
  1: {
    title: "Chapter 1: Introduction to Tokenomics",
    questions: [
      {
        question: "What is tokenomics and why is it important?",
        answer: "Tokenomics is the study of the economics of cryptocurrency tokens, including their supply, distribution, utility, and governance mechanisms. It's crucial because it determines how a token will behave economically and whether it can sustain long-term value."
      },
      {
        question: "How do tokens differ from traditional currencies?",
        answer: "Tokens are digital assets built on blockchain technology with programmable features, while traditional currencies are government-issued and controlled by central banks. Tokens can have built-in economic rules and smart contract functionality."
      },
      {
        question: "What are the key components of tokenomics?",
        answer: "Key components include token supply (total, circulating, max), distribution mechanisms, utility functions, governance rights, economic incentives, and token velocity. Each component affects the token's economic behavior."
      },
      {
        question: "How does tokenomics affect investment decisions?",
        answer: "Tokenomics helps investors understand the economic model, potential for value appreciation, risks, and long-term sustainability of a project. Poor tokenomics often lead to failed projects."
      },
      {
        question: "What is the difference between inflationary and deflationary tokens?",
        answer: "Inflationary tokens have increasing supply over time (like traditional fiat), while deflationary tokens have decreasing or fixed supply (like Bitcoin). Each model has different economic implications."
      }
    ]
  },
  2: {
    title: "Chapter 2: Fundamentals of Token Economics",
    questions: [
      {
        question: "What is token supply and why does it matter?",
        answer: "Token supply refers to the total number of tokens that exist or will exist. It matters because it directly affects scarcity, inflation, and price dynamics. Limited supply can create scarcity value."
      },
      {
        question: "How do you calculate token market capitalization?",
        answer: "Market cap = Current token price × Circulating supply. This gives you the total value of all circulating tokens and helps compare projects of different sizes."
      },
      {
        question: "What is token velocity and why is it important?",
        answer: "Token velocity measures how quickly tokens change hands. High velocity can indicate active usage but may reduce price stability, while low velocity can indicate holding behavior."
      },
      {
        question: "How do economic incentives work in tokenomics?",
        answer: "Economic incentives encourage desired behaviors through token rewards, staking benefits, governance rights, or access to services. Well-designed incentives align user behavior with project goals."
      },
      {
        question: "What is the relationship between utility and token value?",
        answer: "Token utility (what you can do with it) drives demand. More utility typically means higher demand and potentially higher value, assuming the utility is valuable to users."
      }
    ]
  },
  3: {
    title: "Chapter 3: Token Design Principles",
    questions: [
      {
        question: "What makes a good token design?",
        answer: "Good token design includes clear utility, balanced supply mechanics, fair distribution, aligned incentives, and sustainable economic model. It should solve real problems and create value for users."
      },
      {
        question: "How do you balance token supply and demand?",
        answer: "Balance is achieved through mechanisms like burning, minting, staking rewards, and utility functions that create natural demand. The goal is to prevent extreme inflation or deflation."
      },
      {
        question: "What are the different types of token standards?",
        answer: "Common standards include ERC-20 (fungible tokens), ERC-721 (NFTs), ERC-1155 (multi-token), and ERC-4626 (vaults). Each serves different use cases and has different properties."
      },
      {
        question: "How important is token distribution in design?",
        answer: "Distribution is crucial - it affects decentralization, governance power, and market stability. Poor distribution can lead to whale dominance and manipulation."
      },
      {
        question: "What role does governance play in token design?",
        answer: "Governance determines how decisions are made about the token and protocol. Good governance gives stakeholders voice while maintaining efficiency and preventing gridlock."
      }
    ]
  },
  4: {
    title: "Chapter 4: Token Distribution Strategies",
    questions: [
      {
        question: "What are the main token distribution methods?",
        answer: "Main methods include ICOs, airdrops, mining/staking rewards, team allocations, foundation reserves, and public sales. Each has different implications for decentralization and price stability."
      },
      {
        question: "How do you prevent whale dominance in distribution?",
        answer: "Prevent whale dominance through vesting schedules, gradual releases, community allocations, and mechanisms that encourage broader distribution and participation."
      },
      {
        question: "What is the ideal team token allocation?",
        answer: "Team allocation typically ranges from 10-20% with long vesting schedules (2-4 years). This aligns team incentives while preventing excessive control and ensuring long-term commitment."
      },
      {
        question: "How do airdrops affect token economics?",
        answer: "Airdrops can increase distribution and community engagement but may create selling pressure if recipients don't value the tokens. Strategic airdrops target engaged users who are more likely to hold."
      },
      {
        question: "What are the risks of poor token distribution?",
        answer: "Risks include centralization, price manipulation, lack of community engagement, regulatory concerns, and eventual project failure due to misaligned incentives."
      }
    ]
  },
  5: {
    title: "Chapter 5: Token Utility and Use Cases",
    questions: [
      {
        question: "What are the main types of token utility?",
        answer: "Main types include governance rights, staking rewards, payment for services, access to features, representation of assets, and rewards for participation. Utility drives demand and value."
      },
      {
        question: "How do you create sustainable token utility?",
        answer: "Sustainable utility comes from solving real problems, creating ongoing value, and building network effects. Avoid artificial utility that doesn't provide genuine benefits to users."
      },
      {
        question: "What is the difference between utility and governance tokens?",
        answer: "Utility tokens provide access to services or features, while governance tokens give voting rights in protocol decisions. Many tokens combine both functions."
      },
      {
        question: "How does token utility affect price stability?",
        answer: "Strong utility creates consistent demand, improving price stability. Tokens with weak or declining utility often experience price volatility and long-term decline."
      },
      {
        question: "Can a token have too much utility?",
        answer: "Yes, overly complex utility can confuse users, create security risks, and make the token difficult to understand. Simple, clear utility is often more effective."
      },
      {
        question: "What role do AMMs play in token utility?",
        answer: "AMMs provide essential utility by enabling decentralized trading, liquidity provision, and price discovery. They create demand for tokens through trading fees and liquidity mining rewards, making them fundamental to DeFi ecosystems."
      },
      {
        question: "What's the difference between usage and holding incentives?",
        answer: "Usage incentives encourage spending and circulating tokens (discounts, access unlocks, transaction rewards), while holding incentives reward long-term commitment (staking, governance power, revenue sharing). Both are needed for balanced tokenomics."
      }
    ]
  },
  6: {
    title: "Chapter 6: Governance and DAOs",
    questions: [
      {
        question: "What is a DAO and how does it work?",
        answer: "A DAO (Decentralized Autonomous Organization) is a community-governed organization that operates through smart contracts and token-based voting. Members propose and vote on decisions collectively."
      },
      {
        question: "How does token-based governance work?",
        answer: "Token holders can propose changes and vote on proposals. Voting power is typically proportional to tokens held, though some systems use quadratic voting or other mechanisms."
      },
      {
        question: "What are the advantages of DAO governance?",
        answer: "Advantages include transparency, community ownership, resistance to censorship, and alignment of stakeholder interests. Decisions are made collectively rather than by a central authority."
      },
      {
        question: "What are the challenges of DAO governance?",
        answer: "Challenges include voter apathy, whale dominance, slow decision-making, coordination problems, and the difficulty of making complex decisions through simple voting mechanisms."
      },
      {
        question: "How do you prevent governance attacks?",
        answer: "Prevent attacks through timelocks, proposal thresholds, quorum requirements, and mechanisms that make hostile takeovers expensive and difficult to execute."
      }
    ]
  },
  7: {
    title: "Chapter 7: Economic Models and Incentives",
    questions: [
      {
        question: "What are the main economic models in tokenomics?",
        answer: "Main models include inflationary (increasing supply), deflationary (decreasing supply), dual-token (separate utility and governance tokens), and rebasing (dynamic supply adjustment)."
      },
      {
        question: "How do staking rewards work?",
        answer: "Staking rewards incentivize users to lock their tokens to secure the network or participate in governance. Rewards can come from transaction fees, new token minting, or other sources."
      },
      {
        question: "What is yield farming and how does it work?",
        answer: "Yield farming rewards users for providing liquidity or performing specific actions. Users earn tokens by staking, lending, or participating in DeFi protocols."
      },
      {
        question: "How do you design sustainable incentives?",
        answer: "Sustainable incentives align long-term user behavior with project goals, avoid excessive rewards that lead to inflation, and create genuine value rather than just speculation."
      },
      {
        question: "What is the tragedy of the commons in tokenomics?",
        answer: "This occurs when users act in their self-interest to maximize short-term gains, ultimately harming the long-term health of the ecosystem. Good design prevents this through aligned incentives."
      },
      {
        question: "How do you balance usage and holding incentives?",
        answer: "Balance is achieved by combining mechanisms that encourage both active usage (discounts, access unlocks) and long-term holding (staking, governance, revenue sharing). The goal is to maintain economic activity while ensuring price stability."
      }
    ]
  },
  8: {
    title: "Chapter 8: Token Valuation and Metrics",
    questions: [
      {
        question: "How do you value a cryptocurrency token?",
        answer: "Valuation considers factors like utility, adoption, network effects, team quality, market conditions, and comparable projects. No single method is perfect, so use multiple approaches."
      },
      {
        question: "What are the key metrics to analyze?",
        answer: "Key metrics include market cap, circulating supply, trading volume, active addresses, developer activity, social sentiment, and on-chain metrics like transaction count and value."
      },
      {
        question: "What is the difference between price and value?",
        answer: "Price is what you pay for a token in the market, while value is the intrinsic worth based on fundamentals. Price can deviate significantly from value due to speculation and market dynamics."
      },
      {
        question: "How do you assess token fundamentals?",
        answer: "Assess fundamentals by analyzing the team, technology, market opportunity, competitive advantages, tokenomics design, and real-world adoption and usage."
      },
      {
        question: "What role does market sentiment play in valuation?",
        answer: "Market sentiment can drive prices far from fundamental value in the short term. Understanding sentiment helps explain price movements, but fundamentals matter more for long-term value."
      }
    ]
  },
  9: {
    title: "Chapter 9: Risk Assessment and Management",
    questions: [
      {
        question: "What are the main risks in tokenomics?",
        answer: "Main risks include regulatory uncertainty, smart contract vulnerabilities, market manipulation, poor governance, economic model failures, and technological obsolescence."
      },
      {
        question: "How do you assess smart contract risk?",
        answer: "Assess risk through code audits, testing, formal verification, bug bounty programs, and analysis of the development team's track record and security practices."
      },
      {
        question: "What is regulatory risk in tokenomics?",
        answer: "Regulatory risk comes from uncertain or changing laws that could affect token legality, trading, or utility. Different jurisdictions have different approaches to cryptocurrency regulation."
      },
      {
        question: "How do you manage economic risks?",
        answer: "Manage economic risks through diversification, understanding the tokenomics model, monitoring key metrics, and being prepared for various market scenarios."
      },
      {
        question: "What are the signs of a failing tokenomics model?",
        answer: "Signs include declining utility, excessive inflation, whale dominance, lack of community engagement, and fundamental flaws in the economic design that become apparent over time."
      }
    ]
  },
  10: {
    title: "Chapter 10: Case Studies and Real-World Examples",
    questions: [
      {
        question: "What can we learn from Bitcoin's tokenomics?",
        answer: "Bitcoin shows the power of fixed supply, predictable issuance, and strong network effects. Its halving mechanism creates scarcity while maintaining security through mining incentives."
      },
      {
        question: "How did Ethereum's tokenomics evolve?",
        answer: "Ethereum evolved from PoW to PoS, introduced fee burning (EIP-1559), and adapted its economic model to changing needs while maintaining security and decentralization."
      },
      {
        question: "What went wrong with Terra's tokenomics?",
        answer: "Terra failed due to insufficient collateralization, complex algorithmic mechanisms, and vulnerability to bank runs. It lacked proper risk management and over-promised stability."
      },
      {
        question: "What makes Uniswap's tokenomics successful?",
        answer: "Uniswap's success comes from clear utility (governance), fair distribution, community ownership, and alignment between token holders and protocol success."
      },
      {
        question: "How do Automated Market Makers (AMMs) work in DeFi?",
        answer: "AMMs use mathematical formulas (like x*y=k) and liquidity pools to automatically price and execute trades. They eliminate traditional order books, enabling decentralized trading with liquidity providers earning fees from trades."
      },
      {
        question: "How do you analyze failed tokenomics projects?",
        answer: "Analyze failures by identifying the root causes, understanding what could have been prevented, and learning lessons about design principles, risk management, and community building."
      }
    ]
  },
  11: {
    title: "Chapter 11: Future Trends and Innovations",
    questions: [
      {
        question: "What are the emerging trends in tokenomics?",
        answer: "Emerging trends include AI-driven tokenomics, cross-chain interoperability, improved governance mechanisms, sustainable tokenomics, and integration with traditional finance."
      },
      {
        question: "How will regulation affect tokenomics design?",
        answer: "Regulation will likely require more transparency, compliance features, and traditional financial safeguards. This may lead to hybrid models that combine DeFi innovation with regulatory compliance."
      },
      {
        question: "What role will AI play in tokenomics?",
        answer: "AI could optimize economic parameters, predict market behavior, automate governance decisions, and create more sophisticated incentive structures based on real-time data."
      },
      {
        question: "How will tokenomics evolve with Web3?",
        answer: "Web3 will likely bring more complex utility, better user experience, stronger network effects, and deeper integration between different protocols and services."
      },
      {
        question: "What are the challenges of future tokenomics?",
        answer: "Challenges include balancing innovation with stability, managing increasing complexity, ensuring security in AI-driven systems, and maintaining decentralization as systems scale."
      }
    ]
  },
  12: {
    title: "Chapter 12: Conclusion and Best Practices",
    questions: [
      {
        question: "What are the key principles of good tokenomics?",
        answer: "Key principles include clear utility, fair distribution, sustainable economics, aligned incentives, good governance, and long-term thinking rather than short-term speculation."
      },
      {
        question: "How do you evaluate a tokenomics project?",
        answer: "Evaluate by analyzing the team, technology, market opportunity, tokenomics design, governance structure, and comparing it to successful projects in the same category."
      },
      {
        question: "What are common mistakes in tokenomics design?",
        answer: "Common mistakes include excessive inflation, poor distribution, weak utility, misaligned incentives, over-complexity, and lack of long-term sustainability planning."
      },
      {
        question: "How important is community in tokenomics success?",
        answer: "Community is crucial - it drives adoption, provides feedback, participates in governance, and creates network effects. Strong communities often lead to successful projects."
      },
      {
        question: "What's the future of tokenomics?",
        answer: "The future includes more sophisticated economic models, better integration with traditional finance, improved governance mechanisms, and broader adoption across various industries and use cases."
      }
    ]
  }
};

export default faqData;
