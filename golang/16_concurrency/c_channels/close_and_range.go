package main

import "fmt"

/*
 close(ch)            the sender says "no more values"
 v, ok := <-ch        ok is false once the channel is closed and empty
 for v := range ch    receives until the channel is closed
Only the SENDER closes. Sending on a closed channel panics.
*/

func producer(n int) <-chan int {
	ch := make(chan int)
	go func() {
		defer close(ch)
		for i := range n {
			ch <- i * 10
		}
	}()
	return ch
}

func closeAndRange() {
	for v := range producer(4) {
		fmt.Print(v, " ") // 0 10 20 30
	}
	fmt.Println()

	ch := make(chan string, 1)
	ch <- "last"
	close(ch)
	v, ok := <-ch
	fmt.Println(v, ok) // last true -> buffered values are still delivered
	v, ok = <-ch
	fmt.Printf("%q %v\n", v, ok) // "" false -> closed and empty
}
