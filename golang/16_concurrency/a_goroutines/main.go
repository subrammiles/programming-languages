// Goroutines.
//
//	go run ./16_concurrency/a_goroutines
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "main does not wait", Run: mainDoesNotWait},
		{Name: "waiting with sleep", Run: waitingWithSleep},
		{Name: "multiple goroutines", Run: multipleGoroutines},
		{Name: "interleaving", Run: interleaving},
		{Name: "sequential vs concurrent", Run: sequentialVsConcurrent},
	})
}
