package main

import "fmt"

/*
A recursive function calls itself and needs a base case to stop.
Go has no tail-call optimisation, but goroutine stacks grow as needed,
so moderately deep recursion is fine.
*/

func factorial(n int) int {
	if n <= 1 {
		return 1
	}
	return n * factorial(n-1)
}

func fibonacci(n int, memo map[int]int) int {
	if n < 2 {
		return n
	}
	if v, ok := memo[n]; ok {
		return v
	}
	memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
	return memo[n]
}

func recursion() {
	fmt.Println(factorial(10))                // 3628800
	fmt.Println(fibonacci(90, map[int]int{})) // 2880067194370816000
}
