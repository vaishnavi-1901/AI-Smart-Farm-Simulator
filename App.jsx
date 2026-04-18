import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import Dashboard from './Dashboard.jsx';
import SimulationForm from './SimulationForm.jsx';
import SimulationResults from './SimulationResults.jsx';
import './App.css';

function RouteLogger() {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Current route:', location.pathname);
  }, [location.pathname]);
  
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RouteLogger />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/simulation" element={<SimulationForm />} />
        <Route path="/simulation/results" element={<SimulationResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
