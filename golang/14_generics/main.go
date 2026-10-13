// Generics.
//
//	go run ./14_generics
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "generic functions", Run: genericFunctions},
		{Name: "constraints", Run: constraintsExample},
		{Name: "generic types", Run: genericTypes},
		{Name: "standard library generics", Run: standardLibraryGenerics},
	})
}
