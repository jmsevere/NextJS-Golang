# Live Ping Monitor - Frontend

Next.js 15 frontend for a real-time ping monitoring application using GraphQL subscriptions.

## Overview

This application demonstrates real-time WebSocket communication between multiple browser tabs using GraphQL subscriptions. Each tab independently sends pings at random intervals (1-3 seconds), and all tabs receive live updates when any ping is sent.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **Apollo Client** - GraphQL client with subscription support
- **graphql-ws** - WebSocket client for GraphQL subscriptions
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page with ApolloProvider
├── components/
│   └── PingDisplay.tsx      # Main component with Query/Mutation/Subscription
├── lib/
│   ├── apollo-client.ts     # Apollo Client configuration with WebSocket
│   ├── graphql-operations.ts  # GraphQL queries, mutations, subscriptions
│   └── types.ts             # TypeScript types for GraphQL operations
```

## Features

### GraphQL Operations

**Query** - Fetches initial ping timestamp on page load:
```graphql
query GetLastPing {
  getLastPing {
    id
    timestamp
  }
}
```

**Mutation** - Sends ping with current timestamp:
```graphql
mutation SendPing($input: NewPing!) {
  sendPing(input: $input) {
    id
    timestamp
  }
}
```

**Subscription** - Receives real-time updates:
```graphql
subscription LivePing {
  livePing {
    id
    timestamp
  }
}
```

### Key Functionality

- **Initial Load**: Queries for last ping timestamp
- **Auto-Ping**: Each tab sends pings at random 1-3 second intervals
- **Real-Time Updates**: All tabs update instantly via WebSocket subscription
- **Multi-Tab Support**: Open multiple tabs to see synchronized updates

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Backend GraphQL server running at `http://localhost:8080`

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Configuration

### Apollo Client Setup

The Apollo Client is configured with a split link to handle both HTTP and WebSocket connections:

- **HTTP Link** - Used for queries and mutations
- **WebSocket Link** - Used for subscriptions
- **Backend URL**: `http://localhost:8080/graphql` (HTTP) and `ws://localhost:8080/graphql` (WebSocket)

### Environment Variables

To customize the backend URL, create a `.env.local` file:

```env
NEXT_PUBLIC_GRAPHQL_HTTP_URL=http://localhost:8080/graphql
NEXT_PUBLIC_GRAPHQL_WS_URL=ws://localhost:8080/graphql
```

## How It Works

1. **Page Load**: Component queries for the last ping timestamp
2. **Random Interval**: Each tab schedules pings at random 1-3 second intervals using `setTimeout`
3. **Mutation**: Ping mutation updates backend state and triggers subscription broadcast
4. **Subscription**: All connected clients receive the new timestamp via WebSocket
5. **UI Update**: Display updates with the latest timestamp

## Testing

### Multi-Tab Testing

1. Start the backend server (`cd ../backend && go run server.go`)
2. Start the frontend (`npm run dev`)
3. Open multiple browser tabs to `http://localhost:3000`
4. Watch all tabs receive updates when any tab sends a ping

### GraphQL Playground

Test backend operations at `http://localhost:8080/`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [GraphQL Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/)
- [graphql-ws](https://github.com/enisdenjo/graphql-ws)
