// Context: cancellation, timeouts and request values.
//
//	go run ./17_context
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "WithCancel", Run: withCancel},
		{Name: "WithTimeout", Run: withTimeout},
		{Name: "timeout a function call", Run: timeoutAFunctionCall},
		{Name: "values", Run: contextValues},
		{Name: "cancel cause and AfterFunc", Run: cancelCause},
	})
}
