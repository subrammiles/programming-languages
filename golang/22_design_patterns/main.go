// Design patterns, the Go way.
//
//	go run ./22_design_patterns
//	go run ./22_design_patterns options      (only the functional options example)
//
// Go has no classes or inheritance, so many classic patterns become simpler:
// a strategy is a function value, a decorator is a function that wraps a function,
// and dependency injection is "accept an interface, pass in an implementation".
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "functional options", Run: functionalOptions},
		{Name: "singleton with sync.Once", Run: singleton},
		{Name: "builder", Run: builder},
		{Name: "factory", Run: factory},
		{Name: "strategy", Run: strategy},
		{Name: "observer", Run: observer},
		{Name: "decorator / HTTP middleware", Run: middleware},
		{Name: "dependency injection and fakes", Run: dependencyInjection},
		{Name: "adapter", Run: adapter},
	})
}
