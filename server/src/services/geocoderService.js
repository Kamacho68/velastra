const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'openstreetmap'
};

const geocoder = NodeGeocoder(options);

module.exports = {
    geocode: async (location) => {
        try {
            const res = await geocoder.geocode(location);
            if (!res || res.length === 0) {
                throw new Error('Location not found');
            }
            return {
                lat: res[0].latitude,
                lng: res[0].longitude,
                city: res[0].city || location // Fallback to input if city not available
            };
        } catch (error) {
            console.error('Geocoding error:', error);
            throw new Error(`Geocoding failed: ${error.message}`);
        }
    }
};