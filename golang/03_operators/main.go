// Operators.
//
//	go run ./03_operators
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "arithmetic", Run: arithmetic},
		{Name: "comparison and logical", Run: comparisonAndLogical},
		{Name: "bitwise", Run: bitwise},
	})
}
