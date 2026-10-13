package main

import "fmt"

/*
Two goroutines compute in parallel and each sends its result on its own channel.
*/

func sumOfDigitPowers(number, power int, out chan<- int) {
	sum := 0
	for number != 0 {
		digit := number % 10
		p := 1
		for range power {
			p *= digit
		}
		sum += p
		number /= 10
	}
	out <- sum
}

func squaresAndCubes() {
	number := 589
	squares := make(chan int)
	cubes := make(chan int)
	go sumOfDigitPowers(number, 2, squares)
	go sumOfDigitPowers(number, 3, cubes)
	s, c := <-squares, <-cubes
	fmt.Println("squares", s, "cubes", c, "total", s+c) // squares 170 cubes 1366 total 1536
}
