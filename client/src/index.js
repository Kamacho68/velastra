import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

// Determine the GraphQL URI based on the environment: environment-based URI switching
const GRAPHQL_URI =
  process.env.NODE_ENV === 'production'
    ? 'http://valestra.eba-6pzgxuss.us-east-1.elasticbeanstalk.com/graphql'
    : 'http://localhost:4000/graphql';

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache()
});

// New React 18 way
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);