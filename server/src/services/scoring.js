// Helper function to normalize scores between 0-100
const normalizeScore = (value, min, max) => {
    return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
};

// SKIING: Best with cold temps and snowfall
const scoreSkiing = (data, dayIndex) => {
    const tempMax = data.temperature_2m_max[dayIndex];
    const snowfall = data.snowfall_sum[dayIndex];
    const windSpeed = data.windspeed_10m_max[dayIndex];

    let score = 0;

    // Temperature scoring (colder is better)
    if (tempMax < 0) score += 50;
    else if (tempMax < 5) score += 30;

    // Snowfall scoring
    if (snowfall > 10) score += 40;
    else if (snowfall > 5) score += 25;
    else if (snowfall > 1) score += 10;

    // Wind penalty
    if (windSpeed > 30) score -= 30;
    else if (windSpeed > 20) score -= 15;

    return {
        name: 'Skiing',
        score: Math.min(100, Math.max(0, score)),
        description: getSkiingDescription(score)
    };
};

const getSkiingDescription = (score) => {
    if (score >= 80) return 'Perfect skiing conditions with fresh snow and cold temperatures';
    if (score >= 60) return 'Great day for skiing with good snow conditions';
    if (score >= 40) return 'Fair skiing conditions - snow may be limited';
    return 'Not ideal for skiing - conditions poor';
};

// SURFING: Best with moderate winds and no precipitation
const scoreSurfing = (data, dayIndex) => {
    const windSpeed = data.windspeed_10m_max[dayIndex];
    const precipitation = data.precipitation_sum[dayIndex];
    const tempMin = data.temperature_2m_min[dayIndex];

    let score = 0;

    // Wind scoring (moderate winds are best)
    if (windSpeed >= 15 && windSpeed <= 25) score += 60;
    else if (windSpeed >= 10 && windSpeed <= 30) score += 40;
    else if (windSpeed > 5) score += 20;

    // Precipitation penalty
    if (precipitation > 5) score -= 30;
    else if (precipitation > 2) score -= 15;

    // Temperature bonus (warmer is better)
    if (tempMin > 15) score += 20;

    return {
        name: 'Surfing',
        score: Math.min(100, Math.max(0, score)),
        description: getSurfingDescription(score)
    };
};

const getSurfingDescription = (score) => {
    if (score >= 75) return 'Excellent surf conditions with ideal winds';
    if (score >= 50) return 'Good day for surfing with decent waves';
    if (score >= 30) return 'Surfable but conditions not optimal';
    return 'Poor surf conditions today';
};

// OUTDOOR SIGHTSEEING: Best with mild temps and no precipitation
const scoreOutdoor = (data, dayIndex) => {
    const tempMax = data.temperature_2m_max[dayIndex];
    const tempMin = data.temperature_2m_min[dayIndex];
    const precipitation = data.precipitation_sum[dayIndex];
    const windSpeed = data.windspeed_10m_max[dayIndex];

    let score = 100; // Start high and deduct for bad conditions

    // Temperature scoring (15-25°C is ideal)
    if (tempMax < 0 || tempMax > 35) score -= 40;
    else if (tempMax < 10 || tempMax > 30) score -= 20;
    else if (tempMax >= 15 && tempMax <= 25) score += 10;

    // Precipitation penalty
    if (precipitation > 5) score -= 50;
    else if (precipitation > 2) score -= 30;
    else if (precipitation > 0.5) score -= 15;

    // Wind penalty
    if (windSpeed > 20) score -= 20;
    else if (windSpeed > 10) score -= 10;

    return {
        name: 'Outdoor Sightseeing',
        score: Math.min(100, Math.max(0, score)),
        description: getOutdoorDescription(score)
    };
};

const getOutdoorDescription = (score) => {
    if (score >= 80) return 'Perfect day for outdoor activities';
    if (score >= 60) return 'Great weather for sightseeing';
    if (score >= 40) return 'Decent conditions with some drawbacks';
    return 'Poor conditions for outdoor activities';
};

// INDOOR SIGHTSEEING: Recommended when outdoor is bad
const scoreIndoor = (data, dayIndex) => {
    // Base indoor score on inverse of outdoor score
    const outdoorScore = scoreOutdoor(data, dayIndex).score;
    let score = 100 - outdoorScore;

    // Boost score if there's significant precipitation
    if (data.precipitation_sum[dayIndex] > 5) score += 30;
    else if (data.precipitation_sum[dayIndex] > 2) score += 15;

    // Boost score if extreme temperatures
    if (data.temperature_2m_max[dayIndex] > 30 ||
        data.temperature_2m_min[dayIndex] < 0) {
        score += 20;
    }

    return {
        name: 'Indoor Sightseeing',
        score: Math.min(100, Math.max(0, score)),
        description: getIndoorDescription(score)
    };
};

const getIndoorDescription = (score) => {
    if (score >= 70) return 'Ideal day for museums and indoor activities';
    if (score >= 50) return 'Good opportunity for indoor sightseeing';
    if (score >= 30) return 'Consider indoor alternatives';
    return 'Outdoor activities preferred';
};

module.exports = { scoreSkiing, scoreSurfing, scoreOutdoor, scoreIndoor };