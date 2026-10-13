package main

import (
	"fmt"
	"sync"
	"time"
)

/*
The sender fills the buffer and finishes straight away,
even though the receiver only starts reading later.
*/

func bufferedDoesNotBlock() {
	c := make(chan string, 2)
	var wg sync.WaitGroup
	start := time.Now()
	wg.Go(func() {
		c <- "foo"
		c <- "bar"
		fmt.Println("sender done after", time.Since(start).Round(10*time.Millisecond)) // ~0s
	})
	wg.Go(func() {
		time.Sleep(200 * time.Millisecond)
		fmt.Println("message:", <-c)
		fmt.Println("message:", <-c)
	})
	wg.Wait()
}
