import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

// Use environment variable injected at build time for the URI
const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI;

console.log(`GRAPHQL_URI: ${GRAPHQL_URI}`);;

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