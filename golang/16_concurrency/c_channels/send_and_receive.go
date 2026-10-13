package main

import "fmt"

/*
main sends a value; the goroutine receives it.
An unbuffered send blocks until someone receives.
*/

func addAndPrint(ch chan int, done chan struct{}) {
	fmt.Println(234 + <-ch)
	close(done)
}

func sendAndReceive() {
	fmt.Println("start main")
	ch := make(chan int)
	done := make(chan struct{})
	go addAndPrint(ch, done)
	ch <- 23 // waits until addAndPrint is ready to receive
	<-done
	fmt.Println("end main") // 257 is printed before this
}
