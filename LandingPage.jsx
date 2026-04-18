import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

// Generate animated background particles
const floatingDots = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 3,
  duration: 6 + Math.random() * 4,
}));

// Realistic plant SVG component
const RealisticPlant = () => (
  <svg viewBox="0 0 300 500" className="plant-svg" preserveAspectRatio="xMidYMid meet">
    {/* Soil/Pot base */}
    <ellipse cx="150" cy="450" rx="60" ry="20" fill="#1a2f2a" opacity="0.8" />
    <ellipse cx="150" cy="448" rx="62" ry="22" fill="#2d4a40" opacity="0.6" />
    
    {/* Main stem - natural curve */}
    <path
      d="M 150 450 Q 145 380 148 300 Q 150 200 152 100"
      stroke="#2d6a4f"
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
    />
    
    {/* Left branch */}
    <path
      d="M 148 300 Q 100 280 60 250"
      stroke="#2d6a4f"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
    
    {/* Right branch */}
    <path
      d="M 152 300 Q 200 280 240 250"
      stroke="#2d6a4f"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
    
    {/* Large left leaf 1 */}
    <ellipse
      cx="40"
      cy="240"
      rx="28"
      ry="18"
      fill="#40916c"
      opacity="0.95"
      transform="rotate(-35 40 240)"
    />
    <ellipse
      cx="42"
      cy="238"
      rx="24"
      ry="14"
      fill="#52b788"
      opacity="0.7"
      transform="rotate(-35 42 238)"
    />
    
    {/* Large right leaf 1 */}
    <ellipse
      cx="260"
      cy="240"
      rx="28"
      ry="18"
      fill="#40916c"
      opacity="0.95"
      transform="rotate(35 260 240)"
    />
    <ellipse
      cx="258"
      cy="238"
      rx="24"
      ry="14"
      fill="#52b788"
      opacity="0.7"
      transform="rotate(35 258 238)"
    />
    
    {/* Mid-level leaves */}
    <ellipse
      cx="70"
      cy="200"
      rx="25"
      ry="16"
      fill="#40916c"
      opacity="0.92"
      transform="rotate(-28 70 200)"
    />
    <ellipse
      cx="230"
      cy="200"
      rx="25"
      ry="16"
      fill="#40916c"
      opacity="0.92"
      transform="rotate(28 230 200)"
    />
    
    {/* Upper leaves */}
    <ellipse
      cx="85"
      cy="150"
      rx="22"
      ry="14"
      fill="#52b788"
      opacity="0.9"
      transform="rotate(-40 85 150)"
    />
    <ellipse
      cx="215"
      cy="150"
      rx="22"
      ry="14"
      fill="#52b788"
      opacity="0.9"
      transform="rotate(40 215 150)"
    />
    
    {/* Top leaves - lighter green */}
    <ellipse
      cx="95"
      cy="100"
      rx="20"
      ry="13"
      fill="#74c69d"
      opacity="0.88"
      transform="rotate(-45 95 100)"
    />
    <ellipse
      cx="205"
      cy="100"
      rx="20"
      ry="13"
      fill="#74c69d"
      opacity="0.88"
      transform="rotate(45 205 100)"
    />
    
    {/* Top shoot - bright and fresh */}
    <circle cx="150" cy="80" r="8" fill="#a7e957" opacity="0.9" />
    <ellipse cx="150" cy="65" rx="6" ry="10" fill="#d8f3dc" opacity="0.85" />
    
    {/* Highlight/glow on stems */}
    <path
      d="M 150 450 Q 145 380 148 300 Q 150 200 152 100"
      stroke="rgba(160, 255, 200, 0.15)"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

// Master Error Boundary - Catches ALL errors
class MasterErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    console.error('Master Error Boundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Master Error Boundary details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #0a1929 0%, #1a5f4a 50%, #0d4a6b 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
            🌾 Smart Farm Simulator
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center', opacity: 0.8 }}>
            AI-Powered Agricultural Intelligence
          </p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>⚠️ Something went wrong</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              The homepage failed to render correctly, but the rest of the app is still available.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#4ade80',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                🔄 Reload Page
              </button>
              <button
                onClick={() => this.props.navigate('/dashboard')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                📊 Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function LandingPage() {
  const navigate = useNavigate();

  return (
    <MasterErrorBoundary navigate={navigate}>
      <div className="landing-container">
        {/* Animated background layers */}
        <div className="bg-gradient" />
        <div className="bg-glow-left" />
        <div className="bg-glow-right" />
        <div className="bg-grid" />
        
        {/* Floating particles background */}
        <div className="particles-bg">
          {floatingDots.map((dot) => (
            <div
              key={dot.id}
              className="particle"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                animationDelay: `${dot.delay}s`,
                animationDuration: `${dot.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Plant spotlight glow */}
        <div className="plant-spotlight" />
        <div className="plant-glow" />

        {/* Main content layout */}
        <div className="hero">
          {/* Left side - Text content */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <p className="eyebrow">Next-Generation Agricultural AI</p>
            <h1 className="main-title">
              AI <br/>
              SMART <br/>
              FARM <br/>
              SIMULATOR
            </h1>
            <p className="subtitle">
              Design, optimize, and scale sustainable farms with generative AI insights, real-time crop modeling, and precision analytics.
            </p>

            <div className="buttons">
              <motion.button
                className="btn btn-primary dashboard-btn"
                onClick={() => navigate('/dashboard')}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(96, 242, 176, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                📊 Dashboard
              </motion.button>
              <motion.button
                className="btn btn-secondary sim-btn"
                onClick={() => navigate('/simulation')}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(34, 211, 238, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                🧪 Simulation
              </motion.button>
            </div>
          </motion.div>

          {/* Right side - Plant visual */}
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          >
            <div className="plant-container">
              <img src="/leaf.svg" alt="leaf" />
            </div>
          </motion.div>
        </div>
      </div>
    </MasterErrorBoundary>
  );
}

export default LandingPage;
