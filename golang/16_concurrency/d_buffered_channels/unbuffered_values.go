package main

import (
	"fmt"
	"math/rand/v2"
	"time"
)

/*
The same with an UNBUFFERED channel: main receives once, so the second goroutine
stays blocked on its send forever (a goroutine LEAK). In a long-running program
leaked goroutines pile up and waste memory.
*/

func calculateValueUnbuffered(c chan<- int) {
	value := rand.IntN(10)
	time.Sleep(50 * time.Millisecond)
	c <- value
	fmt.Println("sent", value, "-> only printed after someone received")
}

func unbufferedValues() {
	values := make(chan int)
	go calculateValueUnbuffered(values)
	go calculateValueUnbuffered(values)
	fmt.Println("received", <-values)
	time.Sleep(100 * time.Millisecond) // the other goroutine is still stuck
	fmt.Println("one 'sent' line is missing: that goroutine leaked")
}
