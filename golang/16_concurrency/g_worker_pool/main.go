// Worker pool: a fixed number of goroutines take jobs from a channel.
//
//	go run ./16_concurrency/g_worker_pool
//
// This limits how much runs at once (e.g. at most 3 database connections),
// and is one of the most common Go concurrency patterns.
package main

import (
	"fmt"
	"sync"
	"time"
)

type result struct {
	job, value, worker int
}

func worker(id int, jobs <-chan int, results chan<- result) {
	fmt.Println("worker", id, "starting")
	for job := range jobs { // ends when jobs is closed
		time.Sleep(50 * time.Millisecond) // pretend work
		results <- result{job: job, value: job * 2, worker: id}
	}
}

func main() {
	jobs := make(chan int)
	results := make(chan result)

	var wg sync.WaitGroup
	for id := 1; id <= 3; id++ {
		wg.Go(func() { worker(id, jobs, results) })
	}

	go func() {
		for j := 1; j <= 6; j++ {
			jobs <- j
		}
		close(jobs) // tells the workers there is no more work
	}()

	go func() {
		wg.Wait()
		close(results) // all workers done -> no more results
	}()

	start := time.Now()
	total := 0
	for r := range results {
		fmt.Printf("job %d -> %d (worker %d)\n", r.job, r.value, r.worker)
		total += r.value
	}
	fmt.Println("total:", total, "in", time.Since(start).Round(10*time.Millisecond)) // total: 42 in ~100ms
}
