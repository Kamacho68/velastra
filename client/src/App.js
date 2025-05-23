// src/App.js
import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import SearchForm from './components/SearchForm';
import ActivityList from './components/ActivityList';
import { useActivities } from './hooks/useActivities';
import './styles/global.css';
import './App.css'

function App() {
  const {
    location,
    recommendations,
    loading, // This comes from useActivities
    error,
    fetchRecommendations
  } = useActivities();

  return (
    <main className="app">
      <header className="app-header">
        <h1>Perfect Day Planner</h1>
        <p className="app-subheading">
          Find the best activities based on weather forecasts for your destination
        </p>
      </header>

      <section className="search-section">
        <SearchForm fetchRecommendations={fetchRecommendations} isLoading={loading} />
      </section>

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading recommendations...</p>
        </div>
      )}

      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}

      {!recommendations && !loading && (
        <div className="instructions">
          <div className="instructions-icon" role="img" aria-label="weather icon">🌤️</div>
          <h2>Search for a location to start</h2>
          <p>
            Enter a city or town name to get activity rankings based on
            the weather forecast for the next 7 days.
          </p>
        </div>
      )}

      {recommendations && (
        <div className="results-header">
          <div className="location-title">
            <FiMapPin className="location-icon" />
            <h2>{location}</h2>
          </div>
          <p className="results-subtitle">7-Day Activity Rankings</p>
        </div>
      )}

      {recommendations && <ActivityList recommendations={recommendations} />}
    </main>
  );
}

export default App;