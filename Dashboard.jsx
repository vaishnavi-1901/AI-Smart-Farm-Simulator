import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AgriBot from './AgriBot';
import './Dashboard.css';

// Widget Data
const widgets = [
  {
    id: 'soil-health',
    title: 'Soil Health',
    icon: '🌱',
    color: '#4CAF50',
    description: 'Monitor soil pH, nutrients, and moisture levels',
    details: {
      ph: '6.8 (Optimal)',
      nutrients: 'N: 45%, P: 32%, K: 28%',
      moisture: '68%',
      organicMatter: '3.2%',
      status: 'Excellent'
    }
  },
  {
    id: 'irrigation',
    title: 'Irrigation',
    icon: '💧',
    color: '#2196F3',
    description: 'Smart water management and scheduling',
    details: {
      waterUsage: '2.3L/day',
      efficiency: '94%',
      schedule: 'Auto (6:00 AM, 6:00 PM)',
      nextCycle: '2 hours',
      savings: '₹1,200/month'
    }
  },
  {
    id: 'weather-alerts',
    title: 'Weather Alerts',
    icon: '⛈️',
    color: '#FF9800',
    description: 'Real-time weather monitoring and alerts',
    details: {
      temperature: '28°C',
      humidity: '65%',
      rainfall: '0.2mm (Light)',
      windSpeed: '12 km/h',
      forecast: 'Sunny tomorrow',
      alerts: 'None active'
    }
  },
  {
    id: 'seeds-fertilizer',
    title: 'Seeds & Fertilizer',
    icon: '🌾',
    color: '#9C27B0',
    description: 'Seed inventory and fertilizer management',
    details: {
      seedStock: 'Cotton: 25kg, Wheat: 15kg',
      fertilizerStock: 'NPK: 45kg, Organic: 30kg',
      nextApplication: '3 days',
      quality: 'Premium Grade',
      supplier: 'AgriCorp Ltd.'
    }
  },
  {
    id: 'crop-profit',
    title: 'Crop Profit',
    icon: '💰',
    color: '#FF5722',
    description: 'Financial analysis and profit tracking',
    details: {
      monthlyRevenue: '₹45,000',
      costs: '₹18,000',
      profit: '₹27,000',
      roi: '150%',
      trend: '+12% this month',
      forecast: '₹52,000 next month'
    }
  },
  {
    id: 'eco-farming',
    title: 'Eco Farming',
    icon: '🌍',
    color: '#009688',
    description: 'Sustainable farming practices and carbon footprint',
    details: {
      carbonFootprint: '2.1 tons CO2/year',
      waterConservation: '68%',
      biodiversity: 'High',
      certifications: 'Organic, Fair Trade',
      sustainability: '94% score',
      initiatives: 'Solar power, Rainwater harvesting'
    }
  }
];

// Side Panel Component
const SidePanel = ({ widget, isOpen, onClose }) => {
  if (!widget) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fullscreen-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Full Screen Panel */}
          <motion.div
            className="fullscreen-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="fullscreen-header">
              <div className="panel-icon" style={{ backgroundColor: widget.color }}>
                {widget.icon}
              </div>
              <div className="fullscreen-title-section">
                <h1>{widget.title}</h1>
                <p>{widget.description}</p>
              </div>
              <button className="close-button" onClick={onClose}>
                ✕
              </button>
            </div>

            <div className="fullscreen-content">
              <div className="metrics-grid">
                {Object.entries(widget.details).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    className="metric-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 * index,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <div className="metric-title">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="metric-value">{value}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Widget Card Component
const WidgetCard = ({ widget, onClick }) => {
  return (
    <motion.div
      className="card"
      onClick={() => onClick(widget)}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px ${widget.color}40`
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="widget-icon" style={{ backgroundColor: widget.color }}>
        {widget.icon}
      </div>
      <h3 className="widget-title">{widget.title}</h3>
      <p className="widget-description">{widget.description}</p>
      <div className="widget-glow" style={{ backgroundColor: widget.color }} />
    </motion.div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleWidgetClick = (widget) => {
    setSelectedWidget(widget);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedWidget(null), 300); // Wait for animation
  };

  const handleRunSimulation = () => {
    navigate('/simulation');
  };

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.header
        className="dashboard-header"
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <div className="header-content">
          <motion.div
            className="header-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1>🌾 Smart Farm Dashboard</h1>
            <p>Monitor and optimize your farm operations with AI-powered insights</p>
          </motion.div>
          <motion.div
            className="header-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              className="nav-button primary"
              onClick={handleRunSimulation}
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
              🚀 Run Simulation
            </motion.button>
            <motion.button
              className="nav-button secondary"
              onClick={() => navigate('/')}
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
              🏠 Home
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Widgets Grid */}
      <motion.div
        className="widgets-grid"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: 'easeOut'
        }}
      >
        {widgets.map((widget, index) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.8 + index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{
              y: -8,
              transition: { duration: 0.2 }
            }}
          >
            <WidgetCard
              widget={widget}
              onClick={handleWidgetClick}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Side Panel */}
      <SidePanel
        widget={selectedWidget}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />

      {/* Background Elements */}
      <div className="dashboard-bg">
        <motion.div
          className="bg-circle circle-1"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="bg-circle circle-2"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
      </div>

      {/* AgriBot Chatbot */}
      <AgriBot />
    </motion.div>
  );
};

export default Dashboard;