# Live Ping Monitor - Next.js + Go GraphQL

A full-stack application demonstrating real-time GraphQL subscriptions with Next.js 15 and Go (gqlgen).

## Features

- **GraphQL Query**: Fetches the last ping timestamp on page load
- **GraphQL Mutation**: Sends ping with random intervals (1-3 seconds)
- **GraphQL Subscription**: Real-time updates via WebSocket when pings occur
- **Multi-tab Support**: Each tab independently sends pings, all tabs receive updates

## Tech Stack

### Backend
- Go with gqlgen for GraphQL server
- WebSocket support for subscriptions
- CORS configured for frontend



## Getting Started

### Prerequisites
- Go 1.21+
- Node.js 18+
- npm

### Backend Setup

```bash
cd backend
go mod download
go run server.go
```

The GraphQL server will start at http://localhost:8080
GraphQL Playground available at http://localhost:8080/


## GraphQL Schema

```graphql
type Ping {
  id: ID!
  timestamp: Time
}

type Query {
  getLastPing: Ping
}

type Mutation {
  sendPing(input: NewPing!): Ping!
}

type Subscription {
  livePing: Ping
}
```

## Architecture

- Backend uses a simple in-memory state for the last ping timestamp
- Subscription manager broadcasts updates to all connected WebSocket clients

