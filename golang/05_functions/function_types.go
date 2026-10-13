package main

import "fmt"

/*
Functions are values with types, so you can name a function type:
	type Operation func(a, b int) int
and use it for variables, parameters, struct fields and map values.
*/

type Operation func(a, b int) int

func functionTypes() {
	var add Operation = func(a, b int) int { return a + b }
	fmt.Println("Sum", add(5, 6)) // Sum 11

	ops := map[string]Operation{
		"+": func(a, b int) int { return a + b },
		"-": func(a, b int) int { return a - b },
		"*": func(a, b int) int { return a * b },
	}
	for _, sym := range []string{"+", "-", "*"} {
		fmt.Println("8", sym, "2 =", ops[sym](8, 2))
	}

	var missing Operation
	fmt.Println(missing == nil) // true -> calling it would panic
}
