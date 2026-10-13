// Sharing memory safely between goroutines.
//
//		go run ./16_concurrency/h_mutex_and_atomic
//		go run -race ./16_concurrency/h_mutex_and_atomic   <- the race detector reports the bug
//
//	  - a DATA RACE happens when goroutines access the same variable at once and one writes
//	  - sync.Mutex     only one goroutine at a time inside Lock/Unlock
//	  - sync.RWMutex   many readers OR one writer
//	  - sync/atomic    lock-free counters and flags
//	  - sync.Once / sync.OnceValue   run initialisation exactly once
package main

import (
	"fmt"
	"sync"
	"sync/atomic"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

func raceCondition() {
	count := 0
	var wg sync.WaitGroup
	for range 1000 {
		wg.Go(func() { count++ }) // read, add, write: two goroutines can interleave
	}
	wg.Wait()
	fmt.Println("unsafe count:", count, "(expected 1000; often less)")
}

func mutex() {
	var (
		mu    sync.Mutex
		count int
		wg    sync.WaitGroup
	)
	for range 1000 {
		wg.Go(func() {
			mu.Lock()
			defer mu.Unlock()
			count++
		})
	}
	wg.Wait()
	fmt.Println("mutex count:", count) // 1000
}

type SafeCache struct {
	mu   sync.RWMutex
	data map[string]string
}

func (c *SafeCache) Get(k string) (string, bool) {
	c.mu.RLock() // many readers may hold RLock together
	defer c.mu.RUnlock()
	v, ok := c.data[k]
	return v, ok
}

func (c *SafeCache) Set(k, v string) {
	c.mu.Lock() // a writer gets exclusive access
	defer c.mu.Unlock()
	c.data[k] = v
}

func rwMutex() {
	cache := &SafeCache{data: map[string]string{}}
	var wg sync.WaitGroup
	for i := range 10 {
		wg.Go(func() { cache.Set(fmt.Sprint("k", i), fmt.Sprint("v", i)) })
	}
	wg.Wait()
	v, _ := cache.Get("k7")
	fmt.Println("cache k7 =", v) // v7
}

func atomicCounter() {
	var hits atomic.Int64
	var wg sync.WaitGroup
	for range 1000 {
		wg.Go(func() { hits.Add(1) })
	}
	wg.Wait()
	fmt.Println("atomic count:", hits.Load()) // 1000

	var ready atomic.Bool
	fmt.Println(ready.CompareAndSwap(false, true), ready.CompareAndSwap(false, true)) // true false
}

func once() {
	loadConfig := sync.OnceValue(func() map[string]string {
		fmt.Println("loading config (only once)")
		return map[string]string{"env": "prod"}
	})
	var wg sync.WaitGroup
	for range 3 {
		wg.Go(func() { _ = loadConfig() })
	}
	wg.Wait()
	fmt.Println(loadConfig()["env"]) // prod
}

func main() {
	examples.Run([]examples.Example{
		{Name: "race condition", Run: raceCondition},
		{Name: "sync.Mutex", Run: mutex},
		{Name: "sync.RWMutex", Run: rwMutex},
		{Name: "atomic", Run: atomicCounter},
		{Name: "sync.OnceValue", Run: once},
	})
}
