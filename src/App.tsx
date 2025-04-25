import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import CryptoTable from './components/CryptoTable';
import { useCryptoWebSocket } from './hooks/useCryptoWebSocket';
import { selectLoading, selectError, selectTopGainers, selectTopLosers } from './store/selectors';

/**
 * Main application component
 */
function App() {
  // Local state for filter/sort options - using a more reasonable 5-second default
  const [updateInterval, setUpdateInterval] = useState(5000);
  const [isPaused, setIsPaused] = useState(false);
  
  // Connect to the WebSocket for real-time updates with more reasonable default
  const { reconnect, disconnect } = useCryptoWebSocket(updateInterval);
  
  // Get state from Redux
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const topGainers = useSelector(selectTopGainers);
  const topLosers = useSelector(selectTopLosers);
  
  // Handle pause/resume updates
  const handlePauseToggle = () => {
    if (isPaused) {
      reconnect();
    } else {
      disconnect();
    }
    setIsPaused(!isPaused);
  };
  
  // Handle update interval change
  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newInterval = parseInt(e.target.value, 10);
    setUpdateInterval(newInterval);
    
    // Reconnect with new interval if not paused
    if (!isPaused) {
      reconnect();
    }
  };
  
  return (
    <div className="crypto-app">
      <header className="app-header">
        <h1>Crypto Price Tracker</h1>
        <p>Real-time cryptocurrency price updates</p>
      </header>
      
      <div className="controls-section">
        <div className="control-group">
          <label htmlFor="update-interval">Update Interval:</label>
          <select 
            id="update-interval" 
            value={updateInterval} 
            onChange={handleIntervalChange}
            className="interval-select"
          >
            <option value="3000">3 seconds</option>
            <option value="5000">5 seconds</option>
            <option value="10000">10 seconds</option>
            <option value="30000">30 seconds</option>
          </select>
        </div>
        
        <button 
          className={`control-button ${isPaused ? 'resume' : 'pause'}`}
          onClick={handlePauseToggle}
        >
          {isPaused ? 'Resume Updates' : 'Pause Updates'}
        </button>
        
        {loading && <div className="loading-indicator">Updating...</div>}
      </div>
      
      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}
      
      <div className="stats-section">
        <div className="stat-card">
          <h3>Top Gainers (24h)</h3>
          <ul className="stats-list">
            {topGainers.slice(0, 3).map(asset => (
              <li key={asset.id} className="stat-item">
                <span className="stat-name">{asset.name}</span>
                <span className="stat-value price-change green">+{asset.priceChange24h.toFixed(2)}%</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="stat-card">
          <h3>Top Losers (24h)</h3>
          <ul className="stats-list">
            {topLosers.slice(0, 3).map(asset => (
              <li key={asset.id} className="stat-item">
                <span className="stat-name">{asset.name}</span>
                <span className="stat-value price-change red">{asset.priceChange24h.toFixed(2)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <main className="main-content">
        <CryptoTable />
      </main>
      
      <footer className="app-footer">
        <p>Data updates simulated using WebSocket mock. <span className="data-source-note">All price data is simulated for educational purposes.</span></p>
        <p>© {new Date().getFullYear()} Crypto Price Tracker</p>
      </footer>
    </div>
  );
}

export default App;
