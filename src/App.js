// index.js
// This is the main entry point of our application

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import GlobalStyle from '/components/GlobalStyles';
import Pages from '/pages';
import { setContext } from 'apollo-link-context';

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
    return {
    headers: {
    ...headers,
    authorization: localStorage.getItem('token') || ''
    }
    };
    });

// configure Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
    });

// check for a local token
const data = {
    isLoggedIn: !!localStorage.getItem('token')
    };
    // write the cache data on initial load
    cache.writeData({ data });
    // write the cache data after cache is reset
    client.onResetStore(() => cache.writeData({ data }));

const App = () => {
return (
<div>
<ApolloProvider client={client}>
    <GlobalStyle />
<Pages />
</ApolloProvider>
</div>
);
};

ReactDOM.render(<App />, document.getElementById('root'));
