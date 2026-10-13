// Maps.
//
//	go run ./07_maps
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "declaring a map", Run: declaringAMap},
		{Name: "writing to a nil map panics", Run: writingToANilMapPanics},
		{Name: "initialising maps", Run: initialisingMaps},
		{Name: "map literals", Run: mapLiterals},
		{Name: "iterating a map", Run: iteratingAMap},
		{Name: "comma ok", Run: commaOk},
		{Name: "delete and clear", Run: deleteAndClear},
		{Name: "sorted keys", Run: sortedKeys},
		{Name: "counting words", Run: countingWords},
		{Name: "grouping into slices", Run: groupingIntoSlices},
		{Name: "maps are references", Run: mapsAreReferences},
		{Name: "sets with maps", Run: setsWithMaps},
	})
}
