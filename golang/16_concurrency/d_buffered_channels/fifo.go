package main

import "fmt"

/*
Values come out in the order they went in (first in, first out).
*/

func bufferedFIFO() {
	ch := make(chan int, 2)
	ch <- 12
	ch <- 11
	fmt.Println(<-ch, <-ch) // 12 11
}
