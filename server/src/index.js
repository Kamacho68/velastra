const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const typeDefs = require('./schema/typeDefs');
const activityResolvers = require('./resolvers/activityResolvers');

const app = express();
app.use(cors());

const schema = buildSchema(typeDefs);

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: activityResolvers,
    graphiql: true,
    customFormatErrorFn: (err) => {
        console.error('GraphQL Error:', err);
        return {
            message: err.message,
            locations: err.locations,
            path: err.path
        };
    }
}));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
