package main

import (
	"fmt"
	"sync"
	"time"
)

/*
Sequential: tasks run one after another, total time = sum of the tasks.
Concurrent: tasks overlap,               total time ≈ the longest task.
This matters most for WAITING (network, disk, timers).
*/

func task(name string, d time.Duration) {
	time.Sleep(d)
	fmt.Println(name, "done")
}

func sequentialVsConcurrent() {
	start := time.Now()
	task("A", 100*time.Millisecond)
	task("B", 100*time.Millisecond)
	task("C", 100*time.Millisecond)
	fmt.Println("sequential took", time.Since(start).Round(10*time.Millisecond)) // ~300ms

	start = time.Now()
	var wg sync.WaitGroup
	for _, name := range []string{"A", "B", "C"} {
		wg.Go(func() { task(name, 100*time.Millisecond) })
	}
	wg.Wait()
	fmt.Println("concurrent took", time.Since(start).Round(10*time.Millisecond)) // ~100ms
}
