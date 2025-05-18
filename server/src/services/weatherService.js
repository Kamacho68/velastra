const axios = require('axios');
const cache = require('../utils/cache');
const { scoreSkiing, scoreSurfing, scoreOutdoor, scoreIndoor } = require('./scoring');
const geocoder = require('./geocoderService');

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';

const getWeeklyForecast = async (location) => {
    // Verify URL is properly formed
    if (!OPEN_METEO_URL || typeof OPEN_METEO_URL !== 'string') {
        throw new Error('Weather API URL is not properly configured');
    }

    const cacheKey = `forecast-${location}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    try {
        let coords;
        try {
            // Geocode the location first
            coords = await geocoder.geocode(location);
        } catch (geocodeError) {
            console.warn('Using fallback coordinates for London');
            coords = { lat: 51.5074, lng: -0.1278 }; // London fallback
        }

        // geocode the location first
        const params = {
            latitude: coords.lat,
            longitude: coords.lng,
            daily: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_sum', 'snowfall_sum', 'windspeed_10m_max'],
            timezone: 'auto'
        };

        const response = await axios.get(OPEN_METEO_URL, { params });
        cache.set(cacheKey, response.data.daily, 3600); // Cache for 1 hour
        return response.data.daily;
    } catch (error) {
        console.error('Forecast error:', error);
        throw error;
    }
};

const scoreActivities = (dailyData) => {
    return dailyData.time.map((date, index) => ({
        date,
        activities: [
            scoreSkiing(dailyData, index),
            scoreSurfing(dailyData, index),
            scoreOutdoor(dailyData, index),
            scoreIndoor(dailyData, index)
        ].sort((a, b) => b.score - a.score)
    }));
};

module.exports = { getWeeklyForecast, scoreActivities };
