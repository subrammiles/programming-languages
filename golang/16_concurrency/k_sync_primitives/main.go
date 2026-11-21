// More sync tools: semaphores, error groups, sync.Cond, sync.Pool, sync.Map
//
//	go run ./16_concurrency/k_sync_primitives
//
// Mutex, RWMutex, atomic and OnceValue are in h_mutex_and_atomic.
package main

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"sync"
	"sync/atomic"
	"time"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

// Semaphore: a buffered channel with N slots limits how many goroutines run a section at once.
// (golang.org/x/sync/semaphore offers a weighted version.)
func semaphore() {
	sem := make(chan struct{}, 2) // at most 2 at a time
	var running, maxRunning atomic.Int32
	var wg sync.WaitGroup
	for i := 1; i <= 6; i++ {
		wg.Go(func() {
			sem <- struct{}{}        // acquire a slot (blocks when full)
			defer func() { <-sem }() // release it
			now := running.Add(1)
			for {
				old := maxRunning.Load()
				if now <= old || maxRunning.CompareAndSwap(old, now) {
					break
				}
			}
			time.Sleep(20 * time.Millisecond)
			running.Add(-1)
		})
	}
	wg.Wait()
	fmt.Println("most goroutines running at once:", maxRunning.Load()) // most goroutines running at once: 2
}

// Error group: run tasks concurrently, stop the rest on the first error, return the error.
// This is what golang.org/x/sync/errgroup does; here it is with the standard library only.
type group struct {
	wg     sync.WaitGroup
	once   sync.Once
	err    error
	cancel context.CancelFunc
}

func withContext(ctx context.Context) (*group, context.Context) {
	ctx, cancel := context.WithCancel(ctx)
	return &group{cancel: cancel}, ctx
}

func (g *group) Go(f func() error) {
	g.wg.Go(func() {
		if err := f(); err != nil {
			g.once.Do(func() { // keep only the first error
				g.err = err
				g.cancel() // tell the other tasks to stop
			})
		}
	})
}

func (g *group) Wait() error {
	g.wg.Wait()
	g.cancel()
	return g.err
}

func errorGroup() {
	g, ctx := withContext(context.Background())
	for _, name := range []string{"users", "orders", "broken", "stock"} {
		g.Go(func() error {
			if name == "broken" {
				time.Sleep(10 * time.Millisecond)
				return fmt.Errorf("loading %s failed", name)
			}
			select {
			case <-time.After(100 * time.Millisecond): // slow work
				fmt.Println("loaded", name)
				return nil
			case <-ctx.Done(): // cancelled because another task failed
				return ctx.Err()
			}
		})
	}
	fmt.Println("error:", g.Wait()) // error: loading broken failed   (and nothing else was "loaded")

	// To collect ALL errors instead of the first, gather them and use errors.Join
	errs := []error{errors.New("a failed"), nil, errors.New("c failed")}
	fmt.Println(errors.Join(errs...)) // a failed
	//                                   c failed
}

// sync.Cond: goroutines wait until some condition becomes true, then get woken up.
// Channels are usually simpler; Cond fits "many waiters, one shared state".
func condition() {
	var mu sync.Mutex
	cond := sync.NewCond(&mu)
	ready := false
	var wg sync.WaitGroup

	for i := 1; i <= 3; i++ {
		wg.Go(func() {
			mu.Lock()
			for !ready { // always re-check the condition in a loop
				cond.Wait() // unlocks mu while waiting, locks it again when woken
			}
			mu.Unlock()
		})
	}

	time.Sleep(10 * time.Millisecond)
	mu.Lock()
	ready = true
	mu.Unlock()
	cond.Broadcast() // wake ALL waiters (Signal wakes one)
	wg.Wait()
	fmt.Println("all 3 waiters released") // all 3 waiters released
}

// sync.Pool: reuse temporary objects to reduce garbage collection work.
// Items can be dropped by the GC at any time, so never store state you need to keep.
var bufferPool = sync.Pool{
	New: func() any { return new(bytes.Buffer) },
}

func pool() {
	render := func(name string) string {
		buf := bufferPool.Get().(*bytes.Buffer)
		defer func() {
			buf.Reset() // clean it before putting it back
			bufferPool.Put(buf)
		}()
		fmt.Fprintf(buf, "<h1>Hello, %s</h1>", name)
		return buf.String()
	}
	fmt.Println(render("Ann")) // <h1>Hello, Ann</h1>
	fmt.Println(render("Bo"))  // <h1>Hello, Bo</h1>
}

// sync.Map: a map safe for concurrent use without your own mutex.
// Best when keys are written once and read many times, or goroutines use disjoint keys.
// Otherwise a normal map + sync.RWMutex is usually faster and type-safe.
func syncMap() {
	var cache sync.Map
	var wg sync.WaitGroup
	for i := range 5 {
		wg.Go(func() { cache.Store(i, i*i) })
	}
	wg.Wait()

	v, ok := cache.Load(3)
	fmt.Println(v, ok) // 9 true
	actual, loaded := cache.LoadOrStore(3, 999)
	fmt.Println(actual, loaded) // 9 true   (existing value kept)

	count := 0
	cache.Range(func(key, value any) bool {
		count++
		return true // keep going
	})
	fmt.Println("entries:", count) // entries: 5
}

func main() {
	examples.Run([]examples.Example{
		{Name: "semaphore with a buffered channel", Run: semaphore},
		{Name: "error group (first error cancels the rest)", Run: errorGroup},
		{Name: "sync.Cond", Run: condition},
		{Name: "sync.Pool", Run: pool},
		{Name: "sync.Map", Run: syncMap},
	})
}
