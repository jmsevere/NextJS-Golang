package graph

import (
	"example/graph/model"
	"time"
)

// lastPing as a variable is fine for this example, but in a real-world scenario, we should use redis
// given the nature of how often this would be updated and we can periodically write to db if we need
// a more permanent storage.
var lastPing *time.Time
var PingSubscription = newSubscriptionManager[*model.Ping]()
