import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './SimulationResults.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const SimulationResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get results from navigation state
  const results = location.state?.results;
  const formData = location.state?.formData;

  const normalizeValue = (value) => {
    if (value == null) return null;
    if (typeof value === 'string' && /^\.[0-9]+f$/.test(value.trim())) {
      return null;
    }
    return value;
  };

  const formatNumber = (value) => {
    const normalized = normalizeValue(value);
    if (normalized == null) return 'N/A';
    const num = Number(normalized);
    return Number.isFinite(num) ? num.toLocaleString() : String(normalized);
  };

  const formatCurrency = (value) => {
    const normalized = normalizeValue(value);
    if (normalized == null) return 'N/A';
    const num = Number(normalized);
    return Number.isFinite(num) ? `₹${num.toLocaleString()}` : String(normalized);
  };

  const formatMarketValue = (value) => {
    const normalized = normalizeValue(value);
    if (normalized == null) return '₹1,00,000';
    const num = Number(normalized);
    return Number.isFinite(num) ? `₹${num.toLocaleString('en-IN')}` : '₹1,00,000';
  };

  const capitalize = (value) => {
    if (!value) return 'N/A';
    return String(value)
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  const simulationData = {
    yield: results?.yield ?? null,
    profit: results?.profit ?? null,
    risk: results?.risk ?? 'N/A',
    crop: results?.best_crop || results?.crop || 'N/A',
    land: results?.land ?? formData?.landArea ?? 'N/A',
    irrigation: results?.irrigation ?? formData?.irrigation ?? 'N/A',
    fertilizer: results?.fertilizer ?? formData?.fertilizer ?? 'N/A',
    method: results?.method ?? formData?.farmingMethod ?? 'N/A',
    marketPrice: results?.marketPrice ?? results?.market_price ?? results?.details?.market_price ?? null
  };

  const riskData = {
    labels: ['Soil', 'Water', 'Weather', 'Market', 'Pests'],
    datasets: [
      {
        label: 'Risk Level',
        data: [60, 40, 80, 50, 70],
        borderColor: '#ff4d4f',
        backgroundColor: 'rgba(255,77,79,0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: '#ff4d4f'
      }
    ]
  };

  const riskOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: '#cbd5e1'
        },
        grid: {
          color: 'rgba(255,255,255,0.08)'
        }
      },
      x: {
        ticks: {
          color: '#cbd5e1'
        },
        grid: {
          color: 'transparent'
        }
      }
    }
  };

  console.log('📊 SimulationResults component loaded');
  console.log('📊 Results data:', results);
  console.log('📊 Form data:', formData);
  console.log('📊 Parsed simulation data:', simulationData);

  const handleNewSimulation = () => {
    console.log('🔄 Navigating to new simulation');
    navigate('/simulation');
  };

  const handleBackToDashboard = () => {
    console.log('🏠 Navigating back to dashboard');
    navigate('/dashboard');
  };

  // If no results, show no data message
  if (!results) {
    console.log('⚠️ No results data found, showing no-data message');
    return (
      <Motion.div
        className="results-page-container"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="no-data-container">
          <Motion.div
            className="no-data-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="no-data-icon">📊</div>
            <h2>No Simulation Data Found</h2>
            <p>Please run a simulation first to view results.</p>
            <div className="no-data-actions">
              <button className="nav-button primary" onClick={handleNewSimulation}>
                🔄 Run Simulation
              </button>
              <button className="nav-button secondary" onClick={handleBackToDashboard}>
                📊 Dashboard
              </button>
            </div>
          </Motion.div>
        </div>
      </Motion.div>
    );
  }

  return (
    <Motion.div
      className="results-page-container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="results-page-inner">
        {/* Header */}
        <Motion.header
          className="results-header"
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
        <div className="header-content">
          <Motion.div
            className="header-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1>📊 Simulation Results</h1>
            <p>AI-powered farming simulation completed successfully</p>
          </Motion.div>
          <Motion.div
            className="header-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Motion.button
              className="nav-button primary"
              onClick={handleNewSimulation}
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow: '0 12px 40px rgba(74, 222, 128, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              🔄 New Simulation
            </Motion.button>
            <Motion.button
              className="nav-button secondary"
              onClick={handleBackToDashboard}
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              📊 Dashboard
            </Motion.button>
          </Motion.div>
        </div>
      </Motion.header>

        {/* Results Content */}
        <Motion.div
          className="results-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: 'easeOut'
          }}
        >
        {/* Summary Card */}
        <Motion.div
          className="summary-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="summary-header">
            <h2>🌾 Farm Configuration Summary</h2>
          </div>
          <div className="summary-details">
            <div className="summary-item">
              <span className="summary-label">Crop:</span>
              <span className="summary-value">{formData?.crop ? formData.crop.charAt(0).toUpperCase() + formData.crop.slice(1) : 'N/A'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Irrigation:</span>
              <span className="summary-value">{formData?.irrigation ? formData.irrigation.charAt(0).toUpperCase() + formData.irrigation.slice(1) : 'N/A'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Fertilizer:</span>
              <span className="summary-value">{formData?.fertilizer ? formData.fertilizer.charAt(0).toUpperCase() + formData.fertilizer.slice(1) : 'N/A'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Farming Method:</span>
              <span className="summary-value">{formData?.farmingMethod ? formData.farmingMethod.charAt(0).toUpperCase() + formData.farmingMethod.slice(1) : 'N/A'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Land Area:</span>
              <span className="summary-value">{formData?.landArea ? `${formData.landArea} acres` : 'N/A'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Budget:</span>
              <span className="summary-value">{formData?.budget ? `₹${formData.budget}` : 'N/A'}</span>
            </div>
          </div>
        </Motion.div>

        <div className="risk-section">
          <h2 className="risk-title">Risk Analysis</h2>
          <div className="chart-wrapper">
            <Motion.div
              className="risk-chart-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <h2>Risk Analysis</h2>
              <Line data={riskData} options={riskOptions} />
            </Motion.div>
          </div>
        </div>

        <div className="kpi-section">
          <div className="kpi-card">
            <h4>🌾 Best Crop</h4>
            <p className="kpi-value highlight">{capitalize(simulationData.crop)}</p>
          </div>

          <div className="kpi-card">
            <h4>📦 Predicted Yield</h4>
            <p className="kpi-value">{simulationData.yield != null ? `${formatNumber(simulationData.yield)} kg` : 'N/A'}</p>
          </div>

          <div className="kpi-card">
            <h4>💰 Estimated Profit</h4>
            <p className="kpi-value">{formatCurrency(simulationData.profit)}</p>
          </div>
        </div>

        <div className="additional-info-grid">
          <Motion.div
            className="additional-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="additional-label">Land Area</span>
            <span className="additional-value">{simulationData.land != null ? `${formatNumber(simulationData.land)} acres` : 'N/A'}</span>
          </Motion.div>

          <Motion.div
            className="additional-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            <span className="additional-label">Irrigation Type</span>
            <span className="additional-value">{capitalize(simulationData.irrigation)}</span>
          </Motion.div>

          <Motion.div
            className="additional-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span className="additional-label">Fertilizer Type</span>
            <span className="additional-value">{capitalize(simulationData.fertilizer)}</span>
          </Motion.div>

          <Motion.div
            className="additional-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
          >
            <span className="additional-label">Farming Method</span>
            <span className="additional-value">{capitalize(simulationData.method)}</span>
          </Motion.div>

          <Motion.div
            className="additional-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <span className="additional-label">Estimated Market Value</span>
            <span className="additional-value market-price-value">{formatMarketValue(simulationData.marketPrice)}</span>
          </Motion.div>
        </div>
      </Motion.div>
    </div>
    </Motion.div>
  );
};

export default SimulationResults;