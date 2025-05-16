const NodeCache = require('memory-cache');
const cache = new NodeCache.Cache();

// Set cache with timeout (in seconds)
const set = (key, value, ttl = 3600) => {
    cache.put(key, value, ttl * 1000); // Convert to milliseconds
};

// Get cached value
const get = (key) => {
    return cache.get(key);
};

// Delete cached value
const del = (key) => {
    cache.del(key);
};

// Clear entire cache
const flush = () => {
    cache.clear();
};

// Get cache statistics (useful for debugging)
const stats = () => {
    return {
        size: cache.size(),
        keys: cache.keys(),
        hits: cache.hits,
        misses: cache.misses
    };
};

module.exports = {
    set,
    get,
    del,
    flush,
    stats
};