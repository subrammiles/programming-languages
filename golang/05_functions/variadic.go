package main

import "fmt"

/*
Variadic functions accept any number of arguments of one type.
	func f(prefix string, nums ...int)
 - the variadic parameter must be LAST
 - inside, nums is a slice ([]int)
 - pass a slice with "slice..."
fmt.Println and append are variadic.
*/

func sumOrProduct(operation string, nums ...int) int {
	if operation == "mul" {
		result := 1
		for _, n := range nums {
			result *= n
		}
		return result
	}
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

func variadicFunctions() {
	fmt.Println(sumOrProduct("sum"))          // 0
	fmt.Println(sumOrProduct("sum", 1, 2, 3)) // 6
	numbers := []int{1, 2, 3, 4, 5}
	fmt.Println(sumOrProduct("sum", numbers...)) // 15
	fmt.Println(sumOrProduct("mul", numbers...)) // 120
}
