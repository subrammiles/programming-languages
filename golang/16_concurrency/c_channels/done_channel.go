package main

import (
	"fmt"
	"time"
)

/*
A "done" channel lets main wait for a slow goroutine without guessing a sleep time.
struct{} carries no data, so chan struct{} is the idiomatic signal type.
*/

func slowWorker(done chan<- struct{}) {
	fmt.Println("worker: going to sleep")
	time.Sleep(200 * time.Millisecond)
	fmt.Println("worker: awake, signalling done")
	close(done) // closing also wakes every receiver
}

func doneChannel() {
	done := make(chan struct{})
	go slowWorker(done)
	<-done
	fmt.Println("main: worker finished")
}
