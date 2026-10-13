// Arrays and slices.
//
//	go run ./06_arrays_and_slices
package main

import "github.com/subrammiles/programming-languages/golang/internal/examples"

func main() {
	examples.Run([]examples.Example{
		{Name: "array zero values", Run: zeroValueArrays},
		{Name: "setting array values", Run: settingArrayValues},
		{Name: "array literals", Run: arrayLiterals},
		{Name: "iterating arrays", Run: iteratingArrays},
		{Name: "arrays are values", Run: arraysAreValues},
		{Name: "2D arrays", Run: twoDimensionalArrays},
		{Name: "slice vs array", Run: sliceVsArray},
		{Name: "creating slices", Run: creatingSlices},
		{Name: "slices from an array", Run: slicesFromAnArray},
		{Name: "iterating slices", Run: iteratingSlices},
		{Name: "slice of structs", Run: sliceOfStructs},
		{Name: "len and cap", Run: lenAndCap},
		{Name: "shared arrays", Run: sharedArrays},
		{Name: "copying slices", Run: copyingSlices},
		{Name: "removing and inserting", Run: removingAndInserting},
		{Name: "sorting and searching", Run: sortingAndSearching},
		{Name: "sorting structs", Run: sortingStructs},
		{Name: "slices package", Run: modifyingWithSlicesPackage},
	})
}
