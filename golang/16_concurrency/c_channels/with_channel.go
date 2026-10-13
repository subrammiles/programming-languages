package main

import "fmt"

/*
With a channel, the goroutine SENDS its result and main receives it.
chan<- int is a send-only channel; <-chan int is receive-only.
Directional channel types let the compiler catch mistakes.
*/

func multiplyByTwo(num int, out chan<- int) {
	out <- num * 2
}

func withChannel() {
	out := make(chan int)
	go multiplyByTwo(3, out)
	fmt.Println(<-out) // 6
}
