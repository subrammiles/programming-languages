// Interfaces.
//
//	go run ./12_interfaces
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "geometry interface", Run: geometryInterface},
		{Name: "swapping implementations", Run: swappingImplementations},
		{Name: "empty interface (any)", Run: emptyInterface},
		{Name: "type assertions and switches", Run: typeAssertions},
		{Name: "fmt.Stringer", Run: stringer},
		{Name: "io.Reader and io.Writer", Run: readersAndWriters},
		{Name: "sort.Interface", Run: sortInterface},
		{Name: "embedding interfaces", Run: embeddingInterfaces},
		{Name: "nil interface gotcha", Run: nilInterfaceGotcha},
	})
}
