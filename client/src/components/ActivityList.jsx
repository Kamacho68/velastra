import React from "react";
import WeatherCard from "./WeatherCard";
import { FiCalendar, FiMapPin, FiAlertTriangle } from "react-icons/fi";
import "../styles/activity-list.css";

const ActivityList = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="no-results">
        <FiAlertTriangle className="warning-icon" />
        <h3>No recommendations found</h3>
        <p>Try searching for a different location</p>
      </div>
    );
  }

  return (
    <div className="activity-list-container">
      <div className="section-header">
        <FiCalendar className="section-icon" />
        <h2>7-Day Activity Forecast</h2>
      </div>
      <div className="weather-cards-grid">
        {recommendations.map((day, index) => (
          <WeatherCard key={`${day.date}-${index}`} day={day} />
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
