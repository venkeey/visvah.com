import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Pie, Doughnut, Radar, Scatter } from 'react-chartjs-2';
import './InteractiveCharts.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
);

// Tokenomics Chart Component
export const TokenomicsChart = ({ 
  type = 'line', 
  data, 
  options = {}, 
  height = 400,
  className = '',
  onChartClick = null 
}) => {
  const chartRef = useRef(null);

  const renderChart = () => {
    const chartProps = {
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
                weight: '600'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#3b82f6',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            padding: 12
          }
        },
        ...options
      },
      onClick: onChartClick
    };

    switch (type) {
      case 'line':
        return <Line ref={chartRef} {...chartProps} />;
      case 'bar':
        return <Bar ref={chartRef} {...chartProps} />;
      case 'pie':
        return <Pie ref={chartRef} {...chartProps} />;
      case 'doughnut':
        return <Doughnut ref={chartRef} {...chartProps} />;
      case 'radar':
        return <Radar ref={chartRef} {...chartProps} />;
      case 'scatter':
        return <Scatter ref={chartRef} {...chartProps} />;
      default:
        return <Line ref={chartRef} {...chartProps} />;
    }
  };

  return (
    <div className={`tokenomics-chart ${className}`} style={{ height }}>
      {renderChart()}
    </div>
  );
};

// Supply vs Demand Chart
export const SupplyDemandChart = ({ 
  supplyData, 
  demandData, 
  priceRange = [0, 100],
  quantityRange = [0, 1000],
  onPointClick = null 
}) => {
  const [equilibrium, setEquilibrium] = useState({ price: 50, quantity: 500 });

  useEffect(() => {
    // Calculate equilibrium point
    if (supplyData && demandData) {
      // Simple equilibrium calculation
      const eqPrice = (priceRange[0] + priceRange[1]) / 2;
      const eqQuantity = (quantityRange[0] + quantityRange[1]) / 2;
      setEquilibrium({ price: eqPrice, quantity: eqQuantity });
    }
  }, [supplyData, demandData, priceRange, quantityRange]);

  const chartData = {
    labels: priceRange.map(price => `$${price}`),
    datasets: [
      {
        label: 'Supply',
        data: supplyData || Array.from({ length: priceRange.length }, (_, i) => 
          Math.max(0, (i / priceRange.length) * quantityRange[1])
        ),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Demand',
        data: demandData || Array.from({ length: priceRange.length }, (_, i) => 
          Math.max(0, quantityRange[1] - (i / priceRange.length) * quantityRange[1])
        ),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Price ($)',
          font: { size: 14, weight: '600' }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Quantity',
          font: { size: 14, weight: '600' }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Supply vs Demand Curve',
        font: { size: 18, weight: '700' },
        color: '#1f2937'
      }
    }
  };

  return (
    <div className="supply-demand-chart">
      <TokenomicsChart
        type="line"
        data={chartData}
        options={chartOptions}
        height={400}
        onChartClick={onPointClick}
      />
      <div className="equilibrium-info">
        <div className="equilibrium-point">
          <span className="label">Equilibrium Price:</span>
          <span className="value">${equilibrium.price.toFixed(2)}</span>
        </div>
        <div className="equilibrium-point">
          <span className="label">Equilibrium Quantity:</span>
          <span className="value">{equilibrium.quantity.toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
};

// Economic Model Comparison Chart
export const EconomicModelChart = ({ 
  models = [], 
  metrics = [], 
  data = {},
  onModelSelect = null 
}) => {
  const [selectedModels, setSelectedModels] = useState(models.slice(0, 3));

  const chartData = {
    labels: metrics,
    datasets: selectedModels.map((model, index) => ({
      label: model.name,
      data: metrics.map(metric => data[model.id]?.[metric] || 0),
      backgroundColor: model.color || `hsl(${index * 120}, 70%, 60%)`,
      borderColor: model.color || `hsl(${index * 120}, 70%, 60%)`,
      borderWidth: 2,
      borderRadius: 4,
      borderSkipped: false
    }))
  };

  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        title: {
          display: true,
          text: 'Score',
          font: { size: 14, weight: '600' }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Metrics',
          font: { size: 14, weight: '600' }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Economic Model Comparison',
        font: { size: 18, weight: '700' },
        color: '#1f2937'
      }
    }
  };

  const handleModelToggle = (modelId) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, models.find(m => m.id === modelId)]
    );
  };

  return (
    <div className="economic-model-chart">
      <div className="model-selector">
        <h4>Select Models to Compare:</h4>
        <div className="model-toggles">
          {models.map(model => (
            <label key={model.id} className="model-toggle">
              <input
                type="checkbox"
                checked={selectedModels.some(m => m.id === model.id)}
                onChange={() => handleModelToggle(model.id)}
              />
              <span className="toggle-label">{model.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      <TokenomicsChart
        type="bar"
        data={chartData}
        options={chartOptions}
        height={400}
        onChartClick={onModelSelect}
      />
    </div>
  );
};

// Network Effect Chart
export const NetworkEffectChart = ({ 
  timeData = [], 
  adoptionData = [], 
  networkEffects = [],
  onTimePointClick = null 
}) => {
  const chartData = {
    labels: timeData,
    datasets: [
      {
        label: 'User Adoption',
        data: adoptionData,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'y'
      },
      {
        label: 'Network Effects',
        data: networkEffects,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'y1'
      }
    ]
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
          font: { size: 14, weight: '600' }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Users',
          font: { size: 14, weight: '600' }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Network Value',
          font: { size: 14, weight: '600' }
        },
        grid: {
          drawOnChartArea: false,
        },
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Network Effects & Adoption Curve',
        font: { size: 18, weight: '700' },
        color: '#1f2937'
      }
    }
  };

  return (
    <div className="network-effect-chart">
      <TokenomicsChart
        type="line"
        data={chartData}
        options={chartOptions}
        height={400}
        onChartClick={onTimePointClick}
      />
    </div>
  );
};

// Token Distribution Chart
export const TokenDistributionChart = ({ 
  distribution = {}, 
  onSliceClick = null 
}) => {
  const chartData = {
    labels: Object.keys(distribution),
    datasets: [
      {
        data: Object.values(distribution),
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#06b6d4',
          '#84cc16',
          '#f97316'
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Token Distribution',
        font: { size: 18, weight: '700' },
        color: '#1f2937'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="token-distribution-chart">
      <TokenomicsChart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        height={300}
        onChartClick={onSliceClick}
      />
    </div>
  );
};

// Chart Controls Component
export const ChartControls = ({ 
  controls = [], 
  values = {}, 
  onChange = null 
}) => {
  const handleControlChange = (controlId, value) => {
    if (onChange) {
      onChange({ ...values, [controlId]: value });
    }
  };

  return (
    <div className="chart-controls">
      <h4>Chart Parameters</h4>
      <div className="controls-grid">
        {controls.map(control => (
          <div key={control.id} className="control-item">
            <label htmlFor={control.id} className="control-label">
              {control.label}
            </label>
            {control.type === 'range' ? (
              <input
                id={control.id}
                type="range"
                min={control.min}
                max={control.max}
                step={control.step || 1}
                value={values[control.id] || control.default}
                onChange={(e) => handleControlChange(control.id, parseFloat(e.target.value))}
                className="control-range"
              />
            ) : control.type === 'select' ? (
              <select
                id={control.id}
                value={values[control.id] || control.default}
                onChange={(e) => handleControlChange(control.id, e.target.value)}
                className="control-select"
              >
                {control.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={control.id}
                type="number"
                min={control.min}
                max={control.max}
                step={control.step || 1}
                value={values[control.id] || control.default}
                onChange={(e) => handleControlChange(control.id, parseFloat(e.target.value))}
                className="control-number"
              />
            )}
            <span className="control-value">
              {values[control.id] || control.default}
              {control.unit && ` ${control.unit}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenomicsChart;



