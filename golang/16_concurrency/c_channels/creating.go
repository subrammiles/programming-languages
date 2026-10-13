package main

import "fmt"

/*
A channel is a typed pipe between goroutines.
	ch := make(chan int)      unbuffered
	ch := make(chan int, 5)   buffered, holds up to 5 values
	ch <- v                   send
	v := <-ch                 receive
The zero value of a channel is nil (sending/receiving on nil blocks forever).
*/

func creatingChannels() {
	var a chan int
	fmt.Println(a == nil) // true
	a = make(chan int)
	fmt.Printf("type of a is %T\n", a) // chan int

	b := make(chan int, 5)
	fmt.Println(len(b), cap(b)) // 0 5
	b <- 10
	b <- 12
	fmt.Println(len(b))   // 2 values waiting
	fmt.Println(<-b, <-b) // 10 12 -> first in, first out
}
