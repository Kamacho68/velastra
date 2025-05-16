const weatherService = require('../services/weatherService');

module.exports = {
    getActivityRecommendations: async ({ location }) => {
        console.log(`[${new Date().toISOString()}] Request for: ${location}`);
        try {
            const forecast = await weatherService.getWeeklyForecast(location);
            const scored = weatherService.scoreActivities(forecast);
            console.log('Successfully processed:', { location, days: scored.length });
            return scored;
        } catch (error) {
            console.error('FULL ERROR:', {
                message: error.message,
                stack: error.stack,
                location
            });
            throw new Error(`Could not get recommendations: ${error.message}`);
        }
    }
};
