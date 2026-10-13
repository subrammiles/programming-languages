package main

import (
	"fmt"
	"time"
)

/*
A goroutine is a function running concurrently with the rest of the program.
Start one by putting "go" before a function call:   go displayMessage("hi")
Goroutines are very cheap (a few KB each), so programs can run thousands.

When main() returns, the program ends, even if other goroutines are still running.
*/

func displayMessage(message string) {
	fmt.Println(message)
}

func mainDoesNotWait() {
	go displayMessage("goroutine: process 1") // may never print
	displayMessage("main: process 2")
	// In a real program main would return here and process 1 would usually be lost.
	// (This chapter's runner keeps going, so we pause briefly before the next example.)
	time.Sleep(10 * time.Millisecond)
}
