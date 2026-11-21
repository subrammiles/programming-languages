// Rate limiting: control how often something happens (API calls, logins, emails).
//
//	go run ./16_concurrency/l_rate_limiting
//
// Real projects often use golang.org/x/time/rate (a token bucket).
package main

import (
	"fmt"
	"sync"
	"time"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

// 1. A ticker lets one request through per tick.
func tickerLimiter() {
	limiter := time.NewTicker(50 * time.Millisecond)
	defer limiter.Stop()

	start := time.Now()
	for i := 1; i <= 4; i++ {
		<-limiter.C // wait for the next tick
		fmt.Printf("request %d at ~%dms\n", i, time.Since(start).Round(50*time.Millisecond).Milliseconds())
	}
	// request 1 at ~50ms
	// request 2 at ~100ms
	// request 3 at ~150ms
	// request 4 at ~200ms
}

// 2. Bursty limiter: a buffered channel holds up to 3 "tokens", refilled by a ticker.
func burstyLimiter() {
	tokens := make(chan time.Time, 3)
	for range 3 {
		tokens <- time.Now() // start full: the first 3 requests go through at once
	}
	stop := make(chan struct{})
	go func() {
		ticker := time.NewTicker(50 * time.Millisecond)
		defer ticker.Stop()
		for {
			select {
			case t := <-ticker.C:
				select {
				case tokens <- t:
				default: // bucket full: drop the token
				}
			case <-stop:
				return
			}
		}
	}()
	defer close(stop)

	start := time.Now()
	for i := 1; i <= 5; i++ {
		<-tokens
		fmt.Printf("request %d at ~%dms\n", i, time.Since(start).Round(50*time.Millisecond).Milliseconds())
	}
	// request 1 at ~0ms
	// request 2 at ~0ms
	// request 3 at ~0ms
	// request 4 at ~50ms
	// request 5 at ~100ms
}

// 3. Token bucket without goroutines: compute how many tokens have refilled since last time.
type TokenBucket struct {
	mu       sync.Mutex
	capacity float64
	tokens   float64
	rate     float64 // tokens per second
	last     time.Time
}

func NewTokenBucket(capacity int, perSecond float64) *TokenBucket {
	return &TokenBucket{capacity: float64(capacity), tokens: float64(capacity), rate: perSecond, last: time.Now()}
}

// Allow reports whether a request may go now (it never waits).
func (b *TokenBucket) Allow() bool {
	b.mu.Lock()
	defer b.mu.Unlock()
	now := time.Now()
	b.tokens = min(b.capacity, b.tokens+now.Sub(b.last).Seconds()*b.rate)
	b.last = now
	if b.tokens >= 1 {
		b.tokens--
		return true
	}
	return false
}

func tokenBucket() {
	bucket := NewTokenBucket(3, 10) // burst of 3, then 10 per second
	allowed, rejected := 0, 0
	for range 10 { // 10 requests at once
		if bucket.Allow() {
			allowed++
		} else {
			rejected++
		}
	}
	fmt.Println("allowed:", allowed, "rejected:", rejected) // allowed: 3 rejected: 7

	time.Sleep(210 * time.Millisecond)                          // about 2 tokens refill
	fmt.Println(bucket.Allow(), bucket.Allow(), bucket.Allow()) // true true false
}

// 4. Per-user limits: one bucket per key (e.g. per IP address or API key).
func perUserLimits() {
	var mu sync.Mutex
	buckets := map[string]*TokenBucket{}
	allow := func(user string) bool {
		mu.Lock()
		b, ok := buckets[user]
		if !ok {
			b = NewTokenBucket(2, 1)
			buckets[user] = b
		}
		mu.Unlock()
		return b.Allow()
	}
	fmt.Println(allow("ann"), allow("ann"), allow("ann")) // true true false
	fmt.Println(allow("bo"))                              // true   (bo has his own bucket)
}

func main() {
	examples.Run([]examples.Example{
		{Name: "ticker limiter", Run: tickerLimiter},
		{Name: "bursty limiter", Run: burstyLimiter},
		{Name: "token bucket", Run: tokenBucket},
		{Name: "per-user limits", Run: perUserLimits},
	})
}
