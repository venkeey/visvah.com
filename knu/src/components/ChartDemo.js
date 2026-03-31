import React, { useState, useEffect } from 'react';
import {
  SupplyDemandChart,
  EconomicModelChart,
  NetworkEffectChart,
  TokenDistributionChart,
  ChartControls
} from './InteractiveCharts';
import './ChartDemo.css';

const ChartDemo = () => {
  // Supply vs Demand Chart State
  const [supplyDemandParams, setSupplyDemandParams] = useState({
    priceRange: [0, 100],
    quantityRange: [0, 1000],
    elasticity: 1.5
  });

  // Economic Model Chart State
  const [economicModels, setEconomicModels] = useState([
    { id: 'model1', name: 'Fixed Supply', color: '#3b82f6' },
    { id: 'model2', name: 'Inflationary', color: '#10b981' },
    { id: 'model3', name: 'Deflationary', color: '#f59e0b' },
    { id: 'model4', name: 'Dynamic Supply', color: '#ef4444' }
  ]);

  const [economicMetrics] = useState([
    'Token Utility',
    'Price Stability',
    'Adoption Rate',
    'Network Security',
    'Governance Effectiveness'
  ]);

  const [economicData, setEconomicData] = useState({
    model1: { 'Token Utility': 85, 'Price Stability': 90, 'Adoption Rate': 75, 'Network Security': 95, 'Governance Effectiveness': 80 },
    model2: { 'Token Utility': 70, 'Price Stability': 60, 'Adoption Rate': 85, 'Network Security': 80, 'Governance Effectiveness': 75 },
    model3: { 'Token Utility': 90, 'Price Stability': 95, 'Adoption Rate': 70, 'Network Security': 85, 'Governance Effectiveness': 90 },
    model4: { 'Token Utility': 80, 'Price Stability': 75, 'Adoption Rate': 90, 'Network Security': 90, 'Governance Effectiveness': 85 }
  });

  // Network Effect Chart State
  const [networkParams, setNetworkParams] = useState({
    timeRange: 24,
    growthRate: 0.15,
    networkEffect: 0.8
  });

  const [timeData, setTimeData] = useState([]);
  const [adoptionData, setAdoptionData] = useState([]);
  const [networkEffectsData, setNetworkEffectsData] = useState([]);

  // Token Distribution Chart State
  const [distributionParams, setDistributionParams] = useState({
    teamAllocation: 20,
    communityRewards: 30,
    ecosystemFund: 25,
    liquidityPool: 15,
    reserveFund: 10
  });

  // Generate network effect data based on parameters
  useEffect(() => {
    const timePoints = Array.from({ length: networkParams.timeRange + 1 }, (_, i) => i);
    const adoption = timePoints.map(t => 
      Math.min(1000, Math.floor(100 * Math.exp(networkParams.growthRate * t)))
    );
    const networkEffects = timePoints.map(t => 
      Math.floor(adoption[t] * networkParams.networkEffect * (1 + t * 0.1))
    );

    setTimeData(timePoints);
    setAdoptionData(adoption);
    setNetworkEffectsData(networkEffects);
  }, [networkParams]);

  // Chart Controls Configuration
  const supplyDemandControls = [
    {
      id: 'priceRange',
      label: 'Price Range',
      type: 'range',
      min: 10,
      max: 200,
      step: 10,
      default: 100,
      unit: '$'
    },
    {
      id: 'quantityRange',
      label: 'Quantity Range',
      type: 'range',
      min: 100,
      max: 2000,
      step: 100,
      default: 1000,
      unit: 'tokens'
    },
    {
      id: 'elasticity',
      label: 'Price Elasticity',
      type: 'range',
      min: 0.5,
      max: 3.0,
      step: 0.1,
      default: 1.5,
      unit: ''
    }
  ];

  const networkControls = [
    {
      id: 'timeRange',
      label: 'Time Period',
      type: 'range',
      min: 12,
      max: 48,
      step: 6,
      default: 24,
      unit: 'months'
    },
    {
      id: 'growthRate',
      label: 'Growth Rate',
      type: 'range',
      min: 0.05,
      max: 0.30,
      step: 0.01,
      default: 0.15,
      unit: ''
    },
    {
      id: 'networkEffect',
      label: 'Network Effect',
      type: 'range',
      min: 0.5,
      max: 1.0,
      step: 0.05,
      default: 0.8,
      unit: ''
    }
  ];

  const distributionControls = [
    {
      id: 'teamAllocation',
      label: 'Team Allocation',
      type: 'range',
      min: 10,
      max: 30,
      step: 1,
      default: 20,
      unit: '%'
    },
    {
      id: 'communityRewards',
      label: 'Community Rewards',
      type: 'range',
      min: 20,
      max: 40,
      step: 1,
      default: 30,
      unit: '%'
    },
    {
      id: 'ecosystemFund',
      label: 'Ecosystem Fund',
      type: 'range',
      min: 15,
      max: 35,
      step: 1,
      default: 25,
      unit: '%'
    },
    {
      id: 'liquidityPool',
      label: 'Liquidity Pool',
      type: 'range',
      min: 10,
      max: 25,
      step: 1,
      default: 15,
      unit: '%'
    },
    {
      id: 'reserveFund',
      label: 'Reserve Fund',
      type: 'range',
      min: 5,
      max: 20,
      step: 1,
      default: 10,
      unit: '%'
    }
  ];

  // Handle control changes
  const handleSupplyDemandChange = (newParams) => {
    setSupplyDemandParams(newParams);
  };

  const handleNetworkChange = (newParams) => {
    setNetworkParams(newParams);
  };

  const handleDistributionChange = (newParams) => {
    // Ensure total doesn't exceed 100%
    const total = Object.values(newParams).reduce((sum, val) => sum + val, 0);
    if (total <= 100) {
      setDistributionParams(newParams);
    }
  };

  // Generate supply and demand data based on parameters
  const generateSupplyData = () => {
    const { priceRange, quantityRange, elasticity } = supplyDemandParams;
    return Array.from({ length: priceRange[1] + 1 }, (_, i) => 
      Math.max(0, Math.floor((i / priceRange[1]) * quantityRange[1] * elasticity))
    );
  };

  const generateDemandData = () => {
    const { priceRange, quantityRange, elasticity } = supplyDemandParams;
    return Array.from({ length: priceRange[1] + 1 }, (_, i) => 
      Math.max(0, Math.floor(quantityRange[1] - (i / priceRange[1]) * quantityRange[1] / elasticity))
    );
  };

  return (
    <div className="chart-demo">
      <div className="demo-header">
        <h1>🎯 Interactive Tokenomics Charts</h1>
        <p>Explore and experiment with different tokenomics models using interactive visualizations</p>
      </div>

      <div className="charts-grid">
        {/* Supply vs Demand Chart */}
        <div className="chart-section">
          <h2>📊 Supply vs Demand Analysis</h2>
          <p>Visualize how token supply and demand interact to determine equilibrium price and quantity.</p>
          
          <SupplyDemandChart
            supplyData={generateSupplyData()}
            demandData={generateDemandData()}
            priceRange={supplyDemandParams.priceRange}
            quantityRange={supplyDemandParams.quantityRange}
            onPointClick={undefined}
          />
          
          <ChartControls
            controls={supplyDemandControls}
            values={supplyDemandParams}
            onChange={handleSupplyDemandChange}
          />
        </div>

        {/* Economic Model Comparison */}
        <div className="chart-section">
          <h2>🏗️ Economic Model Comparison</h2>
          <p>Compare different token economic models across key metrics and performance indicators.</p>
          
          <EconomicModelChart
            models={economicModels}
            metrics={economicMetrics}
            data={economicData}
            onModelSelect={undefined}
          />
        </div>

        {/* Network Effects Chart */}
        <div className="chart-section">
          <h2>🌐 Network Effects & Adoption</h2>
          <p>See how network effects amplify user adoption and create exponential growth patterns.</p>
          
          <NetworkEffectChart
            timeData={timeData}
            adoptionData={adoptionData}
            networkEffects={networkEffectsData}
            onTimePointClick={undefined}
          />
          
          <ChartControls
            controls={networkControls}
            values={networkParams}
            onChange={handleNetworkChange}
          />
        </div>

        {/* Token Distribution Chart */}
        <div className="chart-section">
          <h2>🎯 Token Distribution Strategy</h2>
          <p>Design and visualize different token allocation strategies for your project.</p>
          
          <TokenDistributionChart
            distribution={distributionParams}
            onSliceClick={undefined}
          />
          
          <ChartControls
            controls={distributionControls}
            values={distributionParams}
            onChange={handleDistributionChange}
          />
          
          <div className="distribution-total">
            <span className="total-label">Total Allocation:</span>
            <span className={`total-value ${Object.values(distributionParams).reduce((sum, val) => sum + val, 0) > 100 ? 'error' : 'success'}`}>
              {Object.values(distributionParams).reduce((sum, val) => sum + val, 0)}%
            </span>
          </div>
        </div>
      </div>

      <div className="demo-footer">
        <h3>💡 How to Use These Charts</h3>
        <div className="usage-tips">
          <div className="tip">
            <span className="tip-icon">🎛️</span>
            <div className="tip-content">
              <h4>Adjust Parameters</h4>
              <p>Use the sliders and controls below each chart to experiment with different values and see real-time updates.</p>
            </div>
          </div>
          <div className="tip">
            <span className="tip-icon">🔍</span>
            <div className="tip-content">
              <h4>Interactive Elements</h4>
              <p>Hover over chart elements to see detailed information, and click on data points for additional insights.</p>
            </div>
          </div>
          <div className="tip">
            <span className="tip-icon">📱</span>
            <div className="tip-content">
              <h4>Responsive Design</h4>
              <p>All charts are fully responsive and work perfectly on desktop, tablet, and mobile devices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDemo;



