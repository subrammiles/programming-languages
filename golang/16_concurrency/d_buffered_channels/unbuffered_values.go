package main

import (
	"fmt"
	"math/rand"
	"time"
)

func CalculateValue(c chan int) {
	value := rand.Intn(10)
	fmt.Println("Calculated Random Value = ", value)
	time.Sleep(1000 * time.Millisecond)
	c <- value
	fmt.Println("Only Executes after another goroutine performs a receive on the channel")
}

func main() {
	fmt.Println("Hi")
	valueChannel := make(chan int)
	defer close(valueChannel)

	go CalculateValue(valueChannel)
	go CalculateValue(valueChannel)

	values := <-valueChannel
	fmt.Println(values)
}

/*
you should see that only our first goroutines' final print statement
is actually executed:
The reason for this is our call
to c <- value has blocked in our second goroutine and subsequently
the main() function concludes it’s execution before
our second goroutine gets a chance to complete its own execution.


*/
