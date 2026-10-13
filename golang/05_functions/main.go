// Functions.
//
//	go run ./05_functions
//	go run ./05_functions/init_function   (init runs before main, so it has its own program)
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "declaring functions", Run: functionDeclarations},
		{Name: "argument types", Run: argumentTypes},
		{Name: "blank identifier _", Run: blankIdentifier},
		{Name: "variadic functions", Run: variadicFunctions},
		{Name: "immediately invoked", Run: immediatelyInvokedFunction},
		{Name: "function types", Run: functionTypes},
		{Name: "anonymous functions", Run: anonymousFunctions},
		{Name: "functions as arguments and results", Run: anonymousAsArgumentAndResult},
		{Name: "first-class functions", Run: firstClassFunctions},
		{Name: "call by value vs pointer", Run: callByValue},
		{Name: "slices share their data", Run: slicesShareTheirData},
		{Name: "closures", Run: closures},
		{Name: "defer", Run: deferExamples},
		{Name: "recursion", Run: recursion},
	})
}
