To start:

- go mod tidy
- go run github.com/99designs/gqlgen (optional)
- go run server.go


Implementation
- Query -> loads initial state
- Mutation -> updates state + triggers broadcast to subscribers
- Subscription -> real-time updates to all clients

- Query endpoint: getLastPing
- Mutation endpoint: sendPing
- Subscription endpoint: livePing
- WebSocket support with CORS configured
