import React from "react";
import { format } from "date-fns";
import {
  FiSun,
  FiCloud,
  FiCloudSnow,
  FiCloudRain,
  FiUmbrella,
  FiWind,
  FiCoffee,
  FiCamera,
} from "react-icons/fi";
import "../styles/weather-card.css";

const activityIcons = {
  Skiing: <FiCloudSnow />,
  Surfing: <FiWind />,
  "Outdoor Sightseeing": <FiCamera />,
  "Indoor Sightseeing": <FiCoffee />,
};

const WeatherCard = ({ day }) => {
  const formattedDate = format(new Date(day.date), "EEEE, MMMM do");

  const getWeatherIcon = (activities) => {
    const topActivity = activities[0]?.name;
    if (topActivity.includes("Skiing")) return <FiCloudSnow />;
    if (topActivity.includes("Surfing")) return <FiWind />;
    if (topActivity.includes("Outdoor")) return <FiSun />;
    return <FiCloud />;
  };

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        {getWeatherIcon(day.activities)}
        <h3>{formattedDate}</h3>
      </div>
      <div className="activities-list">
        {day.activities.map((activity) => (
          <div
            key={activity.name}
            className={`activity-item ${getScoreClass(activity.score)}`}
          >
            <div className="activity-icon">
              {activityIcons[activity.name] || <FiSun />}
            </div>
            <div className="activity-content">
              <div className="activity-header">
                <span className="activity-name">{activity.name}</span>
                <span className="activity-score">
                  {Math.round(activity.score)}%
                </span>
              </div>
              <div className="activity-description">{activity.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getScoreClass = (score) => {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "fair";
  return "poor";
};

export default WeatherCard;
