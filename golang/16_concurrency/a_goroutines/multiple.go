package main

import (
	"fmt"
	"time"
)

/*
Several goroutines run concurrently, and their order is NOT guaranteed.
Run this a few times: the order of the lines can change.
*/

func multipleGoroutines() {
	for i := 1; i <= 3; i++ {
		go fmt.Println("process", i)
	}
	time.Sleep(100 * time.Millisecond)
}
