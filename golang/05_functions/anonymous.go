package main

import "fmt"

/*
Anonymous functions (function literals) have no name.
They can be called immediately, stored in variables, passed in and returned.
*/

func anonymousFunctions() {
	func() {
		fmt.Println("simple anonymous function")
	}()

	func(wish string) {
		fmt.Println("Hello " + wish)
	}("subbu")

	greet := func(name string) string { return "Hi " + name }
	fmt.Println(greet("Asha"))
}

func applyToTwoAndThree(f func(p, q int) int) int {
	return f(2, 3)
}

func getOperation(operation string) func(p, q int) int {
	if operation == "sum" {
		return func(p, q int) int { return p + q }
	}
	return func(p, q int) int { return p * q }
}

func anonymousAsArgumentAndResult() {
	fmt.Println(applyToTwoAndThree(func(p, q int) int { return p + q })) // 5
	fmt.Println(applyToTwoAndThree(func(p, q int) int { return p * q })) // 6

	add := getOperation("sum")
	mul := getOperation("mul")
	fmt.Println("addition of 2,3 is", add(2, 3)) // 5
	fmt.Println("mul of 2,3 is", mul(2, 3))      // 6
}
