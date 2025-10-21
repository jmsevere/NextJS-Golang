package graph

import (
	"fmt"
	"sync"
	"time"
)

type SubscriptionManager[T any] struct {
	mu          sync.Mutex
	Subscribers map[string]chan T
}

func newSubscriptionManager[T any]() *SubscriptionManager[T] {
	return &SubscriptionManager[T]{
		Subscribers: make(map[string]chan T),
	}
}

func (sm *SubscriptionManager[T]) registerSubscriber() (string, chan T) {
	ch := make(chan T)
	id := fmt.Sprintf("%d", time.Now().UnixNano())

	sm.mu.Lock()
	sm.Subscribers[id] = ch
	sm.mu.Unlock()

	return id, ch
}

func (sm *SubscriptionManager[T]) unregisterSubscriber(id string, ch chan T) {
	sm.mu.Lock()
	delete(sm.Subscribers, id)
	sm.mu.Unlock()

	close(ch)
}

func (sm *SubscriptionManager[T]) notifySubscribers(data T) {
	sm.mu.Lock()
	defer sm.mu.Unlock()

	for _, ch := range sm.Subscribers {
		select {
		case ch <- data:
		default:
		}
	}
}