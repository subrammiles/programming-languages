package main

import "fmt"

/*
A buffered channel has room for N values.
 - a send only blocks when the buffer is FULL
 - a receive only blocks when the buffer is EMPTY
So one goroutine can send and receive on it without deadlocking, up to the capacity.
*/

func bufferedBasics() {
	ch := make(chan int, 2)
	ch <- 12 // doesn't block: there is room
	fmt.Println(len(ch), cap(ch), <-ch) // 1 2 12
}
