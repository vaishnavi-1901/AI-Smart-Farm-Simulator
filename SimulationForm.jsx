import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SimulationForm.css';

// Form options
const cropOptions = [
  { value: 'wheat', label: 'Wheat' },
  { value: 'rice', label: 'Rice' },
  { value: 'corn', label: 'Corn' },
  { value: 'cotton', label: 'Cotton' },
  { value: 'soybean', label: 'Soybean' },
  { value: 'tomato', label: 'Tomato' }
];

const irrigationOptions = [
  { value: 'drip', label: 'Drip Irrigation' },
  { value: 'sprinkler', label: 'Sprinkler Irrigation' },
  { value: 'flood', label: 'Flood Irrigation' },
  { value: 'rainfed', label: 'Rainfed' }
];

const fertilizerOptions = [
  { value: 'organic', label: 'Organic Fertilizer' },
  { value: 'chemical', label: 'Chemical Fertilizer' },
  { value: 'mixed', label: 'Mixed (Organic + Chemical)' },
  { value: 'none', label: 'No Fertilizer' }
];

const farmingMethodOptions = [
  { value: 'traditional', label: 'Traditional Farming' },
  { value: 'modern', label: 'Modern Farming' },
  { value: 'organic', label: 'Organic Farming' },
  { value: 'hydroponic', label: 'Hydroponic Farming' },
  { value: 'precision', label: 'Precision Farming' }
];

const SimulationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    crop: '',
    irrigation: '',
    fertilizer: '',
    farmingMethod: '',
    landArea: '',
    budget: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.crop || !formData.irrigation || !formData.fertilizer ||
        !formData.farmingMethod || !formData.landArea || !formData.budget) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    const requestBody = {
      crop: formData.crop,
      irrigation: formData.irrigation,
      fertilizer: formData.fertilizer,
      method: formData.farmingMethod,
      land: parseFloat(formData.landArea),
      budget: parseFloat(formData.budget)
    };

    try {
      console.log('🚀 Starting simulation with data:', requestBody);
      console.log('📡 Making API call to: http://localhost:4000/api/simulation');

      const response = await fetch('http://localhost:4000/api/simulation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📡 API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Backend error response:', errorText);
        throw new Error(`Simulation API failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Simulation result received:', result);

      navigate('/simulation/results', {
        state: {
          results: result,
          formData: formData
        }
      });
    } catch (err) {
      console.error('❌ Simulation error:', err);
      setError('Backend not connected');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="simulation-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.header
        className="simulation-header"
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
            <h1>🌾 Smart Farm Simulation</h1>
            <p>Configure your farming parameters and run AI-powered crop simulation</p>
          </motion.div>
          <motion.div
            className="header-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              className="nav-button secondary"
              onClick={() => navigate('/dashboard')}
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              📊 Dashboard
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

      <div className="simulation-content">
        {/* Form */}
        <motion.form
          className="simulation-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <div className="form-grid">
            {/* Crop Selection */}
            <div className="form-group">
              <label htmlFor="crop" className="form-label">
                🌾 Crop Selection
              </label>
              <select
                id="crop"
                name="crop"
                value={formData.crop}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select a crop</option>
                {cropOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Irrigation Type */}
            <div className="form-group">
              <label htmlFor="irrigation" className="form-label">
                💧 Irrigation Type
              </label>
              <select
                id="irrigation"
                name="irrigation"
                value={formData.irrigation}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select irrigation type</option>
                {irrigationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Fertilizer Usage */}
            <div className="form-group">
              <label htmlFor="fertilizer" className="form-label">
                🌱 Fertilizer Usage
              </label>
              <select
                id="fertilizer"
                name="fertilizer"
                value={formData.fertilizer}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select fertilizer type</option>
                {fertilizerOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Farming Method */}
            <div className="form-group">
              <label htmlFor="farmingMethod" className="form-label">
                🚜 Farming Method
              </label>
              <select
                id="farmingMethod"
                name="farmingMethod"
                value={formData.farmingMethod}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select farming method</option>
                {farmingMethodOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Land Area */}
            <div className="form-group">
              <label htmlFor="landArea" className="form-label">
                📏 Land Area (acres)
              </label>
              <input
                type="number"
                id="landArea"
                name="landArea"
                value={formData.landArea}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter land area"
                min="0.1"
                step="0.1"
                required
              />
            </div>

            {/* Budget */}
            <div className="form-group">
              <label htmlFor="budget" className="form-label">
                💰 Budget (₹)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter budget amount"
                min="1000"
                step="1000"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="simulation-button"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Running Simulation...
              </>
            ) : (
              <>
                ▶️ Run Simulation
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Error Display */}
        {error && (
          <motion.div
            className="error-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="error-content">
              <span className="error-icon">⚠️</span>
              <div>
                <p className="error-title">Simulation Error</p>
                <p className="error-message">{error}</p>
                <p className="error-note">Make sure your Node.js backend is running on port 4000</p>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Background Elements */}
      <div className="form-bg">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="form-decoration decoration-1"></div>
        <div className="form-decoration decoration-2"></div>
      </div>
    </motion.div>
  );
};

export default SimulationForm;