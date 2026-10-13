package main

import "fmt"

func main() {
	ch := make(chan int, 2)
	ch <- 12
	a := <-ch
	fmt.Print(ch, a)
}
