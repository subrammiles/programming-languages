package main

import (
	"fmt"
	"sync"
	"time"
)

/*
With an UNBUFFERED channel the sender is stuck until a receiver is ready.
*/

func unbufferedBlocks() {
	c := make(chan string)
	var wg sync.WaitGroup
	start := time.Now()
	wg.Go(func() {
		c <- "foo"
		fmt.Println("sender done after", time.Since(start).Round(10*time.Millisecond)) // ~200ms
	})
	wg.Go(func() {
		time.Sleep(200 * time.Millisecond)
		fmt.Println("message:", <-c)
	})
	wg.Wait()
}
