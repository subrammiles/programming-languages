package main

import (
	"fmt"
)

func main() {
	var mychannel chan int = make(chan int)
	mychannel <- 5
	fmt.Print("test")
}

/*
In this program no other Goroutine is receiving data from the channel ch.
Hence this program will panic with the following runtime error.
*/
