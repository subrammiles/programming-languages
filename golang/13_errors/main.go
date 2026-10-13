// Errors.
//
//	go run ./13_errors
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "creating errors", Run: creatingErrors},
		{Name: "handling errors", Run: handlingErrors},
		{Name: "wrapping, Is and Unwrap", Run: wrappingErrors},
		{Name: "As and AsType", Run: errorsAsType},
		{Name: "custom error types and Join", Run: customErrors},
		{Name: "panic and recover", Run: panicAndRecover},
	})
}
