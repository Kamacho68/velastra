require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const typeDefs = require('./schema/typeDefs');
const activityResolvers = require('./resolvers/activityResolvers');

const app = express();

// Middleware updates
app.use(cors());
// Enable CORS
// app.use(cors({
//     origin: 'https://d2aklctv29jylh.cloudfront.net',
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.options('*', cors()); // Preflight support
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Build GraphQL Schema
const schema = buildSchema(typeDefs);

// GraphQL Endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: activityResolvers,
    graphiql: true,
    customFormatErrorFn: (err) => {
        console.error('GraphQL Error:', err);
        return {
            message: err.message || 'An unexpected error occurred.',
            locations: err.locations,
            path: err.path
        };
    }
}));

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Welcome Route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to Velastra Backend');
});

// Handle Unknown Routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 4000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}


// Export the app for Lambda compatibility
module.exports = app;
