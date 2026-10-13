// Pointers.
//
//	go run ./09_pointers
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "memory address", Run: memoryAddress},
		{Name: "pointer basics", Run: pointerBasics},
		{Name: "nil pointers", Run: nilPointers},
		{Name: "pointers to structs", Run: pointersToStructs},
		{Name: "new and optional values", Run: newAndOptionalValues},
	})
}
