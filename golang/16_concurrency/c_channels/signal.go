package main

import (
	"fmt"
)

func hello(hello_channel chan bool) {
	fmt.Println("Hello world goroutine")
	hello_channel <- true
}
func main() {
	mychannel := make(chan bool)
	//Add dat to channel by calling hello method
	go hello(mychannel)
	x := <-mychannel
	fmt.Println(x)
	fmt.Println("main function")
}
