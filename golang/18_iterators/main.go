// Iterators (range over functions, Go 1.23).
//
//	go run ./18_iterators
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "range over functions", Run: rangeOverFunctions},
		{Name: "composing iterators", Run: composingIterators},
		{Name: "standard library iterators", Run: standardLibraryIterators},
		{Name: "pull iterators", Run: pullIterators},
	})
}
