// A deadlock: this program CRASHES on purpose.
//
//	go run ./16_concurrency/e_deadlock
//
// It sends on an unbuffered channel, but no other goroutine will ever receive,
// so main blocks forever. The runtime notices that every goroutine is asleep and stops with:
//
//	fatal error: all goroutines are asleep - deadlock!
//
// Fixes: receive in another goroutine, or use a buffered channel: make(chan int, 1)
package main

import "fmt"

func main() {
	ch := make(chan int)
	ch <- 5 // blocks forever
	fmt.Println("never printed")
}
