package main

import (
	"fmt"
	"time"
)

func hello(done chan bool) {
	fmt.Println("hello go routine is going to sleep")
	time.Sleep(3 * time.Second)
	fmt.Println("hello go routine awake and going to write to done")
	done <- true

	//If you don't wrire data to done ,you will get following error
	//fatal error: all goroutines are asleep - deadlock!
}
func main() {
	done := make(chan bool)
	fmt.Println("Main going to call hello go goroutine")
	go hello(done)
	//This will wait until some one write dat to "done" channel
	x := <-done
	fmt.Println(x)
	fmt.Println("Main received data")
}
