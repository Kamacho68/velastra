const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const typeDefs = require('./schema/typeDefs');
const activityResolvers = require('./resolvers/activityResolvers');
const helmet = require('helmet');

const app = express();
app.use(cors());

app.use(helmet()); // Adds security headers

const schema = buildSchema(typeDefs);

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

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Velastra Backend');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
