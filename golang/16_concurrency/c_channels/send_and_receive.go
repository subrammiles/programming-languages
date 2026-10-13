package main

import "fmt"

func myfunc(ch chan int) {
	fmt.Println(234 + <-ch)
}
func main() {
	fmt.Println("start Main method")
	// Creating a channel
	ch := make(chan int)
	go myfunc(ch)
	//We are writing 23 to "ch" channel
	ch <- 23
	fmt.Println("End Main method")
}
