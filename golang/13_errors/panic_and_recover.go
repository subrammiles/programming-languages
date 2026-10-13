package main

import (
	"errors"
	"fmt"
)

/*
panic stops normal execution, runs deferred calls, and crashes the program
unless a deferred function calls recover().
Use panic only for programmer bugs or impossible situations,
NOT for normal failures like "file not found" (return an error instead).
Runtime panics: index out of range, nil map write, nil pointer dereference, bad type assertion.
*/

func safeDivide(a, b int) (result int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("recovered: %v", r) // turn the panic into an error
		}
	}()
	return a / b, nil // b == 0 -> runtime panic: integer divide by zero
}

func mustPositive(n int) int {
	if n < 0 {
		panic(errors.New("negative number")) // "Must" functions panic by convention
	}
	return n
}

func panicAndRecover() {
	fmt.Println(safeDivide(10, 2)) // 5 <nil>
	fmt.Println(safeDivide(1, 0))  // 0 recovered: runtime error: integer divide by zero

	defer fmt.Println("deferred calls still run during a panic")
	func() {
		defer func() { fmt.Println("recovered:", recover()) }()
		mustPositive(-1)
	}()
	fmt.Println("program continues")
}
