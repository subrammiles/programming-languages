// Concurrency programs asked in Go interviews.
//
//	go run -race ./23_interview_questions/f_concurrency_programs
//
// Concepts are in 16_concurrency and 17_context; this file practises the classic exercises.
package main

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"sync/atomic"
	"time"

	"github.com/subrammiles/programming-languages/golang/internal/examples"
)

// 1. Print odd and even numbers alternately from two goroutines.
// Unbuffered channels pass a "turn" back and forth like a baton.
func oddEven() {
	oddTurn, evenTurn := make(chan struct{}), make(chan struct{})
	done := make(chan struct{})
	go func() {
		for i := 1; i <= 9; i += 2 {
			<-oddTurn
			fmt.Print(i, " ")
			evenTurn <- struct{}{}
		}
	}()
	go func() {
		for i := 2; i <= 10; i += 2 {
			<-evenTurn
			fmt.Print(i, " ")
			if i < 10 {
				oddTurn <- struct{}{}
			}
		}
		close(done)
	}()
	oddTurn <- struct{}{} // odd goes first
	<-done
	fmt.Println() // 1 2 3 4 5 6 7 8 9 10
}

// 2. Ping-pong between two goroutines, a fixed number of times.
func pingPong() {
	table := make(chan int)
	var wg sync.WaitGroup
	player := func(name string) {
		for ball := range table {
			if ball == 6 {
				close(table)
				return
			}
			fmt.Println(name, ball)
			table <- ball + 1
		}
	}
	wg.Go(func() { player("ping") })
	wg.Go(func() { player("pong") })
	table <- 1
	wg.Wait()
	// ping 1 / pong 2 / ping 3 / pong 4 / ping 5   (who starts can vary; they always alternate)
}

// 3. Sum a big slice in parallel: split it into chunks, one goroutine per chunk.
func parallelSum() {
	nums := make([]int, 1_000_000)
	for i := range nums {
		nums[i] = i + 1
	}
	const workers = 4
	partial := make(chan int, workers)
	size := (len(nums) + workers - 1) / workers
	for w := range workers {
		chunk := nums[w*size : min((w+1)*size, len(nums))]
		go func() {
			s := 0
			for _, n := range chunk {
				s += n
			}
			partial <- s
		}()
	}
	total := 0
	for range workers {
		total += <-partial
	}
	fmt.Println(total) // 500000500000
}

// 4. Fix the data race: 1000 goroutines incrementing a counter.
func fixTheRace() {
	var wg sync.WaitGroup

	var mu sync.Mutex
	withMutex := 0
	var withAtomic atomic.Int64
	for range 1000 {
		wg.Go(func() {
			mu.Lock()
			withMutex++
			mu.Unlock()
			withAtomic.Add(1)
		})
	}
	wg.Wait()
	fmt.Println(withMutex, withAtomic.Load()) // 1000 1000
	// Without the mutex, withMutex++ would race: `go run -race` reports it and the result varies.
}

// 5. Fetch many URLs with at most N in flight and a total timeout; collect results and errors.
func boundedFetch() {
	fetch := func(ctx context.Context, url string) (string, error) {
		delay := map[string]time.Duration{"slow.example": 500 * time.Millisecond}[url]
		if delay == 0 {
			delay = 20 * time.Millisecond
		}
		select {
		case <-time.After(delay):
			if url == "broken.example" {
				return "", errors.New("500 internal error")
			}
			return "ok", nil
		case <-ctx.Done():
			return "", ctx.Err()
		}
	}

	urls := []string{"a.example", "b.example", "broken.example", "slow.example", "c.example"}
	ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
	defer cancel()

	type result struct {
		url string
		err error
	}
	results := make([]result, len(urls)) // each goroutine writes its own index: no lock needed
	sem := make(chan struct{}, 2)        // at most 2 requests at once
	var wg sync.WaitGroup
	for i, url := range urls {
		wg.Go(func() {
			sem <- struct{}{}
			defer func() { <-sem }()
			_, err := fetch(ctx, url)
			results[i] = result{url, err}
		})
	}
	wg.Wait()
	for _, r := range results {
		fmt.Printf("%-15s %v\n", r.url, r.err)
	}
	// a.example       <nil>
	// b.example       <nil>
	// broken.example  500 internal error
	// slow.example    context deadline exceeded
	// c.example       <nil>
}

// 6. Generator: a goroutine produces values on a channel until told to stop.
func generator() {
	fib := func(ctx context.Context) <-chan int {
		ch := make(chan int)
		go func() {
			defer close(ch)
			a, b := 0, 1
			for {
				select {
				case ch <- a:
					a, b = b, a+b
				case <-ctx.Done(): // without this the goroutine would leak, blocked forever
					return
				}
			}
		}()
		return ch
	}
	ctx, cancel := context.WithCancel(context.Background())
	var got []int
	for n := range fib(ctx) {
		if n > 50 {
			break
		}
		got = append(got, n)
	}
	cancel()
	fmt.Println(got) // [0 1 1 2 3 5 8 13 21 34]
}

// 7. Run three goroutines in a fixed order: A, then B, then C, three times.
func inOrder() {
	chans := []chan struct{}{make(chan struct{}), make(chan struct{}), make(chan struct{})}
	var wg sync.WaitGroup
	for id := range 3 {
		wg.Go(func() {
			for round := range 3 {
				<-chans[id]
				fmt.Print(string(rune('A' + id)))
				if id < 2 || round < 2 { // the last C does not pass the baton
					chans[(id+1)%3] <- struct{}{}
				}
			}
		})
	}
	chans[0] <- struct{}{}
	wg.Wait()
	fmt.Println() // ABCABCABC
}

// 8. Timeout for a single slow call with select.
func timeout() {
	slow := func() <-chan string {
		ch := make(chan string, 1) // buffered: the goroutine can finish even if nobody reads
		go func() {
			time.Sleep(200 * time.Millisecond)
			ch <- "result"
		}()
		return ch
	}
	select {
	case r := <-slow():
		fmt.Println(r)
	case <-time.After(50 * time.Millisecond):
		fmt.Println("timed out") // timed out
	}
}

func main() {
	examples.Run([]examples.Example{
		{Name: "odd and even from two goroutines", Run: oddEven},
		{Name: "ping-pong", Run: pingPong},
		{Name: "parallel sum", Run: parallelSum},
		{Name: "fix the data race", Run: fixTheRace},
		{Name: "bounded concurrent fetch with timeout", Run: boundedFetch},
		{Name: "generator with cancellation", Run: generator},
		{Name: "three goroutines in order", Run: inOrder},
		{Name: "timeout with select", Run: timeout},
	})
}
