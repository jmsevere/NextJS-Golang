'use client';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/lib/apollo-client';
import PingDisplay from '@/components/PingDisplay';

export default function Home() {
  return (
    <ApolloProvider client={apolloClient}>
      <PingDisplay />
    </ApolloProvider>
  );
}
