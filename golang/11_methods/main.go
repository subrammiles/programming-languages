// Methods.
//
//	go run ./11_methods
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "method with a struct receiver", Run: methodWithStructReceiver},
		{Name: "function vs method", Run: functionVsMethod},
		{Name: "methods on any type", Run: methodsOnAnyType},
		{Name: "pointer vs value receivers", Run: pointerVsValueReceiver},
	})
}
