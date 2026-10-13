package main

import (
	"fmt"
	"math/rand/v2"
	"sync"
	"time"
)

/*
Two goroutines send results. With a buffer of 2, BOTH can send and finish,
even though main only receives one value.
*/

func calculateValueBuffered(c chan<- int, wg *sync.WaitGroup) {
	defer wg.Done()
	value := rand.IntN(10)
	time.Sleep(50 * time.Millisecond)
	c <- value
	fmt.Println("sent", value, "-> the send didn't wait for a receiver")
}

func bufferedValues() {
	values := make(chan int, 2)
	var wg sync.WaitGroup
	wg.Add(2)
	go calculateValueBuffered(values, &wg)
	go calculateValueBuffered(values, &wg)
	fmt.Println("received", <-values)
	wg.Wait() // both senders finished
}
