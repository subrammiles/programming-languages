package main

import (
	"fmt"
	"time"
)

/*
A quick (but bad) fix: sleep so the goroutine gets time to run.
Sleeping is a guess: too short and work is lost, too long and time is wasted.
Use a sync.WaitGroup (b_waitgroup) or a channel (c_channels) instead.
*/

func waitingWithSleep() {
	go displayMessage("goroutine: process 1")
	time.Sleep(100 * time.Millisecond)
	displayMessage("main: process 2")
}
