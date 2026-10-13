package main

import "fmt"

/*
1.IIF or Immediately Invoked Function are those function which

	can be defined and executed at the same time.

2.One of the uses of the IIF function is when you don’t want to expose the logic of the function

	either within or outside the package.

3.This function won’t be available for calling either
outside or within the package.
*/
func iifFunction() {
	squareOf2 := func() int {
		return 2 * 2
	}()
	fmt.Println(squareOf2)
}
