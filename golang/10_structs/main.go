// Structs.
//
//	go run ./10_structs
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "creating structs", Run: creatingStructs},
		{Name: "structs are values", Run: structsAreValues},
		{Name: "function as a field", Run: functionAsAField},
		{Name: "anonymous structs", Run: anonymousStructs},
		{Name: "embedding", Run: embedding},
		{Name: "struct tags", Run: structTags},
	})
}
