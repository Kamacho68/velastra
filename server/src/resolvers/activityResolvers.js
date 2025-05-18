const weatherService = require('../services/weatherService');
const Joi = require('joi');

// Custom Error Class for Better Debugging
class RecommendationError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.name = 'RecommendationError';
        this.details = details;
        this.timestamp = new Date().toISOString();
    }
}

// Validate Input
const validateLocation = (location) => {
    const schema = Joi.string().required();
    const { error } = schema.validate(location);
    if (error) throw new RecommendationError('Invalid location format', { location });
};

// Timeout Wrapper
const withTimeout = (promise, ms) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), ms))
    ]);
};

module.exports = {
    getActivityRecommendations: async ({ location }) => {
        console.log(`[${new Date().toISOString()}] Incoming request for location: ${location}`);
        try {
            // Validate input
            validateLocation(location);

            // Fetch and process weather data
            const forecast = await withTimeout(weatherService.getWeeklyForecast(location), 5000);
            const scoredActivities = weatherService.scoreActivities(forecast);

            console.log(`[${new Date().toISOString()}] Successfully processed:`, {
                location,
                days: scoredActivities.length
            });

            return scoredActivities;
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error occurred:`, {
                message: error.message,
                stack: error.stack,
                location
            });

            // Wrap and throw custom error
            throw new RecommendationError('Could not get recommendations', {
                location,
                originalMessage: error.message
            });
        }
    }
};
