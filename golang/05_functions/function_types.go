package main

import "fmt"

/*
Just like we define our own struct types, it is possible to
define our own function types.
Eg:
The code snippet below creates a new function type add which
accepts two integer arguments and returns a integer.
Now we can define variables of type add.
type add func(a int, b int) int
*/

type addTwoNumberType func(a int, b int) int

func userDefinedFunctionType() {
	var a addTwoNumberType = func(a int, b int) int {
		return a + b
	}
	s := a(5, 6)
	fmt.Println("Sum", s)
}
