package main

import "fmt"

func main() {

	ch := make(chan int, 2)
	ch <- 12
	ch <- 11
	a := <-ch
	b := <-ch
	fmt.Print(a, b)
}
