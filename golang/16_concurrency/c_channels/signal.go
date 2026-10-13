package main

import "fmt"

/*
An unbuffered channel makes the sender and receiver meet:
the receive waits until a value is sent, so it is also a way to WAIT for a goroutine.
*/

func hello(done chan bool) {
	fmt.Println("hello from the goroutine")
	done <- true
}

func signalWithChannel() {
	done := make(chan bool)
	go hello(done)
	ok := <-done // blocks until hello sends
	fmt.Println("main received", ok)
}
