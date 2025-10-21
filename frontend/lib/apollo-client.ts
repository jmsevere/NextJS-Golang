//import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
});

const wsLink = typeof window !== 'undefined' 
  ? new GraphQLWsLink(
      createClient({
        url: 'ws://localhost:8080/graphql',
      })
    )
  : null;

// Comment out this function since standalone split() is deprecated
// const splitLink = typeof window !== 'undefined' && wsLink
//   ? split(
//       ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//           definition.kind === 'OperationDefinition' &&
//           definition.operation === 'subscription'
//         );
//       },
//       wsLink,
//       httpLink
//     )
//   : httpLink;

// Using ApolloLink.split instead of split()
const splitLink =
  typeof window !== 'undefined' && wsLink
    ? ApolloLink.split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
